// 竞赛首页
import xhr from 'Axios'

// 列表
const requestList = (options = {}, pageParam = {}) => xhr.post(`/maker/match/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

export {
    requestList
}
