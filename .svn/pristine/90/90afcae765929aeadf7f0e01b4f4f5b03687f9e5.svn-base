<template>
	<div id="side_tools">
		<aside id="tools-bar">
			<ul>
		        <li class="tool-bar-item">
		           	<a class="icon-btn-top" href="javascript:;" @click="scrollToTop"></a>
		        </li>
		        <!-- <li class="tool-bar-item">
		          	<a class="icon-btn-app pr" href="javascript:;">
		            	<img class="qr-code pa" src="~res/images/download_qr_code.png" width="160" height="174">
		          	</a>
		        </li> -->
		        <li class="tool-bar-item">
		          	<a class="icon-btn-feedback" href="javascript:;" @click="openDialog"></a>
		        </li>
	      	</ul>
		</aside>
		<add-feedback :visible="visible"></add-feedback>
	</div>
</template>

<script>
	import addFeedback from './add_feedback.vue'
	export default {
		name:'tools-bar',
		components:{
			addFeedback
		},
		data () {
			return {
				visible:{
					show:false
				}
			}
		},
		methods:{
			scrollToTop () {
	            $('html,body').animate({scrollTop: '0px'}, 300);
	        },
	        openDialog () {
	        	this.visible.show = true
	        	// if(this.$ls.get('loginInfo')){
	        	// 	this.visible.show = true
	        	// }else{
	        	// 	this.$store.commit('toggleLoginModal', true);
	        	// }
	        }
		}
	}
</script>

<style lang="scss">
	#side_tools{
		.el-dialog{
			width: 580px;
		}
	}
</style>

<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
	.pr{position: relative;}
	.pa{position: absolute;}
	/*侧边工具条*/
	#tools-bar{
		position: fixed;
		right: 30px;
		bottom: 17%;
    	z-index: 2000;
    	transform: translateZ(0);

		$size: 40px;
		.tool-bar-item{
			margin-bottom: 10px;
			[class^="icon-btn-"],
			[class*=" icon-btn-"] {
				display: block;
				width: $size;
				height: $size;
				background-color: #ccc;
				color: #fff;
				font-size: 24px;
				line-height: $size;
				text-align: center;
				&:hover{
					background-color: $default-color;
					line-height: 12px;
					&::before {
						font-size: 14px;
					}
				}
			}
			.icon-btn-top:hover{
				&::before {
					content: "返回\A顶部";
					font-size: 12px;
				}
			}
			.icon-btn-app{
				font-size: 26px;
				.qr-code{
					display: none;
					left: -166px;
					top: -68px;
				}
				&:hover{
					&::before {
						content: "下载\A APP";
						font-size: 12px;
					}
					.qr-code{
						display: block;
					}
				}
			}
			.icon-btn-feedback:hover{
				&::before {
					content: "意见\A反馈";
					font-size: 12px;
				}
			}
		}
	}
</style>