<script>
export default {
  name: 'VoTable',

  props: {
    total: {
      type: Number,
      required: false,
      default: 0
    },
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
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    hidePage: {
      type: Boolean,
      required: false,
      default: false
    },

    selectable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      dataSource: [],
      selectedRows: [],
      needTotalList: [],
      selectedRowKeys: [],
      pagination: {
        showTotal: total => `共 ${total} 条记录`
      }
    }
  },

  methods: {
    updateEdit() {
      this.selectedRows = []
    },

    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
    },

    updateSelect(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      const list = this.needTotalList
      this.needTotalList = list.map(item => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            const total = sum + get(val, item.dataIndex)
            return isNaN(total) ? 0 : total
          }, 0)
        }
      })
    }
  },

  render(h) {
    const item = this.data[0]
    if (item && !item._id) {
      this.data.forEach((s, i) => (s._id = i + 1))
    }

    let props = {
      scroll: this.scroll,
      columns: this.columns,
      rowKey: record => record._id,
      dataSource: this.data,
      pagination: this.pagination,
      loading: this.loading,
      change: this.handleTableChange
    }

    if (this.hidePage) props.pagination = false
    if (this.selectable) {
      props.rowSelection = {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.updateSelect(selectedRowKeys, selectedRows)
          this.$emit('onSelect', {
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
          })
        }
      }
    }

    return h(
      'a-table',
      {
        tag: 'component',
        attrs: props,
        class: {
          'auto-scroll': typeof this.scroll.x === 'boolean'
        },
        scopedSlots: this.$scopedSlots
      },
      this.$slots.default
    )
  }
}
</script>
<style lang="less">
.ant-table-wrapper {
  .ant-table {
    .ant-table-scroll {
      .ant-table-body {
        overflow-x: auto !important;
      }
    }
  }

  .ant-pagination-total-text {
    position: absolute;
    left: 0;
  }

  .circle-border {
    > span {
      border-radius: 31px;
      width: 6px;
      height: 6px;
      display: inline-block;
      margin-right: 5px;
      position: relative;
      top: -2px;
    }
  }
}

.auto-scroll {
  .ant-table {
    td {
      white-space: nowrap;
    }
  }
}
</style>
