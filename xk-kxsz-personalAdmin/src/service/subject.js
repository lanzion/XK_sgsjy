import xhr from 'Axios'

//空间后台-->教师-->新增课题申报
let applySubject = (options = {}) => xhr.post(`/maker/subject/add`,options)

//空间后台-->教师-->修改课题申报
let modifySubject = (options = {}) => xhr.post(`/maker/subject/modify`,options)

// 空间后台-->教师-->课题申报列表分页查询
let requestBackendSubjectList = (options = {},pageParam = {}) => xhr.post(`/maker/subject/selectMyPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//获取课题详情
let requestSubjectDetails = (options = {}) => xhr.post(`/maker/subject/selectDetail`,options)

//获取课题任务列表
let requestSubjectTaskList = (options = {},pageParam = {}) => xhr.post(`/maker/subject/task/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//课题管理模块-->申报指南-->列表分页查询
let requestsubjectGuideList = (options = {},pageParam = {}) => xhr.post(`/maker/subjectGuide/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//课题--空间前台--空间--资源列表
let requestResourceList = (options = {},pageParam = {}) => xhr.post(`/maker/subject/resource/selectSpacePager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//课题-->分页查询课题活动
let requestSubjectActivityList = (options = {},pageParam = {}) => xhr.post(`/maker/subjectActivity/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//课题--空间后台--教师--课题成果--列表
let requestSubjectResultList = (options = {},pageParam = {}) => xhr.post(`/maker/subject/result/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//发布任务
let publishSubjectTask = (options = {}) => xhr.post(`/maker/subject/task/add`,options)

//课题--空间后台（学校/教育局）--课题-- 课题任务详情
let requestSubjectTaskDetails = (options = {}) => xhr.post(`/maker/subject/task/selectDetail`,options)

//课题--空间前后台--课题任务--编辑/完成
let modifySubjectTask = (options = {}) => xhr.post(`/maker/subject/task/modify`,options)

//空间后台-->教师-->课题-->新增课题活动
let addSubjectActivity = (options = {}) => xhr.post(`/maker/subjectActivity/add`,options)

// 空间后台-->教师-->课题-->课题活动修改前,获取课题活动详情
let requestSubjectActivityDetails = (options = {}) => xhr.post(`/maker/subjectActivity/selectDetail`,options)

//空间后台-->教师-->课题-->修改课题活动
let modifySubjectActivity = (options = {}) => xhr.post(`/maker/subjectActivity/modify`,options)

//课题--空间后台--教师--课题成果--新增
let uploadSubjectResult = (options = {}) => xhr.post(`/maker/subject/result/add`,options)

// 课题--空间后台（教师）--课题阶段-- 列表分页查询
let requestSubjectStageList = (options = {},pageParam = {}) => xhr.post(`/maker/subject/stage/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//课题--空间前后台--课题讨论--新增
let addSubjectDiscuss = (options = {}) => xhr.post(`/maker/subject/discuss/add`,options)

// 课题--空间前后台--课题讨论--列表
let requestDiscussList = (options = {},pageParam = {}) => xhr.post(`/maker/subject/discuss/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//课题--空间前后台--课题讨论--详情
let requestDiscussDetail = (options = {}) => xhr.post(`/maker/subject/discuss/selectDetail`,options)

// 课题--空间后台（教师）--课题阶段-- 发起
let modifySubjectStage = (options = {}) => xhr.post(`/maker/subject/stage/modify`,options)

// 课题--空间前台（学校）--课题成果-- 详情
let requestSubjectResultDetail = (options = {}) => xhr.post(`/maker/subject/result/selectDetail`,options)

//查询当前学校的所有老师
let requestSchoolTeachers = (options = {}) => xhr.post(`/portal/user/findTeacherBySchoolId`,options)

//空间后台-教师-课题-查询参与人列表
let requestSubjectMembers = (options = {}) => xhr.post(`/maker/subjectMember/selectPager`,options)

//课题-阶段-详情
let requestSubjectSatgeDetail = (options = {}) => xhr.post(`/maker/subject/stage/selectDetail`,options)

//个人后台-课题-提交
let submitSubject = (options = {}) => xhr.post(`/maker/subject/submitAudit`,options)

//课题-删除
let delSubject = (options = {}) => xhr.post(`/maker/subject/del`,options)

//申报指南详情
let requesrSubjectGuidDetail = (options = {}) => xhr.post(`/maker/subjectGuide/selectDetail`,options)

//申报课题详情
let requesrSubjectReportDetail = (options = {}) => xhr.post(`/maker/subject/selectDetail`,options)

//前台成果-列表
let requestSpaceResultList = (options = {},pageParam = {}) => xhr.post(`/maker/subject/result/selectSpacePager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)


export {
	applySubject,
	modifySubject,
	requestResourceList,
	requestBackendSubjectList,
	requestSubjectDetails,
	requestSubjectTaskList,
	requestsubjectGuideList,
	requestSubjectActivityList,
	requestSubjectResultList,
	publishSubjectTask,
	requestSubjectTaskDetails,
	modifySubjectTask,
	addSubjectActivity,
	requestSubjectActivityDetails,
	modifySubjectActivity,
	uploadSubjectResult,
	requestSubjectStageList,
	addSubjectDiscuss,
	requestDiscussList,
	requestDiscussDetail,
	modifySubjectStage,
	requestSubjectResultDetail,
	requestSchoolTeachers,
	requestSubjectMembers,
	requestSubjectSatgeDetail,
	submitSubject,
	delSubject,
	requesrSubjectGuidDetail,
	requestSpaceResultList,
	requesrSubjectReportDetail
}