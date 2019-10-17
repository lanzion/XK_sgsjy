import xhr from 'Axios'

//获取作品列表 --空间后台
let requestBackendWorksList = (options = {}, pagParam = {}) => xhr.post(`/maker/work/selectPager?pageSize=${pagParam.pageSize}&pageNum=${pagParam.pageNum}`,options)

//获取作品列表 -- 空间前台
let requestFrontendWorksList = (options = {}, pagParam = {}) => xhr.post(`/maker/work/selectReceptionPager?pageSize=${pagParam.pageSize}&pageNum=${pagParam.pageNum}`,options)

//获取作品列表 -- 空间前台
let requestInterestsWorksList = (options = {}, pagParam = {}) => xhr.post(`/maker/work/selectInterestsPager?pageSize=${pagParam.pageSize}&pageNum=${pagParam.pageNum}`,options)

//获取作品详情--
let requestWorksDetails = (options = {}) => xhr.post(`/maker/work/selectDetail`,options)

//获取作品评论列表
let requestWorksCommentList = (options = {},pageParam = {}) => xhr.post(`/maker/work/comment/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//发布作品
let requestWorksPublish = (options = {}) => xhr.post(`maker/work/add`,options)

//作品详情发表评论
let worksEvaluationAdd = (options = {}) => xhr.post(`/maker/work/comment/add`,options)

//作品修改
let worksEvaluationModify = (options = {}) => xhr.post(`maker/work/modify`,options)

//作品公开范围
let worksScopeOpen = (options = {}) => xhr.post(`maker/work/scopeOpen`,options)

// 老师、学生后台列表提交审核
let worksSubmitAudit = (options = {}) => xhr.post(`maker/work/submitAudit`,options)


// 老师、学生后台列表提交审核
let worksTeaStuDel = (options = {}) => xhr.post(`maker/work/del`,options)

export {
	requestBackendWorksList,
	requestFrontendWorksList,
	requestWorksDetails,
    requestInterestsWorksList,
	requestWorksCommentList,
	requestWorksPublish,
	worksEvaluationAdd,
    worksEvaluationModify,
    worksScopeOpen,
    worksSubmitAudit,
    worksTeaStuDel
}