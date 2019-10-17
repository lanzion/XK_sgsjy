<template>
	<div class="qrcode-wrap" @click="close">
		<div class="qrcode-box-wrap bgw" @click="clickStop">
			<span class="close-btn" @click="close">x</span>
			<div class="qrcode-box" id="js-wx-login">
			</div>
		</div>
	</div>
</template>

<script>

    export default {
        name: 'xk-wx-qrcode',
        data() {
            return {}
        },
        mounted() {
            const loc = window.location
            const wxLogin = new WxLogin({
                self_redirect: '',
                id: 'js-wx-login',
                appid: 'wxf7981aa34fab5a38',
                scope: 'snsapi_login',
                redirect_uri: encodeURIComponent('http://www.xk100.com/#/bufferPage'),
                state: '',
                style: 'black'
            })
        },
        methods: {
            close() {
                this.$emit('close')
            },
            // 阻止点击冒泡
            clickStop(evt) {
                evt.stopPropagation()
            }
        }
    }
</script>

<style lang="scss" scoped>
	.qrcode-wrap {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.5);
		.qrcode-box-wrap {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 20px;
			border-radius: 10px;
			.close-btn {
				position: absolute;
				top: 10px;
				right: 10px;
				display: inline-block;
				width: 18px;
				height: 18px;
				text-align: center;
				line-height: 15px;
				font-size: 18px;
				color: #999;
				cursor: pointer;
				&:hover {
					background-color: #eee;
				}
			}
		}
	}
</style>