<template>
	<div class="modify-email">
        <v-tabs :tabs="[{name: '修改邮箱'}]" ></v-tabs>
        <section class="form-box" v-if="!newVisible">
            <!-- <div class="head-tip">验证已绑定邮箱</div> -->
            <el-form ref="form1" :model="form1" label-width="100px" :rules="rules">
                <!-- 邮箱 -->
                <el-row>
                    <el-form-item label="已绑定邮箱">
                        <el-col :span="20" class="clearfix">
                            <span class="email fl">{{email}}</span>
                            <div class="valid fl">
                                <a class="valid_btn disable_btn" href="javaScript:;" v-if="hadSend">{{second}}S重新发送</a>
                                <a class="valid_btn" href="javaScript:;" v-else @click.prevent="getOldEmailCode">验证身份</a>
                            </div>
                        </el-col>
                      </el-form-item>
                </el-row>
                <div class="send-tips" v-if="ifSend">验证码已发送至您的邮箱，请查收验证，并在10分钟内输入验证</div>
                <div class="send-tips" v-if="timeOut">验证码已过期，请重新获取验证码进行验证</div>
                <!-- 验证码 -->
                <el-row>
                    <el-form-item label="验证码" prop="validCode">
                        <el-col :span="10">
                            <el-input placeholder="请输入收到的验证码" v-loading="validLoading" element-loading-text="验证中..." v-model="form1.validCode"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                <el-form-item>
                    <button type="button" class="bs-form-button i-form-button" @click.prevent="validOldEmail">验证</button>
                    <button type="button" class="bs-form-button i-form-button is-plain" @click.prevent="cancel('form1')">取消</button>
                </el-form-item>
            </el-form>
        </section>

		<section class="form-box" v-if="newVisible">
            <!-- <div class="head-tip">绑定新邮箱</div> -->
			<el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <!-- 邮箱 -->
                <el-row>
                    <el-form-item label="新邮箱" prop="email">
                        <el-col :span="7">
                            <el-input placeholder="请输入新的邮箱" v-loading="loading" element-loading-text="验证码发送中" v-model="form.email"></el-input>
                        </el-col>
                        <el-col :span="3" class="valid">
                            <a class="valid_btn disabled" href="javaScript:;" v-if="hadSend">{{second}}S重新发送</a>
		  					<a class="valid_btn" href="javaScript:;" v-else @click.prevent="getEmailCode">获取验证码</a>
		  				</el-col>
                    </el-form-item>
                </el-row>
                <div class="send-tips" v-if="ifSend">验证码已发送至您的邮箱，请查收验证，并在10分钟内输入验证</div>
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
                    <button type="button" class="bs-form-button i-form-button" @click.prevent="modifyEmail">绑定</button>
                    <button type="button" class="bs-form-button i-form-button is-plain" @click.prevent="cancel('form')">取消</button>
                </el-form-item>
            </el-form>
		</section>
	</div>
</template>

<script>
    import tabs from '@/components/common/tabs.vue'
    import { requestEamilValidCode, validEmailCode, requestEmailCodeMod } from '@/service/security.js'

    let timer = null

    export default {
        name: 'modify_email',
        components: {
            'v-tabs': tabs
        },
        data() {
            const validEmail = (rule, value, callback) => {
                const regular = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
                if (value === '') {
                    callback(new Error('请输入电子邮箱'))
                } else if (!regular.test(value)) {
                    callback(new Error('请输入正确格式的电子邮箱'))
                } else {
                    callback()
                }
            }
            return {
                loading: false,
                validLoading: false,
                form: {
                    email: '',
                    validCode: ''
                },
                rules: {
                    email: [
                        { validator: validEmail, required: true }
                    ],
                    validCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                },
                email: this.$ls.get('loginInfo').userInfo.email,
                form1: {
                    validCode: ''
                },
                newVisible: false,
                second: 60,
                ifSend: false,
                timeOut: false,
                hadSend: false // 判断是否已发送验证码
            }
        },
        methods: {
            setTime() {
                const self = this
                timer = window.setInterval(function () {
                    if (self.second === 0) {
                        window.clearInterval(timer)
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
            // 获取旧邮箱验证码
            getOldEmailCode() {
                this.ifSend = false
                this.timeOut = false
                this.loading = true
                requestEmailCodeMod({}).then((res) => {
                    this.loading = false
                    if (res.data.code === 200) {
                        this.$message({
                            message: '验证码已发送至您的邮箱，请查收验证',
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
            },
            validOldEmail() {
                this.$refs.form1.validate((valid) => {
                    if (valid) {
                        this.validLoading = true
                        validEmailCode({ validCode: this.form1.validCode }).then((res) => {
                            this.validLoading = false
                            if (res.data.code === 200) {
                                this.$message({
                                    message: '成功验证邮箱',
                                    type: 'success'
                                })
                                this.newVisible = true
                                this.second = 60
                                this.hadSend = false
                                window.clearInterval(timer)
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
            },
            // 获取邮箱验证码
            getEmailCode() {
                const regular = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
                if (this.form.email === '') {
                    this.$message({
                        message: '请输入邮箱，再进行验证',
                        type: 'info'
                    })
                } else if (!regular.test(this.form.email)) {
                    this.$message({
                        message: '请输入正确格式的电子邮箱',
                        type: 'info'
                    })
                } else {
                    const params = {
                        email: this.form.email
                    }
                    this.loading = true
                    this.ifSend = false
                    this.timeOut = false
                    requestEamilValidCode(params).then((res) => {
                        this.loading = false
                        if (res.data.code === 200) {
                            this.$message({
                                message: '验证码已发送至您的邮箱，请查收验证',
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
            // 修改后设置本地存储
            changeLocalStorage() {
                const email = this.form.email
                const identity = this.$ls.get('userIdentity')
                const loginInfo = this.$ls.get('loginInfo')
                const baseInfo = this.$ls.get('baseInfo')
                loginInfo.userInfo.email = email
                baseInfo.baseInfo.email = email
                if (identity === 'student') {
                    baseInfo.student.email = email
                } else if (identity === 'teacher') {
                    baseInfo.teacher.email = email
                }
                localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
                localStorage.setItem('baseInfo', JSON.stringify(baseInfo))
            },
            modifyEmail() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.validLoading = true
                        validEmailCode({ validCode: this.form.validCode }).then((res) => {
                            this.validLoading = false
                            if (res.data.code === 200) {
                                this.$message({
                                    message: '成功绑定邮箱',
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
            },
            cancel(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    .valid {
        padding-left: 14px;
        line-height: 32px;
        text-align: right;
        .valid_btn {
            display: inline-block;
            margin-left: 14px;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #fff;
            background-color: nth($default-color, 1);
            border-radius: 5px;
            &:hover {
                opacity: 0.75;
            }
            &.disabled {
                background-color: #bbb;
                cursor: no-drop;
            }
        }
    }
    .send-tips {
        margin-left: 80px;
        margin-bottom: 10px;
    }
</style>