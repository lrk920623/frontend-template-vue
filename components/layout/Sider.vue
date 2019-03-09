<template>
  <a-layout-sider
    class="sider"
    :width="siderWidth"
    :collapsed="menuCollapsed">
    <slot />
    <vo-menu
      :menus="menus"
      :collapsed="menuCollapsed"></vo-menu>
  </a-layout-sider>
</template>

<script>
import { mapState } from 'vuex'
import VoMenu from '../menu/Menu'
import { style } from '../../utils/constant'

export default {
  name: 'VoSider',

  components: {
    VoMenu
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
            },
            {
              route: 'table-innerEdit',
              name: '内联编辑表格'
            },
            {
              route: 'table-nest',
              name: '嵌套表格'
            }
          ]
        },
        {
          name: '表单页',
          icon: 'form',
          route: 'form',
          child: [
            {
              route: 'form-basic',
              name: '基础表单'
            }
          ]
        },
        {
          name: '对话框',
          icon: 'star',
          route: 'star',
          child: [
            {
              route: 'modal-basicModal',
              name: '基础对话框'
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
