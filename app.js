const Koa = require('koa')
const app = new Koa()
const compress =require('koa-compress');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')
const api_member = require('./routes/api/member') 
const management = require('./routes/api/management') 
const personnel = require('./routes/api/personnel') 
const goods = require('./routes/api/goods') 
const visualization = require('./routes/api/visualization') 
const options = {threshold:2048};
app.use(compress(options));

const ws = require("./routes/socket/index")
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(api.routes(), api.allowedMethods())
app.use(api_member.routes(), api_member.allowedMethods())
app.use(management.routes(), management.allowedMethods())
app.use(personnel.routes(), personnel.allowedMethods())
app.use(goods.routes(), goods.allowedMethods())
app.use(visualization.routes(), visualization.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
