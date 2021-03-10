const express = require('./like-express')

const app = express()

app.use((req, res, next) => {
    console.log('请求开始。。。', req.method, req.url)
    next()
})

app.use((req, res, next) => {
    req.cookie = {
        userId: 'abc123'
    }
    console.log(req.cookie)
    next()
})

app.use((req, res, next) => {
    //假设处理 post data
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next()
    }, 3000)
})

app.use('/api', (req, res, next) => {
    console.log('处理/api路由')
    next()
})

app.get('/api', (req, res, next) => {
    console.log('get /api 路由')
    next()
})

// app.post('/api', (req, res, next) => {
//     console.log('post /api 路由')
//     next()
// })

app.get('/api/get-cookie', (req, res, next) => {
    console.log('get /api/get-cookie')
    res.json({
        code: 0,
        data: req.cookie
    })
})

// app.post('/api/post-data', (req, res, next) => {
//     console.log('post /api/post-cookie')
//     res.json({
//         code: 0,
//         data: req.body
//     })
// })

app.listen(3001, () => {
    console.log('server is running on port 3001')
})