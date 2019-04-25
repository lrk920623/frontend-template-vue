<template>
  <div class="hs-common-product-list">
    <vo-button-group>
      <template v-if="isManager">
        <a-button
          type="primary"
          @click="batchAgree()">
          批量同意
        </a-button>
        <a-button
          type="danger"
          @click="batchReject()">
          批量拒绝
        </a-button>
        <a-button @click="batchExport()">
          批量导出
        </a-button>
      </template>
      <template v-else>
        <a-button
          type="primary"
          @click="changeVisible(activeModal)">
          添加商品
        </a-button>
        <a-button @click="changeVisible('batchImportItem')">
          批量导入商品
        </a-button>
      </template>
      <div class="right-attribute-box">
        <span>* 指标数据统计时间周期：1-3月统计上年,4-12月统计本年</span>
        <a-button @click="changeVisible('attribute')">
          商品属性
        </a-button>
        <a-button @click="changeVisible('dataSet')">
          数据选择
        </a-button>
      </div>
    </vo-button-group>

    <vo-table
      :selectable="true"
      :total="itemData.total"
      :loading="tableLoading"
      :columns="columns"
      :data="itemData.list"
      :scroll="{ x: true }">
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

    <vo-product-attribute
      :open="open.attribute"
      @ok="attributeSelected"
      @close="changeVisible('attribute')"></vo-product-attribute>

    <vo-product-data-set
      :open="open.dataSet"
      @ok="dataSetSelected"
      @close="changeVisible('dataSet')"></vo-product-data-set>

    <vo-import-out-product
      :open="open.batchImportItem"
      :only-product="true"
      title="导入淘汰商品"
      @close="changeVisible('batchImportItem')"></vo-import-out-product>

    <vo-common-modal
      :class-name="'out-order-add-product alert-special-modal'"
      :open="open[activeModal]"
      :types="types"
      :promise="promise"
      :type="types[activeModal]"
      :selected="select[activeModal]"
      @close="changeVisible(activeModal)"
      @ok="(data) => selectedItems(activeModal, data)">
      <template slot="alert">
        <vo-product-alert></vo-product-alert>
      </template>
    </vo-common-modal>
  </div>
</template>

<script>
import { urls } from 'utils/api'
import { mapState } from 'vuex'
import {
  getUrlByType,
  buildPromise,
  tableWithLoading
} from 'utils/factory/common'
import { types } from 'utils/constant'

import VoProductAttribute from 'components/modal/ProductAttribute'
import VoProductDataSet from 'components/modal/ProductDataSet'
import VoImportOutProduct from 'components/modal/ImportOutProduct'
import VoProductAlert from 'components/business/ProductAlert'

const states = new Map([
  [1, { name: '同意', color: 'green' }],
  [2, { name: '拒绝', color: 'red' }]
])

export default {
  name: 'VoCommonProductList',

  components: {
    VoProductAttribute,
    VoProductDataSet,
    VoImportOutProduct,
    VoProductAlert
  },

  props: {
    role: {
      type: String,
      required: true
    }
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
        customRender: function(text, row) {
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
      activeModal: types.product.sign,
      isManager: this.role === 'manager',
      itemData: {},
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
    dataSetSelected() {
      console.log('select dataSet： ', data)
    },

    attributeSelected(data) {
      console.log('select attribute： ', data, attribute)
    },

    batchExport() {},

    batchAgree() {},

    batchReject() {},

    changeVisible(type) {
      this.$set(this.open, type, !this.open[type])

      this.promise = buildPromise(getUrlByType(this.types.product.sign))
    },

    async getData() {
      this.itemData = await tableWithLoading(() => {
        return this.$axios.post(urls.getOutOrderProductList, this.queryParam)
      })
    }
  }
}
</script>

<style lang='less'>
.hs-common-product-list {
  .right-attribute-box {
    display: inline-block;
    float: right;

    > span {
      font-size: 12px;
    }
  }
}
</style>
