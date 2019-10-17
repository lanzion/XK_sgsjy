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
// 注册 - 学生
let studentRegister = (options = {}) => xhr.post('/portal/user/registStudent', options)
// 注册 - 教师
let teacherRegister = (options = {}) => xhr.post('/portal/user/registTeacher', options)
// 注册 - 企业
let enterpriseRegister = (options = {}) => xhr.post('/portal/user/registEnterprise', options)
// 注册 - 投资人
let investorRegister = (options = {}) => xhr.post('/portal/user/registInvestor', options)
// 注册 - 投资机构
let investOrgRegister = (options = {}) => xhr.post('/portal/user/registInvestOrg', options)
// 注册 - 众创空间
let multRegister = (options = {}) => xhr.post('/portal/user/registMult', options)
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
// 资讯
let requestInfo = (options = {}) => xhr.post(`/admin/notice/detail/newFronEndList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 资讯详情
let requestInfoDetail = (options = {}) => xhr.post('admin/notice/detail/searchInfo', options)
// 首页 - 统计
let requestStatis = (options = {}) => xhr.post(`/maker/spaces/selectHomePageCount`, options)
// 添加推荐
const doRecommend = (options = {}) => xhr.post('/maker/recommend/add', options)
// 取消推荐
const cancelRecommend = (options = {}) => xhr.post('/maker/recommend/cancel', options)
// 获取后台待办事项各个模块数量统计
const requestBacklogModelNum = (options = {}) => xhr.post('/maker/projectAudit/auditNum', options)

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
    studentRegister,
    teacherRegister,
    enterpriseRegister,
    investorRegister,
    investOrgRegister,
    multRegister,
    loginIn,
    loginOut,
    requestPermission,
    requestAdminPermission,
    requestSchoolList,
    requestClaszList,
    requestBanner,
    requestNavList,
    requestLinkList,
    requestInfo,
    requestInfoDetail,
    requestStatis,
    doRecommend,
    cancelRecommend,
    requestBacklogModelNum
}
