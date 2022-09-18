<template>
    <div class="create-order">
        <!-- <div class="ex-type-box">
            <button>
                全仓
            </button>
            <button>
                20X
            </button>
        </div> -->
        <div class="order-type-box">
            <div class="item" :class="orderType === 0 && 'active'" @click="orderType = 0">限价</div>
            <div class="item" :class="orderType === 1 && 'active'" @click="orderType = 1">市价</div>
        </div>
        <!-- <div class="available-balance">
            <span class="txt">
                可用
            </span>
            <span class="balance">
                -USDT
            </span>
        </div> -->
        <div class="form-box" v-if="orderType === 0">
            <div class="row">
                <label for="">交易品种</label>
                <strong>{{getSelectMarket}}</strong>
            </div>
            <div class="row">
                <label for="">交易手数</label>
                <el-input
                    type="number"
                    placeholder="数量"
                    v-model="form.volume"
                    clearable>
                </el-input>
            </div>
            <div class="row flex">
                <div class="left">
                    <label for="">止盈</label>
                    <el-input
                        type="number"
                        placeholder="止盈价格"
                        v-model="form.tp"
                        clearable>
                    </el-input>
                </div>
                <div class="right">
                    <label for="">止损</label>
                    <el-input
                        type="number"
                        placeholder="止损价格"
                        v-model="form.sl"
                        clearable>
                    </el-input>
                </div>
            </div>
            <div class="row">
                <label for="">限价类型</label>
                <br>
                <el-select v-model="form.cmd">
                    <el-option
                      v-for="item in orderPtions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </div>
            <div class="row">
                <label for="">价格</label>
                <el-input
                    type="number"
                    placeholder="价格"
                    v-model="form.price"
                    clearable>
                </el-input>
            </div>
            <div class="row" v-if="!getIsLogin">
                <el-button class="primarily-btn" type="success" @click="$router.push('/register')">立即注册</el-button>
                <el-button class="secondary-btn" @click="$router.push('/login')">登录</el-button>
            </div>
            <div class="row" v-else>
                <el-button class="primarily-btn buy-btn" type="success" @click="submitClick">下单</el-button>
            </div>
        </div>
        <div class="form-box" v-else>
            <div class="row">
                <label for="">交易品种</label>
                <strong>{{getSelectMarket}}</strong>
            </div>
            <div class="row flex">
                <div>
                    <label for="">买入价格</label>
                    <span class="price-up">3851.48</span>
                </div>
                <div>
                    <label for="">卖出价格</label>
                    
                    <span class="price-down">3852.88</span>
                </div>
            </div>
            <div class="row">
                <label for="">交易手数</label>
                <el-input
                    type="number"
                    placeholder="数量"
                    v-model="form.volume"
                    clearable>
                </el-input>
            </div>
            <div class="row">
                <label for="">止盈</label>
                <el-input
                    type="number"
                    placeholder="止盈价格"
                    v-model="form.tp"
                    clearable>
                </el-input>
            </div>
            <div class="row">
                <label for="">止损</label>
                <el-input
                    type="number"
                    placeholder="止损价格"
                    v-model="form.sl"
                    clearable>
                </el-input>
            </div>
            <div class="row" v-if="!getIsLogin">
                <el-button class="primarily-btn" type="success" @click="$router.push('/register')">立即注册</el-button>
                <el-button class="secondary-btn" @click="$router.push('/login')">登录</el-button>
            </div>
            <div class="row" v-else>
                <el-button class="primarily-btn buy-btn" type="success" @click="submitClick(0)">市价买入</el-button>
                <el-button class="primarily-btn sell-btn" type="success" @click="submitClick(1)">市价卖出</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import FormatInput from '@/components/FormatInput'
