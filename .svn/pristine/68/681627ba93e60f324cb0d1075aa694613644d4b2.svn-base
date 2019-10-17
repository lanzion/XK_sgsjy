import fileUrl from './filters/fileUrl.js'
//import replaceUrl from './filters/replaceUrl.js'
import computeWidth from './filters/computeWidth.js'
import translateDataDic from './filters/translateDataDic.js'
import dateFormat from './filters/dateFormat.js'
import message from '../js/message.js'
import linkToUrl from './filters/linkToUrl.js'

export default {
    install (Vue, options) {
        Vue.prototype.getFileUrl = fileUrl,
//      Vue.prototype.replaceUrl = replaceUrl,
        Vue.prototype.getWidth = computeWidth,
        Vue.prototype.translateFun = translateDataDic,
        Vue.prototype.dateFormatFun = dateFormat,
        Vue.prototype.showMessage = message
        Vue.prototype.redirect = linkToUrl
    }
}