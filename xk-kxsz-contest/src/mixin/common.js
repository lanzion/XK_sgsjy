import { fileBaseUrl, fileDownLoad } from 'Asset/js/common-config.js'

export default {
    methods: {
        getFileUrl(url, { filetype = 'image' } = {}) {
            if (filetype === 'image') {
                const reg = /\.jp(e)?g|gif|png$/i // 过滤文件类型
                return !url || !reg.test(url) ? null : (fileBaseUrl + url)
            }
            return url ? (fileBaseUrl + url) : null
        },
    // 下载文件
        downloadUrl(resourceId, fileName) {
            // const hasDownloadProp = 'download' in document.createElement('a')
            // const ua = navigator.userAgent
            // const isFireFox = /firefox\/(\d+\.\d+)/i.test(ua)
            // const flag = isFireFox ? false : hasDownloadProp
            // let suffix = ''
            // if (resourceId) {
            //     const _len = resourceId.split('.').length - 1
            //     suffix = _len ? resourceId.split('.')[_len] : ''
            // }
            // const name = fileName && fileName.includes(`.${suffix}`) ? fileName : `${fileName}.${suffix}`
            // if (flag) {
            //     // return fileBaseUrl + resourceId + `?filename=${name}`
            //     return fileBaseUrl + resourceId
            // }
            // // return fileDownLoad + resourceId + `?filename=${name}`
            // return fileDownLoad + resourceId
            // eslint-disable-next-line no-irregular-whitespace
            const link = document.createElement('a')
            // eslint-disable-next-line no-irregular-whitespace
                        link.style.display = 'none'
// eslint-disable-next-line no-irregular-whitespace
                        link.href = fileBaseUrl + resourceId
            // eslint-disable-next-line no-irregular-whitespace
                        link.setAttribute('download', fileName)
            // eslint-disable-next-line no-irregular-whitespace
                        document.body.appendChild(link)
            // eslint-disable-next-line no-irregular-whitespace
                        link.click()
        },
        getWidth(col) {
            if (col == null) {
                return '100%'
            }
            const width = 100 / col + '%'
            return width
        }
    }
}
