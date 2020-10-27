const fs = require('fs')

const crypto = require('crypto');
const path = require('path');
const filename = path.join(__dirname,'../','app.js');
// 1.
function md5File(path, callback) {
    fs.readFile(path, function(err, data) {
        console.log(err)
      if (err) return;
      var md5Value= crypto.createHash('md5').update(data, 'binary').digest('hex');
      callback(md5Value);
    });
}
md5File(filename,(d)=>{
    console.log(filename,d)
})

// 2.
let readFileMd5 = (url) =>{
    return new Promise((reslove) => {
        let md5sum = crypto.createHash('md5');
        let stream = fs.createReadStream(url);
        stream.on('data', function(chunk) {
            md5sum.update(chunk);
        });
        stream.on('end', function() {
            let fileMd5 = md5sum.digest('hex');
            reslove(fileMd5);
        })
    })
}
