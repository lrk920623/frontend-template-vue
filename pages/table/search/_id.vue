<template>
  <vo-page-layout :tab="true">
    <template slot="head">
      <vo-detail-back @back="back"></vo-detail-back>
      <div>
        <h1>单号：{{ $route.params.id }}</h1>
      </div>
    </template>
    <template slot="tabs">
      <a-tabs
        :active-key="activeTab"
        :tab-bar-style="{margin: 0}"
        @change="changeTab">
        <a-tab-pane
          key="1"
          tab="商品列表">
          商品列表
        </a-tab-pane>

        <a-tab-pane
          key="2"
          tab="审批历史">
          审批历史
        </a-tab-pane>
      </a-tabs>
    </template>
  </vo-page-layout>
</template>

<script>
import VoDetailBack from 'components/business/detailBack'
import VoPageLayout from 'components/layout/PageLayout'

const parent = {
  name: 'table-search',
  meta: {
    title: '查询表格'
  }
}

export default {
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },

  components: {
    VoPageLayout,
    VoDetailBack
  },

  meta: {
    title: '详情',
    parent
  },

  mixins: [window.layoutMixin],

  data() {
    return {
      activeTab: '1'
    }
  },

  methods: {
    changeTab(curr) {
      this.activeTab = curr
    },

    back() {
      this.$router.push({ name: parent.name })
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
