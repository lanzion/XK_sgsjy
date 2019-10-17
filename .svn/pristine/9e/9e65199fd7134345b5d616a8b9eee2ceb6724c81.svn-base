import xhr from 'Axios'

// 空间后台-资讯-列表
const requestBackendInfoList = (options = {}) => xhr.post(`/maker/information/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 空间前台-最新资讯-列表
const requestInfoList = (options = {}) => xhr.post(`/maker/information/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 空间后台-资讯-添加
const addInfo = (options = {}) => xhr.post('/maker/information/add', options)

// 空间后台-资讯-编辑
const editInfo = (options = {}) => xhr.post('/maker/information/modify', options)

// 空间后台-资讯-删除
const deleteInfo = (options = {}) => xhr.post('/maker/information/del', options)

// 空间后台-资讯-查看详情
const queryDetail = (options = {}) => xhr.post('/maker/information/selectDetail', options)

export {
  requestBackendInfoList,
  requestInfoList,
  addInfo,
  editInfo,
  deleteInfo,
  queryDetail,
}
