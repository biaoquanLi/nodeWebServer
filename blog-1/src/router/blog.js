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

        if (detailData) {
            return detailData.then(res => {
                console.log('detailData', res)
                if (res) {
                    return new SuccessModel(res)
                } else {
                    return new ErrorModel('未找到该篇博客')
                }
            })
        }
    }
    if (method === 'POST' && path === '/api/blog/new') {
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
        const body = req.body
        const updateData = updateBlog(body)
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
    if (method === 'POST' && path === '/api/blog/delete') {
        const delData = delBlog(req.query.id)
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