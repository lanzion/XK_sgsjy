// 单级数据字典
import { requestDictComb } from '@/service/common.js'

const state = {
    noticeTypeDicList: {}, // 资讯类型
    contestLevelDicList: {
        groupName: '竞赛级别',
        model: 'contestLevel',
        dicList: [
            { id: '10', code: '10', name: '省级' },
            { id: '6', code: '6', name: '市级' },
            { id: '7', code: '7', name: '区县级' },
        ]
    },
    contestStatusDicList: {
        groupName: '竞赛状态',
        model: 'contestStatus',
        dicList: [
            { id: '1', code: '1', name: '未开始' },
            { id: '2', code: '2', name: '进行中' },
            { id: '3', code: '3', name: '已结束' },
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
    // 性别
    sexDicList: {
        groupName: '性别',
        model: 'sex',
        dicList: [
            { id: '6', code: '6', name: '未知' },
            { id: '7', code: '7', name: '男', option: true },
            { id: '8', code: '8', name: '女', option: true },
            { id: '9', code: '9', name: '未说明' }
        ]
    },
    // 参赛人群
    actorTypeDicList: {
        groupName: '参赛人群',
        model: 'actorType',
        dicList: [
            { id: '1', code: '1', name: '学生' },
            { id: '2', code: '2', name: '老师' }
        ]
    },
    // 参赛形式
    actorWayDicList: {
        groupName: '参赛形式',
        model: 'actorWay',
        dicList: [
            { id: '1', code: '1', name: '个人' },
            { id: '2', code: '2', name: '团体' }
        ]
    },
    // 学段
    periodKeyDicList: {
        groupName: '学段',
        model: 'periodKey',
        dicList: [
            { id: 'primarySchool', name: '小学', code: '1' },
            { id: 'middleSchool', name: '初中', code: '2' },
            { id: 'highSchool', name: '高中', code: '3' }
        ]
    },
    // 赛程
    phaseDicList: {
        groupName: '赛程',
        model: 'phase',
        dicList: [
            { id: '1', name: '校级评比', code: '1' },
            { id: '2', name: '区(县)级评比', code: '2' },
            { id: '3', name: '市级评比', code: '3' },
            { id: '4', name: '省级评比', code: '4' },
            { id: '5', name: '国家级评比', code: '5' }
        ]
    },
    // 审核状态
    auditStatusDicList: {
        groupName: '审核状态',
        model: 'auditStatus',
        dicList: [
            { id: '0', name: '待审核', code: '0' },
            { id: '1', name: '通过', code: '1' },
            { id: '2', name: '未通过', code: '2' }
        ]
    },
    // 获奖级别
    awardLevelDicList: {
        groupName: '获奖级别',
        model: 'awardLevel',
        dicList: [
            { id: '10', name: '省级', code: '10' },
            { id: '6', name: '市级', code: '6' },
            { id: '7', name: '区县级', code: '7' },
            { id: '9', name: '校级', code: '9' }
        ]
    }
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
