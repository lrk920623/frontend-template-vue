<template>
  <vo-page-layout :header-title="'查询表格'">
    <vo-search-box slot="searchBox">
      <vo-single-control label="规则编号">
        <vo-input
          v-model="queryParam.id"
          number="true"></vo-input>
      </vo-single-control>

      <vo-single-control>
        <vo-search-reset
          v-model="advanced"
          :show-toggle="false"
          @reset="reset"
          @search="getData"></vo-search-reset>
      </vo-single-control>
    </vo-search-box>

    <div slot="content">
      <vo-table
        :columns="columns"
        :loading="tableLoading"
        :data="nestList">
        <div
          slot="expandedRowRender"
          slot-scope="record">
          <vo-table
            :hide-page="true"
            :columns="innerColumns"
            :data="record.operations"></vo-table>
        </div>
        <span
          slot="action"
          slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"></a-divider>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down"></a-icon>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">禁用</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </vo-table>
    </div>
  </vo-page-layout>
</template>

<script>
import { CHANGE_TABLE_LOADING } from 'types/mutation-types'
import { mapState, mapMutations } from 'vuex'
import { mixin } from 'utils/constant'

import VoTable from 'components/table/RenderTable'
import VoPageLayout from 'components/layout/PageLayout'
import VoSearchReset from 'components/business/SearchReset'
export default {
  name: 'VoNestTable',
  components: {
    VoPageLayout,
    VoSearchReset,
    VoTable
  },

  meta: {
    title: '嵌套表格'
  },

  mixins: [mixin],

  data() {
    return {
      visible: false,

      // 高级搜索 展开/关闭
      advanced: false,

      // 查询参数
      queryParam: {},

      nestList: [],

      // 表头
      columns: [
        {
          title: '唯一识别码',
          dataIndex: '_id'
        },
        {
          title: '角色名称',
          dataIndex: 'productName'
        },
        {
          title: '状态',
          dataIndex: 'productCode'
        },
        {
          title: '价格',
          dataIndex: 'stockCost',
          sorter: true
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      innerColumns: [
        {
          title: '业态',
          dataIndex: 'name'
        },
        {
          title: '价格指数',
          dataIndex: 'price'
        },
        {
          title: '原业态售价',
          dataIndex: 'origin'
        },
        {
          title: '原业态会员价',
          dataIndex: 'member'
        },
        {
          title: '会员折扣',
          dataIndex: 'discount'
        }
      ]
    }
  },

  computed: {
    ...mapState(['tableLoading'])
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
    ...mapMutations({
      loading: CHANGE_TABLE_LOADING
    }),

    getData() {
      this.loading(true)
      this.getList(this.queryParam)
    },

    async getList(payload) {
      const { data } = await this.$axios.post('/nestTable', payload)

      this.loading(false)
      this.nestList = data.details.map((s, i) => {
        return Object.assign({}, s, { _id: i + 1 })
      })
    },

    handleEdit(record) {
      this.visible = true
    },

    reset(val) {
      this.queryParam = val
    }
  }
}
</script>
