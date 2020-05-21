const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const  { InitManager } = require('./core/init.js')

const app = new Koa()


InitManager.initCore(app)

app.listen(3000)