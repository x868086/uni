const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const { InitManager } = require('./core/init.js')
const { catchError } = require('./middlewares/exception')
const { scopeVerify } = require('./middlewares/scope-verify')
const { accessLogger, applicationLogger } = require('./middlewares/logger')

const app = new Koa()

app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/test') {
        //     return "*"; // 允许来自所有域名请求
        // }
        return 'http://localhost:9528';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-token']
}))

app.use(accessLogger())
app.use(applicationLogger())
app.use(bodyParser())
app.use(catchError())
app.use(scopeVerify())


InitManager.initCore(app)

app.listen(3000)