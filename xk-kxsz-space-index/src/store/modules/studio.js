const state = {
    hasPermissions: true,
    typeList: []
}

// actions
const actions = {
    setPermissions({ commit }, permissions) {
        commit('SETPERMISSIONS', permissions)
    },
    setTypeList({ commit }, typeList) {
      commit('SETTYPELIST', typeList)
    }
}

// mutations
const mutations = {
    ['SETPERMISSIONS'](state, permissions) {
        state.hasPermissions = permissions
    },
    // 添加分类
    ['SETTYPELIST'](state, typeList) {
      state.typeList = typeList
    }
}

export default {
  namespaced: true, // 命名空间模块
  state,
  actions,
  mutations,
}
