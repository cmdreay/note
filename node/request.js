/** wx.request promise封装 */
const request = ({url, method, data, header, dataType, responseType}) => {
    const _url = config.initURL + url; // 配置域名 + url
    const token = wx.getStorageSync('token');
    return new Promise((resolve, reject) => {
        wx.request({
            url: _url,
            method,
            data,
            dataType,
            responseType,
            header: {
                'content-type': 'application/json',
                token,
                ...header
            },
            success: function(res) {
                if(res.successResponse) { // 成功的判断条件
                    reject(res.data)
                }
                resolve(res.data)
            },
            fail: function(err) {
                reject(err)
            }
        })
    });
}
/** wx中promise没有finally方法 */
Promise.prototype.finally = function (callback) {
    var Promise = this.constructor;
    return this.then(
      function (value) {
        Promise.resolve(callback()).then(
          function () {
            return value;
          }
        );
      },
      function (reason) {
        Promise.resolve(callback()).then(
          function () {
            throw reason;
          }
        );
      }
    );
}
