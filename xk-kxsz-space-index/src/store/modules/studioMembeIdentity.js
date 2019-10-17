const state = {
    hasPermissions: true
}

// actions
const actions = {
    setPermissions({ commit }, permissions) {
        commit('SETPERMISSIONS', permissions)
    },
}

// mutations
const mutations = {
    ['SETPERMISSIONS'](state, permissions) {
        state.hasPermissions = permissions
    },
}

export default {
  namespaced: true, // 命名空间模块
  state,
  actions,
  mutations,
}
