const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/crypto')
const login = async (username, password) => {
    password = genPassword(password)
    username = escape(username)
    password = escape(password)
    let sql = `select * from users where username=${username} and password=${password}`
    const res = await exec(sql)
    return res[0] || {}
}

module.exports = { login }