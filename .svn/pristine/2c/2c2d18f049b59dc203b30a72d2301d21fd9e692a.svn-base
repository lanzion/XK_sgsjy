import xhr from 'Axios'

//空间 - 兴趣组列表
let requestInterestList = (options = {}) => xhr.post(`maker/spaces/listByInterest?pageNum=${options.pageNum}&pageSize=${options.pageSize}`,options)

//首页详情
let interestsDetails = (options = {}) => xhr.post(`maker/interests/article/detail`, options)
export {
	requestInterestList,
    interestsDetails
}