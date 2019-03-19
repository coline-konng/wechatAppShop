// 封装小程序请求的方法

// 开放四个必要参数，路径，data参数，请求头，请求方式
//1.0 能够实现 request().then()/request.catch()  成功时的回调函数/失败时的回调函数
function request(url, data = {}, header = {}, method = "GET") {
    const baseUrl = "https://www.zhengzhicheng.cn/api/public/v1/"
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url,
            data,
            header,
            method,
            success: (res) => {
                resolve(res)
            },
            fail: () => {
                reject()
            }
        })
    })
}
//2.0 request.get().then()/request.post().then() 
request.get = function(url, data) {
    return request(url, data, {}, "GET");
}
request.post = function(url, data) {
    return request(url, data, {}, "POST");
}
export default request;