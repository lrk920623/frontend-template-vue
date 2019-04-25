<template>
  <vo-page-layout :tab="true">
    <template slot="head">
      <vo-detail-back @back="back"></vo-detail-back>
      <vo-page-detail-header title="淘汰单详情">
        <template slot="subTitle">
          单号：{{ $route.params.outId }}
        </template>
        <template slot="action">
          <a-button style="margin-right: 8px;">
            编辑淘汰单信息
          </a-button>
          <a-button type="primary">
            提交审批
          </a-button>
        </template>
        <template slot="content">
          <a-row>
            <vo-col name="供应商">
              [{{ detail.supplierCode }}]{{ detail.supplierName }}
            </vo-col>
            <vo-col name="联系人">
              {{ detail.contact }}
            </vo-col>
            <vo-col name="品类组">
              [{{ detail.classCode }}]{{ detail.className }}
            </vo-col>
            <vo-col name="执行方式">
              {{ detail.way }}
            </vo-col>
            <vo-col name="预淘汰时间">
              {{ detail.preOutTime }}
            </vo-col>
            <vo-col name="淘汰时间">
              {{ detail.outTime }}
            </vo-col>
            <vo-col
              name="淘汰原因"
              :span="24">
              {{ detail.reason }}
            </vo-col>
          </a-row>
        </template>
        <template slot="extraContent">
          <div>
            <div class="title">
              状态
            </div>
            <div class="value">
              待采购预审
            </div>
          </div>
        </template>
      </vo-page-detail-header>
    </template>
    <template slot="tabs">
      <a-tabs
        :active-key="activeTab"
        :tab-bar-style="{margin: 0}"
        @change="changeTab">
        <a-tab-pane
          key="1"
          tab="商品列表">
          <vo-out-order-products></vo-out-order-products>
        </a-tab-pane>

        <a-tab-pane
          key="2"
          tab="审批历史">
          <vo-out-order-process-history :order-id="$route.params.outId"></vo-out-order-process-history>
        </a-tab-pane>
      </a-tabs>
    </template>
  </vo-page-layout>
</template>

<script>
import VoDetailBack from 'components/business/detailBack'
import VoPageDetailHeader from 'components/business/PageDetailHeader'
import VoOutOrderProducts from 'components/tabPage/outOrder/OutOrderProducts'
import VoOutOrderProcessHistory from 'components/tabPage/outOrder/OutOrderProcessHistory'
import { urls } from 'utils/api'

const parent = {
  name: 'outManage-apply',
  meta: {
    title: '商品淘汰申请'
  }
}

export default {
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.outId)
  },

  components: {
    VoDetailBack,
    VoOutOrderProducts,
    VoPageDetailHeader,
    VoOutOrderProcessHistory
  },

  mixins: [window.layoutMixin],

  data() {
    return {
      loading: true,
      activeTab: '1',
      detail: {}
    }
  },

  mounted() {
    this.getOrderDetail()
  },

  meta: {
    title: '淘汰单详情',
    parent
  },

  methods: {
    async getOrderDetail() {
      const { data } = await this.$axios.post(urls.getOutOrderDetail, {
        id: this.$route.params.outId
      })

      this.loading = false
      this.detail = data
    },

    changeTab(curr) {
      this.activeTab = curr
    },

    back() {
      this.$router.push({ name: parent.name })
    }
  }
}
</script>

<style lang="less">
</style>
