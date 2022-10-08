import axios from "axios";


const myAxios = axios.create({
    baseURL: 'http://localhost:8001/api/',
});
// 开启Axios请求携带Cookie

myAxios.interceptors.request.use(function (config) {
    // 获取浏览器中存储的token
    let token = sessionStorage.getItem('token');
    myAxios.defaults.withCredentials = true;
    // 如果token存在，添加Authorization请求头
    if (token) {
        config.headers['Authorization'] = token;
    }
    console.log(token);
    console.log("我要发请求了。。。", config)
    return config;
}, function (error) {
    // Do something with request error
    console.log("请求失败了。。。")
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("我收到你的响应啦。。。",response)
    if (response.data.code !== 20000) {
        sessionStorage.removeItem('token');
    }
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("响应失败了。。。")
    return Promise.reject(error);
});

export default myAxios;