<template>
	<div id="publisherMsg">
		<div class="avatar" :style="{backgroundImage: `url(${bgDefault})`}">
			<router-link :to="dynamicPath({identity:user.identity, orgId: user.baseId, userId: user.id})">
				<img :src="getFileUrl(user.face) || faceDefault">
			</router-link>
		</div>
		<div class="author-name">
			<p class="name">发布者：{{ user.userName }}</p>
			<p class="phone">联系电话：{{ user.phone || 'ta没留下电话'}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name:'publisherMsg',
		data () {
			return {
				item: {},
				identity: 'student'
			}
		},
		props: {
			user:{
				type:Object,
				default () {
					return {
						identity: '',
						baseId: '',
						id: ''
					}
				}
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
*{
	box-sizing: border-box;
}
#publisherMsg{
	width: 100%;
	// border: 1px solid #ccc;
	padding: 0 0 16px;
	text-align: center;
	line-height: 24px;
	// 作者头像
	.avatar{
		$header-size: 64px;
		position: relative;
		width: 100%;
		height: 50px;
		// background: url('~@/asset/img/moment/publisher_bg.png') 0 0 no-repeat;
		background-position: 0 0;
		background-repeat: no-repeat;
		background-size: cover;
		margin-bottom: $header-size/2;
		img {
			position: absolute;
			left: 50%;
			width: $header-size;
			height: $header-size;
			bottom: 0;
			transform: translate(-50%, 50%);
			border-radius: 50%;
		}
	}
	// 名字，电话
	.author-name{
		margin: 0 16px 5px;
		.name{
			font-size: 14px
		}
		.phone{
			font-size: 12px;
			height: 25px;
			width: 100%;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
}
</style>