// 导师工作室
import xhr from 'Axios'


// 导师工作室-详情
let studioDetail = (options = {}) => xhr.post(`/maker/studio/selectDetail`, options)




export {
    studioDetail
}