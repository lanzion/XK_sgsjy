// 竞赛管理
import xhr from 'Axios'

// 竞赛项目 - 列表(发布后)
const requestMatchProjectList = (options = {}) => xhr.post('/maker/matchProject/listbymacthid', options)
// 项目类别 - 列表(线下 发布后)
const requestOfflineProjectList = (options = {}) => xhr.post('/maker/match/offline/projectRelation/list', options)
// 申报组别 - 列表(线下 发布后)
const requestOfflineDeclareList = (options = {}) => xhr.post('/maker/match/offline/declareRelationt/list', options)


// 名额分配 - 列表(已分配)
const requestQuotaList = (options = {}) => xhr.post('/maker/matchQuotaAllocation/selectPager', options)
// 名额分配 - 分配 - 分配列表
const requestQuotaSettingList = (options = {}) => xhr.post('/maker/matchQuotaAllocation/selectAddPager', options)
// 名额分配 - 批量分配
const saveBatchQuotaList = (options = {}) => xhr.post('/maker/matchQuotaAllocation/batchAdd', options)
// 名额分配 - 分配
const saveQuotaList = (options = {}) => xhr.post('/maker/matchQuotaAllocation/add', options)


// 评比设定 - 获取上级评比时间
const requestPhaseDetail = (options = {}) => xhr.post('/maker/matchAwardsRule/selectDetail', options)
// 评比设定 - 保存
const saveCompareConfig = (options = {}) => xhr.post('/maker/matchAwardsRule/add', options)


