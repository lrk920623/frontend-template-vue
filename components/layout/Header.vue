<template>
  <a-layout-header class="vo-header">
    <div class="header">
      <v-toggle-menu></v-toggle-menu>
      <v-user-menu class="header-index-right"></v-user-menu>
    </div>
  </a-layout-header>
</template>

<script>
import VToggleMenu from '../basic/MenuToggle'
import VUserMenu from '../menu/UserMenu'

export default {
  name: 'VHeader',
  components: { VToggleMenu, VUserMenu }
}
</script>

<style scoped lang="less">
.vo-header {
  font-size: 16px;
  background: #ffffff;
}
</style>
