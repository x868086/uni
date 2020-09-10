<template>
  <div id="container">
    <el-table
      class="table-container"
      :data="ownerList"
      border
      fit
      style="width: 100%"
      height="550"
      fixed="left"
      stripe
    >
      <el-table-column align="center" label="ID" prop="id" min-width="60" fixed>
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="90px"
        align="center"
        prop="sale_date"
        label="销售时间"
        fixed="left"
        :sortable="true"
        :sort-method="sortBySaleDate"
      >
        <template slot-scope="{ row }">
          <span>{{ row.sale_date }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="70px"
        align="center"
        label="终端品牌"
        prop="brand"
        fixed="left"
      >
        <template slot-scope="{ row }">
          <span>{{ row.brand }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="销售价格"
        min-width="160"
        prop="sale_price"
        :sortable="true"
        :sort-method="sortBySalePrice"
        fixed="left"
      >
        <template slot-scope="{ row }">
          <span>{{ row.sale_price }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="联系电话"
        min-width="120"
        prop="contact_phone"
        fixed="left"
      >
        <template slot-scope="{ row }">
          <span>{{ row.contact_phone }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="用户名称"
        min-width="90"
        prop="customer_name"
        fixed="left"
      >
        <template slot-scope="{ row }">
          <span>{{ row.customer_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="礼品" min-width="70" prop="gift">
        <template slot-scope="{ row }">
          <span>{{ row.gift }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="销售门店"
        min-width="70"
        prop="depart_name"
      >
        <template slot-scope="{ row }">
          <span>{{ row.depart_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="店员"
        min-width="70"
        prop="salesclerk"
      >
        <template slot-scope="{ row }">
          <span>{{ row.salesclerk }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="服务号码"
        min-width="90"
        prop="service_phone"
      >
        <template slot-scope="{ row }">
          <span>{{ row.service_phone }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="活动类型"
        min-width="70"
        prop="service_type"
      >
        <template slot-scope="{ row }">
          <span>{{ row.service_type }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" min-width="70" prop="desc">
        <template slot-scope="{ row }">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      background
      :page-size="limit"
      :total="totalCount"
      class="serial-pagination"
      @prev-click="getPrevPage"
      @next-click="getNextPage"
      @current-change="getCurrentPage"
    />
  </div>
</template>

<script>
export default {
  name: 'CustomerList',
  props: ['ownerList', 'totalCount', 'currentMonth', 'limit'],
  data() {
    return {
      inputSerial: null,
      currentPage: 1
    }
  },
  methods: {
    sortBySaleDate(b, a) {
      return a.sale_date - b.sale_date
    },
    sortBySalePrice(b, a) {
      return a.sale_price - b.sale_price
    },
    getPrevPage(p) {},
    getNextPage(p) {},
    getCurrentPage(p) {
      this.$emit('getCurrentPage', p)
    }
  }
}
</script>

<style lang="scss" scoped>
.serial-pagination {
  padding-top: 10px;
  text-align: center;
}
</style>
