import {
    requestPublishKey,
    loginIn,
    loginOut,
    requestUserBaseInfo,
    requestPermission,
    requestAdminPermission,
    // requestModelSchoolDetail
} from '@/service/common'
import {
    loginInfo,
    userIdentity
} from '@/assets/js/getUserInfo'
import encrypt from 'jsencrypt'
import Axios from 'Axios'
import { Cookies } from 'xk-kxsz-common'
import redirect from '@/assets/js/redirectCallback'
console.log(loginInfo)

const JSEncrypt = encrypt.JSEncrypt.prototype
// 用户身份
const IDENTITY = {
    0: 'student',         // 学生
    1: 'teacher',         // 教师
    2: 'investor',        // 投资人
    3: 'investOrg',        // 投资机构
    4: 'enterprise',    // 企业
    5: 'admin',             // 云后台管理员
    6: 'education',     // 市教育局管理员
    7: 'education',     // 县教育局管理员
    9: 'school',            // 学校管理员
    10: 'education',    // 省厅管理员
    11: 'mult',                // 众创空间
}

// state
const state = {
    loginInfo,
    userIdentity,
    isShow: false,
    isLogin: !(loginInfo === null || loginInfo === undefined)
}

// getter
const getters = {}

// actions
const actions = {
    async getPublishKey() {
        return requestPublishKey().then(response => response.data.entity)
    },
    /*
     * 登录
     */
    async login({ dispatch, commit, state }, option) {
        let handler = option.handler || loginIn
        let params = Object.assign({}, option)
        delete params.handler
        if (handler === loginIn) {
            // 密码加密处理
            const _publicKey = await dispatch('getPublishKey')
            JSEncrypt.setPublicKey(_publicKey)
            params = {
                account: option.name,
                pwd: JSEncrypt.encrypt(option.password),
            }
        }

        return handler(params).then((response) => {
            const _code = response.data.code
            if (_code > 200 && _code <= 205) { // 登录失败返回失败信息
                return {
                    code: _code,
                    msg: response.data.msg
                }
                // return [false, response.data.msg]
            } else if (_code === 200) { // 登录成功
                const _data = response.data.appendInfo
                let identityCode = _data.userInfo.identity

                for (const key in IDENTITY) {
                    if (identityCode === key || identityCode.startsWith(`${key}_`)) {
                        identityCode = key
                        break
                    }
                }

                // 存储登录信息
                Cookies.set({ token: _data.token }, { 'max-age': _data.timeOut, domain: configs.httpConfig.domain })
                Cookies.set({ uid: _data.userInfo.id }, { 'max-age': _data.timeOut, domain: configs.httpConfig.domain })

                localStorage.setItem('loginInfo', JSON.stringify(_data))
                localStorage.setItem('userIdentity', IDENTITY[identityCode])
                localStorage.setItem('loginUId', _data.userInfo.id)

                // 关闭登录框
                commit('saveLoginInfo', 'isLogin', true)
                commit('saveLoginInfo', 'loginInfo', _data)
                commit('saveLoginInfo', 'userIdentity', IDENTITY[identityCode])

                // 登录成功设置默认请求头添加token
                Axios.defaults.headers.token = _data.token
                return {
                    code: _code,
                    identity: IDENTITY[identityCode]
                }
                // return [_code, IDENTITY[identityCode]]
            } else if (_code === 209) {
                Cookies.set({ token: _data.token }, { 'max-age': _data.timeOut, domain: configs.httpConfig.domain })
                Cookies.set({ uid: _data.userInfo.id }, { 'max-age': _data.timeOut, domain: configs.httpConfig.domain })

                Axios.defaults.headers.token = response.data.appendInfo.token
                return {
                    code: _code,
                    userInfo: response.data.appendInfo,
                    msg: response.data.msg
                }
            }
        })
    },
    /*
     * 登出
     */
    logout({ commit }) {
        commit('removeUserInfo')

        return loginOut().then((response) => {
            if (response.data.code === 200) {
                commit('saveLoginInfo', 'isLogin', false)
                commit('saveLoginInfo', 'loginInfo', null)
                commit('saveLoginInfo', 'userIdentity', null)
            }
        }, () => {
            commit('saveLoginInfo', 'isLogin', false)
            commit('saveLoginInfo', 'loginInfo', null)
            commit('saveLoginInfo', 'userIdentity', null)
            return Promise.resolve()
        })
    },
    /*
     * 获取个人基础信息
     */
    async getUserBaseInfo() {
        return requestUserBaseInfo().then((response) => {
            if (response.data.code === 200) {
                localStorage.setItem('baseInfo', JSON.stringify(response.data.appendInfo))
                return true
            }
        })
    },
    /*
     * 获取权限
     */
    async getPermission({ commit }) {
        return requestPermission().then((response) => {
            if (response.data.code === 200) {
                commit('toggleLoginModal', false)
                localStorage.setItem('permission', JSON.stringify(response.data.appendInfo.userRight))
                return true
            }
        })
    },
    /*
     * 获取后台管理权限
     */
    async getAdminPermission({ commit }) {
        let isModel = false
        if (localStorage.getItem('userIdentity') === 'school') {
            const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
            // const res = await requestModelSchoolDetail({ schoolId: loginInfo.userInfo.baseId })
            // isModel = res.data.entity !== null
        }
        return requestAdminPermission().then((response) => {
            if (response.data.code === 200) {
                commit('toggleLoginModal', false)
                const _data = ((response.data.appendInfo || {}).userRight || [])[0]
                if (!isModel) {
                    _data.children = _data.children.filter(x => x.menuId !== 'ms')
                }
                localStorage.setItem('bs-permission', JSON.stringify(_data))
                return true
            }
        })
    },
}

// mutations
const mutations = {
    toggleLoginModal(state, flag) {
        if (flag !== undefined) {
            state.isShow = flag
        } else {
            state.isShow = !state.isShow
        }
        if (state.isShow) {
            redirect(pages.login.url)
        }
    },
    saveLoginInfo(state, param, data) {
        state[param] = data
    },
    removeUserInfo(state) {
        state.loginInfo = null
        state.userIdentity = null
        state.isShow = false
        state.isLogin = false
        localStorage.removeItem('loginInfo')
        localStorage.removeItem('baseInfo')
        localStorage.removeItem('userIdentity')
        localStorage.removeItem('permission')
        localStorage.removeItem('bs-permission')
        localStorage.removeItem('loginUId')
        Cookies.remove('token')
        Cookies.remove('uid')
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}
