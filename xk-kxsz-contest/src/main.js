import 'es6-promise/auto'
import 'babel-polyfill'
import Vue from 'vue'
import Axios from 'axios'
import 'jquery'
import 'webuploader'
import ElementUI from 'element-ui'
import wangEditor from 'wangeditor'
import 'webuploader/dist/webuploader.css'
import router from '@/router/index'
import store from '@/store/index'
import commonMixin from '@/mixin/common'
import filters from '@/filter/filters.js'
import methods from '@/filter/methods.js'
import { judgeManage, judgeExpert, judgeTakepartIn, judgeManageOffline } from '@/service/contest_detail.js'
import 'element-ui/lib/theme-default/index.css'
import XKCommonModule from 'xk-kxsz-common'
import VueLocalStorage from 'vue-localstorage'
import uploader from 'vue-simple-uploader'
import faceDefault from 'Asset/img/common/face_default.svg'
import listDefault from 'Asset/img/common/info.png'
import { pages } from 'Asset/js/common-config.js'
import 'Asset/css/index.css'
import App from './App'
import upload from './assets/js/vue-simple-uploader'

// import {
//     Button,
//     Col,
//     Checkbox,
//     Cascader,
//     Carousel,
//     CarouselItem,
//     Collapse,
//     CollapseItem,
//     Dialog,
//     Form,
//     FormItem,
//     Input,
//     Option,
//     Popover,
//     Row,
//     Select,
//     Tabs,
//     TabPane,
// } from 'element-ui'

Vue.prototype.faceDefault = faceDefault
Vue.prototype.listDefault = listDefault
Vue.prototype.pages = pages

Vue.use(uploader)
Vue.use(ElementUI)
Vue.use(XKCommonModule)
// Vue.use(Button)
// Vue.use(Col)
// Vue.use(Checkbox)
// Vue.use(Cascader)
// Vue.use(Carousel)
// Vue.use(CarouselItem)
// Vue.use(Collapse)
// Vue.use(CollapseItem)
// Vue.use(Dialog)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Option)
// Vue.use(Popover)
// Vue.use(Row)
// Vue.use(Select)
// Vue.use(Tabs)
// Vue.use(TabPane)


router.beforeEach((to, from, next) => {
    let loginInfo = localStorage.getItem('loginInfo')
    let userIdentity = localStorage.getItem('userIdentity')
    loginInfo = loginInfo !== null ? JSON.parse(loginInfo) : null
    userIdentity = loginInfo !== null ? userIdentity : null

    const { path: toPath, meta: toMeta, query } = to
    const { position: POSITION, background: BACKGROUND = true } = toMeta
    const _to = from.fullPath === '/' ? Object.assign({}, to, { path: pages.detail.contest.path, replace: true }) : from

    // 窗口滚动到指定位置
    // let { x = 0, y = 0 } = (POSITION && typeof POSITION === 'object') ? POSITION : {}
    // window.scrollTo(x, y)
    if (POSITION && typeof POSITION === 'object') {
        const { x = 0, y = 0 } = POSITION
        window.scrollTo(x, y)
    }

    if (BACKGROUND) {
        $('body').addClass('bg_gray')
    } else {
        $('body').removeClass('bg_gray')
    }

    if (to.matched.some(r => r.meta.requireAuth) && !loginInfo) {
        next(_to)
    } else if (userIdentity === 'admin') {
        window.location.href = pages.admin.url
    } else {
        let handler
        let params
        const auth = to.matched.find(r => r.meta.requireAuth)
        if (auth && Number(query.type) === 1) {
            switch (auth.meta.requireAuth) {
                case 'manage':
                    handler = judgeManage
                    params = { id: query.id }
                    break
                case 'expert':
                    handler = judgeExpert
                    params = { matchId: query.id }
                    break
                // case 'participant':
                //     handler = judgeTakepartIn
                //     params = { matchId: query.id }
                //     break
            }
            if (handler !== undefined) {
                handler(params).then((res) => {
                    if (res.data.code === 200) {
                        next()
                    } else {
                        ElementUI.Message({ type: 'error', message: res.data.msg })
                        next(_to)
                    }
                })
            } else {
                next()
            }
            return
        } else if (auth && Number(query.type) === 2) {
            switch (auth.meta.requireAuth) {
                case 'manage':
                    handler = judgeManageOffline
                    params = { id: query.id }
                    break
            }
            handler(params).then((res) => {
                if (res.data.code === 200) {
                    next()
                } else {
                    ElementUI.Message({ type: 'error', message: res.data.msg })
                    next(_to)
                }
            })
            return
        }
    }

    next()
})

Vue.use(uploader)
Vue.use(methods)
Vue.use(VueLocalStorage, {
    name: 'ls',
})
Vue.mixin(commonMixin)
Vue.prototype.$http = Axios
Vue.prototype.$cookies = XKCommonModule.Cookies
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
})

