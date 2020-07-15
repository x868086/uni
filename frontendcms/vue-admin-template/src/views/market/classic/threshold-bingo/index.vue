<template>
  <section class="content-wrap">
    <div class="search-wrap">
      <div class="count-wrap">
        <!-- <countTo :startVal="0" :endVal="200" :duration="3000"></countTo> -->
        <span>近三月消费均值: </span>
        <count-to
          :start-val="0"
          :end-val="avgFee"
          :duration="4000"
          :decimals="2"
          class="count-content"
          prefix="￥"
        ></count-to>
      </div>
      <el-input
        v-model="inputPspt"
        placeholder="请输入证件号码"
        size="large"
        suffix-icon="el-icon-search"
        class="pspt-search"
        @blur="psptSearch"
      />
    </div>

    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="(item, idx) in thresholdArray"
        :key="idx"
        :title="item.config_name"
        :name="idx"
      >
        <template slot="title">
          <span
            class="threshold-title"
            v-bind:class="[
              activeNames.includes(idx) ? titleActive : titleInactive,
            ]"
            >{{ item.config_name }}</span
          ><i
            class="header-icon el-icon-info"
            v-bind:class="[
              activeNames.includes(idx) ? titleActive : titleInactive,
            ]"
          ></i>
        </template>

        <div class="threshold-content">
          <p>推荐: {{ item.title }}</p>
          <div>月均消费大于 {{ item.gt }} 元, 且小于等于{{ item.lte }} 元</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>
<script>
import countTo from 'vue-count-to';
export default {
  name: 'threshold-bingo',
  components: { countTo },
  data() {
    return {
      inputPspt: null,
      activeNames: [],
      avgFee: 100.68,
      thresholdArray: [
        {
          config_name: '花呗红包30%赠费',
          gt: 196,
          lte: 212,
          title: '低消298元,赠送红包86元,赠送时长24月',
        },
        {
          config_name: '花呗分期推荐40%赠费',
          gt: 156,
          lte: 208,
          title: '5G套餐399元,赠送191元,赠送时长24月',
        },
        {
          config_name: '5G直降活动',
          gt: 156,
          lte: 208,
          title: '推荐5G套餐399档级，终端直降4000元',
        },
      ],
      titleActive: 'title-active',
      titleInactive: 'title-inactive',
    };
  },
  computed: {},
  mounted() {
    this.initActiveNames();
  },
  methods: {
    initActiveNames() {
      this.activeNames = this.thresholdArray.map((e, i) => i);
    },
    handleChange(val) {
      console.log(val);
    },
    psptSearch() {
      console.log(this.inputPspt);
    },
  },
};
</script>

<style lang="scss" scoped>
.content-wrap {
  .search-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px;
    .count-wrap {
      font-size: 16px;
      font-weight: 600;
      color: #f6416c;
      .count-content {
        text-align: center;
        font-size: 80px;
        font-weight: 500;
        color: #f6416c;
      }
    }
    .pspt-search {
      width: 30%;
    }
  }
  .threshold-title {
    font-size: 20px;
    font-weight: bold;
    padding-right: 10px;
  }
  .threshold-content {
    color: #606266;
    font-size: 16px;
  }
  .header-icon {
    font-size: 20px;
  }
  .title-active {
    color: #409eff;
  }
  .title-inactive {
    color: #606266;
  }
}
</style>
