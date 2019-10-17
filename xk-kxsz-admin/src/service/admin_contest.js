// 后台管理 - 竞赛管理 - 线上
import xhr from 'Axios'

// 专家管理 - 老师列表
let requestContestTeacher = (options = {}, pageParam = {}) => xhr.post(`/maker/baseTeacher/selectAllByRegion?pageSize=${pageParam.pageSize}&&pageNum=${pageParam.pageNum}`,options)


// 竞赛管理 - 列表(教育局/学校)
let requestContest = (options = {}) => xhr.post(`/maker/match/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 竞赛管理 - 列表(云后台)
let requestContestByAdmin = (options = {}) => xhr.post(`/maker/match/listForAdmin?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 竞赛管理 - 添加
let addContest = (options = {}) => xhr.post(`/maker/match/add`,options)
// 竞赛管理 - 详情
let requestContestDetail = (options = {}) => xhr.post(`/maker/match/selectDetail`,options)
// 竞赛管理 - 修改
let modifyContest = (options = {}) => xhr.post(`/maker/match/modify`,options)
// 竞赛管理 - 删除
let delContest = (options = {}) => xhr.post(`/maker/match/delByIds`,options)
// 竞赛管理 - 发布
let releaseContest = (options = {}) => xhr.post(`/maker/match/release`,options)
// 竞赛管理 - 终止
let overContest = (options = {}) => xhr.post(`/maker/match/over`,options)


// 竞赛项目 - 列表
let requestContestItem = (options = {}) => xhr.post(`/maker/matchProject/template/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 竞赛项目 - 添加
let addContestItem = (options = {}) => xhr.post(`/maker/matchProject/template/add`,options)
// 竞赛项目 - 详情
let requestContestItemDetail = (options = {}) => xhr.post(`/maker/matchProject/template/selectDetail`,options)
// 竞赛项目 - 修改
let modifyContestItem = (options = {}) => xhr.post(`/maker/matchProject/template/modify`,options)
// 竞赛项目 - 删除
let delContestItem = (options = {}) => xhr.post(`/maker/matchProject/template/delByIds`,options)


// 专家管理 - 列表
let requestContestExpert = (options = {}) => xhr.post(`/maker/matchExpert/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 专家管理 - 添加
let addContestExpert = (options = {}) => xhr.post(`/maker/matchExpert/add`,options)
// 专家管理 - 详情
let requestContestExpertDetail = (options = {}) => xhr.post(`/maker/matchExpert/selectDetail`,options)
// 专家管理 - 修改
let modifyContestExpert = (options = {}) => xhr.post(`/maker/matchExpert/modify`,options)
// 专家管理 - 删除
let delContestExpert = (options = {}) => xhr.post(`/maker/matchExpert/delByIds`,options)


export {
    requestContestTeacher,
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
    requestContestExpert,
    addContestExpert,
    requestContestExpertDetail,
    modifyContestExpert,
    delContestExpert,
}
