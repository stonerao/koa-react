var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '47.98.160.248',
    user: 'express',
    password: 'Raoyan19940529',
    database: 'express'
});
connection.connect(); 

module.exports = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results, fields) => {
            if (error) return reject(error)
            if (error) reject(error)
            else resolve(results)
        })
    })
}