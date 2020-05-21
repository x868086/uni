class HttpException extends Error {
    constructor(msg = '服务器接口异常', errorCode = 10000, statusCode = 400) {
        super()
        this.message = msg
        this.errorCode = errorCode
        this.statusCode = statusCode
    }
}



class Forbidden extends HttpException {
    constructor(msg = '未授权', errorCode = 10005, statusCode = 401) {
        super()
        this.message = msg
        this.errorCode = errorCode
        this.statusCode = statusCode
    }
}


module.exports = {
    HttpException,
    Forbidden
}