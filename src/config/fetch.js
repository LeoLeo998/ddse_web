import axios from 'axios'
import config from './index'
import { getCookie } from '../common/cookie'
import qs from 'qs'

const userToken = getCookie('userToken')
// 创建axios实例
const service = axios.create({
  baseURL: config.BASE_URL, // api的base_url
  timeout: 5000, // 请求超时时间,
  headers:{
    'Content-Type':"application/x-www-form-urlencoded",
    'authorization':"Bearer "+ userToken
  }
})
const base64 = [
  "email",
  "passowrd",
  "code",
]
// request拦截器
service.interceptors.request.use(config => {
  let data = ''
  if(config.data) {
    data = JSON.parse(JSON.stringify(config.data));
  }
  // for(let item in data) {
  //   if(base64.indexOf(item) > -1) {
  //     data[item] = btoa(data[item])
  //   }
  // }
  // config.data = data;
  if(data) {
    data.data = qs.stringify(data.data)
  }
  config.data = data;
  return config;
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if(response.status == 200) {
      return response.data
    }else {
      return 'err'
    }
  },
  error => {
    console.log()// for debug
    return Promise.reject(error)
  })

export default service