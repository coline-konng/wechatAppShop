/* 统一存储请求方法 */
//导入request请求的方法
import request from "@/utils/request.js"
// request 请求数据
/* 创建一个方法请求商品搜索列表的数据，以达到调用的时候，不需要再传入url地址
   大概的思路：调用request.get()方法，填入url地址，声明一个形参，接收请求所需传递的参数
    export const getSearch=function(obj){
        return request.get("goods/search",obj);
} */
/* 简化：箭头函数 */
export const getSearch = (obj) => request.get("goods/search", obj);