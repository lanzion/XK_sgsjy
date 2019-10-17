import Login from './main'

/* istanbul ignore next */
Login.install = function(Vue) {
    Vue.component(Login.name, Login)
};

export default Login