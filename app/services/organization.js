const { OrganizationModel } = require('../models/organization')

class OrganizationService {
    constructor({ org_id, channel_id, parent_manager_id, scope, state_code }) {
        this.orgId = org_id
        this.channelId = channel_id
        this.parentManagerId = parent_manager_id
        this.scope = scope
        this.stateCode = state_code
    }

    async findChannels() {
        let orgArray = []
        let channelArray = []
        let triangle = async (orgId) => {
            let result = await OrganizationModel.findAll({
                where: {
                    parent_manager_id: orgId
                }
            }).map(e => e.org_id)
            orgArray = orgArray.concat(result)

            if (result.length) {
                for (let org of result) {
                    await triangle(org)
                }
            }
        }
        triangle(this.orgId)

    }


}

module.exports = {
    OrganizationService
}