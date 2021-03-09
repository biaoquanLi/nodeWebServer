const { exec,escape } = require('../db/mysql')
const {genPassword} = require('../utils/crypto')
const login = (username, password) => {
    password = genPassword(password)
    username = escape(username)
    password = escape(password)
    let sql = `select * from users where username=${username} and password=${password}`
    console.log('sql',sql)
    return exec(sql).then(res => {
        return res[0] || {}
    })
}

module.exports = { login }