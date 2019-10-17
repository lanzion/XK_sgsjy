const state = {
    detail: {}
}

const mutations = {
    saveState(state, payload) {
        state.detail = payload
    }
}

const actions = {
    async save({ commit, state }, payload = {}) {
        commit('saveState', payload)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
