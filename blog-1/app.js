const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

//用于处理postData
const getPostData = (req) => {
    return promise = new Promise((resolve,reject)=>{
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        
        req.on('data',chunk => {
            console.log('分段接受的post请求数据',chunk)
            postData += chunk.toString()
        })
        req.on('end',() => {
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    req.path = req.url.split("?")[0]
    req.query = querystring.parse(req.url.split("?")[1])

    getPostData(req).then(postData=>{
        req.body = postData
        const blogData = handleBlogRouter(req,res)
        if(blogData){
            res.end(
                JSON.stringify(blogData)
            )
            return
        }
        const userData = handleUserRouter(req,res)
        if(userData) {
            res.end(
                JSON.stringify(userData)
            )
            return
        }
    
        //如果没命中路由
        res.writeHead(404,{'Content-type':'text/plain'})
        res.write('404 Not Found\n')
        res.end()
    })
   
}

module.exports = serverHandle