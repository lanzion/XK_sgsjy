import xhr from 'Axios'

//空间 - 学校列表
let requestSchoolList = (options = {}) => xhr.post(`maker/spaces/listBySchool?pageNum=${options.pageNum}&pageSize=${options.pageSize}`,options)

export {
	requestSchoolList
}