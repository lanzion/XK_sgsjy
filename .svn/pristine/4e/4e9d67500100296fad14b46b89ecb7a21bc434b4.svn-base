import xhr from 'Axios'

// 个人后台-我的参赛列表
let myContest = (options = {}, pageParams = {}) => xhr.post(`/maker/match/listbyuser?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)

// 竞赛-列表（老师）我的评赛列表
let requestMyReview = (options = {}, pageParams = {}) => xhr.post(`/maker/match/listbyuserjoin?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)

export {
    myContest,
    requestMyReview
}