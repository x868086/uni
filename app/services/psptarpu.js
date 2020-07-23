const { PsptArpuModel } = require('../models/psptarpu');


class PsptArpuService {
    constructor({ psptId = undefined, arpuValue = 0 }) {
        this.psptId = psptId
        this.arpuValue = arpuValue
    }

    async getArpu() {
        try {
            let result = await PsptArpuModel.findOne({
                where: {
                    pspt_id: this.psptId
                }
            })
            let arpuValue = result.getDataValue('arpu_value')
            return { arpuValue: parseFloat(arpuValue) }
        } catch (error) {
            throw new global.errs.EmptyResult('未找到匹配的消费信息')
        }
    }

}

module.exports = {
    PsptArpuService
}