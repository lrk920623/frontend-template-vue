<template>
  <a-layout class="vo-container hs-old-layout">
    <a-layout-header>
      <v-logo :title="'企 业 参 谋'"></v-logo>
    </a-layout-header>
    <a-layout>
      <v-sider>
        <div
          class="icon-box"
          :style="{width: menuCollapsed ? '80px' : '220px'}"
          @click="toggle(!menuCollapsed)">
          <a-icon
            class="trigger"
            :type="'align-center'"></a-icon>
        </div>
      </v-sider>
      <a-layout-content>
        <nuxt></nuxt>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import VSider from '../components/layout/Sider'
import VLogo from '../components/basic/Logo'
import { CHANGE_MENU_COLLAPSED } from '../types/mutation-types'
export default {
  components: {
    VSider,
    VLogo
  },

  computed: {
    ...mapState(['menuCollapsed'])
  },

  methods: {
    ...mapMutations({
      toggle: CHANGE_MENU_COLLAPSED
    })
  }
}
</script>

<style scoped lang="less">
.ant-menu {
  background: #42485a;
}

.hs-old-layout {
  .ant-menu-item {
    margin: 0 !important;
  }

  .ant-menu-item:hover {
    background-color: #363b42;
  }

  .ant-menu .ant-menu-item-selected {
    background-color: #1890ff;
  }

  .icon-box {
    color: #fff;
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #181f33;
    transition: width 0.2s;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
