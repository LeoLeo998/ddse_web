<template>
  <div class="deal-history">
    <h1 class="account-info">账户信息</h1>
    <div v-if="isLogin">
      
      <div class="info-row">
        <span>
          账户类型
        </span>
        <span>
          {{userInfo.state}}
        </span>
      </div>
      <div class="info-row">
        <span>
          交易账号ID
        </span>
        <span class="account-id">
          {{userInfo.im_account}}
        </span>
      </div>
      <div class="info-row">
        <span>
          当前杠杆
        </span>
        <span>
          {{userInfo.level}}
        </span>
      </div>
      <div class="info-row">
        <span>
          盈利/亏损
        </span>
        <span :class="total_profit > 0 ? 'price-up' : 'price-down'">
          {{total_profit | number}}
        </span>
      </div>
      <div class="info-row">
        <span>
          结余
        </span>
        <span class="major-text">
          {{balance.balance}}
        </span>
      </div>
      <div class="info-row">
        <span>
          净值
        </span>
        <span class="major-text">
          {{ (balance.balance - total_profit) | number }}
        </span>
      </div>
      <div class="info-row">
        <span>
          预付款
        </span>
        <span class="major-text">
          {{ balance.margin }}
        </span>
      </div>
      <div class="info-row">
        <span>
          可用预付款
        </span>
        <span class="major-text">
          {{ (balance.balance - balance.margin) | number }}
        </span>
      </div>
      <div class="info-row">
        <span>
          预付款比例
        </span>
        <span>
          {{ (balance.margin / (balance.balance - balance.margin + total_profit)) | number }}%
        </span>
      </div>
    </div>
    <div class="tip-text" v-else>
      <router-link to="/register">注册</router-link>
      或
      <router-link to="/login">登录</router-link>
      后查看
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import bus from '@/util/bus'
export default {
  data() {
    return {
      balance: {},
      userInfo: {},
      position: []
    }
  },
  computed: {
    ...mapState(['isLogin']),
    total_profit() {
      return this.position.reduce((pre, cur) => {
        return pre + cur.PROFIT
      }, 0)
    }
  },
  filters: {
    number(data) {
      return data.toFixed(2)
    }
  },
  methods: {
    ...mapActions(['getUserBalanceFetch', 'getUserInfoFetch', 'positionListFetch']),
    ...mapMutations(["setIsLogin"]),
    async getUserBalance() {
      let res = await this.getUserBalanceFetch()
      this.balance = res
    },
    async getUserInfo() {
      let res = await this.getUserInfoFetch()
      this.userInfo = res
    },
    async positionList() {
      let res = await this.positionListFetch()
      this.position = res.rows
    }
  },
  mounted() {
    if (this.isLogin) {
      this.getUserBalance()
      this.getUserInfo()
      this.positionList()
    }
    bus.$on("updateBalanceInfo", (data) => {
      this.balance.balance = data.balance
      this.balance.margin = data.margin
    })
  }
}
</script>

<style lang="less" scoped>
@color1: rgb(119, 119, 119);
@color2: rgb(132, 142, 156);
@color3: rgb(234, 236, 239);
.deal-history {
  color: @color1;
  background: #fff;
  height:100%;
  padding:15px;
  padding-bottom:0;
  height: 395px;
  .account-info {
    font-size: 14px;
    margin-bottom:20px;
  }
  .tip-text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top:50px;
    letter-spacing:1px;
    a {
      color:var(--color-green-);
    }
  }
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .info-row {
    height:28px;
    margin-bottom:10px;
    display: flex;
    justify-content: space-between;
    span {
      &.account-id {
        //border-bottom:1px dashed #eee;
      }
      
      &:first-child {
        display: inline-block;
        width:120px;
        text-align: left;
        color:var(--font-body-);
      }
      &:last-child {
        display: inline-block;
        color:var(--font-color2-);
      }
      &.major-text {
        text-decoration:underline;
        font-style:italic;
        color:var(--font-color1-);
      }
    }
  }
  .ml-10 {
    margin-left: 15px;
  }
  .deal-type-box {
    span {
      font-size: 14px;
      margin-right: 20px;
      cursor: pointer;
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
        height: 30px;
        line-height: 30px;
      }
      .market-list {
        height: 303px;
        overflow: hidden;
        background-color: #fff;
        &::-webkit-scrollbar {
          width: 3px;
          height: 1px;
          border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background: @color1;
        }
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          //   background-color: transparent;
        }
      }
    }
  }
}
</style>
