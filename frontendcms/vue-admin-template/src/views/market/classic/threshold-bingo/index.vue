<template>
  <section class="content-wrap">
    <div class="search-wrap">
      <div class="count-wrap">
        <!-- <countTo :startVal="0" :endVal="200" :duration="3000"></countTo> -->
        <span>近三月消费均值:</span>
        <count-to
          :start-val="0"
          :end-val="userArpu"
          :duration="2000"
          :decimals="2"
          class="count-content"
          prefix="￥"
        />
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
            :class="[
              activeNames.includes(idx) ? titleActive : titleInactive,
            ]"
          >{{ item.config_name }}</span>
          <i
            class="header-icon el-icon-info"
            :class="[
              activeNames.includes(idx) ? titleActive : titleInactive,
            ]"
          />
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
import countTo from 'vue-count-to'
import { getArpu, arpuBingo } from '@/api/classic'
export default {
  name: 'ThresholdBingo',
  components: { countTo },
  data() {
    return {
      inputPspt: null,
      activeNames: [],
      userArpu: 0,
      thresholdArray: [],
      titleActive: 'title-active',
      titleInactive: 'title-inactive'
    }
  },
  computed: {},
  mounted() {
    this.initActiveNames()
  },
  methods: {
    initActiveNames() {
      this.activeNames = this.thresholdArray.map((e, i) => i)
    },
    initInputArpu() {
      this.userArpu = 0
      this.thresholdArray = []
    },
    handleChange(val) {
      console.log(val)
    },
    async psptSearch() {
      this.initInputArpu()
      if (this.inputPspt.length < 6) {
        return false
      }
      const { arpuValue = undefined } = await getArpu({ psptId: this.inputPspt })
      this.userArpu = arpuValue
      const result = await arpuBingo({ arpu: arpuValue })
      this.thresholdArray = result
      this.initActiveNames()
    }
  }
}
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
