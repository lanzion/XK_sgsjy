// 参赛入口
import xhr from 'Axios'

// 作品列表
const requestWorksList = (options = {}, pageParam = {}) => xhr.post(`/maker/work/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)

// 作品列表
const requestMatchActor = (options = {}, pageParam = {}) => xhr.post(`/maker/matchActor/selectApplyDetail`, options)

// 指导老师列表
const requestTeacherList = (options = {}) => xhr.post(`/maker/baseTeacher/page`, options)

// 参赛成员列表
const requestStudentList = (options = {}) => xhr.post(`/maker/baseStudent/page`, options)
// // 指导老师列表
// const requestTeacherList = (options = {}) => xhr.post(`/maker/baseTeacher/selectPager`, options)

// // 参赛成员列表
// const requestStudentList = (options = {}) => xhr.post(`/maker/baseStudent/selectPager`, options)

// 上传作品
const requestMatchWorksAdd = (options = {}) => xhr.post(`/maker/matchWorks/add`, options)

// 作品附件列表查询（专家）
const requestMatchExpertWorksEvaluation = (options = {}, pageParam = {}) => xhr.post(`maker/matchExpertWorksEvaluation/resourcePager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)
// 我的作品 - 列表
const requestMatchWorksList = (options = {}, pageParam = {}) => xhr.post(`/maker/matchWorks/selecMyWorktPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`, options)

// 我的作品 - 所在赛程
const requestPhaseList = (options = {}) => xhr.post(`/maker/matchPhase/getPhaseList`, options)

// 我的作品 - 删除
const requestMatchWorksDel = (options = {}) => xhr.post(`/maker/matchWorks/delByIds`, options)

// ode作品 - 参赛记录
const requestRecordsList = (options = {}) => xhr.post(`/maker/matchExpertWorksEvaluation/selectMatchRecordsList`, options)

// 竞赛项目 - 详情
let requestContestItemDetail = (options = {}) => xhr.post(`/maker/matchProject/template/selectDetail`, options)

/*****************************************************************/
// 线下竞赛

// 项目类别-列表-已发布竞赛项目类别列表
const requestProjectRelation = (options = {}) => xhr.post(`/maker/match/offline/projectRelation/list`, options)
// 申报组别-列表-已发布竞赛组别列表
const requestDeclareRelation = (options = {}) => xhr.post(`/maker/match/offline/declareRelationt/list`, options)
// 报名参赛-报名参赛
const matchOfflineActorAdd = (options = {}) => xhr.post(`/maker/matchOfflineActor/add`, options)
// 报名参赛-详情
const requestOfflineEnrollDetail = (options = {}) => xhr.post(`/maker/matchOfflineActor/selectDetail`, options)
// 线下竞赛-报名模板修改
const actorAddModify = (options = {}) => xhr.post(`/maker/matchOfflineActor/modify`, options)


export {
    requestWorksList,
    requestMatchActor,
    requestTeacherList,
    requestStudentList,
    requestMatchWorksAdd,
    requestMatchWorksList,
    requestPhaseList,
    requestMatchWorksDel,
    requestRecordsList,
    requestProjectRelation,
    requestDeclareRelation,
    matchOfflineActorAdd,
    requestOfflineEnrollDetail,
    actorAddModify,
    requestContestItemDetail,
    requestMatchExpertWorksEvaluation
}


