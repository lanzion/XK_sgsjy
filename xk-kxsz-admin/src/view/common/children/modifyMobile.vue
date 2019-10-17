<template>
	<div class="modify-email">
        <v-tabs :tabs="[{name: '修改手机'}]" ></v-tabs>
		<section class="form-box">
			<el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-row>
                    <el-form-item label="已绑定手机">
                        <el-col :span="20" class="clearfix">
                            <span class="email fl">{{phone}}</span>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 手机 -->
                <el-row>
                    <el-form-item label="新手机" prop="phone">
                        <el-col :span="7">
                            <el-input placeholder="请输入新的手机" v-loading="loading" element-loading-text="验证码发送中" v-model="form.phone"></el-input>
                        </el-col>
                        <el-col :span="3" class="valid">
                            <a class="valid_btn disabled" href="javaScript:;" v-if="hadSend">{{second}}S重新发送</a>
		  					<a class="valid_btn" href="javaScript:;" v-else @click.prevent="getMobileCode">获取验证码</a>
		  				</el-col>
                      </el-form-item>
                </el-row>
                <div class="send-tips" v-if="ifSend">验证码已发送至您的手机，请查收验证，并在10分钟内输入验证</div>
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
                      <button type="button" class="bs-form-button i-form-button" @click.prevent="modifyMobile">绑定</button>
                      <button type="button" class="bs-form-button i-form-button is-plain" @click.prevent="cancel">取消</button>
                </el-form-item>
            </el-form>
		</section>
	</div>
</template>

<script>
    import tabs from '@/components/common/tabs.vue'
    import { requestSendMobileCode, requestBindMobile } from '@/service/security.js'

    let timer = null

    export default {
        name: 'modify_email',
        components: {
            'v-tabs': tabs
        },
        data() {
            const validMobile = (rule, value, callback) => {
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
                        { validator: validMobile, required: true }
                    ],
                    validCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                },
                phone: this.$ls.get('loginInfo').userInfo.phone,
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
            // 获取旧手机验证码
            // getOldEmailCode() {
            //     this.ifSend = false
            //     this.timeOut = false
            //     this.loading = true
            //     requestEmailCodeMod({}).then((res) => {
            //         this.loading = false
            //         if (res.data.code === 200) {
            //             this.$message({
            //                 message: '验证码已发送至您的手机，请查收验证',
            //                 type: 'success'
            //             })
            //             this.ifSend = true
            //             this.hadSend = true
            //             this.setTime()
            //             this.setTimeOut()
            //         } else {
            //             this.$message({
            //                 message: res.data.msg,
            //                 type: 'error'
            //             })
            //         }
            //     }, () => {
            //         this.loading = false
            //         this.$message({
            //             message: '验证码发送失败，请重新验证',
            //             type: 'error'
            //         })
            //     })
            // },
            // validOldEmail() {
            //     this.$refs.form1.validate((valid) => {
            //         if (valid) {
            //             this.validLoading = true
            //             requestBindMobile({ validCode: this.form1.validCode }).then((res) => {
            //                 this.validLoading = false
            //                 if (res.data.code === 200) {
            //                     this.$message({
            //                         message: '成功验证手机',
            //                         type: 'success'
            //                     })
            //                     this.newVisible = true
            //                     this.second = 60
            //                     this.hadSend = false
            //                     window.clearInterval(timer)
            //                 } else {
            //                     this.$message({
            //                         message: res.data.msg,
            //                         type: 'error'
            //                     })
            //                 }
            //             })
            //         } else {
            //             this.$message({
            //                 message: '请按要求输入完整的表单信息',
            //                 type: 'info'
            //             })
            //             return false
            //         }
            //     })
            // },
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
                    const params = {
                        phone: this.form.phone
                    }
                    this.loading = true
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
            // 修改后设置本地存储
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
            modifyMobile() {
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
            },
            cancel() {
                this.$refs['form'].resetFields()
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