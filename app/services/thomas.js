const fs = require('fs');
const path = require('path');

const uploadPath = path.join(process.cwd(), '/temp/uploadfile');

let { ThomasModel } = require('../models/thomas');

class ThomasService {
  constructor({
    buffer = null,
    path = uploadPath,
    originalname = 'temp.txt',
    size = undefined,
    uploadTime = '',
    operateAuthor = '',
    filePath = '',
  }) {
    this.buffer = buffer;
    this.path = path;
    this.originalname = originalname;
    this.size = size;
    this.uploadTime = uploadTime;
    this.operateAuthor = operateAuthor;
    this.filePath = `${this.path}\\${this.originalname}`;
  }

  async getList() {
    let result = await ThomasModel.findAll({
      attributes: [
        'file_name',
        'file_size',
        'file_path',
        'upload_time',
        'operate_author',
      ],
    }).map((e) => {
      return {
        fileName: e.file_name,
        fileSize: e.file_size,
        filePath: e.file_path,
        uploadTime: e.upload_time,
        operateAuthor: e.operate_author,
      };
    });
    return result;
  }

  async writeFileStream() {
    const fileWrite = fs.createWriteStream(this.filePath, {
      encoding: 'utf-8', // 编码格式
      autoClose: true, // 是否关闭读取文件操作系统内部使用的文件描述符
      start: 0, // 开始写入的位置
      highWaterMark: 1, // 每次写入的个数
    });

    return new Promise((resolve, reject) => {
      fileWrite.write(this.buffer);
      // 必须标记文件末尾，声明后续无继续写入操作
      fileWrite.close();
      fileWrite.on('finish', async () => {
        // 传输成功后将文件信息写入数据库
        try {
          let { fileName, fileSize } = await this.createFileInfo();
          // resolve文件存储在数据库的信息
          resolve({ fileName, fileSize });
        } catch (error) {
          reject(error);
        }
      });
      fileWrite.on('error', (error) => {
        reject(error);
      });
    });
  }

  async readFileStream() {
    const fileRead = fs.createReadStream(this.filePath, {
      encoding: 'utf-8', // 编码格式
      autoClose: true, // 是否关闭读取文件操作系统内部使用的文件描述符
      start: 0, // 开始读取的位置
      highWaterMark: 1, // 每次读取的个数
    });
    let data = '';
    fileRead.on('data', function (chunk) {
      data += chunk;
    });

    fileRead.on('end', function () {
      console.log(data);
    });

    fileRead.on('error', function (err) {
      console.log(err.stack);
    });
  }

  async createFileInfo() {
    let file = await ThomasModel.findOne({
      where: {
        file_name: this.originalname,
      },
    });
    if (file) {
      throw new global.errs.Forbidden('文件已存在,请删除后导入');
    }

    let {
      file_name = undefined,
      file_size = undefined,
    } = await ThomasModel.create({
      file_name: this.originalname,
      file_size: this.size,
      file_path: this.filePath,
      upload_time: this.uploadTime,
      operate_author: this.operateAuthor,
    });
    return {
      fileName: file_name,
      fileSize: file_size,
    };
  }
}

module.exports = {
  ThomasService,
};
