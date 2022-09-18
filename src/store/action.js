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
  phoneCodeFetch: (ctx, data) => {
    return service({
      url: '/sendPhoneCode',
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
  }
}
