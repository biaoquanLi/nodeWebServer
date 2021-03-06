const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const { redisSet, redisGet } = require('./src/db/redis')
const { access } = require('./src/utils/log')

//用于处理postData
const getPostData = (req) => {
    return promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''

        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
}

const serverHandle = (req, res) => {
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']}--${Date.now()}`)

    res.setHeader('Content-type', 'application/json')
    req.path = req.url.split("?")[0]
    req.query = querystring.parse(req.url.split("?")[1])
    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split('&').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1].trim()
        req.cookie[key] = value
    })
    //解析session(使用redis)
    let needSetCookie = false
    let userId = req.cookie.userId
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        redisSet(userId, {})
    }
    req.sessionId = userId
    redisGet(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            redisSet(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }
        getPostData(req).then(postData => {
        req.body = postData
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        //如果没命中路由
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 Not Found\n')
        res.end()
    })
    })
}

module.exports = serverHandle