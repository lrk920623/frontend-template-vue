import {
  CHANGE_MENU_COLLAPSED,
  CHANGE_ACTIVE_MENU,
  CHANGE_TABLE_LOADING
} from '../types/mutation-types'

export const state = () => ({
  menuCollapsed: false,
  activeMenu: '',
  tableLoading: false
})

export const mutations = {
  [CHANGE_MENU_COLLAPSED](state, collapse) {
    state.menuCollapsed = collapse
  },

  [CHANGE_ACTIVE_MENU](state, menu) {
    state.activeMenu = menu
  },

  [CHANGE_TABLE_LOADING](state, load) {
    state.tableLoading = load || false
  }
}
