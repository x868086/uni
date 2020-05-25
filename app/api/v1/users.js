const Router = require("koa-router");

const router = new Router({
  prefix: "/v1/user",
});

const { UserService } = require("../../services/user");

const { AccountValidator } = require("../../validators/validators");

router.post("/create", async (ctx, next) => {
  const v = await new AccountValidator().validate(ctx);
  let userId = await new UserService(ctx.request.body).userCreate();
  console.log(userId);
});

module.exports = {
  user: router,
};
