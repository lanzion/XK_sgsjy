import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import commonMixin from '@/mixin/common'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Axios from 'Asset/js/http'
import Cookies from 'Asset/js/cookies'
// import getBaseUrl from 'Asset/js/getBaseUrl'
import filters from '@/filter/filters.js'
import methods from '@/filter/methods.js'
import wangEditor from 'wangEditor'
import VueLocalStorage from 'vue-localstorage'
import faceDefault from 'Asset/img/common/face_default.svg'
import listDefault from 'Asset/img/common/info.png'
import { pages } from 'Asset/js/common-config.js'

import 'Asset/css/index.css'

import App from './App'

Vue.prototype.faceDefault = faceDefault
Vue.prototype.listDefault = listDefault
Vue.prototype.pages = pages

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  let isLogin = Cookies.has('token')
  // let userIdentity = localStorage.getItem('userIdentity')
  // loginInfo = loginInfo !== null ? JSON.parse(loginInfo) : null
  // userIdentity = loginInfo !== null ? userIdentity : null

  // const { path: toPath, meta: toMeta } = to

  if (isLogin) {
    next()
  } else {
    ElementUI.MessageBox.alert('您已退出登录或登录信息已过期，请重新登录', '提示', {
      type: 'warning',
      confirmButtonText: '确定',
      callback: () => {
        window.location.href = pages.index
      }
    })
    next(false)
  }
})

Vue.use(methods)
Vue.use(VueLocalStorage, {
  name: 'ls',
})
Vue.mixin(commonMixin)
Vue.prototype.$http = Axios
Vue.prototype.$cookies = Cookies
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})

