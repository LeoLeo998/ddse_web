<template>
  <div class="market-page">
    <div class="hot">
      <div class="hot-item" v-for="(item, index) in hotProductList" :key="index" @click="toExchange(item)">
        <div class="flex-center-between symbol">
          <div>{{ item.symbol }}</div>
          <img src="https://huobicfg.s3.amazonaws.com/currency_icon/btc.png" alt="" />
        </div>
        <div class="flex-start-center price">
          <div>{{ item.buy_price }}</div>
          <span v-show="item.symbol !== 'USDCNHm'"> ≈ ¥{{ numRate(item) }}</span>
        </div>
        <div class="flex-start-center updown">
          <div :class="upDown(item) > 0 ? 'price-up' : 'price-down'">{{ upDown(item) }}%</div>
          <!-- <span>24H量7128</span> -->
        </div>
      </div>
    </div>
    <div class="header">
      <div class="search-box">
        <p class="css-1xamyaw">行情</p>
        <div class="search-ipt">
          <i class="fa fa-search"></i>
          <input type="text" placeholder="搜索" />
        </div>
      </div>
      <div class="content-box">
        <div class="item" v-for="(item, key) in topSockets" :key="key">
          <span class="title">{{ topTitle[key] }}</span>
          <div class="market-info">
            <div class="item-left">
              <img src="https://upload-hotbit-io.oss-ap-southeast-1.aliyuncs.com/files/asset_logos/BTC_LOGO.png" alt="" />
              <span class="market">{{ item.market }}</span>
            </div>
            <div class="item-right">
              <span :class="item.change > 0 ? 'price-up' : 'price-down'">
                <!-- /// -->
                {{ item.change > 0 ? '+' : '' }}{{ (item.change * 100).toFixed(2) }}%
              </span>
            </div>
          </div>
          <div class="market-info">
            <div class="item-left">
              <span class="price price-up">{{ item.price }}</span>
            </div>
          </div>
          <div class="market-info">
            <div class="item-left">
              <span>${{ item.usd }}</span>
            </div>
            <div class="item-right">
              <i class="fa fa-chevron-circle-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="market-box">
      <div class="market-type-box">
        <button :class="marketType == item.id && 'active'" @click="marketType = item.id" v-for="(item, index) in groupList" :key="index">
          <i class="fa fa-star" v-show="item.id === -1"></i>
          {{ item.title }}
        </button>
      </div>
      <!-- <div class="class-coin">
        <button :class="screenType == 1 && 'active'" @click="mainCoinClick(1)">BTC</button>
        <button :class="screenType == 2 && 'active'" @click="mainCoinClick(2)">ALTS</button>
        <button :class="screenType == 3 && 'active'" @click="mainCoinClick(3)">
          FIAT
          <i class="fa fa-sort-down"></i>
          <div class="coin-select-box" v-if="showSelectChild">
            <div class="item">All</div>
            <div class="item">AUD</div>
            <div class="item">BIDR</div>
            <div class="item">BRL</div>
            <div class="item">EUR</div>
            <div class="item">GBP</div>
            <div class="item">RUB</div>
            <div class="item">TRY</div>
            <div class="item">TUSD</div>
            <div class="item">USDC</div>
            <div class="item">DAI</div>
            <div class="item">IDRT</div>
            <div class="item">UAH</div>
            <div class="item">NGN</div>
            <div class="item">BVND</div>
            <div class="item">VAI</div>
            <div class="item">USDP</div>
            <div class="item">BUSD</div>
          </div>
        </button>
        <button :class="screenType == 4 && 'active'" @click="mainCoinClick(4)">USDT</button>
        <button :class="screenType == 5 && 'active'" @click="mainCoinClick(5)">ETF</button>
      </div> -->
      <div class="child-coin" v-if="screenType == 2">
        <button :class="childCoin == 1 && 'active'" @click="childCoin = 1">
          ALL
        </button>
        <button :class="childCoin == 2 && 'active'" @click="childCoin = 2">
          ETH
        </button>
        <button :class="childCoin == 3 && 'active'" @click="childCoin = 3">
          BNB
        </button>
        <button :class="childCoin == 4 && 'active'" @click="childCoin = 4">
          TRX
        </button>
        <button :class="childCoin == 5 && 'active'" @click="childCoin = 5">
          XRP
        </button>
        <button :class="childCoin == 6 && 'active'" @click="childCoin = 6">
          DOGE
        </button>
      </div>
      <div class="list-box">
        <table>
          <tr>
            <th>
              名称
              <span class="sort">
                <i class="fa fa-sort-up"></i>
                <i class="fa fa-sort-down"></i>
              </span>
            </th>
            <th>
              价格
              <span class="sort">
                <i class="fa fa-sort-up"></i>
                <i class="fa fa-sort-down"></i>
              </span>
            </th>
            <th>
              24H涨跌
              <span class="sort">
                <i class="fa fa-sort-up"></i>
                <i class="fa fa-sort-down"></i>
              </span>
            </th>
            <th>24H最高</th>
            <th>24H最低</th>
            <!-- <th>
              24H交易量
              <span class="sort">
                <i class="fa fa-sort-up"></i>
                <i class="fa fa-sort-down"></i>
              </span>
            </th>
            <th>
              市值
              <span class="sort">
                <i class="fa fa-sort-up"></i>
                <i class="fa fa-sort-down"></i>
              </span>
            </th> -->
            <!-- <th>操作</th> -->
          </tr>
          <tr v-for="(item, key) in productList" :key="key" class="cursor" @click.stop="toExchange(item)">
            <td>
              <i class="fa fa-star" :class="item.isFavorite === 1 ? 'fa-star-fav' : 'fa-star'" @click.stop="isFavorite(item)"></i>
              {{ item.symbol }}
            </td>
            <td>
              {{ item.buy_price }}
            </td>
            <td :class="upDown(item) > 0 ? 'price-up' : 'price-down'">{{ upDown(item) }}%</td>
            <td>{{ item.high }}</td>
            <td>{{ item.low }}</td>
            <!-- <td>{{ item.volume || '--' }}</td>
            <td>--</td> -->
            <!-- <td>
              <span class="to-trans">
                交易
              </span>
            </td> -->
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      screenType: 1,
      marketType: 0,
      childCoin: 1,
      showSelectChild: false,
      topTitle: ['最大涨幅（24h）', '最大跌幅（24h）', '成交量（24h）', '亮点'],
      groupList: [],
      allProductList: [],
      myFavorite: []
    }
  },
  computed: {
    ...mapState(['isLogin', 'quotes_ws_data']),
    topSockets() {
      return []
    },
    //获取汇率
    getRate() {
      return this.allProductList.find(item => {
        return item.symbol === 'USDCNHm'
      })
    },
    //汇率计算
    numRate() {
      return function(data) {
        return (data.buy_price * this.getRate.buy_price).toFixed(2)
      }
    },
    //头部热门
    hotProductList() {
      let arr = ['XAUUSDm', 'BTCUSDm', 'USDCNHm', 'US30m', 'AAPLm']
      return this.allProductList.filter(item => {
        return arr.includes(item.symbol)
      })
    },
    // 产品列表处理
    productList() {
      // 最热门
      if (this.marketType === 0) {
        return this.allProductList.filter(item => {
          if (item.hot === 1) {
            console.log(item)
          }
          return item.hot === 1
        })
        // 自选
      } else if (this.marketType === -1) {
        return this.allProductList.filter(item => {
          return item.isFavorite === 1
        })
        //全部
      } else if (this.marketType === this.groupList.length) {
        return this.allProductList
      } else {
        //其他
        return this.allProductList.filter(item => {
          return item.group === this.marketType
        })
      }
    },
    //24小时涨跌计算
    upDown() {
      return function(data) {
        return (((data.buy_price - data.close) / data.close) * 100).toFixed(2)
      }
    }
  },
  watch: {
    marketType(val) {
      if (val === -1) {
        this.getProductUserList()
        this.getProductList()
      }
    },
    quotes_ws_data(val) {
      this.allProductList.forEach(item => {
        if (item.symbol === val.symbol) {
          item.buy_price = val.buy_price
        }
      })
    }
  },
  methods: {
    ...mapActions(['productGroupListFetch', 'productListFetch', 'productUserListFetch', 'deleteProductUserFetch', 'insertProductUserFetch']),

    mainCoinClick(id) {
      this.screenType = id
      if (id === 3) {
        this.showSelectChild = !this.showSelectChild
      } else {
        this.showSelectChild = false
      }
    },
    // 获取分组
    async getProductGroup() {
      let res = await this.productGroupListFetch()
      this.groupList = res.rows
      this.groupList.unshift({
        id: 0,
        num: 0,
        title: '最热门'
      })
      this.groupList.unshift({
        id: -1,
        num: -1,
        title: '我的自选'
      })
      this.groupList.push({
        id: this.groupList.length + 1,
        num: this.groupList.length + 1,
        title: '全部'
      })
    },
    // 获取产品
    async getProductList() {
      let res = await this.productListFetch()
      this.allProductList = res.rows
      let favorites = this.isLogin ? this.myFavorite : JSON.parse(localStorage.getItem('ddse_favorite_product')) || []
      let favSymbolArr = favorites.map(a => {
        return a.symbol
      })
      // 是否自选
      this.allProductList.forEach(a => {
        favSymbolArr.includes(a.symbol) ? (a.isFavorite = 1) : (a.isFavorite = 0)
      })
    },
    // 获取自选
    async getProductUserList() {
      if (this.isLogin) {
        let res = await this.productUserListFetch()
        this.myFavorite = res.rows
      } else {
        this.myFavorite = JSON.parse(localStorage.getItem('ddse_favorite_product')) || []
      }
    },
    // 取消-添加 自选
    async isFavorite(item) {
      if (this.isLogin) {
        let params = { symbol: item.symbol }
        let res = item.isFavorite === 1 ? await this.deleteProductUserFetch(params) : this.insertProductUserFetch(params)
      } else {
        let arr = JSON.parse(localStorage.getItem('ddse_favorite_product')) || []
        if (item.isFavorite === 1) {
          if (arr.length > 0) {
            let index = arr.findIndex(a => {
              return a.symbol === item.symbol
            })
            this.$delete(arr, index)
            localStorage.removeItem('ddse_favorite_product')
            localStorage.setItem('ddse_favorite_product', JSON.stringify(arr))
          }
        } else {
          localStorage.setItem('ddse_favorite_product', JSON.stringify(arr.concat(item)))
        }
      }
      setTimeout(() => {
        this.getProductUserList()
        this.getProductList()
      }, 400)
    },
    toExchange(item) {
      this.$router.push({
        path: '/exchange',
        query: {
          market: item.symbol
        }
      })
    }
  },

  mounted() {
    this.getProductGroup()
    this.getProductUserList()
    this.getProductList()
  }
}
</script>

