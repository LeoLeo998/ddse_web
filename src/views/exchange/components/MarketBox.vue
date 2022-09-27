<template>
  <div class="ex-market-box">
    <!-- <div class="search-box">
      <i class="fa el-icon-search"></i>
      <input type="text" v-model="searchVal"/>
    </div> -->
    <div class="coin-list">

      <el-tabs v-model="coinIndex" @tab-click="handleClick">
        <el-tab-pane label="star" name="-1">
          <span slot="label"><i class="fa el-icon-star-on"></i></span>
        </el-tab-pane>
        <el-tab-pane label="热门" name="100"></el-tab-pane>
        <el-tab-pane v-for="(item, index) in group" :key="index" :label="item.title" :name="String(item.id)">
          <!-- <span slot="label" v-if="item.id == -1"><i class="fa el-icon-star-on"></i><span style="margin-left:10px">{{ item.title }}</span></span> -->
        </el-tab-pane>
      </el-tabs>

      <!-- <i class="fa el-icon-star-off" @click="coinIndex = -1" :class="coinIndex == -1 && 'active'"></i>
      <span :class="coinIndex == 100 && 'active'" @click="coinIndex = 100">
        热门
      </span>
      <span v-for="(item, key) in group" :key="key" :class="coinIndex == item.id && 'active'" @click="setMainCoin(item)">
        {{ item.title }}
      </span> -->
    </div>
    <div class="tab-box">
      <ul>
        <li>
          <div class="li-head">
            <span>名称</span>
            <div class="sort-box" @click="sortClick('name')">
              <i class="el-icon-caret-top" :class="sort.name == 1 && 'select'"></i>
              <i class="el-icon-caret-bottom" :class="sort.name == 2 && 'select'"></i>
            </div>
          </div>
          <div class="li-head">
            <span>卖出价格</span>
            <div class="sort-box" @click="sortClick('sellP')">
              <i class="el-icon-caret-top" :class="sort.sellP == 1 && 'select'"></i>
              <i class="el-icon-caret-bottom" :class="sort.sellP == 2 && 'select'"></i>
            </div>
          </div>
          <div class="li-head">
            <span>买入价格</span>
            <div class="sort-box" @click="sortClick('buyP')">
              <i class="el-icon-caret-top" :class="sort.buyP == 1 && 'select'"></i>
              <i class="el-icon-caret-bottom" :class="sort.buyP == 2 && 'select'"></i>
            </div>
          </div>
          <div class="li-head">
            <span>
              涨幅
            </span>
            <div class="sort-box" @click="sortClick('range')">
              <i class="el-icon-caret-top" :class="sort.range == 1 && 'select'"></i>
              <i class="el-icon-caret-bottom" :class="sort.range == 2 && 'select'"></i>
            </div>
          </div>
        </li>
        <div class="market-list">
          <li v-for="(item, key) in marketList" :key="key" @click="setCoin(item)">
            <div class="li-item">
              <i class="fa el-icon-star-off" :class="isStar(item.symbol) && 'active'" @click="starClick(item.symbol)"></i>
              <div>
                <span class="left-coin">{{ item.symbol }}</span>
                <br />
                <span class="left-description">{{ item.description }}</span>
              </div>
            </div>
            <div class="li-item" :class="item.buy_price_direction == 'up' ? 'price-up' : 'price-down'">
              {{ mathFloor(item.buy_price,item.digits) }}
            </div>
            <div class="li-item" :class="item.sell_price_direction == 'up' ? 'price-up' : 'price-down'">
              {{ mathFloor(item.sell_price,item.digits) }}
            </div>
            <div class="li-item" :class="getRange(item) > 0 ? 'price-up' : 'price-down'">{{ getRange(item) }}%</div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      coinIndex: "100",
      selectMarket: '',
      group: [],
      dataList: [],
      collectionList: [],
      sort:{
        name:0,
        sellP:0,
        buyP:0,
        range:0
      }
    }
  },
  props:{
    searchVal:{
      type:String,
      default:() => ''
    }
  },
  computed: {
    ...mapGetters(['getQUOSocket', 'getSelectMarket','getQuotesWsData','getProductData']),
    marketList() {
      let data = Object.values(this.getProductData)
      if (this.coinIndex == "-1") {
        data = this.collectionList 
      }else if (this.coinIndex == "100") {
        data = data.filter(v => {
          return v.hot == 1
        })
      } else {
        data = data.filter(v => {
          return v.group == this.coinIndex
        })
      }
      let obj = {}
      data.forEach(v => {
        obj[v.symbol] = {}
        obj[v.symbol] = v
      })
      data = data.filter(v => {
        return v.symbol.toUpperCase().indexOf(this.searchVal.toUpperCase()) > -1
      })
      if(this.sort.name == 1) {
        data = data.sort((a,b) => {
          if( a.symbol < b.symbol) return -1
        })
      }
      if(this.sort.name == 2) {
        data = data.sort((a,b) => {
          if( a.symbol > b.symbol) return -1
        })
      }
      if(this.sort.buyP == 1) {
        data = data.sort((a,b) => {
          return a.sell_price - b.sell_price
        })
      }
      if(this.sort.buyP == 2) {
        data = data.sort((a,b) => {
          return b.sell_price - a.sell_price
        })
      }
      if(this.sort.sellP == 1) {
        data = data.sort((a,b) => {
          return a.buy_price - b.buy_price
        })
      }
      if(this.sort.sellP == 2) {
        data = data.sort((a,b) => {
          return b.buy_price - a.buy_price
        })
      }
      if(this.sort.range == 1) {
        data = data.sort((a,b) => {
          return this.getRange(a) - this.getRange(b)
        })
      }
      if(this.sort.range == 2) {
        data = data.sort((a,b) => {
          return this.getRange(b) - this.getRange(a)
        })
      }
      return data
    }
  },
  watch:{
    getQuotesWsData (v) {
      // console.log(v)
    }
  },
  methods: {
    ...mapMutations(['setSelectMarket', 'setMarketData', 'setCurrentSymbolInfo','setProductData']),
    ...mapActions(['productListFetch', 'productGroupListFetch', 'marketListFetch', 'productUserListFetch', 'insertProductUserFetch', 'deleteProductUserFetch']),
    handleClick (tab, event) {
      // console.log(tab)
    },
    isStar(symbol) {
      return this.collectionList.find(v => {
        return v.symbol == symbol
      })
    },
    sortClick (type) {
      this.sort[type] = this.sort[type] == 0 ? 1 : this.sort[type] == 1 ? this.sort[type] = 2 : 0
    },
    async starClick(symbol) {
      let fun = ''
      if (this.isStar(symbol)) {
        fun = 'deleteProductUserFetch'
      } else {
        fun = 'insertProductUserFetch'
      }
      let res = await this[fun]({
        symbol
      })
      if (res.status == 200) {
        let res = await this.getCollection()
        if (res.rows.length > 0) {
          this.formatCollection(res.rows)
        }
      }
    },
    getRange(item) {
      return (((item.buy_price - item.close) / item.close) * 100).toFixed(2)
    },
    async getCollection() {
      let res = await this.productUserListFetch()
      return res
    },
    async getData() {
      let res = await Promise.all([this.productGroupListFetch(), this.productListFetch(), this.getCollection()])
      if (res[0] && res[0].rows.length > 0) {
        this.group = res[0].rows
      }
      if (res[1] && res[1].rows.length > 0) {
        this.dataList = res[1].rows
        let obj = {}
        res[1].rows.forEach(v => {
          obj[v.symbol] = {}
          obj[v.symbol] = v
        })
        this.setProductData(obj)
      }
      if (res[2] && res[2].rows.length > 0) {
        this.formatCollection(res[2].rows)
      }
    },
    formatCollection(data) {
      let tmp = data.map(v => {
        return v.symbol
      })
      let arr = this.dataList.filter(v => {
        return tmp.indexOf(v.symbol) > -1
      })
      this.collectionList = arr
    },
    sendMsg(coin) {
      this.getQUOSocket.send({ quoteAsset: coin })
    },
    setCoin(item) {
      this.setSelectMarket(item.symbol)
      this.setCurrentSymbolInfo({
        buy_price: '--',
        sell_price: '--'
      })
      this.initMarketListData()
    },
    setMainCoin(item) {
      this.coinIndex = item.id
    },
    async initMarketListData() {
      let res = await this.marketListFetch({
        symbol: this.getSelectMarket,
        time: '5',
        startDate: parseInt(new Date().getTime() / 1000) - 21600,
        endDate: parseInt(new Date().getTime() / 1000)
      })
      if (res.status == 200) {
        this.setMarketData(res.rows)
      }
    }
  },

  created() {
    this.getData()
    this.initMarketListData()
  }
}
</script>
<style lang="less" scoped>
@color1: rgb(119, 119, 119);
@color2: #676b77;
@color3: rgb(234, 236, 239);
@bg1: rgb(51, 51, 51);
.ex-market-box {
  background-color: #fff;
  min-width: 396px;
  height: 484px;
  .search-box {
    position: relative;
    height: 24px;
    background-color: @bg1;
    border-radius: 3px;
    margin: 10px;
    i {
      position: absolute;
      left: 8px;
      top: 7px;
      color: var(--font-color1-);
      font-size: 12px;
    }
    input {
      width: 100%;
      background-color: transparent;
      outline: none;
      border: none;
      height: 24px;
      padding: 4px 15px 4px 30px;
      color: var(--font-color2-);
      font-size: 12px;
    }
  }
  .coin-list {
    width: 100%;
    p,
    div,
    span {
      color: var(--font-body-);
      font-weight: 400;
    }
    i {
      transform: translateY(1px);
    }
    i,
    span {
      color: @color2;
      cursor: pointer;
      font-size: 14px;
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
        padding: 0px 16px 16px;
        background-color: #ffffff;
        align-items: center;
        z-index: 1;
        top: 15px;
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
          color: #111;
        }
      }
    }
    /deep/.el-tabs__item {
      padding:0 11px;
      font-size: 14px;
      color: #676b77;
      &.is-active {
        color: #29be8f;
      }
    }
    /deep/.el-tabs__active-bar {
      background-color: #29be8f;
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
          //width: 100%;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:hover {
          background-color: var(--hover-color-);
        }
      }
      .market-list {
        height: 398px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 4px;
          height: 1px;
          border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 10px;
          box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
          background: #dbdddf;
        }
        .li-item {
          font-size: 12px;
          overflow: hidden;

          i {
            color: @color2;
            cursor: pointer;
            margin-right: 10px;
          }
          .left-coin {
            color: var(--font-body-);
            font-size: 14px;
          }
          .left-description {
            color: #9ca0aa;
            font-size: 10px;
            //margin-top:10px;
          }
          .right-coin {
            color: @color2;
            font-size: 12px;
          }
          &:first-child {
            padding-left: 10px;
          }
          &:last-child {
            padding-right: 10px;
          }
        }
        .li-head,
        .li-item {
          text-align: right;
          &:first-child {
            display: flex;
            align-items: center;
            text-align: left;
            width: 40%;
          }
          &:nth-child(2) {
            width: 20%;
          }
          &:nth-child(3) {
            width: 20%;
          }
          &:nth-child(4) {
            //text-align: right;
            width: 20%;
          }
        }
      }
    }
    .li-head {
      color: var(--font-body-);
      display: flex;
      align-items: center;
      height: 100%;
      line-height: 50px;
      span {
        font-size: 13px;
      }
      .sort-box {
        cursor: pointer;
        display: flex;
        i {
          display: inline-block;
          
          height: 100%;
          font-size: 12px;
          &.el-icon-caret-top {
            top:3PX;
          }
          &.el-icon-caret-bottom {
            margin-left:-11.9PX;
            margin-top:5PX;
          }
          &.select {
            color:var(--color-green-);
          }
        }
      }
      &:first-child {
        padding-left: 8px;
      }
      &:last-child {
        padding-right: 8px;
      }
    }
    .li-item {
      font-size: 12px;
      overflow: hidden;
      i {
        color: var(--font-body-);
      }
      .left-coin {
        color: @color3;
        font-size: 14px;
      }
      .left-description {
        color: @color2;
        font-size: 12px;
        //margin-top:10px;
      }
      .right-coin {
        color: @color2;
        font-size: 12px;
      }
      &:first-child {
        padding-left: 8px;
      }
      &:last-child {
        padding-right: 8px;
      }
    }
    .li-head,
    .li-item {
      width: 20%;
      text-align: right;
      &:first-child {
        width: 40%;
        text-align: left;
      }
      &:nth-child(2) {
        width: 20%;
      }
      &:nth-child(3) {
        width: 20%;
      }
      &:nth-child(4) {
        display: flex;
        justify-content: end;
        text-align: right;
        width: 20%;
      }
    }
  }
}
/deep/.el-tabs__nav {
  padding:10px 0;
}
/deep/.el-tabs__nav-prev{
  line-height:65px;
}
/deep/.el-tabs__nav-next {
  line-height:65px;
}
@media (max-width: 768px) {
  .ex-market-box .tab-box ul li {
    height: 60px;
  }
  /deep/.el-tabs__nav-prev{
    line-height:68px;
  }
  /deep/.el-tabs__nav-next {
    line-height:68px;
  }
}
</style>
