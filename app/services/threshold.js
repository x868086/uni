const { sequelize } = require('../../core/db')
const { ThresholdModel, Op } = require('../models/threshold')
const { StateModel } = require('../models/state')

class ThresholdService {
    constructor({ configName = undefined,
        stateCode = undefined,
        startDate = undefined,
        endDate = undefined,
        operator = undefined,
        gt = undefined,
        lte = undefined,
        title = undefined,
        arpu = undefined,
        items = undefined }) {
        this.configName = configName
        this.stateCode = stateCode
        this.startDate = startDate
        this.endDate = endDate
        this.operator = operator
        this.gt = gt
        this.lte = lte
        this.title = title
        this.arpu = arpu
        this.items = items
    }

    async thresholdList() {
        try {
            // 根据ThresholdServer实例化时的configName属性来区分是查询列表还是查询单个
            // configName的属性不同生成不同的查询条件conditionStr
            let conditionStr
            if (!this.configName) {
                conditionStr = {}
            } else {
                conditionStr = { config_name: this.configName }
            }

            let result = await ThresholdModel.findAll({
                paranoid: false,
                attributes: ['id', 'config_name', 'state_code', 'start_date', 'end_date', 'operator'],
                where: conditionStr
            }).map(async (e) => {
                let { state_name } = await StateModel.findOne({
                    where: {
                        state_code: e.state_code
                    }
                })
                return {
                    config_name: e.config_name,
                    state_name: state_name,
                    start_date: e.start_date,
                    end_date: e.end_date,
                    operator: e.operator
                }
            })

            // 首次查询阈值，剔除重复 group by
            let obj = []
            let thresholdResult = []
            thresholdResult = result.reduce((arr, e) => {
                obj[e.config_name] ? '' : obj[e.config_name] = true && arr.push(e)
                return arr
            }, [])

            // 通过阈值config_name查询阈值详情
            for (let e of thresholdResult) {
                let items = await ThresholdModel.findAll({
                    paranoid: false,
                    where: {
                        config_name: e.config_name
                    },
                    attributes: ['gt', 'lte', 'title']
                })
                e['items'] = items
            }
            return thresholdResult
        } catch (error) {
            throw new global.errs.ParametersException(`${error.message} 查询弹窗规则列表失败`, 10006)
        }

    }

    async thresholdBingo() {
        try {
            let threshold = await ThresholdModel.findAll({
                where: {
                    gt: {
                        [Op.lt]: this.arpu
                    },
                    lte: {
                        [Op.gte]: this.arpu
                    }
                }
            }).map(e => {
                return {
                    config_name: e.config_name,
                    gt: e.gt,
                    lte: e.lte,
                    title: e.title,
                    start_date: e.start_date,
                    end_date: e.end_date
                }
            })
            return threshold
        } catch (error) {
            throw new global.errs.ParametersException(`${error.message} 匹配弹窗规则失败`, 10006)
        }
    }

    async thresholdRemove() {
        let result = await ThresholdModel.findAll({
            paranoid: false,
            where: {
                config_name: this.configName
            }
        })
        if (result.every(e => e.deleted_at)) {
            throw new global.errs.HttpException("弹窗规则不存在")
        }

        try {
            return sequelize.transaction(async (t) => {
                await ThresholdModel.update({
                    state_code: 0
                }, {
                    where: {
                        config_name: this.configName
                    }, transcation: t
                })

                await ThresholdModel.destroy({
                    where: {
                        config_name: this.configName
                    }, transaction: t
                })
                return result
            })
        } catch (error) {
            throw new global.errs.ParametersException(`${error.message} 删除弹窗规则失败`, 10006)
        }
    }

    async thresholdEable() {
        return sequelize.transaction(async (t) => {
            let result = await ThresholdModel.findAll({
                paranoid: false,
                where: {
                    config_name: this.configName
                }
            })
            if (!result.length) {
                throw new global.errs.HttpException("弹窗规则不存在")
            }
            if (!result.every(e => e.deleted_at)) {
                throw new global.errs.HttpException("当前弹窗规则为有效状态")
            }

            try {
                return sequelize.transaction(async (t) => {
                    await ThresholdModel.restore({
                        where: {
                            config_name: this.configName
                        }, transaction: t
                    })

                    await ThresholdModel.update({
                        state_code: 1
                    }, {
                        where: {
                            config_name: this.configName
                        }, transaction: t
                    })
                    return result
                })
            } catch (error) {
                throw new global.errs.ParametersException(`${error.message} 启用弹窗规则失败`, 10006)
            }
        })
    }

    async thresholdCreate() {
        let result = await ThresholdModel.findAll({
            paranoid: false,
            where: {
                title: this.title
            }
        })
        if (result && result.length > 0) {
            throw new global.errs.HttpException("弹窗规则已存在,无法重复新增")
        }

        try {
            let { config_name = undefined, title = undefined } = await ThresholdModel.create({
                config_name: this.configName,
                start_date: this.startDate,
                end_date: this.endDate,
                operator: this.operator,
                gt: this.gt,
                lte: this.lte,
                title: this.title
            })
            return { config_name, title }
        } catch (error) {
            throw new global.errs.ParametersException(`${error.message} 新增弹窗规则失败`, 10006)
        }

    }

    async thresholdModify(conditions) {
        return sequelize.transaction(async (t) => {
            let result = await ThresholdModel.findAll({
                paranoid: false,
                where: {
                    config_name: conditions
                }
            })
            if (result.every(e => e.deleted_at)) {
                throw new global.errs.HttpException("弹窗规则不存在")
            }

            try {
                return sequelize.transaction(async (t) => {
                    await ThresholdModel.destroy({
                        where: {
                            config_name: conditions
                        }, transaction: t
                    })

                    for (let e of this.items) {
                        let result = await ThresholdModel.findAll({
                            paranoid: false,
                            where: {
                                title: e.title
                            }
                        })
                        if (result.length) {
                            throw new global.errs.HttpException("需要修改的新规则已存在,无法继续")
                        }


                        await ThresholdModel.create({
                            config_name: this.configName,
                            start_date: this.startDate,
                            end_date: this.endDate,
                            operator: this.operator,
                            gt: e.gt,
                            lte: e.lte,
                            title: e.title
                        }, {
                            transaction: t
                        })
                    }

                    return { configName: this.configName }
                })
            } catch (error) {
                throw new global.errs.ParametersException(`${error.message} 修改弹窗规则失败`, 10006)
            }

        })
    }
}

module.exports = {
    ThresholdService
}