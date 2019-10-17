<template>
	<section class="subject_stage">
		<div class="table-box">
			<el-table class="data-table" :data="stageList" style="width: 100%" border>
	            <el-table-column prop="stageName" label="课题阶段">
	                <template scope="scope">
	                    <a class="init-a" @click="getStageDetail(scope.row.id,scope.row.stageCode)" v-text="scope.row.stageName"></a>
	                </template>
	            </el-table-column>
	            <el-table-column prop="status" label="状态" width="80">
	                <template scope="scope">
	                	<div v-if="scope.row.status === 0">待发起</div>
	                	<div v-if="scope.row.status === 1">已完成</div>
	                	<div v-if="scope.row.status === 2">已发起</div>
	                </template>
	            </el-table-column>
	            <el-table-column prop="auditResult" label="结果">
	            	<template scope="scope">
	            		<span v-if="scope.row.auditResult == -1">待提交</span>
	            		<span v-else>{{result[scope.row.auditResult]}}</span>
	            	</template>
	            </el-table-column>
	            <el-table-column prop="startDate" label="发起时间">
	                <template scope="scope">{{ scope.row.startDate | dateFormat('yyyy.MM.dd') }}</template>
	            </el-table-column>
	            <el-table-column prop="taskTime" label="通过时间">
	                <template scope="scope">{{ scope.row.endDate | dateFormat('yyyy.MM.dd') }}</template>
	            </el-table-column>
	            <el-table-column label="操作" v-if="isCreater">
	                <template scope="scope">
	                    <a class="init-a" v-if="scope.row.stageCode != 1 && scope.row.status == 0 && scope.row.auditResult != 1" @click="initiateStage(scope.row.stageCode,scope.row.id)">发起</a>
	                    <a class="init-a" v-else-if="scope.row.stageCode != 1 && scope.row.status == 2 && scope.row.auditResult == 2" @click="initiateStage(scope.row.stageCode,scope.row.id)">发起</a>
	                </template>
	            </el-table-column>
	        </el-table>
	        <stage-initiate :visible="visible" :stageCode="stageCode" :stageId="stageId" @callback="getSubjectStageList"></stage-initiate>
	        <stage-detail :visible="visible2" :stageDetail="stageDetail"></stage-detail>
		</div>
	</section>
</template>

<script>
	import stageInitiate from 'Common/module/subject/stage_initiate.vue';
	import stageDetail from 'Common/module/subject/stage_detail.vue';
	import { requestSubjectStageList,requestSubjectSatgeDetail } from '@/service/subject.js';
	export default {
		name:'subject_stage',
		components:{
			'stage-initiate':stageInitiate,
			'stage-detail':stageDetail
		},
		data() {
			return{
				stageList:[],
				visible:{
					show:false
				},
				visible2:{
					show:false
				},
				result:{
					0: '待审核',
					1: '审核通过',
					2: '审核不通过',
					3: '审核中'
				},
				stageCode:0,
				stageId:'',
				stageDetail:{}
			}
		},
		props:['isCreater','isMember'],
		mounted(){
			this.getSubjectStageList();
		},
		methods: {
			getSubjectStageList(){
				requestSubjectStageList({subjectDeclareId:this.$route.query.subjectId},{pageSize:5,pageNum:1}).then((res)=>{
					this.stageList = res.data.entity.resultData;
				})
			},
			initiateStage(stageCode,stageId){
				this.visible.show = true,
				this.stageCode = stageCode,
				this.stageId = stageId
			},
			/*获取阶段详情*/
			getStageDetail(stageId,stageCode){
				if(stageCode != 1){
					this.visible2.show = true;
					requestSubjectSatgeDetail({id:stageId}).then((res) => {
						if(res.data.code === 200){
							this.stageDetail = res.data.entity;
						}
					})
				}
			}
		}
	}
</script>

<style lang='scss'>
	@import '../../../../../asset/scss/table.scss';
	.subject_stage{
		.el-table{
			.cell{
				text-align: center;
			}
		}
	}
</style>
<style lang="scss" scoped>
.subject_stage{
	padding: 5px 15px 15px;
}
.init-a{
	&:hover {
		color: #00a0e9;
	}
}
</style>