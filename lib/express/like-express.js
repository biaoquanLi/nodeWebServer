const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
    constructor() {
        this.routes = { // 存放中间件的列表
            all: [], //app.use(...)
            get: [], // app.get(...)
            post: [] //app.post(...)
        }
    }
    register(path) {
        const info = {}
        console.log('path', path)
        if (typeof path === 'string') {
            info.path = path
            // 从第二个参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 1)
        } else {
            info.path = '/'
            info.stack = slice.call(arguments, 0)
        }
        return info
    }
    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }
    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }
    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }
    match(method, url) {
        let stack = []
        if (url === '/favicon.ico') {
            console.log('图标')
            return stack
        }

        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])

        curRoutes.forEach(routeInfo => {
            if (url.indexOf(routeInfo.path) === 0) {
                stack = stack.concat(routeInfo.stack)
            }
        })
        return stack
    }
    handle(req, res, stack) {
        const next = () => {
            const middleware = stack.shift()
            if (middleware) {
                middleware(req, res, next)
            }
        }
        next()
    }
    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url
            const method = req.method.toLowerCase()
            const resultList = this.match(method, url)
            console.log('resultList', resultList)
            this.handle(req, res, resultList)
        }
    }
    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = () => new LikeExpress()