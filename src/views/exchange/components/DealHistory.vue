<template>
  <div class="deal-history">
    <div v-if="isLogin">
      <el-form label-width="100px">
        <el-form-item label="账户类型 :"
          ><span class="ml-10">{{ userInfo.state }}</span></el-form-item
        >
        <el-form-item label="交易账号ID :"
          ><span class="ml-10">{{ userInfo.im_account }}</span></el-form-item
        >
        <el-form-item label="当前杠杆 :"
          ><span class="ml-10">{{ userInfo.level }}</span></el-form-item
        >
        <el-form-item label="盈利/亏损 :"
          ><span class="ml-10">{{ total_profit | number }}</span></el-form-item
        >
        <el-form-item label="结余 :"
          ><span class="ml-10">{{ balance.balance }}</span></el-form-item
        >
        <el-form-item label="净值 :"
          ><span class="ml-10">{{ (balance.balance - total_profit) | number }}</span></el-form-item
        >
        <el-form-item label="预付款 :"
          ><span class="ml-10">{{ balance.margin }}</span></el-form-item
        >
        <el-form-item label="可用预付款 :"
          ><span class="ml-10">{{ (balance.balance - balance.margin) | number }}</span></el-form-item
        >
        <el-form-item label="预付款比例 :"
          ><span class="ml-10">{{ (balance.margin / (balance.balance - balance.margin + total_profit)) | number }}%</span></el-form-item
        >
      </el-form>
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
  padding: 5px 0px 10px 15px;
  color: @color1;
  background: #fff;
  .el-form-item {
    margin-bottom: 0 !important;
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
