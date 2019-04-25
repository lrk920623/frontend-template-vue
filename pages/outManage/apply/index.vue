<template>
  <vo-page-layout :header-title="'商品淘汰申请'">
    <div slot="content">
      <vo-search-box slot="searchBox">
        <vo-single-control
          label="申请单号"
          :md="7">
          <vo-input
            v-model="queryParam.id"
            number="true"></vo-input>
        </vo-single-control>

        <vo-single-control
          :label="types.class.title"
          :md="7">
          <vo-param-show
            :click-box="() => changeVisible(types.class, true)"
            :data="classSelected"
            :types="types.class"
            @clear="(data) => selectedItems(types.class.sign, data)"></vo-param-show>
        </vo-single-control>

        <vo-single-control
          label="状态"
          :md="7">
          <vo-select
            v-model="queryParam.status2"
            :list="select"></vo-select>
        </vo-single-control>

        <vo-single-control :md="3">
          <vo-search-reset @search="getData"></vo-search-reset>
        </vo-single-control>
      </vo-search-box>

      <a-button
        type="primary"
        style="margin-bottom: 10px;"
        @click="changeOutOrderStatus">
        新建淘汰单
      </a-button>

      <vo-table
        :scroll="{x: 1000}"
        :total="orderData.total"
        :loading="tableLoading"
        :columns="columns"
        :data="orderData.list">
        <template
          slot="action"
          slot-scope="text, record, i">
          <div class="editable-row-operations">
            <a
              class="edit"
              @click="() => detail(record)">
              详情
            </a>
            <a-divider type="vertical"></a-divider>
            <a @click="() => del(record, i)">删除</a>
          </div>
        </template>
      </vo-table>
    </div>

    <vo-class-modal
      :open="openClass"
      :types="types"
      :promise="promise"
      :selected="classSelected"
      @close="changeVisible"
      @ok="selectedItems"></vo-class-modal>

    <vo-new-item-out-order
      :open="openNewItemOut"
      @close="closeOutOrder"></vo-new-item-out-order>
  </vo-page-layout>
</template>

<script>
import { types, statusColor } from 'utils/constant'
import { urls } from 'utils/api'
import { mapState } from 'vuex'
import {
  getUrlByType,
  buildPromise,
  tableWithLoading
} from 'utils/factory/common'

import VoTable from 'components/table/RenderTable'
import VoPageLayout from 'components/layout/PageLayout'
import VoSearchReset from 'components/business/SearchReset'
import VoNewItemOutOrder from 'components/modal/NewItemOutOrder'

export default {
  components: {
    VoPageLayout,
    VoSearchReset,
    VoTable,
    VoNewItemOutOrder
  },

  meta: {
    title: '商品淘汰申请'
  },

  mixins: [window.layoutMixin],

  data() {
    const columns = [
      {
        title: '淘汰单号',
        dataIndex: 'outOrder',
        fixed: 'left'
      },
      {
        title: '品类组',
        dataIndex: 'classType'
      },
      {
        title: '包含商品数',
        dataIndex: 'itemCount'
      },
      {
        title: '执行方式',
        dataIndex: 'way'
      },
      {
        title: '预淘汰时间',
        dataIndex: 'preOutTime'
      },
      {
        title: '淘汰原因',
        dataIndex: 'outReason'
      },
      {
        title: '状态',
        dataIndex: 'status',
        customRender: function(text) {
          const item = statusColor[text]
          return (
            <div class="circle-border">
              <span style={{ background: item.color }} />
              {item.name}
            </div>
          )
        }
      },
      {
        title: '最后更新时间',
        dataIndex: 'updatedTime'
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '120px',
        fixed: 'right',
        scopedSlots: { customRender: 'action' }
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

      // 查询参数
      queryParam: {},
      columns,
      types,
      openClass: false,
      classSelected: [],
      openNewItemOut: false,
      activeModal: '',
      promise: null,
      orderData: {}
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
    selectedItems(data) {
      this.classSelected = data
    },

    changeVisible() {
      this.openClass = !this.openClass

      this.promise = buildPromise(getUrlByType(this.types.class.sign))
    },

    changeOutOrderStatus() {
      this.openNewItemOut = !this.openNewItemOut
    },

    closeOutOrder() {
      this.changeOutOrderStatus()
    },

    reset(val) {
      this.queryParam = val
    },

    detail(row) {
      this.$router.push({
        name: 'outManage-apply-outId',
        params: { outId: row.outOrder }
      })
    },

    async getData() {
      this.orderData = await tableWithLoading(() => {
        return this.$axios.post(urls.getOutOrderList, this.queryParam)
      })
    }
  }
}
</script>
