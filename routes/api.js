const router = require('koa-router')()
const query = require("../sql/index")
router.prefix('/api')
const isToday = (str) => {
    if (new Date(str).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)) {
        //今天
        return true
    } else {
        //之前
        return false
    }
}

router.get('/', function (ctx, next) {
    ctx.body = "看锤子看";
})
router.get("/login", async (ctx,next) => {
    
})
module.exports = router
