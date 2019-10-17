import xhr from 'Axios'

// 招聘信息 - 列表
let requestRecruitList = (options = {}, pageParam = {}) => xhr.post(`/maker/webRecruit/list`, options)

export {
    requestRecruitList
}