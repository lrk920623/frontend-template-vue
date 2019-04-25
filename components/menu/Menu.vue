<template>
  <a-menu
    :selected-keys="[activeMenu]"
    :inline-collapsed="collapsed"
    :open-keys="openKeys"
    :mode="mode"
    theme="dark"
    @openChange="onOpenChange">
    <template v-for="item in menus">
      <template v-if="item.child">
        <a-sub-menu :key="item.route">
          <span slot="title">
            <a-icon :type="item.icon"></a-icon>
            <span>{{ item.name }}</span>
          </span>
          <template v-for="sub in item.child">
            <a-menu-item :key="sub.route">
              <nuxt-link :to="{name: sub.route}">
                {{ sub.name }}
              </nuxt-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item :key="item.route">
          <nuxt-link :to="{name: item.route}">
            <a-icon :type="item.icon"></a-icon>
            <span>{{ item.name }}</span>
          </nuxt-link>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script>
export default {
  name: 'VoMenu',

  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },

    menus: {
      type: Array,
      required: true
    },

    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data: function() {
    return {
      openKeys: [],
      cachedOpenKeys: [],
      activeMenu: ''
    }
  },

  watch: {
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat()
        this.openKeys = []
      } else this.openKeys = this.cachedOpenKeys
    },

    $route: {
      handler: function(val) {
        const activeMenuParent = [],
          currentRoute = val.name

        this.menus.forEach(s => {
          if (!s.child) {
            if (currentRoute.includes(s.route)) this.activeMenu = s.route

            return
          }

          const active = s.child.find(c => currentRoute.includes(c.route))
          if (active) {
            activeMenuParent.push(s.route)
            this.activeMenu = active.route
          }
        })

        this.openKeys = activeMenuParent
      },

      immediate: true
    }
  },

  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      this.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }
}
</script>

<style scoped>
.ant-menu-sub > .ant-menu-item {
  padding-left: 52px !important;
}
</style>
