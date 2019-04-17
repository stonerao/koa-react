const router = require('koa-router')()
const query = require("../sql/index")
// const reptile = require("../reptile/index")

router.get('/', async (ctx, next) => {
  /* let res = await reptile.crawling().then(res => {
    return res
  }) */ 
  let res = await query("SELECT * FROM member").then(res => {
    return res
  })
  ctx.body = res
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
