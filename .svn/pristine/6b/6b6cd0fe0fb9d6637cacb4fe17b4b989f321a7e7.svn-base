<template>
	<section class="subject_activity">
		<div class="btn-box clearfix" v-if="isCreater">
			<publsih-activity :visible="visible" :isEdit="isEdit" :activityId="activityId" @changeId="changeId" @callback="getSubjectActivityList"></publsih-activity>
			<button class="fr" @click="visible.show = true">发布活动</button>
		</div>
		<div class="table-box">
			<el-table class="data-table" :data="activityList" style="width: 100%" border>
	            <el-table-column prop="title" label="活动主题" show-overflow-tooltip>
	                <template scope="scope">
	                	<router-link :to="{ path:'',query:{id:scope.row.id} }">
	                		{{scope.row.title}}
	                	</router-link>
	                </template>
	            </el-table-column>
	            <el-table-column prop="compereUserName" label="主持人"></el-table-column>
	            <el-table-column prop="memberNames" label="参与人" show-overflow-tooltip></el-table-column>
	            <el-table-column prop="startDate" label="活动时间" show-overflow-tooltip>
	                <template scope="scope">{{ scope.row.startDate | dateFormat('yyyy-MM-dd') }}</template>
	            </el-table-column>
	            <el-table-column label="操作" v-if="isCreater">
	                <template scope="scope">
	                    <i class="icon-btn-edit" style="vertical-align: top;" @click="editAvtivity(scope.row.id)"></i>
	                    <del-popover title="删除" class="delete" :delData="{ url:'maker/subjectActivity/del', params:{id: scope.row.id}, name:'活动' }" @callback="callback"></del-popover>
	                </template>
	            </el-table-column>
	        </el-table>
		</div>
		<v-pagination :param="param" :changePage="changePage"></v-pagination>
	</section>
</template>

<script>
	import publishActivity from 'Common/module/subject/publish_activity.vue'
	import delPopover from 'Common/del_popover.vue'
	import pagination from 'Common/pagination.vue'
	import { requestSubjectActivityList } from '@/service/subject.js'
	import { mapActions } from 'Vuex'
	export default {
		name:'subject_activity',
		components:{
			'del-popover':delPopover,
			'publsih-activity':publishActivity,
			'v-pagination':pagination
		},
		data() {
			return{
				visible:{
					show:false
				},
				activityList:[],
				isEdit:false,
				param:{
					totalNum:0,
					pageSize:10,
					pageNum:1
				},
				activityId:''
			}
		},
		props:['isCreater'],
		mounted(){
			this.getSubjectActivityList()
		},
		methods: {
			...mapActions('subject',['statisticalSub']),
			changePage(val){
				this.param.pageNum = val;
				this.getSubjectActivityList();
			},
			/*
			*获取课题活动列表
			 */
			getSubjectActivityList(){
				requestSubjectActivityList({subjectId:this.$route.query.subjectId},{pageSize:10,pageNum:this.param.pageNum}).then((res)=>{
					if(res.data.entity === null){
						this.activityList = [];
						this.param.totalNum = 0;
					}else{
						this.activityList = res.data.entity.resultData;
						this.param.totalNum = res.data.entity.totalNum;
					}
				})
			},
			changeId(){
				this.activityId = ''
			},
			editAvtivity(id){
				this.isEdit = true;
				this.activityId =id;
				this.visible.show = true
			},
			callback(){
				this.getSubjectActivityList();
				this.statisticalSub('activityNum')
			}
		}
	}
</script>

<style lang='scss'>
	@import '../../../../../asset/scss/table.scss';
	.subject_activity{
		.el-table{
			.cell{
				text-align: center;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.subject_activity{
		padding: 5px 15px 15px;
	}
	.btn-box{
		width: 100%;
		margin-bottom: 10px;
		button{
			width: 92px;
			height: 40px;
			color: #d00;
			border:1px solid #d00;
		}
		button:hover{
			background-color: #d00;
			color: #fff;
		}
	}
</style>