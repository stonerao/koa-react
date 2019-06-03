const router = require('koa-router')()
const query = require("../../sql/index")
const SQL = require("../../sql/sql")
const SQL_TABLE_NAME = "personnel"
const { aesEncrypt } = require("../../utils/md5")
const { GetCurrentDate, getDay } = require("../../utils/base")
const { PHONE } = require("../../utils/test")
router.prefix('/api/personnel')
/* personnel management */
router.post("/add", async (ctx, next) => {
    const { username, age, phone, duties } = ctx.request.body;
    if (!username || !age || !phone || !duties) {
        ctx.body = {
            code: 400,
            msg: "信息不能为空！"
        }
        return false
    }
    const AGE_NUMBER = age;
    // check age
    if (isNaN(AGE_NUMBER) || !(AGE_NUMBER >= -1 && AGE_NUMBER <= 120)) {
        ctx.body = {
            code: 400,
            msg: "age error"
        }
        return false
    }
    // check phone
    if (!PHONE.test(phone)) {
        ctx.body = {
            code: 400,
            msg: "phone error"
        }
        return false
    }
    //check for existence
    const CHECK_SQL = SQL._select(SQL_TABLE_NAME, { username: username })
    const CHECK_DATA = await query(CHECK_SQL)
    if (CHECK_DATA.length !== 0) {
        ctx.body = {
            code: 400
        }
        return
    }
    // add personnel user sql 
    const ADD_SQL = SQL._insert({ username, age, phone, duties, date: GetCurrentDate() }, SQL_TABLE_NAME)
    const ADD_STATE = await query(ADD_SQL)
    if (ADD_STATE.affectedRows > 0) {
        /* added successfully */
        ctx.body = {
            code: 200,
            CHECK_DATA: ADD_STATE
        }
    } else {
        /* add failed */
        ctx.body = {
            code: ADD_STATE
        }
    }
})
router.get("/getList", async (ctx) => {
    // total number of queries
    /**
     * @current the current page 
     * @size the current page size
     * 
     * 
    */
    const { current, size, username, age, phone, duties } = ctx.query;
    const COUNT_SQL = `SELECT COUNT(Id) FROM ${SQL_TABLE_NAME} ${username == "" ? '' : `WHERE username LIKE '%${username}%'`}`
    // get the total
    let counts = await query(COUNT_SQL)
    //total
    const count = Object.values(counts[0])[0]
    // multiple
    const QUERY_TERM = {
        username, age, phone, duties
    }

    const QUERY_LIST = SQL._multi_query(
        {
            username: username || "",
            age: age || "",
            phone: phone || "",
            duties: duties || ""
        },
        SQL_TABLE_NAME,
        (current - 1) * size,
        size)
    // let QUERY_LIST = `SELECT * FROM ${SQL_TABLE_NAME} ${username != '' ? `WHERE username LIKE '%${username}%' ` : ''}order by id desc limit ${(current - 1) * size},${size}`
    const list = await query(QUERY_LIST)
    ctx.body = {
        code: 200,
        list: list,
        total: count,
        sql: QUERY_LIST
    }
})
module.exports = router