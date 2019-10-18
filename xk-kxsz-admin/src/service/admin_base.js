// 后台管理- 基础管理
import xhr from 'Axios'

// 教育局 - 部署时初始化
let initSystem = (options = {}) => xhr.post('/maker/baseEducation/addEdus', options)

// 教育局/学校 - 设置头像、背景
let modifyAvatar = (options = {}) => xhr.post('/maker/spaces/modifySpace', options)

// 删除背景图片
let deleteAvatar = (options = {}) => xhr.post('/maker/spaces/cancelSpaceBackGround', options)

// 修改密码
let resetPwd = (options = {}) => xhr.post('/portal/user/resetPswByAccout', options)

// 用户批量锁定/解锁
let userBatchLock = (options = {}) => xhr.post('/common/batchLockStatus', options)

// 管理员批量锁定/解锁
let adminBatchLock = (options = {}) => xhr.post('/common/changeAdminLockStatus', options)

// 审核
let userAudit = (options = {}) => xhr.post('/common/auditStatus', options)

// 批量审核
let userBatchAudit = (options = {}) => xhr.post('/common/batchAuditStatus', options)


// 教育局 - 下拉列表(根据省市区编码)
let requestBaseEduSelect = (options = {}) => xhr.post('/maker/baseEducation/getComboxByArea', options)
// 教育局 - 列表
let requestBaseEdu = (options = {}) => xhr.post(`/maker/baseEducation/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 教育局 - 详情
let requestEduDetail = (options = {}) => xhr.post('/maker/baseEducation/selectDetail', options)
// 教育局 - 修改
let modifyEduMsg = (options = {}) => xhr.post(`/maker/baseEducation/modify`,options)
// 教育局 - 修改机构锁定状态
let eduBatchLock = (options = {}) => xhr.post(`/common/changeAdminLockStatusForEdu`,options)



// 学校 - 下拉列表(根据省市区编码)
let requestBaseSchoolSelect = (options = {}) => xhr.post('/maker/baseSchool/getComboxByArea', options)
// 学校 - 列表
let requestBaseSchool = (options = {}) => xhr.post(`/maker/baseSchool/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 学校 - 详情
let requestSchoolDetail = (options = {}) => xhr.post('/maker/baseSchool/selectDetail', options)
// 学校 - 新增
let addSchool = (options = {}) => xhr.post('/maker/baseSchool/add', options)
// 学校 - 修改
let modifySchool = (options = {}) => xhr.post('/maker/baseSchool/modify', options)
// 学校 - 空间实景
let requestSchoolScene = (options = {}) => xhr.post('/maker/baseBanner/selectList', options)
// 学校 - 空间实景新增
let addSchoolScene = (options = {}) => xhr.post('/maker/baseBanner/add', options)
// 学校 - 空间实景删除
let delSchoolScene = (options = {}) => xhr.post('/maker/baseBanner/del', options)
// 学校 - 删除
let delSchool = (options = {}) => xhr.post(`/maker/baseSchool/del`, options)
// 学校 - 批量删除
let delSchoolByIds = (options = {}) => xhr.post(`/maker/baseSchool/delByIds`, options)
// 学校 - 修改学校锁定状态
let schoolBatchLock = (options = {}) => xhr.post(`/common/changeAdminLockStatusForSchool`, options)
// 设置示范学校
const setModelSchool = (options = {}) => xhr.post(`/maker/modelSchool/add`, options)
// 学段下拉列表查询
let requestSectionByschoolId = (options = {}) => xhr.get(`/maker/baseSchool/geStudySectiontComboxBySchoolId`, { params: options })



// 班级 - 下拉列表(根据学校)
let requestBaseClaszSelect = (options = {}) => xhr.post('/maker/base/class/selectAllClassList', options)
// 班级 - 列表
let requestBaseClasz = (options = {}) => xhr.post(`/maker/base/class/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 班级 - 详情
let requestClaszDetail = (options = {}) => xhr.post('/maker/base/class/detail', options)
// 班级 - 新增
let addClasz = (options = {}) => xhr.post('/maker/base/class/add', options)
// 班级 - 修改
let modifyClasz = (options = {}) => xhr.post('/maker/base/class/edit', options)
// 班级 - 删除
let delClasz = (options = {}) => xhr.post(`/maker/base/class/del`,options)
// 班级 - 批量删除
let deClaszByIds = (options = {}) => xhr.post(`/maker/base/class/delByIds`,options)



// 教师 - 下拉列表(根据学校)
let requestBaseTeacherSelect = (options = {}) => xhr.post('/maker/baseTeacher/selectAllTeacherList', options)
// 教师 - 列表
let requestBaseTeacher = (options = {}) => xhr.post(`/maker/baseTeacher/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 教师 - 新增
let addTeacher = (options = {}) => xhr.post('/maker/baseTeacher/add', options)
// 教师 - 查看详情
let requestTeacherDetail = (options = {}) => xhr.post(`/maker/baseTeacher/selectDetail`,options)
// 教师 - 修改
let modifyTeacher = (options = {}) => xhr.post(`/maker/baseTeacher/modify`,options)
// 教师 - 删除
let delTeacher = (options = {}) => xhr.post(`/maker/baseTeacher/del`,options)
// 教师 - 批量删除
let delTeacherByIds = (options = {}) => xhr.post(`/maker/baseTeacher/delByIds`,options)



// 学生 - 下拉列表(根据班级)
let requestBaseStudentSelect = (options = {}) => xhr.post('/maker/baseStudent/selectAllStudentByClassId', options)
// 学生 - 列表
let requestBaseStudent = (options = {}) => xhr.post(`/maker/baseStudent/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 学生 - 新增
let addStudent = (options = {}) => xhr.post('/maker/baseStudent/add', options)
// 学生 - 查看详情
let requestStudentDetail = (options = {}) => xhr.post(`/maker/baseStudent/selectDetail`,options)
// 学生 - 修改
let modifyStudent = (options = {}) => xhr.post(`/maker/baseStudent/modify`,options)
// 学生 - 删除
let delStudent = (options = {}) => xhr.post(`/maker/baseStudent/del`,options)
// 学生 - 批量删除
let batchDelStudent = (options = {}) => xhr.post(`/maker/baseStudent/delByIds`,options)
// 学生 - 导入账号
let uploadStudentExcel = (options = {}) => xhr.post('/maker/baseStudent/uploadStudentExcel',options)



// 云管理员 - 列表
let requestBaseAdmin = (options = {}) => xhr.post(`/common/selectAdminPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 云管理员 - 添加
let addBaseAdmin = (options = {}) => xhr.post(`/common/addSuperAdmin`,options)
// 云管理员 - 详情
let requestAdminDetail = (options = {}) => xhr.post(`/common/selectDetailByOrgUser`,options)
// 云管理员 - 修改
let modifyBaseAdmin = (options = {}) => xhr.post(`/common/modifyAdminUser`,options)
// 云管理员 - 删除
let delBaseAdmin = (options = {}) => xhr.post(`/common/delOrgAdminByIds`,options)



// 机构管理员 - 列表
let requestBaseEduer = (options = {}) => xhr.post(`/maker/baseEducation/selectAdminPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 机构管理员 - 添加
let addBaseEduer = (options = {}) => xhr.post(`/maker/baseEducation/addUser`,options)
// 机构管理员 - 详情
let requestEduerDetail = (options = {}) => xhr.post(`/maker/baseEducation/selectDetailByOrgUser`,options)
// 机构管理员 - 修改
let modifyBaseEduer = (options = {}) => xhr.post(`/maker/baseEducation/modifyAdminUser`,options)
// 机构管理员 - 删除
let delBaseEduer = (options = {}) => xhr.post(`/maker/baseEducation/delOrgAdminByIds`,options)



// 学校管理员 - 列表
let requestBaseSchooler = (options = {}) => xhr.post(`/maker/baseSchool/selectAdminPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 学校管理员 - 添加
let addBaseSchooler = (options = {}) => xhr.post(`/maker/baseSchool/addUser`,options)
// 学校管理员 - 详情
let requestSchoolerDetail = (options = {}) => xhr.post(`/maker/baseSchool/selectDetailByOrgUser`,options)
// 学校管理员 - 修改
let modifyBaseSchooler = (options = {}) => xhr.post(`/maker/baseSchool/modifyAdminUser`,options)
// 学校管理员 - 删除
let delBaseSchooler = (options = {}) => xhr.post(`/maker/baseSchool/delOrgAdminByIds`,options)



// 兴趣组 - 待审列表
let requestPendingInterest = (options = {}) => xhr.post(`/maker/interestsAudit/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`,options)
// 兴趣组 - 所有列表
let requestBaseInterest = (options = {}) => xhr.post(`/maker/space/interests/manage/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`,options)
// 兴趣组 - 审核
let auditInterest = (options = {}) => xhr.post(`/maker/interestsAudit/auth`,options)
// 兴趣组-- 撤销审核
const cancelAuditInterest = (options = {}) => xhr.post(`/maker/space/interests/cancelAudit`, options)
// 兴趣组 - 审核记录
let requestInterestAuditRecord = (options = {}) => xhr.post(`/maker/interestsAudit/selectList`,options)



// 工作室 - 待审列表
let requestPendingStudio = (options = {}) => xhr.post(`/maker/studioAudit/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`,options)
// 工作室 - 所有列表
let requestBaseStudio = (options = {}) => xhr.post(`/maker/studio/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`,options)
// 工作室 - 审核
let auditStudio = (options = {}) => xhr.post(`/maker/studioAudit/auth`,options)
// 导师工作室-- 撤销审核
const cancelAuditStudio = (options = {}) => xhr.post(`/maker/studio/cancelAudit`, options)
// 工作室 - 审核记录
let requestStudioAuditRecord = (options = {}) => xhr.post(`/maker/studioAudit/selectList`,options)



// 企业 - 列表
let requestBaseEnterprise = (options = {}) => xhr.post(`/maker/baseEnterprise/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 企业 - 添加
let addBaseEnterprise = (options = {}) => xhr.post(`/maker/baseEnterprise/add`,options)
// 企业 - 详情
let requestEnterpriseDetail = (options = {}) => xhr.post(`/maker/baseEnterprise/selectDetail`,options)
// 企业 - 修改
let modifyBaseEnterprise = (options = {}) => xhr.post(`/maker/baseEnterprise/modify`,options)
// 企业 - 删除
let delBaseEnterprise = (options = {}) => xhr.post(`/maker/baseEnterprise/delByIds`,options)



// 投资机构 - 列表
let requestBaseInvestOrg = (options = {}) => xhr.post(`/maker/baseInvestOrg/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 投资机构 - 添加
let addBaseInvestOrg = (options = {}) => xhr.post(`/maker/baseInvestOrg/add`,options)
// 投资机构 - 详情
let requestInvestOrgDetail = (options = {}) => xhr.post(`/maker/baseInvestOrg/selectDetail`,options)
// 投资机构 - 修改
let modifyBaseInvestOrg = (options = {}) => xhr.post(`/maker/baseInvestOrg/modify`,options)
// 投资机构 - 删除
let delBaseInvestOrg = (options = {}) => xhr.post(`/maker/baseInvestOrg/delByIds`,options)



// 投资人 - 列表
let requestBaseInvestor = (options = {}) => xhr.post(`/maker/baseInvestor/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 投资人 - 添加
let addBaseInvestor = (options = {}) => xhr.post(`/maker/baseInvestor/add`,options)
// 投资人 - 详情
let requestInvestorDetail = (options = {}) => xhr.post(`/maker/baseInvestor/selectDetail`,options)
// 投资人 - 修改
let modifyBaseInvestor = (options = {}) => xhr.post(`/maker/baseInvestor/modify`,options)
// 投资人 - 删除
let delBaseInvestor = (options = {}) => xhr.post(`/maker/baseInvestor/delByIds`,options)



// 众创空间 - 列表
let requestBaseMult = (options = {}) => xhr.post(`/maker/baseMult/selectPage?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 众创空间 - 添加
let addBaseMult = (options = {}) => xhr.post(`/maker/baseMult/add`,options)
// 众创空间 - 详情
let requestMultDetail = (options = {}) => xhr.post(`/maker/baseMult/detail`,options)
// 众创空间 - 修改
let modifyBaseMult = (options = {}) => xhr.post(`/maker/baseMult/modify`,options)
// 众创空间 - 删除
let delBaseMult = (options = {}) => xhr.post(`/maker/baseMult/delByIds`,options)

// 学校/教育局-申请注册-进度查询
const requestOrgApplyList = (options = {}, pageParams = {}) => xhr.post(`/maker/baseApply/selectPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)
// 学校/教育局-申请注册-审核
const auditOrgApply = (options = {}) => xhr.post(`/maker/baseApply/audit`, options)
// 学校/教育局-申请注册-查看详情
const orgApplyDetail = (options = {}) => xhr.post(`/maker/baseApply/selectDetail`, options)
// 学校/教育局-申请注册-发送账号密码
const sendAccountPwd = (options = {}) => xhr.post(`/maker/baseApply/sendAccountPwd`, options)

// 管理后台 -空间管理-列表
const requestPlatformSpaceList = (options = {}, pageParams = {}) => xhr.post(`/maker/spaces/listForAdmin?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)
// 管理后台 -空间管理--启用/停用
const switchStatus = (options = {}) => xhr.post(`/maker/spaces/changeStatus`, options)

// 管理后台-示范学校-列表
const requestModelList = (options = {}, pageParams = {}) => xhr.post(`/maker/modelSchool/list?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)
//管理后台-示范学校-启用/停用
const changeModelStatus = (options = {}) => xhr.post(`/maker/modelSchool/changeStatus`, options)

// 转校管理-申请转校列表
const requestTransferSchoolList = (options = {}, pageParams = {}) => xhr.post(`/maker/transfer/school/audit/list?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`, options)
// 转校管理-申请转校审核
const transferSchoolAudit = (options = {}) => xhr.post(`/maker/transfer/school/audit/submit`, options)


export {
    initSystem,
    modifyAvatar,
    deleteAvatar,
    resetPwd,
    userBatchLock,
    adminBatchLock,
    userAudit,
    userBatchAudit,
    requestBaseEduSelect,
    requestBaseEdu,
    requestEduDetail,
    modifyEduMsg,
    eduBatchLock,
    modifyEduLockstatus,
    requestBaseSchoolSelect,
    requestBaseSchool,
    requestSchoolDetail,
    addSchool,
    modifySchool,
    requestBaseClaszSelect,
    requestBaseClasz,
    requestClaszDetail,
    addClasz,
    modifyClasz,
    delClasz,
    deClaszByIds,
    requestBaseTeacherSelect,
    requestBaseTeacher,
    addTeacher,
    requestTeacherDetail,
    modifyTeacher,
    delTeacher,
    delTeacherByIds,
    requestBaseStudentSelect,
    requestBaseStudent,
    addStudent,
    requestStudentDetail,
    modifyStudent,
    delStudent,
    batchDelStudent,
    requestBaseAdmin,
    addBaseAdmin,
    requestAdminDetail,
    modifyBaseAdmin,
    delBaseAdmin,
    requestBaseEduer,
    requestBaseSchooler,
    addBaseSchooler,
    requestSchoolerDetail,
    modifyBaseSchooler,
    delBaseSchooler,
    requestSchoolScene,
    addSchoolScene,
    delSchoolScene,
    delSchool,
    delSchoolByIds,
    schoolBatchLock,
    setModelSchool,
    requestSectionByschoolId,
    addBaseEduer,
    requestEduerDetail,
    modifyBaseEduer,
    delBaseEduer,
    requestPendingInterest,
    requestBaseInterest,
    auditInterest,
    cancelAuditInterest,
    requestInterestAuditRecord,
    requestPendingStudio,
    requestBaseStudio,
    auditStudio,
    cancelAuditStudio,
    requestStudioAuditRecord,
    requestBaseEnterprise,
    addBaseEnterprise,
    requestEnterpriseDetail,
    modifyBaseEnterprise,
    delBaseEnterprise,
    requestBaseInvestOrg,
    addBaseInvestOrg,
    requestInvestOrgDetail,
    modifyBaseInvestOrg,
    delBaseInvestOrg,
    requestBaseInvestor,
    addBaseInvestor,
    requestInvestorDetail,
    modifyBaseInvestor,
    delBaseInvestor,
    requestBaseMult,
    addBaseMult,
    requestMultDetail,
    modifyBaseMult,
    delBaseMult,
    requestOrgApplyList,
    auditOrgApply,
    orgApplyDetail,
    sendAccountPwd,
    requestPlatformSpaceList,
    switchStatus,
    requestModelList,
    changeModelStatus,
    requestTransferSchoolList,
    transferSchoolAudit,
    uploadStudentExcel
}
