import xhr from 'Axios'

// 私信-列表
let requestLetterList = (options = {},pageParam = {}) => xhr.post(`/maker/message/private/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

//私信-发送(批量)
let sendLetter = (options = {}) => xhr.post(`/maker/message/private/send`,options)

//私信-系统消息-列表
let requestSysMsg = (options = {},pageParam = {}) => xhr.post(`/maker/systemMessage/selectSystemMessageList?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

//好友-列表
let requestFriendsList = (options = {}) => xhr.post(`/maker/friend/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`,options)


//批量删除私信
let delMyletter = (options = {}) => xhr.post(`/maker/message/private/del`,options)

//本校教师列表
let requestTeacherList = (options = {}) => xhr.post(`/maker/baseTeacher/selectPager`,options)

// 私信-已读(批量)
let readInBatch = (options = {}) => xhr.post(`/maker/systemMessageRead/updateReads`,options)

// 私信-系统消息-删除(批量)
let delSysMsg = (options = {}) => xhr.post(`/maker/systemMessageRead/delByIds`,options)

//私信-列表-详细
let requestPrivateLetter = (options = {},pageParam = {}) => xhr.post(`/maker/message/private/list/detail?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

//私信-回话删除
let delChatRecord = (options = {}) => xhr.post(`/maker/message/private/batch/del`,options)

export {
	requestLetterList,
	sendLetter,
	requestSysMsg,
	requestFriendsList,
	delMyletter,
	requestTeacherList,
	readInBatch,
	delSysMsg,
	requestPrivateLetter,
	delChatRecord
}