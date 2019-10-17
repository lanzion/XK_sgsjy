import xhr from 'Axios'

// 首页 - 优秀作品
let requestWorksList = (options = {}) => xhr.post(`/maker/work/selectReceptionPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 首页 - 热门竞赛
let requestEventList = (options = {}) => xhr.post(`/maker/match/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 首页 - 交流活动
let requestActivityList = (options = {}) => xhr.post(`/maker/activity/selectEduSchoolTeacherFrontList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 首页 - 热门课程
let requestCourseList = (options = {}) => xhr.post(`/maker/course/selectHotCoursePager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

export {
    requestWorksList,
    requestEventList,
    requestActivityList,
    requestCourseList
}
