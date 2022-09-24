<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Socket from './config/socket'
import config from './config/index'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { getCookie, delCookie } from '@/common/cookie'
export default {
  name: 'App',
  components:{
    Header
  },
  computed:{
    ...mapGetters([
      "getQUOSocket",
      "getIsLogin",
      "getMarketData",
      "getSelectMarket",
      "getProductData",
    ])
  },
  created () {
    const _socket = new Socket(config.QUO_WSURL+Math.random(),this);
    this.setQUOSocket(_socket);
    
    this.getUserInfo();
    const userToken = getCookie('userToken')
    if(userToken) {
      this.setIsLogin(true)
    }
  },
  methods:{
    ...mapMutations([
        "setQUOSocket",
        "setTRANSocket",
        "setMarketData",
        "setIsLogin",
        "setUserInfo",
        "setCurrentSymbolInfo"
    ]),
    ...mapActions([
      "getUserInfoFetch"
    ]),
    async getUserInfo() {
      let res = await this.getUserInfoFetch()
      if(res.name) {
        this.setIsLogin(true)
        this.setUserInfo(res)
      }
      if(res.status == 700) {
        //登录过期
        this.setIsLogin(false)
        delCookie("userToken")
      }
    },
  }
}
</script>

<style lang="less">
#app {
  // @ex-border-night:'#464646';
  background-color: #f5f6f6;
}
</style>

</style>
