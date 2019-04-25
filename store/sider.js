import { GET_MENU_LIST } from 'utils/types/action-types'
import { SET_MENU_LIST } from 'utils/types/mutation-types'

export const state = () => ({
  activeMenu: '',
  menuList: []
})

export const mutations = {
  [SET_MENU_LIST](state, list) {
    state.menuList = list
  }
}

export const actions = {
  async [GET_MENU_LIST]({ commit }) {
    const { data } = await this.$axios.get('menu.json')
    commit(SET_MENU_LIST, data)
  }
}
