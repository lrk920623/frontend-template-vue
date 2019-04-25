<template>
  <a-layout class="vo-container hs-old-layout">
    <a-layout-header>
      <vo-logo :title="'企 业 参 谋'"></vo-logo>
    </a-layout-header>
    <a-layout>
      <vo-sider>
        <div
          class="icon-box"
          :style="{width: menuCollapsed ? '80px' : '220px'}"
          @click="toggle(!menuCollapsed)">
          <a-icon
            class="trigger"
            :type="'align-center'"></a-icon>
        </div>
      </vo-sider>
      <a-layout-content>
        <nuxt></nuxt>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import VoSider from 'components/layout/Sider'
import VoLogo from 'components/business/Logo'
import { CHANGE_MENU_COLLAPSED } from 'utils/types/mutation-types'
export default {
  components: {
    VoSider,
    VoLogo
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

<style lang="less">
.ant-menu {
  background: #42485a;
}

.vo-container.hs-old-layout {
  .ant-layout-header {
    padding: 0;
    overflow: hidden;
    position: fixed;
    width: 100%;
    z-index: 200;
  }

  .ant-layout-sider {
    position: fixed;
    top: 64px;
    height: 100%;
  }

  .ant-layout-content {
    margin-left: 230px;
    margin-top: 64px;
  }

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
