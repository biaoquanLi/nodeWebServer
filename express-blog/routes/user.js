var express = require('express');
var router = express.Router();
const {
    login
} = require('../controller/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

router.post('/login', function (req, res, next) {
    const {
        username,
        password
    } = req.body
    const loginData = login(username, password)
    if (loginData) {
        return loginData.then(data => {
            if (data && data.username) {
                //设置session
                req.session.username = data.username
                req.session.realname = data.realname
                res.json(
                    new SuccessModel('登录成功')
                )
            } else {
                res.json(
                    new ErrorModel('登录失败')
                )
            }
        })
    }
});

// router.get('/login-test', (req, res, next) => {
//     if (req.session.username) {
//         res.json(
//             new SuccessModel('登录成功')
//         )
//     } else {
//         res.json(
//             new ErrorModel('登录失败')
//         )
//     }
// })

module.exports = router;