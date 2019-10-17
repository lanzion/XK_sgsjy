// import { detailProject } from '@/service/project.js'
// import dataTranslation from '@/js/dataTranslation.js'

// const state = {
//   projectDetail: {} // 项目详情
// }

// // actions
// const actions = {
//     requestDetail ({commit, state}, payload = {}) {
//         if (payload.id === state.projectDetail.id) {
//             return
//         }else {
//             detailProject (payload).then(res =>  { // 获取项目详情
//                 if (res.data.code === 200) {
//                     let _data = res.data.entity || {}
//                     let _detail = {}
//                     _detail.id = _data.id || ''
//                     _detail.content = _data.content || ''
//                     _detail.projectTypeName = _data.projectTypeName || ''
//                     _detail.name = _data.name || ''
//                     _detail.goal = _data.goal || ''
//                     _detail.startDate = _data.startDate || ''
//                     _detail.endDate = _data.endDate || ''
//                     _data.projectPhaseList.forEach( (i, k) => {
//                     i.name = [
//                                 '项目发起',
//                                 '项目准备',
//                                 '项目设计',
//                                 '原型制作',
//                                 '测试迭代',
//                                 '项目评价'
//                             ][k]
//                     })
//                     _detail.projectPhaseList = _data.projectPhaseList || []
//                     _detail.enrollEndDate = _data.enrollEndDate || ''
//                     _detail.createName = _data.createName || ''
//                     _detail.projectTypeName = _data.projectTypeName || ''
//                     _detail.totalNum = _data.totalNum || ''
//                     _detail.materialList = _data.materialList || ''
//                     _detail.createTime = _data.createTime || ''
//                     _detail.currNum = _data.currNum || ''
//                     _detail.imgUrl = _data.imgUrl || ''
//                     _detail.status = _data.status || ''
//                     dataTranslation(_data.applyScopeId, 'learningStages').then(res => {
//                         _detail.applyScopeId = res
//                         commit('setProjectDetail', _detail)
//                     })

//                 }
//             })
//         }
//     }
// }

// // mutations
// const mutations = {
//   setProjectDetail (state, payload = {}) { // 同步当前項目详情内容
//     state.projectDetail = payload
//   }
// }

// export default {
//   namespaced: true, // 命名空间模块
//   state,
//   actions,
//   mutations
// }


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
