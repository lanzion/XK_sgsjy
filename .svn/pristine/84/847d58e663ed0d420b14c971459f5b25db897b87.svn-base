<template>
	<div class="find_by_email">
		<div class="tips-box">
			<i class="icon-form-tip"></i>
			<span> 请输入您需要设置的新密码</span>
		</div>
		<section class="form-box">
			<el-form ref="form" :model="form" label-width="100px" :rules="rules">
				<el-form-item label="设置新密码" prop="newPwd">
					<el-col :span="23">
    					<el-input v-model="form.newPwd" type="password" placeholder="请设置新密码"></el-input>
    				</el-col>
  				</el-form-item>
                <el-form-item label="确认新密码" prop="confirmPwd">
                    <el-col :span="23">
                        <el-input v-model="form.confirmPwd" type="password" placeholder="请输入和上面相同的密码"></el-input>
                    </el-col>
                </el-form-item>
  				<el-form-item label="验证码" prop="code">
  					<el-col :span="23">
      					<el-input v-model="form.code" placeholder="请输入收到的验证码"></el-input>
    				</el-col>
  				</el-form-item>
  				<el-form-item>
  					<button class="send-btn" @click.prevent="confirmSet">确定</button>
  				</el-form-item>
			</el-form>
		</section>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import encrypt from 'jsencrypt'
    import { requestPublishKey, resetPwdByEmail, resetPwdByMobile } from '@/service/common.js'

    const JSEncrypt = encrypt.JSEncrypt.prototype

    export default {
        name: 'find_by_email',
        data() {
            const validateRePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.form.newPwd) {
                    callback(new Error('两次输入密码不一致！'))
                } else {
                    callback()
                }
            }
            const validatePwd = (rule, value, callback) => {
                const regular = /^(?=.*[a-z|A-Z])(?=.*\d)[^]{8,16}$/
                if (value === '') {
                    callback(new Error('请输入新密码'))
                } else if (!regular.test(value)) {
                    callback(new Error('密码必须由 8 到 16 位的字母、数字组成'))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    newPwd: '',
                    confirmPwd: '',
                    code: ''
                },
                rules: {
                    newPwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                        { validator: validatePwd, required: true, trigger: 'blur' }
                    ],
                    confirmPwd: [
                        { validator: validateRePwd, required: true, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码' }
                    ]
                }
            }
        },
        props: ['findWay'],
        computed: {
            ...mapState({
                validAccount: state => state.getBackPwd.email
            })
        },
        mounted() {
            this.getPublishKey()
        },
        methods: {
            async getPublishKey() {
                const res = await requestPublishKey()
                if (res.data.code === 200) {
                    JSEncrypt.setPublicKey(res.data.entity)
                }
            },
            // 确定
            confirmSet() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const handle = this.findWay === 0 ? resetPwdByEmail : resetPwdByMobile
                        const keys = this.findWay === 0 ? 'email' : 'phone'
                        const params = {
                            newPsw: this.form.newPwd.trim(),
                            validCode: this.form.code,
                            [keys]: this.validAccount
                        }
                        handle(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({
                                    message: '新密码设置成功',
                                    type: 'success'
                                })
                                this.$emit('setStep', 4)
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
	.form-box {
		.el-input__inner {
			height: 38px;
			line-height: 38px;
		}
	}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .find_by_email {
    	width: 100%;
    	height: 460px;
    	margin: 0 auto;
    	padding-top: 40px;
    	box-sizing: border-box;
    	.tips-box {
    		width: 430px;
    		text-align: center;
    		margin: 20px auto;
    		font-size: 12px;
    		color: #818181;
    		line-height: 14px;
    		i {
    			font-size: 18px;
    			vertical-align: text-top;
    		}
    	}
    	.form-box {
    		width: 430px;
    		margin: 0 auto;
    		.verify-box,.refresh {
    			margin-left: 15px;
    		}
    		.verify-box {
    			height: 38px;
    			line-height: 38px;
    			padding: 0 5px;
    			background-color: #ccc;
    			color: #d00;
    		}
    		.refresh {
    			i {
    				cursor: pointer;
    			}
    		}
    	}
    	.send-btn {
    		padding: 8px 20px;
    		border-radius: 5px;
    		background-color: nth($default-color, 1);
    		color: #fff;
    		font-size: 14px;
    		&:hover {
    			background-color: nth($default-color,2);
    		}
    	}
    }
</style>