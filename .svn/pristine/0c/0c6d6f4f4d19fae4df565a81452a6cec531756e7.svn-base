// 单级数据字典
import { requestDictComb } from '@/service/common.js'

const state = {
    noticeTypeDicList: {}, // 资讯类型
    contestStatusDicList: {
        groupName: '竞赛状态',
        model: 'contestStatus',
        dicList: [
            { id: '1', code: '1', name: '未开始' },
            { id: '2', code: '2', name: '进行中' },
            { id: '3', code: '3', name: '已结束' },
        ]
    },
    contestLevelDicList: {
        groupName: '竞赛级别',
        model: 'contestLevel',
        dicList: [
            // { id: '5', code: '5', name: '国家级' },
            { id: '10', code: '10', name: '省级' },
            { id: '6', code: '6', name: '市级' },
            { id: '7', code: '7', name: '区县级' },
        ]
    },
    signupStatusDicList: {
        groupName: '报名状态',
        model: 'signupStatus',
        dicList: [
            { id: '1', code: '1', name: '报名未开始' },
            { id: '2', code: '2', name: '正在报名' },
            { id: '3', code: '3', name: '报名已截止' },
        ]
    },
    // 活动状态
    activityStatusDicList: {
        groupName: '活动状态',
        model: 'activityStatus',
        dicList: [
            { id: '0', code: '0', name: '未开始' },
            { id: '1', code: '1', name: '进行中' },
            { id: '2', code: '2', name: '已结束' },
        ]
    },
    // 活动报名状态
    activityRegisterDicList: {
        groupName: '活动报名',
        model: 'activityRegister',
        dicList: [
            { id: '1', code: '1', name: '进行中' },
            { id: '2', code: '2', name: '已截止' }
        ]
    },
}

const mutations = {
    saveDictComb(state, payload) {
        state[`${payload.model}DicList`] = payload
    },
}

const actions = {
    async getDictComb({ commit, state }, model) {
        const dicComb = state[`${model}DicList`] || {}
        if (dicComb.model === undefined || dicComb.model === null) {
            const response = await requestDictComb({ groupCode: model })
            const data = Object.assign({}, response.data.entity, { model })
            commit('saveDictComb', data)
            return data
        }

        return dicComb
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
