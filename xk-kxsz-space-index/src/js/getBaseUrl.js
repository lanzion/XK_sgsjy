/*
 * 获取项目根路径
 */

function getBaseUrl () {
    let baseUrl = location.href.slice(0, location.href.slice(0, location.href.indexOf(location.hash)).lastIndexOf('/'))
    return baseUrl
}

export default getBaseUrl
