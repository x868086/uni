const Router = require('koa-router')

const router = new Router({
    prefix: "/v1/role"
})

const { PositiveIntegerValidator, RoleValidator } = require("../../validators/validator")

const { RoleService } = require("../../services/role")

router.post("/create", async (ctx, next) => {
    const v = await new RoleValidator().validate(ctx)
    let { role, roleName } = await new RoleService(ctx.request.body).roleCreate()
    throw new global.errs.Success(`${role}, ${roleName} 角色创建成功`)
})


router.get("/:roleid/remove", async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, { int: "roleid" })
    let { roleName } = await new RoleService({ roleId: v.get("path.roleid") }).roleRemove()
    throw new global.errs.Success(`${roleName} 角色已删除`, 0, 202)
})

router.get("/:roleid/enable", async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, { int: "roleid" })
    let { roleName } = await new RoleService({ roleId: v.get("path.roleid") }).roleEnable()
    throw new global.errs.Success(`${roleName} 角色已启用`, 0, 202)
})

module.exports = {
    role: router
}