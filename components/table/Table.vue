<template>
  <a-table
    :columns="columns"
    :row-key="record => record._id"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="tableLoading"
    @change="handleTableChange">
    <template
      slot="name"
      slot-scope="name">
      {{ name.first }} {{ name.last }}
    </template>
  </a-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
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

  watch: {
    data(val) {
      if (!val) return

      this.dataSource = this.data.map((s, i) => {
        return Object.assign({}, s, { _id: i + 1 })
      })
    }
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
