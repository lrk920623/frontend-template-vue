<template>
  <vo-modal
    :class-name="'hs-product-attribute-modal'"
    :open="open"
    title="商品属性"
    @handle-ok="ok"
    @close="$emit('close')">
    <vo-common-attribute
      :origin="attribute"
      @getList="getCheckedList"></vo-common-attribute>
  </vo-modal>
</template>

<script>
import { attribute } from 'utils/constant/checkbox/productAttribute'
import VoCommonAttribute from 'components/modal/_common/CommonAttribute'

export default {
  name: 'VoProductAttribute',

  components: {
    VoCommonAttribute
  },

  props: {
    open: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      attribute
    }
  },

  watch: {
    open(val) {
      if (!val) return

      this.attribute = attribute
    }
  },

  methods: {
    getCheckedList(data) {
      this.attribute = data
    },

    ok() {
      let list = []
      _.forIn(this.attribute, (v, k) => {
        if (v.checkedList) list.push(...v.checkedList)
      })

      this.$emit('ok', list)
      this.$emit('close')
    }
  }
}
</script>

<style lang='less'>
</style>
