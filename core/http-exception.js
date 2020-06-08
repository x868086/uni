class HttpException extends Error {
    constructor(msg = '服务器接口异常', errorCode = 10000, code = 400) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}

class Success extends HttpException {
    constructor(msg = "created", errorCode = 0, code = 201) {
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

class ModifyError extends HttpException {
    constructor(msg = '不可重复操作', errorCode = 10004, code = 400) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}

class NotFound extends HttpException {
    constructor(msg = '资源未找到', errorCode = 10002, code = 404) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}

module.exports = {
    HttpException,
    Success,
    ParametersException,
    Forbidden,
    ModifyError,
    NotFound
}