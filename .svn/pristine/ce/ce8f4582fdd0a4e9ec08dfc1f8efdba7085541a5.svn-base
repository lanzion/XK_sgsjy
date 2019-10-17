<template>
    <div :class="[theme, herderBgIsColored ? 'header-bg__colored' : '']" class="app-wrapper">
        <xk-header v-bind="{ active: activeNav }"></xk-header>
        <router-view class="app-container"></router-view>
        <xk-footer></xk-footer>
        <xk-sidetools></xk-sidetools>
        <!-- <keep-alive>
            <el-dialog :visible="isLogin" :show-close="false" class="login-modal">
                <xk-login ref="login"></xk-login>
            </el-dialog>
        </keep-alive> -->
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { initProConfig, requestUserInfo } from '@/service/common.js'

    export default {
        name: 'app',
        data() {
            return {
                herderBgIsColored: false,
                theme: 'theme-lightBlue',
                module: '',
                model: '',
                homepage: '/'
            }
        },

        // computed: mapState({
        //     isLogin: state => state.login.isShow,
        // }),

        created() {
            // this.$store.commit('saveLoginInfo', loginInfo)
            // this.getPermission()
            this.initPro()
            this.checkLoginInfo()
        },

        ls: {
            baseInfo: {
                type: Object,
                default: null,
            },
            loginInfo: {
                type: Object,
                default: null,
            },
            permission: {
                type: Object,
                default: null,
            },
            curEvaluatingItem: {
                type: Object,
                default: null,
            },
        },

        methods: {
            ...mapActions([
                'login',
                'getUserBaseInfo',
                'getPermission',
                'getAdminPermission',
            ]),
            initPro() {
                initProConfig().then((response) => {
                    if (response.data.code === 200) {
                        const _data = response.data.appendInfo || {}
                        const initType = Number(_data.initType) === 4 ? 0 : _data.initType
                        this.$ls.set('XK-MAKER__REGIONLEVEL', initType)
                    }
                })
            },
            activeNav(item) {
                const path = item.url.split('#/')[1].split('/')[0]
                return path.length ? this.$route.path.startsWith(`/${path}`) : false
            },
            checkLoginInfo() {
                const hasToken = this.$cookies.has('token')
                const uid = this.$cookies.get('uid')
                const loginUId = this.$ls.get('loginUId')
                const userId = uid || loginUId

                if (!hasToken && loginUId) {
                    this.$store.commit('removeUserInfo')
                    window.location.reload()
                } else if (userId && uid !== loginUId) {
                    this.login({ userId, handler: requestUserInfo }).then((loginResult) => {
                        // alert(JSON.stringify(loginResult))
                        const { code: flag } = loginResult
                        if (flag === 200) {
                            this.$cookies.set({ uid: userId }, { domain: window.configs.httpConfig.domain })
                            return loginResult
                        }
                    }).then((lr) => {
                        if (lr !== undefined) {
                            const { code: flag, identity } = lr
                            if (flag === 200) {
                                // 获取用户基本信息
                                return this.getUserBaseInfo().then((baseInfo) => {
                                    if (baseInfo) {
                                        return Promise.resolve(identity)
                                    }
                                })
                            }
                        }
                    }).then((lb) => {
                        // 获取用户权限
                        if (lb !== undefined) {
                            let handler = this.getPermission
                            switch (lb) {
                                case 'school':
                                case 'education':
                                case 'admin':
                                    handler = this.getAdminPermission
                                    break
                            }
                            handler().then((res) => {
                                if (res === true) {
                                    window.location.reload()
                                }
                            })
                        }
                    })
                }
            }
        },

        // watch: {
        //     isLogin: function (val) {
        //         if (val) {
        //             setTimeout(() => {
        //                 this.$refs.login.autoFocus()
        //             }, 200)
        //         }
        //     }
        // }
    }

</script>

<style lang="stylus">
    .login-modal.el-dialog__wrapper
        .el-dialog
            width: 400px
            // height: 390px
            padding: 0 10px
            border: 0

        .el-dialog__header
            background-color: #fff
            border: 0
</style>
<style lang='scss' scoped>
/*     .app-container {
        padding-top: 73px!important;
    } */
    @media screen and (min-device-width: 980px) {
        .app-container {
            min-height: calc(100vh - 199px);
            margin-bottom: 40px;
        }
    }
</style>
