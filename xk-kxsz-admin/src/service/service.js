import xhr from 'Axios'
// 服务

// 待审列表
const serviceAuditList = (options = {},pageParam = {}) => xhr.post(`/maker/serve/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

// 服务发布
const servicePublish = (options = {}) => xhr.post(`/maker/serve/add`,options)

// 服务详情
const serviceDetail = (options = {}) => xhr.post(`/maker/serve/selectDetail`,options)

// 服务修改
const serviceModify = (options = {}) => xhr.post(`/maker/serve/modify`,options)

// 服务删除
const serviceDel = (options = {}) => xhr.post(`/maker/serve/del`,options)

// 勾搭 - 列表
const hookupWithList = (options = {},pageParam = {}) => xhr.post(`/maker/seduce/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

// 勾搭 - 审核
const hookupWithAudit = (options = {}) => xhr.post(`/maker/seduce/modify`,options)

// 勾搭 - 新增
const hookupWithAdd = (options = {}) => xhr.post(`/maker/seduce/add`,options)

// 服务评论 - 列表
const serviceCommentList = (options = {},pageParam = {}) => xhr.post(`/maker/serveComment/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

// 服务评论 - 新增
const serviceCommentAdd = (options = {}) => xhr.post(`/maker/serveComment/add`,options)

// 服务 - 相关
const serviceAboutList = (options = {},pageParam = {}) => xhr.post(`/maker/serve/selectAboutServerPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

export {
    serviceAuditList,
    servicePublish,
    serviceDetail,
    serviceModify,
    serviceDel,
    hookupWithList,
    hookupWithAudit,
    hookupWithAdd,
    serviceCommentList,
    serviceCommentAdd,
    serviceAboutList
}
