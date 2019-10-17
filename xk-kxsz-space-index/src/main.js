import 'es6-promise/auto'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Axios from 'Axios'
import filters from '@/filter/filters.js'
import methods from '@/filter/methods.js'
import getBaseUrl from '@/js/getBaseUrl.js'
import wangEditor from 'wangEditor'
import VueLocalStorage from 'vue-localstorage'
import { commonMixin } from '@/mixin/common.js'
import { pages } from '@/js/common-config.js'


import faceDefault from '@/asset/img/common/face_default.svg'
import faceDefault_square from '@/asset/img/common/face_default_square.svg'
import listDefault from 'res/images/info.png'
import bgDefault from '@/asset/img/common/person_card_bg.png'
Vue.prototype.faceDefault = faceDefault
Vue.prototype.squareFaceDefault = faceDefault_square
Vue.prototype.listDefault = listDefault
Vue.prototype.bgDefault = bgDefault
Vue.prototype.pages = pages

router.beforeEach((to, from, next) => {
    let loginInfo = localStorage.getItem('loginInfo'),
        userIdentity = localStorage.getItem('userIdentity')
    loginInfo = loginInfo !== null ? JSON.parse(loginInfo) : null
    userIdentity = loginInfo !== null ? userIdentity : null

    const {path: toPath, meta: toMeta} = to
    const {position: POSITION, background: BACKGROUND = true} = toMeta

    // 是否是个人空间后台
    Vue.prototype.isAdmin = toPath.startsWith('/admin')

    // 窗口滚动到指定位置
    if (POSITION && typeof POSITION === 'object') {
      const {x = 0, y = 0} = POSITION
      window.scrollTo(x, y)
    }

    if (BACKGROUND) {
        $('body').css({'background-color': '#eee'});
        Vue.prototype.ifShadow = false
    } else {
        $('body').css({'background-color': ''});
        Vue.prototype.ifShadow = true
    }

    if (userIdentity && (userIdentity=='admin' || userIdentity=='education' || userIdentity=='school')) {
        let baseUrl = getBaseUrl()
        // window.location.href = pages.admin
    } else if (to.matched.some(r => r.meta.requireAuth)) {
        if (loginInfo !== null && loginInfo.token !== undefined) {
            next();
        } else {
            store.commit("toggleLoginModal", true);
            // next({
            //     path: '/login',
            //     query: {redirect: to.fullPath}
            // })
        }
    } else if ((to.path == '/register') || (to.path == '/login')) {
        let flag = from.path == '/register' || from.path == '/login'
        to.query.oauth_callback = {
            path: flag ? '/' : from.path,
            query: flag ? {} : from.query
        }
        next();
    } else {
        next();
    }
})
Vue.mixin(commonMixin)
Vue.use(methods)
Vue.use(ElementUI)
Vue.use(VueLocalStorage, {
  name: 'ls'
})
Vue.prototype.$http = Axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#index',
    store,
    router,
    render: h => h(App)
})
