import xhr from 'Axios'

//常见问题-列表
let requestFaqList = (options = {}, pageParam = {}) => xhr.post(`/maker/problem/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//反馈-列表
let requestFeedbackList = (options = {}, pageParam = {}) => xhr.post(`/maker/feedback/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

//反馈 - 新增
let addFeedback = (options = {}) => xhr.post(`/maker/feedback/add`,options)

// 文档配置-章节-列表
const requestDocChapterList = (options = {}) => xhr.post(`/maker/documentConfig/selectSectionPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 文档配置-配置目录-列表
const requestDocDirectoryList = (options = {}) => xhr.post('/maker/documentConfig/selectCatalogueList', options)

export {
	requestFaqList,
	requestFeedbackList,
	addFeedback,
	requestDocChapterList,
	requestDocDirectoryList,
}