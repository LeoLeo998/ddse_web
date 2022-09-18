<template>
    <div class="ex-state-page">
        <div class="first-item">
            <!-- BTC/USDT -->
            {{getSelectMarket && getSelectMarket.symbol}}
        </div>
        <div class="item">
            <p class="price price-down">{{getSelectMarket && getSelectMarket.price}}</p>
            <p class="price-d">
                <!-- $61809.23 -->
                {{getSelectMarket && getSelectMarket.price}}
            </p>
        </div>
        <div class="item">
            <p class="txt2">24H涨跌</p>
            <p class="txt1 price-up">{{getSelectMarket && getSelectMarket.priceChangePercentValue}} {{getSelectMarket && (getSelectMarket.priceChangePercent * 100).toFixed(2)}}%</p>
        </div>
        <div class="item">
            <p class="txt2">24h最高价</p>
            <p class="txt1">{{getSelectMarket && getSelectMarket.high}}</p>
        </div>
        <div class="item">
            <p class="txt2">24h最低价</p>
            <p class="txt1">{{getSelectMarket && getSelectMarket.low}}</p>
        </div>
        <div class="item">
            <p class="txt2">24h成交量(BTC)</p>
            <p class="txt1">{{getSelectMarket && getSelectMarket.volume}}</p>
        </div>
        <div class="item">
            <p class="txt2">24h成交额(USDT)</p>
            <p class="txt1">--</p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters([
            "getSelectMarket"
        ])
    }
}
</script>
<style lang="less" scoped>
.ex-state-page {
    width: 100%;
    display: flex;
    align-items: center;
    color:#fff;
    padding:10px 15px;
    border:1px solid rgb(70, 70, 70);
    border-left: none;
    .first-item {
        font-size: 20px;
        font-weight: 500;
        border-right: 1px solid rgb(114, 114, 114);
        padding-right:24px;
    }
    .item {
        padding: 0 15px;
        // display: flex;

        align-items: center;
        .price {
            font-size: 16px;
        }
        .price-d {
            font-size: 12px;
        }
        .txt1 {
            font-size: 12px;
        }
        .txt2 {
            font-size: 12px;
            color: rgb(132, 142, 156);
        }
    }
}
</style>