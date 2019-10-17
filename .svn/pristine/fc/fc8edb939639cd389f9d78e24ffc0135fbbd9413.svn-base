import xhr from 'Axios'

// 空间 - 教师列表
let requestTeacherList = (options = {}) => xhr.post(`maker/spaces/listByTeacher?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 空间前台-教师--学习数,指导数,作品数,资源数,关注数,粉丝数统计
let requestRelatedDataOfTeacher = (options = {}) => xhr.post('/maker/spaces/selectByTeacherId', options)

// 教师-查看详情
let requestDetailOfTeacher = (options = {}) => xhr.post('/maker/baseTeacher/selectDetail', options)

export {
  requestTeacherList,
  requestRelatedDataOfTeacher,
  requestDetailOfTeacher
}
