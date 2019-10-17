
<script>
    import { mapActions } from 'vuex'
    import { judgeWechatBind } from '@/service/common.js'
    import Axios from 'xk-kxsz-common/src/assets/js/http.js'

    export default {
        data() {
            return {
                IDENTITY: {
                    0: 'student',         // 学生
                    1: 'teacher',         // 教师
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            judgeWechatBind({ code: to.query.code }).then((res) => {
                if (res.data.code === 200) {
                    console.log(res.data)
                    if (Object.keys(res.data.appendInfo).includes('unionid')) {
                        next({ path: '/bindWechat', query: { unionid: res.data.appendInfo.unionid } })
                    } else {
                        next((vm) => {
                            const _data = res.data.appendInfo
                            const identityCode = _data.userInfo.identity
                            // 登录成功设置默认请求头添加token
                            Axios.defaults.headers.token = _data.token
                            // 存储登录信息
                            localStorage.setItem('loginInfo', JSON.stringify(_data))
                            localStorage.setItem('userIdentity', vm.IDENTITY[identityCode])
                            localStorage.setItem('loginUId', _data.userInfo.id)
                            // 关闭登录框
                            vm.$store.commit('saveLoginInfo', 'isLogin', true)
                            vm.$store.commit('saveLoginInfo', 'loginInfo', _data)
                            vm.$store.commit('saveLoginInfo', 'userIdentity', vm.IDENTITY[identityCode])

                            vm.getUserBaseInfo()
                            vm.getPermission().then((response) => {
                                if (response === true) {
                                    // window.location.href = `${vm.pages.my.url}`
                                    history.go(-1)
                                }
                            })
                        })
                    }
                } else {
                    next((vm) => {
                        vm.$message({ type: 'error', message: res.data.msg })
                        vm.$router.push({ path: '/' })
                    })
                }
            }, (err) => {
                next((vm) => {
                    vm.$message({ type: 'error', message: '出错了~' })
                    vm.$router.push({ path: '/' })
                })
            })
        },
        methods: {
            ...mapActions([
                'getUserBaseInfo',
                'getPermission',
            ]),
        }
    }
</script>