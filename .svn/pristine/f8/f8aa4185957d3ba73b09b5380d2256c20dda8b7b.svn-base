const state = {
    backgroundImage: null
}

// actions
const actions = {
    setBackGround({ commit }, img) {
        commit('SETBACKGROUND', img)
    },
}

// mutations
const mutations = {
    ['SETBACKGROUND'](state, img) {
        state.backgroundImage = img
    },
}

export default {
    namespaced: true, // 命名空间模块
    state,
    actions,
    mutations,
}
