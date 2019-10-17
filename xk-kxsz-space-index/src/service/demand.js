import xhr from 'Axios'
// 需求

// 待审列表
const demandPendingList = (options = {},pageParam = {}) => xhr.post(`/maker/demand/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)

// 发布
const demandPublish = (options = {}) => xhr.post(`/maker/demand/add`, options)

// 详情
const demandDetail = (options = {}) => xhr.post(`/maker/demand/selectDetail`, options)

// 修改
const demandModify = (options = {}) => xhr.post(`/maker/demand/modify`, options)

// 提交审核
const demandSubmitAudit = (options = {}) => xhr.post(`/maker/demand/submitAudit`, options)

// 删除
const demandDel = (options = {}) => xhr.post(`/maker/demand/delByIds`, options)

// 需求评论 - 列表
const demandCommentList = (options = {},pageParam = {}) => xhr.post(`/maker/demandComment/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

// 需求评论 - 新增
const demandCommentAdd = (options = {}) => xhr.post(`/maker/demandComment/add`, options)

// 需求 - 相关
const demandAboutList = (options = {},pageParam = {}) => xhr.post(`/maker/demand/selectAboutDemandPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

export {
    demandPendingList,
    demandPublish,
    demandDetail,
    demandModify,
    demandSubmitAudit,
    demandDel,
    demandCommentList,
    demandCommentAdd,
    demandAboutList
}