/*
 * 获取项目根路径
 */

export default function getBaseUrl() {
    const baseUrl = location.href.slice(0, location.href.slice(0, location.href.indexOf(location.hash)).lastIndexOf('/'))
    return baseUrl
}
