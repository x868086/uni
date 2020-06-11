const { sequelize } = require("../../core/db")
const { SmsModel } = require('../models/sms')
const { generateSms } = require('../../core/utile')

class SmsService {
    constructor({ account }) {
        this.account = account
    }

    async getSmsCode() {
        return sequelize.transaction(async (t) => {
            let result = await SmsModel.findOne({
                where: {
                    account: this.account
                }, transaction: t
            })

            if (result.expires_time >= new Date().getTime()) {
                throw new global.errs.Forbidden(`验证码已发送，请间隔5分钟后再次获取`)
            }

            await SmsModel.destroy({
                where: {
                    account: this.account
                }, transaction: t
            })

            let smsCode = generateSms.smsCode
            let expiresTime = generateSms.smsExpireTime

            let { sms_code } = await SmsModel.create({
                account: this.account,
                sms_code: smsCode,
                expires_time: expiresTime
            }, { transaction: t })

            // doSomeThing 发送短信 使用事务
            return { sms_code }
        })
    }
}


module.exports = {
    SmsService
}