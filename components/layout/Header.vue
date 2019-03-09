<template>
  <a-layout-header class="vo-header">
    <div class="header">
      <vo-toggle-menu></vo-toggle-menu>
      <vo-user-menu class="header-index-right"></vo-user-menu>
    </div>
  </a-layout-header>
</template>

<script>
import VoToggleMenu from '../business/MenuToggle'
import VoUserMenu from '../menu/UserMenu'

export default {
  name: 'VoHeader',
  components: { VoToggleMenu, VoUserMenu }
}
</script>

<style scoped lang="less">
.vo-header {
  font-size: 16px;
  background: #ffffff;
}
</style>
