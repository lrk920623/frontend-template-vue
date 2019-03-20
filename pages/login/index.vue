<template>
  <div class="login-container">
    <div class="top">
      <div class="header">
        <a href="/">
          <img
            src="~/assets/logo.svg"
            class="logo"
            alt="logo">
          <span class="title">Template Project</span>
        </a>
      </div>
      <div class="desc">
        Voyageone 前端模板工程
      </div>
    </div>
    <div class="main">
      <a-form
        id="formLogin"
        ref="formLogin"
        class="user-layout-login"
        :form="form">
        <a-form-item>
          <a-input
            v-decorator="[
              'username',
              {rules: [{ required: true, message: '请输入帐户名' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
            ]"
            size="large"
            type="text"
            placeholder="帐户名 / admin">
            <a-icon
              slot="prefix"
              type="user"
              :style="{ color: 'rgba(0,0,0,.25)' }"></a-icon>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
            ]"
            size="large"
            type="password"
            autocomplete="false"
            placeholder="密码 / admin">
            <a-icon
              slot="prefix"
              type="lock"
              :style="{ color: 'rgba(0,0,0,.25)' }"></a-icon>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-checkbox v-decorator="['rememberMe']">
            自动登陆
          </a-checkbox>
          <nuxt-link
            :to="{ name: 'recover', params: { user: 'aaa'} }"
            class="forge-password"
            style="float: right;">
            忘记密码
          </nuxt-link>
        </a-form-item>

        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
            @click.stop.prevent="handleSubmit">
            确定
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from 'utils/util'
import { setSession } from 'utils/storage'
import { user } from 'utils/constant'

export default {
  data() {
    return {
      loginBtn: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false
      }
    }
  },
  methods: {
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },

    handleSubmit() {
      const {
        form: { validateFields },
        state
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['username', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          loginParams.password = values.password
          // Login(loginParams)
          //   .then(res => this.loginSuccess(res))
          //   .catch(err => this.requestFailed(err))
          //   .finally(() => {
          //     state.loginBtn = false
          //   })
          this.loginSuccess()
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },

    loginSuccess(res) {
      // save token
      console.log(localStorage)
      setSession(user.token, 'token')

      this.$router.push({ name: 'home' })
      this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`
      })
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '错误',
        description:
          ((err.response || {}).data || {}).message ||
          '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  min-height: 100%;
  background: #f0f2f5 url('~assets/background.svg') no-repeat 50%;
  background-size: 100%;
  padding: 110px 0 144px;
  position: relative;

  .top {
    text-align: center;

    .header {
      height: 44px;
      line-height: 44px;

      .badge {
        position: absolute;
        display: inline-block;
        line-height: 1;
        vertical-align: middle;
        margin-left: -12px;
        margin-top: -10px;
        opacity: 0.8;
      }

      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
        border-style: none;
      }

      .title {
        font-size: 33px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
}

.main {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;

  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
}
</style>
