<template>
  <vo-page-layout :header-title="'华商月度淘汰商品公布'">
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

      <vo-table
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
import { mixin, types } from 'utils/constant'
import { urls } from 'utils/api'
import { mapState } from 'vuex'
import { getUrlByType, buildPromise, tableWithLoading } from 'utils/common'

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
    title: '华商月度淘汰商品公布'
  },

  mixins: [mixin],

  data() {
    const columns = [
      {
        title: '公示单号',
        dataIndex: 'publicityOrder'
      },
      {
        title: '淘汰公示',
        dataIndex: 'outPublicity'
      },
      {
        title: '淘汰等级',
        dataIndex: 'outLevel'
      },
      {
        title: '淘汰商品数',
        dataIndex: 'outProductCount'
      },
      {
        title: '执行方式',
        dataIndex: 'runWay'
      },
      {
        title: '预淘汰时间',
        dataIndex: 'preOutTime'
      },
      {
        title: '淘汰时间',
        dataIndex: 'outTime'
      },
      {
        title: '公示时间',
        dataIndex: 'publicityTime'
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '80px',
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
        name: 'outManage-publish-publicityId',
        params: { publicityId: row.publicityOrder }
      })
    },

    async getData() {
      this.orderData = await tableWithLoading(() => {
        return this.$axios.post(
          urls.getOutProductPublicityByMonth,
          this.queryParam
        )
      })
    }
  }
}
</script>
