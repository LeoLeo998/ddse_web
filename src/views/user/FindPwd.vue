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
      <div class="content">
        <p class="title">忘记密码</p>
        <el-form class="content" :rules="rules" :model="user" ref="form">
          <div v-if="step === 1" style="width:100%">
            <ul class="login-type">
              <li :class="type == 1 && 'active'" @click="type = 1">手机账户</li>
              <div class="line"></div>
              <li :class="type == 2 && 'active'" @click="type = 2">邮箱账户</li>
            </ul>
            <el-form-item prop="account">
              <div class="row row2">
                <label for="">{{ type === 1 ? '手机号码' : '邮箱/子账号' }}</label>
                <div class="flex-center-between">
                  <div>
                    <el-input v-if="type == 1" type="number" placeholder="手机" v-model="user.account" class="input-with-select" style="width:350px">
                      <template slot="prepend">
                        <VueCountryIntl schema="popover" v-model="user.code">
                          <button type="button" slot="reference">+{{ user.code }}</button>
                        </VueCountryIntl>
                      </template>
                    </el-input>
                    <el-input v-else label="email" size="large" v-model="user.account" placeholder="邮箱/子账号" clearable style="width:350px" />
                  </div>
                  <el-button class="submit-btn" :class="sendDisable ? 'submit-btn-dis' : 'submit-btn'" type="success" @click="sendMsg" :disabled="sendDisable" style="width:130px">{{ sendText }}</el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <div class="row row2">
                <label for="">验证码</label>
                <el-input size="large" v-model="user.verifyCode" placeholder="" />
              </div>
            </el-form-item>
            <div class="row row2">
              <el-button class="submit-btn" type="success" @click="stepNext">确认</el-button>
            </div>
          </div>
          <div v-else style="width:100%">
            <div class="row row2">
              <el-form-item prop="password">
                <el-input label="email" size="large" type="password" show-password v-model="user.password" placeholder="新密码" clearable style="margin:10px 0" />
              </el-form-item>
              <el-form-item prop="re_password">
                <el-input label="email" size="large" type="password" show-password v-model="user.re_password" placeholder="确认密码" clearable style="margin:10px 0" />
              </el-form-item>
            </div>
            <div class="row row2">
              <el-button class="submit-btn" type="success" @click="submitClick">确认</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { setCookie, getCookie } from '@/common/cookie'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      var passReg = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}/
      let emailReg = /^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4}(,[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4})*$/
      let text = ''
      if (rule.field === 'account') {
        text = '账户'
      } else if (rule.field === 'password' || rule.field === 're_password') {
        text = '密码'
      } else if (rule.field === 'verifyCode') {
        text = '验证码'
      }
      if (value === '') {
        callback(new Error(`${text}不可为空`))
      }
      if (this.step !== 1 && rule.field === 'password' && !passReg.test(value)) {
        callback(new Error('密码长度至少8位，最多20位, 必须包括数字和字母'))
      }
      if (this.step !== 1 && rule.field === 're_password' && value !== this.user.password) {
        callback(new Error('密码输入不一致'))
      }
      if (rule.field === 'account' && this.type == 2 && !emailReg.test(value)) {
        callback(new Error('请检查邮箱格式'))
      }
      callback()
    }
    return {
      type: 1,
      showInv: false,
      sendText: '发送验证码',
      sendDisable: false,
      step: 1,
      user: {
        code: '65',
        account: '',
        password: '',
        verifyCode: '',
        invCode: '',
        re_password: '',
        password: ''
      },
      rules: {
        account: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        verifyCode: [{ validator: validatePass, trigger: 'blur' }],
        re_password: [{ validator: validatePass, trigger: 'blur' }]
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
    ...mapActions(['loginFetch', 'getPasswordVerifyCodeFetch', 'setNewPasswordFetch']),
    ...mapMutations(['setIsLogin']),
    stepNext() {
      this.$refs['form'].validate(valid => {
        if (!valid) return false
        this.step = 2
      })
    },
    async sendMsg() {
      let reg = new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')
      if (this.type == 2 && !reg.test(this.user.account)) {
        this.$message.error('请检查邮箱格式')
        return true
      }
      let res = await this.getPasswordVerifyCodeFetch({
        account: this.type == 1 ? this.user.code + this.user.account : this.user.account
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
    inspect() {
      let reg = new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')
      if (this.type == 2 && !this.user.account) {
        this.$message.error('请输入正确的邮箱地址')
        return true
      } else if (!this.user.verifyCode) {
        this.$message.error('请输入验证码')
        return true
      } else if (this.type == 2 && !reg.test(this.user.account)) {
        this.$message.error('请检查邮箱格式')
        return true
      }
      return false
    },
    submitClick() {
      this.$refs['form'].validate(async valid => {
        if (!valid) return false
        let res = await this.setNewPasswordFetch({
          re_password: this.user.re_password,
          password: this.user.password,
          verifyCode: this.user.verifyCode
        })
        if (res.status == 200) {
          this.$message.success('密码重置成功，正在跳转登录')
          this.$router.push('/login')
        } else {
          this.$message.error(res.msg)
        }
      })
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
    padding: 0;
    width: 70px;
    text-align: center;
    border: none;
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
      width: 500px;
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
        &.row2 {
          // margin-bottom: 30px;
        }
        .send-btn {
          width: 70px;
          height: 40px;
          border: none;
          background: transparent;
          cursor: pointer;
        }
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
            height: 50px;
            background: #f5f6f7;
            border: none;
          }
        }
        .submit-btn {
          width: 100%;
          height: 48px;
          background: #2dbd96;
          border: none;
          margin: 0 0 !important;
        }
        .submit-btn-dis {
          background: #f5f6f7;
          color: #909399;
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
