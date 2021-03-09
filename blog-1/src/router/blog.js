const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')

// 统一的登录验证函数
const loginCheck = (req) => {
    if (!(req.session&&req.session.username)) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }

}


const handleBlogRouter = (req, res) => {
    const { method, path, url } = req

    if (method === 'GET' && path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ""

        if (req.query.isadmin) {
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                return loginCheckResult
            }
            author = req.session.username
        }
        const listResult = getList(author, keyword)
        return listResult.then(res => {
            return new SuccessModel(res)
        })
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        const id = req.query.id
        const detailData = getDetail(id)

        if (detailData) {
            return detailData.then(res => {
                if (res) {
                    return new SuccessModel(res)
                } else {
                    return new ErrorModel('未找到该篇博客')
                }
            })
        }
    }
    if (method === 'POST' && path === '/api/blog/new') {

        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) { // 未登录
            return loginCheckResult
        }
        req.body.author = req.session.username
        const body = req.body
        const newBlogData = newBlog(body)
        if (newBlogData) {
            return newBlogData.then(res => {
                if (res.id) {
                    return new SuccessModel(res)
                } else {
                    return new ErrorModel(res)
                }
            })
        }
    }
    if (method === 'POST' && path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) { // 未登录
            return loginCheckResult
        }
        req.body.author = req.session.username
        const body = req.body
        const id = req.query.id
        const updateData = updateBlog(id,body)
        if (updateData) {
            return updateData.then(res => {
                if (res) {
                    return new SuccessModel('更新数据成功')
                } else {
                    return new ErrorModel('更新数据失败')
                }
            })
        }
    }
    if (method === 'POST' && path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) { // 未登录
            return loginCheckResult
        }
        const author = req.session.username
        const delData = delBlog(req.query.id, author)
        if (delData) {
            return delData.then(res => {
                if (res) {
                    return new SuccessModel('删除成功')
                } else {
                    return new ErrorModel('删除失败')
                }
            })
        }
    }
}
module.exports = handleBlogRouter