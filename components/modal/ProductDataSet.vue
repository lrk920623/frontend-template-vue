<template>
  <vo-modal
    :class-name="'hs-data-set-modal'"
    :width="500"
    :open="open"
    title="数据设定"
    @handle-ok="ok"
    @close="$emit('close')">
    <vo-common-attribute
      :origin="dataSet"
      @get-list="getCheckedList"></vo-common-attribute>
  </vo-modal>
</template>

<script>
import { dataSet } from 'utils/constant/checkbox/dataSet'
import VoCommonAttribute from 'components/modal/_common/CommonAttribute'

export default {
  name: 'VoProductDataSet',

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
      dataSet
    }
  },

  methods: {
    getCheckedList(data) {
      this.dataSet = data
    },

    ok() {
      let list = []
      _.forIn(this.dataSet, (v, k) => {
        if (v.checkedList) list.push(...v.checkedList)
      })

      this.$emit('ok', list)
      this.$emit('close')
    }
  }
}
</script>
<style lang='less'>
.hs-data-set-modal {
  .single-attribute-module {
    width: 50%;
  }
}
</style>
