const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    const { method, path } = req

    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body
        const result = loginCheck(username, password)
        if (result) {
            return new SuccessModel('登录成功')
        } else {
            return new ErrorModel('登录失败')
        }
    }
}
module.exports = handleUserRouter