import { mapActions, mapGetters } from 'vuex';
export default {
    components:{
        FormatInput,
    },
    data () {
        return {
            orderType:0,
            per:0,
            remindBuy:'',
            remindSell:'',
            buyData:{
                price:0,
                amount:0,
            },
            sellData:{
                price:0,
                amount:0
            },
            form:{
                symbol:'BTCUSDm',
                cmd:"2",
                price:0,
                volume:0,
                sl:0,
                tp:0,
            },
            selectType:'2',
            orderPtions:[{
                value: '2',
                label: '低价挂单买入'
            }, {
                value: '3',
                label: '高价挂单卖出'
            }, {
                value: '4',
                label: '高价挂单买入'
            }, {
                value: '5',
                label: '低价挂单卖出'
            }]
        };
    },
    created () {
        
        
    },
    computed:{
        ...mapGetters([
            "getSelectMarket",
            "getIsLogin",
        ]),
        market () {
            return this.$route.query.market.replace('_','/');
        },
        symbol1 () {
            return this.market.split('/')[0]
        },
        symbol2 () {
            return this.market.split('/')[1]
        }
    },
    methods:{
        ...mapActions([
            "openPositionFetch",
            "openEntrustFetch"
        ]),
        changeBuyPrice (v) {
            this.buyData.price = v;
        },
        changeBuyAmount (v) {
            this.buyData.amount = v;
        },
        changeSellPrice (v) {
            this.sellData.price = v;
        },
        changeSellAmount (v) {
            this.sellData.amount = v;
        },
        async submitClick (type = null) {
            this.form.symbol = this.getSelectMarket
            let fun = this.orderType === 0 ? 'openEntrustFetch' : 'openPositionFetch'
            let data = {
                ...this.form
            }
            if(this.orderType === 1) {
                data.cmd = type
            }
            let res = await this[fun](data)
            if(res.status == 200) {
                this.$toast({
                    type:'success',
                    tips:'下单成功',
                    why:'111'
                });
            }else {
                this.$toast({
                    type:'error',
                    tips:res.msg,
                    why:'hahah'
                });
            }
        }
    }
}
</script>
<style lang="less" scoped>
.create-order {
    width: 100%;
    min-width: 300px;
    border:1px solid rgb(70, 70, 70);
    border-left:none;
    border-right:none;
    background-color: #fff;
    padding:15px;
    height: 484px;
    div,p,span,label{
        color:var(--font-color1-);
        font-size: 14px;
    }
    
    /deep/ input::-webkit-outer-spin-button,
    /deep/ input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
    }
    /deep/ input[type='number'] {
        -moz-appearance: textfield;
    }
    .ex-type-box {
        display: flex;
        justify-content: space-between;
        button {
            width: 50%;
            border:none;
            background-color: #349e87;
            color:#fff;
            font-size: 12px;
            padding:2px 0;
            margin-right:20px;
            border-radius:3px;
            cursor: pointer;
            &:last-child{
                margin:0;
            }
        }
    }
    .order-type-box {
        display: flex;
        //margin-top:18px;
        color:var(--font-color1-);
        
        .item {
            flex:1;
            margin-right:10px;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
            padding-bottom:4px;
            &.active {
                border-bottom:2px solid #03A66D;
            }
        }
    }
    .available-balance {
        margin-top:18px;
        .balance {
            color:var(--font-color2-);
        }
    }
    .form-box {
        margin-top:16px;
        .row {
            margin-bottom:10px;
            &.flex{
                display: flex;
                div {
                    flex:1;
                }
            }
            .el-select {
                width: 100%;
            }
            button {
                width: 100%;
                
                //height: 40px;
                //border-radius: 4px;
                span {
                    color: #fff;
                }
            }
            .primarily-btn {
                background-color: #03A66D;
            }
            .secondary-btn {
                margin-top:10px;
                span {
                    color:var(--font-color1-);
                }
            }
            .buy-btn {
                margin-top:20px;
            }
            .sell-btn {
                background-color: var(--color-red-);
                border:none;
                margin-left:0;
                margin-top:20px;
            }
            .left,.right {
                flex:1;
            }
            .left{
                margin-right:10px;
            }
        }
    }
}
</style>