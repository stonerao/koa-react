var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sass'
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