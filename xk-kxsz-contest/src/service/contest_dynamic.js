// 赛程详情
import xhr from 'Axios'

// 赛程详情 - 列表
const requestMatchDynamic = (options = {}, pageParam={}) => xhr.post(`/maker/matchDynamic/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)


export {
    requestMatchDynamic
}


