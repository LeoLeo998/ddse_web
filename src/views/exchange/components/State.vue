<template>
    <div >
        <div class="ex-state-page" v-if="!getIsMobile">
            <div class="search-box">
                <div class="search-content">
                    <i class="fa el-icon-search"></i>
                    <input type="text" v-model="searchVal">
                </div>
            </div>
            <div class="state-box">
                <div>
                    {{getSelectMarket}}
                </div>
                <div>
                    <span class="price" :class="getClass('sell_price_direction')">{{price}}</span> <br>
                    <span class="d-price">≈ {{price}} USD</span>
                </div>
                <div>
                    <span class="zd">涨跌幅</span> <br>
                    <span class="d-zd" :class="getClass('sell_price_direction')">{{range}}%</span>
                </div>
                <div>
                    <span class="zd">24H高</span> <br>
                    <span class="d-high">{{high}}</span>
                </div>
                <div>
                    <span class="zd">24H低</span> <br>
                    <span class="d-low">{{low}}</span>
                </div>
            </div>
        </div>
        <div class="ex-state-page" v-else>
            <div class="state-box">
                <!-- <div>
                    {{getSelectMarket}}
                </div> -->
                
                <div>
                    <span class="zd">24H高</span> <br>
                    <span class="d-high">{{high}}</span>
                </div>
                <div>
                    <span class="zd">24H低</span> <br>
                    <span class="d-low">{{low}}</span>
                </div>
                <div>
                    <span class="price">{{getSelectMarket}}</span> <br>
                    <span class="d-price">{{price}}</span>
                </div>
                <div>
                    <span class="zd">涨跌幅</span> <br>
                    <span class="d-zd" :class="getClass('sell_price_direction')">{{range}}%</span>
                </div>
            </div>
            <div class="search-box">
                <div class="search-content">
                    <i class="fa el-icon-search"></i>
                    <input type="text" v-model="searchVal">
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            searchVal:''
        }
    },
    computed:{
        ...mapGetters([
            "getSelectMarket",
            "getProductData"
        ]),
        calssState () {
            if(this.getProductData && this.getProductData[this.getSelectMarket]) {
                console.log(this.getProductData[this.getSelectMarket]['sell_price_direction'],'111')
                return `price-${this.getProductData[this.getSelectMarket]['sell_price_direction']}`
            }
            return ''
        },
        price () {
            return this.getProductData && this.getProductData[this.getSelectMarket] && this.getProductData[this.getSelectMarket]['sell_price']
        },
        range () {
            
            if(this.getProductData && this.getProductData[this.getSelectMarket]) {
                return this.getRange(this.getProductData[this.getSelectMarket])
            }
            return '--'
        },
        high () {
            if(this.getProductData && this.getProductData[this.getSelectMarket]) {
                return this.getProductData[this.getSelectMarket]['high']
            }
            return '--'
        },
        low () {
            if(this.getProductData && this.getProductData[this.getSelectMarket]) {
                return this.getProductData[this.getSelectMarket]['low']
            }
            return '--'
        }
    },
    methods:{
        getRange(item) {
            return (((item.buy_price - item.close) / item.close) * 100).toFixed(2)
        },
        getClass (type) {
            type = this.getProductData && this.getProductData[this.getSelectMarket] && this.getProductData[this.getSelectMarket][type]
            return type === 'up' ? 'price-up' : 'price-down'
        },
    },
    watch:{
        searchVal (v) {
            this.$emit('search-update',v)
        }
    }
}
</script>
<style lang="less" scoped>
.ex-state-page {
    width: 100%;
    height: 80px;
    border-radius: 8px;
    background-color: #fff;
    display: flex;
    align-items: center;
    
    .search-box {
        padding:0 17px;
        width: 535px;
        .search-content {
            width: 100%;
            height: 40px;
            background-color: #f7f8fa;
            position: relative;
            border-radius: 6px;
        }
        i {
            position: absolute;
            left:10px;
            top:13px;
            color:#9ca0aa;
        }
        input {
            width: 100%;
            height: 100%;
            border:none;
            outline: none;
            background: transparent;
            padding-left:40px;
            color:var(--font-body-);
            font-size: 16px;
        }
    }
    .state-box {
        width: calc(~"100% - 535px");
        display: flex;
        align-items: center;
        //padding-left:40px;
        color:#171d2d;
        padding-left:20px;
        div {
            margin-right:90px;
            .d-price {
                font-size: 11px;
                color: #6d6d6d;
            }
            .zd {
                font-size: 14px;
                color: #bababa;
            }
            .d-zd {
                font-size: 11px;
                color: #29be8f;
            }
            .d-high {
                font-size: 11px;
                color: #6d6d6d;
            }
            .d-low {
                font-size: 11px;
                color: #6d6d6d;
            }
        }
    }
}
@media (max-width:768px) {
    .ex-state-page {
        height: 160px;
        flex-wrap: wrap;
        .search-box {
            width: 100%;
        }
        .state-box {
            width: 100%;
            div {
                margin-right:10px;
                flex:1;
                .price {
                    font-size: 14px;
                }
            }
        }
    }
}

</style>