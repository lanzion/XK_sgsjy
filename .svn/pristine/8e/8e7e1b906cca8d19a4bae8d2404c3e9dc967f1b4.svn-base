<template>
	<div class="bind-page">
        <p class="bind-tips">
            <i class="icon-form-tip"></i>
            您的微信尚未绑定本平台账号，请输入创客平台账号密码进行微信号绑定。
        </p>
		<div class='login-field'>
            <input placeholder='用户名' type='text' v-model.trim='form.account' ref="inputName"/>
            <i class="icon-input icon-input-user"></i>
        </div>
        <div class='login-field'>
            <input placeholder='密码' type='password' v-model.trim='form.pwd'/>
            <i class="icon-input icon-input-password"></i>
        </div>
        <p class="prompt-tip" v-if='msg !== ""'>{{msg}}</p>
        <div class='login-field'>
            <button class="i-form-button" @click="bindWechat">绑定</button>
            <button class="i-form-button btn-gray" @click="toRegister">还没有账号？立即注册</button>
        </div>
	</div>
</template>

<script>
    import { mapActions } from 'vuex'
    import encrypt from 'jsencrypt'
    import { requestBindWechat, requestPublishKey } from '@/service/common.js'
    // import Axios from 'xk-kxsz-common'

    const JSEncrypt = encrypt.JSEncrypt.prototype

    export default {
        data() {
            return {
                form: {
                    account: '',
                    pwd: ''
                },
                msg: '',
                IDENTITY: {
                    0: 'student',         // 学生
                    1: 'teacher',         // 教师
                }
            }
        },
        mounted() {
            this.getPublishKey()
        },
        methods: {
            ...mapActions([
                'getUserBaseInfo',
                'getPermission',
            ]),
            async getPublishKey() {
                const res = await requestPublishKey()
                if (res.data.code === 200) {
                    JSEncrypt.setPublicKey(res.data.entity)
                }
            },
            bindWechat() {
                if (this.form.account === '' || this.form.pwd === '') {
                    this.msg = '用户名或密码不能为空！'
                    return
                }

                const params = {
                    bindType: '1',
                    unionid: this.$route.query.unionid,
                    account: this.form.account,
                    pwd: JSEncrypt.encrypt(this.form.pwd)
                }
                requestBindWechat(params).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.appendInfo
                        const identityCode = _data.userInfo.identity
                        this.$message({ type: 'success', message: '绑定成功' })
                        // 登录成功设置默认请求头添加token
                        this.$http.defaults.headers.token = _data.token
                        // 存储登录信息
                        localStorage.setItem('loginInfo', JSON.stringify(_data))
                        localStorage.setItem('userIdentity', this.IDENTITY[identityCode])
                        localStorage.setItem('loginUId', _data.userInfo.id)
                        // 关闭登录框
                        this.$store.commit('saveLoginInfo', 'isLogin', true)
                        this.$store.commit('saveLoginInfo', 'loginInfo', _data)
                        this.$store.commit('saveLoginInfo', 'userIdentity', this.IDENTITY[identityCode])

                        this.getUserBaseInfo()
                        this.getPermission().then((response) => {
                            if (response === true) {
                                window.location.href = `${this.pages.my.url}`
                            }
                        })
                    } else {
                        this.$message({ type: 'error', message: res.data.msg })
                    }
                })
            },
            // 去注册
            toRegister() {
                this.$router.push({ path: '/register', query: { unionid: this.$route.query.unionid, bindType: 1 } })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
$input-height: 40px;
$border-radius: 5px;
.bind-page {
	width: 400px;
	margin: 100px auto;

    .bind-tips {
        line-height: 1.5;
        font-size: 14px;
        margin-bottom: 15px;
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
            border-radius: $border-radius;
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
            border-bottom-left-radius: $border-radius;
    		border-top-left-radius: $border-radius;
        }
        .i-form-button {
            color: #fff;
            background-color: nth($default-color, 1);
            border-color: nth($default-color, 1);
            border-radius: $border-radius;
            margin-bottom: 15px;
            &:hover {
                background-color: nth($default-color, 2);
            }
        }
        .btn-gray {
        	background-color: #ccc;
            border-color: #ccc;
            margin-left: 0px;
        }
    }

    .prompt-tip {
        color: #f00;
        margin-bottom: 10px;
    }
}
</style>