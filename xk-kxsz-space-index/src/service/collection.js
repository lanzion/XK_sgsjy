import xhr from 'Axios'

//收藏-列表
let requestCollectionList = (options = {},pageParam = {}) => xhr.post(`/maker/common/collection/list?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`,options)

//收藏-取消
let cancelCollection = (options = {}) => xhr.post(`/maker/common/collection/cancel`,options)


export {
	requestCollectionList,
	cancelCollection
}