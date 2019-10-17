import xhr from 'Axios'

// 空间 - 投资人列表
let requestInvestorList = (options = {}) => xhr.post(`maker/spaces/listByInvestor?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

export {
  requestInvestorList
}
