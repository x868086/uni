const { RoleModel } = require('../models/role')
const { PermissionModel } = require("../models/permission")
const { OrganizationModel } = require("../models/organization")

class RoleService {
    constructor(userId) {
        this.userId = userId
    }

    async findScope() {
        let permissionArray = await PermissionModel.findAll({
            where: {
                user_id: this.userId
            }
        })
        let scopeArray = []
        for (let { role_id } of permissionArray) {
            let result = await RoleModel.findOne({
                where: {
                    role_id: role_id
                }
            })
            scopeArray.push(result.scope)
        }
        let scopeTop = scopeArray.sort((a, b) => b - a)[0]
        return { permissionArray, scopeArray, scopeTop }

    }

}



module.exports = {
    RoleService
}