const Router = require("koa-router");

const basicAuth = require('basic-auth')

const router = new Router({
    prefix: "/v1/users",
});

const { UserService } = require("../../services/user");

const { AccountValidator } = require("../../validators/validators");

router.post("/create", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx);
    let account = await new UserService(ctx.request.body).userCreate();
    throw new global.errs.Success("user created", 0, 201);
});


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

router.get("/:account/enable", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx);
    await new UserService(ctx.params).userEnable()
})

module.exports = {
    user: router,
};
