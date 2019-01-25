<template>
  <v-page-layout>
    <v-page-header
      slot="header"
      :title="'查询表格'">
      <v-search-box slot="search">
        <v-single-control label="规则编号">
          <a-input
            v-model="queryParam.id"
            placeholder="请填写"></a-input>
        </v-single-control>

        <v-single-control label="使用状态">
          <v-select
            v-model="queryParam.status"
            :list="select"></v-select>
        </v-single-control>

        <template v-if="advanced">
          <v-single-control label="调用次数">
            <a-input-number
              v-model="queryParam.number"
              style="width: 100%"></a-input-number>
          </v-single-control>

          <v-single-control label="更新日期">
            <a-date-picker
              v-model="queryParam.date"
              style="width: 100%"
              placeholder="请输入更新日期"></a-date-picker>
          </v-single-control>

          <v-single-control label="使用状态">
            <v-select
              v-model="queryParam.status"
              :list="select"></v-select>
          </v-single-control>

          <v-single-control label="使用状态">
            <v-select
              v-model="queryParam.status"
              :list="select"></v-select>
          </v-single-control>
        </template>

        <v-single-control :md="!advanced && 8 || 24">
          <v-search-reset
            v-model="advanced"
            @reset="reset"
            @search="getData"></v-search-reset>
        </v-single-control>
      </v-search-box>
    </v-page-header>
    <div slot="content">
      <v-table
        :columns="columns"
        :data="list"></v-table>
    </div>
  </v-page-layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { StoreModuleName } from '../../utils/constant'
import { GET_LIST } from '../../types/action-types'
import { CHANGE_TABLE_LOADING } from '../../types/mutation-types'

import VPageHeader from '../../components/page/PageHeader'
import VPageLayout from '../../components/page/PageLayout'
import VSelect from '../../components/basic/Select'
import VSearchReset from '../../components/basic/SearchReset'
import VTable from '../../components/table/Table'
import VSearchBox from '../../components/searchBox/SearchBox'
import VSingleControl from '../../components/searchBox/SingleControl'

const { mapState, mapActions } = createNamespacedHelpers(
  StoreModuleName.searchTable
)

const columns = [
  {
    title: '商品码',
    dataIndex: 'supplyCode'
  },
  {
    title: '商品名称',
    dataIndex: 'supplyName'
  },
  {
    title: '价格',
    dataIndex: 'price',
    sorter: true
  },
  {
    title: '数量',
    dataIndex: 'arrivalRate'
  }
]

export default {
  components: {
    VSearchBox,
    VSingleControl,
    VPageLayout,
    VPageHeader,
    VSearchReset,
    VSelect,
    VTable
  },

  data() {
    return {
      select: [
        { i: 1, value: 'all', name: '全部', active: true },
        { i: 2, value: 'distribution', name: '经销' },
        { i: 3, value: 'joint', name: '联营' },
        { i: 4, value: 'retail', name: '零售' },
        { i: 5, value: 'whole', name: '批发' }
      ],

      // 高级搜索 展开/关闭
      advanced: true,
      // 查询参数
      queryParam: {},
      columns
    }
  },

  computed: {
    ...mapState(['list'])
  },

  mounted() {
    this.getData()
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
      getList: GET_LIST
    })
  }
}
</script>
