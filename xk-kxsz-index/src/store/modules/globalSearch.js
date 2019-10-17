import {
    requestHot
} from '@/service/work'

// state
const state = {
	keyWords: localStorage.getItem('keyWords'), // 全局搜索关键词
	typeIndex: localStorage.getItem('typeIndex'), // 搜索类型索引
	spaceType: localStorage.getItem('spaceIndex'), // 空间类型
	activityType: localStorage.getItem('activityType'), // 竞赛或活动
	totalNum: 0,
	ifInput: false, // 搜素输入框的显示
	searchType: '0', // 搜索类型
	searchOptions: [ // 搜索选项
        { label: '全部', val: '0' },
        { label: '作品', val: '1' },
        { label: '活动', val: '2' },
        { label: '课程', val: '3' },
        { label: '项目', val: '4' },
        { label: '实训', val: '5' },
        { label: '空间', val: '6' }
    ]
}

// getter
const getters = {}

// actions
const actions = {
	showInput({ commit }, flag) {
		commit('SHOWINPUT', flag)
	},
	changeSearchType({ commit }, val) {
		commit('CHANGESEARCHTYPE', val)
	},
	changeKeyWords({ commit }, val) {
		commit('CHANGEKEYWORDS', val)
		localStorage.setItem('keyWords', val)
	},
	setTotalNum({ commit }, val) {
		commit('SETTOTALNUM', val)
	},
	setTypeIndex({ commit }, val) {
		commit('SETTYPEINDEX', val)
		localStorage.setItem('typeIndex', val)
	},
	setSpaceType({ commit }, val) {
		commit('SETSPACETYPE', val)
		localStorage.setItem('spaceType', val)
	},
	setActivityType({ commit }, val) {
		commit('SETACTIVITYTYPE', val)
		localStorage.setItem('activityType', val)
	}
}

// mutations
const mutations = {
	['SHOWINPUT'](state, flag) {
		state.ifInput = flag
	},
	['CHANGESEARCHTYPE'](state, val) {
		state.searchType = val
	},
	['CHANGEKEYWORDS'](state, val) {
		state.keyWords = val
	},
	['SETTOTALNUM'](state, val) {
		state.totalNum = val
	},
	['SETTYPEINDEX'](state, val) {
		state.typeIndex = val
	},
	['SETSPACETYPE'](state, val) {
		state.spaceType = val
	},
	['SETACTIVITYTYPE'](state, val) {
		state.activityType = val
	}
}

export default {
	namespaced: true,
    state,
    getters,
    actions,
    mutations,
}