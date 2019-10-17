
//state
const state = {
	typeId:'',
	statistical:{
		status:1,
		taskNum:0,
		activityNum:0,
		resultNum:0
	},
}

const actions = {
	setTabsId({ commit }, typeId) {
        commit('SETTABSID', typeId)
    },
    setStatistical({ commit }, datas){
    	commit('SETSTATISTICAL',datas)
    },
    statisticalAdd({ commit },model){
    	commit('STATISTICALADD',model)
    },
    statisticalSub({ commit },model){
    	commit('STATISTICALSUB',model)
    }
}

//mutations
const mutations = {
	['SETTABSID'](state, typeId) {
        state.typeId = typeId
    },
    //课题统计数据
    ['SETSTATISTICAL'](state,datas) {
    	state.statistical.status = datas.status;
    	state.statistical.taskNum = datas.taskNum;
    	state.statistical.activityNum = datas.activityNum;
    	state.statistical.resultNum = datas.resultNum;
    },
    //课题统计数加1
    ['STATISTICALADD'](state,model) {
    	state.statistical[model] = ++state.statistical[model]
    },
    //课题统计数减1
    ['STATISTICALSUB'](state,model) {
    	state.statistical[model] = --state.statistical[model]
    }
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}