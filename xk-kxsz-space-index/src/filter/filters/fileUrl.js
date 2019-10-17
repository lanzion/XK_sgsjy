/*
 * 补足文件路径
 */

// 文件服务器地址
import { fileBaseUrl } from '@/js/common-config.js'

function fileUrl (url, {filetype = 'image'} = {}) {
    switch (filetype) {
        case 'image':
        	let reg = /\.jp(e)?g|gif|png$/i; // 过滤文件类型
        	return !url || !reg.test(url) ? null : (fileBaseUrl + url);
        default:
            return url ? (fileBaseUrl + url) : null;
    }
}

export default fileUrl