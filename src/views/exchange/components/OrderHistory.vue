<template>
  <div class="order-history hlist">
    <div class="menu">
      <div class="left">
        <div class="item" :class="activeName == 1 && 'active'" @click="activeName = 1">
          持仓列表 <span v-if="getIsLogin">[{{list1.length}}]</span>
        </div>
        <div class="item" :class="activeName == 2 && 'active'" @click="activeName = 2">
          挂单列表 <span v-if="getIsLogin">[{{list2.length}}]</span>
        </div>
        <div class="item" :class="activeName == 3 && 'active'" @click="activeName = 3">
          历史记录 <span v-if="getIsLogin">[{{list3.length}}]</span>
        </div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="tab-box" v-if="!getIsMobile">
      <div class="tab-head">
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
        </table>
      </div>
      <div class="tab" v-if="getIsLogin">
        <table>
          <tr v-for="(item, key) in list" :key="key" @click="orderClick(item)">
            <td>{{ item.TICKET }}</td>
            <td>{{ item.SYMBOL }}</td>
            <td :class="item.CMD == 0 ? 'green-color' : 'red-color'">{{ item.CMD | orderType }}</td>
            <td class="green-color">{{ item.VOLUME }}</td>
            <td>{{ item.OPEN_PRICE }}</td>
            <td>{{ item.SL }}</td>
            <td>{{ item.TP }}</td>
            <td :class="formatClass(item)">{{formatPrice(item)}}</td>
            <td :class="formatProfit(item) == '--' ? '' : formatProfit(item) > 0 ? 'price-up' : 'price-down'">{{formatProfit(item)}}</td>
          </tr>
        </table>
      </div>
      <div class="tab" v-else>
        <div class="tip">
          <div>
            <router-link to="/register">注册</router-link>
            或
            <router-link to="/login">登录</router-link>
            后查看
          </div>
        </div>
      </div>
    </div>
    <div class="tab-box" v-else>
      <div class="mobile-table">
        <MobileOrder :type="activeName" :list="list" @set-click="orderClick"/>
      </div>
    </div>
    <PositionOrderDialog :visible.sync="PositionOrderDialogVisible" :oderInfo="oderInfo" @positionListFetch="getPositionList" />
    <EntrustOrderDialog :visible.sync="EntrustOrderDialogVisible" :oderInfo="oderInfo" @entrustListFetch="getEntrustList" />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import PositionOrderDialog from '@/components/PositionOrderDialog'
