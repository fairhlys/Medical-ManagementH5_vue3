import axios from "axios";
import { useUserStore } from "@/stores";
const baseURL = 'https://v3pz.itndedu.com/v3pz';
const userStore = useUserStore()
import { closeToast, showLoadingToast } from 'vant';


// 管理 loading 状态

const req = axios.create({
    baseURL,
    timeout: 10000,
    headers:{
        'terminal': 'h5',
    }
})
// 添加请求拦截器
req.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 显示 loading
    if (config.showLoading !== false) {
      showLoadingToast({
      message: '加载中...',
      forbidClick: true,
    });
    }

    const whiteUrl = ['/login']
    if (whiteUrl.includes(config.url)) {
      // 白名单接口：加 terminal，不需要 token
      // config.headers.terminal = 'h5'  // 或 'app'、'mini' 等，根据你的实际值
    } else {
      // 其他接口：需要加 x-token
      if (userStore.token) {
        config.headers['h-token'] = userStore.token

        // 或 config.headers.Authorization = `Bearer ${userStore.token}`
        // 看后端要求用哪种（x-token 或 Authorization）
      }
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    closeToast()
    return Promise.reject(error);
  });

// 添加响应拦截器
req.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    closeToast()
    
    const res = response.data
    if (res.code === 10000) {

      return res  // 成功直接返回 data

    }
    if (res.code === -2) {
      const userStore = useUserStore()
      userStore.clearUserInfo()
      userStore.removeToken()
      router.push('/login')
      return Promise.reject(res)
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    closeToast()
    
    if (error.response?.status === 401) {
      const userStore = useUserStore()
      userStore.clearUserInfo()
      userStore.removeToken()
      router.push('/login')
    }
    return Promise.reject(error);
  });
export default req
export { baseURL }