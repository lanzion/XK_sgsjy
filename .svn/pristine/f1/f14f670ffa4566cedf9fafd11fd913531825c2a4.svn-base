import xhr from 'Axios'

// 空间 - 教师
let requestTeacher = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listByTeacher?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 空间 - 学生
let requestStudent = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listByStudent?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 空间 - 教育局
let requestEdu = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listByEdu?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 空间 - 学校
let requestSchool = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listBySchool?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 空间 - 班级
let requestClasz = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listByClasz?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 空间 - 兴趣组
let requestInterest = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listByInterest?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 空间 - 示范校
let requestModel = (options = {}, pageParam = {}) => xhr.post(`/maker/modelSchool/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 空间 - 示范校
let requestStudio = (options = {}, pageParam = {}) => xhr.post(`/maker/studio/selectFrontPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 导师工作室- 是否已创建
let judgeIsExist = (options = {}) => xhr.post(`/maker/studio/isExist`, options)

//班级管理-成员管理-是否为本班级成员
let judgeClaszMember = (options = {}) => xhr.post(`/maker/baseStudent/isMember`,options)

//兴趣组-成员管理-是否是当前兴趣组成员
let judgeMember = (options = {}) => xhr.post(`/maker/interests/member/isMember`,options)

// 个人空间访客列表
const visitorList = (options = {}, pageParam = {}) => xhr.post(`/maker/spaceVisitor/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 关注-批量添加(批量关注)
const groupFollow = (options = {}) => xhr.post('/maker/follow/add', options)

// 关注-取消关注（单个）
const cancelSingleFollowing = (options = {}) => xhr.post('/maker/follow/cancel', options)

//私信-发送(批量)
let sendLetter = (options = {}) => xhr.post(`/maker/message/private/send`,options)

// 申请报名
let addMemberApply = (options = {}) => xhr.post(`/maker/studioMemberApply/addMemberApply`, options)

/* 首页推荐 */
// 首页推荐 -空间- 教师
const requestRecoTeacher = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listByTeacherOfIndex?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 首页推荐 -空间- 学生
const requestRecoStudent = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listByStudentOfIndex?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 首页推荐 -空间- 教育局
const requestRecoEdu = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listByEduOfIndex?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 首页推荐 -空间- 学校
const requestRecoSchool = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listBySchoolOfIndex?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 首页推荐 -空间- 班级
const requestRecoClasz = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listByClassOfIndex?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 首页推荐 -空间- 兴趣组
const requestRecoInterest = (options = {}, pageParam = {}) => xhr.post(`/maker/spaces/listByInterestOfIndex?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 首页推荐 -空间- 导师工作室
const requestRecoStudio = (options = {}, pageParam = {}) => xhr.post(`/maker/studio/selectFrontOfIndex?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 首页推荐 -空间- 示范校
const requestRecoModel = (options = {}, pageParam = {}) => xhr.post(`/maker/modelSchool/selectPagerOfIndex?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)


export {
    requestTeacher,
    requestStudent,
    requestEdu,
    requestSchool,
    requestClasz,
    requestInterest,
    requestModel,
    requestStudio,
    judgeIsExist,
    judgeClaszMember,
    judgeMember,
    visitorList,
    groupFollow,
    cancelSingleFollowing,
    sendLetter,
    addMemberApply,
    requestRecoTeacher,
    requestRecoStudent,
    requestRecoEdu,
    requestRecoSchool,
    requestRecoClasz,
    requestRecoInterest,
    requestRecoStudio,
    requestRecoModel
}
