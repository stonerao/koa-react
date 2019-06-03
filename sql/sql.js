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
    _update(data, setData, tname) {
        /* 
            data = 查询条件
            setData = 需要替换的值
        */
        if (!tname) {
            console.error("table name error")
            return false
        } else {
            let data_arr = []
            for (let key in setData) {
                data_arr.push(`${key}='${setData[key]}'`)
            }
            let sqlWhere = []
            for (let key in data) {
                sqlWhere.push(`${key}='${data[key]}'`)
            }
            const _sql = sqlWhere.join(" or ")
            return `UPDATE ${tname} SET ${data_arr.join(",")} WHERE ${_sql}`
        }
    },
    _select(tname, data) {
        if (!tname) {
            return false
        }
        let sqlWhere = []
        for (let key in data) {
            sqlWhere.push(`${key}='${data[key]}'`)
        }
        const _sql = sqlWhere.join(" and ")
        return `SELECT * from ${tname} WHERE BINARY ${_sql};`
    },
    _multi_query(data, tname, current, size) {
        let data_arr = [];
        for (let key in data) {
            data_arr.push(`${key} LIKE '%${data[key]}%'`)
        }
        const MULTIPLE = data_arr.join(" and ")
        return `SELECT * FROM personnel${data_arr.length > 0 ?' WHERE':''} ${MULTIPLE} order by id desc limit ${current},${size}`
    },
    _count(tname) {
        return `SELECT COUNT(Id) FROM ${tname} `
    },
    reg(data) {
        return this._insert(data, "member")
    },

}