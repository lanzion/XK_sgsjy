/*
 * 空间活动部分的请求
 */
import xhr from 'Axios'

//空间后台活动列表
let requestActivityBackendList = (options = {},pageParam = {}) => xhr.post(`/maker/activity/selectTeacherBackList?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//发布活动
let activityPublish = (options = {}) => xhr.post(`/maker/activity/add`,options)

//修改活动
let activityModify = (options = {}) => xhr.post(`/maker/activity/modify`,options)

//获取前台活动列表
let requestActivityFrontendList = (options = {},pageParam = {}) => xhr.post(`/maker/activity/selectEduSchoolTeacherFrontList?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//获取活动详情
let requestActivityDetails = (options = {}) => xhr.post(`/maker/activity/selectDetail`,options)

//获取评论列表
let requestActivityEvaluationList = (options = {},pageParam = {}) => xhr.post(`/maker/activity/comment/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//评论新增
let addEvaluation = (options = {}) => xhr.post(`/maker/activity/comment/add`,options)

//评论点赞
let evaluationPraise = (options = {}) => xhr.post(`/maker/activity/comment/praise/add`,options)

//获取活动已审成员
let requestAuditedMember = (options = {},pageParam = {}) => xhr.post(`/maker/activityMember/selectMemberList?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//获取活动未审成员
let requestPendingMember = (options = {},pageParam = {}) => xhr.post(`/maker/activityApply/selectMemberList?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//活动成员审核
let auditMember = (options = {}) => xhr.post(`/maker/activityApply/auditMember`,options)

//获取活动成果列表
let requestActivityResult = (options = {},pageParam = {}) => xhr.post(`/maker/activity/resource/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//活动--上传成果
let addActivityResult = (options = {}) => xhr.post(`/maker/activity/resource/batchAdd`,options)

//获取活动管理列表
let requestActivityManageList = (options = {},pageParam = {}) => xhr.post(`/maker/activity/audit/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//活动审核
let auditActivity = (options = {}) => xhr.post(`/maker/activity/audit/delByIds`,options)

//活动成员申请
let activityApply = (options = {}) => xhr.post(`/maker/activityApply/add`,options)

// 判断活动及报名状态
let checkHasAppliedOrNot = (options = {}) => xhr.post('/maker/activityApply/isApply', options)

// 判断是否报名成功
let checkIsSigned = (options = {}) => xhr.post('/maker/activityApply/isAudited', options)

//活动删除
let delActivity = (options = {}) => xhr.post(`/maker/activity/del`,options)

//活动-提交审核
let submitActivity = (options = {}) => xhr.post(`/maker/activity/submitAudit`,options)

//活动-相关活动列表
let requestRelatedActivity = (options = {}, pageParam = {}) => xhr.post(`/maker/activity/selectAboutActivityList?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)


export {
	requestActivityBackendList,
	activityPublish,
	activityModify,
	requestActivityFrontendList,
	requestActivityDetails,
	requestActivityEvaluationList,
	addEvaluation,
	evaluationPraise,
	requestAuditedMember,
	requestPendingMember,
	requestActivityResult,
	addActivityResult,
	auditMember,
	requestActivityManageList,
	auditActivity,
	activityApply,
	checkHasAppliedOrNot,
	checkIsSigned,
	delActivity,
	submitActivity,
	requestRelatedActivity
}