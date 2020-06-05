const { PermissionModel } = require("../models/permission");
const { RoleModel } = require('../models/role')

class PermissionService {
  constructor(userId, roles) {
    this.userId = userId;
    this.roles = roles;
  }

  async permissionCreate() {
    for await (let role of this.roles) {
      PermissionModel.findOrCreate({
        where: {
          user_id: this.userId,
          role_id: role,
        },
      });
    }
  }

  async permissionFind() {
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
}

module.exports = {
  PermissionService,
};
