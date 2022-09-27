<template>
    <div class="mobile-o-page">
        <div class="mobile-order-page" v-for="(item,index) in list" :key="index">
            <div class="order-head">
                <span>{{item.SYMBOL}}</span>
                <div class="menu-box" v-if="type !==3">
                    <button class="xg" @click="setClick(item)">
                        修改
                    </button>
                    <button class="pc" @click="setClick(item)" v-if="type === 1">
                        平仓
                    </button>
                </div>
            </div>
            <div class="order-content-box">
                <div class="item">
                    <p class="price">{{item.OPEN_PRICE}}</p>
                    <p class="txt">开仓价格</p>
                </div>
                <div class="item">
                    <p class="price">{{item.SL}}</p>
                    <p class="txt">止损价格</p>
                </div>
                <div class="item">
                    <p class="price">{{item.TP}}</p>
                    <p class="txt">止盈价格</p>
                </div>
                <div class="item">
                    <p class="price">{{formatPrice(item)}}</p>
                    <p class="txt">最新价格</p>
                </div>
            </div>
            <div class="other-box">
                <div class="item volume">成交量 <span>{{item.VOLUME}}</span></div>
                <div class="item">订单号 {{item.TICKET}}</div>
                <div class="item">盈亏 {{formatProfit(item)}}</div>
                <div class="item sell" v-if="type === 1" @click="setClick(item)">卖出</div>
            </div>
        </div>
        <div class="tab" v-if="!getIsLogin">
            <div>
                <router-link to="/register">注册</router-link>
                或
                <router-link to="/login">登录</router-link>
                后查看
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            dataList:[]
        }
    },
    props:{
        list:{
            type:Array,
            default:() => []
        },
        type:{
            type:Number,
            default:() => 1
        }
    },
    computed:{
        ...mapGetters([
            "getProductData"
        ])
    },
    methods:{
        setClick (data) {
            this.$emit('set-click',data)
        },
        formatPrice (data) {
            let currencyData = this.getProductData[data.SYMBOL]
            if(!currencyData) {
                return '--'
            }
            if(data.CMD == '0'){
                return this.mathFloor(currencyData.buy_price,currencyData.digits)
            }else {
                return this.mathFloor(currencyData.sell_price,currencyData.digits)
            }
        },
        formatProfit (data) {
            let currencyData = this.getProductData[data.SYMBOL]
            if(!currencyData) {
                return '--'
            }
            let rate,profit;
            if(currencyData.currency != currencyData.margin_currency) {
                rate = currencyData.buy_price;
            }else{
                rate = 1;
            }
            if(data.CMD == '0' && currencyData.profit_mode=='1' ){
                profit = (currencyData.buy_price - data.OPEN_PRICE) * data.VOLUME  * currencyData.contract_size * rate;
            }else if(data.CMD == '1' && currencyData.profit_mode=='1' ){
                profit = (data.OPEN_PRICE - currencyData.sell_price )  *data.VOLUME * currencyData.contract_size * rate
            }else if(data.CMD == '0' && currencyData.profit_mode=='0' && currencyData.currency=='USD' && currencyData.margin_currency=='USD' ){
                profit = (currencyData.buy_price - data.OPEN_PRICE)  *data.VOLUME  * currencyData.contract_size / currencyData.buy_price
            }else if(data.CMD == '1' && currencyData.profit_mode=='0' && currencyData.currency=='USD' && currencyData.margin_currency=='USD' ){
                profit = (data.OPEN_PRICE - currencyData.sell_price )  *data.VOLUME  * currencyData.contract_size / currencyData.sell_price
            }else if(data.CMD == '0' && currencyData.profit_mode=='0' && currencyData.currency!='USD' && currencyData.margin_currency=='USD' ){
                profit = (currencyData.buy_price - data.OPEN_PRICE)  *data.VOLUME * currencyData.contract_size 
            }else if(data.CMD == '1' && currencyData.profit_mode=='0' && currencyData.currency!='USD' && currencyData.margin_currency=='USD' ){
                profit = (data.OPEN_PRICE - currencyData.sell_price )  *data.VOLUME * currencyData.contract_size
            }
            if(profit) {
                return profit.toFixed(2)
            }
            return '--'
        },
    }
}
</script>
<style lang="less" scoped>
.mobile-order-page {
    width: 100%;
    padding:16px;
    margin-bottom:20px;
    background-color: #fff;
    .order-head {
        display: flex;
        justify-content: space-between;
        span {
            color:rgb(35, 154, 249)
        }
        .menu-box {
            button {
                width: 55PX;
                height: 28PX;
                font-size: 14px;
                outline: none;
                border:none;
            }
            .xg {
                border:1px solid rgb(232, 232, 232);
                color:rgb(8,174,122);
            }
            .pc {
                background: rgb(8,174,122);
                color:#fff;
            }
        }
    }
    .order-content-box {
        display: flex;
        justify-content: space-around;
        margin-top:28px;
        .item {
            width:25%;
            .price {
                color:rgb(61, 62, 68);
                font-size: 14PX;
            }
            .txt {
                font-size: 12PX;
                color:rgb(151, 155, 166);
            }
        }
    }
    .other-box {
        display: flex;
        justify-content: space-around;
        margin-top:28px;
        color:#111;
        
        .item {
            width:25%;
            font-size: 14PX;
            color:rgb( 112,115,123);
            &.volume {
                span {
                    color:rgb(8,174,122);
                    font-size: 14PX;
                }
            }
            &.sell {
                color:rgb(240, 63, 56);
                text-align: right;
            }
        }
    }
}
@media (max-width:768px) {
    .mobile-order-page {
        margin-bottom:20px 10px;
        border-radius:8px;
    }
    .mobile-o-page {
        width:100%;
        height: 100%;
    }
    .tab {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color:var(--font-body-);
        a {
            color:var(--color-green-);
        }
    }
}
</style>