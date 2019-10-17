// 竞赛首页
import xhr from 'Axios'

// 详情
const requestDetail = (options = {}) => xhr.post(`/maker/match/selectDetail`, options)

// 线下赛事-详情
const requestOfflineDetail = (options = {}) => xhr.post(`/maker/matchOffline/selectDetail`, options)

// 参赛分类
const requestMatchProject = (options = {}) => xhr.post(`/maker/matchProject/listbymacthid`, options)

// 获取参赛者信息
const requestMatchActor = (options = {}) => xhr.post(`/maker/matchActor/selectActorDetail`, options)

// 报名
const requestAdd = (options = {}) => xhr.post(`/maker/matchActor/add`, options)

// 赛程进度
const requestSteep = (options = {}) => xhr.post(`/maker/matchPhase/getSteepByMatchIdNew`, options)

// 报名 - 判断报名状态
const requestIsApply = (options = {}) => xhr.post(`/maker/matchActor/isApply`, options)

// 竞赛 - 管理入口 - 判断是否赛事管理
const judgeManage = (options = {}) => xhr.post(`/maker/match/checkInManage`, options)

// 竞赛 - 管理入口 - 判断是否赛事管理(线下)
const judgeManageOffline = (options = {}) => xhr.post(`/maker/matchOffline/checkInManage`, options)

// 竞赛 - 专家入口 - 判断是否赛事专家
const judgeExpert = (options = {}) => xhr.post(`/maker/matchActor/isMatchExpert`, options)

// 竞赛 - 参赛人员 - 判断是否参加比赛
const judgeTakepartIn = (options = {}) => xhr.post(`/maker/matchActor/isTakePartIn`, options)

/*************/
// 线下竞赛
const requestOfflineStatis = (options = {}) => xhr.post(`/maker/matchOfflineActor/selectMatchStatistics`, options)
// 竞赛--参赛人员--报名--判断报名状态
const offlineIsApply = (options = {}) => xhr.post(`/maker/matchOfflineActor/isApply`, options)
// 线下竞赛 - 首页 - 进度
const requestOfflineStep = (options = {}) => xhr.post(`/maker/matchOfflinePhase/getSteepByMatchIdNew`, options)

export {
    requestDetail,
    requestOfflineDetail,
    requestMatchProject,
    requestMatchActor,
    requestAdd,
    requestSteep,
    requestIsApply,
    judgeManage,
    judgeManageOffline,
    judgeExpert,
    judgeTakepartIn,
    requestOfflineStatis,
    offlineIsApply,
    requestOfflineStep
}



