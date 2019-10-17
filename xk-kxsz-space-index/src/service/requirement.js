import xhr from 'Axios'

// 需求--前端列表 、Ta的故事 、热门需求
const requestFrontendRequirementList = (options = {}) => xhr.post(`/maker/demand/selectReceptionPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 勾搭-列表
const requestBackendLagouList = (options = {}) => xhr.post(`/maker/seduce/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

export {
  requestFrontendRequirementList,
  requestBackendLagouList,
}
