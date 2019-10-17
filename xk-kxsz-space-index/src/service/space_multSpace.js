import xhr from 'Axios'

// 空间 - 众创空间列表
let requestMultSpaceList = (options = {}) => xhr.post(`maker/spaces/listByMultSpace?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)

// 众创空间 - 邀请入驻
let requestAddInvite = (options = {}) => xhr.post(`/maker/baseMult/invite/add`, options)

// 众创空间 - 申请入驻
let requestAddApply = (options = {}) => xhr.post(`/maker/baseMult/apply/add`, options)

export {
  requestMultSpaceList,
  requestAddInvite,
  requestAddApply
}
