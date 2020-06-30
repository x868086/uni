const { B2iserialModel } = require('../models/b2iserial');

class B2iserialService {
  constructor({
    serialNumber = undefined,
    productName = undefined,
    yfCode = undefined,
    idDesc = undefined,
    fee = undefined,
    devName = undefined,
    devPhone = undefined,
    contactPhone = undefined,
    operate = undefined,
    operateTime = undefined,
  }) {
    this.serialNumber = serialNumber;
    this.productName = productName;
    this.yfCode = yfCode;
    this.idDesc = idDesc;
    this.fee = fee;
    this.devName = devName;
    this.devPhone = devPhone;
    this.contactPhone = contactPhone;
    this.operate = operate;
    this.operateTime = operateTime;
  }

  async serialList(offset, limit) {
    let result = await B2iserialModel.findAll({
      paranoid: false,
      offset: offset,
      limit: limit,
    }).map((e) => {
      return {
        serial_number: e.serial_number,
        product_name: e.product_name,
        yf_code: e.yf_code,
        id_desc: e.id_desc,
        fee: e.fee,
        dev_name: e.dev_name,
        dev_phone: e.dev_phone,
        contact_phone: e.contact_phone,
        operate_time: e.operate_time,
        operate: e.operate,
      };
    });
    let total = await B2iserialModel.findAndCountAll({
      paranoid: false,
    });
    return {
      offset: offset,
      limit: limit,
      total: total.count,
      result,
    };
  }

  async serialModify(operateArray) {
    let serial = await B2iserialModel.findOne({
      where: {
        serial_number: this.serialNumber,
      },
    });
    if (operateArray.indexOf(serial.operate) > -1) {
      throw new global.errs.Forbidden('信息已提交请勿重复操作');
    }
    await B2iserialModel.update(
      {
        dev_name: this.devName,
        dev_phone: this.devPhone,
        contact_phone: this.contactPhone,
        operate: this.operate,
        operate_time: this.operateTime,
      },
      {
        where: {
          serial_number: this.serialNumber,
        },
      }
    );
    throw new global.errs.Success(
      `二次销售信息已${this.operate.substr(-2, 2)}`,
      0,
      202
    );
  }

  async serialSearch() {
    let serial = await B2iserialModel.findOne({
      where: {
        serial_number: this.serialNumber,
      },
    });
    if (!serial) {
      throw new global.errs.ParametersException('二次销售号码不存在');
    }

    return {
      serialNumber: serial.serial_number,
      productName: serial.product_name,
      idDesc: serial.id_desc,
      fee: serial.fee,
      devName: serial.dev_name,
      devPhone: serial.dev_phone,
      contactPhone: serial.contact_phone,
      operate: serial.operate,
      operateTime: serial.operate_time,
    };
  }
}

module.exports = {
  B2iserialService,
};
