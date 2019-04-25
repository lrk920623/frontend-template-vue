<template>
  <div class="user-wrapper">
    <span class="action">
      <a-icon type="question-circle-o"></a-icon>
    </span>
    <vo-header-notice class="action"></vo-header-notice>
    <a-dropdown>
      <span class="action ant-dropdown-link user-dropdown-menu">
        <span style="font-weight: bold">
          IVERSON
        </span>
      </span>
      <a-menu
        slot="overlay"
        class="user-dropdown-menu-wrapper">
        <a-menu-item key="0">
          <nuxt-link :to="{ name: 'center' }">
            <a-icon type="user"></a-icon>
            <span>个人中心</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="1">
          <nuxt-link :to="{ name: 'settings' }">
            <a-icon type="setting"></a-icon>
            <span>账户设置</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item
          key="2"
          disabled>
          <a-icon type="setting"></a-icon>
          <span>测试</span>
        </a-menu-item>
        <a-menu-divider></a-menu-divider>
        <a-menu-item key="3">
          <a
            href="javascript:void(0)"
            @click="handleLogout">
            <a-icon type="logout"></a-icon>
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'
import VoHeaderNotice from '../business/HeaderNotice'
import { mapActions } from 'vuex'
import { removeSession } from 'utils/factory/storage'
import { user } from 'utils/constant'

export default {
  name: 'VoUserMenu',
  components: {
    VoHeaderNotice
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout() {
      const that = this

      Modal.confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          removeSession(user.token)

          return that.$axios
            .post('logout')
            .then(() => {
              window.location.reload()
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    }
  }
}
</script>

<style scoped>
</style>
