<template>
  <div class="app-container">
    <el-input
      v-model="inputSerial"
      placeholder="请输入靓号号码"
      size="large"
      suffix-icon="el-icon-search"
      class="serial-search"
      @blur="specialSerialSearch"
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
          <span>{{ row.rule_value }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="协议到期时间"
        min-width="90"
        prop="fee"
      >
        <template slot-scope="{ row }">
          <el-tag :type="isendDate(row.end_date)" effect="dark">
            <span>{{ row.end_date }}</span>
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { serialSearch } from '@/api/middleplatform'

export default {
  name: 'SpecialSerial',
  data() {
    return {
      list: [],
      listLoading: true,
      inputSerial: null
    }
  },
  created() {
    this.listLoading = false
    // this.getList(this.listQuery.offset, this.listQuery.limit)
  },
  methods: {
    async specialSerialSearch() {
      this.list = []
      if (!this.inputSerial || this.inputSerial.length !== 11) {
        return false
      }
      this.listLoading = true
      try {
        const result = await serialSearch(this.inputSerial)
        this.list = []
        this.list.push(result)
        this.listLoading = false
      } catch (error) {
        this.listLoading = false
        throw error
      }
    },
    isendDate(end_date) {
      const value1 = end_date.split('/')
      value1.splice(1, 1, (value1[1] - 1).toString())
      const endDateTimeStramp = new Date(...value1).getTime()
      const days = parseInt(
        (endDateTimeStramp - new Date().getTime()) / 1000 / 60 / 60 / 24
      )
      switch (true) {
        case days >= 30:
          return 'info'
        case days > 0 && days < 30:
          return 'warning'
        case days < 0:
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
