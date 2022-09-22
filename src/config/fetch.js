import axios from 'axios'
import config from './index'
import { getCookie } from '../common/cookie'
import {encryption,decryption} from '@/util/aes.js'
import qs from 'qs'

const userToken = getCookie('userToken')
const key = "WMqg4XECmU4NHvK7"
// 创建axios实例
const service = axios.create({
  baseURL: config.BASE_URL, // api的base_url
  timeout: 5000, // 请求超时时间,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})
const base64 = ['password','re_password']
// request拦截器
service.interceptors.request.use(
  config => {
    let data = ''
    if (config.data) {
      data = JSON.parse(JSON.stringify(config.data))
    }
    base64.forEach(item => {
      if(data && data[item]) {
        data[item] = encryption(data[item],key)
      }
    })
    if(!config.headers.authorization) {
      config.headers.authorization = ''
      config.headers.authorization = 'Bearer ' + getCookie('userToken')
    }
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
