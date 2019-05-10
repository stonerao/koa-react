const router = require('koa-router')()
const query = require("../sql/index")
const SQL_EVENT = require("../sql/sql")
const { returnMsg, haveUndefined } = require('../utils/msg')
const { aesEncrypt } = require("../utils/md5")
const { getDay } = require("../utils/base")
const { LOGIN_COOKIE_TYPE } = require("../utils/cookie")
const user_key = 'dog'
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
router.post("/login", async (ctx, next) => {
    /**
    * @user 登录账户
    * @password 密码 
    */
    let data = ctx.request.body;
    const { user, password } = data;
    function send(msg) {
        ctx.body = {
            ...returnMsg(msg, 400)
        }
    }
    //检测是否空
    if (haveUndefined(data)) {
        send('请填写完整信息')
        return
    }
    //查询user sql 语句
    const get_user = SQL_EVENT.getMemberUser(user)
    let user_data = await query(get_user)
    if (user_data.length === 1) {
        let only_data = user_data[0]
        if (only_data.user === user && only_data.password == password) {
            //账号密码正确
            let token = aesEncrypt(Date.now + user, user_key)
            let MD5KEY = SQL_EVENT.updateUserMd5(token, only_data.Id)
            let update = await query(MD5KEY)
            if (update.affectedRows == 1) {
                //设置cookie
                ctx.cookies.set(LOGIN_COOKIE_TYPE, token, { expires: new Date(getDay(7)) })
                ctx.body = {
                    code: 200,
                    msg: "正确"
                }
            } else {
                send('发生未知错误')
            }
        } else {
            send('密码错误')
        }

    }
})
router.post("/registered", async (ctx, next) => {
    /**
     * @user 登录账户
     * @password 密码
     * @passwor_sub 确认密码
     * @username 姓名
     */
    function send(msg) {
        ctx.body = {
            ...returnMsg(msg, 400)
        }
    }
    let data = ctx.request.body;
    const { user, password, password_sub, username } = data;
    //检测是否空
    if (haveUndefined(data)) {
        send('请填写完整信息')
        return
    }
    //密码是否相同
    if (password !== password_sub) {
        send('请输入正确密码')
        return
    }
    //查询user sql 语句
    const get_user = SQL_EVENT.getMemberUser(data.user)
    // 查询该用户是否存在
    let user_data = await query(get_user)
    if (user_data.length === 0) {
        //判断两次密码是否相等
        const insert_user = SQL_EVENT.insert_member({
            user, password, username
        })
        let insert_end = await query(insert_user)
        ctx.body = {
            ...returnMsg("注册成功", 200)
        }
    } else {
        ctx.body = {
            ...returnMsg("该用户已存在", 400)
        }
    }

})
router.post("/getMsg",async (ctx,nex)=>{
    await query("") 
})
module.exports = router
