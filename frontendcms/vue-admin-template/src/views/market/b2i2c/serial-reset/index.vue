<template>
  <div class="app-container">
    <el-button
      type="primary"
      icon="el-icon-document"
      class="export-button"
      size="medium"
      @click.native="exportFile"
    >导出CSV文件</el-button>
    <el-input
      v-model="inputSerial"
      placeholder="请输入待销售号码"
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

      <el-table-column
        min-width="110px"
        align="center"
        prop="serial_number"
        label="号码"
        fixed
      >
        <template slot-scope="{ row }">
          <span>{{ row.serial_number }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="100px"
        align="center"
        prop="product_name"
        label="套餐名称"
        fixed="left"
      >
        <template slot-scope="{ row }">
          <span>{{ row.product_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="120px"
        align="center"
        label="营服名称"
        prop="id_desc"
      >
        <template slot-scope="{ row }">
          <!-- <svg-icon
            v-for="n in + row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />-->
          <span>{{ row.id_desc }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="月租"
        min-width="90"
        prop="fee"
        :sortable="true"
        :sort-method="sortByFee"
      >
        <template slot-scope="{ row }">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row.fee }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="联系电话"
        min-width="110"
        prop="contact_phone"
      >
        <template slot-scope="{ row }">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row.contact_phone }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="发展人"
        min-width="90"
        prop="dev_name"
      >
        <template slot-scope="{ row }">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row.dev_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="发展人手机号"
        min-width="110"
        prop="dev_phone"
      >
        <template slot-scope="{ row }">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row.dev_phone }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="操作时间"
        min-width="150"
        prop="operate_time"
        :sortable="true"
        :sort-method="sortByOperateTime"
      >
        <template slot-scope="{ row }">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row.operate_time }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="状态"
        min-width="90"
        prop="operate"
        :sortable="true"
        :sort-method="sortByOperateAction"
      >
        <template slot-scope="{ row }">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row.operate }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column min-width="300px" label="Title">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >cancel</el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>-->

      <el-table-column align="center" label="操作" min-width="230">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.edit"
            type="success"
            :disabled="
              ['待提交', '已处理', '驳回', '删除'].includes(row.operate)
            "
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="serialAllocate(row.serial_number)"
          >释放</el-button>

          <el-button
            v-if="row.edit"
            type="warning"
            :disabled="
              ['待提交', '已处理', '驳回', '删除'].includes(row.operate)
            "
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="serialReject(row.serial_number)"
          >驳回</el-button>

          <el-button
            v-if="row.edit"
            type="danger"
            :disabled="['已处理', '删除'].includes(row.operate)"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="serialRemove(row.serial_number)"
          >删除</el-button>
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
import { getb2iserial, allocate, reject, remove } from '@/api/b2i2c'
import { exportCsv } from '@/utils/export-csv'

export default {
  name: 'SerialReset',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        offset: 0,
        limit: 10
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

      const { result = null, total = undefined } = await getb2iserial({
        offset: offset,
        limit: limit
      })
      this.listLength = total
      const items = result
      this.list = items.map((v, i) => {
        this.$set(v, 'edit', v.operate) // https://vuejs.org/v2/guide/reactivity.html
        this.$set(v, 'id', i)
        // v.originalTitle = v.title //  will be used when user click the cancel botton
        return v
      })
      this.listLoading = false
    },

    async serialAllocate(serial) {
      const operate = '已处理'
      const operateTime = new Date().getTime()
      try {
        await allocate(serial, { operate, operateTime })
        await this.getList(
          this.currentPage * parseInt(this.listQuery.limit),
          this.listQuery.limit
        )
      } catch (error) {
        return false
      }
    },

    async serialReject(serial) {
      const operate = '驳回'
      const operateTime = new Date().getTime()
      try {
        await reject(serial, { operate, operateTime })
        await this.getList(
          this.currentPage * parseInt(this.listQuery.limit),
          this.listQuery.limit
        )
      } catch (error) {
        return false
      }
    },

    async serialRemove(serial) {
      const operate = '删除'
      const operateTime = new Date().getTime()
      try {
        await remove(serial, { operate, operateTime })
        await this.getList(
          this.currentPage * parseInt(this.listQuery.limit),
          this.listQuery.limit
        )
      } catch (error) {
        return false
      }
    },
    async serialSearch() {
      if (!this.inputSerial || this.inputSerial.length !== 11) {
        return false
      }
      const { result = null } = await getb2iserial({
        offset: 0,
        limit: 10000
      })

      const remoteIndex = result.findIndex(
        (e) => e.serial_number === this.inputSerial
      )

      if (remoteIndex === -1) {
        this.$message({ message: '未查询到待销售号码信息', type: 'warning' })
        return false
      }

      const pageNumber = remoteIndex / this.listQuery.limit
      await this.getCurrentPage(pageNumber + 1)

      const localIndex = this.list.findIndex(
        (e) => e.serial_number === this.inputSerial
      )
      return this.list.splice(0, 0, this.list.splice(localIndex, 1)[0])

      // let index = this.list.findIndex(e => e.serial_number === this.inputSerial)
      // if (index === -1) {
      //   this.$message({ message: '未查询到待销售号码信息', type: 'warning' })
      //   return false
      // }
      // return this.list.splice(0, 0, this.list.splice(index, 1)[0])
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
    sortByOperateTime(a, b) {
      return a.operate_time - b.operate_time
    },
    sortByOperateAction(a, b) {
      return a.operate - b.operate
    },
    sortByFee(a, b) {
      return a.fee - b.fee
    },
    async exportFile() {
      const { result = null } = await getb2iserial({
        offset: 0,
        limit: 10000
      })
      exportCsv(result)
      // let { result = undefined } = await getb2iserial({
      //   offset: 0,
      //   limit: 10000
      // })

      // let csvContent = 'data:text/csv;charset=utf-8,\uFEFF'
      // const tableHeader =
      //   '号码,套餐名称,营服名称,月租,联系电话,发展人,发展人手机号,操作时间,状态\n'
      // let str = tableHeader
      // result.map(e => {
      //   str += `${e.serial_number},${e.product_name},${e.id_desc},${e.fee},${e.contact_phone},${e.dev_name},${e.dev_phone},${e.operate_time},${e.operate}\n`
      // })
      // str = encodeURIComponent(str)
      // csvContent += str

      // var link = document.createElement('a')
      // link.setAttribute('href', csvContent)
      // link.setAttribute('download', 'my_data.csv')
      // document.body.appendChild(link) // Required for FF

      // link.click()
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
