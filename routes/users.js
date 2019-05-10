const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  console.log(ctx.request)
  // ctx.append('test', '0000');
  ctx.body = ctx.request
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
