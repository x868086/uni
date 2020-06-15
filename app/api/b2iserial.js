const Router = require('koa-router')
const { B2iserialService } = require("../services/b2iserial")

const { PaginationValidator } = require("../validators/validator")

const router = new Router({
    prefix: "/v1/b2iserial"
})

router.get("/list", async (ctx, next) => {
    const v = await new PaginationValidator().validate(ctx)
    let serialList = await new B2iserialService({}).serialList(v.get("query.offset"), v.get("query.limit"))
    ctx.body = {
        serialList
    }
})

module.exports = {
    b2iserial: router
}