import EntrustOrderDialog from '@/components/EntrustOrderDialog'
import MobileOrder from './MobileOrder.vue'
import bus from '@/util/bus'
export default {
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      showAlert: true,
      PositionOrderDialogVisible: false,
      EntrustOrderDialogVisible: false,
      oderInfo: {},
      activeName: 1
    }
  },
  components: {
    PositionOrderDialog,
    EntrustOrderDialog,
    MobileOrder
  },
  watch: {
    getIsLogin () {
      this.getPositionList()
    },
    list1 (v) {
      this.setPositionList(v)
    }
  },
  mounted () {
    bus.$on('updateOrder',(data) => {
      if(data.type === 'add') {
        this[`list${data.order}`].unshift(data.data)
      }
      if(data.type === 'remove') {
        this[`list${data.order}`] = this[`list${data.order}`].filter(v => {
          return v.TICKET != data.data.TICKET
        })
      }
      if(data.type === 'update') {
        this[`list${data.order}`] = this[`list${data.order}`].map(v => {
          return v.TICKET === data.data.TICKET ? data.data : v
        })
      }
    })
  },
  created() {
    this.getPositionList();
    this.getEntrustList();
    this.getCloseOrderList();
  },
  computed:{
    ...mapGetters(['getIsLogin','getProductData']),
    list () {
      return this[`list${this.activeName}`]
    }
  },
  methods: {
    ...mapActions(['positionListFetch', 'entrustListFetch', 'getCloseOrderListFetch']),
    ...mapMutations(["setPositionList"]),
    // 持仓
    async getPositionList() {
      let res = await this.positionListFetch()
      this.list1 = res.rows
      this.setPositionList(res.rows)
    },
    // 挂单
    async getEntrustList() {
      let res = await this.entrustListFetch()
      this.list2 = res.rows
    },
    //平仓
    async getCloseOrderList() {
      let res = await this.getCloseOrderListFetch()
      this.list3 = res.rows
    },
    formatClass (data){
      let currencyData = this.getProductData[data.SYMBOL]
      if(currencyData && currencyData.buy_price_direction && currencyData.sell_price_direction) {
        if(data.CMD == '0'){
          return `price-${currencyData.buy_price_direction}`
        }else {
          return `price-${currencyData.sell_price_direction}`
        }
      }
      return ''
    },
    formatPrice (data) {
      let currencyData = this.getProductData[data.SYMBOL]
      if(!currencyData) {
        return '--'
      }
      if(data.CMD == '0'){
        return this.mathFloor(currencyData.buy_price,currencyData.digits)
      }else {
        return this.mathFloor(currencyData.sell_price,currencyData.digits)
      }
    },
    formatProfit (data) {
      let currencyData = this.getProductData[data.SYMBOL]
      if(!currencyData) {
        return '--'
      }
      let rate,profit;
      if(currencyData.currency != currencyData.margin_currency) {
        rate = currencyData.buy_price;
      }else{
        rate = 1;
      }
      if(data.CMD == '0' && currencyData.profit_mode=='1' ){
        profit = (currencyData.buy_price - data.OPEN_PRICE) * data.VOLUME  * currencyData.contract_size * rate;
      }else if(data.CMD == '1' && currencyData.profit_mode=='1' ){
        profit = (data.OPEN_PRICE - currencyData.sell_price )  *data.VOLUME * currencyData.contract_size * rate
      }else if(data.CMD == '0' && currencyData.profit_mode=='0' && currencyData.currency=='USD' && currencyData.margin_currency=='USD' ){
        profit = (currencyData.buy_price - data.OPEN_PRICE)  *data.VOLUME  * currencyData.contract_size / currencyData.buy_price
      }else if(data.CMD == '1' && currencyData.profit_mode=='0' && currencyData.currency=='USD' && currencyData.margin_currency=='USD' ){
        profit = (data.OPEN_PRICE - currencyData.sell_price )  *data.VOLUME  * currencyData.contract_size / currencyData.sell_price
      }else if(data.CMD == '0' && currencyData.profit_mode=='0' && currencyData.currency!='USD' && currencyData.margin_currency=='USD' ){
        profit = (currencyData.buy_price - data.OPEN_PRICE)  *data.VOLUME * currencyData.contract_size 
      }else if(data.CMD == '1' && currencyData.profit_mode=='0' && currencyData.currency!='USD' && currencyData.margin_currency=='USD' ){
        profit = (data.OPEN_PRICE - currencyData.sell_price )  *data.VOLUME * currencyData.contract_size
      }
      if(profit) {
        return profit.toFixed(2)
      }
      return '--'
    },
    orderClick(data) {
      console.log(data)
      this.oderInfo = data
      if (this.activeName === 1) {
        this.PositionOrderDialogVisible = true
      } else if (this.activeName === 2) {
        this.EntrustOrderDialogVisible = true
      }
    }
  },
  filters: {
    orderType(v) {
      if (v === 0 || v === 3 || v === 5) {
        return '买入'
      }
      return '卖出'
    }
  }
}
</script>
<style lang="less" scoped>
.order-history {
  border-top: none;
  background-color: #fff;
  
  height: 395px;
  &.hlist {
    background-color: var(--hover-color-);
    border-bottom:1px solid #e1e1e1;
  }
  .tab-box {
    background-color: #fff;
  }
  .menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height:40px;
    .left {
      display: flex;
      .item {
        color: rgb(132, 142, 156);
        cursor: pointer;
        height: 100%;
        padding:10px 20px;
        font-size: 14px;
        span {
          font-size: 14px;
        }
        &.active {
          background: #fff;
          font-weight: 400;
        }
      }
    }
  }
  .tab-head {
    width: 100%;
    table {
      border-collapse: collapse;
      width: 100%;
      
      th {
        color: var(--font-body-);
        background-color: #fff;
        height:40px;
        width: 11.111%;
        text-align: left;
        font-weight: 400;
        font-size: 14px;
        &:first-child {
          padding-left: 16px;
        }
      }
    }
  }
  .tab {
    height: 314px;
    overflow-y: auto;
    .tip {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color:var(--font-body-);
      a {
        color:var(--color-green-);
      }
    }
    .red-color{
      color:var(--color-red-);
    }
    .green-color{
      color:var(--color-green-);
    }
    &::-webkit-scrollbar {
      width: 2px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      color: var(--font-body-);
      tr {
        height: 40px;
        &:hover {
          background-color: var(--hover-color2-);
        }
        &:nth-child(even) {
          //background-color: var(--hover-color-);
        }
      }
      th {
        color: rgb(132, 142, 156);
        background-color: var(--hover-color-);
      }
      th,
      td {
        width: 11.111%;
        text-align: left;
        font-size: 12px;
        &:first-child {
          padding-left: 16px;
        }
      }
    }
  }
}

@media (max-width:768px) {
  .order-history {
    background-color: #fff;
    height:54vh;
    .menu {
      height:60px;
      .item {
        padding:20px;
      }
    }
    .tab-box {
      background: transparent;
      .mobile-table {
        background: #fff;
        height:50vh;
        overflow: auto;
      }
    }
  }
}
</style>
