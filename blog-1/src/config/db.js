const env = process.env.NODE_ENV

let SQL_CONF
let REDIS_CONF
if (env === 'dev') {
    SQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
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
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

module.exports = {
    SQL_CONF,
    REDIS_CONF
}