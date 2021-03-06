const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')

const handleBlogRouter = (req, res) => {
    const { method, path, url } = req

    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ""
        const listResult = getList(author, keyword)
        if (listResult) {
            return listResult.then(res => {
                return new SuccessModel(res)
            })
        }
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        const id = req.query.id
        const detailData = getDetail(id)
        return new SuccessModel(detailData)
    }
    if (method === 'POST' && path === '/api/blog/new') {
        const body = req.body
        const newBlogData = newBlog(body)
        return new SuccessModel(newBlogData)
    }
    if (method === 'POST' && path === '/api/blog/update') {
        const body = req.body
        const result = updateBlog(body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新数据失败')
        }
    }
    if (method === 'POST' && path === '/api/blog/delete') {
        const result = delBlog(req.query.id)
        if (result) {
            return new SuccessModel('删除成功')
        } else {
            return new ErrorModel('删除失败')
        }
    }
}
module.exports = handleBlogRouter