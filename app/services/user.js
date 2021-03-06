const { sequelize } = require('../../core/db');

const { UserModel } = require('../models/user');
const { StateModel } = require('../models/state');

const { PermissionService } = require('../services/permission');
const { RoleService } = require('../services/role');
const { OrganizationService } = require('../services/organization');
const { LockedService } = require('../services/locked')

const { tokenUtile, secretUtile } = require('../../core/utile');

const { tokenSecurity } = require('../../config/config');

class UserService {
  constructor({
    account = undefined,
    secret = undefined,
    orgId = undefined,
    nickName = undefined,
    roles = undefined,
    createBy = undefined,
    loginType = undefined,
    accessToken = undefined,
    refreshToken = undefined,
  }) {
    this.account = account;
    this.secret = secret;
    this.orgId = orgId;
    this.nickName = nickName;
    this.roles = roles;
    this.createBy = createBy;
    this.loginType = loginType;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  async userCreate() {
    let user = await UserModel.findOne({
      where: {
        account: this.account,
      },
    });
    if (user) {
      throw new global.errs.HttpException('用户已存在');
    }

    return sequelize.transaction(async (t) => {
      try {
        let [{ user_id }, created] = await UserModel.findOrCreate({
          where: {
            account: this.account,
            secret: this.secret,
            org_id: this.orgId,
            nick_name: this.nickName,
            create_by: this.createBy,
          },
          transaction: t,
        });
        if (user_id) {
          await new PermissionService({
            userId: user_id,
            roles: this.roles,
          }).permissionCreate({ transaction: t });
          return { account: this.account, nickName: this.nickName };
        }
      } catch (error) {
        throw new global.errs.HttpException(
          `${error.message} 创建用户信息创建权限失败`,
          10006
        );
      }
    });
  }

  async getUserInfo(user) {
    // 获取用户的user_id,org_id,roles数组,scope数组,scopeTop值,channels数组 并以此生成token
    let permissionArray, scopeArray, scopeTop, role;
    try {
      // 查询user的roles和scope
      let result = await new RoleService({ userId: user.user_id }).findScope();
      permissionArray = result['permissionArray'].map((e) => e.role_id);
      scopeArray = result['scopeArray'];
      scopeTop = result['scopeTop'];
      role = result['role'];

      return {
        scopeTop,
        role,
      };
    } catch (error) {
      throw new global.errs.HttpException(
        `${error.message} 查询用户节点权限信息失败`,
        10006,
        500
      );
    }
  }

  async userVerify() {
    // 查询user
    let user = await UserModel.findOne({
      where: {
        account: this.account,
      },
    });

    // 验证用户是否被锁定
    await new LockedService({ account: this.account }).isLocked()

    if (user) {
      let userSecretCiphertext = secretUtile.generateSecret(user.secret);
      let correct =
        // 用户输入的密码明文和加密后的密码比对(适用账号密码登录时验证密码的准确性)
        secretUtile.decodedSecret(this.secret, user.secret) ||
        // 或者是以用户的密码为明文，和用户密码二次加密后的密文对比(适用通过refreshToken获取续期时验证用户密码和用户二次加密密码的准确性)
        secretUtile.decodedSecret(this.secret, userSecretCiphertext);
      if (correct) {
        let { scopeTop, role } = await this.getUserInfo(user);
        let accessToken = tokenUtile.generateToken(
          // 将用户user_id,org_id,scopTop,权限内的channels加密生成token
          user.user_id,
          user.org_id,
          scopeTop,
          role,
          tokenSecurity.accessExpiresIn
        );
        let refreshToken = tokenUtile.generateToken(
          undefined,
          undefined,
          undefined,
          undefined,
          tokenSecurity.refreshExpiresIn,
          user.account,
          // 存用户密码再次加密后的密文
          user.secret
        );
        await new LockedService({
          account: this.account
        }).userUnlock()
        return { accessToken, refreshToken };
      } else {
        await new LockedService({
          account: this.account
        }).userLock()
        throw new global.errs.Forbidden('密码不正确');
      }
    } else {
      throw new global.errs.Forbidden(
        '用户信息不存在,请联系管理员',
        10002,
        403
      );
    }
  }

  async tokenRefresh() {
    try {
      let decoded = await tokenUtile.decodedToken(this.refreshToken);
      // 用户账号
      let account = decoded[0];
      // 取用户密码再次加密后的密文
      let secret = decoded[1];
      return await new UserService({ account, secret }).userVerify();
    } catch (error) {
      throw new global.errs.Unauthorized('refreshToken已过期', 55000);
    }
  }

  async userEnable() {
    return sequelize.transaction(async (t) => {
      let user = await UserModel.findOne({
        paranoid: false,
        where: {
          account: this.account,
        },
        transaction: t,
      });

      if (!user) {
        throw new global.errs.HttpException('用户不存在');
      }
      if (!user.deleted_at) {
        throw new global.errs.HttpException('当前用户信息为有效状态');
      }

      try {
        await user.restore({ transaction: t });
        await UserModel.update(
          {
            state_code: 1,
          },
          {
            where: {
              account: this.account,
            },
            transaction: t,
          }
        );
        await new PermissionService({ userId: user.user_id }).permissionEable({
          transaction: t,
        });

        return { account: user.account, nickName: user.nick_name };
      } catch (error) {
        throw new global.errs.HttpException(
          `${error.message} 账户启用失败`,
          10006
        );
      }
    });
  }

  async userList(offset, limit) {
    let users = await UserModel.findAll({
      paranoid: false,
      offset: offset,
      limit: limit,
    });

    let { count } = await UserModel.findAndCountAll({
      paranoid: false,
    });

    if (!users.length) {
      throw new global.errs.EmptyResult('用户列表信息未找到');
    }

    let userList = [];
    for (let { account, nick_name, user_id, org_id, state_code } of users) {
      let roles_name = await new PermissionService({
        userId: user_id,
      }).permissionNames();
      let { org_desc = undefined } = await new OrganizationService({ org_id }).findOrgDesc();
      let { state_name } = await StateModel.findOne({
        where: { state_code: state_code },
      });

      userList.push(
        Object.assign(
          {},
          {
            account: account,
            roleName: roles_name,
            orgDesc: org_desc,
            nickname: nick_name,
            stateName: state_name,
          }
        )
      );
    }

    let result = Object.assign(
      { offset: offset, limit: limit, total: count },
      { userList: userList }
    );
    return result;
  }

  async userRemove() {
    return sequelize.transaction(async (t) => {
      let user = await UserModel.findOne({
        where: {
          account: this.account,
        },
      });
      if (!user) {
        throw new global.errs.HttpException('用户不存在');
      }

      try {
        await UserModel.update(
          {
            state_code: 0,
          },
          {
            where: {
              account: this.account,
            },
            transaction: t,
          }
        );
        await UserModel.destroy({
          where: {
            account: this.account,
          },
          transaction: t,
        });
        await new PermissionService({
          userId: user.user_id,
        }).permissionDestroy({ transaction: t });
        return { account: user.account, nickName: user.nick_name };
      } catch (error) {
        throw new global.errs.HttpException(
          `${error.message} 账户停用失败`,
          10006
        );
      }
    });
  }

  async userSearch() {
    let users = await UserModel.findOne({
      paranoid: false,
      where: {
        account: this.account,
      },
    });

    if (!users) {
      throw new global.errs.HttpException('用户信息未找到');
    }

    let { account, nick_name, user_id, org_id, secret, state_code } = users;
    let roles_name = await new PermissionService({
      userId: user_id,
    }).permissionNames();
    let roles = await new PermissionService({
      userId: user_id,
    }).permissionArray();
    let { org_desc = undefined } = await new OrganizationService({ org_id }).findOrgDesc();
    let { state_name } = await StateModel.findOne({
      where: { state_code: state_code },
    });

    return Object.assign(
      {},
      {
        account: account,
        secret: secret,
        roles: roles,
        roleName: roles_name,
        orgId: org_id,
        orgDesc: org_desc,
        nickname: nick_name,
        stateCode: state_code,
        stateName: state_name,
      }
    );
  }

  async userModify() {
    // 事务 先修改用户的org_id,nick_name 后再删除用户的role_id再新增role_id
    return sequelize.transaction(async (t) => {
      try {
        // let resetSecret = this.secret ? { secret: this.secret } : null
        // 如果修改用户的信息中不包含改密码则secret选项为空
        await UserModel.update(
          {
            org_id: this.orgId,
            nick_name: this.nickName,
            // ...resetSecret
            secret: this.secret,
          },
          {
            where: {
              account: this.account,
            },
            transaction: t,
          }
        );

        let { user_id } = await UserModel.findOne({
          where: {
            account: this.account,
          },
        });

        // throw new global.errs.Success("用户信息更新成功!")
        // 事务！先删除现有的user_id对应的role_id
        await new PermissionService({
          userId: user_id,
          roles: this.roles,
        }).permissionDestroy({ transaction: t });
        // 新增user_id对应的role_id组
        await new PermissionService({
          userId: user_id,
          roles: this.roles,
        }).permissionCreate({ transaction: t });
        return { account: this.account, nickName: this.nickName };
      } catch (error) {
        throw new global.errs.ParametersException(
          `${error.message} 用户信息更新失败`
        );
      }
    });
  }

  async userSecurity(userId) {
    let user = await UserModel.findOne({
      where: {
        user_id: userId,
      },
    });
    if (!user) {
      throw new global.errs.HttpException('用户不存在');
    }
    try {
      let nums = await UserModel.update(
        {
          secret: this.secret,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );
      return nums;
    } catch (error) {
      throw new global.errs.ParametersException(
        `${error.message} 用户密码修改失败`
      );
    }
  }

  async verifyToken() {
    return sequelize.transaction(async (t) => {
      try {
        let {
          orgId = undefined,
          role = undefined,
          scopeTop = undefined,
          userId = undefined,
        } = await tokenUtile.verifyToken(this.accessToken);
        let { nick_name } = await UserModel.findOne({
          where: {
            user_id: userId,
          },
          transaction: t,
        });

        let roles = await new PermissionService({
          userId: userId,
        }).permissionRoles();
        let roles_name = await new PermissionService({
          userId: userId,
        }).permissionNames();
        let { org_desc = undefined, channel_id = undefined } = await new OrganizationService({
          org_id: orgId,
        }).findOrgDesc();
        return {
          role,
          nick_name,
          org_desc,
          channel_id,
          roles,
          roles_name,
        };
      } catch (error) {
        throw new global.errs.ParametersException(
          `${error.message} 登录超时token失效`
        );
      }
    });
  }

  async resetPwd() {
    let user = await UserModel.findOne({
      where: {
        account: this.account,
      },
    });
    if (!user) {
      throw new global.errs.HttpException('用户不存在');
    }
    try {
      let nums = await UserModel.update(
        {
          secret: '123%aA',
        },
        {
          where: {
            account: this.account,
          },
        }
      );
      return nums;
    } catch (error) {
      throw new global.errs.ParametersException(
        `${error.message} 用户密码重置失败`
      );
    }
  }
}

/**密码验证：
 * 数据库中存储的密码是明文加密后的密码
 * 用户使用账号密码登录时，用户输入的明文密码和后端加密后的密文对比，通过则下发accessToken和refreshToken，
 * 其中refreshToken中存放有密码。
 * 用户通过refreshToken获取续期时，实例化一个UserService，传入的secret是上次下发refreshToken时的密码，
 * 在UserVerify方法中校验密码时将refreshToken中的密码和用户后端的密码二次加密后的密文做对比。
 */

module.exports = {
  UserService,
};
