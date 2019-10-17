<template>
	<div class="find_by_email">
		<div class="tips-box">
			<i class="icon-form-tip"></i>
			<span> 验证码已发送至您的{{validType}} <span class="email">{{validAccount}}</span>，请点击下一步进行密码的设置</span>
		</div>
		<section class="form-box">
            <button class="send-btn" @click="toNext">下一步</button>
            <a class="had-send" href="javaScript:;" v-if="hadSend">{{second}}s后重新发送验证码</a>
			<a class="re-send" href="javaScript:;" @click="getCode" v-else>重新发送验证码</a>
		</section>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import { getBackPwdSendEmail, requestSendMobileCode } from '@/service/common.js'

    let timer = null

    export default {
        name: 'find_by_email',
        data() {
            return {
                hadSend: true,
                second: 120,
                validType: '邮箱',
                handle: null,
                keys: ''
            }
        },
        props: ['findWay'],
        computed: {
            ...mapState({
                validAccount: state => state.getBackPwd.email
            })
        },
        mounted() {
            this.setTime()
            if (this.findWay === 0) {
                this.validType = '邮箱'
                this.handle = getBackPwdSendEmail
                this.keys = 'email'
            } else {
                this.validType = '手机'
                this.handle = requestSendMobileCode
                this.keys = 'phone'
            }
        },
        methods: {
            // 设置倒计时
            setTime() {
                const self = this
                timer = window.setInterval(function () {
                    if (self.second === 0) {
                        window.clearInterval(timer)
                        self.second = 120
                        self.hadSend = false
                    } else {
                        self.second--
                    }
                }, 1000)
            },
            // 下一步
            toNext() {
                this.$emit('setStep', 3)
            },
            getCode() {
                this.handle({ [this.keys]: this.validAccount }).then((res) => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '验证码发送成功',
                            type: 'success'
                        })
                        this.$emit('setStep', 3)
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        })
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
    		width: 450px;
    		text-align: center;
    		margin: 20px auto;
    		font-size: 12px;
    		color: #818181;
    		line-height: 14px;
    		i {
    			font-size: 18px;
    			vertical-align: text-top;
    		}
            .email {
                color: nth($default-color, 1),
            }
    	}
    	.form-box {
    		width: 450px;
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
    		padding: 8px 15px;
    		border-radius: 5px;
    		background-color: nth($default-color, 1);
    		color: #fff;
    		font-size: 14px;
    		&:hover {
    			background-color: nth($default-color,2);
    		}
    	}
        .had-send {
            margin-left: 15px;
        }
        .re-send {
            margin-left: 15px;
            &:hover {
                color: $theme-color;
            }
        }
    }
</style>