const { SpecialSerialModel } = require('../models/special-serial')

class SpecialSerialService {
    constructor({ serialNumber = undefined, inDate = undefined, roleValue = undefined, endDate = undefined }) {
        this.serialNumber = serialNumber
        this.inDate = inDate
        this.roleValue = roleValue
        this.endDate = endDate
    }

    async getList(offset, limit) {
        let result = await SpecialSerialModel.findAll({
            paranoid: false,
            attributes: ['id', 'serial_number', 'in_date', 'role_value', 'end_date'],
            offset: offset,
            limit: limit,
        }).map((e) => {
            return {
                id: e.id,
                serial_number: e.serial_number,
                in_date: e.in_date,
                role_value: e.role_value,
                end_date: e.end_date,
            };
        });
        return result
    }
}


module.exports = {
    SpecialSerialService
}