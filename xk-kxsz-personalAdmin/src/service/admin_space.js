// 后台管理- 空间管理
import xhr from 'Axios'

// 学习 - 列表
let requestStudyList = (options = {}, pageParam = {}) => xhr.post(`/maker/study/selectAdminPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)


// 实践 - 列表
let requestPracticeList = (options = {}, pageParam = {}) => xhr.post(`/maker/practice/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)


// 项目 - 待审列表
let requestProjectAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/projectAudit/selectProjectAuditList?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 项目 - 已审列表
let requestProjectList = (options = {}, pageParam = {}) => xhr.post(`/maker/project/selectProjectList?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 项目 - 审核
let requestProjectAudit = (options = {}) => xhr.post(`/maker/projectAudit/audit`, options)
// 项目 - 审核详情
let requestProjectAuditDetail = (options = {}) => xhr.post(`/maker/projectAudit/selectList`, options)
// 项目 - 设为热门
let hotProject = (options = {}) => xhr.post(`/maker/project/batchModify`, options)


// 课程 - 待审列表
let requestCourseAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/course/audit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课程 - 已审列表
let requestCourseList = (options = {}, pageParam = {}) => xhr.post(`/maker/course/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课程 - 审核
let requestCourseAudit = (options = {}) => xhr.post(`/maker/course/audit/auth`, options)
// 课程 - 审核详情
let requestCourseAuditDetail = (options = {}) => xhr.post(`/maker/course/audit/selectList`, options)
// 课程 - 设为热门
let hotCourse = (options = {}) => xhr.post(`/maker/course/bacthModify`, options)


// 活动 - 待审列表
let requestActivityAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/activity/audit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 活动 - 已审列表
let requestActivityList = (options = {}, pageParam = {}) => xhr.post(`/maker/activity/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 活动 - 审核详情
let requestActivityAuditDetail = (options = {}) => xhr.post(`/maker/activity/audit/selectList`, options)
// 活动 - 设为热门
let hotActivity = (options = {}) => xhr.post(`/maker/activity/batchModify`, options)
// 活动 - 审核
let requestActivityAudit = (options = {}) => xhr.post(`/maker/activity/audit/auth`, options)


// 作品 - 待审列表
let requestWorksAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/work/audit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 作品 - 已审列表
let requestWorksList = (options = {}, pageParam = {}) => xhr.post(`/maker/work/selectAmdinPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 作品 - 审核
let requestWorksAudit = (options = {}) => xhr.post(`/maker/work/audit/auth`, options)
// 作品 - 审核详情
let requestWorksAuditDetail = (options = {}) => xhr.post(`/maker/work/audit/selectList`, options)
// 作品 - 设为热门
let hotWorks = (options = {}) => xhr.post(`/maker/work/batchModify`, options)


// 资源 - 待审列表
let requestResourcesAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/resource/audit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 资源 - 已审列表
let requestResourcesList = (options = {}, pageParam = {}) => xhr.post(`/maker/resource/getAdminResourceList?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 资源 - 审核
let requestResourcesAudit = (options = {}) => xhr.post(`/maker/resource/audit/auth`, options)
// 资源 - 审核详情
let requestResourcesAuditDetail = (options = {}) => xhr.post(`/maker/resource/audit/selectList`, options)

// 课题 - 申报指南列表
let requestSubjectList = (options = {}, pageParam = {}) => xhr.post(`/maker/subjectGuide/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课题 - 申报指南新增
let addSubject = (options = {}) => xhr.post(`/maker/subjectGuide/add`, options)
// 课题 - 申报指南详情
let detailSubject = (options = {}) => xhr.post(`/maker/subjectGuide/selectDetail`, options)
// 课题 - 申报指南修改
let modifySubject = (options = {}) => xhr.post(`/maker/subjectGuide/modify`, options)

// 课题 - 申报指南删除
let delSubject = (options = {}) => xhr.post(`/maker/subjectGuide/delByIds`, options)
// 课题 - 申报课题列表
let requestSubjectAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/subject/audit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课题 - 在研课题列表
let requestSubjectResearchList = (options = {}, pageParam = {}) => xhr.post(`/maker/subject/selectMyPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课题 - 课题阶段列表
let requestSubjectStageList = (options = {}, pageParam = {}) => xhr.post(`/maker/subject/audit/selectStagePager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 课题 - 审核
let requestSubjectAudit = (options = {}) => xhr.post(`/maker/subject/audit/auth`, options)
//课题-审核详情
let requestSubjectAuditDetail = (options = {}) => xhr.post(`/maker/subject/audit/selectList`,options)

// 资讯 - 列表
let requestInfoList = (options = {}) => xhr.post(`/admin/notice/detail/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 资讯 - 详情
let requestInfoDetail = (options = {}) => xhr.post(`/admin/notice/detail/searchInfo`, options)
// 资讯 - 新增
let addInfo = (options = {}) => xhr.post(`/admin/notice/detail/add`, options)
// 资讯 - 修改
let modifyInfo = (options = {}) => xhr.post(`/admin/notice/detail/modify`, options)
// 资讯 - 置顶
let topInfo = (options = {}) => xhr.post(`/admin/notice/detail/top`, options)
// 资讯 - 删除
let delInfo = (options = {}) => xhr.post(`/admin/notice/detail/del`, options)


// 友情链接 - 列表
let requestLinkList = (options = {}) => xhr.post(`/maker/link/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 友情链接 - 详情
let requestLinkDetail = (options = {}) => xhr.post(`/maker/link/detail`, options)
// 友情链接 - 新增
let addLink = (options = {}) => xhr.post(`/maker/link/add`, options)
// 友情链接 - 修改
let modifyLink = (options = {}) => xhr.post(`/maker/link/modify`, options)
// 友情链接 - 删除
let delLink = (options = {}) => xhr.post(`/maker/link/delByIds`, options)


// 故事 - 待审列表
let requestStoryAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/storyAudit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 故事 - 已审列表
let requestStoryList = (options = {}, pageParam = {}) => xhr.post(`/maker/story/selectAmdinPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 故事 - 审核
let requestStoryAudit = (options = {}) => xhr.post(`/maker/storyAudit/auth`, options)
// 故事 - 审核详情
let requestStoryAuditDetail = (options = {}) => xhr.post(`/maker/storyAudit/selectList`, options)
// 故事 - 设为热门
let hotStory = (options = {}) => xhr.post(`/maker/story/setHot`, options)
// 故事 - 删除
let delStory = (options = {}) => xhr.post(`/maker/story/delByIds`, options)


// 服务 - 待审列表
let requestServiceAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/serveAudit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 服务 - 已审列表
let requestServiceList = (options = {}, pageParam = {}) => xhr.post(`/maker/serve/selectBackPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 服务 - 审核
let requestServiceAudit = (options = {}) => xhr.post(`/maker/serveAudit/auth`, options)
// 服务 - 审核详情
let requestServiceAuditDetail = (options = {}) => xhr.post(`/maker/serveAudit/selectList`, options)
// 服务 - 设为热门
let hotService = (options = {}) => xhr.post(`/maker/serve/setHot`, options)
// 服务 - 删除
let delService = (options = {}) => xhr.post(`/maker/serve/delByIds`, options)


// 需求 - 待审列表
let requestDemandAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/demandAudit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 需求 - 已审列表
let requestDemandList = (options = {}, pageParam = {}) => xhr.post(`/maker/demand/selectAmdinPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 需求 - 审核
let requestDemandAudit = (options = {}) => xhr.post(`/maker/demandAudit/auth`, options)
// 需求 - 审核详情
let requestDemandAuditDetail = (options = {}) => xhr.post(`/maker/demandAudit/selectList`, options)
// 需求 - 设为热门
let hotDemand = (options = {}) => xhr.post(`/maker/demand/setHot`, options)
// 需求 - 删除
let delDemand = (options = {}) => xhr.post(`/maker/demand/delByIds`, options)


// 商业策划 - 待审列表
let requestPlanAuditList = (options = {}, pageParam = {}) => xhr.post(`/maker/businessPlanAudit/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 商业策划 - 已审列表
let requestPlanList = (options = {}, pageParam = {}) => xhr.post(`/maker/businessPlan/manager/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 商业策划 - 审核
let requestPlanAudit = (options = {}) => xhr.post(`/maker/businessPlanAudit/auth`, options)
// 商业策划 - 审核详情
let requestPlanAuditDetail = (options = {}) => xhr.post(`/maker/businessPlanAudit/selectList`, options)
// 商业策划 - 设为热门
let hotPlan = (options = {}) => xhr.post(`/maker/businessPlan/isHot`, options)
// 商业策划 - 删除
let delPlan = (options = {}) => xhr.post(`/maker/businessPlan/delByIds`, options)


export {
    requestStudyList,
    requestPracticeList,
    requestProjectAuditList,
    requestProjectList,
    requestProjectAudit,
    requestProjectAuditDetail,
    hotProject,
    requestCourseAuditList,
    requestCourseList,
    requestCourseAudit,
    requestCourseAuditDetail,
    hotCourse,
    requestActivityAuditList,
    requestActivityList,
    requestActivityAuditDetail,
    hotActivity,
    requestActivityAudit,
    requestWorksAuditList,
    requestWorksList,
    requestWorksAudit,
    requestWorksAuditDetail,
    hotWorks,
    requestResourcesAuditList,
    requestResourcesList,
    requestResourcesAudit,
    requestResourcesAuditDetail,
    auditResources,
    requestSubjectAuditList,
    requestSubjectAudit,
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
    requestStoryAuditDetail,
    hotStory,
    delStory,
    requestServiceAuditList,
    requestServiceList,
    requestServiceAudit,
    requestServiceAuditDetail,
    hotService,
    delService,
    requestDemandAuditList,
    requestDemandList,
    requestDemandAudit,
    requestDemandAuditDetail,
    hotDemand,
    delDemand,
    requestPlanAuditList,
    requestPlanList,
    requestPlanAudit,
    requestPlanAuditDetail,
    hotPlan,
    delPlan
}