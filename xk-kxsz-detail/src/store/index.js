import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import login from './modules/login'
import dataDictionary from './modules/dataDictionary'
import dictionaryCommon from './modules/dictionaryCommon'
import globalSearch from './modules/globalSearch.js'
import course from './modules/course.js'
import project from './modules/project.js'
import teacherAndStudent from './modules/teacherAndStudent.js'
import edu from './modules/edu.js'
import studio from './modules/studio.js'
import subject from './modules/subject.js'
import interest from './modules/interest.js'

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
        globalSearch,
        course,
        project,
        teacherAndStudent,
        edu,
        studio,
        subject,
        interest
    },
})

