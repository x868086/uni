const { B2iserialModel } = require("../models/b2iserial")


class B2iserialService {
    constructor({ serialNumber = undefined,
        productName = undefined,
        yfCode = undefined,
        idDesc = undefined,
        fee = undefined,
        devName = undefined,
        devPhone = undefined,
        contactPhone = undefined,
        operateTime = undefined,
        operate = undefined
    }) {
        this.serial_number = serialNumber
        this.product_name = productName
        this.yf_code = yfCode
        this.id_desc = idDesc
        this.fee = fee
        this.dev_name = devName
        this.dev_phone = devPhone
        this.contact_phone = contactPhone
        this.operate_time = operateTime
        this.operate = operate
    }

    async serialList(offset, limit) {
        let result = await B2iserialModel.findAll({
            paranoid: false,
            offset: offset,
            limit: limit,
        }).map(e => {
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
                operate: e.operate
            }
        })
        return {
            offset: offset,
            limit: limit,
            result
        }
    }
}


module.exports = {
    B2iserialService
}