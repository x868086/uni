<template>
  <div style="padding:30px;" class="threshold-wrap">
    <el-row>
      <el-col :span="12">
        <section class="threshold-config">
          <div class="threshold-items">
            <span>弹窗产品名称：</span
            ><el-input
              type="text"
              placeholder="请输入产品名称"
              v-model="configName"
              maxlength="30"
              show-word-limit
              class="config-name"
            >
            </el-input>
          </div>

          <!-- <threshold></threshold> -->
          <div class="threshold-append">
            <el-button
              type="primary"
              size="small"
              @click.native="appendThreshold"
              >添加</el-button
            >
            <!-- <el-button
              type="warning"
              size="small"
              @click.native="resolveThreshold"
              >解析</el-button
            > -->
            <el-button
              type="success"
              size="small"
              @click.native="uploadThreshold"
              :disabled="!thresholdDescribe"
              >提交</el-button
            >
          </div>
        </section>
      </el-col>
      <el-col :span="12">
        <section class="threshold-describe">
          <el-input
            type="textarea"
            placeholder="规则解析说明..."
            v-model="thresholdDescribe"
            maxlength="200"
            show-word-limit
            :clearable="false"
            :readonly="true"
            :autosize="true"
            resize="none"
          >
          </el-input>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Thresholds from './components/function';
import { thresholdCreate } from '@/api/classic';
export default {
  name: 'threshold-config',
  data() {
    return {
      configName: '',
      thresholdsObj: null,
      thresholdDescribe: '',
      thresholdsInstance: null,
    };
  },
  computed: {
    ...mapGetters(['nickname']),
  },
  mounted() {
    this.initDom();
  },
  methods: {
    initDom() {
      this.thresholdsInstance = new Thresholds();
    },
    thresholdValidate() {
      let obj = [];
      let validateResult = [];
      obj = obj.concat(this.thresholdsObj);
      while (true) {
        let val1 = obj.shift();
        if (obj.length) {
          let val2 = obj[0].gt;
          validateResult.push(val1.lte === val2);
        } else {
          break;
        }
      }
      let allValidate = validateResult.every((e) => {
        return e;
      });

      if (!allValidate) {
        this.$message({
          message: `阈值区间值设置错误`,
          type: 'error',
        });
      }
      return allValidate;
    },
    appendThreshold() {
      this.thresholdsInstance.createDom();
      this.resolveThreshold();
    },
    resolveThreshold() {
      let result = this.thresholdsInstance.domArray.map((e) => {
        let { title, gt, lte } = e.$data;
        return {
          configName: this.configName,
          title,
          gt,
          lte,
          startDate: new Date().getTime(),
          endDate: new Date().getTime(),
          operator: this.nickname,
        };
      });
      this.thresholdsObj = result;
      this.thresholdDescribe = '';
      this.thresholdsObj.forEach((e) => {
        this.thresholdDescribe += `
        产品名称：${e.configName}. 大于${e.gt},小于等于${e.lte}, 推荐${e.title}.
        `;
      });
    },
    async uploadThreshold() {
      this.resolveThreshold();
      this.thresholdValidate();
      this.thresholdsObj.forEach(async (e) => {
        await thresholdCreate(e);
      });
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.threshold-wrap {
  .threshold-config {
    .threshold-items {
      padding-right: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #606266;
        flex-shrink: 0;
      }
    }
  }
  .threshold-append {
    padding-top: 20px;
  }
}
</style>
