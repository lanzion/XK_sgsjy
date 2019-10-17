<template>
    <section>
        <h1 class='login-title'>用户登录</h1>
        <div class='login-field'>
            <input placeholder='用户名' type='text' v-model='name' @keyup.enter="doLogin" />
            <i class="icon-input icon-input-user"></i>
        </div>
        <div class='login-field'>
            <input placeholder='请输入密码' type='password' v-model='password' @keyup.enter="doLogin" />
            <i class="icon-input icon-input-password"></i>
        </div>
        <div class='login-field'>
            <button class="i-form-button" @click='doLogin'>登录</button>
        </div>
        <p class="prompt-tip" v-if='msg!==""'>{{msg}}</p>
        <p class="forget-pwd">
            <a @click="redirect(pages.findPwd, { type: 4 })" title="找回密码">忘记密码？</a>
        </p>
        <button class='btn-close' v-if='isModal' @click='toggleModal(false)'>×</button>
    </section>
</template>

<script>
    import getBaseUrl from '@/js/getBaseUrl.js'
    import { mapState, mapMutations, mapActions } from 'Vuex'
    import encrypt from 'jsencrypt'
    export default {
        name: 'login',
        data() {
        	return {
                isModal: true,
        		name: '',
                password: '',
                msg: ''
        	}
        },
        methods: {
            ...mapActions([
                'login',
                'logout',
                'getUserBaseInfo',
                'getPermission',
                'getAdminPermission'
            ]),
            toggleModal (flag) {
                this.$store.commit('toggleLoginModal', flag)
            },
            doLogin () {
                if (this.name.trim() == '' || this.password.trim() == '') {
                    this.msg = '用户名或密码不能为空！';
                    return;
                }

                let resLogin = this.login({name: this.name.trim(), password: this.password.trim()});
                resLogin.then( loginResult => {
                    let [flag, result] = loginResult;
                    if (flag) {
                        this.msg = '';
                        return loginResult
                    } else {
                        this.msg = result;
                    }
                }).then(lr => {
                    let [flag, result] = lr;
                    if (flag) {
                        // 获取用户基本信息
                        return this.getUserBaseInfo().then(baseInfo => {
                            if (baseInfo) {
                                return Promise.resolve(result)
                            }
                        })
                    }
                }).then(lb => {
                    // 获取用户权限
                    switch (lb) {
                        case 'school':
                        case 'education':
                        case 'admin':
                            this.getAdminPermission().then( res => {
                                if (res === true) {
                                    let baseUrl = getBaseUrl();
                                    window.location.href = baseUrl + '/admin.html';
                                }
                            });
                            break;
                        default:
                            this.getPermission().then( res => {
                                if (res === true) {
                                    this.$router.go(0);
                                }
                            })
                            break;
                    }
                }).catch(error => {
                    if (!this.msg.length) {
                        this.doLogin();
                    };
                    console.log('发生错误！', error);
                });
            }
        }
    }
</script>

<style lang='scss'>
    @import '~@/asset/scss/vars.scss';

    @each $color-key, $color-value in $color-data-set {
        .theme-#{$color-key} {
            /*.login-title,*/
            .btn-close:hover {
                color: nth($color-value, 1);
            }
            .login-field {
                input {
                    &:focus {
                        border: 1px solid nth($color-value, 1);
                    }
                    &:focus + .icon-input {
                        color: nth($color-value, 1);
                        background-color: nth($color-value, 2);
                        border-right-color: nth($color-value, 1);
                    }
                }
            }
        }
    }
</style>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
    $input-height: 40px;

    .login-title {
        margin-top: -1.5em;
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
</style>
