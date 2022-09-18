<template>
    <div class="ex-right">
        <!-- <state /> -->
        <trading-view />
        <order-book />
    </div>
</template>
<script>
import State from './State.vue'
import OrderBook from './OrderBook.vue'
import tradingView from './tradingView.vue'
export default {
    components:{
        State,
        tradingView,
        OrderBook
    }
}
</script>
<style lang="less" scoped>
.ex-right {
    width: calc(~"100% - 320px");
    display: flex;
    // justify-content: b;
    flex-wrap: wrap;
}
</style>