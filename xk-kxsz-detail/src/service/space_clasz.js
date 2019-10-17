import xhr from 'Axios'

// 空间 - 教育局列表
let requestClaszList = (options = {}) => xhr.post(`maker/spaces/listByClasz?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 班级管理-是否为班级管理员
let judgeStudentIsAdmin = (options = {}) => xhr.post(`/maker/base/class/isAdmin`,options)

//班级空间-管理-基本信息
let claszDetails = (options = {}) => xhr.post(`maker/base/class/detail`, options)

// 班级空间-管理-基本信息-修改
let modifyClaszInfo = (options = {}) => xhr.post(`/maker/base/class/modify`,options)

// 班级空间-管理-成员管理-列表
let requestClaszMember = (options = {},pageParam = {}) => xhr.post(`/maker/space/class/member/list`,options)

// 班级空间-管理-成员管理-推荐
let requestSetGlory = (options = {}) => xhr.post(`/maker/space/class/member/setGlory`,options)

// 班级空间-管理-成员管理-取消推荐
let requestCancelGlory = (options = {}) => xhr.post(`/maker/space/class/member/setGlory/cancel`,options)

// 公告-列表
let requestNoticeList = (options = {},pageParam = {}) => xhr.post(`/maker/notice/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

//公告-添加
let addNotice = (options = {}) => xhr.post(`/maker/notice/add`,options)

//公告-修改
let modifyNotice = (options = {}) => xhr.post(`/maker/notice/notify`,options)

//班级管理-成员管理-设为管理员
let setClaszAdmin = (options = {}) => xhr.post(`/maker/base/class/setAdmin`,options)

//班级管理-成员管理-是否为本班级成员
let judgeClaszMember = (options = {}) => xhr.post(`/maker/baseStudent/isMember`,options)


export {
	requestClaszList,
	judgeStudentIsAdmin,
	claszDetails,
	modifyClaszInfo,
	requestClaszMember,
	requestSetGlory,
	requestCancelGlory,
	requestNoticeList,
	addNotice,
	modifyNotice,
	setClaszAdmin,
	judgeClaszMember
}