// 参赛人员 - 列表(学校/县市省教育局)
const requestMatchActorList = (options = {}, pageParam = {}) => xhr.post(`/maker/matchActor/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 参赛人员 - 审核
const contestMemberAudit = (options = {}) => xhr.post('/maker/matchActor/audit', options)
// 参赛人员 - 批量审核
const contestMemberBatchAudit = (options = {}) => xhr.post('/maker/matchActor/audits', options)


// 参赛作品 - 列表
const requestManageWorksList = (options = {}, pageParam = {}) => xhr.post(`maker/matchWorks/selectOrgWorksPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 参赛作品 - 审核
const contestWorksAudit = (options = {}) => xhr.post('/maker/matchWorks/audit', options)
// 参赛作品 - 批量审核
const contestWorksBatchAudit = (options = {}) => xhr.post('/maker/matchWorks/audits', options)
// 参赛作品 - 参赛记录
const requestWorksCompeteRecord = (options = {}) => xhr.post('/maker/matchExpertWorksEvaluation/selectMatchRecordsList', options)
// 参赛作品 - 获奖记录
const requestAwardRecord = (options = {}) => xhr.post('/maker/matchResult/selectMatchAwardsRecordsList', options)
// 参赛作品 - 评审记录
const requestWorksReviewRecord = (options = {}, pageParam = {}) => xhr.post(`/maker/matchExpertWorksEvaluation/selectEvaluationRecordsList?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 参赛作品 - 手动上报
const worksReport = (options = {}) => xhr.post('/maker/matchWorks/manualWorksReport', options)
// 赛事管理 - 参赛作品 - 自动上报
const worksAutoReport = (options = {}) => xhr.post('/maker/matchWorks/autoWorksReport', options)
// 参赛作品 - 手动撤销
const worksCancel = (options = {}) => xhr.post('/maker/matchWorks/cancelWorksReport', options)
// 参赛作品 - 阶段列表
const requestWorksPhaseList = (options = {}) => xhr.post('/maker/matchPhase/getAllPhaseList', options)
// 我的作品 - 所在赛程
const requestContestPhaseList = (options = {}) => xhr.post('/maker/matchPhase/getPhaseList', options)
// 删除作品
const delByMatchIdAndId = (options = {}) => xhr.post('/maker/matchWorks/delByMatchIdAndId', options)
// 参赛作品 - 批量上报
const batchManualWorksReport = (options = {}) => xhr.post('/maker/matchWorks/batchManualWorksReport', options)
// 参赛作品 - 批量撤回
const batchCancelWorksReport = (options = {}) => xhr.post('/maker/matchWorks/batchCancelWorksReport', options)


// 赛事管理 - 获奖奖项
const requestAwardsByPhase = (options = {}) => xhr.post('/maker/matchAwards/selectByMatchAndPhase', options)
// 竞赛-赛事管理--评奖
const addAwards = (options = {}) => xhr.post('/maker/matchResult/add', options)
// 竞赛-赛事管理--待上报作品数
const reportWorksNum = (options = {}) => xhr.post('/maker/matchQuotaAllocationItem/selectReportWorksNum', options)


// 评审专家 - 列表
const requestContestExpertList = (options = {}, pageParam = {}) => xhr.post(`/maker/matchExpert/expertlist?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 评审专家 - 添加
const addExpert = (options = {}) => xhr.post('/maker/matchExpertRelation/add', options)
// 评审专家 - 添加 - 专家库列表
const requestExpertList = (options = {}) => xhr.post('/maker/matchExpert/select/all', options)
// 评审专家 - 修改
const modifyExpert = (options = {}) => xhr.post('/maker/matchExpertRelation/modify', options)
// 评审专家 - 删除
const delExpert = (options = {}) => xhr.post('/maker/matchExpertRelation/delByIds', options)
// 评审专家 - 详情
const requestExpertDetail = (options = {}) => xhr.post('/maker/matchExpert/selectByRelationId', options)
// 评审专家 - 添加 - 老师(下拉列表)
const requestExpertTeacher = (options = {}, pageParam = {}) => xhr.post(`/maker/baseTeacher/selectAllByRegion?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)


// 赛事管理 - 获奖名单
const requestAwardsList = (options = {}, pageParam = {}) => xhr.post(`/maker/matchResult/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)


// 赛事管理 - 竞赛统计 - 获奖统计
const requestAwardStatList = (options = {}) => xhr.post('/maker/matchResult/selectVictoryCount', options)
// 赛事管理 - 竞赛统计 - 获奖排名
const requestAwardRankList = (options = {}) => xhr.post('/maker/matchResult/selectVictoryTop', options)
// 赛事管理 - 竞赛统计 - 获奖奖项
const requestAwards = (options = {}) => xhr.post('/maker/matchResult/selectAwards', options)
// 赛事管理 - 竞赛统计 - 参赛统计
const requestCompeteStatList = options => xhr.post('/maker/matchResult/selectParticipCountIndex', options)
const requestCompeteStat = options => xhr.post('/maker/matchResult/selectParticipCount', options)


// 赛事管理 - 竞赛动态 - 新增
const requestDynamicAdd = options => xhr.post('/maker/matchDynamic/add', options)
// 赛事管理 - 竞赛动态 - 列表
const requestDynamicList = (options, pageParam = {}) => xhr.post(`/maker/matchDynamic/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 赛事管理 - 竞赛动态 - 详情
const requestDynamicDetail = options => xhr.post('/maker/matchDynamic/selectDetail', options)
// 赛事管理 - 竞赛动态 - 修改
const requestDynamicModify = options => xhr.post('/maker/matchDynamic/modify', options)
// 赛事管理 - 竞赛动态 - 删除
const requestDynamicDel = options => xhr.post('/maker/matchDynamic/delByIds', options)


// 赛事管理 - 赛程详情 - 手动分配 - 未分配的作品列表
const requestWorksListByPhase = (options, pageParam = {}) => xhr.post(`/maker/matchPhase/getWorksListByPhase?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 赛事管理 - 赛程详情 - 列表
const requestPhaseList = (options = {}) => xhr.post('/maker/matchPhase/getPhaseList', options)
// 赛事管理 - 赛程详情 - 自动
const requestAutoAllocation = (options = {}) => xhr.post('/maker/matchPhase/autoAllocation', options)
// 赛事管理 - 赛程详情 - 手动
const requestManualAllocation = (options = {}) => xhr.post('/maker/matchPhase/manualAllocation', options)
// 赛事管理 - 赛程详情 - 手动 - 获取赛事阶段的专家
const requestExpertListByPhase = (options = {}) => xhr.post('/maker/matchExpertRelation/getExpertListByMatchIdAndPhaseId', options)
// 赛程详情 - 评审进度（查看下级阶段时调用）
const requestRecordRate = (options = {}, pageParam = {}) => xhr.post(`/maker/matchPhase/getPlanAll?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 赛事管理 - 赛程详情 - 评审进度 - 按作品查询
const requestPlanByWorks = (options = {}, pageParam = {}) => xhr.post(`/maker/matchPhase/getPlanByWorks?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 赛事管理 - 赛程详情 - 评审进度 - 按专家查询
const requestPlanByExpert = (options = {}, pageParam = {}) => xhr.post(`/maker/matchPhase/getPlanByExpert?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 赛事管理 - 赛程详情 - 评审结果
const requestResultByWorks = (options = {}, pageParam = {}) => xhr.post(`/maker/matchPhase/getResultByWorks?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 赛事管理 - 赛程详情 - 结束评比
const requestEndEvaluation = (options = {}) => xhr.post('/maker/matchPhase/finishReport', options)
// 赛事管理 - 赛程详情 - 结束评比
const requestAutoAward = (options = {}) => xhr.post('/maker/matchResult/autoAward', options)
// 赛事管理 - 赛程详情 - 结束评比
const requestSureSumit = (options = {}) => xhr.post('/maker/matchPhase/sureSumit', options)


// 参赛管理 - 列表(线下)
const requestOfflineOpus = (options = {}) => xhr.post('/maker/matchOfflineOpus/selectPager', options)
// 参赛管理 - 阶段列表(线下)
const requestOfflinePhaseList = (options = {}) => xhr.post('/maker/matchOfflinePhase/getPhaseList', options)
// 参赛管理 - 晋级(线下)
const doRiseOpus = (options = {}) => xhr.post('/maker/matchOfflineOutletOpus/batchRiseOpus', options)
// 参赛管理 - 评奖(线下)
const doAwardsOpus = (options = {}) => xhr.post('/maker/matchOfflineOutletOpus/batchAwardsOpus', options)
// 参赛管理 - 撤销评奖(线下)
const cancelAwardsOpus = (options = {}) => xhr.post('/maker/matchOfflineOutletOpus/batchcancelAwards', options)


// 奖项设定 - 列表(线下)
const requestOfflineAwardsList = (options = {}) => xhr.post('/maker/match/offline/awards/list', options)
// 奖项设定 - 添加(线下)
const addOfflineAwards = (options = {}) => xhr.post('/maker/match/offline/awards/add', options)
// 奖项设定 - 修改(线下)
const modifyOfflineAwards = (options = {}) => xhr.post('/maker/match/offline/awards/modify', options)
// 奖项设定 - 删除(线下)
const delOfflineAwards = (options = {}) => xhr.post('/maker/match/offline/awards/del', options)

// 竞赛-赛事管理--评奖(自动 新)
const automaticAwards = (options = {}) => xhr.post('/maker/matchResult/automaticAwards', options)


export {
    requestMatchActorList,
    requestQuotaList,
    requestQuotaSettingList,
    saveBatchQuotaList,
    saveQuotaList,
    requestPhaseDetail,
    saveCompareConfig,
    requestContestExpertList,
    addExpert,
    requestExpertList,
    modifyExpert,
    delExpert,
    requestExpertDetail,
    requestExpertTeacher,
    contestMemberAudit,
    contestMemberBatchAudit,
    requestManageWorksList,
    contestWorksAudit,
    contestWorksBatchAudit,
    requestWorksCompeteRecord,
    requestAwardRecord,
    requestWorksReviewRecord,
    worksReport,
    batchManualWorksReport,
    batchCancelWorksReport,
    worksAutoReport,
    worksCancel,
    requestWorksPhaseList,
    requestContestPhaseList,
    requestAwardsByPhase,
    addAwards,
    reportWorksNum,
    requestMatchProjectList,
    requestAwardsList,
    requestAwardStatList,
    requestAwardRankList,
    requestAwards,
    requestCompeteStatList,
    requestCompeteStat,
    requestDynamicAdd,
    requestDynamicList,
    requestDynamicDetail,
    requestDynamicModify,
    requestDynamicDel,
    requestWorksListByPhase,
    requestPhaseList,
    requestAutoAllocation,
    requestManualAllocation,
    requestExpertListByPhase,
    requestPlanByExpert,
    requestRecordRate,
    requestPlanByWorks,
    requestResultByWorks,
    requestEndEvaluation,
    requestAutoAward,
    requestSureSumit,
    requestOfflineProjectList,
    requestOfflineDeclareList,
    requestOfflineOpus,
    requestOfflinePhaseList,
    doRiseOpus,
    doAwardsOpus,
    cancelAwardsOpus,
    requestOfflineAwardsList,
    addOfflineAwards,
    modifyOfflineAwards,
    delOfflineAwards,
    delByMatchIdAndId,
    automaticAwards
}
