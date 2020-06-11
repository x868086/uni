const { sequelize } = require("../../core/db")

const { RoleModel } = require('../models/role')
const { PermissionModel } = require("../models/permission")

const { RoleRouteService } = require("../services/role-route")



class RoleService {
    constructor({ userId, role, roleName, scope, roleRoute }) {
        this.userId = userId
        this.role = role
        this.roleName = roleName
        this.scope = scope
        this.roleRoute = roleRoute
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

    async roleCreate() {
        return sequelize.transaction(async (t) => {
            let result = await RoleModel.findOne({
                where: {
                    scope: this.scope
                }
            })
            if (result) {
                throw new global.errs.HttpException('角色已存在，请勿重复创建')
            }
            try {
                let { role_id } = await RoleModel.create({
                    role: this.role,
                    role_name: this.roleName,
                    scope: this.scope
                }, { transaction: t }
                )

                for (let e of this.roleRoute) {
                    await new RoleRouteService({ roleId: role_id, routeId: e }).roleRouteCreate({ transaction: t })
                }
            } catch (error) {
                throw new global.errs.ParametersException(`${error.message} 创建角色失败`, 10006)
            }
        })

    }

}



module.exports = {
    RoleService
}