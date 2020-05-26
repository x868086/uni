const Router = require("koa-router");

const router = new Router({
    prefix: "/v1/users",
});

const { UserService } = require("../../services/user");

const { AccountValidator } = require("../../validators/validators");

router.post("/create", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx);
    let account = await new UserService(ctx.request.body).userCreate();
    throw new global.errs.HttpException("user created", 0, 201);
});


router.post("/verify", async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx);
    const { accessToken, refreshToken } = await new UserService(ctx.request.body).userVerify();
    ctx.body = { accessToken, refreshToken }
});

module.exports = {
    user: router,
};
