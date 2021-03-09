var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')

router.get('/list', function (req, res, next) {
    let { author = '', keyword = '' } = req.query
    // let author = req.query.author || ''
    // const keyword = req.query.keyword || ""
    // if (req.query.isadmin) {
    //     const loginCheckResult = loginCheck(req)
    //     if (loginCheckResult) {
    //         return loginCheckResult
    //     }
    //     author = req.session.username
    // }
    const listResult = getList(author, keyword)
    return listResult.then(data => {
        res.json(new SuccessModel(data))
    })
});

router.get('/detail', (req, res, next) => {
    res.json({
        code: 0,
        data: '我是详情'
    })
})
module.exports = router;