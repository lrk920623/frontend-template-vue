<template>
  <div class="page-detail out-order-product-list">
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

    <vo-card class="hs-inner-card">
      <vo-checkbox-group :group="supplierOut"></vo-checkbox-group>
    </vo-card>

    <vo-card>
      <vo-button-group>
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
        <div class="right-attribute-box">
          <span>* 指标数据统计时间周期：1-3月统计上年,4-12月统计本年</span>
          <a-button @click="changeVisible('attribute')">
            商品属性
          </a-button>
          <a-button @click="changeVisible('dataSet')">
            数据选择
          </a-button>
          <a-button @click="changeVisible('reject')">
            reject
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
    </vo-card>

    <vo-product-attribute
      :open="open.attribute"
      @ok="attributeSelected"
      @close="changeVisible('attribute')"></vo-product-attribute>

    <vo-product-data-set
      :open="open.dataSet"
      @ok="dataSetSelected"
      @close="changeVisible('dataSet')"></vo-product-data-set>

    <vo-reject-detail
      :open="open.reject"
      @close="changeVisible('reject')"></vo-reject-detail>
  </div>
</template>

<script>
import { urls } from 'utils/api'
import { mapState } from 'vuex'
import { tableWithLoading } from 'utils/factory/common'
import VoProductAttribute from 'components/modal/ProductAttribute'
import VoProductDataSet from 'components/modal/ProductDataSet'
import VoRejectDetail from 'components/modal/RejectDetail'
import VoCheckboxGroup from 'components/business/CheckboxGroup'
import { supplierOut } from 'utils/constant/checkbox/common'

const states = new Map([
  [1, { name: '同意', color: 'green' }],
  [2, { name: '拒绝', color: 'red' }]
])

export default {
  name: 'VoOutOrderProducts',

  components: {
    VoRejectDetail,
    VoProductAttribute,
    VoProductDataSet,
    VoCheckboxGroup
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
      columns,
      supplierOut,
      checkedList: [],
      query: {},
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
    },

    async getData() {
      this.itemData = await tableWithLoading(() => {
        return this.$axios.post(urls.getOutOrderProductList, this.queryParam)
      })
    },

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
  .right-attribute-box {
    display: inline-block;
    float: right;

    > span {
      font-size: 12px;
    }
  }
}
</style>
