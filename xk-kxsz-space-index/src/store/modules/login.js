import { requestPublishKey, loginIn, loginOut, requestUserBaseInfo, requestPermission, requestAdminPermission } from '@/service/common.js'
import { loginInfo, userIdentity, permission, removeUserInfo } from '@/js/getUserInfo.js'
import encrypt from 'jsencrypt'
import Axios from 'Axios'

let JSEncrypt = encrypt.JSEncrypt.prototype;
// 用户身份
const IDENTITY = {
    '0': 'student',     // 学生
    '1': 'teacher',     // 教师
    '2': 'investor',    // 投资人
    '3': 'investOrg',    // 投资机构
    '4': 'enterprise',  // 企业
    '5': 'admin',       // 云后台管理员
    '6': 'education',   // 市教育局管理员
    '7': 'education',   // 县教育局管理员
    '9': 'school',      // 学校管理员
    '10': 'education',  // 省厅管理员
    '11': 'mult'        // 众创空间
}

// state
const state = {
    isShow: false,
    isLogin: loginInfo !== null,
    loginInfo: loginInfo
}

// getter
const getters = {
}

// actions
const actions = {
    async getPublishKey({commit}) {
        return requestPublishKey().then( response => {
            return response.data.entity;
        });
    },
    /*
     * 登录
     */
    async login({dispatch, commit, state}, option) {
        // 密码加密处理
        let _publicKey = await dispatch('getPublishKey');
        JSEncrypt.setPublicKey(_publicKey)
        return loginIn({
            account : option.name,
            pwd: JSEncrypt.encrypt(option.password)
        }).then( response => {
            let _code = response.data.code;
            if (_code > 200 && _code <= 205) { // 登录失败返回失败信息
                return [false, response.data.msg]
            } else if (_code == 200) { // 登录成功
                let _data = response.data.appendInfo
                _data.token = _data['token-kxsz']
                _data.timeOut = _data['timeOut-kxsz']
                _data.userInfo = _data['userInfo-kxsz']
                delete _data['token-kxsz']
                delete _data['timeOut-kxsz']
                delete _data['userInfo-kxsz']

                let identityCode = _data.userInfo.identity


                for(let key in IDENTITY) {
                    if (identityCode === key || identityCode.startsWith(key + '_')) {
                        identityCode = key
                        break
                    }
                }

                // 存储登录信息
                localStorage.setItem('loginInfo', JSON.stringify(_data))
                localStorage.setItem('userIdentity', IDENTITY[identityCode])
                localStorage.setItem('loginUId', _data.userInfo.id)
                // 关闭登录框
                // commit('toggleLoginModal', false)
                commit('saveLoginInfo', 'isLogin', true)
                commit('saveLoginInfo', 'loginInfo', _data)

                // 登录成功设置默认请求头添加token
                Axios.defaults.headers['token-kxsz'] = _data.token
                return [true, IDENTITY[identityCode]]
            }
        })
    },
    /*
     * 登出
     */
    logout({commit, state}) {
        removeUserInfo()
        return loginOut().then(response => {
            if (response.data.code == 200) {

                commit('saveLoginInfo', 'isLogin', false)
                commit('saveLoginInfo', 'loginInfo', null)
            }
        }, reject => {
            commit('saveLoginInfo', 'isLogin', false)
            commit('saveLoginInfo', 'loginInfo', null)
            return Promise.resolve()
        })
    },
    /*
     * 获取个人基础信息
     */
    async getUserBaseInfo({dispatch, commit}) {
        return requestUserBaseInfo().then(response => {
            if (response.data.code == 200) {
                localStorage.setItem('baseInfo', JSON.stringify(response.data.appendInfo));
                return true
            }
        })
    },
    /*
     * 获取权限
     */
    async getPermission({dispatch, commit}) {
        return requestPermission().then(response => {
            if (response.data.code == 200) {
                commit('toggleLoginModal', false);
                localStorage.setItem('permission', JSON.stringify(response.data.appendInfo.userRight));
                return true
            }
        })
    },
    /*
     * 获取后台管理权限
     */
    async getAdminPermission({dispatch, commit}) {
        return requestAdminPermission().then(response => {
            if (response.data.code == 200) {
                commit('toggleLoginModal', false);
                localStorage.setItem('bs-permission', JSON.stringify(response.data.appendInfo.userRight[0]));
                return true
            }
        })
    }
}

// mutations
const mutations = {
    toggleLoginModal (state, flag) {
        if (flag !== undefined) {
            state.isShow = flag
        } else {
            state.isShow = !state.isShow
        }
    },
    saveLoginInfo (state, param, data) {
        state[param] = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
