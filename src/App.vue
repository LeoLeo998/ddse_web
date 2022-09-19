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
import { mapGetters, mapMutations } from 'vuex'
import { getCookie } from '@/common/cookie'
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
    ])
  },
  created () {
    const _socket = new Socket(config.QUO_WSURL+Math.random(),this);
    this.setQUOSocket(_socket);

    const _socket2 = new Socket(config.TRAN_WSURL+getCookie('userToken'),this);
    this.setTRANSocket(_socket2);
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
    ])
  }
}
</script>

<style lang="less">
#app {
  // @ex-border-night:'#464646';
  background-color: #F9F9F9;
}
</style>

</style>
