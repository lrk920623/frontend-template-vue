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
          name: '商品淘汰管理',
          icon: 'form',
          route: 'outManage',
          child: [
            {
              route: 'outManage-apply',
              name: '商品淘汰申请'
            },
            {
              route: 'outManage-publish',
              name: '华商月度淘汰商品公布'
            }
          ]
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
            },
            {
              route: 'form-step',
              name: '分步表单'
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
        },
        {
          name: '可视化',
          icon: 'bar-chart',
          route: 'chart',
          child: [
            {
              route: 'chart-bar',
              name: '柱状图'
            }
          ]
        },
        {
          name: '基础组件',
          icon: 'appstore',
          route: 'component'
        }
      ]
    }
  },

  computed: {
    ...mapState(['menuCollapsed'])
  }
}
</script>
