//state
const state = {
	memberNum:0
}

const actions = {
	setMemberNum({ commit },memberNum) {
		commit('SETMEMBERNUN',memberNum)
	}
}

//mutations
const mutations = {
	['SETMEMBERNUN'](state,memberNum){
		state.memberNum = memberNum
	}
}

export default {
	namespaced:true,
	state,
	mutations,
	actions
}