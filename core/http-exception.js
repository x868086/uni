class HttpException extends Error {
    constructor(msg = '服务器接口异常', errorCode = 10000, code = 400) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}



class ParametersException extends HttpException {
    constructor(msg = '请求参数错误', errorCode = 10000, code = 400) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}


class Forbidden extends HttpException {
    constructor(msg = '未授权', errorCode = 10005, code = 401) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}

module.exports = {
    HttpException,
    ParametersException,
    Forbidden
}