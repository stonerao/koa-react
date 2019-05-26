const router = require('koa-router')()
// const query = require("../sql/index")
router.prefix('/api/member')
router.get('/reg', function (ctx, next) {
    //判断当前格式是否正确

    //查询该账号是否存在

    //存入数据库
    ctx.body = "看锤子看1";
})
router.get('/login', function (ctx, next) {
    //判断当前格式是否正确 
    //查询该账号是否存在 
    //判断当前账号密码是否正确
    //返回编码
    ctx.body = "看锤子看1";
})
router.get('/retrieve', function (ctx, next) {
    //输入注册时填入的账号密码
    //重新填写密码
    ctx.body = "找回密码";
})
module.exports = router