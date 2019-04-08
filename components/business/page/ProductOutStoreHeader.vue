<template>
  <vo-page-detail-header title="商品淘汰门店">
    <template slot="subTitle">
      商品：[{{ detail.productCode }}]{{ detail.productName }}
    </template>
    <template slot="content">
      <a-row>
        <vo-col name="供应商">
          [{{ detail.supplierCode }}]{{ detail.supplierName }}
        </vo-col>
        <vo-col name="品类组">
          [{{ detail.classCode }}]{{ detail.className }}
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
  </vo-page-detail-header>
</template>

<script>
import VoPageDetailHeader from 'components/business/PageDetailHeader'
import { urls } from 'utils/api'

export default {
  name: 'VoProductOutStoreHeader',

  components: {
    VoPageDetailHeader
  },

  props: {
    product: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      detail: {},
      loading: false
    }
  },

  mounted() {
    this.getProductDetail(this.product)
  },

  methods: {
    async getProductDetail(id) {
      const { data } = await this.$axios.post(
        urls.getOutOrderProductStoreDetail,
        { id }
      )

      this.loading = false
      this.detail = data
    }
  }
}
</script>

<style lang='less'>
</style>
