<template>
  <div class="msb-login">
    <div class="login-bg">
      <div class="home" @click="$router.push('/')">
        MSB LOGO
      </div>
      <img src="/static/images/login-banner.png" alt="" />
    </div>
    <div class="form-box">
      <div class="go-register">
        <span>还没有账号？</span>
        <router-link to="/register">
          去注册
        </router-link>
      </div>
      <el-form class="content" :rules="rules" :model="user" ref="login">
        <p class="title">登录</p>
        <ul class="login-type">
          <li :class="type == 1 && 'active'" @click="type = 1">手机登录</li>
          <div class="line"></div>
          <li :class="type == 2 && 'active'" @click="type = 2">邮箱登录</li>
        </ul>
        <el-form-item prop="account">
          <div class="row">
            <label for="">{{ type === 1 ? '手机号码' : '邮箱/子账号' }}</label>
            <el-input v-if="type == 1" type="number" v-model="user.account" class="input-with-select">
              <template slot="prepend">
                <VueCountryIntl schema="popover" v-model="user.code">
                  <button type="button" slot="reference">+{{ user.code }}</button>
                </VueCountryIntl>
              </template>
              <!-- <vue-country-intl v-model="user.code"></vue-country-intl> -->
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
            <label for="">登录密码</label>
            <el-input size="large" type="password" show-password v-model="user.password" clearable />
          </div>
        </el-form-item>

        <div class="row">
          <el-button class="submit-btn" type="success" @click="submitClick('login')">登录</el-button>
        </div>
        <div class="row">
          <div class="forget">
            <el-button type="text" @click="$router.push('/FindPwd')">忘记密码?</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import FormatInput from '@/components/FormatInput'
import { mapGetters, mapActions, mapMutations } from 'vuex'
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
      user: {
        code: '65',
        account: '',
        password: '',
        invCode: ''
      },
      rules: {
        account: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
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
    ...mapActions(['loginFetch']),
    ...mapMutations(['setIsLogin']),
    checkType() {
      if (this.type == 1) {
        this.$router.push('/register')
      } else {
        this.$router.push('/login')
      }
    },
    submitClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.firstLogin()
        } else {
          return false
        }
      })
    },
    inspect() {
      let reg = new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')
      if (!this.user.account) {
        this.$toast.error('请输入账号')
        return true
      }
      if (this.type == 2 && !this.user.account) {
        this.$toast.error('请输入正确的邮箱地址')
        return true
      } else if (!this.user.password) {
        this.$toast.error('请输入您的密码')
        return true
      } else if (this.type == 2 && !reg.test(this.user.account)) {
        this.$toast.error('请检查邮箱格式')
        return true
      }
      return false
    },
    async firstLogin() {
      let account = this.type == 1 ? String(this.user.code) + String(this.user.account) : this.user.account
      let res = await this.loginFetch({
        account,
        password: this.user.password
      })
      if (res.status == 200) {
        setCookie('userToken', res.token, 36000)
        this.setIsLogin(true)
        this.$message.success('登录成功')
        this.$router.push('/exchange')
      } else {
        this.$message.error(res.msg)
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
  .el-form-item__content {
    line-height: 16px;
  }
  .el-form-item {
    width: 100%;
    margin-bottom: 20px;
  }
  .login-bg {
    position: relative;
    flex: 0 0 41.6667%;
    max-width: 41.6667%;
    inset: 0px;
    z-index: -1;
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
    .go-register {
      position: absolute;
      right: 100px;
      top: 60px;
      a {
        color: #2dbd96;
        cursor: pointer;
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
      .row {
        width: 100%;
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
            background: #f5f6f7;
            border: none;
            height: 50px;
          }
        }
        .submit-btn {
          width: 100%;
          height: 50px;
          background: rgb(45, 189, 150);
          margin-top: 30px;
        }
        .forget {
          text-align: right;
          .el-button {
            color: rgba(0, 20, 42, 0.6);
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
