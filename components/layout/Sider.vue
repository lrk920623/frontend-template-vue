<template>
  <a-layout-sider
    class="sider"
    :width="siderWidth"
    :collapsed="menuCollapsed">
    <slot />
    <vo-menu
      :menus="menuList"
      :collapsed="menuCollapsed"></vo-menu>
  </a-layout-sider>
</template>

<script>
import { mapState } from 'vuex'
import VoMenu from '../menu/Menu'
import { style } from 'utils/constant'

export default {
  name: 'VoSider',

  components: {
    VoMenu
  },

  data: function() {
    return {
      siderWidth: style.siderWidth
    }
  },

  computed: {
    ...mapState(['menuCollapsed', 'menuList'])
  }
}
</script>
