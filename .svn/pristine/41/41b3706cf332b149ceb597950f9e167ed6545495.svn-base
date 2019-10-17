import xhr from 'Axios'

//修改密码
let modifyPassword = (options = {}) => xhr.post(`/portal/user/resetPsw2`,options)

// 获取邮箱验证码
const requestEamilValidCode = (options = {}) => xhr.post(`/portal/user/getEmailCode`, options)

// 绑定邮箱 - 验证邮箱
const validEmailCode = (options = {}) => xhr.post(`/portal/user/validEmailCode`, options)

// 修改邮箱 -  发送邮件
const requestEmailCodeMod = (options = {}) => xhr.post(`/portal/user/getEmailCodeOfMod`, options)

// 绑定手机 - 绑定手机
const requestBindMobile = (options = {}) => xhr.post(`/portal/user/bindMobile`, options)

// 绑定手机 - 发送手机验证码
const requestSendMobileCode = (options = {}) => xhr.post(`/portal/user/sendMobileCode`, options)



export {
    modifyPassword,
    requestEamilValidCode,
    validEmailCode,
    requestEmailCodeMod,
    requestBindMobile,
    requestSendMobileCode
}