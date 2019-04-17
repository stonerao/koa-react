
module.exports = {
    insert(data) {
        //插入时间和数据
        let date = Date.parse(new Date())
        let sql = `INSERT INTO store (date,data) VALUES (${date},${data});`
        return sql
    }
}