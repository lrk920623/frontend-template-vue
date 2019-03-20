<template>
  <vo-page-layout header-title="内联编辑表格">
    <vo-search-box slot="searchBox">
      <vo-single-control label="规则编号">
        <vo-input
          v-model="queryParam.id"
          number="true"></vo-input>
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
      </template>

      <vo-single-control :md="!advanced && 8 || 24">
        <vo-search-reset
          v-model="advanced"
          @reset="reset"
          @search="getData"></vo-search-reset>
      </vo-single-control>
    </vo-search-box>

    <div slot="content">
      <div class="table-operator">
        <a-button
          type="primary"
          icon="plus"
          @click="newProductNoModal">
          新建(非弹出框)
        </a-button>
        <a-button
          type="primary"
          icon="plus"
          @click="newProduct">
          新建
        </a-button>
        <a-button
          v-if="selectedRowKeys.length > 0"
          style="margin-left: 8px"
          icon="file-add"
          @click="batchEdit">
          批量操作
        </a-button>
      </div>

      <vo-table
        ref="table"
        :columns="columns"
        :loading="tableLoading"
        :data="innerList"
        :selectable="true"
        @onSelect="onChange">
        <div
          slot="expandedRowRender"
          slot-scope="record">
          <vo-table
            :hide-page="true"
            :columns="innerColumns"
            :data="record.operations"></vo-table>
        </div>
        <template
          v-for="(col, index) in slotColumns"
          :slot="col.dataIndex"
          slot-scope="text, record, i">
          <div :key="index">
            <template v-if="col.dataIndex === 'productName'">
              <a-auto-complete
                v-if="record.itemEditable"
                :data-source="dataSource"
                style="width: 200px"
                placeholder="input here"
                @select="v => onSelect(v, i)"
                @search="handleSearch"></a-auto-complete>
              <template v-else>
                {{ text }}
              </template>
            </template>

            <template v-else>
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record, col.dataIndex)"></a-input>
              <template v-else>
                {{ text }}
              </template>
            </template>
          </div>
        </template>

        <template
          slot="action"
          slot-scope="text, record, i">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record)">
                保存
              </a>
              <a-divider type="vertical"></a-divider>
              <a-popconfirm
                title="真的放弃编辑吗?"
                @confirm="() => cancel(record)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a
                class="edit"
                @click="() => edit(record)">
                修改
              </a>
              <a-divider type="vertical"></a-divider>
              <a
                class="delete"
                @click="() => del(record, i)">
                删除
              </a>
            </span>
          </div>
        </template>
      </vo-table>
    </div>

    <vo-modal
      v-if="visible"
      title="新建商品"
      @close="() => {visible = false}"
      @handle-ok="ok">
      <h1>新建</h1>
    </vo-modal>

    <vo-modal
      v-if="batchVisible"
      title="批量操作"
      @close="() => {batchVisible = false}"
      @handle-ok="batchOk">
      <ul>
        <li
          v-for="item in selectedRows"
          :key="item._id">
          {{ item.productName }}
        </li>
      </ul>
    </vo-modal>
  </vo-page-layout>
</template>

<script>
import { CHANGE_TABLE_LOADING } from 'types/mutation-types'
import VoPageLayout from 'components/layout/PageLayout'
import VoSearchReset from 'components/business/SearchReset'
import VoSearchBox from 'components/searchBox/SearchBox'
import VoSingleControl from 'components/searchBox/SingleControl'
import VoInput from 'components/basic/Input'
import VoTable from 'components/table/RenderTable'
import VoModal from 'components/modal/index'
import { mapState, mapMutations } from 'vuex'
import { Modal } from 'ant-design-vue'
import { mixin } from 'utils/constant'

export default {
  name: 'VoInnerEdit',
  components: {
    VoSearchBox,
    VoSingleControl,
    VoPageLayout,
    VoSearchReset,
    VoTable,
    VoInput,
    VoModal
  },

  meta: {
    title: '内联编辑'
  },

  mixins: [mixin],

  data() {
    return {
      batchVisible: false,
      visible: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '编号',
          dataIndex: 'productId',
          width: 90
        },
        {
          title: '商品',
          dataIndex: 'productName',
          scopedSlots: { customRender: 'productName' }
        },
        {
          title: '价格',
          width: '150px',
          dataIndex: 'stockCost',
          scopedSlots: { customRender: 'stockCost' }
        },
        {
          title: '库存',
          width: '150px',
          dataIndex: 'stockQty',
          scopedSlots: { customRender: 'stockQty' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '120px',
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
      ],

      selectedRowKeys: [],
      selectedRows: [],
      cacheData: [],
      innerList: [],
      dataSource: []
    }
  },

  computed: {
    ...mapState(['tableLoading']),
    slotColumns() {
      return this.columns.filter(s => s.scopedSlots)
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    handleSearch(value) {
      this.dataSource = !value
        ? []
        : [value, value + value, value + value + value]
    },

    onSelect(value, index) {
      console.log('onSelect', value)

      const data = {
        editable: true,
        itemEditable: true,
        productId: value + '_id',
        productName: value,
        stockCost: null,
        stockQty: null,
        operations: [
          {
            name: '大卖场',
            price: 100,
            origin: 200,
            member: 300,
            discount: 0.1
          },

          { name: '综超', price: 200, origin: 400, member: 600, discount: 1.1 }
        ]
      }

      this.$set(this.innerList, index, data)
      console.log(this.innerList)
    },

    reset(val) {
      this.queryParam = val
    },

    getData() {
      this.loading(true)
      this.getList(this.queryParam)
    },

    async getList(payload) {
      const { data } = await this.$axios.post('/tableList', payload)

      this.loading(false)
      this.innerList = data.details.map((s, i) => {
        return Object.assign({}, s, { _id: i + 1 })
      })
      this.cacheData = this.innerList.map(item => ({ ...item }))
    },

    ...mapMutations({
      loading: CHANGE_TABLE_LOADING
    }),

    handleChange(value, record, code) {
      record[code] = value
    },

    edit(row) {
      this.$set(row, 'editable', true)

      this.$refs.table.updateEdit()
    },

    // eslint-disable-next-line
    del(row, index) {
      let _vm = this
      Modal.confirm({
        title: '警告',
        content: '真的要删除吗?',
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          console.log('OK', _vm.innerList)
          // 在这里调用删除接口
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              _vm.innerList.splice(index, 1)
              resolve()
            }, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },

    save(row) {
      row.itemEditable = false
      row.editable = false
      this.cacheData = this.innerList.map(item => ({ ...item }))

      this.$refs.table.updateEdit()
    },

    cancel(row) {
      const target = this.innerList.find(item => row._id === item._id)
      row = Object.assign(
        target,
        this.cacheData.find(item => row._id === item._id)
      )
      row.editable = false

      this.$refs.table.updateEdit()
    },

    onChange(row) {
      this.selectedRowKeys = row.selectedRowKeys
      this.selectedRows = row.selectedRows
    },

    newProduct() {
      this.visible = !this.visible
    },

    newProductNoModal() {
      this.innerList.splice(0, 0, { itemEditable: true, editable: true })
    },

    batchEdit() {
      console.log('selectedRows', this.selectedRows)
      this.batchVisible = !this.batchVisible
    },

    ok() {
      console.log('ok')
    },

    batchOk() {
      console.log('batchOk')
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}

.fold {
  width: calc(100% - 216px);
  display: inline-block;
}

.operator {
  margin-bottom: 18px;
}

@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
