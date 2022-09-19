<template>
  <div class="ex-index-page default-bg" :class="getIsLight ? 'light-css' : 'night-css'">
    <!-- <div class="content-box">
            <div class="top">
                <ex-left />
                <ex-right />
            </div>
            <order-history />
        </div> -->
    <el-row>
      <el-col :span="4">
        <market-box />
      </el-col>
      <el-col :span="16">
        <trading-view />
      </el-col>
      <el-col :span="4">
        <create-order />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <order-history />
      </el-col>
      <el-col :span="4">
        <!-- <create-order /> -->
        <deal-history />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ExLeft from './components/ExLeft.vue'
import ExRight from './components/ExRight.vue'
import OrderHistory from './components/OrderHistory.vue'
import TradingView from '@/components/TradingView.vue'
// import tradingView from './components/tradingView.vue'
import OrderBook from './components/OrderBook.vue'
import MarketBox from './components/MarketBox.vue'
import CreateOrder from './components/CreateOrder.vue'
import DealHistory from './components/DealHistory.vue'
export default {
  components: {
    ExLeft,
    ExRight,
    OrderHistory,
    TradingView,
    OrderBook,
    MarketBox,
    CreateOrder,
    DealHistory
  },
  data() {
    return {
      coolingStatusVisible: true
    }
  },
  created() {
    if (!this.$route.query.market) {
      this.$router.replace('/exchange?market=BTCUSDm')
    }
    this.setSelectMarket(this.$route.query.market)
  },
  computed: {
    ...mapGetters(['getIsLight', 'getSelectMarket'])
  },
  methods: {
    ...mapMutations(['setMainCoinList', 'setSelectMarket'])
  }
}
</script>
<style lang="less">
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

@exBg: rgb(22, 26, 30);
.ex-index-page {
  //padding:20px 0;
  color: #fff;
  // &.night-css {
  //     // background-color: red;
  // }
  &.light-css {
    @border-color: #e1e1e1;
    & .ex-left,
    .deal-history,
    .market-change,
    .ex-right,
    .ex-state-page,
    .trading-view,
    .create-order,
    .ex-order-book,
    .order-history {
      border-color: @border-color;
    }
    & .order-history {
      background-color: #fff;
      .menu .right span {
        color: rgb(30, 35, 41);
      }
    }
    & .ex-state-page {
      .item {
        .txt1 {
          color: #000;
        }
      }
    }
    & .ex-state-page .first-item,
    .price-d {
      color: #000;
    }
    & .ex-market-box .left-coin {
      color: rgb(30, 35, 41) !important;
    }
    & .market-change {
      .title span {
        color: rgb(30, 35, 41);
      }
      .market-box .item {
        .left-coin,
        .time,
        .txt {
          color: rgb(30, 35, 41);
        }
      }
    }
    & .ex-market-box .search-box {
      background-color: rgb(242, 243, 245);
      input {
        color: #000;
      }
    }
    & .market-list .li-item {
      color: rgb(30, 35, 41);
    }
    & .create-order {
      .order-type-menu button {
        background-color: #fff;
        color: #000;
      }
      .format-input {
        background-color: rgba(230, 232, 234, 0.6);
        .title-left,
        .title-right,
        input {
          color: rgb(132, 142, 156);
        }
      }
    }
    // border-color:#e1e1e1;
  }
  .content-box {
    width: 1520px;
    margin: 0 auto;
    .top {
      display: flex;
    }
  }
}
</style>
