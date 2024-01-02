<template>
  <div class="container">
    <el-select
      v-model="modelName"
      placeholder="选择数据表"
      size="mini"
      class="select-model"
    >
      <el-option
        v-for="item in getOwnerModelsOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-button
      type="warning"
      size="mini"
      icon="el-icon-circle-check-outline"
      :disabled="getOwnerModelsOptions.length < 1"
      @click.native="truncateTable(fileName)"
    >清空</el-button>
    <el-button
      type="success"
      size="mini"
      icon="el-icon-circle-check-outline"
      :disabled="
        fileName.split('.').slice(-1)[0] !== 'xlsx' ||
          getOwnerModelsOptions.length < 1
      "
      @click.native="rollingRow(fileName)"
    >导入</el-button>
    <el-button
      type="danger"
      size="mini"
      icon="el-icon-circle-check-outline"
      :disabled="getOwnerModelsOptions.length < 1"
      @click.native="removeFile(fileName)"
    >删除</el-button>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import { removeFile, rollingFile, rowsTruncate } from '@/api/thomas'
import { mapGetters } from 'vuex'

export default {
  name: 'UploadSelect',
  props: ['fileName'],
  data() {
    return {
      modelName: '',
      modelsOptions: [
        {
          value: 'psptarpu',
          label: '证件号消费',
          owner: ['林艳', '超级管理员']
        },
        {
          value: 'audit',
          label: '稽核明细',
          owner: ['达慧', '袁琼', '超级管理员']
        },
        {
          value: 'specialserial',
          label: '靓号协议期',
          owner: ['朱晶', '袁琼', '超级管理员']
        },
        {
          value: 'b2iserial',
          label: '2i二次销售',
          owner: ['李锴', '超级管理员']
        },
        {
          value: 'servicedetail',
          label: '全量工单',
          owner: ['谭妮娜','超级管理员']
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['nickname']),
    getOwnerModelsOptions() {
      return this.modelsOptions.filter(e => {
        return e.owner.includes(this.nickname)
      })
    }
  },
  methods: {
    async rollingRow(fileName) {
      NProgress.start()
      await rollingFile({
        filePath: fileName,
        modelName: this.modelName
      })
      NProgress.done()
    },
    async removeFile(fileName) {
      await removeFile({ fileName: fileName })
      const t = setTimeout(() => {
        location.reload()
        clearTimeout(t)
      }, 2000)
    },
    async truncateTable(fileName) {
      NProgress.start()
      const result = await rowsTruncate({
        filePath: fileName,
        modelName: this.modelName
      })
      if (result === 0) {
        this.$message({
          message: `数据已清空`,
          type: 'warning'
        })
      }
      NProgress.done()
    }
  }
}
</script>

<style lang="scss">
.select-model {
  // padding-left: 10px;
  padding-right: 10px;
  width: 135px;
}
</style>
