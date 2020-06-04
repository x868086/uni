const log4js = require('koa-log4')
const path = require('path')

log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: path.join(__dirname, '../logs/access.log'),
            // filename: __dirname + '/logs/access.log',//文件目录，当目录文件或文件夹不存在时，会自动创建
            maxLogSize: 10,//文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
            backups: 3,//当文件内容超过文件存储空间时，备份文件的数量
            //compress : true,//是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
            encoding: 'utf-8',//default "utf-8"，文件的编码
            numBackups: 5, // keep five backup files
            compress: false, // compress the backups
            encoding: 'utf-8',
        },
        dateFile: {
            type: 'dateFile',
            filename: path.join(__dirname, '../logs/accessdate.log'),
            // filename: __dirname + '/logsdate/accessdate.log',
            pattern: 'yyyy-MM-dd',
            compress: false
        },
        application: {
            type: 'dateFile',
            // filename: __dirname + '/logsdate/applicationdate.log',
            filename: path.join(__dirname, '../logs/applicationdate.log'),
            pattern: 'yyyy-MM-dd',
            compress: false
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        // default: { appenders: ['file', 'dateFile', 'out'], level: 'info' },
        // application: { appenders: ['file'], level: 'info' },
        // accessdate: { appenders: ['dateFile'], level: 'trace' }
        default: { appenders: ['file', 'dateFile', 'out'], level: 'ALL' },
        application: { appenders: ['file'], level: 'ALL' },
        accessdate: { appenders: ['dateFile'], level: 'ALL' }
    }
})



let accessLogger = () => {
    return log4js.koaLogger(log4js.getLogger('accessdate'))
}

let applicationLogger = () => {
    return log4js.koaLogger(log4js.getLogger('application'));
}

module.exports = {
    accessLogger,
    applicationLogger
}