import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import login from './modules/login'
import dataDictionary from './modules/dataDictionary'
import dictionaryCommon from './modules/dictionaryCommon'
import course from './modules/course.js'

Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        login,
        dataDictionary,
        dictionaryCommon,
        course,
    },
})

