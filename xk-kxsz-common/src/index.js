import Axios from './assets/js/http.js'
import Cookies from './assets/js/cookies.js'
// import RedirectCallback from './assets/js/redirectCallback.js'
import Header from './components/header/index.js'
import Footer from './components/footer/index.js'
import Login from './components/login/index.js'
import SideTools from './components/side-tools/index.js'
import Feedback from './components/feedback/index.js'
import WxQRCode from './components/wx-qrcode/index.js'
import PersonalData from './components/personal-data/index.js'
import RegionPubSelect from './components/region-pub-select/index.js'
import RegionSelect from './components/region-select/index.js'
import RegionSchoolSelect from './components/region-school-select/index.js'
// import '../src/assets/font/iconfont.css'

const components = [
  Axios,
  Cookies,
  Header,
  Footer,
  Login,
  SideTools,
  Feedback,
  WxQRCode,
  PersonalData,
  RegionPubSelect,
  RegionSelect,
  RegionSchoolSelect
]

const version = '0.0.1'
const install = function(Vue, config = {}) {
  components.map(component => {
    component && Vue.component(component.name, component)
  })

  Vue.prototype.$http = Axios
  // Vue.prototype.$goCallback = RedirectCallback
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  version,
  install,
  Axios,
  Cookies,
  // RedirectCallback,
  Header,
  Footer,
  Login,
  SideTools,
  Feedback,
  WxQRCode,
  PersonalData,
  RegionPubSelect,
  RegionSelect,
  RegionSchoolSelect
}
export default {
  version,
  install,
  Axios,
  Cookies,
  // RedirectCallback,
  Header,
  Footer,
  Login,
  SideTools,
  Feedback,
  WxQRCode,
  PersonalData,
  RegionPubSelect,
  RegionSelect,
  RegionSchoolSelect
}
