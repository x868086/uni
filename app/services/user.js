const { UserModel } = require('../models/user')

// const { PermissionService } = require('../services/permission')

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
        let result = await UserModel.findOrCreate({
            where: {
                account: this.account,
                secret: this.secret,
                org_id: this.orgId,
                nick_name: this.nickName,
                create_by: this.createBy
            }
        })
        return result
        // PermissionService.permissionCreate(user_id, this.roles)

    }

}



module.exports = {
    UserService
}