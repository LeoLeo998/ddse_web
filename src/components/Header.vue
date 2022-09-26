<template>
    <div v-if="!isMobile">
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
            </div>
        </header>
    </div>
    <div v-else>
        <header class="msb-header">
            <div class="header-left">
                <img @click="$router.push('/')" src="/static/images/logo.png" alt="">
            </div>
            <div class="header-right">
                <i class="el-icon-s-fold" @click="showDrawer = !showDrawer"></i>
            </div>
        </header>

        <el-drawer
            title=""
            :visible.sync="showDrawer"
            direction="rtl"
            size="70%"
            :before-close="handleClose">
            <div class="drawer-box">
                <div class="login-box" v-if="!getIsLogin">
                    <el-button type="text" @click="$router.push('/login')">登录</el-button>
                    <el-button class="register-btn" type="success" @click="$router.push('/register')">注册</el-button>
                    <el-divider class="hr"></el-divider>
                </div>
                
                <!-- <el-tree :data="menuList" :props="elTreeProps" @node-click="menuClick"></el-tree> -->
                <el-tree :data="menuList" :props="elTreeProps" @node-click="menuClick"></el-tree>
                <!-- <div class="menu-box">
                    <ul>
                        <li class="menu-li">
                            <span>行情</span>
                        </li>
                        <li class="menu-li">
                            <span>交易中心</span>
                        </li>
                        
                    </ul>
                </div> -->
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
                label:'交易'
            },{
                label:'语言',
                children:[{
                    label:'简体中文',
                },{
                    label:'English'
                },{
                    label:'한국어'
                },{
                    label:'日本語'
                }]
            },{
                label:'汇率',
                children:[{
                    label:'USD',
                },{
                    label:'CNY'
                },{
                    label:'KRW'
                }]
            }],
            elTreeProps:{
                children: 'children',
                label: 'label'
            }
        }
    },
    computed:{
        ...mapGetters([
            "getIsLight",
            "getIsLogin",
        ]),
    },
    mounted () {
        if(document.body.clientWidth <= 768) {
            this.isMobile = true
        }
    },
    methods:{
        ...mapMutations([
            "setIsLight",
            "setIsLogin",
        ]),
        ...mapActions([
            "LogOutFetch"
        ]),
        menuClick (){

        },
        handleClose (){
            this.showDrawer = false
        },
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
    padding:0 30px;
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
    }
    
    .menu,.login-box {
        margin-left:50px;
        display: flex;
        align-items: center;
        .a-item {
            display: inline-block;
            margin: 0 8px 0 0;
            padding:6px 12px;
            border-radius: 4px;
            border: solid 1px var(--font-primary-);
            
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            a {
                text-decoration: none;
                color:var(--font-color3-);
                color: var(--font-primary-);
            }
            &.major {
                background-color: var(--color-green-);
                a {
                    color:#fff; 
                }
            }
        }
        .left-a {
            a {
                font-size: 16px;
                text-decoration: none;
                color:var(--font-color3-);
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
                color:var(--font-color3-);
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
@media (max-width:768px) {
    .msb-header {
        height: 50PX;
        padding:0 16PX;
        .header-left {
            img {
                height:26PX;
            }
        }
        .header-right {
            i {
                font-size: 20PX;

            }
        }
    }
    /deep/.el-drawer__header {
        padding:20PX 20PX 0;
    }
    /deep/.el-tree-node__content {
        height: 40PX;
    }
    /deep/.el-tree-node__label {
        font-size: 14PX;
    }
    .mobile-menu {
        display: block;
    }
    .drawer-box {
        padding:0 20PX 20PX;
        min-height: 100PX;
        .login-box {
            button {
                width: 100%;
                height:35PX;
                &.register-btn {
                    background-color: var(--color-green-);
                    margin-top:16PX;
                }
            }
        }
        .hr {
            margin:20PX 0;
        }
        .menu-box {
            ul {
                list-style: none;
                .menu-li {
                    height:40PX;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
}
</style>