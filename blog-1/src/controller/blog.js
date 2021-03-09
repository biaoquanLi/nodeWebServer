const { exec } = require('../db/mysql')
const xss = require('xss')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
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
    const createtime = new Date().getTime()
    const {content,author } = newBlog
    let title = xss(newBlog.title)
    let sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createtime},'${author}');`
    return exec(sql).then(res => {
        return {
            id: res.insertId
        }
    })
}
const updateBlog = (id,updateBlog = {}) => {
    const {content, author } = updateBlog
    let title = xss(updateBlog.title)
    let sql = `update blogs set title='${title}',content='${content}' where id=${id} and author='${author}'`
    return exec(sql).then(res => {
        if (res.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}
const delBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}'`
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
