// 封装小程序请求的方法

// 开放四个必要参数，路径，data参数，请求头，请求方式
function request(url, data = {}, header = {}, method = "GET") {
    const baseUrl = "https://www.zhengzhicheng.cn/"
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
//1.0 能够实现 request().then()/request.catch()  成功时的回调函数/失败时的回调函数
export default request;