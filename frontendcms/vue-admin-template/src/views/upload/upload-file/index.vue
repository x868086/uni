<template>
  <section class="wrap-upload">
    <el-upload
      class="upload-content"
      drag
      :action="uploadUrl"
      :headers="uploadSetHeaders"
      :multiple="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="uploadValidate"
      name="file"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">只能上传.xlsx/.docx类型文件,且大小不超过50Mb</div>
    </el-upload>

    <el-table
      :data="tableData"
      fit
      highlight-current-row
      style="width: 100%"
      min-height="500"
      class="upload-display"
      :default-sort="{ prop: 'uploadTime', order: 'descending' }"
    >
      <el-table-column prop="fileName" label="文件名" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fileSize" label="大小" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.fileSize }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="filePath" label="路径" min-width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.filePath }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadTime" min-width="180" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.uploadTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operateAuthor" min-width="90" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.operateAuthor }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="stateName" min-width="90" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.stateName }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="uploadRow" min-width="90" label="计数">
        <template slot-scope="scope">
          <span>{{ scope.row.uploadRow }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="actions" label="执行" min-width="330">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click.native="removeFile(scope.row.fileName)"
          >删除</el-button>

          <el-dropdown
            split-button
            type="warning"
            size="mini"
            class="select-model"
            @command="selectModel"
          >
            选择数据表
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="psptarpu">证件号消费</el-dropdown-item>
              <el-dropdown-item command="specialserial">靓号协议期</el-dropdown-item>
              <el-dropdown-item command="b2iserial">2i二次销售</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button
            type="success"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click.native="rollingRow(scope.row.fileName)"
            :disabled="scope.row.fileName.split('.').slice(-1)[0] !== 'xlsx'"
          >导入</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import NProgress from 'nprogress'
import { getAccessToken } from '@/utils/auth'
import { _encode } from '@/utils/encode-token'
import { getUploadFileList, removeFile, rollingFile } from '@/api/thomas'

export default {
  name: 'Upload',
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_BASE_API}/thomas/uploadfile`,
      uploadSetHeaders: {
        Authorization: _encode(getAccessToken())
      },
      tableData: [],
      modelName: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const result = await getUploadFileList()
      this.tableData = this.tableData.concat(result)
    },
    async removeFile(fileName) {
      await removeFile({ fileName: fileName })
      const t = setTimeout(() => {
        location.reload()
        clearTimeout(t)
      }, 2000)
    },
    uploadValidate(file) {
      const extension = file.name.split('.').slice(-1)[0]
      const extensionReg = new RegExp('(xlsx|docx)$', 'g')
      if (!extensionReg.test(extension)) {
        this.$message({
          message: `不支持上传 .${extension} 类型文件`,
          type: 'error'
        })
        return false
      }
      if (file.size > 50 * 1024 * 1024) {
        this.$message({
          message: `文件大小 ${(file.size / 1024 / 1024).toFixed(
            2
          )}MB 超出上限`,
          type: 'error'
        })
        return false
      }
    },
    uploadSuccess(res, file, filelise) {
      location.reload()
      this.$message({
        message: `${res.fileName} 导入成功,文件大小${res.fileSize}`,
        type: 'success'
      })
    },
    uploadError(err, file) {
      const message = JSON.parse(err['message'])['msg']
      this.$message({
        message: `${message}`,
        type: 'error'
      })
    },
    selectModel(command) {
      this.modelName = command
    },
    async rollingRow(fileName) {
      NProgress.start()
      await rollingFile({ filePath: fileName, modelName: this.modelName })
      NProgress.done()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-upload {
  padding: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .upload-content {
    flex-grow: 1;
  }
  .upload-display {
    margin-top: 30px;
  }
  .select-model {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
