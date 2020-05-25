const { UserModel } = require('../models/user')

const { PermissionService } = require('../services/permission')

class UserService {
    constructor({ account, secret, orgId, nickName, roles, createBy }) {
        this.account = account
        this.secret = secret
        this.orgId = orgId
        this.nickName = nickName
        this.roles = roles
        this.createBy = createBy
    }

    async userCreate() {
        let result = await UserModel.create({
            where: {
                account: this.account,
                secret: this.secret,
                org_id: this.orgId,
                nick_name: this.nickName,
                create_by: this.createBy
            }
        })
        return result
        // if (user_id) {
        //     let abcd = await new PermissionService(user_id, this.roles).permissionCreate()
        // } else {
        //     throw new global.errs.HttpException('用户已存在')
        // }


    }

}



module.exports = {
    UserService
}