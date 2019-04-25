<template>
  <vo-page-layout :tab="true">
    <template slot="head">
      <vo-detail-back @back="back"></vo-detail-back>
      <vo-product-out-store-header :product="$route.params.productId"></vo-product-out-store-header>
    </template>
    <template slot="tabs">
      <a-tabs
        :active-key="activeTab"
        :tab-bar-style="{margin: 0}"
        @change="changeTab">
        <a-tab-pane
          key="1"
          tab="淘汰门店列表">
          <vo-out-order-product-stores></vo-out-order-product-stores>
        </a-tab-pane>

        <a-tab-pane
          key="2"
          tab="淘汰审批流程">
          <vo-out-order-process-history :order-id="111"></vo-out-order-process-history>
        </a-tab-pane>
      </a-tabs>
    </template>
  </vo-page-layout>
</template>

<script>
import VoDetailBack from 'components/business/detailBack'
import VoProductOutStoreHeader from 'components/business/page/ProductOutStoreHeader'
import VoOutOrderProductStores from 'components/tabPage/outOrder/OutOrderProductStores'
import VoOutOrderProcessHistory from 'components/tabPage/outOrder/OutOrderProcessHistory'

const parent = [
  {
    name: 'outManage-apply',
    meta: {
      title: '商品淘汰申请'
    }
  },
  {
    name: 'outManage-apply-outId',
    meta: {
      title: '淘汰单详情'
    }
  }
]

export default {
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.productId)
  },

  components: {
    VoDetailBack,
    VoProductOutStoreHeader,
    VoOutOrderProductStores,
    VoOutOrderProcessHistory
  },

  mixins: [window.layoutMixin],

  data() {
    return {
      activeTab: '1'
    }
  },

  meta: {
    title: '商品淘汰门店',
    parent
  },

  methods: {
    changeTab(curr) {
      this.activeTab = curr
    },

    back() {
      this.$router.push({ name: parent[1].name })
    }
  }
}
</script>

<style lang="less">
</style>
