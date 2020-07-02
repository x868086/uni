<template>
  <div class="app-container">
    <el-input
      v-model="inputSerial"
      placeholder="请输入待销售号码"
      size="large"
      suffix-icon="el-icon-search"
      class="serial-search"
      @blur="serialSearch"
    ></el-input>
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
        label="套餐名称"
        fixed="left"
      >
        <template slot-scope="{ row }">
          <span>{{ row.product_name }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="营服名称" prop="id_desc">
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
          <span>{{ row.operate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="230">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.edit"
            type="primary"
            :disabled="['待处理', '已处理', '删除'].includes(row.operate)"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click.native="serialModify(row.serial_number)"
          >提交信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="二次销售信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="二次销售号码" :label-width="formLabelWidth" prop="serial">
          <el-input v-model="form.serial" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="发展人" :label-width="formLabelWidth" prop="devName">
          <el-input v-model="form.devName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发展人手机号" :label-width="formLabelWidth" prop="devPhone">
          <el-input v-model="form.devPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户联系电话" :label-width="formLabelWidth" prop="contactPhone">
          <el-input v-model="form.contactPhone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click.prevent="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      layout="prev, pager, next"
      background
      :page-size="listQuery.limit"
      :total="listLength"
      @prev-click="getPrevPage"
      @next-click="getNextPage"
      @current-change="getCurrentPage"
      class="serial-pagination"
    ></el-pagination>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { getb2iserial, modify } from '@/api/b2i2c'
import { isPhone, isChinesStr } from '@/utils/validate'

export default {
  name: 'serialModify',
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
    let validateDevName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入发展人名称'))
      } else if (!isChinesStr(value)) {
        callback(new Error('发展人名称最少2个字符且包含中文'))
      }
      callback()
    }
    let validateDevPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号码'))
        }
        callback()
      }
    }
    let validateContactPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系方式'))
      } else {
        if (!isPhone(value)) {
          callback(new Error('请输入正确的用户联系方式'))
        }
        callback()
      }
    }
    return {
      list: null,
      listLoading: true,
      listQuery: {
        offset: 0,
        limit: 10
      },
      inputSerial: null,
      listLength: 0,
      currentPage: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        serial: '',
        devName: '',
        devPhone: '',
        contactPhone: ''
      },
      rules: {
        devName: [
          {
            required: true,
            message: '请输入发展人名称',
            trigger: 'blur'
          },
          { validator: validateDevName, trigger: 'blur' }
        ],
        devPhone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validateDevPhone, trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { validator: validateContactPhone, trigger: 'blur' }
        ]
      }
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
    submitForm(formName) {
      this.$refs[formName].validate(async (valid, v2) => {
        if (valid) {
          let operate = '待处理'
          let operateTime = new Date().getTime()
          try {
            let result = await modify(this.form.serial, {
              devName: this.form.devName,
              devPhone: this.form.devPhone,
              contactPhone: this.form.contactPhone,
              operate,
              operateTime
            })
            await this.getList(
              this.currentPage * parseInt(this.listQuery.limit),
              this.listQuery.limit
            )
            this.dialogFormVisible = false
          } catch (error) {
            throw error
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },

    async serialModify(serial) {
      this.form = Object.assign(
        {},
        {
          serial: '',
          devName: '',
          devPhone: '',
          contactPhone: ''
        }
      )
      this.dialogFormVisible = true
      this.form.serial = serial
    },
    async serialSearch() {
      if (!this.inputSerial || this.inputSerial.length !== 11) {
        return false
      }
      const { result = null, total = undefined } = await getb2iserial({
        offset: 0,
        limit: 10000
      })

      let remoteIndex = result.findIndex(
        e => e.serial_number === this.inputSerial
      )

      if (remoteIndex === -1) {
        this.$message({ message: '未查询到待销售号码信息', type: 'warning' })
        return false
      }

      let pageNumber = remoteIndex / this.listQuery.limit
      await this.getCurrentPage(pageNumber + 1)

      let localIndex = this.list.findIndex(
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
    sortByOperateTime(a, b) {
      return a.operate_time - b.operate_time
    },
    sortByOperateAction(a, b) {
      return a.operate - b.operate
    },
    sortByOperateTime(a, b) {
      return a.operate_time - b.operate_time
    },
    sortByFee(a, b) {
      return a.fee - b.fee
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
