const getList = (author,keyword) => {
    return [
        {
            id:1,
            title:'标题1',
            content:'内容A',
            createTime:32438942,
            author: 'zhangsan'
        },
        {
            id:2,
            title:'标题2',
            content:'内容B',
            createTime:32434352,
            author: 'lisi'
        }
    ]
}
const getDetail = (id)=>{
    return {
        id:1,
            title:'标题1',
            content:'内容A',
            createTime:32438942,
            author: 'zhangsan'
    }
}

const newBlog = (newBlog = {})=>{
    return {
        id:3
    }
}
module.exports = {
    getList,
    getDetail,
    newBlog
}
