import xhr from 'Axios'

// 空间 - 投资机构列表
let requestInvestOrgList = (options = {}) => xhr.post(`maker/spaces/listByInvestOrg?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

export {
  requestInvestOrgList
}
