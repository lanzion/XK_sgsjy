import Cookies from './cookies.js'

// 用户信息
const _loginInfo = localStorage.getItem('loginInfo')

const flag = _loginInfo !== null
const loginInfo = flag ? JSON.parse(_loginInfo) : null

// 用户基本信息
const _baseInfo = flag ? localStorage.getItem('baseInfo') : null
const baseInfo = _baseInfo !== null ? JSON.parse(_baseInfo) : null

// 用户身份
const userIdentity = flag ? localStorage.getItem('userIdentity') : null

// 用户权限
const _permission = flag ? localStorage.getItem('permission') : null
const permission = _permission !== null ? JSON.parse(_permission) : null

// 后台权限
const _adminPermission = flag ? localStorage.getItem('bs-permission') : null
const adminPermission = _adminPermission !== null ? JSON.parse(_adminPermission) : null

function removeUserInfo() {
    localStorage.removeItem('loginInfo')
    localStorage.removeItem('baseInfo')
    localStorage.removeItem('userIdentity')
    localStorage.removeItem('permission')
    localStorage.removeItem('bs-permission')
    localStorage.removeItem('loginUId')
    Cookies.remove('token')
    Cookies.remove('uid')
}

export {
    loginInfo,
    baseInfo,
    userIdentity,
    permission,
    adminPermission,
    removeUserInfo
}
