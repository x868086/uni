const Router = require("koa-router");

const basicAuth = require('basic-auth')

const router = new Router({
    prefix: "/v1/users",
});

const { UserService } = require("../../services/user");

const { PositiveIntegerValidator,
    AccountValidator,
    UserModifyValidator,
} = require("../../validators/validators");


router.post("/verify", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx);
    const { accessToken, refreshToken } = await new UserService(ctx.request.body).userVerify();
    ctx.body = { accessToken, refreshToken }
});


router.get("/tokenrefresh", async (ctx, next) => {
    const token = basicAuth(ctx.req)
    if (!token || !token.name) {
        throw new global.errs.Forbidden('token信息不合法')
    }
    const { accessToken, refreshToken } = await new UserService({ refreshToken: token.name }).tokenRefresh()
    ctx.body = { accessToken, refreshToken }
})


router.post("/create", async (ctx, next) => {
    const v = await new UserModifyValidator().validate(ctx);
    let { account, nickName } = await new UserService(ctx.request.body).userCreate();
    throw new global.errs.Success(`${account}-${nickName} 用户信息已创建`, 0, 201);
});

router.get("/:account/enable", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx);
    let { account, nickName } = await new UserService(ctx.params).userEnable()
    throw new global.errs.Success(`${account}-${nickName} 的用户已启用`)
})

router.get("/:account/remove", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx);
    let { account, nickName } = await new UserService(ctx.params).userRemove()
    throw new global.errs.Success(`${account}-${nickName} 的用户已停用`)
})

router.get("/:account/search", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx);
    let userInfo = await new UserService(ctx.params).userInfo()
    ctx.body = userInfo
})

router.post("/:account/modify", async (ctx, next) => {
    const v = await new UserModifyValidator().validate(ctx)
    let { account, nickName } = await new UserService({
        account: v.get("path.account"),
        nickName: v.get("body.nickName"),
        orgId: v.get("body.orgId"),
        secret: v.get("body.secret"),
        roles: v.get("body.roles")
    }).userModify()
    throw new global.errs.Success(`${account}-${nickName} 用户信息已更新`)
})

router.get("/list", async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    let userList = await new UserService(ctx).userList(v.get("query.offset"), v.get("query.limit"))
    ctx.body = { userList }
})

router.post("/security", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx)
    let { account } = await new UserService(ctx.request.body).userSecurity()
    throw new global.errs.Success(`${account} 用户密码修改成功`)
})



module.exports = {
    user: router,
};
