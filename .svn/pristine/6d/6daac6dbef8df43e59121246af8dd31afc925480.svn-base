// 后台管理- 配置管理
import xhr from 'Axios'

// 权限列表
const requestConfigPermission = (options = {}) => xhr.post('/common/right/list/byPid', options)


// 安全管理 - 详情
const requestSecurity = (options = {}) => xhr.post(`/config/getValue`, options)
// 安全管理 - 修改
const modifySecurity = (options = {}) => xhr.post(`/config/update`, options)


// 导航管理 - 列表
const requestNavList = (options = {}, pageParam = {}) => xhr.post(`/maker/portalNavigation/selectTreeList`, options)
// 导航管理 - 新增
const addNav = (options = {}) => xhr.post('/maker/portalNavigation/add', options)
// 导航管理 - 修改
const modifyNav = (options = {}) => xhr.post('/maker/portalNavigation/modify', options)
// 导航管理 - 删除
const delNav = (options = {}) => xhr.post('/maker/portalNavigation/delByIds', options)
// 导航管理 - 详情
const navDetail = (options = {}) => xhr.post('/maker/portalNavigation/selectDetail', options)


// 菜单管理 - 新增
const addMenu = (options = {}) => xhr.post('/common/right/addRight', options)
// 菜单管理 - 修改
const modifyMenu = (options = {}) => xhr.post('/common/right/updateRight', options)
// 菜单管理 - 删除
const delMenu = (options = {}) => xhr.post('/common/right/deleteRight', options)


