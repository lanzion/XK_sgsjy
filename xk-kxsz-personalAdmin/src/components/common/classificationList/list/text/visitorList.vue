<template>
	<ul v-if="datas.length > 0" class="visitor-list clearfix">
		<li v-for="(item,index) in datas" :style="{width: listWidth}" :key="index" class="list-item fl">
			<div class="avatar-box">
				<router-link :to="dynamicPath(item)">
					<img :src="getFileUrl(item.url) || faceDefault">
				</router-link>
				<p class="user-name">{{item.userName}}</p>
			</div>
			<div class="date-box">{{item.createDate | dateFormat('MM月dd日')}}</div>
		</li>
	</ul>
	<div v-else class="empty-block">暂无访客</div>
</template>

<script>
	export default {
		name:'visitor_list',
		components:{},
		data() {
			return{
			}
		},
		props:{
			datas:{
				type: Array,
				default (){
					return []
				}
			}
		},
		computed: {
	        listWidth: function() {
	            return this.getWidth(4)
	        }
	    },
	}
</script>

<style lang="scss" scoped>
	*{
		box-sizing: border-box;
	}
	.visitor-list{
		width: 100%;
		padding: 0px 10px 10px;
		.list-item{
			font-size: 12px;
			line-height: 20px;
			text-align: center;
			margin-top: 15px;
			.avatar-box{
				position: relative;
				height: 50px;
				img{
					width: 50px;
					height: 50px;
					border-radius: 1000px;
				}
				.user-name{
					position: absolute;
					bottom: 0;
					left: 50%;
					width: 50px;
					transform: translate(-50%,0);
					-ms-transform: translate(-50%,0);		/* IE 9 */
					-webkit-transform: translate(-50%,0);	/* Safari and Chrome */
					-o-transform: translate(-50%,0);		/* Opera */
					-moz-transform: translate(-50%,0);		/* Firefox */
					background-color: rgba(0,0,0,0.5);
					color: #fff;
					display: none;
				}
			}
			.date-box{
				width: 100%;
			}
		}
		.list-item:hover{
			.user-name{
				display: block;
			}
		}
	}
</style>