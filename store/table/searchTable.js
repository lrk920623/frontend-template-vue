import { GET_LIST } from '../../types/action-types'
import { SET_LIST, CHANGE_TABLE_LOADING } from '../../types/mutation-types'

export const state = () => ({
  list: []
})

export const mutations = {
  [SET_LIST](state, list) {
    state.list = list
  }
}

export const actions = {
  async [GET_LIST]({ commit }, payload) {
    console.log('payload', payload)

    const { data } = await this.$axios.get('table.json')

    commit(SET_LIST, data.data.details)
    commit(CHANGE_TABLE_LOADING, null, { root: true })
  }
}
