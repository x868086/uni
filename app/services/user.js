const { UserModel } = require("../models/user");

const { PermissionService } = require("../services/permission");
const { RoleService } = require("../services/role")
const { OrganizationService } = require("../services/organization")

const { tokenUtile, secretUtile } = require("../../core/utile");

const { tokenSecurity } = require("../../config/config");

class UserService {
    constructor({
        account,
        secret,
        orgId,
        nickName,
        roles,
        createBy,
        loginType,
        refreshToken
    }) {
        this.account = account;
        this.secret = secret;
        this.orgId = orgId;
        this.nickName = nickName;
        this.roles = roles;
        this.createBy = createBy;
        this.loginType = loginType;
        this.refreshToken = refreshToken
    }

    async userCreate() {
        let user
        try {
            user = await UserModel.findOne({
                where: {
                    account: this.account,
                },
            });
        } catch (error) {
            throw new global.errs.HttpException(error.message, 10006, 500);
        }

        if (user) {
            throw new global.errs.HttpException("用户已存在");
        }

        try {
            let [{ user_id }, created] = await UserModel.findOrCreate({
                where: {
                    account: this.account,
                    secret: this.secret,
                    org_id: this.orgId,
                    nick_name: this.nickName,
                    create_by: this.createBy
                },
            });
            if (user_id) {
                await new PermissionService(user_id, this.roles).permissionCreate();
                return this.account;
            }
        } catch (error) {
            throw new global.errs.HttpException(error.message, 10006, 500);
        }
    }

    async userVerify() {
        // 获取用户的user_id,org_id,roles数组,scope数组,scope_top值,channels数组 并以此生成token
        let user, permissionArray, scopeArray, scopeTop, channelArray
        try {
            // 查询user
            user = await UserModel.findOne({
                where: {
                    account: this.account,
                },
            });

            // 查询user的roles和scope
            let result = await new RoleService(user.user_id).findScope()
            permissionArray = result['permissionArray'].map((e) => e.role_id)
            scopeArray = result['scopeArray']
            scopeTop = result['scopeTop']

            // 查询user的channels, 传入节点scope值用来判断节点是否渠道级或直销人员级的末梢节点
            channelArray = await new OrganizationService({ org_id: user.org_id, scope: scopeTop }).findChannels()
        } catch (error) {
            throw new global.errs.HttpException(error.message, 10006, 500);
        }

        if (user) {
            let correct =
                secretUtile.decodedSecret(this.secret, user.secret)
            if (correct) {
                let accessToken = tokenUtile.generateToken(
                    // 将用户user_id,org_id,权限内的channels加密生成token
                    user.user_id,
                    user.org_id,
                    channelArray,
                    tokenSecurity.accessExpiresIn
                );
                let refreshToken = tokenUtile.generateToken(
                    undefined, undefined, undefined,
                    tokenSecurity.refreshExpiresIn,
                    user.account,
                    this.secret
                );
                return { accessToken, refreshToken };
            } else {
                throw new global.errs.Forbidden('密码不正确')
            }
        } else {
            throw new global.errs.Forbidden('用户信息不存在,请联系管理员', 10002, 403)
        }
    }

    async tokenRefresh() {
        try {
            let decoded = await tokenUtile.decodedToken(this.refreshToken)
            let account = decoded[0]
            let secret = decoded[1]
            return await new UserService({ account, secret }).userVerify()
        } catch (error) {
            throw new global.errs.HttpException(error.message, 10006, 500)
        }
    }

    async userEnable() {
        let user = await UserModel.findOne({
            where: {
                account: this.account
            }
        })
        if (!user) {
            throw new global.errs.HttpException("用户不存在")
        }
        if (user.state_code === 0) {
            throw new global.errs.ModifyError("不可重复操作")
        }
        await user.update({
            state_code: 0
        })
        throw new global.errs.Success("用户信息已更新")

    }
}

module.exports = {
    UserService
};
