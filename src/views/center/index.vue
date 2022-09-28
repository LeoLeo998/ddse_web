<template>
  <div class="center">
    <div class="side-bar">
      <div class="item" v-for="(item, index) in menus" :key="index" :class="center_type == item.type ? 'item-active' : ''" @click="center_type = item.type">
        <i :class="'fa fa-' + item.icon"></i>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <div class="main-content box-shadow">
      <h1 class="title">{{ center_title }}</h1>
      <div class="components">
        <account v-if="center_type == 0" />
        <recharge v-if="center_type == 1" />
        <withdraw v-if="center_type == 2" />
        <history v-if="center_type == 3" />
        <promote v-if="center_type == 4" />
        <set v-if="center_type == 5" />
      </div>
    </div>
  </div>
</template>
<script>
import account from './account'
import history from './history'
import promote from './promote'
import recharge from './recharge'
import set from './set'
import withdraw from './withdraw'
export default {
  components: {
    account,
    history,
    promote,
    recharge,
    set,
    withdraw
  },
  data() {
    return {
      menus: [
        {
          icon: 'qrcode',
          name: '我的账户',
          type: 0
        },
        {
          icon: 'download',
          name: '充值',
          type: 1
        },
        {
          icon: 'upload',
          name: '提款',
          type: 2
        },
        {
          icon: 'hourglass-half',
          name: '充值历史',
          type: 3
        },
        {
          icon: 'bullhorn',
          name: '我的推广',
          type: 4
        },
        {
          icon: 'gear',
          name: '设置',
          type: 5
        }
      ]
    }
  },
  computed: {
    center_title() {
      return this.menus.find(item => {
        return item.type == this.center_type
      }).name
    },

    center_type: {
      get() {
        return this.$route.query.center_type || 0
      },
      set(val) {
        this.$router.replace(`/center?center_type=${val}`)
      }
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
@green: #29be8f;
.center {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px 10px 0 10px;
  .side-bar {
    .item {
      padding: 10px 30px;
      margin-bottom: 20px;
      font-size: 12px;
      text-align: center;
      cursor: pointer;
      border-radius: 2px;
      .name {
        margin-top: 10px;
        white-space: nowrap;
      }
      i {
        font-size: 22px;
      }
    }
    .item-active {
      background: #fff;
      i {
        color: @green;
      }
    }
  }
  .main-content {
    min-height: 50vh;
    background: #fff;
    width: 100%;
    margin-left: 20px;
    padding: 40px 40px;
    .title {
      font-size: 25px;
      font-weight: bold;
    }
  }
}
</style>
