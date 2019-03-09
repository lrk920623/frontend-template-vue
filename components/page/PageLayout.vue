<template>
  <div class="vo-page-layout">
    <vo-page-header
      :title="headerTitle">
      <slot
        slot="search"
        name="searchBox" />

      <slot name="head" />

      <div
        v-if="tabs.length"
        slot="pageTabs"
        class="page-menu-tabs">
        <a-tabs
          :active-key="activeTab"
          :tab-bar-style="{margin: 0}"
          @change="(curr) => $emit('tabChange', curr)">
          <a-tab-pane
            v-for="item in tabs"
            :key="item.key"
            :tab="item.title"></a-tab-pane>
        </a-tabs>
      </div>
    </vo-page-header>
    <div class="content">
      <vo-card>
        <slot name="content" />
      </vo-card>
    </div>

    <slot />
  </div>
</template>

<script>
import VoCard from 'components/basic/Card'
import VoPageHeader from 'components/page/PageHeader'

export default {
  name: 'VoPageLayout',

  components: {
    VoCard,
    VoPageHeader
  },

  props: {
    headerTitle: {
      type: String,
      required: false,
      default: ''
    },

    tabs: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },

    activeTab: {
      type: String,
      required: false,
      default: '0'
    }
  }
}
</script>

<style lang="less">
.content {
  margin: 24px 24px 0;

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
.page-menu-search {
  text-align: center;
  margin-bottom: 16px;
}
.page-menu-tabs {
  margin-top: 48px;
}
</style>
