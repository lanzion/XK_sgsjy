import axios from 'axios'
import qs from 'Qs'
import configs from './common-config.js'
import compareObj from './isObjectEqual.js'
import store from '@/store/index.js'
import { loginInfo, removeUserInfo } from '@/js/getUserInfo.js'
import checkLoginTimeout from '@/js/checkLoginTimeout.js'

let httpConfig = configs.httpConfig

axios.defaults.baseURL = httpConfig.baseURL + httpConfig.path
axios.defaults.method = 'post'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

if (loginInfo) {
    axios.defaults.headers['token-kxsz'] = loginInfo.token
}

axios.defaults.paramsSerializer = function(params){
	return qs.stringify(params)
};

var   historyConfig = []
const RECORD_NUMBER = 1			// 记录历史请求数
const TIME_INTERVAL = 1000			// 1s

// 请求拦截
axios.interceptors.request.use( config => {
	let currentTime = (new Date()).getTime()
	// 登录过期策略
	checkLoginTimeout()
	// 处理请求之前的配置
	// 判请求参数是否与上一次相同
	for (let i = 0; i < historyConfig.length; i++) {
		if (historyConfig[i] !== undefined) {
			if (location.href === historyConfig[i].href && config.url === historyConfig[i].url && compareObj(config.data, historyConfig[i].data)) {
			// if (location.href === historyConfig[i].href && config.url === historyConfig[i].url && compareObj(config.data, historyConfig[i].data) && (currentTime - historyConfig[i].time < TIME_INTERVAL)) {
				let error = '本次请求与上一次相同，请勿连续发起请求' + config.url
				return Promise.reject(error)
			}
		}
	}
	setTimeout(() => {
		// 更新最近活动时间
		localStorage.setItem('lastActiveTime', currentTime)

		// 记录本次请求参数、时间及请求页面
		const _lastConfig  = Object.assign({}, config)
		_lastConfig.time = currentTime
		_lastConfig.href = location.href
		_lastConfig.data = _lastConfig.data ? JSON.parse(_lastConfig.data) : _lastConfig.data
		historyConfig.unshift(_lastConfig)
		historyConfig.splice(RECORD_NUMBER, historyConfig.length)
	}, 0)

	return config
}, error => {
	// 请求失败的处理
	return Promise.reject(error)
});

// 响应拦截
axios.interceptors.response.use( response => {
	if (response.data.code === 999) {
		removeUserInfo()
		store.commit("toggleLoginModal", true)
		return Promise.reject(response.data.msg)
	}
	return response
}, error => {
	console.log({error})
	historyConfig.splice(RECORD_NUMBER, 1)
	if (error.response.data.code === 999) {
		removeUserInfo()
		store.commit("toggleLoginModal", true)
		return Promise.reject(error.response.data.msg)
	}
	if (error.response.status === undefined) {
		return Promise.reject(error)
	}
	switch(error.response.status) {
		case 504:
			// axios({
			// 	method: error.config.method,
			// 	url: error.config.url,
			// 	data: error.config.data
			// });
			break
		case 403:
			removeUserInfo()
			store.commit("toggleLoginModal", true)
			return Promise.reject(error.response.data.msg)
		default:
			return Promise.reject(error)   // 返回接口返回的错误信息
	}
});


export default axios
