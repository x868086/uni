const Router = require('koa-router')

const router = new Router({
    prefix: '/v1/user'
})

const { User } = require('../../models/user')

const { AccountValidator } = require('../../validators/validators')

router.get('/', async (ctx, next) => {
    const v = await new AccountValidator().validate(ctx)
    ctx.body = 'abc'
    console.log(v.get('body.smsCode'))
})


module.exports = {
    user: router
}