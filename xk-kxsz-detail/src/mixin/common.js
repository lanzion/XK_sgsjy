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
      //   return fileDownLoad + resourceId + `&filename=${name}`
      // }
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
    // 进入空间判定
    dynamicPath ({identity, orgId: id, userId: uid}) {
      const route = {
        '0': { path: this.pages.detail.student.path, query: { id, uid } },
        '1': { path: this.pages.detail.teacher.path, query: { id, uid } },
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
    },
    // 跳转个人详情页
    toPersonDetail(item, key = 'userId') {
      if (item[key] !== this.$ls.get('loginUId')) {
        const identityType = {
          0: {
              path: 'student',
              params: [
                  { param: 'id', key: 'orgId' },
                  { param: 'uid', key: key }
              ]
          },
          1: {
              path: 'teacher',
              params: [
                  { param: 'id', key: 'orgId' },
                  { param: 'uid', key: key }
              ]
          },
          6: {
              path: 'educ',
              params: [
                  { param: 'id', key: 'orgId' }
              ]
          },
          7: {
              path: 'edu',
              params: [
                  { param: 'id', key: 'orgId' }
              ]
          },
          10: {
              path: 'edu',
              params: [
                  { param: 'id', key: 'orgId' }
              ]
          },
          9: {
              path: 'school',
              params: [
                  { param: 'id', key: 'orgId' }
              ]
          }
        }
        const studentCode = '0'
        const query = {}
        const { path = '', params } = identityType[item.identity || studentCode] || {}
        for (let i = 0; i < params.length; i++) {
          this.$set(query, params[i].param, item[params[i].key])
        }
        this.redirect(this.pages.detail[path], { query: query })
      } else {
        this.redirect(this.pages.my)
      }
    }
  },
}
