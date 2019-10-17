<template>
    <section :class="{'login-modal': isModal}" v-loading="isLoading" element-loading-text="正在登录中...">
        <h1 class='login-title'>用户登录</h1>
        <div class='login-field'>
            <input placeholder='用户名' type='text' v-model.trim='name' @keyup.enter="doLogin"/>
            <i class="icon-input icon-input-user"></i>
        </div>
        <div class='login-field'>
            <input placeholder='请输入密码' type='password' v-model.trim='password' @keyup.enter="doLogin"/>
            <i class="icon-input icon-input-password"></i>
        </div>
        <div class='login-field'>
            <button class="i-form-button" @click='doLogin'>登录</button>
        </div>
        <p class="prompt-tip" v-if='msg!==""'>{{msg}}</p>
        <p class="forget-pwd">
            <router-link :to="{ path: 'findPwd' }" title="找回密码">忘记密码？</router-link>
        </p>
        <button class='btn-close' v-if='isModal' @click='toggleModal(false)'>×</button>
    </section>
</template>

<script>
    import { pages } from 'Asset/js/common-config.js'
    import { mapActions } from 'vuex'

    export default {
        name: 'login',
        data() {
            return {
                name: '',
                password: '',
                msg: '',
                isLoading: false
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
            doLogin() {
                if (this.name === '' || this.password === '') {
                    this.msg = '用户名或密码不能为空！'
                    return
                }

                this.isLoading = true

                const resLogin = this.login({ name: this.name, password: this.password })
                resLogin.then((loginResult) => {
                    const [flag, result] = loginResult
                    if (flag) {
                        this.msg = ''
                        return loginResult
                    }

                    this.msg = result
                }).then((lr) => {
                    const [flag, result] = lr
                    if (flag) {
                        // 获取用户基本信息
                        return this.getUserBaseInfo().then((baseInfo) => {
                            if (baseInfo) {
                                return Promise.resolve(result)
                            }
                        })
                    }
                }).then((lb) => {
                    // 获取用户权限
                    switch (lb) {
                        case 'school':
                        case 'education':
                        case 'admin':
                            this.getAdminPermission().then((res) => {
                                if (res) {
                                    window.location.href = `${pages.admin}`
                                }
                            })
                            break
                        default:
                            this.getPermission().then((res) => {
                                if (res === true) {
                                    window.location.href = `${pages.my}`
                                }
                            })
                            break
                    }
                }).finally(() => {
                    this.isLoading = false
                })
            }
        },
    }
</script>

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
    }
    .forget-pwd {
        text-align: right;
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
</style>
