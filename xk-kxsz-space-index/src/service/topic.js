import xhr from 'Axios'

//话题吧-话题列表
let requestTopicList = (options = {},pageParam = {}) => xhr.post(`/maker/topic/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

// 话题吧-添加话题
let addTopic = (options = {}) => xhr.post(`/maker/topic/add`,options)

//话题吧-话题详情
let requestTopicDetail = (options = {}) => xhr.post(`/maker/topic/detail`,options)

// 话题-评论-列表(分页)
let requestTopicCommentList = (options = {},pageParam = {}) => xhr.post(`/maker/topic/comment/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

// 话题-评论-列表回复(分页)
let requestCommentReplyList = (options = {},pageParam = {}) => xhr.post(`/maker/topic/comment/reply/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

//话题-评论-评论/回复
let addTopicComment = (options = {}) => xhr.post(`/maker/topic/comment/add`,options)

// 话题-设置/取消-热门话题
let topicIsHot = (options = {}) => xhr.post(`/maker/topic/hot`,options)


export {
	requestTopicList,
	addTopic,
	requestTopicDetail,
	requestTopicCommentList,
	requestCommentReplyList,
	addTopicComment,
	topicIsHot
}