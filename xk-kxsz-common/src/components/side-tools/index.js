import SideTools from './main'

/* istanbul ignore next */
SideTools.install = function(Vue) {
    Vue.component(SideTools.name, SideTools)
};

export default SideTools