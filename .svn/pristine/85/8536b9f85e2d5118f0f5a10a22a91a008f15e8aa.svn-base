<template>
	<div id="invite" class="invite backend-content__middle" style="padding-top: 10px;">
		<div class="search-box clearfix">
			<v-search :tips="tips" @search="getSearch" style="float:left;"></v-search>
		</div>
		<section class="list-box">
			<el-table class="data-table back-stage-table" :data="inviteList" style="width: 100%">
	            <el-table-column prop="multName" label="众创空间" show-overflow-tooltip></el-table-column>
	            <el-table-column prop="createDate" label="邀请时间" show-overflow-tooltip>
	                <template scope="scope">{{ scope.row.createDate | dateFormat('yyyy.MM.dd') }}</template>
	            </el-table-column>
	            <el-table-column prop="content" label="邀请说明" show-overflow-tooltip></el-table-column>
	            <el-table-column prop="auditStatus" label="状态" width="80">
	                <template scope="scope">
	                	<div>{{statusType[scope.row.status]}}</div>
	                </template>
	            </el-table-column>
	            <el-table-column label="操作" width="160">
	                <template scope="scope">
	                    <div v-if="scope.row.status === 0">
	                    	<a href="javaScript:;" class="invite-btn" @click="modifyInvite(scope.row.id,1,scope.$index)">同意邀约</a>
	                    	<a href="javaScript:;" class="invite-btn" @click="modifyInvite(scope.row.id,2,scope.$index)">拒绝邀约</a>
	                    </div>
	                    <div v-else>无操作</div>
	                </template>
	            </el-table-column>
	        </el-table>
	        <v-pagination :param="pageParam" :changePage="changePage"></v-pagination>
		</section>
	</div>
</template>

<script>
	import vSearch from 'Common/search.vue'
	import vPagination from 'Common/pagination.vue'
	import { requestEnterInviteList,modifyInvite } from '@/service/mult.js'
	export default {
		name:'invite',
		components:{
			vSearch,
			vPagination
		},
		data () {
			return {
				tips:'请输入众创空间',
				inviteList:[],
				pageParam:{
					totalNum:0,
					pageNum:1,
					pageSize:5
				},
				statusType:{
					0:'邀请中',
					1:'同意邀请',
					2:'拒绝邀请'
				},
				multName: ''
			}
		},
		mounted(){
			this.getinviteList()
		},
		methods:{
			getSearch(val){
				this.multName = val
				this.getinviteList()
			},
			changePage(val){
				this.pageParam.pageNum = val;
				this.getinviteList()
			},
			// 获取邀约列表
			getinviteList(){
				let params = {
					userId: this.$ls.get('loginUId'),
					multName: this.multName
				}
				requestEnterInviteList(params,this.pageParam).then((res) => {
					if(res.data.code == 200){
						this.inviteList = res.data.entity.resultData;
						this.pageParam.totalNum = res.data.entity.totalNum;
					}
				})
			},
			// 同意或拒绝邀约
			modifyInvite(id,status,index){
				let msg = status == 1 ? '同意邀约' : '拒绝邀约';
				this.$confirm(`此操作将${msg}，是否继续？`, '温馨提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          customClass: '__custom-msg-box'
		        }).then(() => {
		          	let params = {
						id:id,
						createId:this.$ls.get('loginUId'),
						status:status
					};
					modifyInvite(params).then((res)=>{
						if(res.data.code == 200){
							// this.inviteList[index].status = status;
							this.$set(this.$data.inviteList[index],'status',status);
							this.showMessage('success','已'+msg);
						}else{
							this.showMessage('error',res.data.msg)
						}
					})
		        }).catch(() => {
		          this.showMessage('info','已取消操作')
		        });
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/asset/scss/vars.scss';
	.invite{
		.head{
			font-size: 18px;
			margin-bottom: 20px;
		}
		.search-box{
			margin-bottom: 20px;
		}
		.invite-btn{
			border: 1px solid #ddd;
		    padding: 1px 3px;
		    border-radius: 3px;
			&:hover{
				border-color: #d00;
				color: #d00;
			}
		}
	}
</style>