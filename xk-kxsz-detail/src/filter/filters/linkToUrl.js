import { pages } from '@/js/common-config.js'
import { loginInfo } from '@/js/getUserInfo.js'

/*
 * type: 1 (列表 -> 详情)
 *       2 (详情 -> 列表)
 *       3 (更多/相关 -> 详情)
 *       4 (公共[头部/尾部] -> )
 *       5 (-> 个人空间)
 *       6 (顶部面包屑 -> )
 */
function linkToUrl(link, { path = '', query = {}, type = 1 } = {}) {
    let _link = link ? (link.url || link) : '#/'
    // 处理用户进入自己空间
    if (_link === pages.detail.teacher.url || _link === pages.detail.student.url) {
        const uid = loginInfo && loginInfo.userInfo && loginInfo.userInfo.id
        if (uid === query.uid) {
            _link = pages.my.url
            query = {}
        }
    }
    let params = Object.entries(query)
    let target = '_self'
    let url = /(ht|f)tp(s?)|(.htm)/.test(_link) ? `${_link}${path}` : `${location.protocol}//${location.host}${_link}${path}`
    url = url.split(':/').map(x => x.replace(/\/\/+/g, '/')).join(':/')
    url += params.length ? `?${params.map(x => x.join('=')).join('&')}` : ''
    type = type ? Number(type) : Number(link.type)

    switch (type) {
        case 1:
        case 2:
        case 3:
        case 5:
            target = '_blank'
            break;
        case 4:
        case 6:
            target = '_self'
            break;
        default:
            target = "_self"
    }

    let a = $(`<a href="${url}" target="${target}"></a>`)
    clickObj(a.get(0))
    // window.location.href = url
}
　　
function clickObj(obj) {
    if (document.all) {
        obj.click()
    } else {
        let evt = document.createEvent('MouseEvents')
        evt.initEvent('click', true, true)
        obj.dispatchEvent(evt)
    }
}

export default linkToUrl
