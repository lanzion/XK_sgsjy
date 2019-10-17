import xhr from 'Axios'

// 学习 - 热门项目
let requestProjectList = (options = {}) => xhr.post(`/maker/project/selectEduSchoolTeacherFrontProjectList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 学习 - 热门实训
let requestTrainList = (options = {}) => xhr.post(`/maker/onlineTrainRoom/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 学习 - 列表 - 课程
let requestCourseList = (options = {}) => xhr.post(`/maker/course/selectEduSchoolTeacherFrontCourseList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


/* 热门推荐 */
// 学习 -热门课程-查看列表
const requestRecoCourse = (options ={}) => xhr.post(`/maker/course/selectHotCoursePagerIndex?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 学习 -  热门项目 - 查看列表
const requestRecoProject = (options = {}) => xhr.post(`/maker/project/selectProjectListOfIndex?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 学习 -  热门实训 - 查看列表
const requestRecoTrain = (options ={}) => xhr.post(`/maker/onlineTrainRoom/selectPagerOfIndex?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 活动培训
const requestActivityTrain = (options = {}, pageParam = {}) => xhr.post(`/maker/train/selectStage?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)
// 培训学段列表
const requestTrainPeriodList = (options = {}, pageParam = {}) => xhr.post(`/maker/trainStudySection/selectAll`, options)
// 培训管理 - 根据学段id获取学科数据
const requestSubjectByPeriodId = (options = {}) => xhr.post(`/maker/trainSubject/selectByStudySectionId`, options)
// 培训分类列表
const requestTrainClassifyList = (options = {}, pageParam = {}) => xhr.post(`/maker/trainClassify/selectAll`, options)

export {
    requestProjectList,
    requestTrainList,
    requestCourseList,
    requestRecoCourse,
    requestRecoProject,
    requestRecoTrain,
    requestActivityTrain,
    requestTrainPeriodList,
    requestSubjectByPeriodId,
    requestTrainClassifyList
}
