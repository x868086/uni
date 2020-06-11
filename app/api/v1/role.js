const Router = require('koa-router')

const router = new Router({
    prefix: "/v1/role"
})

const { RoleValidator } = require("../../validators/validator")

const { RoleService } = require("../../services/role")

router.post("/create", async (ctx, next) => {
    const v = await new RoleValidator().validate(ctx)
    await new RoleService(ctx.request.body).roleCreate()
})

module.exports = {
    role: router
}