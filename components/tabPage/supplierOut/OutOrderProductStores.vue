<template>
  <div class="page-detail">
    <vo-card>
      <div style="margin-bottom: 10px;">
        <a-button
          v-if="!onlyShow"
          type="primary"
          style="float: right;"
          @click="changeVisible('addStore')">
          添加门店
        </a-button>

        <vo-input
          style="width: 300px;"
          placeholder="门店"
          @change="changeStore"></vo-input>
      </div>

      <vo-table
        :total="itemData.total"
        :loading="tableLoading"
        :columns="columns"
        :data="itemData.list">
        <template
          slot="action"
          slot-scope="text, record, i">
          <div
            v-if="!onlyShow"
            class="editable-row-operations">
            <a @click="() => del(record, i)">删除</a>
          </div>
        </template>
      </vo-table>
    </vo-card>

    <vo-common-modal
      v-if="!onlyShow"
      :open="open[activeModal]"
      :types="types"
      :promise="promise"
      :type="types[activeModal]"
      :selected="select[activeModal]"
      @close="changeVisible(types.product.sign)"
      @ok="(data) => selectedItems(activeModal, data)"></vo-common-modal>
  </div>
</template>

<script>
import { types } from 'utils/constant'
import { urls } from 'utils/api'
import { mapState } from 'vuex'
import {
  getUrlByType,
  buildPromise,
  tableWithLoading
} from 'utils/factory/common'

export default {
  name: 'VoOutOrderProductStores',

  props: {
    onlyShow: {
      type: Boolean,
      default: false
    }
  },

  data() {
    let columns = [
      {
        title: '销售门店',
        dataIndex: 'storeName',
        customRender: function(text, row) {
          return (
            <span>
              [{row.storeCode}] {text}
            </span>
          )
        }
      }
    ]

    if (!this.onlyShow)
      columns.push({
        title: '操作',
        dataIndex: 'action',
        width: '100px',
        scopedSlots: { customRender: 'action' }
      })

    return {
      types,
      columns,
      query: {},
      itemData: {},
      activeModal: types.product.sign,
      select: {},
      promise: null,
      open: {}
    }
  },

  computed: {
    ...mapState(['tableLoading'])
  },

  mounted() {
    this.getData()
  },

  methods: {
    changeStore(v) {
      console.log(v)
    },

    async getData() {
      this.itemData = await tableWithLoading(() => {
        return this.$axios.post(
          urls.getOutOrderProductStoreList,
          this.queryParam
        )
      })
    },

    changeVisible(type) {
      this.$set(this.open, type, !this.open[type])

      this.promise = buildPromise(getUrlByType(this.types.product.sign))
    },

    selectedItems(type, data) {
      this.$set(this.select, type, data)
    },

    getStores(row) {
      this.$router.push({
        name: 'outManage-apply-outId-productId',
        params: { productId: row.productId }
      })
    }
  }
}
</script>

<style lang='less'>
.content {
  > .page-detail {
    > .ant-card {
      > .ant-card-body {
        padding: 0;
      }
    }
  }
}
</style>
