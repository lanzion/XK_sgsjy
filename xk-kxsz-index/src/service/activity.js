import xhr from 'Axios'

// 竞赛列表
const requestContestList = (options = {}, pageParam = {}) => xhr.post(`/maker/match/list?pageNum=${ pageParam.pageNum }&pageSize=${ pageParam.pageSize }`, options)

// 活动列表
let requestActivityList = (options = {}, pageParam = {}) => xhr.post(`/maker/activity/selectEduSchoolTeacherFrontList?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)

// 活动成员申请
let activityApply = (options = {}) => xhr.post(`/maker/activityApply/add`, options)

/* 热门推荐 */
// 活动 -首页- 竞赛推荐
const requestRecoContest =(options = {}, pageParam = {}) => xhr.post(`/maker/match/selectMatchOfIndex?pageNum=${ pageParam.pageNum }&pageSize=${ pageParam.pageSize }`, options)
// 活动 - 首页 - 交流活动
const requestRecoActivity =(options = {}, pageParam = {}) => xhr.post(`/maker/activity/selectActivityListOfIndex?pageNum=${ pageParam.pageNum }&pageSize=${ pageParam.pageSize }`, options)


export {
    requestContestList,
    requestActivityList,
    activityApply,
    requestRecoContest,
    requestRecoActivity
}
