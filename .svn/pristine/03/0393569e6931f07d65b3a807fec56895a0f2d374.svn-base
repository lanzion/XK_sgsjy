import xhr from 'Axios'
//推荐学校
let schoolPager = (options = {}, pagParam = {}) => xhr.post(`maker/recommend/selectSchoolPager?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)

//推荐作品
let workPager = (options = {}, pagParam = {}) => xhr.post(`maker/recommend/selectWorkPager?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)

//推荐老师
let teacherPager = (options = {}, pagParam = {}) => xhr.post(`maker/recommend/selectTeacherPager?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)

//推荐学生
let studentPager = (options = {}, pagParam = {}) => xhr.post(`maker/recommend/selectStudentPager?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)

//推荐兴趣组
let interestsPager = (options = {}, pagParam = {}) => xhr.post(`maker/recommend/selectInterestsPager?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)

// 教育局统计
let eduStatisPager = (options = {}) => xhr.post('maker/recommend/selectEduStatistics', options)

// 学校统计
let schoolStatisPager = (options = {}) => xhr.post('maker/recommend/selectSchoolStatistics', options)

//学校空间主页详情
let schoolDetails = (options = {}) => xhr.post(`maker/baseSchool/selectDetail`, options)

//资讯
let inforData = (options = {}, pagParam = {}) => xhr.post(`admin/notice/detail/fronEndList?pageNum=${pagParam.pageNum}&pageSize=${pagParam.pageSize}`, options)

//班级空间主页详情
let claszDetails = (options = {}) => xhr.post(`maker/space/class/detail`, options)

//教育局主页详情
let eduDetails = (options = {}) => xhr.post(`maker/baseEducation/selectDetail`, options)

//班级学生光荣榜
let classGlory = (options = {}) => xhr.post(`maker/space/class/glory`, options)

// 班级空间-首页-动态列表
let classDynamicList = (options = {},pageParam = {}) => xhr.post(`/maker/base/class/dynamic/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

// 兴趣组-首页-动态列表
let interestDynamicList = (options = {},pageParam = {}) => xhr.post(`/maker/interests/dynamic/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

// 兴趣组-首页-访客-列表
let interestVisitorList = (options = {},pageParam = {}) => xhr.post(`/maker/interests/visitor/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)



export {
    schoolPager,
    workPager,
    teacherPager,
    studentPager,
    interestsPager,
    eduStatisPager,
    schoolStatisPager,
    schoolDetails,
    inforData,
    claszDetails,
    eduDetails,
    classGlory,
    classDynamicList,
    interestDynamicList,
    interestVisitorList
}