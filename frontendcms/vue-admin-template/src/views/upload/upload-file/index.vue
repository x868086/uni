<template>
  <section class="wrap-upload">
    <el-upload
      class="upload-content"
      drag
      :action="uploadUrl"
      :headers="uploadHeaders"
      multiple
      :on-success="test2"
      :on-error="test3"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传xlsx/csv/docx文件，且不超过5Mb</div>
    </el-upload>

    <el-table
      :data="tableData"
      fit
      highlight-current-row
      style="width: 100%"
      height="500"
      class="upload-display"
    >
      <el-table-column prop="fileName" label="文件名" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.fileName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fileSize" label="大小" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.fileSize}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="filePath" label="路径" min-width="180">
        <template slot-scope="scope">
          <span>{{scope.row.filePath}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadTime" label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.uploadTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="actions" label="执行" min-width="220">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click.native="test(scope)"
          >删除</el-button>

          <el-button type="success" size="mini" icon="el-icon-circle-check-outline" @click="true">导入</el-button>

          <el-button type="primary" size="mini" icon="el-icon-circle-check-outline" @click="true">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>


<script>
import { getAccessToken } from '@/utils/auth'
import { _encode } from '@/utils/encode-token'

export default {
  name: 'upload',
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_BASE_API}/thomas/uploadfile`,
      uploadHeaders: {
        Authorization: _encode(getAccessToken())
      },
      tableData: [
        {
          fileName: '文件1',
          fileSize: '11M',
          filePath: 'http://127.0.0.1/temp/文件1.xlsx',
          uploadTime: '2020-7-2 14:46:41',
          author: 'json',
          remark: 'abdef'
        },
        {
          fileName: '文件2',
          fileSize: '12M',
          filePath: 'http://127.0.0.1/temp/文件2.xlsx',
          uploadTime: '2020-7-2 14:46:41',
          author: 'json',
          remark: 'abdef'
        }
      ]
    }
  },
  methods: {
    test(value) {
      console.log(value)
    },
    test2(res, file, filelise) {
      console.log(res)
      console.log(file)
      console.log(filelise)
    },
    test3(file) {
      console.log(file)
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
}
</style>