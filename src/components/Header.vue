<template>
    <header class="msb-header">
        <div class="header-left">
            <img @click="$router.push('/')" src="/static/images/logo.png" alt="">
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
            
            <!-- <div class="check-light">
                <span :class="getIsLight && 'active'" @click="setLight(true)">白天</span>
                <span :class="!getIsLight && 'active'" @click="setLight(false)">黑夜</span>
            </div> -->
        </div>
    </header>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { delCookie } from '../common/cookie'
export default {
    data () {
        return {

        }
    },
    computed:{
        ...mapGetters([
            "getIsLight",
            "getIsLogin",
        ]),
    },
    methods:{
        ...mapMutations([
            "setIsLight",
            "setIsLogin",
        ]),
        ...mapActions([
            "LogOutFetch"
        ]),
        setLight (type) {
            this.setIsLight(type)
        },
        async logout() {
            let res = await this.LogOutFetch()
            if(res) {
                this.setIsLogin(false)
                delCookie("userToken")
            }
        }
    }
}
</script>

<style lang="less" scoped>
.msb-header {
    height: 80px;
    line-height: 80px;
    padding:0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom:1px solid #eee;
    .header-left {
        flex:1;
        display: flex;
        align-items: center;
        img {
            height:24px;
        }
    }
    
    .header-right {
        flex:1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .check-light {
            width: 100px;
            height: 40px;
            padding:0 15px;
            border:1px solid #eee;
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
        @media screen and (max-width:768px) {
            .mobile-menu {
                display: block;
            }
        }
    }
    
    .menu,.login-box {
        margin-left:50px;
        display: flex;
        align-items: center;
        .a-item {
            width: 54px;
            height: 36px;
            margin: 0 8px 0 0;
            border-radius: 4px;
            border: solid 1px #000;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            a {
                text-decoration: none;
                color: #000;
            }
            &.major {
                background-color: var(--color-green-);
                border:none;
                a {
                    color:#fff; 
                }
            }
        }
        .left-a {
            a {
                font-size: 16px;
                text-decoration: none;
                color:var(--font-color2-);
                font-weight: 400;
                margin-right:38px;
                &:hover {
                    color:var(--color-green-);
                }
            }
        }
        
    }
    .user-name {
        margin-right:20px;
        display: flex;
        align-items: center;
    }
    .item1 {
        margin-right:15px;
        font-size: 16px;
        text-decoration: none;
        margin:0 10px;
        color:var(--font-color2-);
        font-weight: 400;
        line-height: 0;
        cursor: pointer;
        position: relative;
        z-index: 100;
        height: 40px;
        display: flex;
        align-items: center;
        z-index:101;
        span {
            font-size: 16px;
        }
        &:hover {
            color:var(--color-green-);
            .child-menu {
                display: block;
            }
        }
        .child-menu {
            position: absolute;
            display: none;
            min-width: 100px;
            // padding:20px 0;
            background-color: #fff;
            box-shadow:rgb(221, 228, 241) 0 0 10px 0;
            top:35px;
            left:-18px;
            text-align:left;
            font-size: 16px;
            .a-item {
                display: block;
                padding: 18px;
                font-size: 16px;
                text-decoration: none;
                color:var(--font-color2-);
                &:hover {
                    background-color:var(--hover-color-);
                    color:var(--color-green-);
                }
            }
        }
        i {
            transform: translateY(-2px);
            margin-left:5px;
        }
    }
}
</style>