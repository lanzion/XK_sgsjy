import { requestUserBaseInfo } from '@/service/common.js'

const state = {
  // 选中的领域
  fieldSelected: {
    index: [],
    idArr: []
  },
}

// getter
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  setSelectedField (state, {index = [], idArr = []} = {}) { // 同步选中的领域
    state.fieldSelected = {index, idArr}
  },
}

export default {
  namespaced: true, // 命名空间模块
  state,
  getters,
  actions,
  mutations,
}
