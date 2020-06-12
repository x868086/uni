const { sequelize } = require("../../core/db")

const { RoleModel } = require('../models/role')
const { PermissionModel } = require("../models/permission")

const { RoleRouteService } = require("../services/role-route")



class RoleService {
    constructor({ userId, roleId, role, roleName, scope, roleRoute }) {
        this.userId = userId
        this.roleId = roleId
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
                paranoid: false,
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
                return { role: this.role, roleName: this.roleName }
            } catch (error) {
                throw new global.errs.ParametersException(`${error.message} 创建角色失败`, 10006)
            }
        })

    }

    async roleRemove() {
        return sequelize.transaction(async (t) => {
            let result = await RoleModel.findOne({
                where: {
                    role_id: this.roleId
                }
            })
            if (!result) {
                throw new global.errs.HttpException("角色不存在")
            }

            try {
                await new RoleRouteService({ roleId: this.roleId }).roleRouteRemove({ transaction: t })
                await RoleModel.destroy({
                    where: {
                        role_id: this.roleId
                    }, transaction: t
                })
                return { roleName: result.role_name }
            } catch (error) {
                throw new global.errs.HttpException(`${error.message} 角色删除失败`, 10006)
            }

        })
    }

    async roleEnable() {
        return sequelize.transaction(async (t) => {
            let result = await RoleModel.findOne({
                paranoid: false,
                where: {
                    role_id: this.roleId
                }
            })
            if (!result) {
                throw new global.errs.HttpException("角色不存在")
            }
            if (!result.deleted_at) {
                throw new global.errs.HttpException("当前角色信息为有效状态")
            }

            try {
                let { role_id } = await result.restore({ transaction: t })
                await new RoleRouteService({ roleId: role_id }).roleRouteEnable({ transaction: t })
                return { roleName: result.role_name }
            } catch (error) {
                throw new global.errs.HttpException(`${error.message} 角色启用失败`, 10006)
            }
        })
    }

    async roleModify() {
        return sequelize.transaction(async (t) => {
            let result = await RoleModel.findOne({
                where: {
                    role_id: this.roleId
                }
            })
            let newScope = await RoleModel.findOne({
                where: {
                    scope: this.scope
                }
            })
            if (!result) {
                throw new global.errs.HttpException("角色不存在")
            }
            if (newScope) {
                throw new global.errs.ParametersException("角色已存在且具有唯一性,无法继续修改")
            }

            try {
                await RoleModel.update({
                    role: this.role,
                    role_name: this.roleName,
                    scope: this.scope
                }, {
                    where: {
                        role_id: this.roleId
                    }, transaction: t
                })

                await new RoleRouteService({ roleId: this.roleId }).roleRouteRemove({ transaction: t })
                for (let e of this.roleRoute) {
                    await new RoleRouteService({ roleId: this.roleId, routeId: e }).roleRouteCreate({ transaction: t })
                }
                return { roleName: this.roleName }
            } catch (error) {

            }
        })
    }

}



module.exports = {
    RoleService
}