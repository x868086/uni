const { sequelize } = require("../../core/db")
const { LockedModel } = require('../models/locked')


class LockedService {
    constructor({ account = undefined, locked = undefined, expiresTime = undefined }) {
        this.account = account
        this.locked = locked
        this.expiresTime = expiresTime
    }

    async userLock() {
        return sequelize.transaction(async (t) => {
            try {
                let result = await LockedModel.findOne({
                    where: {
                        account: this.account
                    }
                })
                if (!result) {
                    await LockedModel.create({
                        account: this.account,
                        is_locked: 0,
                        expires_time: new Date().getTime() + (1000 * 60 * 10)
                    })
                }
                await LockedModel.increment(['is_locked'], { by: 1, where: { account: this.account }, transaction: t })
                await LockedModel.update(
                    // 过期时间10分钟
                    { expires_time: new Date().getTime() + (1000 * 60 * 10) },
                    {
                        where: {
                            account: this.account
                        }, transaction: t
                    }
                )
            } catch (error) {
                throw new global.errs.ParametersException(`${error} 锁定用户出错!`);
            }
        })
    }

    async userUnlock() {
        await LockedModel.destroy({
            where: {
                account: this.account,
            },
        })
    }

    async isLocked() {
        let currentTime = new Date().getTime()
        let result = await LockedModel.findOne({
            where: {
                account: this.account
            }
        })
        if (!result) {
            return false
        }
        if (result.expires_time < currentTime) {
            await LockedModel.destroy({
                where: {
                    account: this.account,
                },
            })
        }
        else if (result.is_locked === 3 && result.expires_time > currentTime) {
            throw new global.errs.Forbidden(`登录验证3次错误账户已锁定,10分钟后重试!`)
        }
    }
}


module.exports = {
    LockedService
}