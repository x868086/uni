const { apiList } = require('../core/apiList')
const basicAuth = require('basic-auth')
const { tokenUtile } = require('../core/utile')


const scopeVerify = () => {
    return async (ctx, next) => {
        const token = basicAuth(ctx.req)
        if (!token || !token.name) {
            throw new global.errs.Forbidden('token信息不合法')
        }
        let decoded = await tokenUtile.decodedToken(token.name)
        ctx.auth = {
            userId: decoded.userId,
            orgId: decoded.orgId
        }
        await next()
    }
}

module.exports = {
    scopeVerify
}