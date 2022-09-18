<template>
    <div class="msb-login">
        <div class="login-bg">
            <div class="home" @click="$router.push('/')">
                MSB LOGO
            </div>
            <img src="/static/images/login-banner.png" alt="">
        </div>
        <div class="form-box">
            <div class="content">
                <p class="title">登录</p>
                <ul class="login-type">
                    <li :class="type == 1 && 'active'" @click="type = 1">手机登录</li>
                    <div class="line"></div>
                    <li :class="type == 2 && 'active'" @click="type = 2">邮箱登录</li>
                </ul>
                <div class="row">
                    <label for="">{{type === 1 ? '手机号码' : '邮箱/子账号'}}</label>
                    <el-input v-if="type == 1" type="number" placeholder="请输入手机号码" v-model="user.email" class="input-with-select">
                        <el-select v-model="user.code" slot="prepend" placeholder="请选择">
                          <el-option label="+1" value="+1"></el-option>
                          <el-option label="+86" value="+86"></el-option>
                          <el-option label="+886" value="+886"></el-option>
                        </el-select>
                      </el-input>
                    <el-input v-else label="email" size="large" v-model="user.email" placeholder="请输入邮箱/子账号" clearable />
                </div>
                <div class="row">
                    <label for="">登录密码</label>
                    <el-input size="large" type="password" show-password v-model="user.password" placeholder="Please input Password" clearable />
                </div>
                <div class="row">
                    <el-button class="submit-btn" type="success" @click="submitClick">登录</el-button>
                </div>
                <div class="row">
                    <div class="forget">
                        <a href="">忘记密码？</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FormatInput from '@/components/FormatInput'
import { mapGetters,mapActions, mapMutations} from 'vuex';
import {setCookie, getCookie} from '@/common/cookie'
export default {
    components:{
        FormatInput
    },
    data () {
        return {
            type:1,
            showInv:false,
            user:{
                code:'+86',
                email:'',
                password:'',
                invCode:'',
            }
        }
    },
    computed:{
        ...mapGetters([
            "getIsLogin",
        ]),
    },
    created () {
        
        if(getCookie('userToken')) {
             this.$router.go(-1);
             return;
        }
    },
    methods:{
        ...mapActions([
            "loginFetch"
        ]),
        ...mapMutations([
            'setIsLogin'
        ]),
        checkType() {
            if(this.type == 1) {
                this.$router.push('/register')
            }else {
                this.$router.push('/login')
            }
        },
        submitClick() {
            let reg = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");

            // if(!this.user.email) {
            //     this.$toast.error('请输入正确的邮箱地址');
            //     return;
            // }else if(!this.user.password) {
            //     this.$toast.error('请输入您的密码');
            //     return;
            // }else if (!reg.test(this.user.email)) {
            //     this.$toast.error('请检查邮箱格式');
            //     return;
            // }
            this.firstLogin()
        },
        async firstLogin () {
            console.log(this.user)
            let res = await this.loginFetch({
                account:this.user.email,
                password:this.user.password
            });
            if(res.status == 200) {
                setCookie('userToken',res.token,36000)
                this.setIsLogin(true)
                this.$router.push('/exchange')
            }else {
                this.$toast.error('error');
            }
        }
    }
}
</script>
<style lang="less">
.msb-login {
    position: fixed;
    top:0;
    display: flex;
    width: 100%;
    //height: calc(~"100vh - 65px");
    height: 100vh;
    .login-bg {
        position: relative;
        flex: 0 0 41.6667%;
        max-width: 41.6667%;
        inset: 0px;
        z-index: -1;
        display: flex;
        .home {
            position: absolute;
            left:40px;
            top:20px;
            cursor: pointer;
        }
        img {
            width: 100%;
            flex: 1 1 50%;
            height: 100%;
            object-fit: cover;
            overflow: hidden;
        }
    }
    .form-box {
        height: 100%;
        background: rgb(255, 255, 255);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background: rgb(255, 255, 255);
        flex: 0 0 58.3333%;
        max-width: 58.3333%;
        .go-register {
            position: absolute;
            right:100px;
            top:100px;
            a {
                color:#2dbd96;
            }
        }
        .content {
            
            display: flex;
            width: 480px;
            align-items: center;
            justify-content: center;
            position: relative;
            flex-wrap: wrap;
            .title {
                width: 100%;
                font-size: 34px;
                margin-bottom:40px;
            }
            .login-type {
                display: flex;
                text-align: left;
                justify-content: flex-start;
                align-items: center;
                list-style: none;
                width: 100%;
                margin-bottom:40px;
                li {
                    font-size: 16px;
                    cursor: pointer;
                }
                .line {
                    width: 0px;
                    top: 6px;
                    height: 14px;
                    margin: 0px 12px;
                    border-style: solid;
                    border-image: initial;
                    border-color: rgba(0, 20, 42, 0.08);
                    border-width: 0px 1px 0px 0px;
                }
                &.active {
                    color:rgb(45, 189, 150);
                }
            }
            .row {
                width: 100%;
                margin-bottom:30px;
                label {
                    font-size: 12px;
                    color: rgba(0, 20, 42, 0.6);
                    margin-bottom: 6px;
                    display: inline-block;
                }
                .el-select .el-input {
                    width: 100px;
                }
                .el-input {
                    input {
                        height:50px;
                    }
                    
                }
                .submit-btn {
                    width: 100%;
                    height:50px;
                    background: rgb(45, 189, 150);
                    margin-top:30px;
                }
                .forget {
                    text-align: right;
                    a {
                        color:rgba(0, 20, 42, 0.6);
                    }
                }
            }
        }
    }
}
</style>