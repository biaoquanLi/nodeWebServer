const mysql = require('mysql')
const { SQL_CONF } = require('../config/db')
//创建连接对象
const con = mysql.createConnection(SQL_CONF)

//创建连接
con.connect()
//执行sql语句
function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        })
    })
}

module.exports = {
    exec,
    escape:mysql.escape
}