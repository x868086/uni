const { HttpException } = require('../core/http-exception')

const catchError = () => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (error) {
            let isDev = global.environment === 'development'
            let isHttpException = error instanceof HttpException
            if (isDev && !isHttpException) {
                throw error
            }
            if (isHttpException) {
                ctx.body = {
                    msg: error.msg,
                    error_code: error.errorCode,
                    request: `${ctx.method} ${ctx.path}`
                }
                ctx.status = error.code
            } else {
                ctx.body = {
                    msg: `oops! 服务器内部错误 ${error.message}`,
                    error_code: 10006,
                    request: `${ctx.method} ${ctx.path}`
                }
                ctx.status = 500
            }
        }
    }
}

module.exports = {
    catchError
}
