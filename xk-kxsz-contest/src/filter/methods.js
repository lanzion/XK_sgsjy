import fileUrl from './filters/fileUrl.js'
import translateDataDic from './filters/translateDataDic.js'
import dateFormat from './filters/dateFormat.js'
import message from 'Asset/js/message.js'
import linkToUrl from './filters/linkToUrl.js'

export default {
	install (Vue, options) {
		Vue.prototype.getFileUrl = fileUrl,
        Vue.prototype.translateFun = translateDataDic,
		Vue.prototype.dateFormatFun = dateFormat,
		Vue.prototype.showMessage = message
        Vue.prototype.redirect = linkToUrl
	}
}