import xhr from 'Axios'

//获取资源列表 -- 空间后台
let requestResourceList = (options = {},pageParam = {}) => xhr.post(`/maker/resource/getList?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//获取资源详情
let requestResourceDetails = (options = {}) => xhr.post(`/maker/resource/getDetail`,options)

//上传资源
let uploadResource = (options = {}) => xhr.post(`/maker/resource/add`,options)

//修改资源
let modifyResource = (options = {}) => xhr.post(`/maker/resource/modify`,options)

//获取后台资源管理列表
let requestResourceManageList = (options = {}) => xhr.post(`/maker/resource/audit/getList?pageSize=${options.pageSize}&pageNum=${options.pageNum}`,options)

//获取前台资源管理列表
let requestcFrontendResourceList = (options = {},pageParam = {}) => xhr.post(`/maker/resource/getReceptionList?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//后台资源列表
let requestAdminResourceList = (options = {},pageParam = {}) => xhr.post(`/maker/resource/getAdminResourceList?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

// 前台兴趣组资源列表
let requestInterestResourceList = (options = {},pageParam = {}) => xhr.post(`/maker/resource/getInterestsList?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//后台资源列表-删除
let delResource = (options = {}) => xhr.post(`/maker/resource/del`,options)

//后台资源列表-提交
let submitResource = (options = {}) => xhr.post(`/maker/resource/submitAudit`,options)

//下载次数加1
let downloadAdd = (options = {}) => xhr.post(`/maker/resource/upload`,options)

export {
	requestResourceList,
	requestResourceDetails,
	uploadResource,
	modifyResource,
	requestResourceManageList,
	requestcFrontendResourceList,
    requestAdminResourceList,
    requestInterestResourceList,
    delResource,
    submitResource,
    downloadAdd
}