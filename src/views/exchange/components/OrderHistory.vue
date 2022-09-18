<template>
    <div class="order-history">
        <div class="menu">
            <div class="left">
                <div class="item active">
                    持仓列表
                </div>
                <div class="item">
                    挂单列表
                </div>
                <div class="item">
                    历史记录
                </div>
            </div>
            <div class="right">
                <input type="checkbox" name="" id="">
                <span>隐藏其他交易对</span>
            </div>
        </div>
        <div class="tab">
            <table>
                <tr>
                    <th>订单号</th>
                    <th>产品</th>
                    <th>方向</th>
                    <th>成交量</th>
                    <th>开仓价格</th>
                    <th>止损价格</th>
                    <th>止盈价格</th>
                    <th>最新价格</th>
                    <th>盈亏</th>
                </tr>
                <tr v-for="(item,key) in list" :key="key" @click="orderClick(item)">
                    <td>{{item.TICKET}}</td>
                    <td>{{item.SYMBOL}}</td>
                    <td>{{item.CMD | orderType}}</td>
                    <td>{{item.VOLUME}}</td>
                    <td>{{item.OPEN_PRICE}}</td>
                    <td>{{item.SL}}</td>
                    <td>{{item.TP}}</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
            </table>
        </div>
        <!-- <OrderPositionAlert
            v-if="showAlert">
        </OrderPositionAlert> -->
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import OrderPositionAlert from '@/components/alert/OrderPositionAlert.vue'
export default {
    data () {
        return {
            list:[],
            showAlert:true
        }
    },
    components:{
        OrderPositionAlert
    },
    created () {
        this.initData()
    },
    methods:{
        ...mapActions([
            "positionListFetch"
        ]),
        async initData () {
            let res = await this.positionListFetch()
            if(res.rows && res.rows.length > 0) {
                
                this.list = res.rows
                console.log('aaa',this.list)
            }
        },
        orderClick (data) {
            console.log('hhh')
            this.showAlert = true
        }
    },
    filters:{
        orderType (v) {
            if(v === 0) {
                return '买入'
            }
            return '卖出'
        }
    }
}
</script>
<style lang="less" scoped>
.order-history {
    padding:15px;
    border:1px solid rgb(70, 70, 70);
    border-top:none;
    background-color: #fff;
    height: 395px;
    .menu {
        display: flex;
        justify-content: space-between;
        margin-bottom:15px;
        .left {
            display: flex;
            .item {
                color: rgb(132, 142, 156);
                cursor: pointer;
                margin-right:25px;
            }
        }
    }
    .tab {
        min-height: 200px;
        table {
            border-collapse:collapse;
            width: 100%;
            color:var(--font-color1-);
            tr {
                height:40px;
                &:hover {
                    background-color: var(--hover-color2-);
                }
                &:nth-child(even){
                    //background-color: var(--hover-color-);
                }
            }
            th {
                color: rgb(132, 142, 156);
                background-color: var(--hover-color-);
            }
            th,td {
                width: 11.111%;
                text-align: left;
                &:first-child {
                    padding-left:16px;
                }
            }
        }
    }
}
</style>