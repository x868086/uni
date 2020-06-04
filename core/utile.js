const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { tokenSecurity: {
    secret,
    accessExpiresIn,
    refreshExpiresIn
} } = require('../config/config')

// tokenType传入时，必须为'accessExpiresIn'或者'refreshExpiresIn'，用来区分accessToken和refreshToken
const generateToken = (userId, orgId, scopeTop, channelArray, tokenType, ...restToken) => {
    let token
    try {
        token = jwt.sign({
            // 复用generateToken方法生成refreshToken,剩余参数为accout,secret收敛到...restToken中 
            userId, orgId, scopeTop, channelArray, ...restToken
        },
            secret, {
            expiresIn: tokenType
        }
        )
    } catch (error) {
        throw new global.errs.HttpException(error.message, 10003, 500)
    }

    return token
}

const verifyToken = async (token) => {
    try {
        await jwt.verify(token, secret)
        return true
    } catch (error) {
        return false
    }
}

// apiScope 根据apiList名单传入的目标api的scope级别，与用户的scopeTop值做对比确定token的权限
const decodedToken = async (token, apiScope) => {
    let decoded = null
    try {
        decoded = await jwt.verify(token, secret)
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new global.errs.Forbidden('token已过期')
        }
        throw new global.errs.Forbidden(error.message)
    }
    if (decoded.scopeTop < apiScope) {
        throw new global.errs.Forbidden('权限不足')
    }
    return decoded
}

const generateSecret = (val) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(val, salt)
}

const decodedSecret = (plaintext, ciphertext) => {
    return bcrypt.compareSync(plaintext, ciphertext)
}

module.exports = {
    tokenUtile: {
        generateToken,
        verifyToken,
        decodedToken
    },
    secretUtile: {
        generateSecret,
        decodedSecret
    }
}