<style lang="less" scoped>
@bgcolor: #eaecef;
@bgcolor2: #fafafa;
@fontcolor: #707a8a;
@fontcolor2: rgb(112, 122, 138);
@tabline: #eaecef;

.market-page {
  .hot {
    padding: 0 30px;
    display: flex;
    justify-content: center;
    .hot-item {
      width: 350px;
      margin: 10px 10px;
      border-radius: 10px;
      background: #fff;
      padding: 25px 25px;
      cursor: pointer;
      .symbol {
        div {
          font-size: 20px;
          color: #000;
        }
        img {
          width: 40px;
        }
      }
      .price {
        margin: 5px 0 10px 0;
        div {
          font-size: 25px;
          font-weight: bold;
          color: #000;
          margin-right: 5px;
        }
        span {
          color: @fontcolor;
        }
      }
      .updown {
        div {
          margin-right: 5px;
        }
        span {
          color: @fontcolor;
        }
      }
    }
  }
  .header {
    padding: 50px 0;
    background-color: @bgcolor2;
    text-align: center;
    .search-box {
      width: 1280px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
      .css-1xamyaw {
        font-size: 26px;
      }
      .search-ipt {
        position: relative;
        input {
          width: 280px;
          height: 42px;
          border: 1px solid @tabline;
          border-radius: 5px;
          padding: 0 30px;
        }
        i {
          position: absolute;
          left: 10px;
          top: 14px;
          color: @fontcolor;
        }
      }
    }
    .content-box {
      width: 1280px;
      margin: 20px auto 0;
      display: flex;

      .item {
        flex: 1;
        text-align: left;
        padding: 15px 30px;
        border-radius: 5px;
        &:hover {
          background-color: rgb(236, 236, 236);
        }
        .title {
          font-size: 12px;

          color: @fontcolor;
        }
        .market-info {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          .item-left {
            display: flex;
            align-items: center;
            img {
              width: 20px;
              margin-right: 5px;
            }
            span {
              color: @fontcolor;
              font-weight: 600;
              &.market {
                color: #000000;
                // font-size: 12px;
              }
              &.price {
                font-size: 20px;
              }
            }
          }
          .item-right {
            span {
              font-weight: 600;
            }
            i {
              font-size: 22px;
              color: @fontcolor;
            }
          }
        }
      }
    }
  }

  .market-box {
    width: 1280px;
    margin: 0 auto;
    padding: 30px 20px;
    .market-type-box {
      display: flex;
      margin: 0 0 20px 0;
      button {
        outline: none;
        border: none;
        padding: 12px 20px;
        background-color: transparent;
        color: @fontcolor;
        border-radius: 5px;
        cursor: pointer;
        i {
          color: @fontcolor;
        }
        &.active {
          background-color: #03a66d0d;
        }
      }
    }
    .class-coin {
      display: flex;
      margin: 20px 0;
      button {
        padding: 8px 20px;
        // color: #1E2329;
        color: @fontcolor;
        border-radius: 3px;
        background-color: transparent;
        outline: none;
        border: none;
        font-weight: 700;
        cursor: pointer;
        position: relative;
        i {
          transform: translateY(-3px);
        }
        .coin-select-box {
          position: absolute;
          display: flex;
          border-radius: 4px;
          box-shadow: 0px 0px 5px #ccc;
          width: 310px;
          flex-wrap: wrap;
          padding: 8px 24px 24px;
          background-color: #ffffff;
          align-items: center;
          z-index: 1;
          top: 30px;
          .item {
            margin: 0;
            min-width: 0;
            cursor: pointer;
            flex: none;

            text-align: center;
            width: 25%;
            font-size: 14px;
            line-height: 20px;
            margin-top: 0;
            margin-top: 16px;
            &:first-child {
              // margin:0;
            }
          }
        }
        &.active {
          color: #1e2329 !important;
          background-color: #f5f5f5;
        }
      }
    }
    .child-coin {
      // margin-top:10px;
      button {
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 10px;
        border-right: 1px solid @fontcolor;
        color: @fontcolor;
        padding: 0 10px;
        cursor: pointer;
        &:last-child {
          border: none;
        }
      }
    }
    .list-box {
      margin-top: 20px;
      table {
        width: 100%;
        border-collapse: collapse;
        tr:hover {
          background-color: #03a66d0d;
        }
        th {
          background-color: @bgcolor2;
          color: @fontcolor;
          height: 40px;
          font-size: 12px;
          .sort {
            display: inline-flex;
            -webkit-box-orient: vertical;
            flex-direction: column;
            height: 1px;
            color: @fontcolor;
            cursor: pointer;
            i {
              height: 12px;
              &.fa-sort-up {
                transform: translateY(1px);
              }
              &.fa-sort-down {
                transform: translateY(-11px);
              }
            }
          }
        }
        td {
          height: 60px;
          font-size: 16px;
          border-bottom: 1px solid @tabline;
          i {
            color: @bgcolor;
          }
          .to-trans {
            font-size: 16px;
            color: #03a66d;
          }
        }
        th:nth-child(1),
        td:nth-child(1) {
          width: 14%;
          text-align: left;
          padding-left: 20px;
        }
        th:nth-child(2),
        td:nth-child(2) {
          width: 15%;
          text-align: left;
        }
        th:nth-child(3),
        td:nth-child(3) {
          width: 12%;
          text-align: left;
        }
        th:nth-child(4),
        td:nth-child(4) {
          width: 10%;
          text-align: left;
        }
        th:nth-child(5),
        td:nth-child(5) {
          width: 12%;
          text-align: center;
        }
        th:nth-child(6),
        td:nth-child(6) {
          width: 15%;
          text-align: right;
        }
        th:nth-child(7),
        td:nth-child(7) {
          width: 14%;
          padding-right: 20px;
          text-align: right;
        }
      }
      .fa-star {
        cursor: pointer;
      }
      .fa-star-fav {
        cursor: pointer;
        color: rgb(247, 186, 42);
      }
    }
  }
}
</style>
