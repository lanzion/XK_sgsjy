<template>
	<div class="activityManage backend-content__middle">
		<div class="option-box clearfix">
			<div class="search clearfix">
		      	<input type="text" placeholder="请输入活动名称" class="search_text">
		      	<div class="el-search_btn icon-search"></div>
	    	</div>
	    	<multi-select style="width:220px;display: inline-block" :selectData.sync="classify" :ifAll='true' :model="'project'"></multi-select>
		    <div class="fr btn-box">
		    	<button class="btn">推荐</button>
		    	<button class="btn" v-if="userIdentity === 'school'">审核</button>
		    	<button class="btn">删除</button>
		    	<button class="publish">发布活动</button>
		    </div>
		</div>
		<!-- 活动管理表 -->
		<div class="activity-table">
			<el-table class="data-table" :data="manageList" style="width: 100%">
				<el-table-column type="selection" width="28"></el-table-column>
		        <el-table-column prop="title" label="活动名称">
		        	<template scope="scope">
		        		<template>
		        			<span class="activity-name">
		        				<router-link :to="{ path:'/admin/activity/details', query:{id:scope.row.id} }">{{scope.row.title}}</router-link>
		        			</span>
		        		</template>
		        	</template>
		        </el-table-column>
		        <el-table-column prop="activityType" label="活动分类" width="110"></el-table-column>
		        <el-table-column prop="createName" label="主持人" width="80"></el-table-column>
		        <el-table-column prop="startDate" label="活动时间" width="210">
		        	<template scope="scope">
		        		{{scope.row.startDate | dateFormat('yyyy.MM.dd')}}~{{scope.row.endDate}}
		        	</template>
		        </el-table-column>
		        <el-table-column label="报名时间" width="120">
		        	<template scope="scope">
		        		{{scope.row.beginDate | dateFormat('yyyy.MM.dd')}} - {{scope.row.stopDate | dateFormat('yyyy.MM.dd')}}
		        	</template>
		        </el-table-column>
		        <el-table-column
                    prop="auditStatus"
                    label="审核"
                    width="90"
                    :filters="[{ text:'已审核', value:1 }, { text:'待审核', value:0 }, { text:'通过', value:2 }, { text:'不通过', value:3 }]"
                    :filter-method="filterCheck"
                    filter-placement="bottom-end">
                    <template scope="scope">
			        	<span v-if="scope.row.auditStatus === 1">已审核</span>
			        	<span v-if="scope.row.auditStatus === 0">待审核</span>
			        </template>
                </el-table-column>
		        <el-table-column label="操作" width="170">
		          <template scope="scope">
		            <i title="推荐" class="vertical-align-top icon-btn-reprint"></i>
		            <i title="审核" class="icon-btn-feedback vertical-align-top" v-if="userIdentity === 'school'" @click="auditActivity([{id:scope.row.id,auditStatus:2}])"></i>
		            <del-popover title="删除" class="delete" :delData="{ url:'maker/activity/audit/delByIds', params:[{id: scope.row.id}], name:'资源' }" v-on:callback="getManageList"></del-popover>
		            <router-link :to="{path:'/admin/activity/publish',query:{id:scope.row.id}}">
						<i title="编辑" class="icon-btn-edit2 vertical-align-top"></i>
					</router-link>
		          </template>
		        </el-table-column>
		    </el-table>
		</div>
		<v-pagination :param="param" :changePage="changePage"></v-pagination>
	</div>
</template>

<script>
	import multiSelect from '../../../common/select/multi_select.vue';
	import delPopover from '../../../common/del_popover.vue';
	import pagination from '../../../common/pagination.vue';
	import { requestActivityManageList,auditActivity } from '@/service/activity.js';
	export default {
		name:'activityManage',
		components:{
			'multi-select':multiSelect,
			'del-popover':delPopover,
			'v-pagination':pagination
		},
		data() {
			return{
				classify:[],
				manageList:[],
		        userIdentity:'',
		        param:{
		        	totalNum:0,
		        	pageSize:10,
		        	pageNum:1
		        },
		        pageParam:{
		        	pageSize:10,
		        	pageNum:1
		        }
			}
		},
		mounted(){
			this.userIdentity = localStorage.getItem('userIdentity');
			this.getManageList();
		},
		methods:{
			filterCheck(value, row) {
	            return row.checkType === value;
	        },
			changePage(val){
				this.pageParam.pageNum = val;
				this.getManageList();
			},
			/*
			*获取活动管理列表
			*spaceType:空间类型
			*/
			getManageList(){
				requestActivityManageList({spaceType:3},this.pageParam).then((res)=>{
					console.log(res);
					this.param.totalNum = res.data.entity.totalNum;
					this.manageList = res.data.entity.resultData;
				})
			},
			/*
			*活动审核
			*id：审核id
			*auditStatus：审核状态
			 */
			auditActivity(options){
				auditActivity(options).then((res)=>{
					console.log(res);
					if(res.data.code === 200){
						this.message('success','审核成功');
						this.getManageList();
					}else{
						this.message('warning',res.data.msg)
					}
				})
			},
			message(type,message){
				this.$message({
					showClose:true,
					message:message,
					duration:2000,
					type:type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
*{
	box-sizing: border-box;
}
.activityManage{
	width: 100%;
	overflow: hidden;
	.option-box{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20px;
		// 搜索框
		.search {
		  float: left;
		  height: 32px;
		  border: 1px solid #DD0000;
		  margin-right: 10px;
		  .search_text {
		    float: left;
		    width: 174px;
		    height: 30px;
		    border: none;
		    text-indent: 5px;
		  }
		  .el-search_btn {
		    float: left;
		    width: 42px;
		    height: 31px;
		    line-height: 31px;
		    text-align: center;
		    background-color: #DD0000;
		    font-size: 14px;
		    color: #fff;
		    cursor: pointer;
		  }
		}
// 按钮
		.btn-box{
			button{
				float: left;
				width: 60px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				font-size: 16px;
				margin-left: 10px;
			}
			.btn{
				border:1px solid #d00;
				color: #d00;
			}
			.btn:hover{
				color: #fff;
				background-color: #d00;
			}
			.publish{
				width: 120px;
				border:1px solid #d00;
				background-color: #d00;
				color: #fff;
			}
			.publish:hover{
				opacity: 0.75;
			}
		}
	}
}
.vertical-align-top{
	vertical-align: top;
}
.activity-name{
		a{
			color: #2797ed
		}
	}
</style>

<style lang="scss">
	.activityManage{
		.data-table{
			text-align: center;
		}
		.data-table.el-table{
			th.is-leaf{
				text-align: center;
			}
		}
	}
</style>