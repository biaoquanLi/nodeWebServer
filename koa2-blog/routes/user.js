const router = require('koa-router')()
const {
    login
} = require('../controller/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
    const {
        username,
        password
    } = ctx.request.body
    const loginData = await login(username, password)
    if (loginData && loginData.username) {
        //设置session
        ctx.session.username = loginData.username
        ctx.session.realname = loginData.realname
        ctx.body = new SuccessModel('登录成功')
    } else {
        ctx.body = new ErrorModel('登录失败')
    }
})

module.exports = router