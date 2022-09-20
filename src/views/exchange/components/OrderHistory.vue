<template>
  <div class="order-history">
    <div class="menu">
      <div class="left">
        <div class="item" :class="activeName == 1 && 'active'" @click="activeName = 1">
          持仓列表
        </div>
        <div class="item" :class="activeName == 2 && 'active'" @click="activeName = 2">
          挂单列表
        </div>
        <div class="item" :class="activeName == 3 && 'active'" @click="activeName = 3">
          历史记录
        </div>
      </div>
      <div class="right">
        <!-- <input type="checkbox" name="" id="" />
        <span>隐藏其他交易对</span> -->
      </div>
    </div>
    <div class="tab">
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
        <tr v-for="(item, key) in list" :key="key" @click="orderClick(item)">
          <td>{{ item.TICKET }}</td>
          <td>{{ item.SYMBOL }}</td>
          <td>{{ item.CMD | orderType }}</td>
          <td>{{ item.VOLUME }}</td>
          <td>{{ item.OPEN_PRICE }}</td>
          <td>{{ item.SL }}</td>
          <td>{{ item.TP }}</td>
          <td>--</td>
          <td>--</td>
        </tr>
      </table>
    </div>
    <PositionOrderDialog :visible.sync="PositionOrderDialogVisible" :oderInfo="oderInfo" @positionListFetch="getPositionList" />
    <EntrustOrderDialog :visible.sync="EntrustOrderDialogVisible" :oderInfo="oderInfo" @entrustListFetch="getEntrustList" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import PositionOrderDialog from '@/components/PositionOrderDialog'
import EntrustOrderDialog from '@/components/EntrustOrderDialog'
export default {
  data() {
    return {
      list: [],
      showAlert: true,
      PositionOrderDialogVisible: false,
      EntrustOrderDialogVisible: false,
      oderInfo: {},
      activeName: 1
    }
  },
  components: {
    PositionOrderDialog,
    EntrustOrderDialog
  },
  watch: {
    activeName(val) {
      if (val === 1) {
        this.getPositionList()
      } else if (val === 2) {
        this.getEntrustList()
      } else {
        this.getCloseOrderList()
      }
    },
    getIsLogin () {
      this.getPositionList()
    },
  },
  created() {
    this.getPositionList()
  },
  computed:{
    ...mapGetters(['getIsLogin'])
  },
  methods: {
    ...mapActions(['positionListFetch', 'entrustListFetch', 'getCloseOrderListFetch']),
    // 持仓
    async getPositionList() {
      let res = await this.positionListFetch()
      this.list = res.rows
    },
    // 挂单
    async getEntrustList() {
      let res = await this.entrustListFetch()
      this.list = res.rows
    },
    //平仓
    async getCloseOrderList() {
      let res = await this.getCloseOrderListFetch()
      this.list = res.rows
    },

    orderClick(data) {
      this.oderInfo = data
      if (this.activeName === 1) {
        this.PositionOrderDialogVisible = true
      } else if (this.activeName === 2) {
        this.EntrustOrderDialogVisible = true
      }
      console.log(data)
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
  padding: 15px;
  border: 1px solid rgb(70, 70, 70);
  border-top: none;
  background-color: #fff;
  height: 395px;
  //   overflow-y: scroll;
  .menu {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .left {
      display: flex;
      .item {
        color: rgb(132, 142, 156);
        cursor: pointer;
        margin-right: 25px;
      }
    }
  }
  .tab {
    height: 340px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 2px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      color: var(--font-color1-);
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
        &:first-child {
          padding-left: 16px;
        }
      }
    }
  }
}
</style>
