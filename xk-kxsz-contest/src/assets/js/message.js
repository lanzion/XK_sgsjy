/*
*提示消息
*type:提示类型（success,error,warning,info）
*message：提示消息的内容
*duration：关闭时间（默认1000）
*showClose:显示关闭（默认true）
 */

import { Message } from 'element-ui';

function message (type, message, duration = 1000, showClose = true, ishtml = false){
	Message({
		type: type,
		message: message,
		duration: duration,
		showClose: showClose,
		dangerouslyUseHTMLString: ishtml
	})
}

export default message
