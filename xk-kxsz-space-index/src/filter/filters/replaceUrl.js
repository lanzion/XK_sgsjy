/*
 * 补足文件路径
 */

// 文件服务器地址
import { pages } from '@/js/common-config.js'

function replaceUrl (str, model = 'index') {
    const reg = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*(\#\/)/g
    //  /((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/
    return str.replace(reg, `${pages[model]}`)
}

export default replaceUrl