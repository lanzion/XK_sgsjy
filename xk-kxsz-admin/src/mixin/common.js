import store from '@/store/index.js'
import { fileBaseUrl, fileDownLoad } from 'Asset/js/common-config.js'

export default {
  methods: {
    async dataTranslation (data, model, {sep = ',', con = '、', key = 'code'} = {}) {
      if (data === null || data === undefined || data === '') return '无'
      let arr = []
      if (data && data.length) {
        data = data.split(sep)
        let result = await store.dispatch('dictionaryCommon/getDictComb', model)
        result = result.dicList || []
        result.forEach(function (i){
          if (data.includes(i[key])) arr.push(i.name)
        })
      }
      return arr.join(con)
    },
    getFileUrl(url, { filetype = 'image' } = {}) {
      if (filetype === 'image') {
        const reg = /\.jp(e)?g|gif|png$/i // 过滤文件类型
        return !url || !reg.test(url) ? null : (fileBaseUrl + url)
      }

      return url ? (fileBaseUrl + url) : null
    },
    // 下载文件
    downloadUrl:function (resourceId, fileName){
      // const hasDownloadProp = 'download' in document.createElement('a');
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
      //   return fileBaseUrl + resourceId + `?filename=${name}`
      // }else{
      //   return fileDownLoad + resourceId + `?filename=${name}`
      // }
      const link = document.createElement("a");
            link.style.display = "none";
            link.href = fileBaseUrl+resourceId;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
    }
  },
}