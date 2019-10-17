<template>
    <section :class="{'login-modal': isModal}" v-loading="isLoading" element-loading-text="正在登录中...">
        <h1 class='login-title'>用户登录</h1>
        <div class='login-field'>
            <input placeholder='用户名/邮箱/手机' type='text' v-model.trim='name' @keyup.enter="doLogin" ref="inputName"/>
            <i class="icon-input icon-input-user"></i>
        </div>
        <div class='login-field'>
            <input placeholder='请输入密码' type='password' v-model.trim='password' @keyup.enter="doLogin"/>
            <i class="icon-input icon-input-password"></i>
        </div>
        <div class='login-field'>
            <button class="i-form-button" @click='doLogin'>登录</button>
        </div>
        <p class="prompt-tip" v-show='msg!==""'>{{msg}}</p>
        <p class="link clearfix">
            <router-link class="fl" :to="{ path: 'register' }" title="">立即注册</router-link>
            <router-link class="fr" :to="{ path: 'findPwd' }" title="找回密码">忘记密码？</router-link>
        </p>
        <button class='btn-close' v-if='isModal' @click='toggleModal(false)'>×</button>
        <!-- 第三方登录 -->
        <!-- <p class="separation-line">其他账号登录</p>
        <div class="other-account">
            <a href="javaScript:;" title="微信登录" class="icon-btn-wechat" @click="qrcodeShow = true"></a>
        </div>
        <v-qrcode v-show="qrcodeShow" @close="closeQrcode"></v-qrcode> -->
        <edit-data :visible.sync="visible" :userMsg="userMsg"></edit-data>
    </section>
</template>

<script>
    import { mapActions } from 'vuex'
    // import qrcode from './../wx-qrcode/main.vue'
    import editData from './../personal-data/main.vue'

    export default {
        name: 'xk-login',
        components: {
            // 'v-qrcode': qrcode,
            'edit-data': editData
        },
        data() {
            return {
                name: '',
                password: '',
                msg: '',
                isLoading: false,
                qrcodeShow: false,
                visible: {
                    show: false
                },
                userMsg: {}
            }
        },
        props: {
            isModal: {
                type: Boolean,
                default() {
                    return true
                }
            }
        },
        methods: {
            ...mapActions([
                'login',
                'logout',
                'getUserBaseInfo',
                'getPermission',
                'getAdminPermission',
            ]),
            toggleModal(flag) {
                this.$store.commit('toggleLoginModal', flag)
            },
            autoFocus() {
                this.$refs.inputName.focus()
            },
            doLogin() {
                if (this.name === '' || this.password === '') {
                    this.msg = '用户名或密码不能为空！'
                    return
                }

                this.isLoading = true

                const resLogin = this.login({ name: this.name, password: this.password })
                resLogin.then((loginResult) => {
                    // const [flag, result] = loginResult
                    const { code: flag, msg, identity, userInfo } = loginResult
                    if (flag === 200) {
                        this.msg = ''
                        return loginResult
                    } else if (flag === 209) {
                        this.$confirm('您的账号未通过审核，请修改资料再提交,是否去修改资料？', '温馨提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            customClass: '__custom-msg-box'
                        }).then(() => {
                            this.visible.show = true
                            this.userMsg = Object.assign(userInfo)
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消编辑资料'
                            })
                        })
                        this.msg = msg
                        return
                    }

                    this.msg = msg
                }).then((lr) => {
                    // const [flag, result] = lr
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
                        let url = `${this.pages.my.url}`
                        let isAdmin = false
                        switch (lb) {
                            case 'school':
                            case 'education':
                            case 'admin':
                                isAdmin = true
                                handler = this.getAdminPermission
                                url = `${this.pages.admin.url}`
                                // this.getAdminPermission().then((res) => {
                                //     if (res) {
                                //         window.location.href = `${this.pages.admin.url}`
                                //     }
                                // })
                                break
                            // default:
                            //     this.getPermission().then((res) => {
                            //         if (res === true) {
                            //             window.location.href = `${this.pages.my.url}`
                            //         }
                            //     })
                            //     break
                        }
                        url = isAdmin ? url : this.$route.query.callback || url
                        handler().then((res) => {
                            if (res === true) {
                                window.location.href = url
                            }
                        })
                    }
                }).finally(() => {
                    this.isLoading = false
                })
            },
            // 关闭二维码弹窗
            closeQrcode() {
                this.qrcodeShow = false
            }
        },
    }
</script>

<style lang="scss">
    @import '~@/assets/css/scss/form.scss';
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    $input-height: 40px;

    .login-title {
        font-size: 22px;
        line-height: 3em;
    }

    .login-field {
        position: relative;
        margin-bottom: 15px;

        input,
        button {
            width: 100%;
            font-size: 14px;
            line-height: $input-height;
        }
        input {
            height: $input-height + 4;
            border: 1px solid #c7c7c7;
            background-color: transparent;
            padding-left: $input-height + 10;
            box-sizing: border-box;
            &:focus {
                border: 1px solid nth($default-color, 1);
            }
            &:focus + .icon-input {
                color: nth($default-color, 1);
                background-color: #dbf1ff;
                border-right-color: nth($default-color, 1);
            }
        }
        button {
            color: #fff;
        }
        .icon-input {
            position: absolute;
            top: 1px;
            left: 1px;
            width: $input-height + 2;
            height: $input-height + 2;
            border-right: 1px solid #c7c7c7;
            background-color: #f3f3f3;
            font-size: 22px;
            line-height: $input-height + 2;
            text-align: center;
        }
        .i-form-button {
            color: #fff;
            background-color: nth($default-color, 1);
            border-color: nth($default-color, 1);
            &:hover {
                background-color: nth($default-color, 2);
            }
        }
    }

    .prompt-tip {
        color: #f00;
        margin-bottom: 10px;
    }

    .link {
        a {
            color: nth($default-color, 1);
        }
    }

    .btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
        border: 0;
        font-size: 36px;
        color: #c3c3c3;
    }
    .login-modal {
        margin-top: -20px;
    }

    .separation-line {
        position: relative;
        text-align: center;
        margin: 15px 0;
        font-size: 14px;
        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 7px;
            left: 0;
            width: 118px;
            height: 1px;
            background-color: #ccc;
        }
        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 7px;
            right: 0;
            width: 118px;
            height: 1px;
            background-color: #ccc;
        }
    }
    .other-account {
        text-align: center;
        a {
            font-size: 28px;
            color: #50c231;
        }
    }
</style>
