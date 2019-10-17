import xhr from 'Axios'

// 示范学校-学校列表查询
const requestModelSchoolList = (options = {}) => xhr.post(`/maker/modelSchool/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 示范学校-详情
const queryModelSchoolDetail = (options = {}) => xhr.post('/maker/modelSchool/selectDetail', options)

// 示范学校-前台成果列表
const requestAchievementList = (options = {}) => xhr.post(`/maker/modelSchoolResult/selectReceptionPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 示范学校-前台特色教育列表
const requestFeatureList = (options = {}) => xhr.post(`/maker/modelSchoolFeature/selectReceptionPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 示范学校-前台荣誉列表
const requestHonorList = (options = {}) => xhr.post(`/maker/modelSchoolHonor/selectReceptionPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 示范学校-前台事件列表
const requestEventList = (options = {}) => xhr.post(`/maker/modelSchoolEvent/selectReceptionPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 示范学校-成果分类列表
const requestAchievementCategoryList = (options = {}) => xhr.post('/maker/modelSchoolResultType/selectList', options)

// 示范学校-成果详情
const queryAchievementDetail = (options = {}) => xhr.post('/maker/modelSchoolResult/selectDetail', options)

// 示范学校-成果评论列表
const requestAchievementCommentList = (options = {}, {pageNum, pageSize} = {}) => xhr.post(`/maker/modelSchoolResultComment/selectPager?pageNum=${pageNum}&pageSize=${pageSize}`, options)

// 示范学校-成果评论新增
const addAchievementComment = (options = {}) => xhr.post('/maker/modelSchoolResultComment/add', options)

// 示范学校-教育特色详情
const queryFeatureDetail = (options = {}) => xhr.post('/maker/modelSchoolFeature/selectDetail', options)

// 示范学校-教育特色评论列表
const requestFeatureCommentList = (options = {}, {pageNum, pageSize} = {}) => xhr.post(`/maker/modelSchoolFeatureComment/selectPager?pageNum=${pageNum}&pageSize=${pageSize}`, options)

// 示范学校-教育特色评论新增
const addFeatureComment = (options = {}) => xhr.post('/maker/modelSchoolFeatureComment/add', options)

// 示范学校-荣誉详情
const queryHonorDetail = (options = {}) => xhr.post('/maker/modelSchoolHonor/selectDetail', options)

/*******************************************admin*******************************************/

// 示范学校-学校简介、背景设置
const editDetail = (options = {}) => xhr.post('maker/modelSchool/modify', options)

// 示范学校-后台成果列表
const requestBackendAchievementList = (options = {}) => xhr.post(`/maker/modelSchoolResult/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 示范学校-成果添加
const addAchievement = (options = {}) => xhr.post('maker/modelSchoolResult/add', options)

// 示范学校-成果修改
const editAchievement = (options = {}) => xhr.post('maker/modelSchoolResult/modify', options)

// 示范学校-成果删除
const deleteAchievement = (options = {}) => xhr.post('maker/modelSchoolResult/delByIds', options)

// 示范学校-成果分类添加
const addAchievementCategory = (options = {}) => xhr.post('maker/modelSchoolResultType/add', options)

// 示范学校-成果分类修改
const editAchievementCategory = (options = {}) => xhr.post('maker/modelSchoolResultType/modify', options)

// 示范学校-台后特色列表
const requestBackendFeatureList = (options = {}) => xhr.post(`/maker/modelSchoolFeature/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 示范学校-特色新增
const addFeature = (options = {}) => xhr.post('maker/modelSchoolFeature/add', options)

// 示范学校-特色修改
const editFeature = (options = {}) => xhr.post('maker/modelSchoolFeature/modify', options)

// 示范学校-特色删除
const deleteFeature = (options = {}) => xhr.post('maker/modelSchoolFeature/delByIds', options)

// 示范学校-后台事件列表
const requestBackendEventList = (options = {}) => xhr.post(`/maker/modelSchoolEvent/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 示范学校-事件新增
const addEvent = (options = {}) => xhr.post('maker/modelSchoolEvent/add', options)

// 示范学校-事件修改
const editEvent = (options = {}) => xhr.post('maker/modelSchoolEvent/modify', options)

// 示范学校-事件删除
const deleteEvent = (options = {}) => xhr.post('maker/modelSchoolEvent/delByIds', options)

// 示范学校-后台荣誉列表
const requestBackendHonorList = (options = {}) => xhr.post(`/maker/modelSchoolHonor/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 示范学校-荣誉新增
const addHonor = (options = {}) => xhr.post('maker/modelSchoolHonor/add', options)

// 示范学校-荣誉修改
const editHonor = (options = {}) => xhr.post('maker/modelSchoolHonor/modify', options)

// 示范学校-荣誉删除
const deleteHonor = (options = {}) => xhr.post('maker/modelSchoolHonor/delByIds', options)

export {
  requestModelSchoolList,
  queryModelSchoolDetail,
  requestAchievementList,
  requestFeatureList,
  requestHonorList,
  requestEventList,
  requestAchievementCategoryList,
  queryAchievementDetail,
  requestAchievementCommentList,
  addAchievementComment,
  queryFeatureDetail,
  requestFeatureCommentList,
  addFeatureComment,
  queryHonorDetail,

  editDetail,
  requestBackendAchievementList,
  addAchievement,
  editAchievement,
  deleteAchievement,
  addAchievementCategory,
  editAchievementCategory,
  requestBackendFeatureList,
  addFeature,
  editFeature,
  deleteFeature,
  requestBackendEventList,
  addEvent,
  editEvent,
  deleteEvent,
  requestBackendHonorList,
  addHonor,
  editHonor,
  deleteHonor,
}
