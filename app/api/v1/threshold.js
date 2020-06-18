const Router = require('koa-router')
const { ThresholdService } = require('../../services/threshold')

const { PositiveIntegerValidator,
    ThresholdValidator,
    ThresholdCreateValidator,
    ThresholdModifyValidator } = require("../../validators/validator")


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

router.post('/create', async (ctx, next) => {
    let v = await new ThresholdCreateValidator().validate(ctx)
    let { config_name, title } = await new ThresholdService({
        configName: v.get('body.configName'),
        startDate: v.get('body.startDate'),
        endDate: v.get('body.endDate'),
        operator: v.get('body.operator'),
        gt: v.get('body.gt'),
        lte: v.get('body.lte'),
        title: v.get('body.title')
    }).thresholdCreate()
    throw new global.errs.Success(`弹窗规则:${config_name}--${title}阈值信息新增成功`)
})

router.post('/modify', async (ctx, next) => {
    let v1 = await new ThresholdValidator().validate(ctx, { configName: 'conditions' })
    let v2 = await new ThresholdModifyValidator().validate(ctx)
    let { configName } = await new ThresholdService({
        configName: v2.get('body.configName'),
        startDate: v2.get('body.startDate'),
        endDate: v2.get('body.endDate'),
        operator: v2.get('body.operator'),
        items: v2.get('body.items')
    }).thresholdModify(v1.get('body.conditions'))
    throw new global.errs.Success(`弹窗规则:${configName}修改成功`)
})


module.exports = {
    threshold: router
}