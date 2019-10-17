import xhr from 'Axios'

// 课程--列表查询--(教师后台)
let requestBackendListOfTeacher = (options = {}) => xhr.post(`/maker/course/selectTeacherBackCourseList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 课程--列表查询--(教育局、学校、教师前台)
let requestFrontendList = (options = {}) => xhr.post(`/maker/course/selectEduSchoolTeacherFrontCourseList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 课程--考题列表
let requestQuestionList = (options = {}) => xhr.post(`/maker/questions/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 课程--考题--添加考题
let addQuestion = (options = {}) => xhr.post('/maker/questions/add', options)

// 课程--考题--删除考题
let deleteQuestion = (options = {}) => xhr.post('/maker/questions/delete', options)

// 课程--考题--修改考题
let editQuestion = (options = {}) => xhr.post('/maker/questions/notify', options)

// 课程--知识点列表
let requestPointList = (options = {}) => xhr.post('/maker/question/knowledgepoint/list/all', options)

// 课程--知识点--添加知识点
let addPoint = (options = {}) => xhr.post('/maker/question/knowledgepoint/add', options)

// 课程--知识点--删除
let deletePoint = (options = {}) => xhr.post('/maker/question/knowledgepoint/delete', options)

// 课程--知识点--修改
let editPoint = (options = {}) => xhr.post('/maker/question/knowledgepoint/notify', options)

// 课程--教师后台--发布课程--新增
let addCourse = (options = {}) => xhr.post('/maker/course/add', options)

// 课程--教师后台--发布课程--修改
let editCourse = (options = {}) => xhr.post('/maker/course/modify', options)

// 课程--教师后台--修改章节目录
const editCourseOutline = (options = {}) => xhr.post('/maker/course/modifyChapter', options)

// 课程--章节-删除
const delCourseSection = (options = {}) => xhr.post(`/maker/courseChapter/del`, options)

// 课程--课时-删除
const delCourseHourse = (options = {}) => xhr.post(`/maker/courseHourSection/del`, options)

// 课程--教师后台--发布课程--删除
let deleteCourse = (options = {}) => xhr.post('/maker/course/del', options)

// 课程--提交审核
let submitCourse = (options = {}) => xhr.post('/maker/course/submitAudit', options)

// 课程--教师后台--查看详情
let requestCourseDetail = (options = {}) => xhr.post('/maker/course/selectDetail', options)

// 课程--教师后台--修改课程-查询信息
let requestBackendCourseInfo = (options = {}) => xhr.post('/maker/course/edit', options)

// 课程--课程目录列表
let requestOutline = (options = {}) => xhr.post('/maker/courseChapter/selectChapterList', options)

// 课程--成员列表
let requestStudentList = (options = {}) => xhr.post(`/maker/courseMember/selectMemberList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 课程--讨论区--讨论主题列表
let requestDiscussList = (options = {}) => xhr.post(`/maker/course/discuss/selectDiscussPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 课程--讨论区--讨论主题详情
let requestDiscussDetail = (options = {}) => xhr.post(`/maker/course/discuss/selectDetail?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 课程--讨论区--新增讨论/讨论回复
let addDiscussItem = (options = {}) => xhr.post('/maker/course/discuss/addDiscuss', options)

// 课程--讨论区--讨论主题--点赞
let addLikes = (options = {}) => xhr.post('/maker/course/discuss/addPraiseDiscuss', options)

// 课程--资源共享区--资源列表
let requestResourceList = (options = {}) => xhr.post(`/maker/course/resource/getList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 课程--资源共享区--资源删除
let deleteResource = (options = {}) => xhr.post('/maker/course/resource/del', options)

// 课程--资源共享区--新增
let uploadResource = (options = {}) => xhr.post('/maker/course/resource/add', options)

/*****************************************************************/

// 课程--申请报名
let joinCourse = (options = {}) => xhr.post('/maker/courseMember/add', options)

// 课程--申请报名--判断是否已经申请报名
let checkHasAppliedOrNot = (options = {}) => xhr.post('/maker/courseMember/isApply', options)

// 课程--学习进度--查询
let queryStudyingProgress = (options = {}) => xhr.post('/maker/courseProgress/selectStudyProgress', options)

// 课程--笔记--列表查询
let requestNoteList = (options = {}) => xhr.post(`/maker/courseNote/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 课程--笔记--课时列表
let requestSectionList = (options = {}) => xhr.post('/maker/courseHourSection/selectHourSectionList', options)

// 课程--笔记--课时列表
let addNote = (options = {}) => xhr.post('/maker/courseNote/add', options)

// 课程--笔记--删除
let deleteNote = (options = {}) => xhr.post('/maker/courseNote/del', options)

// 课程--笔记--修改
let editNote = (options = {}) => xhr.post('/maker/courseNote/modify', options)

// 课程--小节测试--试卷列表查询
let requestExamQuestionList = (options = {}) => xhr.post('/maker/courseExaminationPaper/selectExaminationPaper', options)

// 课程--小节测试--提交测试
let submitTesting = (options = {}) => xhr.post('/maker/courseExaminationResult/add', options)

// 课程--小节测试--查询考试结果
let queryLastTestResult = (options = {}) => xhr.post('/maker/courseExaminationResult/selectDetail', options)

// 课程--学习--新增课时学习记录
let addCourseStudyingRecord = (options = {}) => xhr.post('/maker/courseSectionProgress/add', options)

// 课程--列表查询--相关课程列表
let requestRelatedCourseList = (options = {}) => xhr.post(`/maker/course/selectAboutCourseList?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 课程--故障--添加故障
let addFailureReport = (options = {}) => xhr.post('/maker/courseFailureReport/add', options)

/************************************************创客教育***********************************************/

// 创客教育-课程学习-热门课程
let requestHotCourseList = (options = {}) => xhr.post(`/maker/course/selectHotCoursePager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 创客教育-课程学习-猜你喜欢
let requestFavoriteCourseList = (options = {}) => xhr.post(`/maker/course/selectLikeCoursePager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 创客教育-课程学习-明星教师
let requestFavoriteTeacherList = (options = {}) => xhr.post(`/maker/baseTeacher/selectHotTeacherPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

export {
  requestBackendListOfTeacher,
  requestFrontendList,
  requestQuestionList,
  addQuestion,
  deleteQuestion,
  editQuestion,
  requestPointList,
  addPoint,
  deletePoint,
  editPoint,
  addCourse,
  editCourse,
  editCourseOutline,
  delCourseSection,
  delCourseHourse,
  deleteCourse,
  submitCourse,
  requestCourseDetail,
  requestBackendCourseInfo,
  requestOutline,
  requestStudentList,
  requestDiscussList,
  requestDiscussDetail,
  addDiscussItem,
  addLikes,
  requestResourceList,
  deleteResource,
  uploadResource,
  joinCourse,
  checkHasAppliedOrNot,
  queryStudyingProgress,
  requestNoteList,
  requestSectionList,
  addNote,
  deleteNote,
  editNote,
  requestExamQuestionList,
  submitTesting,
  queryLastTestResult,
  addCourseStudyingRecord,
  requestRelatedCourseList,
  addFailureReport,
  requestHotCourseList,
  requestFavoriteCourseList,
  requestFavoriteTeacherList,
}
