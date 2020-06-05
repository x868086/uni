const Router = require("koa-router");

const basicAuth = require('basic-auth')

const router = new Router({
    prefix: "/v1/users",
});

const { UserService } = require("../../services/user");

const { AccountValidator,
    PositiveIntegerValidator
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
    const v = await new AccountValidator().validate(ctx);
    let account = await new UserService(ctx.request.body).userCreate();
    throw new global.errs.Success("用户信息已创建", 0, 201);
});

router.get("/:account/enable", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx);
    await new UserService(ctx.params).userEnable()
})

router.get("/:account/remove", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx);
    await new UserService(ctx.params).userRemove()
})

router.post("/:account/modify", async (ctx, next) => {
    let result = await new UserService(ctx.params).userInfo()

    // const v = await new AccountValidator().validate(ctx);
    // await new UserService(ctx.params).userRemove()
})


router.get("/list", async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    let userList = await new UserService(ctx).userList(v.get("query.offset"), v.get("query.limit"))
    ctx.body = { userList }
})

module.exports = {
    user: router,
};
