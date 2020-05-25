const { UserModel } = require("../models/user");

const { PermissionService } = require("../services/permission");

class UserService {
  constructor({ account, secret, orgId, nickName, roles, createBy }) {
    this.account = account;
    this.secret = secret;
    this.orgId = orgId;
    this.nickName = nickName;
    this.roles = roles;
    this.createBy = createBy;
  }

  async userCreate() {
    let user = await UserModel.findOne({
      where: {
        account: this.account,
      },
    });

    if (user) {
      throw new global.errs.HttpException("用户已存在");
    }

    let [{ user_id }, created] = await UserModel.findOrCreate({
      where: {
        account: this.account,
        secret: this.secret,
        org_id: this.orgId,
        nick_name: this.nickName,
        create_by: this.createBy,
      },
    });
    if (user_id) {
      await new PermissionService(user_id, this.roles).permissionCreate();
      return user_id;
    }
  }
}

module.exports = {
  UserService,
};
