const { apiList, whiteList } = require('../core/api-list')
const basicAuth = require('basic-auth')
const { tokenUtile } = require('../core/utile')


const scopeVerify = () => {
    return async (ctx, next) => {
        // 通过apiList名单取出当前ctx访问目标api的scope级别
        let findApiScop = async (path) => {
            // 如果请求地址在whiteList中则是白名单api，直接放过
            if (whiteList.find(e => e.requestRegexp.test(path))) {
                return false
            }

            let result = apiList.find(e => e.requestRegexp.test(path))
            // 如果请求地址没在apiList中则抛出404错误
            if (!result) {
                throw new global.errs.NotFound()
            }
            //如果请求地址在apiList中则返回apiList中的scope
            return result.apiScope
        }
        let apiScope = await findApiScop(ctx.path)


        if (apiScope) {
            const token = basicAuth(ctx.req)
            if (!token || !token.name) {
                throw new global.errs.Unauthorized('token信息不合法')
            }
            // 用户的token和后端API接口的scope值对比校验权限
            let decoded = await tokenUtile.decodedToken(token.name, apiScope)
            ctx.auth = {
                userId: decoded.userId,
                orgId: decoded.orgId,
                scopeTop: decoded.scopeTop,
                role: decoded.role,
                channelArray: decoded.channelArray
            }
        }

        await next()
    }
}

module.exports = {
    scopeVerify
}