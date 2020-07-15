const fs = require('fs');
const path = require('path');

const uploadPath = path.join(process.cwd(), '/temp/uploadfile');

let { ThomasModel } = require('../models/thomas');
let { B2iserialModel } = require('../models/b2iserial');
let { SpecialSerialModel } = require('../models/special-serial');
const { sequelize } = require('../../core/db');

let { xlsxToJson } = require('../services/xlsxtojson');

class ThomasService {
  constructor({
    buffer = null,
    path = uploadPath,
    originalname = 'temp.txt',
    size = undefined,
    uploadTime = '',
    operateAuthor = '',
    filePath = '',
    modelName = '',
    stateName = undefined,
    uploadRow = undefined,
  }) {
    this.buffer = buffer;
    this.path = path;
    this.originalname = originalname;
    this.size = size;
    this.uploadTime = uploadTime;
    this.operateAuthor = operateAuthor;
    this.filePath = `${this.path}\\${this.originalname}`;
    this.modelName = modelName;
    this.stateName = stateName;
    this.uploadRow = uploadRow;
  }

  async getList() {
    let result = await ThomasModel.findAll({
      attributes: [
        'file_name',
        'file_size',
        'file_path',
        'upload_time',
        'operate_author',
        'state_name',
        'upload_row',
      ],
    }).map((e) => {
      return {
        fileName: e.file_name,
        fileSize: e.file_size,
        filePath: e.file_path,
        uploadTime: e.upload_time,
        operateAuthor: e.operate_author,
        stateName: e.state_name,
        uploadRow: e.upload_row,
      };
    });
    return result;
  }

  async removeFile() {
    let file = await ThomasModel.findOne({
      where: {
        file_name: this.originalname,
      },
    });
    if (!file) {
      throw new global.errs.Forbidden('文件不存在,或已删除');
    }
    try {
      let result = await ThomasModel.destroy({
        where: {
          file_name: this.originalname,
        },
      });
      return result;
    } catch (error) {
      throw new global.errs.HttpException(`${error.message} 删除文件失败`);
    }
  }

  async rollingRow() {
    let file = await ThomasModel.findOne({
      where: {
        file_path: this.filePath,
      },
    });
    if (!file) {
      throw new global.errs.ParametersException('未找到对应的上传文件!');
    }
    // 获取xlsxtojson函数转换xlsx文件每行数据生成的的objArray和目标数据表的fields数组
    let { rollingArray, fields } = await xlsxToJson(
      this.filePath,
      this.modelName
    );

    // 有导入需求的所有Model
    let modelTarget = () => {
      return {
        b2iserial: B2iserialModel,
        specialserial: SpecialSerialModel,
      };
    };

    return sequelize.transaction(async (t) => {
      let result = null;
      let total = 0;
      try {
        // 这里的model是根据前端传入的model待确定调用哪个业务的Model对象
        await modelTarget()[this.modelName].destroy({
          truncate: true,
          force: true,
          transaction: t,
        });
        result = await modelTarget()[this.modelName].bulkCreate(rollingArray, {
          fields: fields,
          // ignoreDuplicates: true,
          transaction: t,
        });
        total = result.length;
        // 使用单独线程导入数据，成功后返回导入数据的个数
        return total;
      } catch (error) {
        throw new global.errs.HttpException(`${error.message} 导入数据错误`);
      }
      // 不使用单独线程导入时，启用下面抛出错误的方式传递导入成功的信息
      // throw new global.errs.Success(`成功导入 ${result.length} 条记录`);
    });
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
      state_name: this.stateName,
      upload_row: this.uploadRow,
    });
    return {
      fileName: file_name,
      fileSize: file_size,
    };
  }

  async updateFileInfo(stateName, total, fieldsArray) {
    await ThomasModel.update(
      {
        state_name: stateName,
        upload_row: total,
      },
      {
        where: {
          file_path: this.filePath,
        },
        fields: fieldsArray,
      }
    );
  }
}

module.exports = {
  ThomasService,
};
