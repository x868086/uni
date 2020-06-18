const Router = require('koa-router')
const { ThresholdService } = require('../../services/threshold')

const { PositiveIntegerValidator,
    ThresholdValidator } = require("../../validators/validator")


const router = new Router({
    prefix: "/v1/threshold"
})

router.get('/list', async (ctx, next) => {
    let threshold = await new ThresholdService({}).thresholdList()
    ctx.body = threshold
})

router.post('/search', async (ctx, next) => {
    let v = await new ThresholdValidator().validate(ctx)
    let threshold = await new ThresholdService({ configName: v.get('body.configName') }).thresholdList()
    ctx.body = threshold
})

router.get('/:arpu/bingo', async (ctx, next) => {
    let v = await new PositiveIntegerValidator().validate(ctx, { int: "arpu" })
    let threshold = await new ThresholdService({ arpu: v.get('path.arpu') }).thresholdBingo()
    ctx.body = threshold
})

router.post('/remove', async (ctx, next) => {
    let v = await new ThresholdValidator().validate(ctx)
    let result = await new ThresholdService({ configName: v.get('body.configName') }).thresholdRemove()
    throw new global.errs.Success(`规则:${result[0]['config_name']}--${result.length}条阈值已删除`)
})

router.post('/enable', async (ctx, next) => {
    let v = await new ThresholdValidator().validate(ctx)
    let result = await new ThresholdService({ configName: v.get('body.configName') }).thresholdEable()
    throw new global.errs.Success(`规则:${result[0]['config_name']}--${result.length}条阈值已启用`)
})


module.exports = {
    threshold: router
}