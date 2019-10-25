import { fileBaseUrl, fileDownLoad } from 'Asset/js/common-config.js'

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    getFileUrl(url, { filetype = 'image' } = {}) {
      if (filetype === 'image') {
        const reg = /\.jp(e)?g|gif|png$/i // 过滤文件类型
        return !url || !reg.test(url) ? null : (fileBaseUrl + url)
      }

      return url ? (fileBaseUrl + url) : null
    },
    // 下载文件
    downloadUrl(resourceId, fileName, fileExt) {
      // const hasDownloadProp = 'download' in document.createElement('a')
      // const ua = navigator.userAgent
      // const isFireFox = /firefox\/(\d+\.\d+)/i.test(ua)
      // const flag = isFireFox ? false : hasDownloadProp
      // let suffix = ''
      // if (resourceId) {
      //   const _len = resourceId.split('.').length - 1
      //   suffix = _len ? resourceId.split('.')[_len] : ''
      // }
      // const name = fileName && fileName.includes(`.${suffix}`) ? fileName : `${fileName}.${suffix}`
      // if (flag) {
      //   return fileBaseUrl + resourceId + `?filename=${fileName}`
      // } else {
      //   return fileDownLoad + resourceId + `?filename=${fileName}`
      // }
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = fileBaseUrl + resourceId
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
    }
  },
}
