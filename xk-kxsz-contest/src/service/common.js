import xhr from 'Axios'

// 创客项目配置接口
let initProConfig = (options = {}) => xhr.post('/common/initProConfig', options)
// 获取登录用户信息
let requestUserInfo = (options = {}) => xhr.post('/portal/user/selectUserInfo', options)
// 获取登录用户基础信息
let requestUserBaseInfo = (options = {}) => xhr.post('/portal/user/getBaseInfo', options)
// 获取领域级联数据
let requestPubSearch = (options = {}) => xhr.post('/common/getPubSearch', options)
// 获取领域级联数据
let requestDictComb = (options = {}) => xhr.post('/common/getDictComb', options)
// 获取所有省市县地区数据
let requestRegion = (options = {}) => xhr.post('/common/area/list', options)
// 获取所部署地区数据(登录前)
let requestLimitRegion = (options = {}) => xhr.post('/maker/sysArea/selectList', options)
// 获取所部署地区数据(登录后)
let requestLimitRegionByIdentity = (options = {}) => xhr.post('/maker/sysArea/selectListByIdentity', options)
// 获取公钥
let requestPublishKey = () => xhr.post('/common/publicKey')
// 登录
let loginIn = (options = {}) => xhr.post('/portal/user/login', options)
// 登出
let loginOut = (options = {}) => xhr.post('/portal/user/logout', options)
// 获取权限
let requestPermission = (options = {}) => xhr.post('/common/right/userRightMg', options)
// 获取后台管理权限
let requestAdminPermission = (options = {}) => xhr.post('/common/right/userRightTree', options)
// 根据地区获取学校列表
let requestSchoolList = (options = {}) => xhr.post('/maker/baseSchool/getComboxByArea', options)
// 根据学校获取班级列表
let requestClaszList = (options = {}) => xhr.post('/maker/base/class/all', options)
// 获取Banner列表
let requestBanner = (options = {}) => xhr.post('/maker/banner/getBannerImg', options)
// 导航
let requestNavList = (options = {}) => xhr.post(`/common/right/permissList`, options)
// 友情链接
let requestLinkList = (options = {}) => xhr.post(`/maker/link/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 示范校详情
let requestModelSchoolDetail = (options = {}) => xhr.post('/maker/modelSchool/selectDetail', options)
// 根据学校id获取学生数据
const requestBaseStudentList = (options = {}, pageParam = {}) => xhr.post(`/maker/baseStudent/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 根据学校id获取教师数据
const requestBaseTeacherList = (options = {}, pageParam = {}) => xhr.post(`/maker/baseTeacher/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)


export {
    initProConfig,
    requestUserInfo,
    requestUserBaseInfo,
    requestPubSearch,
    requestDictComb,
    requestRegion,
    requestLimitRegion,
    requestLimitRegionByIdentity,
    requestPublishKey,
    loginIn,
    loginOut,
    requestPermission,
    requestAdminPermission,
    requestSchoolList,
    requestClaszList,
    requestBanner,
    requestNavList,
    requestLinkList,
    requestModelSchoolDetail,
    requestBaseStudentList,
    requestBaseTeacherList
}
