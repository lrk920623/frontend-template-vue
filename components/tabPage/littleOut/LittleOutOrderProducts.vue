<template>
  <div class="page-detail out-order-product-list">
    <vo-search-box slot="searchBox">
      <vo-single-control
        label="商品"
        :md="7">
        <vo-input v-model="query.product"></vo-input>
      </vo-single-control>

      <vo-single-control
        label="审批结果"
        :md="8">
        <vo-input
          v-model="query.id"></vo-input>
      </vo-single-control>

      <vo-single-control :md="3">
        <vo-search-reset @search="getData"></vo-search-reset>
      </vo-single-control>
    </vo-search-box>

    <vo-card class="hs-inner-card">
      <vo-checkbox-group :group="littleOut">
        <span class="clear-check"><a-icon type="highlight"></a-icon> 清空条件</span>
      </vo-checkbox-group>
    </vo-card>

    <vo-card>
      <vo-common-product-list :role="userRole"></vo-common-product-list>
    </vo-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VoCommonProductList from 'components/business/page/CommonProductList'
import VoCheckboxGroup from 'components/business/CheckboxGroup'
import { littleOut } from 'utils/constant/checkbox/common'

export default {
  name: 'VoLittleOutOrderProducts',

  components: {
    VoCheckboxGroup,
    VoCommonProductList
  },

  data() {
    return {
      littleOut,
      checkedList: [],
      query: {}
    }
  },

  computed: {
    ...mapState(['userRole'])
  },

  methods: {
    getData() {},

    getStores(row) {
      this.$router.push({
        name: 'supplierProductOut-approve-outId-productId',
        params: { productId: row.productId }
      })
    }
  }
}
</script>

<style lang="less">
.out-order-add-product {
  .condition-box,
  .hs-modal-list-box {
    padding: 0 20px;
  }

  .out-store-range {
    padding: 0 20px;
    margin-top: 20px;

    > p {
      margin-bottom: 6px;
    }
  }
}
</style>

<style lang="less" scoped>
.out-order-product-list {
}
</style>
