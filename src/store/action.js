import service from '../config/fetch'
import { getCookie } from '../common/cookie'
export default {
  productListFetch: (ctx, data) => {
    return service({
      url: '/getProductList',
      method: 'post',
      data
    })
  },
  loginFetch: (ctx, data) => {
    return service({
      url: '/Login',
      method: 'post',
      data
    })
  },
  registerFetch: (ctx, data) => {
    return service({
      url: '/Register',
      headers: {
        authorization: getCookie('phoneToken')
      },
      method: 'post',
      data
    })
  },
  verifyCodeFetch: (ctx, data) => {
    return service({
      url: '/getVerifyCode',
      method: 'post',
      data
    })
  },
  productGroupListFetch: (ctx, data) => {
    return service({
      url: '/getProductGroupList',
      method: 'post',
      data
    })
  },
  marketListFetch: (ctx, data) => {
    return service({
      url: '/getPriceList',
      method: 'post',
      data
    })
  },
  positionListFetch: (ctx, data) => {
    return service({
      url: '/getPositionList',
      method: 'post',
      data
    })
  },
  //市价挂单
  openPositionFetch: (ctx, data) => {
    return service({
      url: '/openPosition',
      method: 'post',
      data
    })
  },
  //限价挂单
  openEntrustFetch: (ctx, data) => {
    return service({
      url: '/openEntrust',
      method: 'post',
      data
    })
  },
  //平仓
  closePositionFetch: (ctx, data) => {
    return service({
      url: '/closePosition',
      method: 'post',
      data
    })
  },
  //修改持仓
  updatePositionFetch: (ctx, data) => {
    return service({
      url: '/updatePosition',
      method: 'post',
      data
    })
  },

  //挂单列表
  entrustListFetch: (ctx, data) => {
    return service({
      url: '/getEntrustList',
      method: 'post',
      data
    })
  },

  //删除挂单
  deleteEntrustFetch: (ctx, data) => {
    return service({
      url: '/deleteEntrust',
      method: 'post',
      data
    })
  },

  //修改挂单
  updateEntrustFetch: (ctx, data) => {
    return service({
      url: '/updateEntrust',
      method: 'post',
      data
    })
  },
  //获取平仓列表
  getCloseOrderListFetch: (ctx, data) => {
    return service({
      url: '/getCloseOrderList',
      method: 'post',
      data
    })
  },

  //获取用户信息
  getUserInfoFetch: (ctx, data) => {
    return service({
      url: '/getUserInfo',
      method: 'post',
      data
    })
  },
  //获取用户实时资金
  getUserBalanceFetch: (ctx, data) => {
    return service({
      url: '/getUserBalance',
      method: 'post',
      data
    })
  },
  //退出登录
  LogOutFetch: (ctx, data) => {
    return service({
      url: '/LogOut',
      method: 'post',
      data
    })
  },
  //获取自选列表
  productUserListFetch: (ctx, data) => {
    return service({
      url: '/getProductUserList',
      method: 'post',
      data
    })
  },
  //添加自选
  insertProductUserFetch: (ctx, data) => {
    return service({
      url: '/insertProductUser',
      method: 'post',
      data
    })
  },
  //删除自选
  deleteProductUserFetch: (ctx, data) => {
    return service({
      url: '/deleteProductUser',
      method: 'post',
      data
    })
  }
}
