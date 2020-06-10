const { sequelize } = require("../../core/db")
const { SmsModel } = require('../models/sms')

class SmsService {
    constructor({ account }) {
        this.account = account
    }

    async getSmsCode() {
        return sequelize.transaction(async (t) => {
            await SmsModel.destroy({
                where: {
                    account: this.account
                }, transaction: t
            })

            // let smsCode = 
            let expiresTime = new Date().getTime()

            let result = await SmsModel.create({
                account: this.account,
                sms_code: smsCode,
                expires_time: expiresTime
            }, { transaction: t })

            // return {}
        })
    }
}


module.exports = {
    SmsService
}