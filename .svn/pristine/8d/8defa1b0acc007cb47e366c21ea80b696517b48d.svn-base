import xhr from 'Axios'

// 反馈 - 新增
const addFeedback = (options = {}) => xhr.post(`/maker/feedback/add`, options)
// 导航
const requestNavList = (options = {}) => xhr.post(`/common/right/permissList`, options)
// 友情链接
const requestLinkList = (options = {}) => xhr.post(`/maker/link/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 获取所有省市县地区数据
const requestRegion = (options = {}) => xhr.post('/common/area/list', options)
// 获取所部署地区数据(登录前)
const requestLimitRegion = (options = {}) => xhr.post('/maker/sysArea/selectList', options)
// 获取所部署地区数据(登录后)
const requestLimitRegionByIdentity = (options = {}) => xhr.post('/maker/sysArea/selectListByIdentity', options)
// 获取登录用户基础信息
const requestUserBaseInfo = (options = {}) => xhr.post('/portal/user/getBaseInfo', options)
// 根据地区获取学校列表
const requestSchoolList = (options = {}) => xhr.post('/maker/baseSchool/getComboxByArea', options)
// 根据学校获取班级列表
const requestClaszList = (options = {}) => xhr.post('/maker/base/class/all', options)
// 学生 - 修改资料
const studentModify = (options = {}) => xhr.post('/maker/baseStudent/modify', options)
// 教师 - 修改资料
const teacherModify = (options = {}) => xhr.post('/maker/baseTeacher/modify', options)
// 登出
const loginOut = (options = {}) => xhr.post('/portal/user/logout', options)

export {
    addFeedback,
    requestNavList,
    requestLinkList,
    requestRegion,
    requestLimitRegion,
    requestLimitRegionByIdentity,
    requestUserBaseInfo,
    requestSchoolList,
    requestClaszList,
    studentModify,
    teacherModify,
    loginOut
}