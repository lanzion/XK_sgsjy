import 'es6-promise/auto'
import 'babel-polyfill'
import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import commonMixin from '@/mixin/common'
import ElementUI from 'element-ui'
import XKCommonModule from 'xk-kxsz-common'
import 'element-ui/lib/theme-default/index.css'
// import {
//   Button,
//   Col,
//   Checkbox,
//   Cascader,
//   Carousel,
//   CarouselItem,
//   Collapse,
//   CollapseItem,
//   Dialog,
//   Form,
//   FormItem,
//   Input,
//   Option,
//   Popover,
//   Row,
//   Select,
//   Tabs,
//   TabPane,
// } from 'element-ui'
import Axios from 'Axios'
// import getBaseUrl from 'Asset/js/getBaseUrl'
import filters from '@/filter/filters.js'
import methods from '@/filter/methods.js'
import VueLocalStorage from 'vue-localstorage'
import eduDefault from 'Asset/img/common/edu_default.svg'
import schoolDefault from 'Asset/img/common/school_default.svg'
import classDefault from 'Asset/img/common/class_default.svg'
import studioDefault from 'Asset/img/common/studio_default.svg'
import studentDefault from 'Asset/img/common/student_default.svg'
import faceDefault from 'Asset/img/common/face_default.svg'
import listDefault from 'Asset/img/common/info.png'
import { pages } from 'Asset/js/common-config.js'
import App from './App'

Vue.prototype.eduDefault = eduDefault
Vue.prototype.schoolDefault = schoolDefault
Vue.prototype.classDefault = classDefault
Vue.prototype.studioDefault = studioDefault
Vue.prototype.studentDefault = studentDefault
Vue.prototype.teacherDefault = faceDefault
Vue.prototype.faceDefault = faceDefault
Vue.prototype.listDefault = listDefault
Vue.prototype.pages = pages
Vue.prototype.title = ''

Vue.use(ElementUI)
Vue.use(XKCommonModule)
console.log(XKCommonModule)
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

Vue.use(methods)
router.beforeEach((to, from, next) => {
  let loginInfo = localStorage.getItem('loginInfo')
  // let userIdentity = localStorage.getItem('userIdentity')
  loginInfo = loginInfo !== null ? JSON.parse(loginInfo) : null
  // userIdentity = loginInfo !== null ? userIdentity : null

  const { path: toPath, meta: toMeta = {} } = to
  const { position: POSITION, background: BACKGROUND = false, login: LOGIN = true, title: TITLE } = toMeta

  // 窗口滚动到指定位置
  let { x = 0, y = 0 } = (POSITION && typeof POSITION === 'object') ? POSITION : {}
  window.scrollTo(x, y)

  if (!LOGIN && loginInfo) {
    location.reload()
    next(false)
  }

  if (BACKGROUND) {
    $('body').addClass('bg_gray')
  } else {
    $('body').removeClass('bg_gray')
  }

  // if (TITLE) {
  //   document.title = `${ TITLE } - ${ DEFAULTTITLE }`
  // } else {
  //   document.title = DEFAULTTITLE
  // }

  next()
})

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

