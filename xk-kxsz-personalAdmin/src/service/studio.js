// 导师工作室
import xhr from 'Axios'

//分类管理-添加分类
let addType = (options = {}) => xhr.post(`/maker/studioType/add`,options)

//分类管理-分类列表
let requestTypeList = (options = {}) => xhr.post(`/maker/studioType/selectAll`,options)

//分类管理-分类修改
let modifyType = (options = {}) => xhr.post(`/maker/studioType/modify`,options)

//资源共享-发布资源
let publishResource = (options = {}) => xhr.post(`/maker/studioResource/add`,options)

//资源共享-修改
let modifyStudioResource = (options = {}) => xhr.post(`/maker/studioResource/modify`,options)

//微课堂-添加
let addStudioClassroom = (options = {}) => xhr.post(`/maker/studioClassroom/add`,options)

//空间后台-导师工作室-微课-修改
let modifyStudioClassroom = (options = {}) => xhr.post(`/maker/studioClassroom/modify`,options)

// 前台 - 列表
let requestFrontList = (options = {},pageParam = {}) => xhr.post(`/maker/studio/selectFrontPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//教师-个人后台-我参与的工作室列表
let requestBackendStudioList = (options = {}, pageParams = {}) => xhr.post(`/maker/studio/selectMyPartakePager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`,options)

//我参与的工作室-提交审核
let studioSubmitAudit  = (options = {}) => xhr.post(`/maker/studio/submitAudit`,options)

//资源共享-列表
let requestResShareList = (options = {},pageParams = {}) => xhr.post(`/maker/studioResource/selectPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`,options)

//资源共享-删除
let delStudioResource = (options = {}) => xhr.post(`/maker/studioResource/delByIds`,options)

//资源共享-详情
let requestResShareDetail = (options = {},pageParams = {}) => xhr.post(`/maker/studioResource/selectDetail`,options)

//微课堂-列表
let requestMicroClassList = (options = {},pageParams = {}) => xhr.post(`/maker/studioClassroom/selectPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`,options)

//微课堂-删除
let deleteMicroClass = (options = {}) => xhr.post(`/maker/studioClassroom/delByIds`,options)

//微课堂-详情
let requestMicroClassDetail = (options = {}) => xhr.post(`/maker/studioClassroom/selectDetail`,options)

// 申请
// 申请成立工作室
let applyStudio = (options = {}) => xhr.post(`/maker/studio/add`, options)

// 导师工作室-详情
let studioDetail = (options = {}) => xhr.post(`/maker/studio/selectDetail`, options)

// 导师工作室--修改
let modifyStudio = (options = {}) => xhr.post(`/maker/studio/modify`,options)

// 成员是否已申请
let studioIsApply = (options = {}) => xhr.post(`/maker/studioMemberApply/isApply`, options)

// 申请报名
let addMemberApply = (options = {}) => xhr.post(`/maker/studioMemberApply/addMemberApply`, options)

//基本信息修改
let modifyBaseInfo = (options = {}) => xhr.post(`/maker/studio/modifyBaseInfo`,options)

//空间前台-导师工作室-待审成员列表
let requestPendingMemberList = (options = {},pageParams ={}) => xhr.post(`/maker/studioMemberApply/selectMemberList?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`,options)

//空间前台-导师工作室-已审成员列表
let requestAuditedMemberList = (options = {},pageParams ={}) => xhr.post(`/maker/studioMember/selectMemberList?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`,options)

//空间前台-导师工作室-成员审核
let auditMember = (options = {}) => xhr.post(`/maker/studioMemberApply/auditMember`,options)

// 空间后台-导师工作室--成员管理-设为管理员
let memberSetAdmin = (options = {}) => xhr.post(`/maker/studioMember/setAdmin`,options)

// 、、空间前台-导师工作室-成员邀请
let studioInviteMember = (options = {}) => xhr.post(`/maker/systemMessage/addInvite`,options)

//空间前台-导师工作室-成员踢出
let delStudioMember = (options = {}) => xhr.post(`/maker/studioMember/del`,options)

// 文章/成果 - 列表
let studioArticleList = (options = {}, pageParams = {} ) => xhr.post(`/maker/studioArticle/selectPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)

// 文章/成果 - 添加
let studioArticleAdd = (options = {}) => xhr.post(`/maker/studioArticle/add`, options)


// 文章/成果 - 修改详情
let studioArticleDetail = (options = {}) => xhr.post(`/maker/studioArticle/selectUpdateDetail`, options)

//栏目管理-列表
let requestColumnList = (options = {}) => xhr.post(`/maker/studioColumn/list/all`,options)



// 文章/成果 - 修改
let studioArticlModify = (options = {}) => xhr.post(`/maker/studioArticle/modify`, options)

// 文章/成果 - 详情
let studioArticlDetailPage = (options = {}) => xhr.post(`/maker/studioArticle/selectDetail`, options)

// 文章/成果 - 列表
let studioArticlDetailList = (options = {}, pageParams = {}) => xhr.post(`/maker/studioArticleComment/selectPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)

// 文章/成果 - 评论
let studioArticlDetailAdd = (options = {}) => xhr.post(`/maker/studioArticleComment/add`, options)

// 话题 - 列表
let studioTopicList = (options = {}, pageParams = {}) => xhr.post(`/maker/topic/list?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)

// 话题 - 添加
let studioTopicAdd = (options = {}) => xhr.post(`/maker/topic/addStudio`, options)

//导师工作室-栏目-修改
let modifyColumn = (options = {}) => xhr.post(`/maker/studioColumn/modify`,options)

//导师工作室-栏目-上移
let moveupColumn = (options = {}) => xhr.post(`/maker/studioColumn/move/up`,options)

//导师工作室-栏目-下移
let movedownColumn = (options = {}) => xhr.post(`/maker/studioColumn/move/down`,options)

// 空间后台-导师工作室--成员管理-判断当前登陆人是否管理员
let judgeAdmin = (options = {}) => xhr.post(`/maker/studioMember/isAdmin`,options)

//教师个人后台-导师工作室-删除
let delStudio = (options = {}) => xhr.post(`/maker/studio/del`,options)

// 导师工作室- 是否已创建
let judgeIsExist = (options = {}) => xhr.post(`/maker/studio/isExist`, options)


export {
    requestFrontList,
    requestBackendStudioList,
    studioSubmitAudit,
    applyStudio,
    studioDetail,
    modifyStudio,
	addType,
	requestTypeList,
	modifyType,
	publishResource,
    modifyStudioResource,
	addStudioClassroom,
    modifyStudioClassroom,
	requestResShareList,
    delStudioResource,
	requestMicroClassList,
    deleteMicroClass,
	requestResShareDetail,
	requestMicroClassDetail,
    studioIsApply,
    addMemberApply,
    modifyBaseInfo,
    requestAuditedMemberList,
    requestPendingMemberList,
    auditMember,
    memberSetAdmin,
    studioInviteMember,
    delStudioMember,
    studioArticleList,
    studioArticleAdd,
    studioArticleDetail,
    studioArticlModify,
    studioArticlDetailPage,
    studioArticlDetailList,
    studioArticlDetailAdd,
    studioTopicList,
    studioTopicAdd,
    requestColumnList,
    modifyColumn,
    moveupColumn,
    movedownColumn,
    judgeAdmin,
    delStudio,
    judgeIsExist
}