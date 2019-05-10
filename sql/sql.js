const { GetCurrentDate } = require('../utils/msg')
module.exports = {
    insert_member(data) {
        //插入时间和数据
        try {
            let keys = Object.keys(data)
            let values = Object.values(data).map(x => {
                return `'${x}'`
            })
            let valuesStr = "";
            let sql = `INSERT INTO member (${keys.join(",")},create_date) VALUES (${values.join(",")},'${GetCurrentDate()}');`
            return sql
        } catch (err) {
            console.err(err)
            return err
        }
    },
    updateUserMd5(key, id) {
        return `UPDATE member SET token='${key}',login_date='${GetCurrentDate()}' WHERE Id='${id}';`
    },
    getMemberUser(user) {
        //查找该用户是否存在
        return `SELECT * FROM member where user='${user}'`
    }
}