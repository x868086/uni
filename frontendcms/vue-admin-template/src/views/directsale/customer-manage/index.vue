<template>
  <section class="content-wrap">
    <div v-loading="loading" class="customer-info-wrap">
      <div class="block">
        <el-date-picker
          v-model="currentMonth"
          type="month"
          placeholder="选择月"
          format="yyyyMM"
          value-format="yyyyMM"
          :clearable="false"
          @change="selectMonth"
        />
      </div>

      <div class="count-month-wrap">
        <span>{{ currentMonth }}</span>
        <count-to
          :start-val="0"
          :end-val="monthCount"
          :duration="2000"
          :decimals="0"
          class="count-month-content"
        />
      </div>

      <div class="count-total-wrap">
        <span>累计</span>
        <count-to
          :start-val="0"
          :end-val="totalCount"
          :duration="2000"
          :decimals="0"
          class="count-total-content"
        />
      </div>
    </div>

    <section class="customer-manage-wrap">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="客户添加" name="customerAdd">
          <!-- <el-date-picker
            v-model="currentDay"
            type="date"
            placeholder="选择日期"
            value-format="yyyy 年 MM 月 dd 日"
          >
          </el-date-picker> -->
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item
              label="用户姓名"
              style="width: 16%;"
              prop="customerName"
            >
              <el-input v-model="form.customerName" />
            </el-form-item>
            <el-form-item
              label="联系电话"
              style="width: 25%;"
              prop="contactPhone"
            >
              <el-input
                v-model="form.contactPhone"
                placeholder="固话请加0717前缀"
              />
            </el-form-item>

            <el-form-item label="购机时间" prop="saleDate">
              <el-col :span="11">
                <el-date-picker
                  v-model="form.saleDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 30%;"
                />
              </el-col>
            </el-form-item>

            <el-form-item label="终端品牌" prop="brand" style="width: 25%;">
              <el-select v-model="form.brand" placeholder="请选择终端品牌">
                <el-option
                  v-for="(e, i) in terminalBrand"
                  :key="e[i]"
                  :label="Object.values(e)[0]"
                  :value="Object.values(e)[0]"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="销售价格" style="width: 15%;" prop="salePrice">
              <el-input v-model.number="form.salePrice" placeholder="￥(元)" />
            </el-form-item>
            <el-form-item
              label="跟机号码"
              style="width: 25%;"
              prop="servicePhone"
            >
              <el-input
                v-model="form.servicePhone"
                placeholder="固话请加0717前缀"
              />
            </el-form-item>
            <el-form-item label="活动类型">
              <el-radio-group v-model="form.serviceType">
                <el-radio label="单卡跟机" />
                <el-radio label="金融分期" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="搭载礼品" prop="userGift">
              <el-checkbox-group v-model="form.userGift" @change="addGift">
                <el-checkbox
                  v-for="e in giftList"
                  :key="e"
                  :label="e"
                  :name="e"
                />
              </el-checkbox-group>
            </el-form-item>

            <el-form-item
              label="销售门店"
              style="width: 25%;"
              prop="departName"
            >
              <el-input v-model="nickname" :disabled="true" />
            </el-form-item>

            <el-form-item
              label="销售店员"
              style="width: 15%;"
              prop="salesclerk"
            >
              <el-input v-model="form.salesclerk" />
            </el-form-item>

            <el-form-item label="备注" style="width: 65%;">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :disabled="!channelId"
                @click="submitForm('form')"
                >立即创建</el-button
              >
              <el-button @click="resetForm('form')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="客户列表"
          name="customerList"
          :disabled="hiddenTabs"
        >
          <div class="listHeader">
            <el-button
              type="primary"
              icon="el-icon-document"
              class="export-button"
              size="medium"
              @click.native="exportFile"
              >导出CSV文件</el-button
            >
          </div>
          <customer-list
            :owner-list="currentOwnerList"
            :limit="listQuery.limit"
            :current-month="currentMonth"
            :total-count="totalCount"
            @getCurrentPage="getCurrentList"
            v-loading="tableLoading"
          />
        </el-tab-pane>
      </el-tabs>
    </section>
  </section>
</template>
<script>
import countTo from "vue-count-to";

import CustomerList from "./components/customerList";

import { mapGetters } from "vuex";

