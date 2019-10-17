import xhr from 'Axios'

// 发布故事
let publishStory = (options = {}) => xhr.post(`/maker/story/add`,options)

//故事-修改
let modifyStory = (options = {}) => xhr.post(`/maker/story/modify`,options)

// 故事-个人后台列表
let requestStoryBackendList = (options = {}, pageParam = {}) => xhr.post(`/maker/story/selectPager?pageSize=${pageParam.pageSize}&pageNum=${pageParam.pageNum}`,options)

// 故事-个人前台列表
const requestFrontendStoryList = (options = {}) => xhr.post(`/maker/story/selectReceptionPager?pageSize=${options.pageSize}&pageNum=${options.pageNum}`, options)

// 故事-详情
let requestStoryDetail = (options = {}) => xhr.post(`/maker/story/selectDetail`,options)

//故事-提交审核
let storySubmitAudit = (options = {}) => xhr.post(`/maker/story/submitAudit`,options)

// 故事-删除
let delStory = (options = {}) => xhr.post(`maker/story/delByIds`,options)

//故事评论-列表
let requestStoryCommentList = (options = {},pageParam = {}) => xhr.post(`/maker/storyComment/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

//故事评论-新增
let addStoryComment = (options = {}) => xhr.post(`/maker/storyComment/add`,options)



export {
	publishStory,
	modifyStory,
	requestStoryBackendList,
  	requestFrontendStoryList,
	requestStoryDetail,
	storySubmitAudit,
	delStory,
	requestStoryCommentList,
	addStoryComment
}
