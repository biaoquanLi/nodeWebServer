const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author=${author} `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`
    return exec(sql)
}
const getDetail = (id) => {
    let sql = `select * from blogs where id=${id}`
    return exec(sql).then(res => {
        return res[0]
    })
}

const newBlog = (newBlog = {}) => {
    const author = 'zhangsan'
    const createtime = new Date().getTime()
    const { title, content } = newBlog

    let sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createtime},'${author}');`
    return exec(sql).then(res => {
        return {
            id: res.insertId
        }
    })
}
const updateBlog = (updateBlog = {}) => {
    const author = 'zhangsan'
    const { id, title, content } = updateBlog
    let sql = `update blogs set title='${title}',content='${content}' where id=${id} and author='${author}'`
    return exec(sql).then(res => {
        console.log(res)
        if (res.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}
const delBlog = (id) => {
    let sql = `delete from blogs where id=${id}`
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
