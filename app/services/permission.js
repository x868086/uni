const { PermissionModel } = require("../models/permission");
const { RoleModel } = require('../models/role')

class PermissionService {
  constructor(userId, roles) {
    this.userId = userId;
    this.roles = roles;
  }

  async permissionCreate(t) {
    for (let role of this.roles) {
      await PermissionModel.findOrCreate({
        where: {
          user_id: this.userId,
          role_id: role,
        }, t
      });
    }
  }

  async permissionNames() {
    return await PermissionModel.findAll({
      where: {
        user_id: this.userId,
      },
    }).map(async e => {
      let { role_name } = await RoleModel.findOne({
        where: {
          role_id: e.role_id
        }
      })
      return role_name
    });
  }

  async permissionArray() {
    return await PermissionModel.findAll({
      where: {
        user_id: this.userId
      }
    }).map(e => e.role_id)
  }

  // 参数t 可选参数 是在使用事务的时候传入的{ transaction: t }
  async permissionDestroy(t) {
    throw Error('abc')
    return await PermissionModel.destroy({
      where: {
        user_id: this.userId
      }
    }, { ...t })
  }
}

module.exports = {
  PermissionService,
};
