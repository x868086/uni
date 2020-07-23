const Router = require('koa-router')
let { SpecialSerialService } = require('../../services/special-serial')
let { B2iserialValidator } = require('../../validators/validator')

const router = new Router({
    prefix: "/v1/middleplatform"
})


router.get("/:serialnumber/specialserial-search", async (ctx, next) => {
    const v1 = await new B2iserialValidator().validate(ctx)
    let serial = await new SpecialSerialService({
        serialNumber: v1.get("path.serialnumber")
    }).serialSearch()
    ctx.body = serial
})
module.exports = {
    specialserial: router
}