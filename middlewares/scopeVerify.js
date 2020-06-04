const { apiList } = require('../core/apiList')
const basicAuth = require('basic-auth')
const { tokenUtile } = require('../core/utile')


const scopeVerify = () => {
    return async (ctx, next) => {
        // 通过apiList名单取出当前ctx访问目标api的scope级别
        let findApiScop = async (path) => {
            let result = apiList.find(e => e.requestRegexp.test(path))
            if (!result) {
                // 如果请求地址没在apiList中则证明是白名单API请求，返回false
                return false
            }
            //如果请求地址在apiList中则返回apiList中的scope
            return result.apiScope
        }
        let apiScope = await findApiScop(ctx.path)


        if (apiScope) {
            const token = basicAuth(ctx.req)
            if (!token || !token.name) {
                throw new global.errs.Forbidden('token信息不合法')
            }
            let decoded = await tokenUtile.decodedToken(token.name, apiScope)
            ctx.auth = {
                userId: decoded.userId,
                orgId: decoded.orgId,
                scopeTop: decoded.scopeTop,
                channelArray: decoded.channelArray
            }
        }

        await next()
    }
}

module.exports = {
    scopeVerify
}