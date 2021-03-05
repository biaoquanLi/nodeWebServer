const {SuccessModel,ErrorModel} = require('../model/resModel')
const {getList,getDetail,newBlog} = require('../controller/blog')

const handleBlogRouter = (req, res)=>{
    const {method,path,url} = req

    if(method === 'GET' && path === '/api/blog/list'){
        const author= req.query.author||''
        const keyword = req.query.keyword||""
        const listData = getList(author,keyword)
        return new SuccessModel(listData)
    }
    if(method === 'GET' && path === '/api/blog/detail'){
        const id = req.query.id
        const detailData = getDetail(id)
        return new SuccessModel(detailData)
    }
    if(method === 'POST' && path === '/api/blog/new'){
        const body = req.body
        const newBlogData = newBlog(body)
        return new SuccessModel(newBlogData)
    }
    if(method === 'POST' && path === '/api/blog/update'){
        return {
            msg: '这是更新博客接口'
        }
    }
    if(method === 'POST' && path === '/api/blog/delete'){
        return {
            msg: '这是删除博客接口'
        }
    }
}
module.exports = handleBlogRouter