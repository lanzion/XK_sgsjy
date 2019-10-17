import xhr from 'Axios'

// 学校统计 - 概况 - 总量
let requesSchoolSurvey = (options = {}) => xhr.post('/maker/countSchool/count', options)

// 作品统计 - 分布统计 - 年级
let requestWorksDistributeByGrade = (options = {}) => xhr.post('/maker/workStatistics/getSchoolWorkGradeDistribute', options)
// 作品统计 - 分布统计 - 班级
let requestWorksDistributeByClasz = (options = {}) => xhr.post('/maker/workStatistics/getSchoolWorkClassDistribute', options)
// 作品统计 - 分布统计 - 人群
let requestWorksDistributeByCrowd = (options = {}) => xhr.post('/maker/workStatistics/getSchoolWorkCrowdDistribute', options)
// 作品统计 - 分类统计
let requestWorksType = (options = {}) => xhr.post('/maker/workStatistics/getSchoolWorkClassify', options)
// 作品统计 - 详细数据
let requestWorksDetail = (options = {}) => xhr.post(`/maker/workStatistics/getSchoolWorkDetail?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 项目统计 - 分类统计
let requestProjectType = (options = {}) => xhr.post('/maker/schoolProject/selectSchoolProjectTypeStatistics', options)
// 项目统计 - 状态统计
let requestProjectStatus = (options = {}) => xhr.post('/maker/schoolProject/selectSchoolProjectStatusStatistics', options)
// 项目统计 - 详细数据
let requestProjectDetail = (options = {}) => xhr.post(`/maker/schoolProject/selectSchoolProjectDetailStatisticsList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 课程统计 - 分类统计
let requestCourseType = (options = {}) => xhr.post('/maker/schoolCourse/selectSchoolCourseTypeStatistics', options)
// 课程统计 - 级别统计
let requestCourseGrade = (options = {}) => xhr.post('/maker/schoolCourse/selectSchoolCourseGradeStatistics', options)
// 课程统计 - 详细数据
let requestCourseDetail = (options = {}) => xhr.post(`/maker/schoolCourse/selectSchoolCourseDetailStatisticsList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 活动统计 - 分类统计
let requestActivityType = (options = {}) => xhr.post('/maker/schoolActivity/selectSchoolActivityTypeStatistics', options)
// 活动统计 - 状态统计
let requestActivityStatus = (options = {}) => xhr.post('/maker/schoolActivity/selectSchoolActivityStatusStatistics', options)
// 活动统计 - 详细数据
let requestActivityDetail = (options = {}) => xhr.post(`/maker/schoolActivity/selectSchoolActivityDetailStatisticsList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 活动统计 - 数量统计
let requestActivityNum = (options = {}) => xhr.post('/maker/schoolSurvey/selectActivityWeek', options)


// 学习统计 - 分布统计 - 年级
let requestStudyDistributeByGrade = (options = {}) => xhr.post('/maker/schoolStudy/selectSchoolStudyGradeStatisticsList', options)
// 学习统计 - 分布统计 - 班级
let requestStudyDistributeByClasz = (options = {}) => xhr.post('/maker/schoolStudy/selectSchoolStudyClassStatisticsList', options)
// 学习统计 - 分布统计 - 人群
let requestStudyDistributeByCrowd = (options = {}) => xhr.post('/maker/schoolStudy/selectSchoolStudyPersonStatisticsList', options)
// 学习统计 - 分类统计
let requestStudyType = (options = {}) => xhr.post('/maker/schoolStudy/selectSchoolStudyTypeStatisticsList', options)
// 学习统计 - 详细数据
let requestStudyDetail = (options = {}) => xhr.post(`/maker/schoolStudy/selectSchoolStudyDetailStatisticsList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 实践统计 - 分布统计 - 年级
let requestPracticeDistributeByGrade = (options = {}) => xhr.post('/maker/schoolPractice/selectSchoolPracticeGradeStatistics', options)
// 实践统计 - 分布统计 - 班级
let requestPracticeDistributeByClasz = (options = {}) => xhr.post('/maker/schoolPractice/selectSchoolPracticeClassStatistics', options)
// 实践统计 - 详细数据
let requestPracticeDetail = (options = {}) => xhr.post(`/maker/schoolPractice/selectSchoolPracticeDetailStatisticsList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 资源统计 - 分类统计
let requestResourceType = (options = {}) => xhr.post('/maker/resourceStatistics/getSchoolResourceClassify', options)
// 资源统计 - 格式统计
let requestResourceFormat = (options = {}) => xhr.post('/maker/resourceStatistics/getSchoolResourceFormat', options)
// 资源统计 - 详细数据
let requestResourceDetail = (options = {}) => xhr.post(`/maker/resourceStatistics/getSchoolResourceDetail?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 兴趣组统计 - 分类统计
let requestInterestType = (options = {}) => xhr.post('/maker/analysis/interest/classification', options)
// 兴趣组统计 - 详细数据
let requestInterestDetail = (options = {}) => xhr.post(`/maker/analysis/interest/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 评价统计 - 分布统计 - 年级
let requestEvaluateDistributeByGrade = (options = {}) => xhr.post('/maker/schoolEvaluate/selectSchoolEvaluateDwStatistics', options)
// 评价统计 - 分布统计 - 班级
let requestEvaluateDistributeByClasz = (options = {}) => xhr.post('/maker/schoolEvaluate/selectSchoolClassColumnar', options)
// 评价统计 - 分类统计
let requestEvaluateType = (options = {}) => xhr.post('/maker/schoolEvaluate/selectSchoolEvaluateBingStatistics', options)
// 评价统计 - 详细数据
let requestEvaluateDetail = (options = {}) => xhr.post(`/maker/schoolEvaluate/selectEvaluateDetailStatisticsPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 课题统计 - 分类统计
let requestSubjectType = (options = {}) => xhr.post('/maker/schoolSubject/selectSubjectField', options)
// 课题统计 - 状态统计
let requestSubjectStatus = (options = {}) => xhr.post('/maker/schoolSubject/selectSubjectStatus', options)
// 课题统计 - 详细数据
let requestSubjectDetail = (options = {}) => xhr.post(`/maker/schoolSubject/selectSubjectDetailedPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 在研课题统计 - 状态统计
let requestResearchSubjectStatus = (options = {}) => xhr.post('/maker/schoolSubject/selectGroupByStatus', options)

// 学生创客统计
let requestStudent = (options = {}) => xhr.post(`/maker/schoolSurvey/selectStudentCountPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


export {
    requesSchoolSurvey,
    requestWorksDistributeByGrade,
    requestWorksDistributeByClasz,
    requestWorksDistributeByCrowd,
    requestWorksType,
    requestWorksDetail,
    requestProjectType,
    requestProjectStatus,
    requestProjectDetail,
    requestCourseType,
    requestCourseGrade,
    requestCourseDetail,
    requestActivityType,
    requestActivityStatus,
    requestActivityDetail,
    requestActivityNum,
    requestStudyDistributeByGrade,
    requestStudyDistributeByClasz,
    requestStudyDistributeByCrowd,
    requestStudyType,
    requestStudyDetail,
    requestPracticeDistributeByGrade,
    requestPracticeDistributeByClasz,
    requestPracticeDetail,
    requestResourceType,
    requestResourceFormat,
    requestResourceDetail,
    requestInterestType,
    requestInterestDetail,
    requestEvaluateDistributeByGrade,
    requestEvaluateDistributeByClasz,
    requestEvaluateType,
    requestEvaluateDetail,
    requestSubjectType,
    requestSubjectStatus,
    requestSubjectDetail,
    requestResearchSubjectStatus,
    requestStudent
}
