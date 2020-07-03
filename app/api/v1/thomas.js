const Router = require('koa-router')

const router = new Router({
    prefix: "/v1/thomas"
})


router.post("/uploadfile", async (ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
})



module.exports = {
    thomas: router
}