<template>
	<div id="set_account" class="bgw admin-list-head">
		<div>
			<v-tabs :tabs="tabs"></v-tabs>
		</div>
		<section class="set-account">
			<ul>
				<li class="clearfix" v-for="(item,index) in datas" :key="index">
					<span class="type">{{item.type}}</span>
					<span>{{item.content}}</span>
					<router-link :to="{path: item.linkTo}" class="fr">{{item.btn}}</router-link>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
	import tabs from 'Common/classificationList/classification/tabs.vue'
	export default {
		name: 'set_account',
		components: {
			'v-tabs': tabs,
		},
		data() {
			return {
				tabs: [
		          	{ name: '账号设置', type: ''}
		        ],
		        datas: [
		        	{ type: '密码设置', content: '建议您定期更改密码以保护账号安全', btn: '立即修改', linkTo:'/admin/security/modifyPwd' },
		        	// { type: '手机绑定', content: '您还没绑定手机，建议绑定手机更安全', btn: '立即绑定', linkTo:'' },
		        	// { type: '邮箱绑定', content: '您还没绑定邮箱，建议绑定邮箱更安全', btn: '立即绑定', linkTo:'' }
		        ]
			}
		},
		methods: {
		}
	}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
	*{
		box-sizing: border-box;
	}
	#set_account{
		width: 100%;
		min-height: 741px;
	}
	.set-account{
		padding:0px 18px 20px;
		ul{
			li{
				padding: 20px 0;
				border-bottom: 1px dashed #c9c9c9;
				line-height: 35px;
				span{
					font-size: 14px;
				}
				.type{
					color: #b3b3b3;
					margin-right: 35px;
				}
				a{
					padding: 0px 30px;
					font-size: 14px;
					color: $default-color;
					border:1px solid $default-color;
					&:hover{
						color: #fff;
						background-color: $default-color;
					}
				}
			}
		}
	}
</style>

<style lang="scss">
	#set_account{
		.tabs-bar-header{
			margin-bottom: 0px;
		}
	}
</style>