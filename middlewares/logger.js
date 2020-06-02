const koaLogger = require('koa-logger')
const { LoggerModel } = require('../app/models/logger')

const logger = () => {
    let koaLogger = async (str, args) => {
        let { origin, path, protocol, method, response: { message, status } } = str
        let headerStringify = JSON.stringify(str.header)
        let loggDate = new Date().toLocaleString()

        await LoggerModel.create({
            logger_date: loggDate,
            origin,
            path,
            protocol,
            method,
            message,
            status,
            header_stringify: headerStringify
        })

    }
    return koaLogger
}

module.exports = {
    logger
}