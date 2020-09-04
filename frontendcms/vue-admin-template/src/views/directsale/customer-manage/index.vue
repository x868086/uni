<template>
  <section class="content-wrap">
    <div class="customer-info-wrap" v-loading="loading">
      <div class="block">
        <el-date-picker
          v-model="currentMonth"
          type="month"
          placeholder="选择月"
          format="yyyyMM"
          value-format="yyyyMM"
          :clearable="false"
          @change="selectMonth"
        >
        </el-date-picker>
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
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
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
              style="width: 15%;"
              prop="customerName"
            >
              <el-input v-model="form.customerName"></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              style="width: 20%;"
              prop="contactPhone"
            >
              <el-input
                v-model="form.contactPhone"
                placeholder="固话请加0717前缀"
              ></el-input>
            </el-form-item>

            <el-form-item label="购机时间" prop="saleDate">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.saleDate"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 20%;"
                ></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="终端品牌" prop="brand" style="width: 15%;">
              <el-select v-model="form.brand" placeholder="请选择终端品牌">
                <el-option
                  v-for="(e, i) in terminalBrand"
                  :key="e[i]"
                  :label="Object.values(e)[0]"
                  :value="Object.keys(e)[0]"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="销售价格" style="width: 15%;" prop="salePrice">
              <el-input
                v-model.number="form.salePrice"
                placeholder="￥(元)"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="跟机号码"
              style="width: 20%;"
              prop="servicePhone"
            >
              <el-input
                v-model="form.servicePhone"
                placeholder="固话请加0717前缀"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动类型">
              <el-radio-group v-model="form.serviceType">
                <el-radio label="单卡跟机"></el-radio>
                <el-radio label="金融分期"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="搭载礼品" prop="userGift">
              <el-checkbox-group v-model="form.userGift" @change="addGift">
                <el-checkbox
                  v-for="e in giftList"
                  :key="e"
                  :label="e"
                  :name="e"
                >
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item
              label="销售门店"
              style="width: 25%;"
              prop="departName"
            >
              <el-input v-model="nickname" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item
              label="销售店员"
              style="width: 15%;"
              prop="salesclerk"
            >
              <el-input v-model="form.salesclerk"></el-input>
            </el-form-item>

            <el-form-item label="备注" style="width: 65%;">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('form')"
                :disabled="!channelId"
                >立即创建</el-button
              >
              <el-button @click="resetForm('form')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="客户列表" name="customerList" :disabled="hiddenTabs"
          >客户信息列表</el-tab-pane
        >
      </el-tabs>
    </section>
  </section>
</template>
<script>
import countTo from "vue-count-to";

import { mapGetters } from "vuex";

import { addCustomer, getList } from "@/api/customer";
export default {
  name: "customer-manage",
  components: { countTo },
  data() {
    return {
      listQuery: {
        offset: 0,
        limit: 50
      },
      loading: false,
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
      this.roles.length === 1 && this.roles[0] === "DirectSeller"
        ? true
        : false;
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
      let { totalCount = undefined, currentOwnerList = null } = await getList({
        offset: this.listQuery.offset,
        limit: this.listQuery.limit,
        acctMonth: month
      });
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await addCustomer(this.form);
          this.resetForm("form");
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
}
</style>
