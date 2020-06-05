const { OrganizationModel, Op } = require('../models/organization')

class OrganizationService {
    constructor({ org_id, channel_id, parent_manager_id, scope, state_code }) {
        this.orgId = org_id
        this.channelId = channel_id
        this.parentManagerId = parent_manager_id
        this.scope = scope
        this.stateCode = state_code
    }

    // 递归查找子节点
    async findChannels() {
        let orgArrayReal = []
        let orgArray = []
        let channelArray
        // let abc = []
        let triangle = async (orgId, scope) => {

            // 当scope<=30时是渠道级或直销人员级即末梢节点，直接取当前对象自身的orgId
            if (scope <= 30) {
                orgArray.push(orgId)
            }

            let result = await OrganizationModel.findAll({
                where: {
                    parent_manager_id: orgId
                }
            }).map(e => e.org_id)

            // 保存每次查询的子节点结果，每次查询该结果时取出第一个查询并删除第一个，新的查询结果加到数组末尾
            orgArrayReal = orgArrayReal.concat(result)

            // 保存每次查询的完整子节点结果 
            orgArray = orgArray.concat(result)

            // 是否按push每次遍历的结果?
            // if (result.length) {
            //     abc.push(result)
            // }

            while (true) {
                if (orgArrayReal.length) {
                    // 每次查询取出数组的第一个，并删除掉
                    await triangle(orgArrayReal.shift())
                }
                return false
            }

        }

        await triangle(this.orgId, this.scope)
        // await triangle(5)

        // 查找orgArray权限内的所有channel_id
        channelArray = await OrganizationModel.findAll({
            where: {
                org_id: {
                    [Op.in]: orgArray
                }
            }
        }).filter(e => e.channel_id).map(e => e.channel_id)

        return channelArray
    }

    async findOrgDesc() {
        let { org_desc } = await OrganizationModel.findOne({
            where: {
                org_id: this.orgId
            }
        })
        return org_desc
    }
}

module.exports = {
    OrganizationService
}