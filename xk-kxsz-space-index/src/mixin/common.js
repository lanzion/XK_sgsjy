import store from '@/store/index.js'
import { fileBaseUrl,fileDownLoad } from '@/js/common-config.js'
export const commonMixin = {
  data () {
    return {
    }
  },
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
    // 下载文件
    downloadUrl (resourceId, fileName, fileExt){
      const hasDownloadProp = 'download' in document.createElement('a');
      const ua = navigator.userAgent
      const isFireFox = /firefox\/(\d+\.\d+)/i.test(ua)
      const flag = isFireFox ? false : hasDownloadProp
      // return fileBaseUrl + resourceId + `?filename=${fileName}`
      const name = fileName.includes(`.${fileExt}`) ? fileName : `${fileName}.${fileExt}`
      if (flag) {
        return fileBaseUrl + resourceId + `?filename=${fileName}`
      }else{
        return fileDownLoad + resourceId + `&filename=${fileName}`
      }
    },
    // 进入空间判定
    dynamicPath ({identity, orgId: id, userId: uid}) {
      const route = {
        '0': { path: '/space/student/dynamic', query: { id, uid } },
        '1': { path: '/space/teacher/dynamic', query: { id, uid } },
        '2': { path: '/investor/detail', query: { id } },
        '3': { path: '/investOrg/detail', query: { id } },
        '4': { path: '/enterprise/detail', query: { id } },
        '6': { path: '/educationBureauSpace/homepage', query: { id } },
        '7': { path: '/educationBureauSpace/homepage', query: { id } },
        '11': { path: '/multSpace/detail', query: { id } },
      }
      if(route[identity] != undefined) {
        return route[identity]
      }else{
        return { path: '' }
      }
    }
  },
}
