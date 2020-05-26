const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { tokenSecurity: {
    secret,
    accessExpiresIn,
    refreshExpiresIn
} } = require('../config/config')

// tokenType传入时，必须为'accessExpiresIn'或者'refreshExpiresIn'，用来区分accessToken和refreshToken
const generateToken = (userId, orgId, tokenType, ...restToken) => {
    let token
    try {
        token = jwt.sign({
            // 复用generateToken方法生成refreshToken,剩余参数为accout,secret收敛到...restToken中 
            userId, orgId, ...restToken
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
    if (decoded.scope < apiScope) {
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