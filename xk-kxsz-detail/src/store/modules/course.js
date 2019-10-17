import { requestBackendListOfTeacher, requestCourseDetail, requestOutline, queryStudyingProgress } from '@/service/course.js'
import Vue from 'vue'

const state = {
  courseDetail: {}, // 课程详情
  courseOutline: [], // 课程目录信息
  progressInfo: {}, // 课程学习进度
  videoPageIsSwitching: false,
}

const backend = { // 课程后台
  namespaced: true,
  state: {
    addQuestionDialogIsVisible: false, // 是否显示添加题目弹窗
    managePointDialogIsVisible: false,
    selectQuestionDialogIsVisible: false,
    listOfTeacher: [],
    curEditingQuestion: {}
  },
  mutations: {
    showDialog(state, prefix) { // 显示添加题目/管理知识点弹窗
      state[`${prefix}DialogIsVisible`] = true
    },
    hideDialog(state, prefix) { // 隐藏添加题目/管理知识点弹窗
      state[`${prefix}DialogIsVisible`] = false
    },
    requestListOfTeacher(state, payload) {
      state.listOfTeacher = payload
    },
    setCurEditingQuestion(state, payload = {}) { // 同步当前需要编辑的题目内容
      state.curEditingQuestion = payload
    }
  },
  actions: {
    async requestListOfTeacher({ commit }, payload) {
      let response = await requestBackendListOfTeacher(payload)
      commit('requestListOfTeacher', response.data.entity.resultData)
    }
  }
}
const frontend = { // 课程前台
  namespaced: true,
  state: {},
  mutations: {},
  actions: {}
}

// getter
const getters = {
  videoSrcArr(state) { // 筛选出课时类型为视频的资源信息
    let res = []
    state.courseOutline.forEach(chapter => {
      let _sections = chapter.courseHourSectionList || []
      _sections.forEach(section => {
        section.sectionType === '1' && res.push({
          chapterId: section.chapterId,
          sectionId: section.id,
          url: section.url || 'http://ips.ifeng.com/video19.ifeng.com/video09/2017/07/04/4703972-102-008-1416.mp4?gid=kN_bwV0Mvm2W',
          sectionType: section.sectionType
        })
      })
    })
    return res
  },
  sectionsList(state) {
    let res = []
    state.courseOutline.forEach(chapter => {
      let _sections = chapter.courseHourSectionList || []
      _sections.forEach(section => {
        res.push({
          chapterId: section.chapterId,
          sectionId: section.id,
          sectionType: section.sectionType
        })
      })
    })
    return res
  }
}

// actions
const actions = {
  async requestCourseDetail({ commit, state }, payload = {}) { // 获取课程详情
    if (payload.id === state.courseDetail.id) return state.courseDetail

    let res = await requestCourseDetail(payload)

    if (res.data.code === 200) {
      let _data = res.data.entity || {}
      let bus = new Vue()
      let _detail = {}
      _detail.id = _data.id || ''
      _detail.content = _data.content || '暂无数据'
      _detail.courseTypeName = _data.courseTypeName || '暂无数据'
      _detail.createDate = _data.createDate || ''
      _detail.createId = _data.createId || ''
      _detail.fit = _data.fit || '暂无数据'
      _detail.grade = _data.grade || '暂无数据'
      _detail.imgUrl = _data.cover || ''
      _detail.isFree = _data.isFree === '1' && '免费' || '收费'
      _detail.name = _data.name || '暂无数据'
      _detail.orgId = _data.orgId || ''
      _detail.score = _data.score || 0
      _detail.target = _data.target || '暂无数据'
      _detail.teacher = _data.teacherId || '暂无数据'
      _detail.total = _data.num || 0
      _detail.technology = (_data.technologyRelationList || []).map(item => item.technologyId).join(',') || ''
      bus.dataTranslation(_detail.technology, 'technicalClassification', { key: 'id' }).then(res => _detail.technology = res)
      bus.dataTranslation(_detail.grade, 'courseGrade', { key: 'id' }).then(res => _detail.grade = res)
      bus.dataTranslation(_detail.fit, 'periodKey').then(res => _detail.fit = res)
      commit('setCourseDetail', _detail)
      return _detail
    }
  },
  async requestOutline({ commit, state }, payload = {}) { // 获取课程目录
    // if (payload.courseId === (state.courseOutline[0] || {}).courseId) return
    let res = await requestOutline(payload)
    if (res.data.code === 200) {
      let _entity = res.data.entity || {}
      commit('setCourseOutline', _entity.resultData || [])
    }
  },
  async queryStudyingProgress({ commit }, payload = {}) { // 获取课程学习进度
    let res = await queryStudyingProgress(payload)
    if (res.status === 200 && res.data.code === 200) {
      let _entity = res.data.entity || {}
      _entity.proccess = _entity.proccess === undefined ? 0 : ~~(_entity.proccess * 1000) / 10
      commit('setProgress', _entity)
    }
  }
}

// mutations
const mutations = {
  setCourseDetail(state, payload = {}) { // 同步当前课程详情内容
    state.courseDetail = payload
  },
  setCourseOutline(state, payload = []) { // 同步当前课程目录信息
    state.courseOutline = payload
  },
  setProgress(state, payload = {}) { // 同步当前课程的学习进度
    state.progressInfo = payload
  },
  toggleSwitching(state, { isSwitching = false } = {}) { // 视频页面切换相关课程
    state.videoPageIsSwitching = isSwitching
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
    backend,
  },
}
