const Router = require('koa-router')

const router = new Router({
    prefix: '/v1/user'
})

const { UserService } = require('../../services/user')

const { AccountValidator } = require('../../validators/validators')

router.post('/create', async (ctx, next) => {
    // let { account, secret, nickname, org_id, roles } = ctx.request.body
    // const v = await new AccountValidator().validate(ctx)
    let userInstance = await new UserService(ctx.request.body).userCreate()
    // console.log(userInstance)
})


module.exports = {
    user: router
}