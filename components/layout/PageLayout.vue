<template>
  <div
    class="vo-page-layout"
    :class="{ 'tab-page': tab }">
    <vo-page-header
      :title="headerTitle">
      <slot
        slot="search"
        name="searchBox" />

      <slot
        slot="head"
        name="head" />
    </vo-page-header>

    <div
      v-if="tab"
      class="page-tabs">
      <slot name="tabs" />
    </div>

    <div
      v-else
      class="content">
      <slot name="content" />
    </div>

    <slot />
  </div>
</template>

<script>
import VoPageHeader from 'components/layout/PageHeader'

export default {
  name: 'VoPageLayout',

  components: {
    VoPageHeader
  },

  props: {
    headerTitle: {
      type: String,
      required: false,
      default: ''
    },

    tab: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="less">
.tab-page .page-header {
  border-bottom: 0;
}

.vo-page-layout {
  .page-tabs {
    .content {
      margin-top: 24px;
      padding: 0;
    }

    .ant-tabs-top-bar {
      background: #fff;

      .ant-tabs-nav {
        margin-left: 24px;
      }
    }

    .ant-tabs-top-content > .ant-tabs-tabpane {
      min-height: 500px;
      margin-top: 24px !important;
    }

    .page-detail {
      background: @basic-background-gray-color;

      .vo-search-box {
        margin: 0 32px;
        padding: 0;
      }
    }
  }

  .content {
    margin-top: 24px;
    padding: 24px 24px 0;
    background: #fff;

    .table-operator {
      margin-bottom: 18px;

      button {
        margin-right: 8px;
      }
    }

    .link {
      margin-top: 16px;

      &:not(:empty) {
        margin-bottom: 16px;
      }
      a {
        margin-right: 32px;
        height: 24px;
        line-height: 24px;
        display: inline-block;

        i {
          font-size: 24px;
          margin-right: 8px;
          vertical-align: middle;
        }
        span {
          height: 24px;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
}
.page-menu-search {
  text-align: center;
  margin-bottom: 16px;
}
</style>
