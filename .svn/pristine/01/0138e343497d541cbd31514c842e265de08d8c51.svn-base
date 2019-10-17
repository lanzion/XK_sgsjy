import xhr from 'Axios'

// 空间 - 学生列表
let requestStudentList = (options = {}) => xhr.post(`maker/spaces/listByStudent?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 空间前台-学生--学习数,实践数,作品数,资源数,关注数,粉丝数统计
let requestRelatedDataOfStudent = (options = {}) => xhr.post('/maker/spaces/selectByStudentId', options)

// 教师-查看详情
let requestDetailOfStudent = (options = {}) => xhr.post('/maker/baseStudent/selectDetail', options)

export {
  requestStudentList,
  requestRelatedDataOfStudent,
  requestDetailOfStudent
}
