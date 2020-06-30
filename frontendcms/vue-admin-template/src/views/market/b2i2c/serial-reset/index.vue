<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      height="550"
    >
      <el-table-column align="center" label="ID" prop="id">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" prop="serial_number" label="号码">
        <template slot-scope="{row}">
          <span>{{ row.serial_number}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" prop="product_name" label="套餐名称">
        <template slot-scope="{row}">
          <span>{{ row.product_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="营服名称" prop="id_desc">
        <template slot-scope="{row}">
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
        width="90"
        prop="fee"
        :sortable="true"
        :sort-method="sortByFee"
      >
        <template slot-scope="{row}">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row.fee }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="联系电话"
        width="110"
        prop="contact_phone"
      >
        <template slot-scope="{row}">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row. contact_phone}}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="发展人"
        width="90"
        prop="dev_name"
      >
        <template slot-scope="{row}">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row.dev_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="发展人手机号"
        width="110"
        prop="dev_phone"
      >
        <template slot-scope="{row}">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row.dev_phone }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="操作时间"
        width="150"
        prop="operate_time"
        :sortable="true"
        :sort-method="sortByOperateTime"
      >
        <template slot-scope="{row}">
          <!-- <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag> -->
          <span>{{ row.operate_time }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        align="center"
        label="状态"
        width="90"
        prop="operate"
        :sortable="true"
        :sort-method="sortByOperateAction"
      >
        <template slot-scope="{row}">
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

      <el-table-column align="center" label="操作" width="230">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            :disabled="row.operate!=='待处理'"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="serialAllocate(row.serial_number)"
          >释放</el-button>

          <el-button
            v-if="row.edit"
            type="warning"
            :disabled="row.operate!=='待处理'"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="serialReject(row.serial_number)"
          >驳回</el-button>

          <el-button
            v-if="row.edit"
            type="danger"
            :disabled="['删除','已处理'].includes(row.operate) "
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="serialRemove(row.serial_number)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { getb2iserial, allocate, reject, remove } from '@/api/b2i2c'

import axios from 'axios'

export default {
  name: 'InlineEditTable',
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      // const { data = undefined } = await fetchList(this.listQuery)

      const { offset, limit, result } = await getb2iserial({
        offset: this.listQuery.offset,
        limit: this.listQuery.limit
      })
      const items = result
      this.list = items.map((v, i) => {
        this.$set(v, 'edit', v.operate) // https://vuejs.org/v2/guide/reactivity.html
        this.$set(v, 'id', i + 1)
        // v.originalTitle = v.title //  will be used when user click the cancel botton
        return v
      })
      this.listLoading = false
    },

    async serialAllocate(serial) {
      let operate = '已处理'
      let operateTime = new Date().getTime()
      try {
        let result = await allocate(serial, { operate, operateTime })
        await this.getList()
      } catch (error) {
        return false
      }
    },

    async serialReject(serial) {
      let operate = '驳回'
      let operateTime = new Date().getTime()
      try {
        let result = await reject(serial, { operate, operateTime })
        await this.getList()
      } catch (error) {
        return false
      }
    },

    async serialRemove(serial) {
      let operate = '删除'
      let operateTime = new Date().getTime()
      try {
        let result = await remove(serial, { operate, operateTime })
        await this.getList()
      } catch (error) {
        return false
      }
    },
    cancelEdit(row) {
      // row.title = row.originalTitle
      // row.edit = false
      // this.$message({
      //   message: 'The title has been restored to the original value',
      //   type: 'warning'
      // })
    },
    confirmEdit(row) {
      // row.edit = false
      // row.originalTitle = row.title
      // this.$message({
      //   message: 'The title has been edited',
      //   type: 'success'
      // })
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
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
