import xhr from 'Axios'


//众创空间-列表【我入驻的众创空间】
let requestEnterSpaceList = (options = {},pageParams = {}) => xhr.post(`/maker/baseMult/list?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`,options)

//众创空间-入驻申请-列表【个人申请列表/众创空间申请】
let requestEnterApplyList = (options = {},pageParams = {}) => xhr.post(`/maker/baseMult/apply/list?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`,options)

//众创空间-入驻邀请-列表【众创空间入驻邀约列表/个人入驻邀约列表】
let requestEnterInviteList = (options = {},pageParams = {}) => xhr.post(`/maker/baseMult/invite/list?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`,options)

//众创空间-入驻邀请-同意/拒绝邀请
let modifyInvite = (options = {}) => xhr.post(`/maker/baseMult/invite/AgreeOrRefuse`,options)

// 众创空间-成员列表
let requestMemberList = (options = {},pageParams = {}) => xhr.post(`/maker/baseMult/member/list?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`,options)

//众创空间-入驻申请-同意/拒绝入驻
let modifyApply = (options = {}) => xhr.post(`/maker/baseMult/apply/AgreeOrRefuse`,options)

//众创空间-是否(已加入/已入驻)
let judgeMultMember = ( options = {} ) => xhr.post(`/maker/baseMult/isJoin`, options)


export {
	requestEnterSpaceList,
	requestEnterApplyList,
	requestEnterInviteList,
	modifyInvite,
	requestMemberList,
	modifyApply,
	judgeMultMember
}