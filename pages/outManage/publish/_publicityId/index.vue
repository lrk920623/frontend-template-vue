<template>
  <vo-page-layout>
    <template slot="head">
      <vo-detail-back @back="back"></vo-detail-back>
      <vo-page-detail-header title="淘汰公示单详情">
        <template slot="subTitle">
          单号：{{ $route.params.publicityId }}
        </template>
        <template slot="content">
          <a-row>
            <vo-col name="淘汰公示">
              {{ detail.outPublicity }}
            </vo-col>
            <vo-col name="供应商">
              [{{ detail.supplierCode }}]{{ detail.supplierName }}
            </vo-col>
            <vo-col name="淘汰等级">
              {{ detail.outLevel }}
            </vo-col>
            <vo-col name="执行方式">
              {{ detail.way }}
            </vo-col>
            <vo-col name="预淘汰时间">
              {{ detail.preOutTime }}
            </vo-col>
            <vo-col name="淘汰时间">
              {{ detail.outTime }}
            </vo-col>
            <vo-col
              name="淘汰原因"
              :span="24">
              {{ detail.reason }}
            </vo-col>
          </a-row>
        </template>
      </vo-page-detail-header>
    </template>

    <div slot="content">
      <vo-search-box slot="searchBox">
        <vo-single-control label="商品">
          <vo-input v-model="query.product"></vo-input>
        </vo-single-control>

        <vo-single-control label="主条码">
          <vo-input
            v-model="query.id"
            number="true"></vo-input>
        </vo-single-control>

        <vo-single-control :md="3">
          <vo-search-reset @search="getData"></vo-search-reset>
        </vo-single-control>
      </vo-search-box>

      <vo-table
        :total="itemData.total"
        :loading="tableLoading"
        :columns="columns"
        :data="itemData.list">
        <template
          slot="action"
          slot-scope="text, record, i">
          <div class="editable-row-operations">
            <a
              class="edit"
              @click="() => getStores(record)">
              查看门店
            </a>
          </div>
        </template>
      </vo-table>
    </div>
  </vo-page-layout>
</template>

<script>
import VoDetailBack from 'components/business/detailBack'
import VoPageDetailHeader from 'components/business/PageDetailHeader'
import { mixin } from 'utils/constant'
import { urls } from 'utils/api'
import { mapState } from 'vuex'

const parent = {
  name: 'outManage-publish',
  meta: {
    title: '华商月度淘汰商品公布'
  }
}

export default {
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.publicityId)
  },

  components: {
    VoDetailBack,
    VoPageDetailHeader
  },

  mixins: [mixin],

  data() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'productName'
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
        dataIndex: 'brandName'
      },
      {
        title: '最新库存',
        dataIndex: 'latestProductCount'
      },
      {
        title: '淘汰理由',
        dataIndex: 'reason',
        customRender: function(text, row) {
          return <span style="color: #f5222d;">{{ text }}</span>
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
        scopedSlots: { customRender: 'action' }
      }
    ]

    return {
      columns,
      loading: true,
      activeTab: '1',
      detail: {},
      itemData: {},
      query: {}
    }
  },

  computed: {
    ...mapState(['tableLoading'])
  },

  mounted() {
    this.getOrderDetail()
    this.getProductList()
  },

  meta: {
    title: '淘汰公示单详情 ',
    parent
  },

  methods: {
    getData() {},

    async getOrderDetail() {
      const { data } = await this.$axios.post(urls.getOutPublicityOrderDetail, {
        id: this.$route.params.publicityId
      })

      this.loading = false
      this.detail = data
    },

    async getProductList() {
      const { data } = await this.$axios.post(
        urls.getOutPublicityOrderProductList
      )

      this.itemData = data
    },

    changeTab(curr) {
      this.activeTab = curr
    },

    back() {
      this.$router.push({ name: parent.name })
    },

    getStores(row) {
      this.$router.push({
        name: 'outManage-publish-publicityId-productId',
        params: { productId: row.productId }
      })
    }
  }
}
</script>

<style lang="less">
</style>
