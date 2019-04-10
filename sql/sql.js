module.exports = {
    insert(data){
        let date = Date.parse(new Date())
        let sql = `INSERT INTO store (date,data) VALUES (${date},${data});` 
        return sql
    }
}