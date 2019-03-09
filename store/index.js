import {
  CHANGE_MENU_COLLAPSED,
  CHANGE_ACTIVE_MENU,
  CHANGE_TABLE_LOADING,
  CHANGE_MODAL_VISIBLE
} from '../types/mutation-types'

import { layout } from 'utils/config'

export const state = () => ({
  menuCollapsed: false,
  activeMenu: '',
  tableLoading: false,
  modalVisible: false,
  globalLayout: layout
})

export const mutations = {
  // 侧边栏菜单的伸缩状态
  [CHANGE_MENU_COLLAPSED](state, collapse) {
    state.menuCollapsed = collapse
  },

  // 高亮菜单的标识
  [CHANGE_ACTIVE_MENU](state, menu) {
    state.activeMenu = menu || ''
  },

  // 表格共通的loading状态
  [CHANGE_TABLE_LOADING](state, load) {
    state.tableLoading = load || false
  },

  // 模态框的显示/关闭状态
  [CHANGE_MODAL_VISIBLE](state, current) {
    state.modalVisible = current
  }
}
