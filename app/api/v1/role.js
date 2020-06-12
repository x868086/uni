const Router = require('koa-router')

const router = new Router({
    prefix: "/v1/role"
})

const { PositiveIntegerValidator, RoleValidator, PaginationValidator } = require("../../validators/validator")

const { RoleService } = require("../../services/role")
const route = require('../../models/route')

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

router.post("/:roleid/modify", async (ctx, next) => {
    const v1 = await new PositiveIntegerValidator().validate(ctx, { int: "roleid" })
    const v2 = await new RoleValidator().validate(ctx)
    let { roleName } = await new RoleService({
        roleId: v1.get("path.roleid"),
        role: v2.get("body.role"),
        roleName: v2.get("body.roleName"),
        scope: v2.get("body.scope"),
        roleRoute: v2.get("body.roleRoute")
    }).roleModify()
    throw new global.errs.Success(`${roleName} 角色信息已更新`, 0, 202)
})

router.get("/:roleid/search", async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, { int: "roleid" })
    let result = await new RoleService({ roleId: v.get("path.roleid") }).roleSearch()
    ctx.body = result
})

router.get("/list", async (ctx, next) => {
    const v = await new PaginationValidator().validate(ctx)
    let roleList = await new RoleService({ undefined }).roleList(v.get("query.offset"), v.get("query.limit"))
    ctx.body = roleList
})


module.exports = {
    role: router
}