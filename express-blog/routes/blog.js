var express = require('express');
var router = express.Router();
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', function (req, res, next) {
    let {
        author = '', keyword = ''
    } = req.query
    if (req.query.isadmin) {
        if (req.session.username == null) {
            res.json(new ErrorModel('未登录'))
            return
        }
        author = req.session.username
    }
    const listResult = getList(author, keyword)
    return listResult.then(data => {
        res.json(new SuccessModel(data))
    })
});

router.get('/detail', (req, res, next) => {
    const id = req.query.id
    const detailData = getDetail(id)
    if (detailData) {
        return detailData.then(data => {
            if (data) {
                res.json(
                    new SuccessModel(data)
                )
            } else {
                res.json(
                    new ErrorModel('未找到该篇博客')
                )
            }
        })
    }
})

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const body = req.body
    const newBlogData = newBlog(body)
    if (newBlogData) {
        return newBlogData.then(data => {
            if (data.id) {
                res.json(new SuccessModel(data))
            } else {
                res.json(
                    new ErrorModel(data)
                )
            }
        })
    }
})

router.post('/update', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const body = req.body
    const id = req.query.id
    const updateData = updateBlog(id, body)
    if (updateData) {
        return updateData.then(data => {
            if (data) {
                res.json(
                    new SuccessModel('更新数据成功')
                )
            } else {
                res.json(new ErrorModel('更新数据失败'))
            }
        })
    }
})

router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username
    const delData = delBlog(req.query.id, author)
    if (delData) {
        return delData.then(data => {
            if (data) {
                res.json(
                    new SuccessModel('删除成功')
                )
            } else {
                res.json(
                    new ErrorModel('删除失败')
                )
            }
        })
    }
})
module.exports = router;