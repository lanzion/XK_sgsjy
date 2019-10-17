<template>
	<div id="publisher_msg">
		<div class="avatar" :style="{backgroundImage: `url(${bgDefault})`}">
			<router-link :to="dynamicPath({ identity: identity == 'teacher' ? '1' : '0', orgId: item.id, userId: item.userId })">
				<img :src="getFileUrl(item.face) || faceDefault">
			</router-link>
		</div>
		<div class="author-name">
			<p class="name">发布者：{{ item.name || '暂无' }}</p>
			<p class="motto">
				联系电话：
				<span v-if="hadLogin">{{ item.phone || 'ta没留下电话'}}</span>
				<span v-else>{{item.phone | phoneFormat}}</span>
			</p>
		</div>
		<div class="btn-box" v-if="createId && userId != createId">
			<button class="i-btn" disabled v-if="hadInvite"></i>已邀约</button>
			<button class="i-button" @click="showInviteDialog" v-else-if="!hadLogin || userIdentity == 'student' || userIdentity == 'teacher'"><i class="icon-btn-i-add"></i>邀约</button>
		</div>
		<invite-add :visible="visible" @callback="addSuccess"></invite-add>
	</div>
</template>

<script>
	import inviteAdd from 'components/businessPlan/invite_add.vue'
	import { loginInfo } from '@/js/getUserInfo.js'
	import { requestUserBaseInfo } from '@/service/common.js'
	import { requestIsInvite } from '@/service/businessPlan.js'
	export default {
		name:'publisher_msg',
		data () {
			return {
				visible:{
					show:false
				},
				item: {},
				identity: 'student',
				userIdentity:'',
				userId:'',
				hadLogin:false,
				hadInvite:false
			}
		},
		components:{
			inviteAdd
		},
		props: {
			'createId': {
				type: String,
                default() {
                    return ''
                }
			}
		},
		created(){
			if(this.$ls.get('userIdentity')){
				this.userIdentity = this.$ls.get('userIdentity')
			};
			if(this.$ls.get('loginInfo')){
				this.hadLogin = true
				this.userId = this.$ls.get('loginInfo').userInfo.id
			}
		},
		watch: {
			createId(val) {
				if (val) {
					this.getUserInfo();
				};
			}
		},
		mounted() {
			// this.getUserInfo();
			this.judgeInvite()
		},
		methods: {
			getUserInfo() {
				// console.log(this.createId)
				requestUserBaseInfo({ userId: this.createId }).then(response => {
					if (response.data.code == 200) {
						let _data = response.data.appendInfo;
						let identity = Object.keys(_data).includes('teacher') ? 'teacher' : 'student';
						this.identity = identity;
						_data[identity].schoolName = _data[identity].schoolName || _data['school'].schoolName;
						this.item = _data[identity]
					}
				})
			},
			addSuccess(){
				this.$emit('inviteAdd')
				this.hadInvite = true
			},
			// 判断是否已邀约
			judgeInvite(){
				if(this.$ls.get('loginInfo')){
					let params = {
						businessPlanId: this.$route.query.id,
						seduceId: this.userId
					};
					requestIsInvite(params).then((res) => {
						if(res.data.code == 200){
							this.hadInvite = res.data.entity
						}
					})
				}
			},
			// 打开邀约弹窗
			showInviteDialog(){
				if(this.hadLogin){
					this.visible.show = true
				}else{
					this.$store.commit('toggleLoginModal', true);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
*{
	box-sizing: border-box;
}
#publisher_msg{
	width: 100%;
	padding: 0 0 16px;
	text-align: center;
	line-height: 24px;
	// 作者头像
	.avatar{
		$header-size: 50px;
		position: relative;
		width: 100%;
		height: 50px;
		// background: url('~@/asset/img/moment/publisher_bg.png') 0 0 no-repeat;
		background-repeat: no-repeat;
		background-position: 0 0;
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
	// 名字，座右铭
	.author-name{
		margin: 0 16px 5px;
		.name{
			font-size: 14px
		}
		.motto{
			font-size: 12px;
			height: 25px;
			width: 100%;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
	// 学校，关注，粉丝
	.author-msg{
		font-size: 12px;
		margin-bottom: 5px;
		.focus{
			color: #999;
		}
	}
	// 按钮盒子
	.btn-box {
		.i-btn,.i-button{
			font-size: 12px;
			line-height: 2;
			border: 1px solid #ccc;
			padding: 0px 1.5em;

			[class*="icon-btn-"],
			[class*=" icon-btn-"] {
				vertical-align: baseline;
			}
		}
		.i-btn{
			cursor: default;
		}
	}
}
@each $color-key, $color-value in $color-data {
	.theme-#{$color-key} {
		#publisher_msg .btn-box {
			.i-button:hover {
				border-color: $color-value;
				i{
					color: $color-value;
				}
				color: $color-value;
			}
		}
	}
}
</style>