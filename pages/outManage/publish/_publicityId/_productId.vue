<template>
  <vo-page-layout>
    <template slot="head">
      <vo-detail-back @back="back"></vo-detail-back>
      <vo-product-out-store-header :product="$route.params.productId"></vo-product-out-store-header>
    </template>
    <template slot="content">
      <vo-out-order-product-stores :only-show="true"></vo-out-order-product-stores>
    </template>
  </vo-page-layout>
</template>

<script>
import VoDetailBack from 'components/business/detailBack'
import VoProductOutStoreHeader from 'components/business/page/ProductOutStoreHeader'
import VoOutOrderProductStores from 'components/tabPage/outOrder/OutOrderProductStores'

import { mixin } from 'utils/constant'

const parent = [
  {
    name: 'outManage-publish',
    meta: {
      title: '华商月度淘汰商品公布'
    }
  },
  {
    name: 'outManage-publish-publicityId',
    meta: {
      title: '淘汰公示单详情 '
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
    VoOutOrderProductStores
  },

  mixins: [mixin],

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
