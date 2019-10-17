import xhr from 'Axios'

//获取邮箱验证码
const requestEamilValidCode = (options = {}) => xhr.post(`/maker/baseApply/getEmailCode`, options)

// 学校/教育局-申请注册-新增
const addOrg = (options = {}) => xhr.post(`/maker/baseApply/add`, options)

// 学校/教育局-申请注册-进度查询
const requestOrgApplyRate = (options = {}, pageParams = {}) => xhr.post(`/maker/baseApply/selectPager?pageSize=${pageParams.pageSize}&pageNum=${pageParams.pageNum}`, options)



export {
	requestEamilValidCode,
	addOrg,
	requestOrgApplyRate
}