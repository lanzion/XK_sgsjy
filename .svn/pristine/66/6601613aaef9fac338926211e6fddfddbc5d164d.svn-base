// 后台管理- 空间管理
import xhr from 'Axios'

// 学习 - 列表
const requestStudyList = (options = {}, pageParam = {}) => xhr.post(`/maker/study/selectAdminPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)


// 实践 - 列表
const requestPracticeList = (options = {}, pageParam = {}) => xhr.post(`/maker/practice/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)


// 项目 - 待审列表
const requestProjectAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/projectAudit/selectProjectAuditList?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 项目 - 已审列表
const requestProjectList = (options = {}, pageParam = {}) => xhr.post(`/maker/project/selectProjectList?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 项目 - 审核
const requestProjectAudit = (options = {}) => xhr.post('/maker/projectAudit/audit', options)
// 项目-- 撤销审核
const requestProjectCancelAudit = (options = {}) => xhr.post('/maker/project/cancelAudit', options)
// 项目 - 审核详情
const requestProjectAuditDetail = (options = {}) => xhr.post('/maker/projectAudit/selectList', options)
// 项目 - 设为热门
const hotProject = (options = {}) => xhr.post('/maker/project/batchModify', options)
// 项目 - 删除
const delProject = (options = {}) => xhr.post('/maker/project/delByIds', options)


// 课程 - 待审列表
const requestCourseAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/course/audit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课程 - 已审列表
const requestCourseList = (options = {}, pageParam = {}) => xhr.post(`/maker/course/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课程 - 审核
const requestCourseAudit = (options = {}) => xhr.post('/maker/course/audit/auth', options)
// 课程-- 撤销审核
const requestCourseCancelAudit = (options = {}) => xhr.post('/maker/course/cancelAudit', options)
// 课程 - 审核详情
const requestCourseAuditDetail = (options = {}) => xhr.post('/maker/course/audit/selectList', options)
// 课程 - 设为热门
const hotCourse = (options = {}) => xhr.post('/maker/course/bacthModify', options)
// 课程 - 删除
const delCourse = (options = {}) => xhr.post('/maker/course/delByIds', options)


// 活动 - 待审列表
const requestActivityAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/activity/audit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 活动 - 已审列表
const requestActivityList = (options = {}, pageParam = {}) => xhr.post(`/maker/activity/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 活动 - 审核详情
const requestActivityAuditDetail = (options = {}) => xhr.post('/maker/activity/audit/selectList', options)
// 活动 - 设为热门
const hotActivity = (options = {}) => xhr.post('/maker/activity/batchModify', options)
// 活动 - 审核
const requestActivityAudit = (options = {}) => xhr.post('/maker/activity/audit/auth', options)
// 活动-- 撤销审核
const requestActivityCancelAudit = (options = {}) => xhr.post('/maker/activity/cancelAudit', options)
// 活动-- 删除
const delActivity = (options = {}) => xhr.post('/maker/activity/delByIds', options)


// 作品 - 待审列表
const requestWorksAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/work/audit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 作品 - 已审列表
const requestWorksList = (options = {}, pageParam = {}) => xhr.post(`/maker/work/selectAmdinPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 作品 - 审核
const requestWorksAudit = (options = {}) => xhr.post('/maker/work/audit/auth', options)
// 作品-- 撤销审核
const requestWorksCancelAudit = (options = {}) => xhr.post('/maker/work/cancelAudit', options)
// 作品 - 审核详情
const requestWorksAuditDetail = (options = {}) => xhr.post('/maker/work/audit/selectList', options)
// 作品 - 设为热门
const hotWorks = (options = {}) => xhr.post('/maker/work/batchModify', options)
// 作品 - 删除
const delWorks = (options = {}) => xhr.post('/maker/work/delByIds', options)

// 资源 - 待审列表
const requestResourcesAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/resource/audit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 资源 - 已审列表
const requestResourcesList = (options = {}, pageParam = {}) => xhr.post(`/maker/resource/getAdminResourceList?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 资源 - 审核
const requestResourcesAudit = (options = {}) => xhr.post('/maker/resource/audit/auth', options)
// 资源-- 撤销审核
const requestResourceCancelAudit = (options = {}) => xhr.post('/maker/resource/cancelAudit', options)
// 资源 - 审核详情
const requestResourcesAuditDetail = (options = {}) => xhr.post('/maker/resource/audit/selectList', options)
// 资源 - 删除
const delResource = (options = {}) => xhr.post('/maker/resource/delByIds', options)

// 课题 - 申报指南列表
const requestSubjectList = (options = {}, pageParam = {}) => xhr.post(`/maker/subjectGuide/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课题 - 申报指南新增
const addSubject = (options = {}) => xhr.post('/maker/subjectGuide/add', options)
// 课题 - 申报指南详情
const detailSubject = (options = {}) => xhr.post('/maker/subjectGuide/selectDetail', options)
// 课题 - 申报指南修改
const modifySubject = (options = {}) => xhr.post('/maker/subjectGuide/modify', options)

// 课题 - 申报指南删除
const delSubject = (options = {}) => xhr.post('/maker/subjectGuide/delByIds', options)
// 课题 - 申报课题列表
const requestSubjectAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/subject/audit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课题 - 在研课题列表
const requestSubjectResearchList = (options = {}, pageParam = {}) => xhr.post(`/maker/subject/selectMyPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课题 - 课题阶段列表
const requestSubjectStageList = (options = {}, pageParam = {}) => xhr.post(`/maker/subject/audit/selectStagePager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课题 - 审核
const requestSubjectAudit = (options = {}) => xhr.post('/maker/subject/audit/auth', options)
// 课题-- 撤销审核
const requestSubjectCancelAudit = (options = {}) => xhr.post('/maker/subject/cancelAudit', options)
// 课题-审核详情
const requestSubjectAuditDetail = (options = {}) => xhr.post('/maker/subject/audit/selectList', options)

// 资讯 - 列表
const requestInfoList = (options = {}) => xhr.post(`/admin/notice/detail/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 资讯 - 详情
const requestInfoDetail = (options = {}) => xhr.post('/admin/notice/detail/searchInfo', options)
// 资讯 - 新增
const addInfo = (options = {}) => xhr.post('/admin/notice/detail/add', options)
// 资讯 - 修改
const modifyInfo = (options = {}) => xhr.post('/admin/notice/detail/modify', options)
// 资讯 - 置顶
const topInfo = (options = {}) => xhr.post('/admin/notice/detail/top', options)
// 资讯 - 删除
const delInfo = (options = {}) => xhr.post('/admin/notice/detail/del', options)


// 友情链接 - 列表
const requestLinkList = (options = {}) => xhr.post(`/maker/link/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 友情链接 - 详情
const requestLinkDetail = (options = {}) => xhr.post('/maker/link/detail', options)
// 友情链接 - 新增
const addLink = (options = {}) => xhr.post('/maker/link/add', options)
// 友情链接 - 修改
const modifyLink = (options = {}) => xhr.post('/maker/link/modify', options)
// 友情链接 - 删除
const delLink = (options = {}) => xhr.post('/maker/link/delByIds', options)


// 故事 - 待审列表
const requestStoryAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/storyAudit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 故事 - 已审列表
const requestStoryList = (options = {}, pageParam = {}) => xhr.post(`/maker/story/selectAmdinPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 故事 - 审核
const requestStoryAudit = (options = {}) => xhr.post('/maker/storyAudit/auth', options)
// 故事-- 撤销审核
const requestStoryCancelAudit = (options = {}) => xhr.post('/maker/story/cancelAudit', options)
// 故事 - 审核详情
const requestStoryAuditDetail = (options = {}) => xhr.post('/maker/storyAudit/selectList', options)
// 故事 - 设为热门
const hotStory = (options = {}) => xhr.post('/maker/story/setHot', options)
// 故事 - 删除
const delStory = (options = {}) => xhr.post('/maker/story/delByIds', options)


// 服务 - 待审列表
const requestServiceAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/serveAudit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 服务 - 已审列表
const requestServiceList = (options = {}, pageParam = {}) => xhr.post(`/maker/serve/selectBackPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 服务 - 审核
const requestServiceAudit = (options = {}) => xhr.post('/maker/serveAudit/auth', options)
// 服务-- 撤销审核
const requestServiceCancelAudit = (options = {}) => xhr.post('/maker/serve/cancelAudit', options)
// 服务 - 审核详情
const requestServiceAuditDetail = (options = {}) => xhr.post('/maker/serveAudit/selectList', options)
// 服务 - 设为热门
const hotService = (options = {}) => xhr.post('/maker/serve/setHot', options)
// 服务 - 删除
const delService = (options = {}) => xhr.post('/maker/serve/delByIds', options)


// 需求 - 待审列表
const requestDemandAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/demandAudit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 需求 - 已审列表
const requestDemandList = (options = {}, pageParam = {}) => xhr.post(`/maker/demand/selectAmdinPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 需求 - 审核
const requestDemandAudit = (options = {}) => xhr.post('/maker/demandAudit/auth', options)
// 需求-- 撤销审核
const requestDemandCancelAudit = (options = {}) => xhr.post('/maker/demand/cancelAudit', options)
// 需求 - 审核详情
const requestDemandAuditDetail = (options = {}) => xhr.post('/maker/demandAudit/selectList', options)
// 需求 - 设为热门
const hotDemand = (options = {}) => xhr.post('/maker/demand/setHot', options)
// 需求 - 删除
const delDemand = (options = {}) => xhr.post('/maker/demand/delByIds', options)


// 商业策划 - 待审列表
const requestPlanAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/businessPlanAudit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 商业策划 - 已审列表
const requestPlanList = (options = {}, pageParam = {}) => xhr.post(`/maker/businessPlan/manager/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 商业策划 - 审核
const requestPlanAudit = (options = {}) => xhr.post('/maker/businessPlanAudit/auth', options)
// 商业策划-- 撤销审核
const requestPlanCancelAudit = (options = {}) => xhr.post('/maker/businessPlan/cancelAudit', options)
// 商业策划 - 审核详情
const requestPlanAuditDetail = (options = {}) => xhr.post('/maker/businessPlanAudit/selectList', options)
// 商业策划 - 设为热门
const hotPlan = (options = {}) => xhr.post('/maker/businessPlan/isHot', options)
// 商业策划 - 删除
const delPlan = (options = {}) => xhr.post('/maker/businessPlan/delByIds', options)

// 培训管理 - 列表
const requestTrainList = (options = {}, pageParam = {}) => xhr.post(`/maker/train/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 培训管理 - 培训新增
const addTrain = (options = {}) => xhr.post('/maker/train/add', options)
// 培训管理 - 培训详情
const trainDetail = (options = {}) => xhr.post('/maker/train/selectDetail', options)
// 培训管理 - 培训修改
const modifyTrain = (options = {}) => xhr.post('/maker/train/modify', options)
// 培训管理 - 培训批量删除
const delTrainByIds = (options = {}) => xhr.post('/maker/train/delByIds', options)
// 培训管理 - 根据学段id获取学科数据
const requestSubjectByPeriodId = (options = {}) => xhr.post('/maker/trainSubject/selectByStudySectionId', options)
// 培训分类
const requestTrainClassify = (options = {}) => xhr.post('/maker/trainClassify/selectAll', options)
// 培训学段
const requestTrainPeriod = (options = {}) => xhr.post('/maker/trainStudySection/selectAll', options)
// 培训报名列表
const requestTrainEnrollList = (options = {}, pageParam = {}) => xhr.post(`maker/trainSignUp/selectByTrainId?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 培训管理-报名成员批量删除
const deleteByTrainSignIds = (options = {}) => xhr.post('/maker/trainSignUp/deleteByTrainSignIds', options)
// 培训报名 - 报名详情
const selectByCreateIdAndTrain = (options = {}) => xhr.post('/maker/trainSignUp/selectByCreateIdAndTrain', options)
// 培训报名-选择培训类型下拉列表
const selectTrainProjectList = (options = {}) => xhr.post('/maker/train/selectTrainProjectList', options)
// 修改报名信息
const modify = (options = {}) => xhr.post('/maker/trainSignUp/modify',options)
// 查询区域报名获奖列表
const selectDescByArea = (options = {}) => xhr.post('/maker/trainSignUp/selectDescByArea',options)
// 培训报名数据导出
const selectTrainSignUpExport = (options = {},pageParam) => xhr.get(`/maker/trainSignUp/selectTrainSignUpExport?trainId=${pageParam.trainId}`,options)
// 培训报名 - 报名详情
const selectBySignId = (options = {}) => xhr.post('maker/trainSignUp/selectBySignId', options)

export {
    requestStudyList,
    requestPracticeList,
    requestProjectAuditList,
    requestProjectList,
    requestProjectAudit,
    requestProjectCancelAudit,
    requestProjectAuditDetail,
    hotProject,
    delProject,
    requestCourseAuditList,
    requestCourseList,
    requestCourseAudit,
    requestCourseCancelAudit,
    requestCourseAuditDetail,
    hotCourse,
    delCourse,
    requestActivityAuditList,
    requestActivityList,
    requestActivityAuditDetail,
    hotActivity,
    requestActivityAudit,
    requestActivityCancelAudit,
    delActivity,
    requestWorksAuditList,
    requestWorksList,
    requestWorksAudit,
    requestWorksCancelAudit,
    requestWorksAuditDetail,
    hotWorks,
    delWorks,
    requestResourcesAuditList,
    requestResourcesList,
    requestResourcesAudit,
    requestResourceCancelAudit,
    requestResourcesAuditDetail,
    delResource,
    auditResources,
    requestSubjectAuditList,
    requestSubjectAudit,
    requestSubjectCancelAudit,
    requestSubjectAuditDetail,
    requestSubjectList,
    addSubject,
    detailSubject,
    modifySubject,
    delSubject,
    requestSubjectResearchList,
    requestSubjectStageList,
    requestInfoList,
    requestInfoDetail,
    addInfo,
    modifyInfo,
    topInfo,
    delInfo,
    requestLinkList,
    requestLinkDetail,
    addLink,
    modifyLink,
    delLink,
    requestStoryAuditList,
    requestStoryList,
    requestStoryAudit,
    requestStoryCancelAudit,
    requestStoryAuditDetail,
    hotStory,
    delStory,
    requestServiceAuditList,
    requestServiceList,
    requestServiceAudit,
    requestServiceCancelAudit,
    requestServiceAuditDetail,
    hotService,
    delService,
    requestDemandAuditList,
    requestDemandList,
    requestDemandAudit,
    requestDemandCancelAudit,
    requestDemandAuditDetail,
    hotDemand,
    delDemand,
    requestPlanAuditList,
    requestPlanList,
    requestPlanAudit,
    requestPlanCancelAudit,
    requestPlanAuditDetail,
    hotPlan,
    delPlan,
    requestTrainList,
    addTrain,
    trainDetail,
    modifyTrain,
    delTrainByIds,
    requestSubjectByPeriodId,
    requestTrainClassify,
    requestTrainPeriod,
    requestTrainEnrollList,
    deleteByTrainSignIds,
    selectByCreateIdAndTrain,
    selectTrainProjectList,
    modify,
    selectDescByArea,
    selectTrainSignUpExport,
    selectBySignId
}
