<template>
    <div class="ex-left">
        <market-box />
        <deal-history />
        <!-- <market-change /> -->
    </div>
</template>
<script>
import MarketBox from './MarketBox.vue'
import DealHistory from './DealHistory.vue'
import MarketChange from './MarketChange.vue'
export default {
    components:{
        MarketBox,
        DealHistory,
        MarketChange
    }
}
</script>
<style lang="less" scoped>
.ex-left {
    width: 320px;
    color:#fff;
    border:1px solid rgb(70, 70, 70);
    // background-color: #fff;
}
</style>