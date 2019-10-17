import xhr from 'Axios'

/***************************************后台管理- 综合素质***********************************************/

// 一级指标-分页查询
const requestLevelOneQuota = (options = {}) => xhr.post(`/maker/evaluationDefinition/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 二级指标-分页查询
const requestLevelTwoQuota = (options = {}) => xhr.post(`/maker/evaluationDefinition/selectLevelPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 指标-新增
const requestPlainLevelOneQuota = (options = {}) => xhr.post('/maker/evaluationDefinition/getCombox', options)

// 指标-新增
const addQuota = (options = {}) => xhr.post('/maker/evaluationDefinition/add', options)

// 指标-修改（一级、二级）
const editQuota = (options = {}) => xhr.post('/maker/evaluationDefinition/modify', options)

// 指标-删除（一级、二级）
const deleteQuota = (options = {}) => xhr.post('/maker/evaluationDefinition/del', options)

// 指标-删除（一级、二级）
const groupDeleteQuota = (options = {}) => xhr.post('/maker/evaluationDefinition/delByIds', options)

// 评价模板 - 分页查询
const requestTmplList = (options = {}) => xhr.post(`/maker/evaluationTemplate/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 查询学年学期
const requestTermList = (options = {}) => xhr.post('/maker/term/selectTermList', options)

// 评价模板 - 新增
const addTmpl = (options = {}) => xhr.post('/maker/evaluationTemplate/add', options)

// 评价模板 - 查看详情
const queryTmplDetail = (options = {}) => xhr.post('/maker/evaluationTemplate/selectDetail', options)

// 评价模板 - 修改
const editTmpl = (options = {}) => xhr.post('/maker/evaluationTemplate/modify', options)

// 评价模板 - 删除
const deleteTmpl = (options = {}) => xhr.post('/maker/evaluationTemplate/del', options)

// 评价模板 - 批量删除
const groupDeleteTmpl = (options = {}) => xhr.post('/maker/evaluationTemplate/delByIds', options)

// 评价模板 - 复制
const copyTmpl = (options = {}) => xhr.post('/maker/evaluationTemplate/copy', options)

// 评价记录列表
const requestEvalRecordList = (options = {}) => xhr.post(`/maker/evaluationResult/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 自评,他评前数据
const requestQuotaList = (options = {}) => xhr.post('/maker/evaluationIndexSchool/selectByTarget', options)

// 新增自评,他评
const submitEvaluation = (options = {}) => xhr.post('/maker/evaluationResult/add', options)

// 查询评价结果
const queryEvalResult = (options = {}) => xhr.post('/maker/evaluationResult/selectDetail', options)

// 查看终评列表
const requestFinalList = (options = {}) => xhr.post('/maker/evaluationIndexSchool/selectByBusId', options)

// 查询终评等级
const queryFinalLevel = (options = {}) => xhr.post('/maker/evaluationGrade/selectByTemplateIdAndScore', options)

// 查询评价状态，是否可以他评、终评
const queryEvalStatus = (options = {}) => xhr.post('/maker/evaluationResult/selectSatusByBusId', options)

// 提交终评
const submitFinalEval = (options = {}) => xhr.post('/maker/evaluationResult/modify', options)

export {
  requestLevelOneQuota,
  requestLevelTwoQuota,
  requestPlainLevelOneQuota,
  addQuota,
  editQuota,
  deleteQuota,
  groupDeleteQuota,
  requestTmplList,
  requestTermList,
  addTmpl,
  queryTmplDetail,
  editTmpl,
  deleteTmpl,
  groupDeleteTmpl,
  copyTmpl,
  requestEvalRecordList,
  requestQuotaList,
  submitEvaluation,
  queryEvalResult,
  requestFinalList,
  queryFinalLevel,
  queryEvalStatus,
  submitFinalEval,
}
