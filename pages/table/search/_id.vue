<template>
  <vo-page-layout
    :tabs="tabs"
    :active-tab="activeTab"
    @tabChange="changeTab">
    <div slot="head">
      <h1>单号：{{ $route.params.id }}</h1>
    </div>
    <div slot="content">
      <keep-alive>
        <component :is="activeComponent"></component>
      </keep-alive>
    </div>
  </vo-page-layout>
</template>

<script>
import VoPageLayout from 'components/page/PageLayout'
import VoBasicInfo from 'components/business/basicInfo'
import VoProductList from 'components/business/productList'

export default {
  layout({ store }) {
    return store.state.globalLayout
  },

  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },

  components: {
    VoPageLayout,
    VoBasicInfo,
    VoProductList
  },

  data() {
    return {
      activeComponent: 'VoBasicInfo',
      activeTab: '1',
      tabs: [
        {
          key: '1',
          title: '基本信息',
          component: 'VoBasicInfo'
        },
        {
          key: '2',
          title: '商品列表',
          component: 'VoProductList'
        }
      ]
    }
  },

  methods: {
    changeTab(curr) {
      this.activeTab = curr
      this.activeComponent = this.tabs.find(s => s.key === curr).component
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
