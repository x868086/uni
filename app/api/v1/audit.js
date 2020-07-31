const Router = require('koa-router')
const { AuditService } = require("../../services/audit")

const { PaginationValidator, AuditDateValidator, AccountValidator } = require("../../validators/validator")

const router = new Router({
    prefix: "/v1/audit"
})

router.get("/list", async (ctx, next) => {
    const v1 = await new PaginationValidator().validate(ctx)
    const v2 = await new AuditDateValidator().validate(ctx)
    let auditList = await new AuditService({}).auditList(v1.get("query.offset"), v1.get("query.limit"), v2.get("query.auditdate"))
    ctx.body = auditList
})

router.post("/search", async (ctx, next) => {
    const v1 = await new AccountValidator().validate(ctx, { account: "serialNumber" })
    const v2 = await new AuditDateValidator().validate(ctx)
    let result = await new AuditService({
        serialNumber: v1.get("body.serialNumber"),
        // 取原始类型的auditdate参数，这里是字符串类型，因为AuditDateValidator校验器会自动将auditdate转成数值型
        auditDate: v2.get("body.auditdate", parsed = false)
    }).auditSearch()
    ctx.body = result
})

router.post("/modify", async (ctx, next) => {
    const v1 = await new AccountValidator().validate(ctx, { account: "serialNumber" })
    const v2 = await new AuditDateValidator().validate(ctx)
    let result = await new AuditService({
        id: v1.get("body.id"),
        serialNumber: v1.get("body.serialNumber"),
        auditDate: v2.get("body.auditdate", parsed = false),
        stateName: v2.get("body.stateName"),
        rejectReason: v2.get("body.rejectReason")
    }).auditModify()
    throw new global.errs.Success(`${result.serialNumber} 的稽核结果信息提交成功`, 0, 202)
})



module.exports = {
    audit: router
}