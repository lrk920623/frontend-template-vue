<template>
  <a-table
    :scroll="scroll"
    :columns="columns"
    :row-key="record => record._id"
    :data-source="data"
    :pagination="pagination"
    :loading="tableLoading"
    @change="handleTableChange">
    <slot />
  </a-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'VoTable',

  props: {
    scroll: {
      type: Object,
      required: false,
      default: function() {
        return { x: false }
      }
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      dataSource: [],
      pagination: {}
    }
  },

  computed: {
    ...mapState(['tableLoading'])
  },

  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
    }
  }
}
</script>
