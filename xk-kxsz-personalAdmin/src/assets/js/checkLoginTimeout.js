import { Message } from 'element-ui';
import { pages } from './common-config.js'
import { loginInfo, removeUserInfo } from './getUserInfo.js'

function checkLoginTimeout() {
    let currentTime = (new Date()).getTime()
    if (loginInfo !== null) {
        let lastActiveTime = localStorage.getItem('lastActiveTime')
        if (lastActiveTime !== null) {
            // 登录过期策略
            let exp = loginInfo.timeOut > 0 ? loginInfo.timeOut * 1000 : 86400000
            if (currentTime - lastActiveTime > exp) {
                let error = '登录超时'
                Message({ type: 'warning', message: error })
                removeUserInfo()
                window.location.href = pages.login
            }
        }
    }
}

export default checkLoginTimeout
