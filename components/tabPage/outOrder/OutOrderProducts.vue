<template>
  <div class="page-detail">
    <vo-search-box slot="searchBox">
      <vo-single-control
        label="商品"
        :md="7">
        <vo-input v-model="query.product"></vo-input>
      </vo-single-control>

      <vo-single-control
        label="主条码"
        :md="7">
        <vo-input
          v-model="query.id"
          number="true"></vo-input>
      </vo-single-control>

      <vo-single-control
        label="状态"
        :md="7">
        <vo-input
          v-model="query.id"
          number="true"></vo-input>
      </vo-single-control>

      <vo-single-control :md="3">
        <vo-search-reset @search="getData"></vo-search-reset>
      </vo-single-control>
    </vo-search-box>

    <vo-card>
      <div class="hs-button-group">
        <a-button
          type="primary"
          @click="changeVisible(types.product.sign)">
          添加商品
        </a-button>

        <a-button @click="changeVisible('batchImportItem')">
          批量导入商品
        </a-button>
      </div>

      <vo-table
        :total="itemData.total"
        :loading="tableLoading"
        :columns="columns"
        :data="itemData.list"
        :scroll="{ x: 1100 }">
        <template
          slot="action"
          slot-scope="text, record, i">
          <div class="editable-row-operations">
            <a
              class="edit"
              @click="() => getStores(record)">
              查看门店
            </a>
            <a-divider type="vertical"></a-divider>
            <a @click="() => del(record, i)">删除</a>
          </div>
        </template>
      </vo-table>
    </vo-card>

    <vo-common-modal
      :class-name="'out-order-add-product alert-special-modal'"
      :open="open[activeModal]"
      :types="types"
      :promise="promise"
      :type="types[activeModal]"
      :selected="select[activeModal]"
      @close="changeVisible(types.product.sign)"
      @ok="(data) => selectedItems(activeModal, data)">
      <template slot="alert">
        <a-alert
          message="此商品列表已根据淘汰单的品类条件过滤，如果所添加的商品不在此列表，请重新创建新的淘汰单。一个单据内只允许申请同一品类组商品"
          type="info"
          show-icon></a-alert>
      </template>

      <template slot="outStore">
        <div class="out-store-range">
          <p>淘汰门店范围：</p>
          <a-radio-group>
            <a-radio :value="1">
              全部门店淘汰
            </a-radio>
            <a-radio :value="2">
              部分门店淘汰
            </a-radio>
          </a-radio-group>
        </div>
      </template>
    </vo-common-modal>

    <vo-import-out-product
      :open="open.batchImportItem"
      @close="changeVisible('batchImportItem')"></vo-import-out-product>
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
import VoImportOutProduct from 'components/modal/ImportOutProduct'

const states = new Map([
  [1, { name: '同意', color: 'green' }],
  [2, { name: '拒绝', color: 'red' }]
])
export default {
  name: 'VoOutOrderProducts',

  components: {
    VoImportOutProduct
  },

  data() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'productName',
        fixed: 'left',
        customRender: function(text, row) {
          const curr = states.get(row.state)

          return (
            <vo-single-product info={curr}>
              [{row.productCode}] {text}
            </vo-single-product>
          )
        }
      },
      {
        title: '主条码',
        dataIndex: 'barcode'
      },
      {
        title: '规格',
        dataIndex: 'spec'
      },
      {
        title: '品牌',
        dataIndex: 'brandName',
        customRender: function(text, row) {
          return `[${row.brandCode}] ${text}`
        }
      },
      {
        title: '供货门店数',
        dataIndex: 'supplyStoreCount'
      },
      {
        title: '淘汰门店数',
        dataIndex: 'outStoreCount'
      },
      {
        title: '理由',
        dataIndex: 'reason',
        customRender: function(text) {
          return <span style="color: #f5222d;">{{ text }}</span>
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '135px',
        fixed: 'right',
        scopedSlots: { customRender: 'action' }
      }
    ]
    return {
      types,
      columns,
      query: {},
      itemData: {},
      activeModal: types.product.sign,
      select: {},
      promise: null,
      open: {
        product: false,
        batchImportItem: false
      }
    }
  },

  computed: {
    ...mapState(['tableLoading'])
  },

  mounted() {
    this.getData()
  },

  methods: {
    async getData() {
      this.itemData = await tableWithLoading(() => {
        return this.$axios.post(urls.getOutOrderProductList, this.queryParam)
      })
    },

    changeVisible(type) {
      this.open[type] = !this.open[type]

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
