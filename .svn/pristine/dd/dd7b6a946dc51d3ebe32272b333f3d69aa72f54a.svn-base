import xhr from 'Axios'

// 热门推荐
let requestHot = (options = {}, pageParam) => xhr.post(`/maker/work/selectReceptionPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 作品
let requestBannerList = (options = {}) => xhr.post(`/maker/banner/getBannerImg`, options)


export {
    requestHot,
    requestBannerList
}
