import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import login from './modules/login.js'
import course from './modules/course.js'
import dataDictionary from './modules/dataDictionary.js'
import dictionaryCommon from './modules/dictionaryCommon.js'
import teacherAndStudent from './modules/teacherAndStudent.js'
import subject from './modules/subject.js'
import interest from './modules/interest.js'
import edu from './modules/edu.js'
import spaceBackground from './modules/spaceBackground.js'
import studio from './modules/studio.js'
import project from './modules/project.js'

Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    login,
    course,
    dataDictionary,
    dictionaryCommon,
    teacherAndStudent,
    subject,
    interest,
    edu,
    spaceBackground,
    studio,
    project
  }
})

