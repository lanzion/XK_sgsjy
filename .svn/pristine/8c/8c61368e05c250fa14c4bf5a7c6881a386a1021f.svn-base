/*
 *
 * ## USAGE:
 * 1) async await
 * const async function () {
 const data = await fetch(opts)
 }
 * 2) promise
 *  fetch(opts).then(data => { ... })
 *
 * ## Recipes 表单分块
 * var formData = new FormData()
 * formData.append('foo', 'bar')
 * formData.append('pic', fileInput, 'mypic.jpg')
 * fetch({type: 'post', formData, url: 'xxx' })
 *
 * more info: https://github.com/pagekit/vue-resource/blob/master/docs/http.md
 */
import Vue from 'vue'
import { Loading } from 'element-ui'

const fetch = async function ({ vm, type = 'GET', url, data = {}, options = {}, target, loading = false, fullscreen = true, loadingText = 'Loading...' }, ...args) {
    // fetch 获取结果
    let result = null
    // loading
    let vmLoading = null
    // http
    let HTTP = null
    // 异步类型
    const TYPE = type.toUpperCase()

    // 检测vm有没有设置
    // eslint-disable-next-line no-param-reassign
    vm = vm || args[0] || Vue
    console.warn('TYPE')
    console.warn(vm)
    if (!vm) {
        console.warn('fetch option vm: not defined')
        return
    }

    if (!url) {
        console.warn('fetch option url: not defined')
        return
    }

  // 判断不同环境
    HTTP = vm === Vue ? Vue.http : vm.$http

    /* 默认配置 */
    // eslint-disable-next-line no-param-reassign
    options = Object.assign({}, {
        before: function () {
        // 显示加载loading
        // Loading = vm.$loading && target ? vm.$loading({ target, fullscreen: false, text: loadingText }) : false
            // eslint-disable-next-line no-param-reassign
            target = target || document.body
            const loadingOptions = { target, fullscreen, text: loadingText }
            vmLoading = loading ? Loading.service(loadingOptions) : false
        }
    }, options)

    // http错误
    const reject = (res) => {
        return {
            code: res.status,
            msg: res.statusText,
            data: res.body
        }
    }

    /* 成功返回结构 */
    const resolve = (res) => {
        // 隐藏 loading
        // eslint-disable-next-line no-unused-expressions
        vmLoading && vmLoading.close()
        if (typeof res.body === 'object') {
            return res.json()
        }
        return res.body
    }
    // eslint-disable-next-line no-shadow
    const resultcallback = (vm, result) => {
        // eslint-disable-next-line no-shadow
        return new Promise((resolve) => {
            resolve(result)
        })
    }
    // 判断get还是 post
    switch (TYPE) {
        case 'POST':
            result = await HTTP.post(url, data, options).then(resolve, reject)
            break
        case 'HEAD':
            result = await HTTP.head(url, options).then(resolve, reject)
            break
        case 'DELETE':
            result = await HTTP.delete(url, options).then(resolve, reject)
            break
        case 'JSONP':
            result = await HTTP.jsonp(url, options).then(resolve, reject)
            break
        case 'PUT':
            result = await HTTP.jsonp(url, data, options).then(resolve, reject)
            break
        case 'patch':
            result = await HTTP.patch(url, data, options).then(resolve, reject)
            break
        case 'UPLOAD':
            result = await HTTP.post(url, data).then(resolve, reject)
            break
        // eslint-disable-next-line no-case-declarations
        default:
        // get 拼接data部分参数
            const handleData = Object.keys(data).map(item => `${item}=${data[item]}`)
            const fetchUrl = handleData.length ? [url, url.indexOf('?') > -1 ? '&' : '?', handleData.join('&')].join('') : url
        // result = await vm.$http.get(fetchUrl, options).then(res => res.json(), reject)
            result = await HTTP.get(fetchUrl, options).then(resolve, reject)
            break
    }
    // 返回处理数据
    return resultcallback(vm, result)
}

export default fetch
