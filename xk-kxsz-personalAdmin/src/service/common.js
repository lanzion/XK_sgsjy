import xhr from 'Axios'

// 创客项目配置接口
const initProConfig = (options = {}) => xhr.post('/common/initProConfig', options)
// 获取登录用户信息
const requestUserInfo = (options = {}) => xhr.post('/portal/user/selectUserInfo', options)
// 获取登录用户基础信息
const requestUserBaseInfo = (options = {}) => xhr.post('/portal/user/getBaseInfo', options)
// 获取领域级联数据
const requestPubSearch = (options = {}) => xhr.post('/common/getPubSearch', options)
// 获取领域级联数据
const requestDictComb = (options = {}) => xhr.post('/common/getDictComb', options)
// 获取所有省市县地区数据
const requestRegion = (options = {}) => xhr.post('/common/area/list', options)
// 获取所部署地区数据(登录前)
const requestLimitRegion = (options = {}) => xhr.post('/maker/sysArea/selectList', options)
// 获取所部署地区数据(登录后)
const requestLimitRegionByIdentity = (options = {}) => xhr.post('/maker/sysArea/selectListByIdentity', options)
// 获取点赞列表
const requestPraiseList = (options = {}) => xhr.post('/maker/praise/list', options)
// 点赞
const doPraise = (options = {}) => xhr.post('/maker/praise/do', options)
// 取消点赞
const cancelPraise = (options = {}) => xhr.post('/maker/praise/cancel', options)
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
// 空间动态分享到空间
const dynamicSpaceShare = (options = {}) => xhr.post('/maker/dynamic/space/share', options)
// 获取Banner列表
const requestBanner = (options = {}) => xhr.post('/maker/banner/getBannerImg', options)

// 关注-批量添加(批量关注)
const groupFollow = (options = {}) => xhr.post('/maker/follow/add', options)

// 关注-是否已关注
const queryHasFollowedORNot = (options = {}) => xhr.post('/maker/follow/isFollow', options)

// 关注-取消关注（单个）
const cancelSingleFollowing = (options = {}) => xhr.post('/maker/follow/cancel', options)

// 获取访客列表
const requestVisitorList = (options = {}) => xhr.post(`/maker/spaceVisitor/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 分享 - 分享到个人空间
const shareToSpace = (options = {}) => xhr.post('/maker/dynamic/space/share', options)
// 分享 - 分享到班级
const shareToClasz = (options = {}) => xhr.post('/maker/base/class/dynamic/add', options)
// 分享 - 分享到兴趣组
const shareToInterest = (options = {}) => xhr.post('/maker/interests/dynamic/batch/add', options)

// 添加推荐
const doRecommend = (options = {}) => xhr.post('/maker/recommend/add', options)
// 取消推荐
const cancelRecommend = (options = {}) => xhr.post('/maker/recommend/cancel', options)

// 添加推荐
const requestVerifyRecordList = (api = '', options = {}) => xhr.post(api, options)

// 评价标签-前台列表查询
const requestEvalLabelList = (options = {}) => xhr.post(`/maker/evaluateLabel/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 导航
const requestNavList = (options = {}) => xhr.post(`/common/right/permissList`, options)

// 友情链接
const requestLinkList = (options = {}) => xhr.post(`/maker/link/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 获取后台待办事项 - 总数
const requestBacklogNum = (options = {}) => xhr.post(`/maker/projectAudit/auditTotalNum`, options)

// 获取后台待办事项各个模块数量统计
const requestBacklogModelNum = (options = {}) => xhr.post(`/maker/projectAudit/auditNum`, options)

// 老师、学生空间访问权限控制
const requestIsCanVisit = (options = {}) => xhr.post(`/maker/spaces/isCanVisit`, options)

// 转校管理-申请转校
const transferSchoolAdd = (options = {}) => xhr.post(`/maker/transfer/school/audit/add`, options)
// 转校管理-申请转校状态
const judgeTransferStatus = (options = {}) => xhr.post(`/maker/transfer/school/audit/transferStatus`, options)


export {
    initProConfig,
    requestUserInfo,
    requestUserBaseInfo,
    requestPubSearch,
    requestDictComb,
    requestRegion,
    requestLimitRegion,
    requestLimitRegionByIdentity,
    requestPraiseList,
    doPraise,
    cancelPraise,
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
    dynamicSpaceShare,
    requestBanner,
    groupFollow,
    queryHasFollowedORNot,
    cancelSingleFollowing,
    requestVisitorList,
    shareToSpace,
    shareToClasz,
    shareToInterest,
    doRecommend,
    cancelRecommend,
    requestVerifyRecordList,
    requestEvalLabelList,
    requestNavList,
    requestLinkList,
    requestAddInvite,
    requestBacklogNum,
    requestBacklogModelNum,
    requestIsCanVisit,
    transferSchoolAdd,
    judgeTransferStatus
}
