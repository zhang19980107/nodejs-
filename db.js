const dir = process.cwd();
let p = require('path');
let fs = require('fs');
let dbPath = p.join(dir, '.todo');

let db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: 'a+' }, (error, data) => {
                if (error) {
                    return reject(error)
                }
                let list;
                try {
                    list = JSON.parse(data.toString())
                } catch (error) {
                    list = [];
                }
                resolve(list)
            })
        })
    },
    write(list) {
        let string = JSON.stringify(list);
        // 写入文件
        return new Promise((resolve,reject) =>{
            fs.writeFile(dbPath, string, (error) => {
                if (error) return reject(error)
                resolve()
            })
        })
    }
}
module.exports = db