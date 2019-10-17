<template>
    <div id="admin" class="theme-lightBlue">
        <v-nav class="admin-nav__box"></v-nav>
        <div class="admin-right__box">
            <v-header></v-header>
            <v-breadcrumb></v-breadcrumb>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { removeUserInfo, adminPermission, userIdentity, loginInfo } from 'Asset/js/getUserInfo.js'
import checkLoginTimeout from 'Asset/js/checkLoginTimeout.js'
// import getBaseUrl from 'Asset/js/getBaseUrl.js'
import { initProConfig, requestUserInfo } from '@/service/common.js'
import { httpConfig,pages } from '@/assets/js/common-config.js'
import header from '@/components/common/header.vue'
import nav from '@/components/common/nav.vue'
import breadcrumb from '@/components/common/breadcrumb.vue'

export default {
    name: 'education',
    components: {
        'v-header': header,
        'v-nav': nav,
        'v-breadcrumb': breadcrumb
    },
    data() {
        return {
            adminPermission: adminPermission
        }
    },
    created() {
        if (!(userIdentity=='admin' || userIdentity=='education' || userIdentity=='school') || !loginInfo) {
            // let baseUrl = getBaseUrl();
            // window.location.href = baseUrl + '/index.html';
            window.location.href = pages.index
        } else {
            this.setModule();
        }
        this.initPro();
        this.checkLoginInfo()
    },
    ls: {
        baseInfo: {
            type: Object,
            default: null
        },
        loginInfo: {
            type: Object,
            default: null
        },
        'bs-permission': {
            type: Object,
            default: null
        },
        curEvaluatingItem: {
            type: Object,
            default: null
        },
    },
    watch:{
        '$route': 'setModule'
    },
    methods: {
        ...mapActions([
            'login',
            'getUserBaseInfo',
            'getPermission',
            'getAdminPermission',
        ]),
        judgeRequireAuth() {
            let flag = false
            const route = this.$route
            if (route) {
                flag = route.matched.some(x => x.meta && x.meta.requireAuth === false)
            }
            return flag
        },
        // 存储当前路由在权限的index
        setModule(val) {
            if (this.judgeRequireAuth()) {
                localStorage.setItem('BACK-STAGE__INDEX', -1)
            } else {
                let path = '/'
                let _path = ''
                let indexs = []
                let _adminPermission = this.adminPermission.children
                let routePaths = this.$route.path.split('/').filter(x => x.length)
                routePaths = routePaths.length ? routePaths : ['/']
                console.log(this.$route.path)
                routePaths.forEach((x, i) => {
                    _path += `${x=='/'?'':'/'}${x}`
                    let index = _adminPermission.findIndex((p, j) => {
                        p.url = p.url || ''
                        return (!p.url.length && (x == p.menuId)) || (p.url.length && (_path == p.url))
                    })
                    if (index >= 0) {
                        indexs.push(index)
                        path = _path
                        _adminPermission = _adminPermission[index].children || []
                    }
                })
                indexs = this.redirect(routePaths, indexs)
                localStorage.setItem('BACK-STAGE__INDEX', indexs)
            }
        },
        redirect(routePaths, indexs) {
            let flag = false
            if (this.judgeRequireAuth()) {
                indexs = [-1]
            } else if (routePaths.length !== indexs.length && !routePaths.some(x => x.includes('detail'))) {
                let _subPermission = this.adminPermission.children
                indexs.forEach((x) => {
                    _subPermission = _subPermission[x].children
                })
                let _index = (_subPermission && _subPermission.length) ? _subPermission.findIndex((x) => x.permissType=='1') : -1
                flag = _index >= 0 ? true : false
                if (flag) {
                    let isHave = false
                    _subPermission.forEach((item, i) => {
                        item.children.forEach((x, j) => {
                            if (x.menuId == routePaths[indexs.length]) {
                                isHave = true
                                _index = [i, j]
                            }
                        })
                    })
                    indexs.splice(indexs.length, 1, _index)
                    if (!isHave) {
                    console.log(this.$route)
                        this.$router.replace({path: _subPermission[0].url})
                    }
                } else {
                    routePaths.length = indexs.length
                    this.$router.replace({path: `/${routePaths.join('/')}`})
                }
            }
            return indexs
        },
        initPro() {
            initProConfig().then(response => {
                if (response.data.code == 200) {
                    let _data = response.data.appendInfo || {},
                        initType = Number(_data.initType) === 4 ? 0 : _data.initType
                    this.$ls.set('XK-MAKER__REGIONLEVEL', initType)
                }
            })
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
                    const { code: flag, msg, identity, userInfo } = loginResult
                    if (flag === 200) {
                        this.$cookies.set({ uid: userId }, { domain: httpConfig.domain })
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
                        let isAdmin = false
                        switch (lb) {
                            case 'school':
                            case 'education':
                            case 'admin':
                                handler = this.getAdminPermission
                                isAdmin = true
                                break
                        }
                        handler().then((res) => {
                            if (Object.keys(res).length) {
                                if (isAdmin) {
                                    this.adminPermission = res
                                    this.setModule()
                                    window.location.reload()
                                } else {
                                    window.location.href = this.pages.my
                                }
                            }
                        })
                    }
                })
            } else {
                this.adminPermission = adminPermission
            }
        }
    }
}

</script>

<!-- <style src='res/css/reset.css'></style> -->
<style lang='scss'>
@import '~@/assets/css/scss/admin_back-stage_manage.scss';
.admin-nav__box {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: $nav-width;
    background-color: $nav-bc;
    overflow: auto;
}
.admin-right__box {
    margin-left: $nav-width;
}
</style>
