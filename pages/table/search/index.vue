<template>
  <vo-page-layout :header-title="'查询表格'">
    <vo-search-box slot="searchBox">
      <vo-single-control label="规则编号">
        <vo-input
          v-model="queryParam.id"
          number="true"></vo-input>
      </vo-single-control>

      <vo-single-control label="使用状态">
        <vo-select
          v-model="queryParam.status"
          :list="select"></vo-select>
      </vo-single-control>

      <template v-if="advanced">
        <vo-single-control label="调用次数">
          <a-input-number
            v-model="queryParam.number"
            style="width: 100%"></a-input-number>
        </vo-single-control>

        <vo-single-control label="更新日期">
          <a-date-picker
            v-model="queryParam.date"
            style="width: 100%"
            placeholder="请输入更新日期"></a-date-picker>
        </vo-single-control>

        <vo-single-control label="使用状态">
          <vo-select
            v-model="queryParam.status2"
            :list="select"></vo-select>
        </vo-single-control>

        <vo-single-control label="使用状态">
          <vo-select
            v-model="queryParam.status1"
            :list="select"></vo-select>
        </vo-single-control>
      </template>

      <vo-single-control :md="!advanced && 8 || 24">
        <vo-search-reset
          v-model="advanced"
          @reset="reset"
          @search="getData"></vo-search-reset>
      </vo-single-control>
    </vo-search-box>

    <div slot="content">
      <vo-table
        :columns="columns"
        :data="searchList"></vo-table>
    </div>
  </vo-page-layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { StoreModuleName } from 'utils/constant'
import { GET_SEARCH_LIST } from 'utils/types/action-types'
import { CHANGE_TABLE_LOADING } from 'utils/types/mutation-types'

import VoTable from 'components/table/RenderTable'
import VoPageLayout from 'components/layout/PageLayout'
import VoSearchReset from 'components/business/SearchReset'

const { mapState, mapActions } = createNamespacedHelpers(StoreModuleName.table)

export default {
  components: {
    VoPageLayout,
    VoSearchReset,
    VoTable
  },

  meta: {
    title: '查询表格'
  },

  mixins: [window.layoutMixin],

  data() {
    const columns = [
      {
        title: '商品码',
        dataIndex: 'productCode',
        fixed: 'left'
      },
      {
        title: '商品名称',
        dataIndex: 'productName',
        customRender: function(text, row) {
          const to = {
            name: 'table-search-id',
            params: { id: row.productCode }
          }
          return <nuxt-link to={to}>{{ text }}</nuxt-link>
        }
      },
      {
        title: '价格',
        dataIndex: 'stockCost',
        sorter: true,
        defaultSortOrder: 'descend'
      },
      {
        title: '数量',
        dataIndex: 'stockQty'
      }
    ]

    return {
      select: [
        { i: 1, code: 'all', name: '全部', active: true },
        { i: 2, code: 'distribution', name: '经销' },
        { i: 3, code: 'joint', name: '联营' },
        { i: 4, code: 'retail', name: '零售' },
        { i: 5, code: 'whole', name: '批发' }
      ],

      // 高级搜索 展开/关闭
      advanced: true,
      // 查询参数
      queryParam: {},
      columns
    }
  },

  computed: {
    ...mapState(['searchList'])
  },

  mounted() {
    this.getData()

    this.$watch(
      'queryParam',
      val => {
        console.log('id', val.id)
      },
      { deep: true }
    )
  },

  methods: {
    reset(val) {
      this.queryParam = val
    },

    getData() {
      this.$store.commit(CHANGE_TABLE_LOADING, true)
      this.getList(this.queryParam)
    },

    ...mapActions({
      getList: GET_SEARCH_LIST
    })
  }
}
</script>
