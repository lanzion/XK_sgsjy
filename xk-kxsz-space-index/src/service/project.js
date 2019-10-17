import xhr from 'Axios'
//项目模块

//后台发布
let addProject = (options = {}) => xhr.post('maker/project/add', options)

//后台修改
let modifyProject = (options = {}) => xhr.post('maker/project/modify', options)

//后台详情
let detailProject = (options = {}) => xhr.post('maker/project/selectDetail', options)

//后台列表
let adminProjectList = (options = {}, pagParam = {}) => xhr.post(`maker/project/selectTeacherBackProjectList?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)
//后台阶段列表
let adminProjectPhaseList = (options = {}) => xhr.post(`maker/project/phase/list`, options)

//后台待审成员列表
let adminProjectMemberApply = (options = {}, pagParam = {}) => xhr.post(`maker/projectMemberApply/selectMemberList?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)

//后台已审成员列表
let adminProjectMemberUnapply = (options = {}, pagParam = {}) => xhr.post(`maker/projectMember/selectMemberList?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)


//后台邀请成员获取本校学生
let admininviteMembersList = (options = {}) => xhr.post(`admin/baseData/grade/selectStudentList`, options)

//后台邀请成员发送数据
let admininviteMembersSend = (options = {}) => xhr.post(`maker/systemMessage/addInvite`, options)

//后台成员审核通过/不通过
let adminMembersApplyThrough = (options = {}) => xhr.post(`maker/projectMemberApply/auditMember`, options)

//后台教育局/学校项目管理
let selectProjectAuditList = (options = {}, pagParam = {}) => xhr.post(`maker/projectAudit/selectProjectAuditList?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)

//后台教育局/学校项目推荐
let adminProjectRecommended = (options = {}) => xhr.post(`maker/recommend/add`, options)

//后台阶段完成
let adminProjectStageComplete = (options = {}) => xhr.post(`maker/project/phase/finish`, options)
//后台阶段完成
let adminProjectStageSubmit = (options = {}) => xhr.post(`maker/project/phase/submit`, options)

//后台总结添加
let adminProjectConclusionAdd = (options = {}) => xhr.post(`maker/project/summary/submit`, options)

//后台共享资源列表
let adminProjectResourceGetList = (options = {}, pagParam = {}) => xhr.post(`maker/project/resource/getList?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)

//后台总结添加
let deleteResource = (options = {}) => xhr.post(`maker/project/resource/del`, options)

//后台总结添加
let uploadResource = (options = {}) => xhr.post(`maker/project/resource/add`, options)

//后台总结详情
let adminProjectSummaryDetail = (options = {}) => xhr.post(`maker/project/summary/detail`, options)

// 前台
//教育局、学校、老师列表
let projectList = (options = {}, pagParam = {}) => xhr.post(`maker/project/selectEduSchoolTeacherFrontProjectList?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)
// 讨论区
// 添加回复
let projectDiscussAddDiscuss = (options = {}) => xhr.post(`maker/projectDiscuss/addDiscuss`, options)

// 教师、学生个人后台列表删除
let projectTeaStuListDel = (options = {}) => xhr.post(`/maker/project/del`, options)

// 教师、学生个人后台提交审核
let projectTeaStuSubmitAudit = (options = {}) => xhr.post(`/maker/project/submitAudit`, options)

// 项目及报名状态
let projectApply = (options = {}) => xhr.post(`/maker/projectMemberApply/isApply`, options)

// 是否报名成功
let isSignedProject = (options = {}) => xhr.post(`/maker/projectMemberApply/isAudited`, options)

// 创客教育相关项目
let projectAboutList = (options = {}, pagParam = {}) => xhr.post(`/maker/project/selectAboutProjectList?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)

// 创客教育-项目学习--猜你喜欢-列表
const requestFavoriteProjectList = (options = {}) => xhr.post(`/maker/project/selectProjecLearntRecommendList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

export {
  addProject,
  modifyProject,
  detailProject,
  adminProjectList,
  adminProjectPhaseList,
  adminProjectMemberApply,
  adminProjectMemberUnapply,
  projectList,
  admininviteMembersList,
  admininviteMembersSend,
  adminMembersApplyThrough,
  selectProjectAuditList,
  adminProjectRecommended,
  adminProjectStageComplete,
  adminProjectConclusionAdd,
  adminProjectResourceGetList,
  deleteResource,
  uploadResource,
  adminProjectSummaryDetail,
  adminProjectStageSubmit,
  projectDiscussAddDiscuss,
  projectTeaStuListDel,
  projectTeaStuSubmitAudit,
  projectAboutList,
  projectApply,
  isSignedProject,
  requestFavoriteProjectList,
}
