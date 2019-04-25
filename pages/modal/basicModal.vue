<template>
  <vo-page-layout :header-title="'基础对话框示例'">
    <vo-search-box slot="searchBox">
      <vo-single-control :label="types.brand.title">
        <vo-param-show
          :types="types.brand"
          :click-box="() => changeVisible(types.brand)"
          :data="select[types.brand.sign]"
          @clear="(data) => selectedItems(types.brand.sign, data)"></vo-param-show>
      </vo-single-control>

      <vo-single-control :label="types.store.title">
        <vo-param-show
          :click-box="() => changeVisible(types.store)"
          :data="select[types.store.sign]"
          :types="types.store"
          @clear="(data) => selectedItems(types.store.sign, data)"></vo-param-show>
      </vo-single-control>

      <vo-single-control :label="types.operation.title">
        <vo-param-show
          :click-box="() => changeVisible(types.operation)"
          :data="select[types.operation.sign]"
          :types="types.operation"
          @clear="(data) => selectedItems(types.operation.sign, data)"></vo-param-show>
      </vo-single-control>

      <vo-single-control :label="types.district.title">
        <vo-param-show
          :click-box="() => changeVisible(types.district)"
          :data="select[types.district.sign]"
          :types="types.district"
          @clear="(data) => selectedItems(types.district.sign, data)"></vo-param-show>
      </vo-single-control>

      <vo-single-control :label="types.supplier.title">
        <vo-param-show
          :click-box="() => changeVisible(types.supplier)"
          :data="select[types.supplier.sign]"
          :types="types.supplier"
          @clear="(data) => selectedItems(types.supplier.sign, data)"></vo-param-show>
      </vo-single-control>

      <vo-single-control :label="types.product.title">
        <vo-param-show
          :click-box="() => changeVisible(types.product)"
          :data="select[types.product.sign]"
          :types="types.product"
          @clear="(data) => selectedItems(types.product.sign, data)"></vo-param-show>
      </vo-single-control>

      <vo-single-control :label="types.group.title">
        <vo-param-show
          :click-box="() => changeVisible(types.group)"
          :data="select[types.group.sign]"
          :types="types.group"
          @clear="(data) => selectedItems(types.group.sign, data)"></vo-param-show>
      </vo-single-control>

      <vo-single-control :label="types.class.title">
        <vo-param-show
          :click-box="() => changeVisible(types.class, true)"
          :data="select[types.class.sign]"
          :types="types.class"
          @clear="(data) => selectedItems(types.class.sign, data)"></vo-param-show>
      </vo-single-control>

      <vo-single-control :label="types.category.title">
        <vo-param-show
          :click-box="() => changeVisible(types.category, true)"
          :data="select[types.category.sign]"
          :types="types.category"
          @clear="(data) => selectedItems(types.category.sign, data)"></vo-param-show>
      </vo-single-control>
    </vo-search-box>

    <div slot="content">
      content
    </div>

    <vo-common-modal
      :open="openCommon"
      :types="types"
      :promise="promise"
      :type="types[activeModal]"
      :selected="select[activeModal]"
      @close="changeVisible(types[activeModal])"
      @ok="(data) => selectedItems(activeModal, data)"></vo-common-modal>

    <vo-class-modal
      :open="open[types.class.sign]"
      :types="types"
      :promise="promise"
      :selected="select[activeModal]"
      @close="changeVisible(types.class, true)"
      @ok="(data) => selectedItems(types.class.sign, data)"></vo-class-modal>

    <vo-category-modal
      :open="open[types.category.sign]"
      :types="types"
      :promise="promise"
      :selected="select[activeModal]"
      @close="changeVisible(types.category, true)"
      @ok="(data) => selectedItems(types.category.sign, data)"></vo-category-modal>
  </vo-page-layout>
</template>

<script>
import VoPageLayout from 'components/layout/PageLayout'

import { types } from 'utils/constant'
import { getUrlByType, buildPromise } from 'utils/factory/common'

export default {
  components: {
    VoPageLayout
  },

  meta: {
    title: '基础表单'
  },

  mixins: [window.layoutMixin],

  data() {
    return {
      types,
      open: {},
      openCommon: false,
      select: {},
      activeModal: '',
      promise: null
    }
  },

  methods: {
    /**
     * 模态框 显示 隐藏
     * @param type 配置信息
     * @param isCat 是否是品类组或类别
     */
    changeVisible(type, isCat) {
      const sign = type.sign

      isCat
        ? this.$set(this.open, sign, !this.open[sign])
        : (this.openCommon = !this.openCommon)

      if (type) {
        this.activeModal = sign
        this.promise = buildPromise(getUrlByType(sign))
      }
    },

    selectedItems(type, data) {
      this.$set(this.select, type, data)
    }
  }
}
</script>

<style lang='less'>
.show-select {
  word-wrap: break-word;
}
</style>