import { addCustomer, getList } from "@/api/customer";
import { exportCsv } from "@/utils/export-csv";
export default {
  name: "CustomerManage",
  components: { countTo, CustomerList },
  data() {
    return {
      listQuery: {
        offset: 0,
        limit: 25
      },
      loading: false,
      tableLoading: false,
      currentMonth: null,
      totalCount: 0,
      monthCount: 0,
      currentOwnerList: null,
      activeName: "customerAdd",
      terminalBrand: [
        { honor: "荣耀" },
        { huawei: "华为" },
        { oppo: "OPPO" },
        { vivo: "VIVO" },
        { xiaomi: "小米" },
        { apple: "苹果" },
        { samsung: "三星" },
        { redmi: "红米" },
        { simple: "按键机" },
        { other: "其它" }
      ],
      giftList: [
        "钢化膜",
        "手机壳",
        "维达抽纸",
        "维达提纸",
        "蓝月亮洗衣液",
        "其它"
      ],
      form: {
        customerName: "",
        contactPhone: "",
        brand: "",
        salePrice: "",
        saleDate: "",
        acctMonth: "",
        servicePhone: "",
        serviceType: "",
        userGift: [],
        gift: "",
        departName: "",
        salesclerk: "",
        desc: ""
      },
      rules: {
        customerName: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "联系电话为11位数值,固话请加0717前缀",
            trigger: "blur"
          }
        ],
        saleDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        brand: [
          { required: true, message: "请选择终端品牌", trigger: "change" }
        ],
        salePrice: [
          { type: "number", message: "价格必须为数值" },
          {
            required: true,
            message: "请输入终端价格",
            trigger: "blur"
          }
        ],
        servicePhone: [
          {
            min: 11,
            max: 11,
            message: "服务号码为11位数值,固话请加0717前缀",
            trigger: "blur"
          }
        ],
        userGift: [
          {
            type: "array",
            required: true,
            message: "请至少选择一项礼品",
            trigger: "change"
          }
        ],
        departName: [
          { required: true, message: "请输入门店名称", trigger: "blur" }
        ],
        salesclerk: [
          { required: true, message: "请输入店员名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["roles", "nickname", "channelId"]),
    hiddenTabs() {
      // 直销人员权限屏蔽客户列表tabs
      return !!(this.roles.length === 1 && this.roles[0] === "DirectSeller");
    }
  },
  async created() {
    this.currentMonth = this.getCurrentMonth();
    this.form.acctMonth = this.getCurrentMonth();
    this.form.departName = this.nickname;
    this.form.departid = this.channelId;
    await this.getCurrentMonthList(this.currentMonth);
  },
  methods: {
    getCurrentMonth() {
      const fullYear = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      if (month < 10) {
        return `${fullYear}0${month}`;
      }
      return `${fullYear}${month}`;
    },
    async getCurrentMonthList(month) {
      this.loading = true;
      const { totalCount = undefined, currentOwnerList = null } = await getList(
        {
          offset: this.listQuery.offset,
          // limit: this.listQuery.limit,
          limit: 100000,
          acctMonth: month
        }
      );
      this.totalCount = totalCount;
      this.monthCount = currentOwnerList.length;
      this.currentOwnerList = currentOwnerList;
      this.loading = false;
    },
    async selectMonth(val) {
      await this.getCurrentMonthList(val);
    },
    addGift(val) {
      this.form.gift = val.join(",");
    },
    handleClick(tab, event) {},
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await addCustomer(this.form);
          this.resetForm("form");
          setTimeout(function() {
            location.reload();
          }, 1000);
        } else {
          this.$message({
            message: "提交错误,请检查表单内容",
            type: "error"
          });
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getCurrentList(p) {
      this.tableLoading = true;
      const { totalCount = undefined, currentOwnerList = null } = await getList(
        {
          offset: parseInt(p - 1) * parseInt(this.listQuery.limit),
          limit: this.listQuery.limit,
          acctMonth: this.currentMonth
        }
      );
      this.currentPage = parseInt(p - 1);
      this.currentOwnerList = currentOwnerList;
      this.totalCount = totalCount;
      this.tableLoading = false;
    },
    async exportFile() {
      const { currentOwnerList = null } = await getList({
        offset: 0,
        limit: 100000,
        acctMonth: this.currentMonth
      });
      exportCsv(currentOwnerList);
    }
  }
};
</script>

<style lang="scss" scoped>
.content-wrap {
  .customer-info-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    .count-total-wrap,
    .count-month-wrap {
      margin-left: 35px;
      font-size: 16px;
      font-weight: 600;
      color: #f6416c;
      .count-total-content,
      .count-month-content {
        text-align: center;
        font-size: 80px;
        font-weight: 500;
        color: #f6416c;
      }
      .count-month-content {
        font-size: 45px;
      }
    }
  }
  .customer-manage-wrap {
    padding: 20px;
  }
  .export-button {
    margin-right: 10px;
  }
}
</style>
