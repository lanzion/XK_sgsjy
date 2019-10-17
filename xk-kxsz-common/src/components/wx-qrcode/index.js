import WxQRCode from './main'

/* istanbul ignore next */
WxQRCode.install = function(Vue) {
    Vue.component(WxQRCode.name, WxQRCode)
};

export default WxQRCode