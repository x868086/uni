const { SpecialSerialModel } = require('../models/special-serial')

class SpecialSerialService {
    constructor({ serialNumber = undefined, inDate = undefined, ruleValue = undefined, endDate = undefined }) {
        this.serialNumber = serialNumber
        this.inDate = inDate
        this.ruleValue = ruleValue
        this.endDate = endDate
    }

    // async getList(offset, limit) {
    //     let result = await SpecialSerialModel.findAll({
    //         paranoid: false,
    //         attributes: ['id', 'serial_number', 'in_date', 'rule_value', 'end_date'],
    //         offset: offset,
    //         limit: limit,
    //     }).map((e) => {
    //         return {
    //             id: e.id,
    //             serial_number: e.serial_number,
    //             in_date: e.in_date,
    //             rule_value: e.rule_value,
    //             end_date: e.end_date,
    //         };
    //     });
    //     let total = await SpecialSerialModel.findAndCountAll({
    //         paranoid: false,
    //     });
    //     return {
    //         offset: offset,
    //         limit: limit,
    //         total: total.count,
    //         result,
    //     };

    async serialSearch() {
        let result = await SpecialSerialModel.findOne({
            where: {
                serial_number: this.serialNumber,
            },
        });
        if (!result) {
            throw new global.errs.ParametersException('靓号协议协议信息不存在');
        }

        return {
            id: result.id,
            serial_number: result.serial_number,
            in_date: result.in_date,
            rule_value: result.rule_value,
            end_date: result.end_date
        };
    }
}

module.exports = {
    SpecialSerialService
}