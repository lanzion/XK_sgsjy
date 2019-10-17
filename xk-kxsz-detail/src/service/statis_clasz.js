import xhr from 'Axios'

// 班级统计 - 概况 - 总量
let requesClaszSurvey = (options = {}) => xhr.post('/maker/space/class/selectClassCountById', options)

// 班级统计 - 本月统计
let requesClaszMonth = (options = {}) => xhr.post('/maker/space/class/selectClassMonthCountById', options)

// 班级统计 - 详细信息
let requestClaszCountDetail = (options = {}) => xhr.post(`/maker/space/class/selectClassDetailById?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)


export {
    requesClaszSurvey,
    requesClaszMonth,
    requestClaszCountDetail
}
