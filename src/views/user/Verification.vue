<template>
    <div class="verification-page">
        <div class="content">
            <h1 class="title">邮箱验证</h1>
            <p class="tips">请输入您在邮箱<span class="email"> {{user && user.email}} </span>收到的6位验证码，验证码30分钟有效</p>
            <p class="email-txt">邮箱验证码</p>
            <!-- <div class="verifi-code-box">

                <div class="item">
                    <input class="code-input" type="number" v-model="code[0]">
                </div>
                <div class="item">
                    <input class="code-input" type="number" v-model="code[1]">
                </div>
                <div class="item">
                    <input class="code-input" type="number" v-model="code[2]">
                </div>
                <div class="item">
                    <input class="code-input" type="number" v-model="code[3]">
                </div>
                <div class="item">
                    <input class="code-input" type="number" v-model="code[4]">
                </div>
                <div class="item">
                    <input class="code-input" type="number" v-model="code[5]">
                </div>
            </div> -->
            <div class="verifi-code-box">
                <!-- <p class="tip">邮箱验证码</p> -->
                <input type="number" v-model="code" @input="codeInput">
                <p class="tip2">输入您邮箱收到的6位验证码</p>
            </div>
            <p :class="isClick ? 'txt txt1' : 'txt disable'" @click="sendEmail">重新发送邮件<span v-if="second">（{{second}}s）</span></p>
            <p class="txt txt2">未收到验证码？</p>
            <button class="submit-code" @click="submitClick">
                提交
            </button>
            <!-- <p class="err-txt"></p> -->
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    data () {
        return {
            email:'',
            code:'',
            user:{},
            second:60,
            timer:null,
            isClick:false,
        }
    },
    beforeDestroy () {
        clearInterval(this.timer);
    },
    watch:{
        // code (val) {
        //     console.log(val)
        // }
    },
    created () {
        if(!this.$route.params.email) {
            this.$toast.warning('已过期，请重新操作');
            this.$router.push('/login');
            return;
        }
        this.user = this.$route.params;
        this.init();
        
    },
    mounted () {
        // this.goNextInput();
        
    },
    methods:{
        ...mapMutations([
            "setIsLogin",
            "setUserName"
        ]),
        ...mapActions([
            "registerFetch",
            "emailFetch",
            "loginFetch"
        ]),
        submitClick () {
            if(this.code.length < 6) {
                this.$toast.error('验证码长度错误');
                return;
            }
            if(this.$route.path == '/register/verification/email') {
                if(!this.user) {
                    this.$router.push('/register')
                }
                this.register();
            }else if (this.$route.path == '/login/verification/email') {
                if(!this.user) {
                    this.$router.push('/login')
                }
                this.login();
            }
        },
        codeInput (v) {
            if(this.code.length >= 6) {
                this.code = this.code.slice(0,6);
                if(this.$route.path == '/register/verification/email') {
                    if(!this.user) {
                        this.$router.push('/register')
                    }
                    this.register();
                }else if (this.$route.path == '/login/verification/email') {
                    if(!this.user) {
                        this.$router.push('/register')
                    }
                    this.login();
                }
            }
        },
        async init (type) {
            let data = {
                "email": this.user.email
            }
            if(type) {
                let res = await this.emailFetch(data)
                if(res.code != 200) {
                    this.$toast.error('邮件发送失败，请重试');
                }
            }else {
                if(this.$route.path == '/register/verification/email') {
                    let res = await this.emailFetch(data)
                    if(res.code != 200) {
                        this.$toast.error('邮件发送失败，请重试');
                    }
                }
            }
            
            
            this.time();
        },
        time () {
            this.timer = null;
            this.timer = setInterval(() => {
                if(this.second <= 0) {
                    this.isClick = true;
                    this.second = 0;                    
                    clearInterval(this.timer);
                    return;
                }
                this.second--;
            },1000)
        },
        sendEmail () {
            this.second = 60;
            this.init(1);
            this.isClick = false;
        },
        async register () {
            let res = await this.registerFetch({
                "email": this.user.email,
                "pwd": this.user.password,
                "code": this.code
            })
            if(res.code == 200) {
                this.$toast('注册成功，跳转登录中');
                this.$router.push('/login')
                return;
            }
            this.$toast.error(res.msg);
        },
        async login () {
            console.log(this.user)
            let res = await this.loginFetch({
                data:{
                    "code": this.code
                },
                auth:btoa(this.user.email+":"+this.user.password)
                
            })
            if(res.code == 200) {
                this.$toast.success('登录成功，跳转中');
                localStorage.setItem('user_name',this.user.email)
                localStorage.setItem('isLogin',true)
                localStorage.setItem('bearer',res.data)
                this.setUserName(this.user.email)
                this.setIsLogin(true)
                this.$router.push('/wallet')
                return;
            }
            this.$toast.error(res.msg);
        },
        goNextInput(){
            let txts = document.querySelectorAll('.code-input');
            let that = this;
            for(let i = 0; i<txts.length;i++){
                let t = txts[i];
                t.index = i;
                t.setAttribute("readonly", true);
                t.onkeyup=function(){
                    this.value=this.value.replace(/^(.).*$/,'$1');
                    let next = this.index + 1;
                    if(next > txts.length - 1) {
                        if(that.$route.path == '/register/verification/email') {
                            if(!that.user) {
                                that.$router.push('/register')
                            }
                            that.register();
                        }else if (that.$route.path == '/login/verification/email') {
                            if(!that.user) {
                                that.$router.push('/register')
                            }
                            that.login();
                        }
                    }
                    txts[next].removeAttribute("readonly");
                    if (this.value) {
                        txts[next].focus();
                    }

                }
            }
            txts[0].removeAttribute("readonly");
        }
    }
}
</script>
<style lang="less" scoped>
.verification-page {
    display: flex;
    justify-content: center;
    .content {
        margin-top:100px;
        .title {
            font-weight: 600;
            font-size: 24px;
            line-height: 32px;
            color: #1E2329;
            margin-bottom: 16px;
        }
        .tips {
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 40px;
            color: rgb(71, 77, 87);
            .email {
                color:#03A66D;
            }
        }
        .email-txt {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
            color: rgb(71, 77, 87);
            margin-bottom: 16px;
        }
        .verifi-code-box {
            .tip {
                font-size: 16px;
                color:rgb(71, 77, 87);
            }
            input {
                width: 300px;
                height: 40px;
                outline: none;
                border: 1px solid rgb(234, 236, 239);
                border-radius:5px;
                padding:0 15px;
                margin:5px 0;
                &:focus {
                    border:1px solid #03A66D;
                }
                &[type=number] {  
                    -moz-appearance:textfield;  
                } 
                &[type=number]::-webkit-inner-spin-button,  
                &[type=number]::-webkit-outer-spin-button {  
                    -webkit-appearance: none;  
                    margin: 0;  
                } 
            }
            .tip2 {
                font-size: 14px;
                color:rgb(71, 77, 87);
            }
            // display: flex;
            // align-items: center;
            // .item {
            //     width: 40px;
            //     height: 40px;
            //     margin-right:25px;
            //     display: inline-flex;
            //     position: relative;
            //     height: 40px;
            //     -webkit-box-align: center;
            //     align-items: center;
            //     line-height: 1.6;
                
            //     border-radius: 4px;
                
            //     input {
            //         width: 100%;
            //         height: 100%;
            //         border-radius: 4px;
            //         border: none;
            //         outline: none;
            //         border: 1px solid rgb(234, 236, 239);
            //         text-align: center;
            //         &:hover {
            //         border-color:#dfa403;
            //     }
            //         &:focus {
            //             border:1px solid #dfa403;
            //         }
            //         &[type=number] {  
            //             -moz-appearance:textfield;  
            //         } 
            //         &[type=number]::-webkit-inner-spin-button,  
            //         &[type=number]::-webkit-outer-spin-button {  
            //             -webkit-appearance: none;  
            //             margin: 0;  
            //         } 
            //     }
            // }
        }
        .txt {
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            word-break: keep-all;
            color: #03A66D;
            border-radius: 4px;
            min-width: 52px;
            padding: 0px;
            cursor: pointer;
            &.txt1 {
                margin-top: 32px;
            }
            &.disable {
                margin-top: 32px;
                color:#ccc;
                cursor:not-allowed;
            }
            &.txt2 {
                margin-top: 24px;
            }
        }
        .submit-code {
            width:300px;
            height:40px;
            background-color: transparent;
            background-color: #03A66D;
            outline: none;
            border:none;
            margin-top:15px;
            border-radius: 5px;
            color:#fff;
            cursor: pointer;
            &:disabled {
                background-color: #beab75;
                color:#a1aebe;
            }
        }
    }
}
</style>