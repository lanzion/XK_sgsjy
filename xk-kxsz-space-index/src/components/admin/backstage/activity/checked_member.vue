<template>
	<div class="checked_member">
		<ul class="list-box clearfix" v-if="checkedMemberList.length > 0">
	  		<li class="members fl clearfix" v-for="item in checkedMemberList">
	  			<router-link :to="dynamicPath(item)" class="avatar-box fl">
	  				<img :src="getFileUrl(item.headImageUrl) || faceDefault" height="72" width="72">
	  			</router-link>
	  			<div class="msg-box">
	  				<p><router-link :to="dynamicPath(item)" class="name">{{item.createName}}</router-link></p>
	  				<p class="school-name">{{item.schoolName}}</p>
	  			</div>
	  		</li>
	  	</ul>
	  	<div class="empty-block" v-else>暂无成员</div>
	  	<v-pagination :param="param" :changePage="changePage"></v-pagination>
	</div>
</template>

<script type="text/javascript">
	import pagination from '../../../common/pagination.vue';
	import { requestAuditedMember } from '@/service/activity.js';
	export default {
		name: 'checked_member',
		components:{
			'v-pagination':pagination
		},
		data() {
			return {
				checkedMemberList:'',
				pageParam:{
					pageSize:20,
					pageNum:1
				},
				param:{
					totalNum:0,
					pageSize:20,
					pageNum:1
				},
			}
		},
		created(){
		},
		mounted(){
			this.getAuditedMembers()
		},
		methods:{
			changePage(val){
				this.pageParam.pageNum = val;
				this.getAuditedMembers();
			},
			/*
			*请求已审成员列表
			*activityId:活动Id
			 */
			getAuditedMembers() {
				requestAuditedMember({activityId:this.$route.query.id},this.pageParam).then((res) =>{
					if(res.data.entity === null){
						this.checkedMemberList = [];
						this.param.totalNum = 0;
					}else{
						this.checkedMemberList = res.data.entity.resultData;
						this.param.totalNum = res.data.entity.totalNum;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	*{
		box-sizing: border-box;
	}
	.checked_member{
		width: 100%;
		padding: 15px;
	}
	.list-box{
		width: 100%;
		margin-bottom: 50px;
	}
	// 已审成员
	.members{
		width: 25%;
		padding-left: 10px;
		margin-bottom: 25px;
		.avatar-box{
			padding-right: 1em;
			img{
				border-radius: 1000px;
			}
		}
		.msg-box{
			.name{
				font-size: 18px;
            	line-height: 2;
            	&:hover{
            		color: #2797ed;
            	}
			}
			.school-name{
				font-size: 14px;
	            color: #999;
	            // white-space: nowrap;
	            // text-overflow: ellipsis;
	            // overflow: hidden;
			}
		}
	}
</style>