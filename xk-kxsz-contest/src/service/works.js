
// 参赛作品
import xhr from 'Axios'

// 竞赛-作品-参赛作品前台榜单、全部作品列表
const requestAllWorksList = (options = {}, pageParams = {}) => xhr.post(`/maker/matchWorks/selectReceptionPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`,options)

// 竞赛-参赛作品-评分排行榜
const requestScoreList = (options = {}, pageParams = {}) => xhr.post(`/maker/matchWorks/selectWinWorksPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)

// 竞赛-作品-获奖作品
const requestAwardsWorksList = (options = {}, pageParams = {}) => xhr.post(`/maker/matchWorks/selectWinWorksPagerbyAwards?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)

// 竞赛(线下)-作品-获奖作品
const requestAwardsWorksOfflineList = (options = {}, pageParams = {}) => xhr.post(`/maker/matchOfflineResult/selectResultPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)

//竞赛-作品-详情
const requestWorksDetail = (options = {}) => xhr.post(`/maker/matchWorks/selectDetail`, options)

//竞赛--专家入口--我的评审(我的评审)列表
const requestExpertAuditedWorks = (options = {}, pageParams = {}) => xhr.post(`/maker/matchExpertWorksEvaluation/selectMyEvaluationedWorksPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`,options)

//竞赛--专家入口--我的评审(待我评审)列表
const requestExpertPendingWorks = (options = {}, pageParams = {}) => xhr.post(`/maker/matchExpertWorksEvaluation/selectPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`,options)

//竞赛-专家入口-项目指标列表
const requestEvalIndex = (options = {}) => xhr.post(`/maker/matchProjectEvaluationIndex/selectPager`, options)

//竞赛--专家入口--作品评审
const worksReview = (options = {}) => xhr.post(`/maker/matchExpertWorksEvaluation/evaluationWorks`, options)
//竞赛--专家入口--修改评审
const batchUpdateWorks = (options = {}) => xhr.post(`/maker/matchExpertWorksEvaluation/batchUpdateItem`, options)

// 竞赛-作品-计算浏览数量
const countBrowseNum = (options = {}) => xhr.post(`/maker/matchWorks/countBrowseNum`, options)

// 作品点赞
const worksPraise = (options = {}) => xhr.post(`/maker/praise/do`, options)

// 作品取消点赞
const worksCancelPraise = (options = {}) => xhr.post(`/maker/praise/cancel`, options)

// 公共-评论-收藏-分享（总数统计）
const commonStatistics = (options = {}) => xhr.post(`/common/statistics`, options)

// 公共-评论-收藏-分享（是否点赞，是否评论，是否分享）
const judgePraise = (options = {}) => xhr.post(`/common/statistics/single`, options)


/*******************************************/
// 线下竞赛
// 参赛作品-全部参赛(榜单)列表
const requestOfflineWorks = (options = {}, pageParams = {}) => xhr.post(`/maker/matchOfflineOpus/selectReceptionPager?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`, options)
// 参赛作品-作品详情
const requestOfflineWorkDetail = (options = {}) => xhr.post('/maker/matchOfflineOpus/selectDetail', options)
// 参赛作品-作品浏览数累加
const countOfflineBrowseNum = (options = {}) => xhr.post('/maker/matchOfflineOpus/addBrowseNum', options)
// [经我评审,待我评审]-分段统计
const aftermyreviewformyreviewsectionalstatistics = (options = {}) => xhr.post(`/maker/matchExpertWorksEvaluation/getMarkScoreNum`, options)

export {
	requestAllWorksList,
	requestScoreList,
	requestAwardsWorksList,
	requestAwardsWorksOfflineList,
	requestWorksDetail,
	requestExpertAuditedWorks,
	requestExpertPendingWorks,
	requestEvalIndex,
	worksReview,
	batchUpdateWorks,
	countBrowseNum,
	worksPraise,
	worksCancelPraise,
	commonStatistics,
	judgePraise,
	requestOfflineWorks,
	requestOfflineWorkDetail,
	countOfflineBrowseNum,
	aftermyreviewformyreviewsectionalstatistics
}