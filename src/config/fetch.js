import axios from 'axios'
import config from './index'
import { getCookie } from '../common/cookie'
import qs from 'qs'

const userToken = getCookie('userToken')

// 创建axios实例
const service = axios.create({
  baseURL: config.BASE_URL, // api的base_url
  timeout: 5000, // 请求超时时间,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // authorization: 'Bearer ' + getCookie('userToken')
  }
})
const base64 = ['email', 'passowrd', 'code']
// request拦截器
service.interceptors.request.use(
  config => {
    let data = ''
    if (config.data) {
      data = JSON.parse(JSON.stringify(config.data))
    }
    if(!config.headers.authorization) {
      config.headers.authorization = ''
      config.headers.authorization = 'Bearer ' + getCookie('userToken')
    }
    
    
    // if(config.headers && config.headers.authorization) {

    // }
    // for(let item in data) {
    //   if(base64.indexOf(item) > -1) {
    //     data[item] = btoa(data[item])
    //   }
    // }
    // config.data = data;
    if (data) {
      data = qs.stringify(data)
    }
    config.data = data
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return response.data
    } else {
      return 'err'
    }
  },
  error => {
    console.log() // for debug
    return Promise.reject(error)
  }
)

export default service
