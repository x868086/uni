const Router = require('koa-router')
const { B2iserialService } = require("../services/b2iserial")

const { PaginationValidator,
    B2iserialValidator,
    B2iserialModifyValidator } = require("../validators/validator")

const router = new Router({
    prefix: "/v1/b2iserial"
})

router.get("/list", async (ctx, next) => {
    const v = await new PaginationValidator().validate(ctx)
    let serialList = await new B2iserialService({}).serialList(v.get("query.offset"), v.get("query.limit"))
    ctx.body = serialList
})

router.get("/:serialnumber/search", async (ctx, next) => {
    const v1 = await new B2iserialValidator().validate(ctx)
    let serial = await new B2iserialService({
        serialNumber: v1.get("path.serialnumber")
    }).serialSearch()
    ctx.body = serial
})

router.post("/:serialnumber/modify", async (ctx, next) => {
    const v1 = await new B2iserialValidator().validate(ctx)
    const v2 = await new B2iserialModifyValidator().validate(ctx)
    await new B2iserialService({
        serialNumber: v1.get("path.serialnumber"),
        devName: v2.get("body.devName"),
        devPhone: v2.get("body.devPhone"),
        contactPhone: v2.get("body.contactPhone"),
        operate: v2.get("body.operate"),
        operateTime: v2.get("body.operateTime")
    }).serialModify(['待处理', '已处理', '驳回', '删除'])
})

router.post("/:serialnumber/allocate", async (ctx, next) => {
    const v1 = await new B2iserialValidator().validate(ctx)
    await new B2iserialService({
        serialNumber: v1.get("path.serialnumber"),
        operate: v1.get("body.operate"),
        operateTime: v1.get("body.operateTime")
    }).serialModify(['已处理', '驳回', '删除'])
})

router.post("/:serialnumber/reject", async (ctx, next) => {
    const v1 = await new B2iserialValidator().validate(ctx)
    await new B2iserialService({
        serialNumber: v1.get("path.serialnumber"),
        operate: v1.get("body.operate"),
        operateTime: v1.get("body.operateTime")
    }).serialModify(['驳回', '删除'])
})

router.post("/:serialnumber/remove", async (ctx, next) => {
    const v1 = await new B2iserialValidator().validate(ctx)
    await new B2iserialService({
        serialNumber: v1.get("path.serialnumber"),
        operate: v1.get("body.operate"),
        operateTime: v1.get("body.operateTime")
    }).serialModify(['删除'])
})



module.exports = {
    b2iserial: router
}