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
const TABLE_NAME_TYPE = "option_type";
const TABLE_NAME_SIZE = "option_size";
const TABLE_NAME_MATERIAL = "option_materilal";
const TABLE_NAME_BRAND = "option_brand";
const TABLE_NAME_KIND = "option_kind";
const retunTypeName = (type) => {
    let TABLE_NAME;
    switch (+type) {
        case 1:
            TABLE_NAME = TABLE_NAME_TYPE
            break;
        case 2:
            TABLE_NAME = TABLE_NAME_SIZE
            break;
        case 3:
            TABLE_NAME = TABLE_NAME_MATERIAL
            break;
        case 4:
            TABLE_NAME = TABLE_NAME_BRAND
            break;
        case 5:
            TABLE_NAME = TABLE_NAME_KIND
            break;
    }
    return TABLE_NAME
}
 
router.post("/optionsTypeAdd", async (ctx) => {
    const { name, type } = ctx.request.body;
    const TABLE_NAMES = retunTypeName(type)
    if (!name) {
        return ctx.body = { code: 400 }
    }
    const ADD_SQL = SQL._insert({ date: GetCurrentDate(), name: name }, TABLE_NAMES)
    const data = await query(ADD_SQL)
    if (data.affectedRows != 0) {
        ctx.body = {
            code: 200,
            msg: "add success"
        }
    } else {
        ctx.body = {
            code: 400,
            msg: "add error"
        }
    }
})
router.get("/optionsTypeGet", async (ctx) => {
    let { type } = ctx.query;
    const TABLE_NAMES = retunTypeName(type)
    const GET_SQL = `SELECT * FROM ${TABLE_NAMES} order by id desc;` 
    let data = await query(GET_SQL)
    ctx.body = {
        list: data,
        code: 200
    }
})
router.post("/optionsTypeDelete", async (ctx) => {
    const { id, type } = ctx.request.body;
    const TABLE_NAMES = retunTypeName(type)
    const SELECT_SQL = SQL.deleteId(TABLE_NAMES, id)
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

router.post("/optionsSizeAdd", async (ctx) => {
    const { name } = ctx.request.body;
    if (!name) {
        return ctx.body = { code: 400 }
    }
    const ADD_SQL = SQL._insert({ date: GetCurrentDate(), name: name }, TABLE_NAME_SIZE)
    const data = await query(ADD_SQL)
    if (data.affectedRows != 0) {
        ctx.body = {
            code: 200,
            msg: "add success"
        }
    } else {
        ctx.body = {
            code: 400,
            msg: "add error"
        }
    }
})
router.get("/optionsSizeGet", async (ctx) => {
    const GET_SQL = `SELECT * FROM ${TABLE_NAME_SIZE} order by id desc;`
    let data = await query(GET_SQL)
    ctx.body = {
        list: data,
        code: 200
    }
})
router.post("/optionsSizeDelete", async (ctx) => {
    const { id } = ctx.request.body;
    const SELECT_SQL = SQL.deleteId(TABLE_NAME_SIZE, id)
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