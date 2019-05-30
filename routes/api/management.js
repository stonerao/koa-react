const router = require('koa-router')()
const query = require("../../sql/index")
const SQL = require("../../sql/sql")
const SQL_TABLE_NAME = "management"
const { aesEncrypt } = require("../../utils/md5")
const { GetCurrentDate, getDay } = require("../../utils/base")
let testMatch = /^\w\w{5,15}$/
router.prefix('/api/management')
router.post('/push', async (ctx, next) => {
    /* 
    * 接受的参数
    * @title：标题
    * @html：富文本
    */
    let { title, html } = ctx.request.body;

    let _SQL = SQL._insert({
        date: GetCurrentDate(),
        title: title,
        html: html
    }, SQL_TABLE_NAME)
    let state = await query(_SQL).then(res => {
        return res
    })
    if (state.affectedRows === 1) {
        ctx.body = {
            code: 200,
            msg: "添加成功！"
        }
    } else {
        ctx.body = {
            code: 400,
            msg: "添加失败！"
        }
    }
})
router.post("/delete", async (ctx, next) => {
    let { id } = ctx.request.body;
    if (!id) {
        ctx.body = {
            msg: "error", coed: 400
        }
        return
    }
    let data = await query(`delete from management where id in (${id})`)
    console.log(data)
    if (data.affectedRows !== 0) {
        ctx.body = {
            code: 200,
            msg: "删除成功！"
        }
    } else {
        ctx.body = {
            code: 400,
            msg: "error"
        }
    }

})
router.get('/getList', async (ctx, next) => {
    /* 
    * 接受的参数
    * @current：当前页数
    * @size：每页数量
    */
    const { current, size, search } = ctx.query;
    if (!current || !size) {
        ctx.body = {
            code: 400,
            msg: "错误"
        }
        return
    }
    //查询无条件
    let count_sql = SQL._count(SQL_TABLE_NAME)
    let search_count = `SELECT COUNT(Id) FROM management WHERE title LIKE'%${search}%' `
    //查询总数
    let counts = await query(search == '' ? count_sql : search_count)
    const count = Object.values(counts[0])[0]
    //查询需要的条数
    let _GET_SQL = `SELECT * FROM ${SQL_TABLE_NAME} ${search != '' ? `WHERE title LIKE '%${search}%' ` : ''}order by id desc limit ${(current - 1) * size},${size}`
    console.log(_GET_SQL)
    const list = await query(_GET_SQL)
    ctx.body = {
        code: 200,
        list: list,
        count: count
    }
})
module.exports = router