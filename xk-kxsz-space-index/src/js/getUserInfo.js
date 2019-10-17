// 用户信息
let loginInfo = localStorage.getItem('loginInfo');

let flag = loginInfo !== null;
loginInfo = flag ? JSON.parse(loginInfo) : null;

// 用户基本信息
let baseInfo = flag ? localStorage.getItem('baseInfo') : null;
baseInfo = baseInfo !== null ? JSON.parse(baseInfo) : null;

// 用户身份
let userIdentity = flag ? localStorage.getItem('userIdentity') : null;

// 用户权限
let permission = flag ? localStorage.getItem('permission') : null;
permission = permission !== null ? JSON.parse(permission) : null;

// 后台权限
let adminPermission = flag ? localStorage.getItem('bs-permission') : null;
adminPermission = adminPermission !== null ? JSON.parse(adminPermission) : null;

function removeUserInfo() {
	localStorage.removeItem('loginInfo');
	localStorage.removeItem('baseInfo');
    localStorage.removeItem('userIdentity');
    localStorage.removeItem('permission');
    localStorage.removeItem('bs-permission');
    localStorage.removeItem('loginUId');
    localStorage.removeItem('BACK-STAGE__INDEX');
}

export {
	loginInfo,
    baseInfo,
	userIdentity,
	permission,
    adminPermission,
	removeUserInfo
}
