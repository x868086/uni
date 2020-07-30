const Router = require('koa-router')
const { AutidService } = require("../../services/audit")

const { PaginationValidator } = require("../../validators/validator")

const router = new Router({
    prefix: "/v1/audit"
})

router.get("/list", async (ctx, next) => {
    const v = await new PaginationValidator().validate(ctx)
    let auditList = await new AutidService({}).auditList(v.get("query.offset"), v.get("query.limit"))
    ctx.body = auditList
})

router.get("/:auditid/search", async (ctx, next) => {
    // const v1 = await new B2iserialValidator().validate(ctx)
    // let serial = await new B2iserialService({
    //     serialNumber: v1.get("path.serialnumber")
    // }).serialSearch()
    // ctx.body = serial
})

router.post("/:auditid/modify", async (ctx, next) => {
    // const v1 = await new B2iserialValidator().validate(ctx)
    // const v2 = await new B2iserialModifyValidator().validate(ctx)
    // await new B2iserialService({
    //     serialNumber: v1.get("path.serialnumber"),
    //     devName: v2.get("body.devName"),
    //     devPhone: v2.get("body.devPhone"),
    //     contactPhone: v2.get("body.contactPhone"),
    //     operate: v2.get("body.operate"),
    //     operateTime: v2.get("body.operateTime")
    // }).serialModify(['待处理', '已处理', '删除'])
})



module.exports = {
    audit: router
}