import xhr from 'Axios'

// 获取活动培训详情
const requestTrainDetail = (options = {}) => xhr.post('/maker/train/selectDetail', options)
// 活动培训 - 报名
const trainEnroll = (options = {}) => xhr.post('/maker/trainSignUp/add', options)
// 活动培训 - 报名修改
const trainEnrollModify = (options = {}) => xhr.post('/maker/trainSignUp/modify', options)
// 活动培训 - 报名详情
const trainEnrollDetail = (options = {}) => xhr.post('maker/trainSignUp/selectByCreateIdAndTrain', options)
// 判断是否已报名
const judgeEnroll = (options = {}) => xhr.post('/maker/train/isSignUp', options)
// 搜索学生姓名
const searchStudent = (options = {}) => xhr.post('/maker/baseStudent/searchByKey', options)
// 培训报名-选择培训类型下拉列表
const selectTrainProjectList = (options = {}) => xhr.post('/maker/train/selectTrainProjectList', options)
// 获取学校列表
const getComboxByArea = (options = {}) => xhr.post('/maker/baseSchool/getComboxByArea', options)

export {
    requestTrainDetail,
    trainEnroll,
    trainEnrollModify,
    trainEnrollDetail,
    judgeEnroll,
    searchStudent,
    selectTrainProjectList,
    getComboxByArea
}
