import { GET_SEARCH_LIST } from 'utils/types/action-types'
import {
  SET_SEARCH_LIST,
  CHANGE_TABLE_LOADING
} from 'utils/types/mutation-types'

export const state = () => ({
  searchList: []
})

export const mutations = {
  [SET_SEARCH_LIST](state, list) {
    state.searchList = list.map((s, i) => {
      return Object.assign({}, s, { _id: i + 1 })
    })
  }
}

export const actions = {
  async [GET_SEARCH_LIST]({ commit }, payload) {
    const { data } = await this.$axios.post('/tableList')

    commit(SET_SEARCH_LIST, data.details)
    commit(CHANGE_TABLE_LOADING, null, { root: true })
  }
}
