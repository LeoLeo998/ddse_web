<template>
  <div v-if="!getIsMobile">
    <header class="msb-header">
      <div class="header-left">
        <img @click="$router.push('/')" src="/static/images/logo.png" alt="" />
        <div class="menu">
          <div class="left-a">
            <router-link to="/">
              首页
            </router-link>
            <router-link to="/market">
              行情
            </router-link>
            <router-link to="/exchange">
              交易
            </router-link>
          </div>
        </div>
      </div>
      <div class="header-right">
        <div class="login-box" v-if="!getIsLogin">
          <div class="a-item">
            <router-link to="/login">登录</router-link>
          </div>
          <div class="a-item major">
            <router-link to="/register">注册</router-link>
          </div>
        </div>
        <div class="user-name" v-else>
          <div class="item1">
            <span>钱包</span>
            <i class="fa fa-sort-down"></i>
            <div class="child-menu">
              <router-link to="/" class="a-item">资产</router-link>
              <router-link to="/" class="a-item">充值</router-link>
              <router-link to="/" class="a-item">提现</router-link>
            </div>
          </div>
          <div class="item1">
            <span>账户</span>
            <i class="fa fa-sort-down"></i>
            <div class="child-menu">
              <router-link to="/" class="a-item">账户总览</router-link>
              <router-link to="/" class="a-item">账户安全</router-link>
              <!-- <router-link class="a-item">返佣</router-link> -->
              <div class="a-item" @click="logout">退出</div>
            </div>
          </div>
          <div class="item1">
            <span>简体中文</span>
            <i class="fa fa-sort-down"></i>
            <div class="child-menu">
              <div class="a-item">简体中文</div>
              <div class="a-item">English</div>
              <div class="a-item">한국어</div>
              <div class="a-item">日本語</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
  <div v-else>
    <header class="msb-header">
      <div class="header-left">
        <img @click="$router.push('/')" src="/static/images/logo.png" alt="" />
      </div>
      <div class="header-right">
        <i class="el-icon-s-fold" @click="showDrawer = !showDrawer"></i>
      </div>
    </header>

    <el-drawer title="" :visible.sync="showDrawer" direction="rtl" size="70%" :before-close="handleClose">
      <div class="drawer-box">
        <div class="login-box" v-if="!getIsLogin">
          <el-button type="text" @click="$router.push('/login')">登录</el-button>
          <el-button class="register-btn" type="success" @click="$router.push('/register')">注册</el-button>
          <el-divider class="hr"></el-divider>
        </div>
        <ul class="menu-ul">
            <li v-for="item in menuList" @click="menuClick(item)">
                <span>{{item.label}}</span>
                <span>
                    <i class="el-icon-arrow-down"></i>
                </span>
            </li>
        </ul>
        
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { delCookie } from '../common/cookie'
export default {
    data () {
        return {
            isMobile:false,
            showDrawer:false,
            menuList:[{
                label:'行情',
            },{
                label:'交易中心'
            }],
            elTreeProps:{
                children: 'children',
                label: 'label'
            }
        }
    },
  computed: {
    ...mapGetters(['getIsLight', 'getIsLogin'])
  },
  mounted() {
    if (document.body.clientWidth <= 768) {
      this.isMobile = true
    }
  },
  methods: {
    ...mapMutations(['setIsLight', 'setIsLogin']),
    ...mapActions(['LogOutFetch']),
    handleClose() {
      this.showDrawer = false
    },
    setLight(type) {
      this.setIsLight(type)
    },
    async logout() {
      let res = await this.LogOutFetch()
      if (res) {
        this.setIsLogin(false)
        delCookie('userToken')
      }
    },
    menuClick (data){
        if(data.label === '交易中心') {
            this.$router.push('/exchange')
        }
        if(data.label === '行情') {
            this.$router.push('/market')
        }
        this.showDrawer = false
    },
  }
}
</script>

<style lang="less" scoped>
.msb-header {
  position: fixed;
  z-index: 99999999999;
  width: 100%;
  height: 80px;
  top: 0;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  .header-left {
    flex: 1;
    display: flex;
    align-items: center;
    img {
      height: 24px;
    }
  }

  .header-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .check-light {
      width: 100px;
      height: 40px;
      padding: 0 15px;
      border: 1px solid #eee;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 12px;
        cursor: pointer;
      }
    }
    .mobile-menu {
      text-align: right;
      display: none;
    }
  }

  .menu,
  .login-box {
    margin-left: 50px;
    display: flex;
    align-items: center;
    .a-item {
      display: inline-block;
      margin: 0 8px 0 0;
      padding: 6px 12px;
      border-radius: 4px;
      border: solid 1px var(--font-primary-);

      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        text-decoration: none;
        color: var(--font-color3-);
        color: var(--font-primary-);
      }
      &.major {
        background-color: var(--color-green-);
        a {
          color: #fff;
        }
      }
    }
    .left-a {
      a {
        font-size: 16px;
        text-decoration: none;
        color: var(--font-color3-);
        font-weight: 400;
        margin-right: 38px;
        &:hover {
          color: var(--color-green-);
        }
      }
    }
}
@media (max-width:768px) {
    .msb-header {
        height: 80px;
        padding:0 16px;
        .header-left {
            img {
                height:26px;
            }
        }
        .header-right {
            i {
                font-size: 20px;

            }
        }
        
    }
    
    /deep/.el-drawer__header {
        padding:20px 20px 0;
    }
    /deep/.el-tree-node__content {
        height: 40px;
    }
    /deep/.el-tree-node__label {
        font-size: 14px;
    }
  }
}
.drawer-box {
    padding:0 20px 20px;
    min-height: 100px;
    .login-box {
        button {
            width: 100%;
            height:50px;
            color: rgb(45, 189, 150);
            span {
                font-size: 14px;
            }
            &.register-btn {
                background-color: var(--color-green-);
                margin-top:16px;
                border-radius:4px;
                color: #fff;
            }
        }
    }
    .menu-ul {
        list-style: none;
        li {
            display: flex;
            justify-content: space-between;
            
            height:48px;
            line-height: 48px;
            //border-bottom:1px solid #eee;
            span {
                font-size: 14PX;
                color:var(--font-body-);
                i {
                    font-size: 14PX;
                    color:var(--font-body-);
                }
            }
        }
    }
    .hr {
        margin:20px 0;
    }
    .menu-box {
        ul {
            list-style: none;
            .menu-li {
                height:40px;
                display: flex;
                justify-content: space-between;
            }
        }
    }
}

</style>
