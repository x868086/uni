const { UserModel } = require("../models/user");

const { PermissionService } = require("../services/permission");

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
    }) {
        this.account = account;
        this.secret = secret;
        this.orgId = orgId;
        this.nickName = nickName;
        this.roles = roles;
        this.createBy = createBy;
        this.loginType = loginType;
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
                create_by: this.createBy
            },
        });
        if (user_id) {
            await new PermissionService(user_id, this.roles).permissionCreate();
            return this.account;
        }
    }

    async userVerify() {
        let user = await UserModel.findOne({
            where: {
                account: this.account,
            },
        });
        if (user) {
            let correct =
                secretUtile.decodedSecret(this.secret, user.secret)
            if (correct) {
                let accessToken = tokenUtile.generateToken(
                    user.user_id,
                    user.org_id,
                    tokenSecurity.accessExpiresIn
                );
                let refreshToken = tokenUtile.generateToken(
                    undefined, undefined,
                    tokenSecurity.refreshExpiresIn,
                    user.account,
                    this.secret
                );
                return { accessToken, refreshToken };
            } else {
                throw new global.errs.HttpException('登录密码不正确')
            }
        } else {
            throw new global.errs.HttpException('用户信息不存在,请联系管理员', 10006, 500)
        }
    }

    async tokenRefresh(token) {

    }
}

module.exports = {
    UserService,
};
