import { requestUserBaseInfo } from '@/service/common.js'

const state = {
  detailInfo: {}, // 个人信息
  relatedData: {}, // 相关统计数据
}

const backend = { // 后台
  namespaced: true,
  state: {},
  mutations: {},
  actions: {}
}
const frontend = { // 前台
  namespaced: true,
  state: {},
  mutations: {},
  actions: {}
}

// getter
const getters = {}

// actions
const actions = {
  async requestRelatedData ({commit}, payload = {}) { // 获取相关统计数据
    let {id, isStudent} = payload
    let label = isStudent && 'student' || 'teacher'
    let res = await requestUserBaseInfo({userId: id})
    if (res.data.code === 200) {
      let info = res.data.appendInfo && res.data.appendInfo[label] || {}
      let space = res.data.appendInfo && res.data.appendInfo.space || {}
      const {name, schoolName, face, counts} = info
      const background = space.background
      commit('setRelatedData', counts || {})
      commit('setDetailInfo', {name, schoolName, face, background})
    }
  }
}

// mutations
const mutations = {
  setDetailInfo (state, payload = {}) { // 同步个人信息
    state.detailInfo = payload
  },
  setRelatedData (state, payload = {}) { // 同步相关统计数据
    state.relatedData = payload
  },
}

export default {
  namespaced: true, // 命名空间模块
  state,
  getters,
  actions,
  mutations,
  modules: {
    frontend,
    backend
  }
}
