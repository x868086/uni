<template>
  <div class="wrap">
    <section class="title-wrap">
      <el-row justify="space-between" align="middle" type="flex">
        <el-col :span="4" class="title-value">
          <p>大于</p>
          <p>小于等于</p>
        </el-col>
        <el-col :span="6">
          <div>
            <el-input-number
              v-model="gt"
              size="mini"
              :step="5"
              :min="0"
            />
            <el-input-number
              v-model="lte"
              size="mini"
              :step="5"
              :min="0"
            />
          </div>
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="title"
            class="config-name"
            type="textarea"
            placeholder="请输入档级推荐信息"
            maxlength="40"
            show-word-limit
            :clearable="true"
            rows="medium"
            resize="none"
          /></el-col>
        <el-col :span="2" class="threshold-remove">
          <el-button
            type="danger"
            icon="el-icon-close"
            size="mini"
            circle
            @click.native="closeNow"
          />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Threshold',
  data() {
    return {
      title: '',
      gt: 0,
      lte: 0
    }
  },
  methods: {
    closeNow() {
      this.$emit('closeNow', this)
      console.log(this)
    }
  }
}
</script>

<style lang="scss">
.title-wrap {
  margin: 10px 0px;
  .title-value {
    text-align: right;
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      margin: 0px;
      color: #606266;
      padding-right: 5px;
      font-size: 12px;
      line-height: 16px;
      flex-shrink: 1;
    }
  }
  .threshold-remove {
    text-align: center;
    line-height: 50px;
  }
}
</style>
