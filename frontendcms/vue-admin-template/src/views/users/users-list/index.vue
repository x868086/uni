<template>
  <div class="app-container">
    <section class="condtion-container">
      <el-input
        v-model="inputSerial"
        placeholder="用户账号查询"
        size="large"
        suffix-icon="el-icon-search"
        class="serial-search"
        @blur="serialSearch"
      />
    </section>
    <el-table
      v-loading="listLoading"
      class="table-container"
      :data="List"
      border
      fit
      style="width: 100%"
      height="550"
      stripe
    >
      <el-table-column
        min-width="60px"
        align="center"
        prop="account"
        label="用户账号"
        fixed
      >
        <template slot-scope="{ row }">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="100px"
        align="center"
        prop="roleName"
        label="角色名称"
        fixed
      >
        <template slot-scope="{ row }">
          <div class="role-wrap">
            <el-tag v-for="e in row.roleName" :key="e" size="mini">{{
              e
            }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        min-width="160px"
        align="center"
        label="归属节点"
        prop="orgDesc"
        fixed
      >
        <template slot-scope="{ row }">
          <span>{{ row.orgDesc }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="用户名称"
        min-width="160"
        prop="nickname"
        fixed="left"
      >
        <template slot-scope="{ row }">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="用户状态"
        min-width="50"
        prop="stateName"
      >
        <template slot-scope="{ row }">
          <el-tag
            size="mini"
            :type="row.stateName === '启用' ? 'success' : 'danger'"
          >{{ row.stateName }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="120" prop>
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            :disabled="row.account === 'rootroot123'"
            size="mini"
            @click.native="resetUser(row)"
          >重置</el-button>
          <el-button
            type="success"
            :disabled="row.account === 'rootroot123'"
            size="mini"
            @click.native="usersOn(row)"
          >启用</el-button>
          <el-button
            type="danger"
            :disabled="row.account === 'rootroot123'"
            size="mini"
            @click.native="usersOff(row)"
          >停用</el-button>
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
import {
  resetPwd,
  usersList,
  usersSearch,
  usersEnable,
  usersDisable
} from '@/api/user'

export default {
  name: 'ResetPwd',
  data() {
    return {
      listQuery: {
        offset: 0,
        limit: 20
      },
      currentItem: {},
      List: [],
      listLength: 0,
      listLoading: true,
      inputSerial: null
    }
  },

  async created() {
    this.listLoading = false
    await this.getList(this.listQuery.offset, this.listQuery.limit)
  },
  methods: {
    async resetUser(row) {
      await resetPwd({ account: row.account })
      setTimeout(function() {
        location.reload()
      }, 1000)
    },
    async usersOn(row) {
      await usersEnable(row.account)
      setTimeout(function() {
        location.reload()
      }, 1000)
    },
    async usersOff(row) {
      await usersDisable(row.account)
      setTimeout(function() {
        location.reload()
      }, 1000)
    },
    async getList(offset, limit) {
      this.listLoading = true
      const {
        result: { userList, total }
      } = await usersList({
        offset: offset,
        limit: limit
      })
      this.List = userList
      this.listLength = total
      this.listLoading = false
    },
    getPrevPage(p) {},
    getNextPage(p) {},
    async getCurrentPage(p) {
      await this.getList(
        parseInt(p - 1) * parseInt(this.listQuery.limit),
        this.listQuery.limit,
        this.currentMonth
      )
      this.currentPage = parseInt(p - 1)
    },
    async serialSearch() {
      if (!this.inputSerial) {
        return false
      }
      this.List = []
      const result = await usersSearch(this.inputSerial)
      this.List.push(result)
      this.listLength = 1
    }
  }
}
</script>

<style scoped lang="scss">
.table-container {
  margin-top: 10px;
  .role-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
.condtion-container {
  display: flex;
  justify-content: space-between;
  .serial-search {
    width: 30%;
    float: right;
  }
}

.serial-pagination {
  padding-top: 10px;
  text-align: center;
}
</style>
