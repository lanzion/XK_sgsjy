import fileUrl from './filters/fileUrl.js'
import translateDataDic from './filters/translateDataDic.js'
import dateFormat from './filters/dateFormat.js'
import message from './filters/message.js'

export default {
	install (Vue, options) {
		Vue.prototype.getFileUrl = fileUrl,
        Vue.prototype.translateFun = translateDataDic,
		Vue.prototype.dateFormatFun = dateFormat
        Vue.prototype.showMessage = message
	}
}