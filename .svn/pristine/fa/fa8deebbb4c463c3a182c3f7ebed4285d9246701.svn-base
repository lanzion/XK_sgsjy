import xhr from 'Axios'

// 热门推荐
let requestHot = (options = {}, pageParam = {}) => xhr.post(`/maker/work/selectReceptionPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 作品
let requestBannerList = (options = {}) => xhr.post(`/maker/banner/getBannerImg`, options)

// 推荐作品
const requestRecommendworks = (options = {}, pageParam = {}) => xhr.post(`/maker/work/selectPagerForBefor?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 作品 - 热门推荐
const requestRecoWorks = (options = {}, pageParam = {}) => xhr.post(`/maker/work/selectReceptionWithRecomm?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 作品 - 猜你喜欢
const requestLikeWorks = (options = {}, pageParam = {}) => xhr.post(`/maker/work/selectReceptionWithGuess?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)


export {
    requestHot,
    requestBannerList,
    requestRecommendworks,
    requestRecoWorks,
    requestLikeWorks
}
