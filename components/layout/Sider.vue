<template>
  <a-layout-sider
    class="sider"
    :width="siderWidth"
    :collapsed="menuCollapsed">
    <slot />
    <v-menu
      :menus="menus"
      :collapsed="menuCollapsed"></v-menu>
  </a-layout-sider>
</template>

<script>
import { mapState } from 'vuex'
import VMenu from '../menu/Menu'
import { style } from '../../utils/constant'

export default {
  name: 'VSider',

  components: {
    VMenu
  },

  data: function() {
    return {
      siderWidth: style.siderWidth,

      menus: [
        {
          route: 'home',
          name: '首页',
          icon: 'dashboard'
        },
        {
          route: 'table',
          name: '列表页',
          icon: 'table',
          child: [
            {
              route: 'table-search',
              name: '查询表格'
            }
          ]
        },
        {
          name: '一级菜单 2',
          icon: 'read',
          route: 'factoryLicence',
          child: [
            {
              route: 'factories',
              name: '二级菜单 2'
            }
          ]
        }
      ]
    }
  },

  computed: {
    ...mapState(['menuCollapsed'])
  }
}
</script>
