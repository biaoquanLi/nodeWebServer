const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

//读文件内容
// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.log('err', err)
//         return
//     }
//     //data返回是二进制
//     // console.log('data', data)
//     console.log('data', data.toString())
// })
//写入文件
// const content = '这是新写入的内容'
// const opt = {
//     flag: 'w' //追加写入,覆盖用'w'
// }

// fs.writeFile(fileName, content, opt, (err) => {
//     if (err) {
//         console.log('err', err)
//     }
// })

//判断文件是否存在
const isExist = fs.existsSync(fileName)
console.log(isExist)