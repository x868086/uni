<template>
  <div class="app-container">
    <section class="condtion-container">
      <el-button
        type="primary"
        icon="el-icon-document"
        class="export-button"
        size="medium"
        @click.native="exportFile"
      >导出CSV文件</el-button>

      <el-date-picker
        v-model="currentMonth"
        type="month"
        placeholder="选择月"
        format="yyyyMM"
        value-format="yyyyMM"
        :clearable="false"
        @change="searchByMonth()"
      />

      <el-select
        v-model="auditTypeValue"
        clearable
        placeholder="稽核项目筛选"
        @clear="getList(listQuery.offset, listQuery.limit, currentMonth)"
        @change="searchByAuditType()"
      >
        <el-option
          v-for="item in auditTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-input
        v-model="inputSerial"
        placeholder="服务号码查询"
        size="large"
        suffix-icon="el-icon-search"
        class="serial-search"
        @blur="serialSearch"
      />
    </section>
    <el-table
      v-loading="listLoading"
      class="table-container"
      :data="ownerList"
      border
      fit
      style="width: 100%"
      height="550"
      stripe
      :row-style="rowStyle"
    >
      <el-table-column align="center" label="ID" prop="id" min-width="60" fixed>
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="90px"
        align="center"
        prop="audit_type"
        label="稽核项目"
        fixed
      >
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

      <el-table-column
        min-width="70px"
        align="center"
        label="差错金额"
        prop="fee"
        fixed
      >
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

      <el-table-column
        align="center"
        label="网别"
        min-width="120"
        prop="net_type_name"
      >
        <template slot-scope="{ row }">
          <span>{{ row.net_type_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="产品名称"
        min-width="90"
        prop="product_name"
      >
        <template slot-scope="{ row }">
          <span>{{ row.product_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="是否整改"
        min-width="70"
        prop="state_name"
      >
        <template slot-scope="{ row }">
          <el-tag
            size="mini"
            :type="row.state_name === '已整改' ? 'success' : 'danger'"
          >
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

      <el-table-column
        align="center"
        label="稽核员"
        min-width="70"
        prop="audit_staffname"
      >
        <template slot-scope="{ row }">
          <span>{{ row.audit_staffname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="详情" min-width="100" prop>
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="mini"
            @click.native="getItem(row)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="稽核结果详情"
      :visible.sync="dialogVisible"
      width="65%"
      :before-close="dialogClose"
    >
      <div class="item-cotainer">
        <div class="items">
          <h4>稽核项目:</h4>
          <p>{{ currentItem.audit_type }}</p>
        </div>
        <div class="items">
          <h4>稽核日期:</h4>
          <p>{{ currentItem.audit_date }}</p>
        </div>
        <div class="items">
          <h4>差错原因:</h4>
          <p>{{ currentItem.non_conformance }}</p>
        </div>
        <div class="items">
          <h4>差错金额:</h4>

          <el-tag size="mini" type="danger" class="current-state">
            <span>{{ currentItem.fee }}</span>
          </el-tag>
        </div>
        <div class="items">
          <h4>服务号码:</h4>
          <p>{{ currentItem.serial_number }}</p>
        </div>
        <div class="items">
          <h4>网别:</h4>
          <p>{{ currentItem.net_type_name }}</p>
        </div>
        <div class="items">
          <h4>业务名称:</h4>
          <p>{{ currentItem.subjects_name }}</p>
        </div>
        <div class="items">
          <h4>产品名称:</h4>
          <p>{{ currentItem.product_name }}</p>
        </div>
        <div class="items">
          <h4>受理/发展渠道、发展人(政企):</h4>
          <p>{{ currentItem.access_departname }}</p>
        </div>
        <div class="items">
          <h4>渠道编码:</h4>
          <p>{{ currentItem.access_departid }}</p>
        </div>
        <div class="items">
          <h4>集中系统编码:</h4>
          <p>{{ currentItem.cuc_depart_code }}</p>
        </div>
        <div class="items">
          <h4>受理工号:</h4>
          <p>{{ currentItem.access_staffid }}</p>
        </div>
        <div class="items">
          <h4>受理时间:</h4>
          <p>{{ currentItem.access_date }}</p>
        </div>
        <div class="items">
          <h4>归属营服:</h4>
          <p>{{ currentItem.id_desc }}</p>
        </div>

        <div class="items">
          <h4>复核详情:</h4>
          <p>{{ currentItem.check_desc }}</p>
        </div>
        <div class="items">
          <h4>考核金额:</h4>
          <el-tag size="mini" type="danger" class="current-state">
            <span>{{ currentItem.fine_fee }}</span>
          </el-tag>
        </div>
        <div class="items">
          <h4>稽核员姓名:</h4>
          <p>{{ currentItem.audit_staffname }}</p>
        </div>
        <div class="items">
          <h4>备注:</h4>
          <p>{{ currentItem.remark_desc }}</p>
        </div>
        <div class="items">
          <h4>是否整改:</h4>
          <el-radio
            v-model="currentItem.state_name"
            label="待整改"
          >待整改</el-radio>
          <el-radio
            v-model="currentItem.state_name"
            label="已整改"
          >已整改</el-radio>
          <el-radio
            v-model="currentItem.state_name"
            label="无需整改"
          >无需整改</el-radio>
        </div>
        <div class="items reject">
          <el-form ref="ruleForm" :rules="rules" :model="currentItem">
            <el-form-item :label="resonDesc" prop="reject_reason">
              <el-input
                v-model="currentItem.reject_reason"
                type="textarea"
                class="reject-desc"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-pagination
      layout="prev, pager, next"
      background
      :page-size="listQuery.limit"
      :total="listLength"
      class="serial-pagination"
      @prev-click="getPrevPage"
      @next-click="getNextPage"
      @current-change="getCurrentPage"
    /> -->
    <el-pagination
      layout="prev, pager, next"
      background
      :page-size="listQuery.limit"
      :total="ownerListLength"
      class="serial-pagination"
      @prev-click="getPrevPage"
      @next-click="getNextPage"
      @current-change="getCurrentPage"
    />
  </div>
</template>

<script>
import { getAuditList, auditModify, getAuditType } from '@/api/audit'
import { exportCsv } from '@/utils/export-csv'

import { mapGetters } from 'vuex'

export default {
  name: 'AuditList',
  data() {
    return {
      listQuery: {
        offset: 0,
        limit: 50
      },
      currentPage: 0,
      currentMonth: '',
      currentItem: {},
      listLength: 0,
      list: [],
      listLoading: true,
      inputSerial: null,
      dialogVisible: false,
      rules: {
        reject_reason: [
          {
            min: 3,
            max: 120,
            message: '长度在3到120个字符,超过120字请提交正式情况说明',
            trigger: 'blur'
          },
          {
            required: true,
            message: '请填写整改反馈信息',
            trigger: 'blur'
          }
        ]
      },
      auditTypeOptions: [],
      auditTypeValue: undefined
    }
  },
  computed: {
    ...mapGetters(['channelArray']),
    ownerList() {
      return this.list
        .filter(e => {
          return this.channelArray.includes(e.access_departid)
        })
        .slice(
          this.currentPage * this.listQuery.limit,
          this.currentPage * this.listQuery.limit + this.listQuery.limit
        )
      // 每页取50行
    },
    ownerListLength() {
      return this.list.filter(e => {
        return this.channelArray.includes(e.access_departid)
      }).length
    },

    resonDesc() {
      const stateName = ['待整改', '已整改', '无需整改']
      const arr = ['未整改说明:', '具体整改措施:', '无需整改原因:']
      const index = stateName.findIndex(e => e === this.currentItem.state_name)
      return arr[index]
    }
  },
  async created() {
    this.listLoading = false
    this.currentMonth = this.getCurrentMonth()
    await this.getList(
      this.listQuery.offset,
      // this.listQuery.limit,
      100000,
      this.currentMonth
    )
    // 初始化按项目筛选的项目名称
    await this.inintAuditType()
  },
  methods: {
    async getItem(row) {
      this.dialogVisible = true
      this.currentItem = row
    },
    dialogClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm(formName) {
      const {
        id = undefined,
        serial_number = undefined,
        audit_date = undefined,
        state_name = undefined,
        reject_reason = undefined
      } = this.currentItem
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await auditModify({
            id,
            serialNumber: serial_number,
            auditdate: audit_date,
            stateName: state_name,
            rejectReason: reject_reason
          })
          this.dialogVisible = false
          location.reload()
        } else {
          this.$message.error('请确认稽核反馈信息填写是否符合要求')
          return false
        }
      })
    },
    getCurrentMonth() {
      const fullYear = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      if (month < 10) {
        return `${fullYear}0${month}`
      }
      return `${fullYear}${month}`
    },
    async getList(offset, limit, auditdate, audittype) {
      this.listLoading = true
      const { result = null, total = undefined } = await getAuditList({
        offset: offset,
        limit: limit,
        auditdate: auditdate,
        audittype: audittype
      })
      this.listLength = total
      this.list = result
      this.listLoading = false
    },
    async inintAuditType() {
      const result = await getAuditType()
      result['result'].forEach(e => {
        this.auditTypeOptions.push({
          value: e.audit_type,
          lable: e.audit_type
        })
      })
    },
    getPrevPage(p) {
      this.currentPage = p - 1
    },
    getNextPage(p) {
      this.currentPage = p - 1
    },
    // async getCurrentPage(p) {
    //   await this.getList(
    //     parseInt(p - 1) * parseInt(this.listQuery.limit),
    //     // this.listQuery.limit,
    //     100000,
    //     this.currentMonth
    //   );
    //   this.currentPage = parseInt(p - 1);
    // },
    async getCurrentPage(p) {
      this.currentPage = p - 1
      // await this.getList(
      //   // parseInt(p - 1) * parseInt(this.listQuery.limit),
      //   // this.listQuery.limit,
      //   this.listQuery.limit,
      //   100000,
      //   this.currentMonth
      // );
      // this.currentPage = parseInt(p - 1);
    },
    sortByFineFee(a, b) {
      return a.fine_fee - b.fine_fee
    },
    sortByAuditDate(a, b) {
      return a.audit_date - b.audit_date
    },
    async serialSearch() {
      if (!this.inputSerial) {
        return false
      }
      this.auditTypeValue = undefined
      const { result = null, total = undefined } = await getAuditList({
        offset: 0,
        limit: 100000,
        auditdate: this.currentMonth
      })
      this.listLength = total

      const remoteIndex = result.findIndex(
        e => e.serial_number === this.inputSerial
      )

      if (remoteIndex === -1) {
        this.$message({ message: '未查询到稽核号码信息', type: 'warning' })
        return false
      }

      const pageNumber = remoteIndex / this.listQuery.limit
      await this.getCurrentPage(pageNumber + 1)

      const localIndex = this.list.findIndex(
        e => e.serial_number === this.inputSerial
      )
      return this.list.splice(0, 0, this.list.splice(localIndex, 1)[0])
    },

    async searchByMonth() {
      this.auditTypeValue = undefined
      await this.getList(
        this.listQuery.offset,
        // this.listQuery.limit,
        100000,
        this.currentMonth
      )
    },
    async searchByAuditType() {
      await this.getList(
        this.listQuery.offset,
        // this.listQuery.limit,
        100000,
        this.currentMonth,
        this.auditTypeValue
      )
    },
    async exportFile() {
      this.auditTypeValue = undefined
      const { result = null } = await getAuditList({
        offset: 0,
        limit: 100000,
        auditdate: this.currentMonth
      })

      const ownerResult = result.filter(e => {
        return this.channelArray.includes(e.access_departid)
      })
      ownerResult.unshift({
        id: '编号',
        audit_type: '稽核项目',
        audit_date: '稽核日期',
        non_conformance: '差错原因',
        fee: '差错金额',
        serial_number: '服务号码',
        net_type_name: '网别',
        subjects_name: '业务名称',
        product_name: '产品名称',
        access_departname: '受理/发展渠道、发展人(政企)',
        access_departid: '渠道编码',
        access_staffid: '受理工号',
        access_date: '受理时间',
        id_desc: '归属营服',
        state_name: '是否整改',
        reject_reason: '未整改原因或整改说明',
        check_desc: '复核详情',
        fine_fee: '考核金额',
        audit_staffname: '稽核员姓名',
        remark_desc: '备注',
        cuc_depart_code: '集中系统编码'
      })
      exportCsv(ownerResult)
    },
    rowStyle({ row, rowIndex }) {
      const styleObj = {}
      if (rowIndex === 0 && row.serial_number === this.inputSerial) {
        styleObj['background'] = '#f0f9eb'
        return styleObj
      }
    }
  }
}
</script>

<style scoped lang="scss">
.table-container {
  margin-top: 10px;
}
.condtion-container {
  display: flex;
  justify-content: space-between;
  .serial-search {
    width: 30%;
    float: right;
  }
  .export-button {
    margin-right: 10px;
  }
}

.serial-pagination {
  padding-top: 10px;
  text-align: center;
}
.item-cotainer {
  min-width: 80%;
  .items {
    display: flex;
    margin-bottom: -15px;
    justify-content: flex-start;
    align-items: center;
    color: #909399;
    h4 {
      padding-right: 15px;
      color: #606266;
    }
  }
  .reject {
    flex-direction: column;
    align-items: flex-start;
    font-size: 20px;
    .reject-desc {
      min-width: 500px;
    }
  }
}
</style>
