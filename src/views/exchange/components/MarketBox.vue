<template>
    <div class="ex-market-box">
        <div class="search-box">
            <i class="fa fa-search"></i>
            <input type="text">
        </div>
        <div class="coin-list">
            <!-- <i class="fa fa-star" :class="coinIndex == 0 && 'active'"></i> -->
            <span :class="coinIndex == 0 && 'active'" @click="coinIndex = 0">
                All
            </span>
            <span v-for="(item,key) in group" :key="key" :class="coinIndex == item.id && 'active'" @click="setMainCoin(item)">
                {{item.title}}
            </span>
        </div>
        <div class="tab-box">
            <ul>
                <li>
                    <div class="li-head">名称</div>
                    <div class="li-head">买入价格</div>
                    <div class="li-head">卖出价格</div>
                    <div class="li-head">涨幅</div>
                </li>
                <div class="market-list">
                    <li v-for="(item,key) in marketList" :key="key" @click="setCoin(item)">
                        <div class="li-item">
                            <!-- <i class="fa fa-star"></i> -->
                            <!-- <span class="left-coin">BTC<span class="right-coin">/USDT</span></span> -->
                            <span class="left-coin">{{item.symbol}}</span>
                            <br />
                            <span class="left-description">{{item.description}}</span>
                        </div>
                        <div class="li-item price-up">
                            {{item.buy_price}}
                        </div>
                        <div class="li-item price-down">
                            {{item.sell_price}}
                        </div>
                        <div class="li-item" :class="getRange(item) > 0 ? 'price-up' : 'price-down'">{{getRange(item)}}%</div>
                    </li>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    data () {
        return {
            coinIndex:0,
            selectMarket:'',
            group:[],
            dataList:[]
        }
    },
    computed:{
        ...mapGetters([
            "getQUOSocket",
            "getSelectMarket"
        ]),
        marketList () {
            let data = []
            data = this.dataList.filter(v => {
                return v.group === this.coinIndex
            })
            return data
        }
    },
    methods:{
        ...mapMutations([
            "setSelectMarket"
        ]),
        ...mapActions([
            "productListFetch",
            "productGroupListFetch",
            "marketListFetch"
        ]),
        getRange (item) {
            return ((item.buy_price - item.close) / item.close * 100).toFixed(2)
        },
        async getData () {
            let res = await Promise.all([this.productGroupListFetch(),this.productListFetch()])
            console.log(res[0].rows)
            if(res[0] && res[0].rows.length > 0) {
                this.group = res[0].rows
            }
            if(res[1] && res[1].rows.length > 0) {
                this.dataList = res[1].rows
            }
        },
        sendMsg (coin) {
            this.getQUOSocket.send({"quoteAsset":coin})
        },
        setCoin (item) {
            this.setSelectMarket(item.symbol)
            this.initMarketListData()
            // this.$router.replace('/exchange?market='+item.symbol)
            
        },
        setMainCoin (item) {
            this.coinIndex = item.id;
        },
        async initMarketListData () {
            console.log('aaaaannnnn')
            let res = await this.marketListFetch({
                symbol:this.getSelectMarket,
                time:'5',
                startDate:parseInt(new Date().getTime() / 1000) - 21600,
                endDate:parseInt(new Date().getTime() / 1000)
            })
            console.log(res)
        }
        
    },
    created () {
        this.getData();
        this.initMarketListData()
    }
}
</script>
<style lang="less" scoped>
@color1:rgb(119, 119, 119);
@color2:rgb(132, 142, 156);
@color3:rgb(234, 236, 239);
@bg1: rgb(51, 51, 51);
.ex-market-box {
    background-color: #fff;
    min-width: 300px;
    border:1px solid #e1e1e1;
    height: 484px;
    .search-box {
        position: relative;
        height: 24px;
        background-color: @bg1;
        border-radius: 3px;
        margin:8px;
        i {
            position: absolute;
            left:8px;
            top:5px;
            color:@color1;
        }
        input {
            width: 100%;
            background-color: transparent;
            outline: none;
            border:none;
            height: 24px;
            padding: 4px 15px 4px 30px;
            color:#fff;
        }
    }
    .coin-list {
        display: flex;
        align-items: center;
        height: 26px;
        margin:8px;
        p,div,span {
            color:var(--font-color2-);
        }
        i {
            transform: translateY(1px);
        }
        i,span{
            color: @color2;
            cursor: pointer;
            font-size: 12px;
            margin-right:10px;
        }
        span {
            position: relative;
            &:hover {
                .coin-select-box {
                    display: block;
                }
            }
            i {
                transform: translateY(-2px);
            }
            .coin-select-box {
                position: absolute;
                display: none;
                border-radius: 4px;
                box-shadow: 0px 0px 5px #ccc;
                width: 310px;
                flex-wrap: wrap;
                padding:0px 16px 16px;
                background-color: #FFFFFF;
                align-items: center;
                z-index: 1;
                top:15px;
                .item {
                    display: inline-block;
                    margin: 0;
                    min-width: 0;
                    cursor: pointer;
                    flex: none;
                    
                    text-align: center;
                    width: 24%;
                    font-size: 14px;
                    line-height: 20px;
                    margin-top: 0;
                    margin-top: 16px;
                    color:#111;
                }
            }            
        }
    }
    .tab-box {
        width: 100%;
        margin-top: 8px;
        ul {
            width: 100%;
            
            li {
                display: flex;
                list-style: none;
                height: 50px;
                align-items: center;
                span {
                    width: 100%;
                    display: inline-block;
                    overflow: hidden;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                }
                &:hover {
                    background-color: var(--hover-color-);
                }
            }
            .market-list {
                height: 358px;
                overflow: auto;
                &::-webkit-scrollbar {
                    width: 3px;
                    height: 1px;
                    border-radius: 10px;
                }
                &::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                    background: @color1;
                }
                &::-webkit-scrollbar-track {
                    box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
                    border-radius:10px;
                    // background: rgb(22, 26, 30);
                    background-color: transparent;
                }
            }
        }
        .li-head {
            color:@color2;
            font-size: 12px;
            height: 20px;
            &:first-child {
                padding-left:8px;
            }
            &:last-child {
                padding-right:8px;
            }
        }
        .li-item {
            font-size: 12px;
            overflow:hidden;
            i {
                color:@color2;
            }
            .left-coin {
                color:@color3;
                font-size: 12px;
            }
            .left-description {
                color:@color2;
                font-size: 12px;
                //margin-top:10px;
            }
            .right-coin {
                color:@color2;
                font-size: 12px;
            }
            &:first-child {
                padding-left:8px;
            }
            &:last-child {
                padding-right:8px;
            }
        }
        .li-head,.li-item {
            width: 33.3%;
            text-align: right;
            &:first-child {
                text-align: left;
            }
        }
    }
}
</style>