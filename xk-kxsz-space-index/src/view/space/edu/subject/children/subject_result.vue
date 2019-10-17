<template>
	<section class="subject_result">
		<div class="btn-box clearfix" v-if="isCreater || isMember">
			<upload-result :visible="visible" @callback="getSubjectResultList"></upload-result>
			<button class="fr" @click="visible.show = true">上传成果</button>
		</div>
		<div class="table-box">
			<el-table class="data-table" :data="taskList" style="width: 100%" border>
	            <el-table-column prop="name" label="成果名称" show-overflow-tooltip>
	                <template scope="scope">
	                    <a class="link-to-detail" v-text="scope.row.name"></a>
	                </template>
	            </el-table-column>
	            <el-table-column prop="resultType" label="成果类型">
	            	<template scope="scope">
	            		{{scope.row.resultType | translate(resultTypeDL)}}
	            	</template>
	            </el-table-column>
	            <el-table-column prop="userName" label="上传人"></el-table-column>
	            <el-table-column prop="createDate" label="上传时间">
	                <template scope="scope">{{ scope.row.createDate | dateFormat('yyyy.MM.dd') }}</template>
	            </el-table-column>
	            <el-table-column label="操作" v-if="isCreater || isMember">
	                <template scope="scope">
	                    <del-popover v-if="isCreater" title="删除" class="delete" :delData="{ url:'maker/subject/result/del', params:{id: scope.row.id}, name:'成果' }" @callback="callback"></del-popover>
	                    <a title="下载" class="icon-btn-download" style="vertical-align: top;" :href="downloadUrl(scope.row.resourceId, scope.row.name)" :download="scope.row.name"></a>
	                </template>
	            </el-table-column>
	        </el-table>
		</div>
		<v-pagination :param="param" :changePage="changePage"></v-pagination>
	</section>
</template>

<script>
	import uploadResult from 'Common/module/subject/upload_result.vue';
	import delPopover from 'Common/del_popover.vue';
	import pagination from 'Common/pagination.vue';
	import { requestSubjectResultList } from '@/service/subject.js';
	import { mapState, mapActions } from 'Vuex'
	export default {
		name:'subject_result',
		components:{
			'del-popover':delPopover,
			'upload-result':uploadResult,
			'v-pagination':pagination
		},
		data() {
			return{
				visible:{ show:false },
				taskList:[],
				param:{
					totalNum:0,
					pageSize:10,
					pageNum:1
				}
			}
		},
		props:['isCreater','isMember'],
		computed: {
			...mapState('dictionaryCommon', {
                resultTypeDL (state) {
                    let dicList = (state['resultTypeDicList'] || {}).dicList || []
                    return dicList
                },
            }),
		},
		mounted(){
			this.getSubjectResultList();
		},
		methods: {
			...mapActions('subject',['statisticalSub']),
			changePage(val){
				this.param.pageNum = val;
				this.getSubjectResultList()
			},
			/*
			*获取课题成果列表
			*/
			getSubjectResultList(){
				requestSubjectResultList({subjectId:this.$route.query.subjectId},{pageSize:5,pageNum:this.param.pageNum}).then((res)=>{
					if(res.data.code === 200){
						this.taskList = res.data.entity.resultData;
						this.param.totalNum = res.data.entity.totalNum;
					}
				})
			},
			callback(){
				this.getSubjectResultList();
				this.statisticalSub('resultNum');
			}
		}
	}
</script>

<style lang='scss'>
	@import '../../../../../asset/scss/table.scss';
	.subject_result{
		.el-table{
			.cell{
				text-align: center;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.subject_result{
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