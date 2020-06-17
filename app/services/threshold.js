const { ThresholdModel } = require('../models/threshold')

class ThresholdService {
    constructor({ configName = undefined,
        stateCode = undefined,
        startDate = undefined,
        endDate = undefined,
        operator = undefined,
        gt = undefined,
        lte = undefined,
        title = undefined,
        arpu = undefined }) {
        this.configName = configName
        this.stateCode = stateCode
        this.startDate = startDate
        this.endDate = endDate
        this.operator = operator
        this.gt = gt
        this.lte = lte
        this.title = title
        this.arpu = arpu
    }

    async thresholdList(offset, limit) {
        let result = await ThresholdModel.findAll({
            paranoid: false,
            offset: offset,
            limit: limit,
            attributes: ['id', 'config_name', 'state_code', 'start_date', 'end_date', 'operator']
        }).map(e => {
            return {
                config_name: e.config_name,
                state_code: e.state_code,
                start_date: e.start_date,
                end_date: e.end_date,
                operator: e.operator
            }
        })
        let thresholdResult = Array.from(new Set(result))
        thresholdResult.map(async ({ config_name }) => {
            let items = await ThresholdModel.findAll({
                paranoid: false,
                where: {
                    config_name: config_name
                }
            })
        })
    }
}

module.exports = {
    ThresholdService
}