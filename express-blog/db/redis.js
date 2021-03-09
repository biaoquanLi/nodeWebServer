const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
    console.log(err)
})

function redisSet(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
}
function redisGet(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            if (res === null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(res)
                )
            } catch (error) {
                resolve(res)
            }
            resolve(res)
        })
    })

}

module.exports = {
    redisSet,
    redisGet
}
