const fs = require('fs');
const path = require('path');

const uploadPath = path.join(process.cwd(), '/temp/uploadfile');

class FileStream {
  constructor({
    buffer = null,
    path = uploadPath,
    originalname = 'temp.txt',
    size = undefined,
  }) {
    this.buffer = buffer;
    this.path = path;
    this.originalname = originalname;
    this.size = size / 1024 / 1024;
  }

  writeFileStream() {
    const fileWrite = fs.createWriteStream(
      `${this.path}/${this.originalname}`,
      {
        encoding: 'utf-8', // 编码格式
        autoClose: true, // 是否关闭读取文件操作系统内部使用的文件描述符
        start: 0, // 开始写入的位置
        highWaterMark: 1, // 每次写入的个数
      }
    );
    fileWrite.write(this.buffer);
    // 必须标记文件末尾，标是后续无继续写入操作
    fileWrite.close();
    fileWrite.on('finish', function () {
      console.log('xxxxxxxxxxxxx');
    });
    fileWrite.on('error', () => {
      console.log('导入错误');
    });
  }

  readFileStream() {
    const fileRead = fs.createReadStream(`${this.path}/${this.originalname}`, {
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
}

module.exports = {
  FileStream,
};
