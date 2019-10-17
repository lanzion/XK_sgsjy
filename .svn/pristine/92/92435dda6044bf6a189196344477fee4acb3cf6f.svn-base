import xhr from 'Axios'

// 兴趣组-兴趣组-添加
let addInterestGroup = (options = {}) => xhr.post(`/maker/space/interests/add`,options)

//兴趣组-兴趣组-修改
let modifyInterestGroup = (options = {}) => xhr.post(`/maker/space/interests/modify`,options)

// 兴趣组-列表
let requestInterestList = (options = {},pageParams = {}) => xhr.post(`/maker/space/interests/list?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`,options)
// 兴趣组-个人后台列表
let requestMyInterestList = (options = {},pageParams = {}) => xhr.post(`/maker/space/interests/listPager?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`,options)

//兴趣组-兴趣组-详情
let requestInterestDetail = (options = {}) => xhr.post(`/maker/space/interests/detail`,options)
// 兴趣组-文章-列表
let requestArticleList = (options = {}, pageParam = {}) => xhr.post(`/maker/interests/article/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

// 兴趣组-文章-分类-添加
let articleClassifyAdd = (options = {}) => xhr.post(`/maker/interests/article/type/add`,options)
// 兴趣组-文章-分类-列表
let articleClassifyList = (options = {}) => xhr.post(`/maker/interests/article/type/list`,options)
// 兴趣组-文章-分类-修改
let articleClassifyModify = (options = {}) => xhr.post(`/maker/interests/article/type/modify`,options)
// 兴趣组-文章-判断是不是成员
let articleIsMember = (options = {}) => xhr.post(`/maker/interests/member/isMember`,options)
// 兴趣组-文章-发表
let articlePublish = (options = {}) => xhr.post(`/maker/interests/article/add`,options)
// 兴趣组-文章-详情
let articleDetail = (options = {}) => xhr.post(`/maker/interests/article/detail`,options)
// 兴趣组-文章-评论
let articleCommentsAdd = (options = {}) => xhr.post(`/maker/interests/article/comment/add`,options)
// 兴趣组-文章-评论列表
let articleCommentsList = (options = {}, pageParam = {}) => xhr.post(`/maker/interests/article/comment/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

//请求兴趣组成员
let requestInterestMember = (options = {}) => xhr.post(`/maker/interests/member/list/all`,options)

//兴趣组-成员管理-是否管理员
let judgeAdmin = (options = {}) => xhr.post(`/maker/interests/member/isAdmin`,options)

//兴趣组-成员管理-是否是当前兴趣组成员
let judgeMember = (options = {}) => xhr.post(`/maker/interests/member/isMember`,options)

// 兴趣组-管理-成员管理-待审列表
let requestPendingMembers = (options = {},pageParam = {}) => xhr.post(`/maker/interests/member/apply/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

//兴趣组-成员管理-成员列表
let requestMembers = (options = {},pageParam = {}) => xhr.post(`/maker/interests/member/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

// 兴趣组-管理-成员管理-总数
let requestMemberCount = (options = {}) => xhr.post(`/maker/interests/member/count`,options)

// 兴趣组-成员管理-加入申请
let interestMemberApply = (options = {}) => xhr.post(`/maker/interests/member/apply/add`,options)

// 兴趣组-成员管理-申请通过/不通过
let auditMember = (options = {}) => xhr.post(`/maker/interests/member/apply/audit`,options)

//兴趣组-成员管理-邀请
let inviteMember = (options = {}) => xhr.post(`/maker/systemMessage/addInvite`,options)

// 兴趣组-成员管理-设为管理员
let setAdmin = (options = {}) => xhr.post(`/maker/interests/member/setadmin`,options)

//兴趣组-成员管理-取消管理员
let cancelAdmin = (options = {}) => xhr.post(`/maker/interests/member/admin/cancel`,options)

//把成员踢出兴趣组
let removeMember = (options = {}) => xhr.post(`/maker/interests/member/kick`,options)

//兴趣组-解散
let dissoluteInterest = (options = {}) => xhr.post(`/maker/space/interests/dissolution`,options)

// 兴趣组-退出
let interestQuit = (options = {}) => xhr.post(`/maker/interests/member/quit`,options)

//兴趣组-首页-访客-新增访客
let addVisitor = (options = {}) => xhr.post(`/maker/interests/visitor/add`,options)

//兴趣组-提交
let submitInterest = (options = {}) => xhr.post(`/maker/space/interests/submitAudit`,options)


export {
	addInterestGroup,
	modifyInterestGroup,
	requestInterestList,
    requestMyInterestList,
	requestInterestDetail,
    requestArticleList,
    articleClassifyAdd,
    articleClassifyList,
    articleClassifyModify,
    articleIsMember,
    articlePublish,
    articleDetail,
    requestInterestMember,
    judgeAdmin,
    judgeMember,
    requestPendingMembers,
    requestMembers,
    requestMemberCount,
    interestMemberApply,
    inviteMember,
    auditMember,
    setAdmin,
    cancelAdmin,
    removeMember,
    dissoluteInterest,
    interestQuit,
    articleCommentsAdd,
    articleCommentsList,
    addVisitor,
    submitInterest
}