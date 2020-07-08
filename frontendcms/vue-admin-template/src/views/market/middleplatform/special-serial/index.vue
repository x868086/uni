<template>
  <div class="app-container">
    <el-input
      v-model="inputSerial"
      placeholder="请输入靓号号码"
      size="large"
      suffix-icon="el-icon-search"
      class="serial-search"
      @blur="serialSearch"
    />
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      height="550"
    >
      <el-table-column align="center" label="ID" prop="id" min-width="60" fixed>
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="110px" align="center" prop="serial_number" label="号码" fixed>
        <template slot-scope="{ row }">
          <span>{{ row.serial_number }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="100px"
        align="center"
        prop="product_name"
        label="入网时间"
        fixed="left"
      >
        <template slot-scope="{ row }">
          <span>{{ row.in_date }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="协议约定低消标准" prop="id_desc">
        <template slot-scope="{ row }">
          <span>{{ row.role_value }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="协议到期时间"
        min-width="90"
        prop="fee"
        :sortable="true"
        :sort-method="sortByDate"
      >
        <template slot-scope="{ row }">
          <el-tag :type="isendDate(row.end_date)">
            <span>{{ row.end_date }}</span>
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      background
      :page-size="listQuery.limit"
      :total="listLength"
      class="serial-pagination"
      @prev-click="getPrevPage"
      @next-click="getNextPage"
      @current-change="getCurrentPage"
    />
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { getSpecialSearialList } from '@/api/middleplatform'
import { exportCsv } from '@/utils/export-csv'

export default {
  name: 'SpecialSerial',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        offset: 0,
        limit: 200
      },
      inputSerial: null,
      listLength: 0,
      currentPage: 0
    }
  },
  created() {
    this.getList(this.listQuery.offset, this.listQuery.limit)
  },
  methods: {
    async getList(offset, limit) {
      this.listLoading = true
      // const { data = undefined } = await fetchList(this.listQuery)

      const { result = null, total = undefined } = await getSpecialSearialList({
        offset: offset,
        limit: limit
      })
      this.listLength = total
      this.list = result
      this.listLoading = false
    },

    async serialSearch() {
      if (!this.inputSerial || this.inputSerial.length !== 11) {
        return false
      }
      const { result = null } = await getSpecialSearialList({
        offset: 0,
        limit: 100000
      })

      const remoteIndex = result.findIndex(
        e => e.serial_number === this.inputSerial
      )

      if (remoteIndex === -1) {
        this.$message({ message: '未查询到靓号信息', type: 'warning' })
        return false
      }

      const pageNumber = remoteIndex / this.listQuery.limit
      await this.getCurrentPage(pageNumber + 1)

      const localIndex = this.list.findIndex(
        e => e.serial_number === this.inputSerial
      )
      return this.list.splice(0, 0, this.list.splice(localIndex, 1)[0])
    },
    getPrevPage(p) {},
    getNextPage(p) {},
    async getCurrentPage(p) {
      await this.getList(
        parseInt(p - 1) * parseInt(this.listQuery.limit),
        this.listQuery.limit
      )
      this.currentPage = parseInt(p - 1)
    },
    sortByDate(a, b) {
      let value1 = a.end_date.split('/')
      value1.splice(1, 1, (value1[1] - 1).toString())

      let value2 = b.end_date.split('/')
      value2.splice(1, 1, (value2[1] - 1).toString())
      return new Date(...value1) - new Date(...value2)
    },
    isendDate(end_date) {
      let value1 = end_date.split('/')
      value1.splice(1, 1, (value1[1] - 1).toString())
      let endDateTimeStramp = new Date(...value1).getTime()
      let days = parseInt(
        (endDateTimeStramp - new Date().getTime()) / 1000 / 60 / 60 / 24
      )
      if (days >= 30) {
        return 'info'
      } else if (days > 0 && days < 30) {
        return 'warning'
      } else if (days < 0) {
        return 'danger'
      }
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.export-button {
  margin-bottom: 20px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.serial-search {
  width: 30%;
  float: right;
}
.serial-pagination {
  padding-top: 10px;
  text-align: center;
}
</style>
