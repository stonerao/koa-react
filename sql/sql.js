module.exports = {
    insert(data) {
        //插入时间和数据
        let date = Date.parse(new Date())
        let sql = `INSERT INTO store (date,data) VALUES (${date},${data});`
        return sql
    },
    _insert(data, tname) {
        if (!tname) {
            console.error("table name error")
            return false
        } else {
            let keys = Object.keys(data)
            let values = Object.values(data).map(val => (`'${val}'`))
            return `INSERT INTO ${tname} (${keys.toString()}) VALUES (${values.toString()})`
        }
    },
    reg(data) {
        return this._insert(data, "member")
    }
}