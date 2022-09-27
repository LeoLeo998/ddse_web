<template>
  <div class="ex-index-page default-bg">
    <!-- <el-container>
      <el-aside width="400px;overflow: hidden;">
        <market-box />
      </el-aside>
      <el-main>
        <trading-view />
      </el-main>
      <el-aside width="318px">
        <create-order />
      </el-aside>
    </el-container>
    
    <el-container>
      <el-main>
        <order-history />
      </el-main>
      
      <el-aside width="318px">
        <deal-history />
      </el-aside>
    </el-container> -->


    <!-- <el-container>
      <el-main>
        <el-container>
          <el-aside width="535px">
            111
          </el-aside>
          <el-main>
            <State />
          </el-main>
        </el-container>
        <el-container style="margin-top:8px">
          <el-aside width="535px">
            <market-box />
          </el-aside>
          <el-main>
            <trading-view />
          </el-main>
        </el-container>
        <el-container style="margin-top:8px">
          <el-main>
            <order-history />
          </el-main>
        </el-container>
      </el-main>
      
      <el-aside width="288px">
        <create-order />
        <DealHistory/>
      </el-aside>
      
    </el-container> -->


    <div class="main-left">
      <State @search-update="searchUpdate"/>
      <div class="row1">
        <div class="market-box">
          <market-box :searchVal="searchVal"/>
        </div>
        <trading-view />
      </div>
      <div class="row2">
        <create-order v-if="getIsMobile"/>
        <order-history />
      </div>
    </div>
    <div class="main-right">
      <create-order v-if="!getIsMobile" />
      <DealHistory/>
    </div>

  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ExLeft from './components/ExLeft.vue'
import ExRight from './components/ExRight.vue'
import OrderHistory from './components/OrderHistory.vue'
import TradingView from '@/components/TradingView.vue'
import OrderBook from './components/OrderBook.vue'
import MarketBox from './components/MarketBox.vue'
import CreateOrder from './components/CreateOrder.vue'
import DealHistory from './components/DealHistory.vue'
import State from './components/State.vue'
import Socket from '@/config/socket'
import config from '@/config/index'
import { getCookie } from '@/common/cookie'
export default {
  components: {
    ExLeft,
    ExRight,
    OrderHistory,
    TradingView,
    OrderBook,
    MarketBox,
    CreateOrder,
    DealHistory,
    State,
  },
  data() {
    return {
      coolingStatusVisible: true,
      searchVal:''
    }
  },
  created() {
    if (!this.$route.query.market) {
      this.$router.replace('/exchange?market=BTCUSDm')
    }
    this.setSelectMarket(this.$route.query.market)
    if (getCookie('userToken')) {
      const _socket2 = new Socket(config.TRAN_WSURL+getCookie('userToken'),this);
      this.setTRANSocket(_socket2);
    }
    
  },
  computed: {
    ...mapGetters(['getIsLight', 'getSelectMarket','getIsLogin','getIsMobile'])
  },
  methods: {
    ...mapMutations(['setMainCoinList', 'setSelectMarket','setTRANSocket']),
    searchUpdate (v) {
      this.searchVal = v
    }
  }
}
</script>
<style lang="less">














.el-aside {
  overflow: hidden;
}
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

.ex-index-page {
  color: #fff;
  padding:8px 20px;
  display: flex;
  padding:8px 20px;
  .main-left {
    width: calc(~"100% - 288px");
    margin-right:8px;
    .row1 {
      display: flex;
      margin-top:8px;
      border-radius: 8px;
      overflow: hidden;
      .market-box {
        min-width: 535px;
      }
    }
    .row2 {
      margin-top:8px;
      border-radius: 8px;
      overflow: hidden;
    }
  }
  .main-right {
    width: 288px;
  }


  .el-header {
    padding:0;
  }
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

@media (max-width:768px) {
  .ex-index-page {
    flex-wrap: wrap;
    .main-left,.main-right {
      width: 100%;
    }
    .row1 {
      flex-wrap: wrap;
      .market-box,.ex-market-box {
        width: 100%;
      }
      .market-box {
        margin-bottom:10px;
      }
    }
  }
}
</style>
