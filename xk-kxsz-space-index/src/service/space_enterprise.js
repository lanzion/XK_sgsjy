import xhr from 'Axios'

// 空间 - 企业列表
let requestEnterpriseList = (options = {}) => xhr.post(`maker/spaces/listByEnterprise?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 空间 - 企业详情
let enterpriseDetail = (options = {}) => xhr.post(`maker/baseEnterprise/selectDetail`, options)

// 空间 - 投资人详情
let investorDetail = (options = {}) => xhr.post(`maker/baseInvestor/selectDetail`, options)

// 空间 - 投资机构详情
let investOrgDetail = (options = {}) => xhr.post(`maker/baseInvestOrg/selectDetail`, options)

// 空间 - 众创空间详情
let multDetail = (options = {}) => xhr.post(`maker/baseMult/detail`, options)

// 资讯 - 列表
let requestInformationList = (options = {}) => xhr.post(`maker/information/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

//资讯-详情
let requestInformationDetail = (options = {}) => xhr.post(`/maker/information/selectDetail`,options)

export {
  requestEnterpriseList,
  enterpriseDetail,
  investorDetail,
  investOrgDetail,
  multDetail,
  requestInformationList,
  requestInformationDetail
}
