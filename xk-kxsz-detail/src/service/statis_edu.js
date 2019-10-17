import xhr from 'Axios'

// 教育局统计 - 概况 - 总量
let requesEduSurvey = (options = {}) => xhr.post('/maker/countEdu/count', options)
// 教育局统计 - 概况 - 学校创客空间统计
let requesAreaSchoolSpace = (options = {}) => xhr.post('/maker/countEdu/selectColumnar', options)
// 教育局统计 - 概况 - 区域详情
let requesAreaDetail = (options = {}) => xhr.post('/maker/countEdu/selectPager', options)

// 作品统计 - 分布统计
let requestWorksDistribute = (options = {}) => xhr.post('/maker/countEduWork/selectColumnar', options)
// 作品统计 - 分类统计
let requestWorksType = (options = {}) => xhr.post('/maker/countEduWork/selectAnnular', options)
// 作品统计 - 详细数据
let requestWorksDetail = (options = {}) => xhr.post(`/maker/countEduWork/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 项目统计 - 分布统计
let requestProjectDistribute = (options = {}) => xhr.post('/maker/countEduProject/selectColumnar', options)
// 项目统计 - 分类统计
let requestProjectType = (options = {}) => xhr.post('/maker/countEduProject/selectAnnular', options)
// 项目统计 - 详细数据
let requestProjectDetail = (options = {}) => xhr.post(`/maker/countEduProject/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 课程统计 - 分布统计
let requestCourseDistribute = (options = {}) => xhr.post('/maker/countEduCourse/selectColumnar', options)
// 课程统计 - 分类统计
let requestCourseType = (options = {}) => xhr.post('/maker/countEduCourse/selectAnnular', options)
// 课程统计 - 详细数据
let requestCourseDetail = (options = {}) => xhr.post(`/maker/countEduCourse/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 活动统计 - 分布统计
let requestActivityDistribute = (options = {}) => xhr.post('/maker/countEduActivity/selectColumnar', options)
// 活动统计 - 分类统计
let requestActivityType = (options = {}) => xhr.post('/maker/countEduActivity/selectAnnular', options)
// 活动统计 - 详细数据
let requestActivityDetail = (options = {}) => xhr.post(`/maker/countEduActivity/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 学习统计 - 分布统计
let requestStudyDistribute = (options = {}) => xhr.post('/maker/countEduStudy/selectColumnar', options)
// 学习统计 - 分类统计
let requestStudyType = (options = {}) => xhr.post('/maker/countEduStudy/selectAnnular', options)
// 学习统计 - 详细数据
let requestStudyDetail = (options = {}) => xhr.post(`/maker/countEduStudy/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 实践统计 - 分布统计
let requestPracticeDistribute = (options = {}) => xhr.post('/maker/countEduPractice/selectColumnar', options)
// 实践统计 - 详细数据
let requestPracticeDetail = (options = {}) => xhr.post(`/maker/countEduPractice/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 资源统计 - 分布统计
let requestResourceDistribute = (options = {}) => xhr.post('/maker/countEduResource/selectColumnar', options)
// 资源统计 - 分类统计
let requestResourceType = (options = {}) => xhr.post('/maker/countEduResource/selectAnnular', options)
// 资源统计 - 详细数据
let requestResourceDetail = (options = {}) => xhr.post(`/maker/countEduResource/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 兴趣组统计 - 分布统计
let requestInterestDistribute = (options = {}) => xhr.post('/maker/countEduInterests/selectColumnar', options)
// 兴趣组统计 - 分类统计
let requestInterestType = (options = {}) => xhr.post('/maker/countEduInterests/selectAnnular', options)
// 兴趣组统计 - 详细数据
let requestInterestDetail = (options = {}) => xhr.post(`/maker/countEduInterests/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 评价统计 - 分布统计
let requestEvaluateDistribute = (options = {}) => xhr.post('/maker/countEduEvaluation/selectEvaluateDwStatistics', options)
// 评价统计 - 分类统计
let requestEvaluateType = (options = {}) => xhr.post('/maker/countEduEvaluation/selectAnnular', options)
// 评价统计 - 详细数据
let requestEvaluateDetail = (options = {}) => xhr.post(`/maker/countEduEvaluation/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


// 课题统计 - 分布统计
let requestSubjectDistribute = (options = {}) => xhr.post('/maker/countEduSubject/selectColumnar', options)
// 课题统计 - 领域统计
let requestSubjectType = (options = {}) => xhr.post('/maker/countEduSubject/selectAnnular', options)
// 课题统计 - 详细数据
let requestSubjectDetail = (options = {}) => xhr.post(`/maker/countEduSubject/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


export {
    requesEduSurvey,
    requesAreaSchoolSpace,
    requestWorksDistribute,
    requestWorksType,
    requestWorksDetail,
    requestProjectDistribute,
    requestProjectType,
    requestProjectDetail,
    requestCourseDistribute,
    requestCourseType,
    requestCourseDetail,
    requestActivityDistribute,
    requestActivityType,
    requestActivityDetail,
    requestStudyDistribute,
    requestStudyType,
    requestStudyDetail,
    requestPracticeDistribute,
    requestPracticeDetail,
    requestResourceDistribute,
    requestResourceType,
    requestResourceDetail,
    requestInterestDistribute,
    requestInterestType,
    requestInterestDetail,
    requestEvaluateDistribute,
    requestEvaluateType,
    requestEvaluateDetail,
    requestSubjectDistribute,
    requestSubjectType,
    requestSubjectDetail,
    requesAreaDetail
}
