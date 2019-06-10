const router = require('koa-router')()
const query = require("../../sql/index")
const SQL = require("../../sql/sql")
const SQL_TABLE_NAME = "goods"
const { GetCurrentDate, getDay } = require("../../utils/base")
router.prefix('/api/goods')
/* personnel management */
router.post("/typeAdd", async (ctx, next) => {
    const { name } = ctx.request.body;
    if (!name) {
        ctx.body = {
            code: 400
        }
        return
    }
    const CHECK_SQL = SQL._select(SQL_TABLE_NAME, { type: name })
    // select goods types length > 0
    if (CHECK_SQL.length !== 0) {
        ctx.body = {
            code: 400
        }
        return
    }
    // insert
    const INSERT_SQL = SQL._insert({ type: name, date: GetCurrentDate() }, SQL_TABLE_NAME)
    const data = await query(INSERT_SQL)
    if (data.affectedRows != 0) {
        ctx.body = {
            code: 200,
            msg: "添加成功！"
        }
    } else {
        ctx.body = {
            code: 400
        }
    }
})

router.get("/typeGet", async (ctx) => {
    const SELECT_SQL = `SELECT * FROM ${SQL_TABLE_NAME} order by id desc;`
    const data = await query(SELECT_SQL);
    ctx.body = {
        list: data,
        code: 200
    }
})

router.post("/typeDelete", async (ctx) => {
    const { id } = ctx.query;
    const SELECT_SQL = SQL.deleteId(SQL_TABLE_NAME, id)
    const data = await query(SELECT_SQL);
    if (data.affectedRows != 0) {
        ctx.body = {
            code: 200,
            msg: "删除成功！"
        }
    } else {
        ctx.body = {
            code: 400
        }
    }
})

module.exports = router