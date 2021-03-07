const { exec } = require('../db/mysql')
const login = (username, password) => {
    let sql = `select * from users where username='${username}' and password='${password}'`
    return exec(sql).then(res => {
        if (res[0]) {
            return true
        } else {
            return false
        }
    })
}

module.exports = { login }