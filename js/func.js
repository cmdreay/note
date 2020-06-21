const fs = require('fs');
const path = require('path');
/**
 *  检查文件夹是否存在,不存在则创建
 * @param {string} dirname - 文件夹名称
 */
function makeDir(dirname) {
    if(fs.existsSync(dirname)) {
        return true;
    } else {
        if(makeDir(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}