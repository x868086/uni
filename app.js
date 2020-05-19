const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  global.console.log('step 1')
  await next()
  global.console.log('step 1 response')
})

app.use(async (ctx, next) => {
  global.console.log('step 2')
  next()
  global.console.log('step 2 response')
})

app.use(async (ctx, next) => {
  global.console.log('step 3')
  await next()
  global.console.log('step 3 response')
})

app.use(async (ctx, next) => {
  setTimeout(function(){
    global.console.log('step 4')
  },4000)
  await next()
  global.console.log('step 4 response')
})

app.use(async (ctx, next) => {
  setTimeout(function(){
    global.console.log('step 5')
  },5000)
  await next()
  global.console.log('step 5 response')
})





app.listen(3000)