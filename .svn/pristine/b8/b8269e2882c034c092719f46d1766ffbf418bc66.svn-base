// 后台管理 - 竞赛管理 - 线下
import xhr from 'Axios'


// 竞赛管理 - 列表(教育局/学校)
let requestContest = (options = {}) => xhr.post(`/maker/matchOffline/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 竞赛管理 - 列表(云后台)==
let requestContestByAdmin = (options = {}) => xhr.post(`/maker/match/listForAdmin?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 竞赛管理 - 添加
let addContest = (options = {}) => xhr.post(`/maker/matchOffline/add`, options)
// 竞赛管理 - 详情
let requestContestDetail = (options = {}) => xhr.post(`/maker/matchOffline/selectDetail`, options)
// 竞赛管理 - 修改
let modifyContest = (options = {}) => xhr.post(`/maker/matchOffline/modify`, options)
// 竞赛管理 - 删除
let delContest = (options = {}) => xhr.post(`/maker/matchOffline/del`, options)
// 竞赛管理 - 发布
let releaseContest = (options = {}) => xhr.post(`/maker/matchOffline/release`, options)
// 竞赛管理 - 终止
let overContest = (options = {}) => xhr.post(`/maker/matchOffline/over`, options)


// 项目类别 - 列表
let requestContestItem = (options = {}) => xhr.post(`/maker/match/offline/project/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 项目类别 - 添加
let addContestItem = (options = {}) => xhr.post(`/maker/match/offline/project/add`, options)
// 项目类别 - 详情
let requestContestItemDetail = (options = {}) => xhr.post(`/maker/match/offline/project/selectDetail`, options)
// 项目类别 - 修改
let modifyContestItem = (options = {}) => xhr.post(`/maker/match/offline/project/modify`, options)
// 项目类别 - 删除
let delContestItem = (options = {}) => xhr.post(`/maker/match/offline/project/delByIds`, options)


// 申报组别 - 列表
let requestContestGroup = (options = {}) => xhr.post(`/maker/match/offline/declare/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 申报组别 - 添加
let addContestGroup = (options = {}) => xhr.post(`/maker/match/offline/declare/add`, options)
// 申报组别 - 详情
let requestContestGroupDetail = (options = {}) => xhr.post(`/maker/match/offline/declare/selectDetail`, options)
// 申报组别 - 修改
let modifyContestGroup = (options = {}) => xhr.post(`/maker/match/offline/declare/modify`, options)
// 申报组别 - 删除
let delContestGroup = (options = {}) => xhr.post(`/maker/match/offline/declare/delByIds`, options)
// 添加竞赛选择 竞赛类型列表
let selectMatchType = (options = {}) => xhr.post(`/maker/matchProject/template/selectMatchType`, options)


export {
    requestContest,
    requestContestByAdmin,
    addContest,
    requestContestDetail,
    modifyContest,
    delContest,
    releaseContest,
    overContest,
    requestContestItem,
    addContestItem,
    requestContestItemDetail,
    modifyContestItem,
    delContestItem,
    requestContestGroup,
    addContestGroup,
    requestContestGroupDetail,
    modifyContestGroup,
    delContestGroup,
    selectMatchType,
}
