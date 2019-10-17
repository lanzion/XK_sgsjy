// 多级数据字典
import { requestPubSearch } from '@/service/common.js'
import Vue from 'vue'

const state = {}

const mutations = {
    saveData(state, { model, data } = {}) {
        // state[payload.model] = payload.data
        Vue.set(state, model, data)
    },
}

function deleteChild(data) {
    for (const i in data) {
        if (data[i].children.length === 0) {
            delete data[i].children
        } else if (data[i].children !== undefined) {
            deleteChild(data[i].children)
        }
    }
}

const actions = {
    async getData({ commit, state }, payload) {
        const _data = state[payload.model]
        if (_data === undefined || !_data.length) {
            const response = await requestPubSearch(payload)
            deleteChild(response.data.entity)

            const data = Object.assign({}, { data: response.data.entity }, { model: payload.model })
            commit('saveData', data)
            return response.data.entity
        }

        return _data
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
