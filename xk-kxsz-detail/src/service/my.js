import xhr from 'Axios'

// 个人空间>学生>实践
const requestPracticeList = (options = {}) => xhr.post(`/maker/activityMember/selectPersonPracticePager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 个人空间--学生/教师--学习列表查询
const requestStudyList = (options = {}) => xhr.post(`/maker/study/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 个人空间-教师/学生--学习--关联学习成果
const addStudyResult = (options = {}) => xhr.post('/maker/studyResult/add', options)

// 个人空间-教师/学生--学习--删除成果
const deleteStudyResult = (options = {}) => xhr.post('/maker/studyResult/del', options)

// 个人空间-教师/学生--学习、实践--设置公开范围
const setOpenRange = (url = '', options = {}) => xhr.post(url, options)

// 个人空间-学生--实践成果--关联
const addPracticeResult = (options = {}) => xhr.post('/maker/practiceResult/add', options)

// 个人空间-学生--实践成果--删除
const deletePracticeResult = (options = {}) => xhr.post('/maker/practiceResult/del', options)

// 个人空间-学生--修改资料
const studentModify = (options = {}) => xhr.post('/maker/baseStudent/modify', options)

// 个人空间-教师--修改资料
const teacherModify = (options = {}) => xhr.post('/maker/baseTeacher/modify', options)

// 个人空间-投资人--修改资料
const investorModify = (options = {}) => xhr.post('/maker/baseInvestor/modify', options)

// 个人空间-投资机构--修改资料
const investOrgModify = (options = {}) => xhr.post('/maker/baseInvestOrg/modify', options)

// 个人空间-企业--修改资料
const enterpriseModify = (options = {}) => xhr.post('/maker/baseEnterprise/modify', options)

// 个人空间-众创空间--修改资料
const multModify = (options = {}) => xhr.post('/maker/baseMult/modify', options)

// 个人空间关注列表
const focusList = (options = {}, pageParam = {}) => xhr.post(`/maker/follow/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 个人空间访客列表
const visitorList = (options = {}, pageParam = {}) => xhr.post(`/maker/spaceVisitor/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 个人空间-新增访客
const addVisitor = (options = {}) => xhr.post('/maker/spaceVisitor/add', options)

// 个人空间-关注分组新增
const addGroup = (options = {}) => xhr.post('/maker/follow/group/add', options)

// 个人空间-关注分组列表
const groupList = (options = {}) => xhr.post('/maker/follow/group/list', options)

// 个人空间-关注分组修改
const groupModify = (options = {}) => xhr.post('/maker/follow/group/modify', options)

// 个人空间-关注-批量设置分组
const setGroup = (options = {}) => xhr.post('/maker/follow/batch/updata', options)

// 个人空间-关注-批量取消关注
const delFriend = (options = {}) => xhr.post('/maker/follow/del', options)

// 个人空间-关注-批量关注
const addFriend = (options = {}) => xhr.post('/maker/follow/add', options)

// 个人空间-关注-批量拉黑
const shieldingFriend = (options = {}) => xhr.post('/maker/follow/batch/black', options)

// 个人空间-好友-列表
const friendList = (options = {}, pageParam = {}) => xhr.post(`/maker/friend/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 个人空间-好友-取消关注
const deleteFriend = (options = {}) => xhr.post('/maker/friend/del', options)

// 个人空间-好友-批量分组
const friendGroup = (options = {}) => xhr.post('/maker/friend/batch/updata', options)

// 个人空间-访问权限-用户查询
const enqUsers = (options = {}) => xhr.post('/portal/user/getUesrInfoList', options)

// 个人空间-访问权限-修改
const enqUsersAdd = (options = {}) => xhr.post('/maker/spaceRight/add', options)

// 个人空间-访问权限-修改
const enqUsersDetail = (options = {}) => xhr.post('/maker/spaceRight/selectList', options)

export {
  requestPracticeList,
  requestStudyList,
  addStudyResult,
  deleteStudyResult,
  setOpenRange,
  addPracticeResult,
  deletePracticeResult,
  studentModify,
  teacherModify,
  investorModify,
  investOrgModify,
  enterpriseModify,
  multModify,
  focusList,
  visitorList,
  addVisitor,
  addGroup,
  groupList,
  groupModify,
  setGroup,
  delFriend,
  addFriend,
  shieldingFriend,
  friendList,
  deleteFriend,
  friendGroup,
  enqUsers,
  enqUsersAdd,
  enqUsersDetail
}
