const env = process.env.NODE_ENV

let SQL_CONF
if (env === 'dev') {
    SQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '4513741',
        port: '3306',
        database: 'myblog'
    }
}

if (env === 'production') {
    SQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '4513741',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    SQL_CONF
}