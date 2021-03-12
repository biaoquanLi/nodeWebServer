const router = require('koa-router')()
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
router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    let {
        author = '', keyword = ''
    } = ctx.query
    if (ctx.query.isadmin) {
        if (ctx.session.username == null) {
            ctx.body = new ErrorModel('未登录')
            return
        }
        author = ctx.session.username
    }
    const listResult = await getList(author, keyword)
    ctx.body = new SuccessModel(listResult)
})

router.get('/detail', async (ctx, next) => {
    const id = ctx.query.id
    const detailData = await getDetail(id)
    if (detailData) {
        ctx.body = new SuccessModel(detailData)
    } else {
        ctx.body = new ErrorModel('未找到该篇博客')
    }
})

router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body
    body.author = ctx.session.username
    const newBlogData = await newBlog(body)
    ctx.body = new SuccessModel(newBlogData)
})

router.post('/update', loginCheck, async (ctx, next) => {
    ctx.request.body.author = ctx.session.username
    const updateData = await updateBlog(ctx.query.id, ctx.request.body)
    if (updateData) {
        ctx.body = new SuccessModel('更新数据成功')
    } else {
        ctx.body = new ErrorModel('更新数据失败')
    }
})

router.post('/del', loginCheck, async (ctx, next) => {
    const author = ctx.session.username
    const delData = await delBlog(ctx.query.id, author)
    if (delData) {
        ctx.body = new SuccessModel('删除成功')
    } else {
        ctx.body = new ErrorModel('删除失败')
    }
})

module.exports = router