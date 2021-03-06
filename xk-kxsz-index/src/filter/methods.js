import fileUrl from './filters/fileUrl.js'
import translateDataDic from './filters/translateDataDic.js'
import dateFormat from './filters/dateFormat.js'
import linkToUrl from './filters/linkToUrl.js'
import filterKeyWords from './filters/filterKeyWords.js'
import computeWidth from './filters/computeWidth.js'

export default {
	install (Vue, options) {
		Vue.prototype.getFileUrl = fileUrl,
        Vue.prototype.translateFun = translateDataDic,
		Vue.prototype.dateFormatFun = dateFormat,
        Vue.prototype.redirect = linkToUrl,
        Vue.prototype.filterKeyWords = filterKeyWords,
        Vue.prototype.getWidth = computeWidth
	}
}