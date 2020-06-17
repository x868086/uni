const Router = require('koa-router')
const { ThresholdService } = require('../../services/threshold')

const { PaginationValidator } = require("../../validators/validator")


const router = new Router({
    prefix: "/v1/threshold"
})

router.get('/list', async (ctx, next) => {
    const v = await new PaginationValidator().validate(ctx)
    let threshold = await new ThresholdService({}).thresholdList(v.get("query.offset"), v.get("query.limit"))
    ctx.body = threshold
})


module.exports = {
    threshold: router
}