const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { InitManager } = require('./core/init.js')
const { catchError } = require('./middlewares/exception')
const { scopeVerify } = require('./middlewares/scopeVerify')

const app = new Koa()

app.use(bodyParser())
app.use(catchError())
app.use(scopeVerify())
InitManager.initCore(app)

app.listen(3000)