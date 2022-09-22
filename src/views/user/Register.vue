<template>
  <div class="msb-login">
    <div class="login-bg">
      <div class="home" @click="$router.push('/')">
        MSB LOGO
      </div>
      <img src="/static/images/login-banner.png" alt="" />
    </div>
    <div class="form-box">
      <div class="go-login">
        <span>已有账号？</span>
        <router-link to="/login">
          去登录
        </router-link>
      </div>
      <el-form class="content" :rules="rules" :model="user" ref="register">
        <p class="title">注册</p>
        <ul class="login-type">
          <li :class="type == 1 && 'active'" @click="type = 1">手机注册</li>
          <div class="line"></div>
          <li :class="type == 2 && 'active'" @click="type = 2">邮箱注册</li>
        </ul>
        <el-form-item prop="account">
          <div class="row">
            <label for="">{{ type === 1 ? '手机号码' : '邮箱' }}</label>
            <el-input v-if="type == 1" type="number" v-model="user.account" class="input-with-select">
              <template slot="prepend">
                <VueCountryIntl schema="popover" v-model="user.code">
                  <button type="button" slot="reference">+{{ user.code }}</button>
                </VueCountryIntl>
              </template>

              <!-- <el-select v-model="user.code" slot="prepend" filterable placeholder="请选择">
                                <el-option
                                  v-for="item in cityCode"
                                  :key="item.code + item.en"
                                  :label="item.code"
                                  :value="item.code">
                                  <span style="float: left">{{ item.en }}</span>
                                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                                </el-option>
                            </el-select> -->
            </el-input>
            <el-input v-else label="email" size="large" v-model="user.account" clearable />
          </div>
        </el-form-item>

        <el-form-item prop="password">
          <div class="row">
            <label for="">设置登录密码</label>
            <el-input size="large" type="password" show-password v-model="user.password" clearable />
          </div>
        </el-form-item>

        <el-form-item prop="verifyCode">
          <div class="row">
            <label for="">验证码</label>
            <el-input type="number" v-model="user.verifyCode">
              <template slot="append">
                <div class="send-btn" :class="sendDisable && 'disabled'" @click="sendMsg">{{ sendText }}</div>
              </template>
            </el-input>
          </div>
        </el-form-item>

        <div class="row">
          <label for="">邀请码（选填）</label>
          <el-input size="large" type="text" v-model="user.invCode" clearable />
        </div>
        <!-- <div class="row">
                    
                </div> -->
        <div class="row checkedbox">
          <el-form-item prop="read">
            <el-checkbox v-model="user.read">我已阅读并同意 <a href="" class="agreement">服务协议</a></el-checkbox>
          </el-form-item>
          <el-button class="submit-btn" type="success" @click="submitClick('register')">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import FormatInput from '@/components/FormatInput'
