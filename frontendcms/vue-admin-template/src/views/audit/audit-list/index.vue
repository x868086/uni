<template>
  <div class="app-container">
    <el-date-picker
      v-model="currentMonth"
      type="month"
      placeholder="选择月"
      format="yyyyMM"
      value-format="yyyyMM"
    ></el-date-picker>

    <el-input
      v-model="inputSerial"
      placeholder="服务号码查询"
      size="large"
      suffix-icon="el-icon-search"
      class="serial-search"
      @blur="specialSerialSearch"
    />
    <el-table
      class="table-container"
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

      <el-table-column min-width="90px" align="center" prop="audit_type" label="稽核项目" fixed>
        <template slot-scope="{ row }">
          <span>{{ row.audit_type }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="90px"
        align="center"
        prop="audit_date"
        label="稽核日期"
        fixed
        :sortable="true"
        :sort-method="sortByAuditDate"
      >
        <template slot-scope="{ row }">
          <span>{{ row.audit_date }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="70px" align="center" label="差错金额" prop="fee" fixed>
        <template slot-scope="{ row }">
          <span>{{ row.fee }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="服务号码"
        min-width="160"
        prop="serial_number"
        fixed="left"
      >
        <template slot-scope="{ row }">
          <span>{{ row.serial_number }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="网别" min-width="120" prop="net_type_name">
        <template slot-scope="{ row }">
          <span>{{ row.net_type_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="产品名称" min-width="90" prop="product_name">
        <template slot-scope="{ row }">
          <span>{{ row.product_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否整改" min-width="70" prop="state_name">
        <template slot-scope="{ row }">
          <el-tag size="mini" :type="row.state_name==='已整改'?'success':'danger'">
            <span>{{ row.state_name }}</span>
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="考核金额"
        min-width="90"
        prop="fine_fee"
        :sortable="true"
        :sort-method="sortByFineFee"
      >
        <template slot-scope="{ row }">
          <span>{{ row.fine_fee }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="稽核员" min-width="70" prop="audit_staffname">
        <template slot-scope="{ row }">
          <span>{{ row.audit_staffname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="详情" min-width="100" prop>
        <template slot-scope="{ row }">
          <el-button type="primary" @click.native="getItem(row)" size="mini">详情</el-button>
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
import { getAuditList, searchSerial, auditModify } from '@/api/audit'

export default {
  name: 'AuditList',
  data() {
    return {
      listQuery: {
        offset: 0,
        limit: 50,
      },
      currentMonth: '',
      listLength: 0,
      list: [
        {
          id: 3,
          audit_type: '低消送宽带',
          audit_date: '202007',
          non_conformance: '预存不足',
          fee: '100',
          serial_number: '0717XN19107912609',
          net_type_name: '固网业务-宽带',
          subjects_name: '湖北宽带100M基本套餐',
          product_name: '湖北宽带100M基本套餐',
          access_departname: '城区东山区东园代理点',
          access_departid: 'E0159',
          access_staffid: 'AJELF003',
          access_date: '20200631',
          id_desc: '枝江城区',
          state_name: '待整改',
          reject_reason: null,
          check_desc: '未完成整改',
          fine_fee: '22',
          audit_staffname: '袁琼',
          remark_desc: '考核责任人张三',
        },
        {
          id: 42,
          audit_type: '低消送宽带',
          audit_date: '202007',
          non_conformance: '宽带产品沟通错误',
          fee: null,
          serial_number: '071700807124',
          net_type_name: '固网业务-宽带',
          subjects_name: '湖北宽带100M基本套餐',
          product_name: '湖北宽带100M基本套餐',
          access_departname: '城区东山区东园代理点',
          access_departid: 'Y3ZJP',
          access_staffid: 'AJELF042',
          access_date: '20200631',
          id_desc: '城区西陵',
          state_name: '已整改',
          reject_reason: null,
          check_desc: '已审批',
          fine_fee: '48',
          audit_staffname: '袁琼',
          remark_desc: '考核责任人张三',
        },
      ],
      listLoading: true,
      inputSerial: null,
    }
  },
  async mounted() {
    await this.getList(
      this.listQuery.offset,
      this.listQuery.limit,
      this.currentMonth
    )
  },
  created() {
    this.listLoading = false
    this.currentMonth = this.getCurrentMonth()
  },
  methods: {
    async getItem(row) {
      console.log(row)
    },
    getCurrentMonth() {
      let fullYear = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      if (month < 10) {
        return `${fullYear}0${month}`
      }
      return `${fullYear}${month}`
    },
    async getList(offset, limit, auditdate) {
      //   this.listLoading = true

      const { result = null, total = undefined } = await getAuditList({
        offset: offset,
        limit: limit,
        auditdate: auditdate,
      })
      this.listLength = total
      //   const items = result
      //   this.list = items.map((v, i) => {
      //     this.$set(v, 'edit', v.operate) // https://vuejs.org/v2/guide/reactivity.html
      //     this.$set(v, 'ids', i)
      //     return v
      //   })
      this.listLoading = false
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
    sortByFineFee(a, b) {
      return a.fine_fee - b.fine_fee
    },
    sortByAuditDate(a, b) {
      return a.audit_date - b.audit_date
    },
    // async specialSerialSearch() {
    //   this.list = []
    //   if (!this.inputSerial || this.inputSerial.length !== 11) {
    //     return false
    //   }
    //   this.listLoading = true
    //   try {
    //     const result = await serialSearch(this.inputSerial)
    //     this.list = []
    //     this.list.push(result)
    //     this.listLoading = false
    //   } catch (error) {
    //     this.listLoading = false
    //     throw error
    //   }
    // },
    // isendDate(end_date) {
    //   const value1 = end_date.split('/')
    //   value1.splice(1, 1, (value1[1] - 1).toString())
    //   const endDateTimeStramp = new Date(...value1).getTime()
    //   const days = parseInt(
    //     (endDateTimeStramp - new Date().getTime()) / 1000 / 60 / 60 / 24
    //   )
    //   switch (true) {
    //     case days >= 30:
    //       return 'info'
    //     case days > 0 && days < 30:
    //       return 'warning'
    //     case days < 0:
    //       return 'danger'
    //   }
    // },
  },
}
</script>

<style scoped>
.table-container {
  margin-top: 10px;
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
