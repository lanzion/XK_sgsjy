<template>
	<div class="bind-email bgw">
		<h4 class="head-tit">绑定手机</h4>
		<section class="form-box">
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <!-- 手机 -->
                <el-row>
                    <el-form-item label="手机" prop="phone">
                        <el-col :span="7">
                            <el-input placeholder="请输入手机" v-loading="loading" element-loading-text="验证码发送中..." v-model="form.phone"></el-input>
                        </el-col>
                        <el-col :span="8" class="valid">
                        	<a class="valid_btn disable_btn" href="javaScript:;" v-if="hadSend">{{second}}s 重新获取</a>
		  					<a class="valid_btn" href="javaScript:;" v-else @click.prevent="getMobileCode">获取验证码</a>
		  				</el-col>
                      </el-form-item>
                </el-row>
                <div class="send-tips" v-if="ifSend">验证码已发送至您的手机，请查收验证，并在5分钟内输入验证</div>
                <div class="send-tips" v-if="timeOut">验证码已过期，请重新获取验证码进行验证</div>
                <!-- 验证码 -->
                <el-row>
                    <el-form-item label="验证码" prop="validCode">
                        <el-col :span="10">
                            <el-input placeholder="请输入收到的验证码" v-loading="validLoading" element-loading-text="验证中..." v-model="form.validCode"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                <el-form-item>
                      <button class="psn-confirm-btn" @click.prevent="bindMobile">绑定</button>
                      <button class="psn-cancel-btn" @click.prevent="$router.go(-1)">取消</button>
                </el-form-item>
            </el-form>
		</section>
	</div>
</template>

<script>
    import { requestSendMobileCode, requestBindMobile } from '@/service/security.js'

    let timer = null

    export default {
        name: 'bind_email',
        data() {
            const validPhone = (rule, value, callback) => {
                const regular = /^[1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8}$/
                if (value === '') {
                    callback(new Error('请输入手机'))
                } else if (!regular.test(value)) {
                    callback(new Error('请输入正确格式的手机'))
                } else {
                    callback()
                }
            }
            return {
                loading: false,
                validLoading: false,
                form: {
                    phone: '',
                    validCode: ''
                },
                rules: {
                    phone: [
                        { validator: validPhone, required: true }
                    ],
                    validCode: [
                        { required: true, message: '请输入验证码' }
                    ],
                },
                second: 60,
                ifSend: false,
                timeOut: false,
                hadSend: false // 判断是否已发送验证码
            }
        },
        methods: {
            // 设置倒计时
            setTime() {
                const self = this
                timer = window.setInterval(function () {
                    if (self.second === 0) {
                        window.clearInterval(timer)
                        self.second = 60
                        self.hadSend = false
                    } else {
                        self.second--
                    }
                }, 1000)
            },
            // 提示信息倒计时隐藏
            setTimeOut() {
                const self = this
                window.setTimeout(function () {
                    self.ifSend = false
                    self.timeOut = true
                }, 600000)
            },
            // 获取手机验证码
            getMobileCode() {
                const regular = /^[1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8}$/
                if (this.form.phone === '') {
                    this.$message({
                        message: '请输入手机，再进行验证',
                        type: 'info'
                    })
                } else if (!regular.test(this.form.phone)) {
                    this.$message({
                        message: '请输入正确格式的手机',
                        type: 'info'
                    })
                } else {
                    this.loading = true
                    const params = {
                        phone: this.form.phone
                    }
                    this.ifSend = false
                    this.timeOut = false
                    requestSendMobileCode(params).then((res) => {
                        this.loading = false
                        if (res.data.code === 200) {
                            this.$message({
                                message: '验证码已发送至您的手机，请查收验证',
                                type: 'success'
                            })
                            this.ifSend = true
                            this.hadSend = true
                            this.setTime()
                            this.setTimeOut()
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            })
                        }
                    }, () => {
                        this.loading = false
                        this.$message({
                            message: '验证码发送失败，请重新验证',
                            type: 'error'
                        })
                    })
                }
            },
            // 绑定后设置本地存储
            changeLocalStorage() {
                const phone = this.form.phone
                const identity = this.$ls.get('userIdentity')
                const loginInfo = this.$ls.get('loginInfo')
                const baseInfo = this.$ls.get('baseInfo')
                loginInfo.userInfo.phone = phone
                baseInfo.baseInfo.phone = phone
                if (identity === 'student') {
                    baseInfo.student.phone = phone
                } else if (identity === 'teacher') {
                    baseInfo.teacher.phone = phone
                }
                localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
                localStorage.setItem('baseInfo', JSON.stringify(baseInfo))
            },
            bindMobile() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.validLoading = true
                        requestBindMobile({ code: this.form.validCode, phone: this.form.phone }).then((res) => {
                            this.validLoading = false
                            if (res.data.code === 200) {
                                this.$message({
                                    message: '成功绑定手机',
                                    type: 'success'
                                })
                                this.changeLocalStorage()
                                this.$router.go(-1)
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        this.$message({
                            message: '请按要求输入完整的表单信息',
                            type: 'info'
                        })
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .bind-email{
        .el-input__inner{
            height: 38px;
        }
    }
</style>

<style lang="scss" scoped>
	@import '~@/assets/css/scss/vars.scss';
    .bind-email{
        width: 100%;
        min-height: 741px;
        .head-tit {
            padding: 14px 15px;
            font-size: 16px;
            color: #3e3e3e;
            border-bottom: 1px solid #ccc;
        }
        .form-box{
	        margin-top: 15px;
	        padding: 15px;
	    }
    }

    .valid {
		line-height: 38px;
		.valid_btn {
			display: inline-block;
			margin-left: 14px;
			width: 94px;
			text-align: center;
			font-size: 14px;
			color: #fff;
			background-color: nth($default-color, 1);
			border-radius: 5px;
			&:hover {
				opacity: 0.75;
			}
		}
		.disable_btn {
            background-color: #bbb;
            cursor: no-drop;
        }
	}
	.send-tips {
		margin-left: 80px;
		margin-bottom: 10px;
	}
</style>