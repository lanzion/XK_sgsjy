import xhr from 'Axios'
// 教育局 - 设置头像
let requestBaseEduHead = (options = {}) => xhr.post('maker/spaces/modifySpace', options)

export { requestBaseEduHead }