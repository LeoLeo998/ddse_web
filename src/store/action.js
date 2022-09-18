import service from '../config/fetch';
import { getCookie } from '../common/cookie';
export default {
    productListFetch: (ctx,data) => {
        return service({
            url:'/getProductList',
            method: 'post',
            data,
        })
    },
    loginFetch: (ctx,data) => {
        return service({
            url:'/Login',
            method: 'post',
            data,
        })
    },
    registerFetch: (ctx,data) => {
        return service({
            url:'/Register',
            headers: {
                'authorization': getCookie('phoneToken')
            },
            method: 'post',
            data,
        })
    },
    phoneCodeFetch:(ctx,data) => {
        return service({
            url:'/sendPhoneCode',
            method: 'post',
            data,
        })
    },
    productGroupListFetch:(ctx,data) => {
        return service({
            url:'/getProductGroupList',
            method: 'post',
            data,
        })
    },
    marketListFetch:(ctx,data) => {
        return service({
            url:'/getPriceList',
            method: 'post',
            data,
        })
    },
    positionListFetch:(ctx,data) => {
        return service({
            url:'/getPositionList',
            method: 'post',
            data,
        })
    },
    //市价挂单
    openPositionFetch:(ctx,data) => {
        return service({
            url:'/openPosition',
            method: 'post',
            data,
        })
    },
    //限价挂单
    openEntrustFetch:(ctx,data) => {
        return service({
            url:'/openEntrust',
            method: 'post',
            data,
        })
    },

}