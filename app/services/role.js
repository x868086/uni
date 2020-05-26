const { RoleModel } = require('../models/role')
const { PermissionModel } = require("../models/permission")

class RoleService {
    constructor(userId) {
        this.userId = userId
    }

    async findScopeMax() {
        let permissionArray = await PermissionModel.findAll({
            where: {
                user_id: this.userId
            }
        })
    }
}



module.exports = {
    RoleService
}