<template>
    <el-dialog :visible.sync="visible.show" class="feedback-dialog" title="意见反馈" @close="close">
        <!-- <header class="dialog-head">意见反馈</header> -->
        <section class="form-box">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            	<!-- 反馈内容 -->
                <el-row>
                    <el-form-item label="反馈内容" prop="content">
                        <el-col :span="24">
                            <el-input type="textarea" :maxlength="200" placeholder="请输入反馈内容，最多200字符" v-model="form.content"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                <!-- 反馈邮箱 -->
                <el-row>
                    <el-form-item label="反馈邮箱" prop="mail">
                        <el-col :span="18">
                            <el-input :maxlength="50" placeholder="请输入反馈邮箱" v-model="form.mail"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                <el-row>
                	<el-form-item label="验证码" prop="code">
                		<el-col :span="18">
                			<el-input placeholder="请输入验证码" @blur="codeVerify" class="verify-input" v-model="form.code"></el-input>
                			<div title="看不清？换一张" id="v_container" class="v-container"></div>
                		</el-col>
                		<div style="position:absolute;font-size:12px;bottom:-15px;color:#d00;" v-if="verifyError">
	                      	{{verifyTips}}
	                    </div>
                	</el-form-item>
                </el-row>
            </el-form>
        </section>
        <div class="buttonGroup clearfix">
            <a class="btn cancel-btn" @click="cancel">取消</a>
            <a class="btn confirm-btn" @click="submit">提交</a>
        </div>
    </el-dialog>
</template>

<script>
    import { addFeedback } from '@/service/help.js'
    import { GVerify } from 'Asset/js/verify.js'

    let verifyCode

    export default {
        name: 'add_feedback',
        data() {
            const validateEmail = (rule, value, callback) => {
                const regular = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
                if (value === '') {
                    callback(new Error('请输入电子邮箱'))
                } else if (!regular.test(value)) {
                    callback(new Error('请输入正确格式的电子邮箱'))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    content: '',
                    mail: '',
                    code: '',
                },
                rules: {
                    mail: [
                        { validator: validateEmail, required: true, trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请填写反馈内容', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码' }
                    ]
                },
                verifyError: false,
                verifyTips: ''
            }
        },
        props: {
            visible: {
                type: Object,
                default() {
                    return {
                        show: false
                    }
                }
            }
        },
        watch: {
            'visible.show': {
                handler: function (val) {
                    if (val) {
                        window.setTimeout(() => {
                        // 验证码实例化
                            verifyCode = new GVerify({
                                id: 'v_container'
                            })
                        }, 100)
                    }
                }
            }
        },
        methods: {
            codeVerify() {
                if (this.form.code.trim()) {
                    const self = this
                    const res = verifyCode.validate(self.form.code.trim())
                    if (res) {
                        this.verifyError = false
                        this.verifyTips = ''
                    } else {
                        this.verifyError = true
                        this.verifyTips = '验证码错误'
                    }
                }
            },
            // 关闭弹窗重置表单
            close() {
                this.$refs.form.resetFields()
                this.form.code = ''
                this.verifyError = false
            },
            cancel() {
                this.visible.show = false
                this.$refs.form.resetFields()
                this.form.code = ''
                this.verifyError = false
            },
            // 提交反馈
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid && this.verifyError === false) {
                        const params = Object.assign({}, this.form)
                        this.$set(params, 'replyStatus', 0)
                        this.$set(params, 'replyContent', '')
                        addFeedback(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({ type: 'success', message: '反馈成功，谢谢您的反馈' })
                                this.$refs.form.resetFields()
                                this.visible.show = false
                                this.form.code = ''
                                this.verifyError = false
                                this.$emit('callback')
                            } else {
                                this.$message({ type: 'error', message: res.data.msg })
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    .feedback-dialog{
        .dialog-head{
            padding: 18px 15px;
            border-bottom: 1px solid #c9c9c9;
        }
        .form-box{
            padding: 15px;
            .v-container{
            	width: 100px;
            	height: 38px;
            	margin-left: 10px;
            	display: inline-block;
            }
        }
        .buttonGroup{
            text-align: right;
            padding: 5px 15px 30px;
            .btn{
                display: inline-block;
                border-radius: 3px;
                font-size: 12px;
            }
            .cancel-btn{
                padding: 7px 14px;
                margin-right: 10px;
            }
            .confirm-btn{
                padding: 8px 15px;
            }
        }
    }

    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .feedback-dialog{
                .buttonGroup{
                    .cancel-btn{
                        border:1px solid $color-value;
                        color: $color-value;
                        &:hover{
                            color: #fff;
                            background-color: $color-value;
                        }
                    }
                    .confirm-btn{
                        background: $color-value;
                        color: #fff;
                        &:hover{
                            opacity: 0.75;
                        }
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .feedback-dialog{
        .el-dialog__body{
            padding: 0px;
        }
        .el-textarea__inner{
            height: 102px;
            border-radius: 4px;
            &:hover,&:focus{
            	border-color: #2797ed;
            }
        }
        .el-input__inner{
            height: 38px;
            border-radius: 3px;
            &:hover,&:focus{
            	border-color: #2797ed;
            }
        }
        .el-col{
        	.verify-input{
        		width: 50%;
        		vertical-align: top;
        	}
        }
    }
</style>