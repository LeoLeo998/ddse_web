<template>
    <div class="trading-view">
        <div class="trading-box">
            <!-- tradingView -->
            <div id="tradingview_wit">

            </div>
        </div>
        <!-- <create-order /> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import CreateOrder from './CreateOrder.vue'
export default {
    data () {
        return {
            el:null
        }
    },
    components:{
        CreateOrder
    },
    computed:{
        ...mapGetters([
            "getIsLight",
            "getSelectMarket",
        ])
    },
    mounted () {
        this.init()
    },
    methods:{
        init () {
            this.el = null;
            let market;
            if(this.getSelectMarket) {
                market = this.getSelectMarket.replace('/','')
            }else {
                market = 'BTCUSDT'
            }
            let state = this.getIsLight ? 'light' : 'dark';
            this.el = new TradingView.widget({
                "width": "100%",
                "height": "100%",
                "autosize": true,
                "symbol": "BINANCE:"+market,
                "interval": "D",
                "timezone": "Asia/Shanghai",
                "theme": state,
                "style": "1",
                "locale": "zh_CN",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "studies": 
                [
                    {
                        id: "MASimple@tv-basicstudies",
                        inputs: {
                            length: 5
                        }
                    },
                    {
                        id: "MASimple@tv-basicstudies",
                        inputs: {
                            length: 10
                        }
                    },
                    {
                        id: "MASimple@tv-basicstudies",
                        inputs: {
                            length: 20
                        }
                    },
                    {
                        id: "Volume@tv-basicstudies"
                    }
                ],
                "container_id": "tradingview_wit"
            });
        }
    },
    watch:{
        getIsLight () {
            this.init();
        },
        getSelectMarket () {
            this.init();
        }
    }
}
</script>
<style lang="less" scoped>
.trading-view {
     height: 484px;
    // border-left:1px solid rgb(70, 70, 70);
    .trading-box {
        //height: calc(~"100% - 330px");
        height: 100%;
    }
}
</style>