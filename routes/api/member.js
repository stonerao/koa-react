const router = require('koa-router')()
const query = require("../../sql/index")
const SQL = require("../../sql/sql")
const SQL_TABLE_NAME = "member"
const { aesEncrypt } = require("../../utils/md5")
const { GetCurrentDate, getDay } = require("../../utils/base")
let testMatch = /^\w\w{5,15}$/
const getTime = () => {
    return Date.parse(new Date())
}
router.prefix('/api/member')
router.post('/reg', async (ctx, next) => {
    //判断当前格式是否正确 
    const { username, password } = ctx.request.body;
    if (!testMatch.test(username) || !testMatch.test(password)) {
        ctx.body = {
            code: 400,
            msg: "用户名或者密码有误！"
        }
        return false
    }
    //查询该账号是否存在
    let _SELECT_SQL = SQL._select(SQL_TABLE_NAME, { username });
    let data = await query(_SELECT_SQL).then(res => {
        return res
    })
    if (data.length !== 0) {
        //数据库不存在
        ctx.body = {
            code: 400,
            msg: "账户已存在"
        }
    } else {
        //存入数据库
        /* 
        * @username 账户
        * @password 密码
        * @ceate_time 注册时间 时间戳
        */
        let _INSERT_SQL = SQL._insert({
            username,
            password,
            create_time: getTime()
        }, SQL_TABLE_NAME)
        let data = await query(_INSERT_SQL).then(res => {
            return res;
        })
        if (data.insertId > 0) {
            //插入成功
            ctx.body = {
                code: 200,
                msg: "注册成功！"
            }
        } else {
            ctx.body = {
                code: 400,
                msg: "注册失败！"
            }
        }

    }

})
router.post('/login', async (ctx, next) => {
    //判断当前格式是否正确 
    const { username, password } = ctx.request.body;
    if (!testMatch.test(username) || !testMatch.test(password)) {
        ctx.body = {
            code: 400,
            msg: "用户名或者密码有误！"
        }
        return false
    }
    //查询该账号是否存在 
    const _SELECT_USER = SQL._select(SQL_TABLE_NAME, { username, password })
    let data = await query(_SELECT_USER).then(res => {
        return res
    })
    //判断当前账号密码是否正确
    if (data.length === 0) {
        // 没有当前账户
        ctx.body = {
            code: 400,
            msg: "账户不存在！"
        }
    } else {
        //返回编码
        const MD5_DATA = username + "/" + Date.now()
        let MD5 = aesEncrypt(MD5_DATA)
        let LOGIN_TIME = GetCurrentDate()
        let UPDATE_SQL = SQL._update({ Id: data[0].Id }, { login_time: LOGIN_TIME, token: MD5 }, SQL_TABLE_NAME)
        let insert_data = await query(UPDATE_SQL).then(res => {
            return res
        })
        if (insert_data.changedRows == 1) {
            ctx.cookies.set('LOGIN', MD5, { expires: new Date(getDay(7)) })
            ctx.body = {
                code: 200,
                msg: "登录成功",
                date: LOGIN_TIME,
                username: username
            };
        } else {
            ctx.body = {
                code: 400,
                msg: "error"
            };
        }

    }

})
router.get('/retrieve', function (ctx, next) {
    //输入注册时填入的账号密码
    //重新填写密码
    ctx.body = "找回密码";
})
module.exports = router