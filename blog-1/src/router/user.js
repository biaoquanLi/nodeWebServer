const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { redisSet } = require('../db/redis')

//获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}
const handleUserRouter = (req, res) => {
    const { method, path } = req

    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body
        const loginData = login(username, password)
        if (loginData) {
            return loginData.then(data => {
                if (data&&data.username) {
                    //设置session
                    req.session.username = data.username
                    req.session.realname = data.realname
                    redisSet(req.sessionId,req.session)
                    //登录成功后设置cookie
                    res.setHeader('Set-Cookie', `userId=${req.sessionId};path=/;httpOnly;expires=${getCookieExpires()}`)
                    return new SuccessModel('登录成功')
                } else {
                    return new ErrorModel('登录失败')
                }
            })
        }
    }

    // if (method === 'GET' && path === '/api/user/login-test') {
    //     const { username, password } = req.query
    //     const loginData = login(username, password)
    //     if (loginData) {
    //         return loginData.then(data => {
    //             if (data) {
    //                 //登录成功后设置cookie
    //                 res.setHeader('Set-Cookie', `username=${username};path=/;httpOnly;expires=${getCookieExpires()}`)
    //                 return new SuccessModel('登录成功')
    //             } else {
    //                 return new ErrorModel('登录失败')
    //             }
    //         })
    //     }
    // }
}
module.exports = handleUserRouter