import { mapGetters, mapActions } from 'vuex'
import { setCookie, getCookie } from '@/common/cookie'
import { cityCode } from '@/common/code'
export default {
  components: {
    FormatInput
  },
  data() {
    var validatePass = (rule, value, callback) => {
      var passReg = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}/
      let emailReg = /^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4}(,[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4})*$/
      let text = ''
      if (rule.field === 'account') {
        text = '账户'
      } else if (rule.field === 'password') {
        text = '密码'
      } else if (rule.field === 'verifyCode') {
        text = '验证码'
      }
      if (rule.field === 'read' && !value) {
        callback(new Error(`请阅读协议并勾选`))
      }
      if (value === '') {
        callback(new Error(`${text}不可为空`))
      }
      if (rule.field === 'password' && !passReg.test(value)) {
        callback(new Error('密码长度至少8位，最多20位, 必须包括数字和字母'))
      }
      if (rule.field === 'account' && this.type == 2 && !emailReg.test(value)) {
        callback(new Error('请检查邮箱格式'))
      }
      callback()
    }
    return {
      cityCode,
      type: 1,
      showInv: false,
      sendText: '发送',
      sendDisable: false,
      user: {
        code: '65',
        account: '',
        password: '',
        invCode: '',
        verifyCode: '',
        read: false
      },
      rules: {
        account: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        verifyCode: [{ validator: validatePass, trigger: 'blur' }],
        read: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['getIsLogin'])
  },
  created() {
    if (getCookie('userToken')) {
      this.$router.go(-1)
      return
    }
  },
  methods: {
    ...mapActions(['registerFetch', 'verifyCodeFetch']),
    async sendMsg() {
      if (this.sendDisable) {
        return
      }
      let reg = /^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4}(,[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4})*$/
      if (this.type == 2 && !reg.test(this.user.account)) {
        this.$message.error('请检查邮箱格式')
        return
      }
      if (this.type == 1 && !this.user.account) {
        this.$message.error('请输入手机号码')
        return
      }
      let account = this.type == 1 ? String(this.user.code) + String(this.user.account) : this.user.account
      let res = await this.verifyCodeFetch({
        account
      })
      if (res.status == 200) {
        this.timerStart()
        this.user.verifyCode = res.code
        setCookie('phoneToken', res.token, 36000)
      } else {
        this.$message.error(res.msg)
      }
    },
    timerStart() {
      this.sendDisable = true
      this.sendText = 60
      let timer = setInterval(() => {
        if (this.sendText <= 1) {
          this.sendText = '发送'
          this.sendDisable = false
          clearInterval(timer)
        } else {
          this.sendText--
        }
      }, 1000)
    },
    submitClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerClick()
        } else {
          return false
        }
      })
    },
    async registerClick() {
      let account = this.type == 1 ? String(this.user.code) + String(this.user.account) : this.user.account
      let res = await this.registerFetch({
        ...this.user,
        account
      })
      if (res.status == 200) {
        // this.$router.push({name:'LoginVe',params:this.user})
        this.$message.success('注册成功，正在跳转登录')
        this.$router.push('/login')
      } else {
        this.$message.error(res.msg)
      }
    }
  },
  watch: {
    $route(v) {
      if (v.name === 'Login') {
        this.type = 1
      } else {
        this.type = 2
      }
    }
  }
}
</script>
<style lang="less">
.msb-login {
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  z-index: 100;
  //height: calc(~"100vh - 65px");
  height: 100vh;
  .el-input-group__prepend .vue-country-popover-container button {
    border: none;
    background: transparent;
    width: 70px;
    cursor: pointer;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    border: none;
    padding: 0;
    width: 70px;
    text-align: center;
  }
  .el-input-group__append {
    padding: 0;
  }
  .el-form-item__content {
    line-height: 16px;
  }
  .el-form-item {
    width: 100%;
    margin-bottom: 20px;
  }
  .el-checkbox__label {
    font-size: 12px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: rgb(45, 189, 150);
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: rgb(45, 189, 150);
  }
  .login-bg {
    flex: 0 0 41.6667%;
    max-width: 41.6667%;
    inset: 0px;
    z-index: 100;
    display: flex;
    .home {
      position: absolute;
      left: 40px;
      top: 20px;
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
    .go-login {
      position: absolute;
      right: 100px;
      top: 60px;
      a {
        color: #2dbd96;
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
        margin-bottom: 40px;
      }
      .login-type {
        display: flex;
        text-align: left;
        justify-content: flex-start;
        align-items: center;
        list-style: none;
        width: 100%;
        margin-bottom: 40px;
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
          color: rgb(45, 189, 150);
        }
      }
      .checkedbox {
        margin-top: 30px;
        .agreement {
          color: rgba(0, 20, 42, 0.6);
          font-size: 12px;
        }
        .el-form-item {
          margin-bottom: 18px;
        }
      }
      .row {
        width: 100%;
        label {
          font-size: 12px;
          color: rgba(0, 20, 42, 0.6);
          margin-bottom: 6px;
          display: inline-block;
        }
        .send-btn {
          width: 70px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border: none;
          background: transparent;
          cursor: pointer;
          &.disabled {
            cursor: not-allowed;
          }
        }
        .el-select .el-input {
          width: 100px;
        }
        .el-input {
          input {
            height: 50px;
            background: #f5f6f7;
            border: none;
          }
        }
        .submit-btn {
          width: 100%;
          height: 50px;
          background: rgb(45, 189, 150);
          //margin-top:30px;
        }
        .forget {
          text-align: right;
          a {
            color: rgba(0, 20, 42, 0.6);
          }
        }
      }
    }
  }
}
</style>
