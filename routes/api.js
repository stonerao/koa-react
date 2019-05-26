const router = require('koa-router')()
const reptile = require("../reptile/index")
const query = require("../sql/index")
// require('./api/test')

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
    ctx.body = "看锤子看2";
})

router.get('/getStore', async (ctx, next) => {
    const LAST_DATA_SQL = `select * from store order by id DESC limit 1;`;
    let DATA_SQL = await query(LAST_DATA_SQL).then(res => {
        return res
    })
    let DATE = DATA_SQL[0].date;
    const IS_TODAY = isToday(parseInt(DATE));
    let data = {}
    if (IS_TODAY) {
        //如果是今天  
        data = {
            data: JSON.parse(DATA_SQL[0].data),
            status: 1
        }
    } else {
        let res = await reptile.crawling().then(res => {
            return res
        })
        data = {
            data: data,
            status: 2
        }
    }
    ctx.body = data;


})

module.exports = router
