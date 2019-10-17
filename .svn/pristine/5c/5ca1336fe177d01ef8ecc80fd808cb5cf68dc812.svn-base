import xhr from 'Axios'

// 创客项目配置接口
const initProConfig = (options = {}) => xhr.post('/common/initProConfig', options)
// 获取登录用户信息
const requestUserInfo = (options = {}) => xhr.post('/portal/user/selectUserInfo', options)
// 获取登录用户基础信息
const requestUserBaseInfo = (options = {}) => xhr.post('/portal/user/getBaseInfo', options)
// 获取领域级联数据
const requestPubSearch = (options = {}) => xhr.post('/common/getPubSearch', options)
// 获取数据字典数据
const requestDictComb = (options = {}) => xhr.post('/common/getDictComb', options)
// 获取所有省市县地区数据
const requestRegion = (options = {}) => xhr.post('/common/area/list', options)
// 获取所部署地区数据(登录前)
const requestLimitRegion = (options = {}) => xhr.post('/maker/sysArea/selectList', options)
// 获取所部署地区数据(登录后)
const requestLimitRegionByIdentity = (options = {}) => xhr.post('/maker/sysArea/selectListByIdentity', options)
// 获取公钥
const requestPublishKey = () => xhr.post('/common/publicKey')
// 注册 - 学生
const studentRegister = (options = {}) => xhr.post('/portal/user/registStudent', options)
// 注册 - 教师
const teacherRegister = (options = {}) => xhr.post('/portal/user/registTeacher', options)
// 注册 - 企业
const enterpriseRegister = (options = {}) => xhr.post('/portal/user/registEnterprise', options)
// 注册 - 投资人
const investorRegister = (options = {}) => xhr.post('/portal/user/registInvestor', options)
// 注册 - 投资机构
const investOrgRegister = (options = {}) => xhr.post('/portal/user/registInvestOrg', options)
// 注册 - 众创空间
const multRegister = (options = {}) => xhr.post('/portal/user/registMult', options)
// 登录
const loginIn = (options = {}) => xhr.post('/portal/user/login', options)
// 登出
const loginOut = (options = {}) => xhr.post('/portal/user/logout', options)
// 获取权限
const requestPermission = (options = {}) => xhr.post('/common/right/userRightMg', options)
// 获取后台管理权限
const requestAdminPermission = (options = {}) => xhr.post('/common/right/userRightTree', options)
// 根据地区获取学校列表
const requestSchoolList = (options = {}) => xhr.post('/maker/baseSchool/getComboxByArea', options)
// 根据学校获取班级列表
const requestClaszList = (options = {}) => xhr.post('/maker/base/class/all', options)
// 获取Banner列表
const requestBanner = (options = {}) => xhr.post('/maker/banner/getBannerImg', options)
// 导航
const requestNavList = (options = {}) => xhr.post(`/common/right/permissList`, options)
// 友情链接
const requestLinkList = (options = {}) => xhr.post(`/maker/link/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 资讯
const requestInfo = (options = {}) => xhr.post(`/admin/notice/detail/newFronEndList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 资讯详情
const requestInfoDetail = (options = {}) => xhr.post('admin/notice/detail/searchInfo', options)
// 首页 - 统计
const requestStatis = (options = {}) => xhr.post(`/maker/spaces/selectHomePageCount`, options)
// 老师、学生空间访问权限控制
const requestIsCanVisit = (options = {}) => xhr.post(`/maker/spaces/isCanVisit`, options)
// 分享 - 分享到个人空间
const shareToSpace = (options = {}) => xhr.post('/maker/dynamic/space/share', options)
// 分享 - 分享到班级
const shareToClasz = (options = {}) => xhr.post('/maker/base/class/dynamic/add', options)
// 分享 - 分享到兴趣组
const shareToInterest = (options = {}) => xhr.post('/maker/interests/dynamic/batch/add', options)
// 评价标签-前台列表查询
const requestEvalLabelList = (options = {}) => xhr.post(`/maker/evaluateLabel/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 关注-取消关注（单个）
const cancelSingleFollowing = (options = {}) => xhr.post('/maker/follow/cancel', options)
// 关注-批量添加(批量关注)
const groupFollow = (options = {}) => xhr.post('/maker/follow/add', options)
// 关注-是否已关注
const queryHasFollowedORNot = (options = {}) => xhr.post('/maker/follow/isFollow', options)
// 添加推荐
const requestVerifyRecordList = (api = '', options = {}) => xhr.post(api, options)
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
    requestIsCanVisit,
    shareToSpace,
    shareToClasz,
    shareToInterest,
    requestEvalLabelList,
    cancelSingleFollowing,
    groupFollow,
    queryHasFollowedORNot,
    requestVerifyRecordList
}
