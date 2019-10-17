
import xhr from 'Axios'

//发布策划
let publishPlan = (options = {}) => xhr.post(`/maker/businessPlan/add`,options)

//策划-列表
let requestPlanBackendList = (options = {},pageParam = {}) => xhr.post(`/maker/businessPlan/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

// 融资案例-列表
const requestCaseList = (options = {}) => xhr.post(`/maker/businessPlan/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

//策划-详情
let requestPlanDetail = (options = {}) => xhr.post(`/maker/businessPlan/detail`,options)

//策划-修改
let modifyPlan = (options = {}) => xhr.post(`/maker/businessPlan/modify`,options)

//策划-删除
let delPlan = (options = {}) => xhr.post(`/maker/businessPlan/del`,options)

//策划-提交审核
let submitPlan = (options = {}) => xhr.post(`/maker/businessPlan/submitAudit`,options)

//策划-邀约
let planInvite = (options = {}) => xhr.post(`/maker/business/planInvite/add`,options)

//邀约-列表
let requestInviteList = (options = {},pageParam = {}) => xhr.post(`/maker/business/planInvite/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

//商业策划-邀约-【拒绝/失败】
let modifyInvite = (options = {}) => xhr.post(`/maker/business/planInvite/modify`,options)

//商业策划-邀约-融资金额
let inviteRealMoney = (options = {}) => xhr.post(`/maker/business/planInvite/realMoney`,options)

//商业策划-详情-评论新增
let addPlanComment = (options = {}) => xhr.post(`/maker/business/planComment/add`,options)

//商业策划-评论列表
let requestPlanCommentList = (options = {},pageParam = {}) => xhr.post(`/maker/business/planComment/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

//商业策划-评论-删除
let delPlanComment = (options = {}) => xhr.post(`/maker/business/planComment/del`,options)

//商业策划-评论-批量删除
let delPlanCommentByids = (options = {}) => xhr.post(`/maker/business/planComment/delByIds`,options)

//商业策划-是否邀约
let requestIsInvite = (options = {}) => xhr.post(`/maker/business/planInvite/isInvite`,options)



export {
	publishPlan,
	requestPlanBackendList,
	requestCaseList,
	requestPlanDetail,
	modifyPlan,
	delPlan,
	submitPlan,
	planInvite,
	requestInviteList,
	modifyInvite,
	inviteRealMoney,
	addPlanComment,
	requestPlanCommentList,
	delPlanComment,
	delPlanCommentByids,
	requestIsInvite
}

