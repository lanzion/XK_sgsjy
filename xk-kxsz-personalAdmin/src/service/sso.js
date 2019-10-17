import xhr from 'Axios'

// 单点调用
let requestJoin = (options = {}) => xhr.post(`/sso/single/join`,options)

// 根据时间戳获取当前单点的状态
let requestSingleStatus = (options = {}) => xhr.get(`/sso/single/runStatus?joinDate=${options.nowTime}`,options)

// 单点用户手动匹配关系
let addSingleRelation = (options = {}) => xhr.post(`/sso/single/addSingleRelation`,options)


export {
    requestJoin,
    requestSingleStatus,
    addSingleRelation,
}