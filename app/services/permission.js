const { PermissionModel } = require('../models/permission')


class PermissionService {
    constructor(userId, roles) {
        this.userId = userId
        this.roles = roles
    }

    async permissionCreate() {
        for await (let role of this.roles) {
            PermissionModel.findOrCreate({
                where: {
                    user_id: this.userId,
                    role_id: role
                }
            })
        }
    }
}

module.exports = {
    PermissionService
}