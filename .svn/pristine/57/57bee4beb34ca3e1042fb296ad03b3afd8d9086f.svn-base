<template>
	<el-dialog :visible.sync="visible.show" title="邀约列表" class="invite-list">
		<!-- <header class="head">邀约列表</header> -->
		<div class="search-box clearfix">
			<v-search :tips="tips" @search="getSearch" style="float:left;"></v-search>
		</div>
		<section class="list-box">
			<el-table class="data-table back-stage-table" :data="inviteList" style="width: 100%">
	            <el-table-column prop="linkMan" label="邀约人" show-overflow-tooltip width="80"></el-table-column>
	            <el-table-column prop="mobile" label="联系方式" show-overflow-tooltip	></el-table-column>
	            <el-table-column prop="seduceDate" label="邀约时间" show-overflow-tooltip>
	                <template scope="scope">{{ scope.row.seduceDate | dateFormat('yyyy.MM.dd') }}</template>
	            </el-table-column>
	            <el-table-column prop="remark" label="邀约备注" show-overflow-tooltip></el-table-column>
	            <el-table-column prop="status" label="状态" width="100">
	                <template scope="scope">
	                	<div>{{inviteStatus[scope.row.status]}}</div>
	                </template>
	            </el-table-column>
	            <el-table-column label="操作" width="170">
	                <template scope="scope">
	                    <div v-if="scope.row.status === 1">
	                    	<a href="javaScript:;" class="invite-btn" @click="modifyInvite(scope.row.id,2,scope.$index)">同意邀约</a>
	                    	<a href="javaScript:;" class="invite-btn" @click="modifyInvite(scope.row.id,4,scope.$index)">拒绝邀约</a>
	                    </div>
	                    <div v-if="scope.row.status === 2">
	                    	<invite-success :invitId="scope.row.id" :index="scope.$index" @callback="invitSuccess"></invite-success>
	                    	<a href="javaScript:;" class="invite-btn" @click="modifyInvite(scope.row.id,4,scope.$index)">邀约失败</a>
	                    </div>
	                </template>
	            </el-table-column>
	        </el-table>
	        <v-pagination :param="pageParam" :changePage="changePage"></v-pagination>
		</section>
		<!-- <div class="btn-box">
			<button class="close-btn" @click="visible.show = false">关闭</button>
		</div> -->
	</el-dialog>
</template>

<script>
	import vSearch from 'Common/search.vue'
	import vPagination from 'Common/pagination.vue'
	import inviteSuccess from 'components/businessPlan/invite_success.vue'
	import { requestInviteList,modifyInvite,inviteRealMoney } from '@/service/businessPlan.js'
	export default {
		name:'invite_list',
		components:{
			vSearch,
			vPagination,
			inviteSuccess
		},
		data () {
			return {
				tips:'请输入邀约人',
				inviteList:[],
				selected:{
					linkMan:'',
					id:''
				},
				pageParam:{
					totalNum:0,
					pageNum:1,
					pageSize:5
				},
				inviteStatus:{
					1:'邀约中',
					2:'洽谈中',
					3:'邀约成功',
					4:'邀约失败'
				},
				inviteId:''
			}
		},
		props:{
			visible:{
				type: Object,
				default () {
					return {
						show: false
					}
				}
			},
			businessPlanId: {
				type: String,
				default: ''
			}
		},
		computed:{
			params:function(){
				return Object.assign( {}, this.selected )
			}
		},
		watch:{
			businessPlanId:{
				handler:function(val,oldVal){
					this.selected.id = val
				},
				deep:true
			},
			params:{
				handler:function(val,oldVal){
					this.getInviteList()
				},
				deep:true
			}
		},
		methods:{
			getSearch(val){
				this.selected.linkMan = val;
			},
			changePage(val){
				this.pageParam.pageNum = val;
				this.getInviteList()
			},
			// 获取邀约列表
			getInviteList(){
				let params = {businessPlanId:this.selected.id,linkMan:this.selected.linkMan}
				requestInviteList(params,this.pageParam).then((res) => {
					if(res.data.code == 200){
						this.inviteList = res.data.entity.resultData;
						this.pageParam.totalNum = res.data.entity.totalNum;
					}
				})
			},
			/*scope.$index*/
			modifyInvite(id,status,index){
				modifyInvite({id:id,status:status}).then((res) => {
					if (res.data.code == 200) {
						this.inviteList[index].status = status;
						if(status == 2){
							this.showMessage('success','已同意邀约')
						}else if(status == 4){
							this.showMessage('success','已拒绝邀约')
						}
					} else {
						this.showMessage('error',res.data.msg)
					}
				})
			},
			// 邀约成功回调改变状态
			invitSuccess(idx) {
				this.inviteList[idx].status = 3;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/asset/scss/vars.scss';
	.invite-list{
		.head{
			font-size: 18px;
			margin-bottom: 20px;
		}
		.search-box{
			margin-bottom: 20px;
		}
		.btn-box{
			margin-top: 20px;
			text-align: right;
			.close-btn{
				border: none;
				padding: 6px 15px;
				font-size: 14px;
				color: #fff;
				&:hover{
					opacity: 0.75;
				}
			}
		}
	}
	@each $color-key, $color-value in $color-data {
		.theme-#{$color-key} {
			.invite-list {
				.btn-box {
					.close-btn {
						background-color: $color-value;
					}
				}
				.invite-btn{
					border: 1px solid #ddd;
				    padding: 1px 3px;
				    border-radius: 3px;
					&:hover{
						border-color: $color-value;
						color: $color-value;
					}
				}
			}
		}
	}
</style>

<style lang="scss">
	.invite-list{
		.el-table{
			.cell{
				text-align: center;
			}
		}
	}
</style>
