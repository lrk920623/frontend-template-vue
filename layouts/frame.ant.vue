<template>
  <a-layout class="vo-container">
    <v-sider>
      <v-logo></v-logo>
    </v-sider>
    <a-layout style="min-height: 100vh">
      <v-header></v-header>
      <a-layout-content>
        <nuxt></nuxt>
      </a-layout-content>
      <a-layout-footer>
        <v-page-footer></v-page-footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import VHeader from '../components/layout/Header'
import VSider from '../components/layout/Sider'
import VLogo from '../components/basic/Logo'
import VPageFooter from '../components/page/PageFooter'

export default {
  components: {
    VPageFooter,
    VHeader,
    VSider,
    VLogo
  }
}
</script>

<style lang="less">
body {
  // 打开滚动条固定显示
  overflow-y: scroll;

  &.colorWeak {
    filter: invert(80%);
  }
}

.layout.ant-layout {
  overflow-x: hidden;
}

.vo-container {
  .ant-layout-content {
    margin: 24px 24px 0;
    height: 100%;
    padding-top: 0;

    .vo-page-layout {
      margin: -24px -24px 0;
    }
  }

  .ant-layout-footer {
    padding: 0;
  }

  .trigger {
    font-size: 20px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .sider {
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    z-index: 10;
    position: fixed;
    height: 100%;

    & > ul {
      height: 100%;
    }

    .ant-layout-sider-children {
      overflow-y: auto;
    }
  }

  .header {
    height: 64px;
    padding: 0 12px 0 0;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: relative;
  }

  .header,
  .top-nav-header-index {
    .user-wrapper {
      float: right;
      height: 100%;

      .action {
        cursor: pointer;
        padding: 0 12px;
        display: inline-block;
        transition: all 0.3s;
        height: 100%;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }

        .icon {
          font-size: 16px;
          padding: 4px;
        }
      }
    }
  }
}
</style>
