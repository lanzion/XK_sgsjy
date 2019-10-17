import xhr from 'Axios'

// 学习 - 热门项目
let requestProjectList = (options = {}) => xhr.post(`/maker/project/selectEduSchoolTeacherFrontProjectList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 学习 - 热门实训
let requestTrainList = (options = {}) => xhr.post(`/maker/onlineTrainRoom/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 学习 - 列表 - 课程
let requestCourseList = (options = {}) => xhr.post(`/maker/course/selectEduSchoolTeacherFrontCourseList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

export {
    requestProjectList,
    requestTrainList,
    requestCourseList
}
