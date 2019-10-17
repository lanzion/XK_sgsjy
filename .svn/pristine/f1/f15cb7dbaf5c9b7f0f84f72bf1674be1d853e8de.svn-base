<template>
	<article id="plan_invite">
		<ul class="invite-list" v-if="inviteList.length > 0">
			<li class="list-item table-layout" v-for="(item,index) in inviteList">
				<router-link class="img-box table-cell fl" :to="dynamicPath(item)">
					<img :src="getFileUrl(item.face) || faceDefault ">
				</router-link>
				<div class="item-msg table-cell fl">
					<p class="msg-item">联系人：{{item.linkMan}}</p>
					<p class="msg-item">
						联系方式：
						<span v-if="createId === loginId">{{item.mobile}}</span>
						<span v-else>{{item.mobile | phoneFormat}}</span>
					</p>
					<p class="msg-item">邀约状态：{{statusType[item.status]}}</p>
					<p class="msg-item">邀约备注：{{item.remark}}</p>
				</div>
				<div class="time-box">{{item.createDate | dateFormat('yyyy-MM-dd')}}</div>
			</li>
		</ul>
		<div class="empty-block" v-else>暂无数据</div>
	</article>
</template>

<script>
	import vPagination from 'Common/pagination.vue'
	import { requestInviteList } from '@/service/businessPlan.js'
	export default {
		name: 'plan_invite',
		components:{
			vPagination
		},
		data () {
			return {
				// inviteList:[],
				pageParam:{
					totalNum:0,
					pageSize:5,
					pageNum:1
				},
				statusType:{
					'1':'邀约中',
					'2':'洽谈中',
					'3':'邀约成功',
					'4':'邀约失败'
				},
				loginId: ''
			}
		},
		props:{
			inviteList: {
				type: Array,
				default() {
					return [];
				}
			},
			createId: {
				type: String,
				default: ''
			}
		},
		created() {
			if (this.$ls.get('loginUId')) {
				this.loginId = this.$ls.get('loginUId')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.invite-list{
		padding: 5px 15px;
		.list-item{
			padding: 20px;
			border-top: 1px solid #ddd;
			position: relative;
			box-sizing: border-box;
			.img-box{
				display: inline-block;
				margin-right: 20px;
				img{
					width: 100px;
					height: 100px;
					border-radius: 1000px;
				}
			}
			.item-msg{
				p{
					font-size: 14px;
					line-height: 25px;
				}
			}
			.time-box{
				position: absolute;
				top: 20px;
				right: 20px;
				font-size: 14px;
				color: #999;
			}
		}
	}
</style>