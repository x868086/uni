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
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        只能上传.xls/.xlsx/.csv文件，且大小不超过10Mb
      </div>
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
      <el-table-column prop="fileName" label="文件名" min-width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fileSize" label="大小" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.fileSize }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="filePath" label="路径" min-width="280">
        <template slot-scope="scope">
          <span>{{ scope.row.filePath }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadTime" min-width="150" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.uploadTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operateAuthor" min-width="90" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.operateAuthor }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="actions" label="执行" min-width="230">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click.native="removeFile(scope.row.fileName)"
            >删除</el-button
          >

          <el-button
            type="success"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="true"
            >导入</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { getAccessToken } from '@/utils/auth';
import { _encode } from '@/utils/encode-token';
import { getUploadFileList, removeFile } from '@/api/thomas';

export default {
  name: 'upload',
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_BASE_API}/thomas/uploadfile`,
      uploadSetHeaders: {
        Authorization: _encode(getAccessToken()),
      },
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let result = await getUploadFileList();
      this.tableData = this.tableData.concat(result);
    },
    async removeFile(fileName) {
      await removeFile({ fileName: fileName });
      let t = setTimeout(() => {
        location.reload();
        clearTimeout(t);
      }, 2000);
    },
    uploadValidate(file) {
      let extension = file.name.split('.').slice(-1)[0];
      let extensionReg = new RegExp('\(csv|xls|xlsx)$', 'g');
      if (!extensionReg.test(extension)) {
        this.$message({
          message: `不支持上传 .${extension} 类型文件`,
          type: 'error',
        });
        return false;
      }
      if (file.size > 10485760) {
        this.$message({
          message: `文件大小 ${(file.size / 1024 / 1024).toFixed(
            2
          )}MB 超出上限`,
          type: 'error',
        });
        return false;
      }
    },
    uploadSuccess(res, file, filelise) {
      location.reload();
      this.$message({
        message: `${res.fileName} 导入成功,文件大小${res.fileSize}`,
        type: 'success',
      });
    },
    uploadError(err, file) {
      let message = JSON.parse(err['message'])['msg'];
      this.$message({
        message: `${message}`,
        type: 'error',
      });
    },
  },
};
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
}
</style>
