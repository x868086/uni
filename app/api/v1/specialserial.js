const Router = require('koa-router')
let { SpecialSerialService } = require('../../services/special-serial')
let { PaginationValidator } = require('../../validators/validator')

const router = new Router({
    prefix: "/v1/middleplatform"
})

router.get("/specialserial-list", async (ctx, next) => {
    const v = await new PaginationValidator().validate(ctx)
    let serialList = await new SpecialSerialService({}).getList(v.get("query.offset"), v.get("query.limit"))
    ctx.body = serialList
})

router.get("/:serialnumber/search", async (ctx, next) => {
    // const v1 = await new B2iserialValidator().validate(ctx)
    // let serial = await new B2iserialService({
    //     serialNumber: v1.get("path.serialnumber")
    // }).serialSearch()
    // ctx.body = serial
})
module.exports = {
    specialserial: router
}