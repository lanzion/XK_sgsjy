import xhr from 'Axios'

// 空间动态 - 获取动态列表
let requestDynamicList = (options = {}) => xhr.post(`maker/dynamic/space/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 空间动态 - 获取评论列表
let requestCommentsList = (options = {}) => xhr.post(`maker/dynamic/space/comment/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 空间动态 - 获取评论的回复列表
let requestReplyList = (options = {}) => xhr.post(`maker/dynamic/space/comment/reply/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 空间动态 - 获取点赞列表
let requestPraiseList = (options = {}) => xhr.post(`maker/dynamic/space/praise/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 空间动态 - 添加评论/回复
let addComment = (options = {}) => xhr.post('/maker/dynamic/space/to/comment', options)
// 空间动态 - 举报动态
let addReport = (options = {}) => xhr.post('/maker/dynamic/space/report', options)
// 空间动态 - 浏览动态
let browseDynamic = (options = {}) => xhr.post('/maker/dynamic/space/browse', options)

export {
	requestDynamicList,
	requestCommentsList,
	requestReplyList,
	requestPraiseList,
	addComment,
	addReport,
    browseDynamic
}
