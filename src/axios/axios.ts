import axios from 'axios'

//创建instance实例
const instance = axios.create({
    baseURL: 'http://hanma.natapp1.cc/jingdong',
    timeout: 10000
})
// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        //处理指定的请求头
        console.log("before request")
        config.headers.Accept = 'application/json, text/plain, text/html, */*'
        return config
    },
    error => {
        console.log('request error', error)
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(
    //设置响应正确时的处理函数
    response =>{
        console.log("after response")
        console.log(response)
        return response
    },
    error =>{
        console.log("after response error")
        console.log(error)
        return Promise.reject(error)
    }
)

export default instance;
