const router = require('koa-router')() 
 
const _dir = require("../../path")
var phantom = require('phantom');

router.prefix('/api/visualization')
 
router.get("/index", async (ctx) => {
    await ctx.render('index', {
        title: "这是一个报表"
    })
})
router.post("/pdf", async (ctx) => {
    let _dirs = ""
    const promise = new Promise(function (resolve, reject) {
        // ... some code
        phantom.create().then(function (ph) {
            //创建一个PDF  
            ph.createPage().then(function (page) {
                //打开需要读取页面   
                page.open("http://localhost:3000/api/visualization/index").then(function (status) {
                    //设置页面为A4大小
                    console.log(4) 
                    page.property('paperSize', {
                        format: 'A4',
                    });
                    //保存对应位置
                    _path = "/pdf/" + Date.now() + '.pdf'
                    _dirs = "/public" + _path
                    var url = _dir.path + _dirs 
                    //开始渲染并且~保存  
                    page.render(url).then(function () {
                        //保存成功  
                        ph.exit(); 
                        resolve(_path);
                    });
                });
            });
        });

    });
    await promise.then(res => {
        ctx.body = {
            code: 200,
            path: res
        }
    })


})
module.exports = router