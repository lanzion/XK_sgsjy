<template>
	<div class="find_by_email">
		<div class="tips-box">
			<i class="icon-form-correct"></i>
			<p class="success-tips">恭喜您！密码已重新设置！</p>
		</div>
		<section class="notices">
            <p class="">为了您的账号安全，请妥善保管密码</p>
            <p class="">页面将在 <span class="sec">{{seconds}}s</span> 后自动跳转</p>
        </section>
        <div class="btn-box">
            <router-link class="send-btn" :to="{ path: '/login' }">立即登录</router-link>
        </div>
	</div>
</template>

<script>
    export default {
        name: 'find_by_email',
        data() {
            return {
                seconds: 5
            }
        },
        mounted() {
            this.setSeconds()
        },
        methods: {
            setSeconds() {
                const self = this
                const timer = window.setInterval(function () {
                    self.seconds--
                    if (self.seconds === 0) {
                        window.clearInterval(timer)
                        self.$router.push({ path: '/login' })
                    }
                }, 1000)
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
            .success-tips {
                color: #2cbb61;
                font-size: 20px;
                margin-top: 24px;
            }
    		i {
                color: #2cbb61;
    			font-size: 82px;
    			vertical-align: text-top;
    		}
    	}
        .notices {
            width: 100%;
            text-align: center;
            font-size: 14px;
            line-height: 2em;
            margin-bottom: 20px;
            .sec {
                color: nth($default-color, 1),
            }
        }
        .btn-box {
            text-align: center;
            height: 50px;
            line-height: 50px;
        }
    	.send-btn {
    		padding: 15px 25px;
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