// 审核配置 - 列表
const auditList = (options = {}, pageParam = {}) => xhr.post(`/maker/pubAuditConfigMain/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 审核配置 - 新增
const auditAdd = (options = {}) => xhr.post(`/maker/pubAuditConfigMain/add`, options)
// 审核配置 - 删除
const auditDel = (options = {}) => xhr.post(`/maker/pubAuditConfigMain/delByIds`, options)
// 审核配置 - 详情
const auditDetail = (options = {}) => xhr.post(`/maker/pubAuditConfigMain/selectDetail`, options)
// 审核配置 - 修改
const auditmodify = (options = {}) => xhr.post(`/maker/pubAuditConfigMain/modify`, options)


// 数据字典 - 列表
const datadictList = (options = {}) => xhr.post(`/admin/dict/specialtype/list`, options)
// 数据字典 - 新增
const datadictAdd = (options = {}) => xhr.post(`/admin/dict/specialtype/add`, options)
// 数据字典 - 修改
const datadictModify = (options = {}) => xhr.post(`/admin/dict/specialtype/modify`, options)
// 数据字典 - 删除
const datadictDel = (options = {}) => xhr.post(`/admin/dict/specialtype/del`, options)
// 数据字典 - 详情 - 列表
const datadictDetailList = (options = {}, pageParam = {}) => xhr.post(`/admin/baseData/dicSpecial/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 数据字典 - 详情 - 新增
const datadictDetailAdd = (options = {}) => xhr.post(`/admin/baseData/dicSpecial/insert`, options)
// 数据字典 - 详情 - 修改
const datadictDetailModify = (options = {}) => xhr.post(`/admin/baseData/dicSpecial/update`, options)
// 数据字典 - 详情 - 修改
const datadictDetailDel = (options = {}) => xhr.post(`/admin/baseData/dicSpecial/delete`, options)


// 分类管理 - 列表
const requestClassifyList = (options = {},pageParam = {}) => xhr.post(`/maker/pubSearch/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)
// 分类管理 - 新增
const addClassify = (options = {}) => xhr.post(`/maker/pubSearch/add`,options)
// 分类管理 - 删除
const delClassify = (options = {}) => xhr.post(`/maker/pubSearch/del`,options)
// 分类管理 - 详情
const requestClassifyDetail = (options = {}) => xhr.post(`/maker/pubSearch/selectDetail`,options)
// 分类管理 - 修改
const modifyClassify = (options = {}) => xhr.post(`/maker/pubSearch/modify`,options)
// 新增分类时，根据类型获取领域
const requestPubSearchCombox = (options = {}) => xhr.post(`/maker/pubSearch/getCombox`,options)


// 网上实训室 - 新增
const addTrain = (options = {}) => xhr.post(`/maker/onlineTrainRoom/add`, options)
// 网上实训室 - 修改、上架、下架、推荐
const modifyTrain = (options = {}) => xhr.post(`/maker/onlineTrainRoom/modify`, options)
// 网上实训室 - 删除
const delTrain = (options = {}) => xhr.post(`/maker/onlineTrainRoom/del`, options)
// 网上实训室 - 详情
const detailTrain = (options = {}) => xhr.post(`/maker/onlineTrainRoom/selectDetail`, options)
// 网上实训室 - 列表
const listTrain = (options = {}, pageParam = {}) => xhr.post(`/maker/onlineTrainRoom/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)


// 文档配置-章节-列表
const requestDocChapterList = (options = {}) => xhr.post(`/maker/documentConfig/selectSectionPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 文档配置-配置目录-列表
const requestDocDirectoryList = (options = {}) => xhr.post('/maker/documentConfig/selectCatalogueList', options)
// 文档配置-新增配置目录、章节
const addDoc = (options = {}) => xhr.post('/maker/documentConfig/add', options)
// 文档配置-修改配置目录、章节
const editDoc = (options = {}) => xhr.post('/maker/documentConfig/modify', options)
// 文档配置-配置目录、章节 删除
const delDoc = (options = {}) => xhr.post('/maker/documentConfig/del', options)
// 文档配置-配置目录、章节 删除 批量
const delDocItems = (options = {}) => xhr.post('/maker/documentConfig/delByIds', options)


// 常见问题 - 新增
const addFaq = (options = {}) => xhr.post(`/maker/problem/add`, options)
// 常见问题 - 列表查询
const requestFaqList = (options = {},pageParam = {}) => xhr.post(`/maker/problem/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 常见问题 - 查看详情
const requestFaqDetail = (options = {}) => xhr.post(`/maker/problem/selectDetail`, options)
// 常见问题 - 修改
const modifyFaq = (options = {}) => xhr.post(`/maker/problem/modify`, options)
// 常见问题 - 删除
const deleteFaq = (options = {}) => xhr.post(`/maker/problem/del`, options)


// 招聘信息 - 新增
const addRecruit = (options = {}) => xhr.post(`/maker/webRecruit/add`, options)
// 招聘信息 - 列表查询
const requestRecruitList = (options = {}, pageParam = {}) => xhr.post(`/maker/webRecruit/listPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 招聘信息 - 查看详情
const requestRecruitDetail = (options = {}) => xhr.post(`/maker/webRecruit/detail`, options)
// 招聘信息 - 修改
const modifyRecruit = (options = {}) => xhr.post(`/maker/webRecruit/modify`, options)
// 招聘信息 - 修改状态
const modifyRecruitStatus = (options = {}) => xhr.post(`/maker/webRecruit/changeStatus`, options)
// 招聘信息 - 删除
const deleteRecruit = (options = {}) => xhr.post(`/maker/webRecruit/delByIds`, options)


// 培训分类 - 培训分类新增
const addTrainClassify = (options = {}) => xhr.post(`/maker/trainClassify/add`, options)
// 培训分类修改
const modifyTrainClassify = (options = {}) => xhr.post(`/maker/trainClassify/modify`, options)
// 培训分类详情
const trainClassifyDetail = (options = {}) => xhr.post(`/maker/trainClassify/selectDetail`, options)
// 培训分类批量删除
const delTrainClassifyByIds = (options = {}) => xhr.post(`/maker/trainClassify/delByIds`, options)
// 培训分类列表
const requestTrainClassifyList = (options = {}, pageParam = {}) => xhr.post(`/maker/trainClassify/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 培训学段 - 培训学段新增
const addTrainPeriod = (options = {}) => xhr.post(`/maker/trainStudySection/add`, options)
// 培训学段修改
const modifyTrainPeriod = (options = {}) => xhr.post(`/maker/trainStudySection/modify`, options)
// 培训学段详情
const trainPeriodDetail = (options = {}) => xhr.post(`/maker/trainStudySection/selectDetail`, options)
// 培训学段批量删除
const delTrainPeriodByIds = (options = {}) => xhr.post(`/maker/trainStudySection/delByIds`, options)
// 培训学段列表
const requestTrainPeriodList = (options = {}, pageParam = {}) => xhr.post(`/maker/trainStudySection/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 培训学科 - 培训学科新增
const addTrainSubject = (options = {}) => xhr.post(`/maker/trainSubject/add`, options)
// 培训学科修改
const modifyTrainSubject = (options = {}) => xhr.post(`/maker/trainSubject/modify`, options)
// 培训学科详情
const trainSubjectDetail = (options = {}) => xhr.post(`/maker/trainSubject/selectDetail`, options)
// 培训学科批量删除
const delTrainSubjectByIds = (options = {}) => xhr.post(`/maker/trainSubject/delByIds`, options)
// 培训学科列表
const requestTrainSubjectList = (options = {}, pageParam = {}) => xhr.post(`/maker/trainSubject/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

export {
    requestConfigPermission,
    requestSecurity,
    modifySecurity,
    requestNavList,
    addNav,
    modifyNav,
    delNav,
    navDetail,
    addMenu,
    modifyMenu,
    delMenu,
    auditList,
    auditAdd,
    auditDel,
    auditDetail,
    datadictList,
    datadictAdd,
    datadictModify,
    datadictDel,
    datadictDetailList,
    datadictDetailAdd,
    datadictDetailModify,
    datadictDetailDel,
    auditmodify,
    requestClassifyList,
    addClassify,
    delClassify,
    requestClassifyDetail,
    modifyClassify,
    addTrain,
    modifyTrain,
    delTrain,
    detailTrain,
    listTrain,
    requestPubSearchCombox,
    requestDocChapterList,
    requestDocDirectoryList,
    addDoc,
    editDoc,
    delDoc,
    delDocItems,
    addFaq,
    requestFaqList,
    requestFaqDetail,
    modifyFaq,
    deleteFaq,
    addRecruit,
    requestRecruitList,
    requestRecruitDetail,
    modifyRecruit,
    modifyRecruitStatus,
    deleteRecruit,
    addTrainClassify,
    modifyTrainClassify,
    trainClassifyDetail,
    delTrainClassifyByIds,
    requestTrainClassifyList,
    addTrainPeriod,
    modifyTrainPeriod,
    trainPeriodDetail,
    delTrainPeriodByIds,
    requestTrainPeriodList,
    addTrainSubject,
    modifyTrainSubject,
    trainSubjectDetail,
    delTrainSubjectByIds,
    requestTrainSubjectList
}