<template>
	<el-dialog class="dialog publish_task" title="发布课题任务" :visible.sync="visible.show">
		<!-- <header class="header">发布课题任务</header> -->
		<section class="content-box clearfix">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    			<!-- 名称 -->
                <el-row>
                    <el-form-item label="任务名称" prop="taskName">
					    <el-col :span="14">
					    	<el-input :maxlength="50" placeholder="请输入任务名称，最多50字" v-model="form.taskName"></el-input>
					    </el-col>
				  	</el-form-item>
                </el-row>
                <!-- 任务期限 -->
			  	<el-row>
				  	<el-form-item label="任务期限">
				  		<el-col :span="6">
				  			<el-form-item prop="taskStartTime" class="date-box">
					      		<el-date-picker type="date" placeholder="开始时间" v-model="form.taskStartTime" :picker-options="pickerOptions1" style="width: 100%;" @change="dateChange"></el-date-picker>
					   		</el-form-item>
					    </el-col>
					    <el-col class="line" :span="2" style="text-align:center">—</el-col>
					    <el-col :span="6">
						    <el-form-item prop="taskEndTime" class="date-box">
						      	<el-date-picker type="date" placeholder="结束时间" v-model="form.taskEndTime" :picker-options="pickerOptions2" style="width: 100%;"></el-date-picker>
						    </el-form-item>
					    </el-col>
				  	</el-form-item>
			  	</el-row>
			  	<!-- 负责人 -->
			  	<el-row>
			  		<el-form-item label="负责人" prop="headUserId">
			  			<el-col :span="14">
			  				<el-select v-model="form.headUserId" placeholder="请选择负责人（课题成员），单选">
							    <el-option
							      v-for="item in subjectMembers"
							      :key="item.userId"
							      :label="item.userName"
							      :value="item.userId">
							    </el-option>
							</el-select>
			  			</el-col>
			  		</el-form-item>
			  	</el-row>
			  	<!-- 参与人 -->
			  	<el-row>
			  		<el-form-item label="参与人" prop="memberList">
					    <el-col :span="14">
			  				<el-select v-model="form.memberList" placeholder="请选择参与人（课题成员），多选" :multiple="true">
							    <el-option
							      v-for="item in subjectMembers"
							      :key="item.userId"
							      :label="item.userName"
							      :value="item.userId">
							    </el-option>
							</el-select>
			  			</el-col>
				  	</el-form-item>
			  	</el-row>
			  	<!-- 任务内容 -->
			  	<el-row>
			  		<el-form-item label="任务内容" prop="taskContent">
			  			<el-col :span="23">
			  				<el-input type="textarea" :maxlength="500" v-model="form.taskContent" placeholder="请输入任务内容，最多不超过500字" style="height: 100px;"></el-input>
			  			</el-col>
			  		</el-form-item>
			  	</el-row>
            </el-form>
		</section>
		<div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn2" @click.prevent="cancel">取消</a>
            <a class="reply_btn reply_btn1" @click.prevent="submitPublish">确定</a>
        </div>
	</el-dialog>
</template>

<script>
	import { publishSubjectTask,modifySubjectTask, requestSubjectTaskDetails,requestSubjectMembers } from '@/service/subject.js';
	import { loginInfo } from '@/js/getUserInfo.js';
	import { mapActions } from 'Vuex'
	var startTime = Date.now() - 8.64e7;
	export default{
		name:'publish_task',
		data() {
			return{
				form:{
					taskName:'',
					taskStartTime:'',
					taskEndTime:'',
					headUserId:'',
					memberList:[],
					taskContent:''
				},
				subjectMembers:[],
				pickerOptions1: {
		          	disabledDate(time) {
		            	return time.getTime() < Date.now() - 8.64e7;
		          	}
		        },
		        pickerOptions2: {
		          	disabledDate(time) {
		            	return time.getTime() < startTime;
		          	}
        		},
        		rules:{
        			taskName:[
        				{ required: true, message: '请输入任务名称', trigger: 'change' },
	                    { max: 50, message: '不超过50字符', trigger: 'change' }
        			],
        			taskStartTime:[
        				{ type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
        			],
        			taskEndTime:[
        				{ type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
        			],
        			headUserId:[
        				{ required: true, message: '请选择负责人', trigger: 'change' }
        			],
        			memberList:[
        				{ type: 'array', required: true, message: '请选择参与人', trigger: 'change' }
        			],
        			taskContent:[
        				{ required: true, message: '请输入任务内容', trigger: 'change' },
        				{ max: 500, message: '不超过500字', trigger: 'change' }
        			]
        		},
        		edit:false,
        		id:''
			}
		},
		props:{
            visible:{
                type:Object,
                default:{ visible:false }
            },
            isEdit:{
            	type:Boolean,
            	default:false
            },
            taskId:{
            	type:String,
            	default:''
            }
        },
        watch:{
        	isEdit:{
        		handler:function(val,oldVal){
        			this.edit = val
        		}
        	},
        	taskId:{
        		handler:function(val,oldVal){
        			this.id = val;
        			if(this.id != '' && this.edit){
        				this.getTaskDetails(this.id)
        			}
        		},
        		deep:true
        	}
        },
        mounted(){
        	this.getSubjectMember();
        },
		methods:{
			...mapActions('subject',['statisticalAdd']),
			/*
			*开始日期改变后执行
			 */
			dateChange(val) {
				if(this.form.taskStartTime === undefined){
					this.form.taskStartTime = ''
				};
				if(this.form.taskEndTime === undefined){
					this.form.taskEndTime = ''
				};
               	if(this.form.taskStartTime != ''){
               		startTime = this.form.taskStartTime.getTime();
               		this.pickerOptions2 = {
			          	disabledDate(time) {
			            	return time.getTime() < startTime
			          	}
	        		}
               	}else if(this.form.taskStartTime === ''){
               		this.form.taskEndTime = '';
               		this.pickerOptions2 = {
			          	disabledDate(time) {
			            	return time.getTime() < Date.now() - 8.64e7;
			          	}
	        		}
               	};
               	if(this.form.taskEndTime != '' && this.form.taskStartTime != '' && this.form.taskStartTime.getTime() > this.form.taskEndTime.getTime()){
               		this.form.taskEndTime = '';
               	};
			},
			// 获取课题成员
			getSubjectMember(){
				requestSubjectMembers({subjectId:this.$route.query.subjectId}).then((res)=>{
					if(res.data.code === 200){
						this.subjectMembers = res.data.entity.resultData;
					}
				})
			},
			/*
			*获取课题任务详情
			*id:任务Id
			 */
			getTaskDetails(id){
				requestSubjectTaskDetails({id:id}).then((res)=>{
					let datas = res.data.entity;
					this.form.taskName = datas.taskName;
					this.form.taskStartTime = new Date(datas.taskStartTime);
					this.form.taskEndTime = new Date(datas.taskEndTime);
					this.form.headUserId = datas.headUserId;
					this.form.taskContent = datas.taskContent;
					for(let i in datas.memberList){
						this.form.memberList.push(datas.memberList[i].userId)
					};
				})
			},
			/*
			*发布任务
			*subjectId：课题申报表id
			*taskName：任务名称
			*taskStartTime：任务期限开始时间
			*taskEndTime：任务期限结束时间
			*headUserId:任务负责人id
			*memberList:课题任务参与人列表
			*taskContent:任务内容
			*status:任务状态(1进行中,2未完成,3已完成)
			*headUserId:负责人id
			 */
			submitPublish(){
				this.$refs['form'].validate((valid) => {
					if(valid){
						let form = this.form;
						let members = [];
						for (let i in form.memberList){
							members.push({userId: form.memberList[i]})
						}
						let params = {
							subjectId: this.$route.query.subjectId,
							taskName: form.taskName,
							headUserId: form.headUserId,
							taskStartTime: form.taskStartTime.getTime(),
							taskEndTime: form.taskEndTime.getTime(),
							memberList: members,
							taskContent: form.taskContent,
							status: 1
						};
						if(this.edit){
							params.id = this.id;
							modifySubjectTask(params).then((res)=>{
								if(res.data.code === 200){
									this.showMessage('success','编辑成功');
									this.visible.show = false;
									this.$emit('changeId');
									this.$refs['form'].resetFields();
									this.$emit('callback');
								}else{
									this.showMessage('warning',res.data.msg)
								}
							})
						}else{
							publishSubjectTask(params).then((res)=>{
								if(res.data.code === 200){
									this.showMessage('success','发布成功');
									this.visible.show = false;
									this.$refs['form'].resetFields();
									this.$emit('callback');
									this.statisticalAdd('taskNum');
								}else{
									this.showMessage('warning',res.data.msg)
								}
							})
						}
					} else {
						this.showMessage('warning','请按要求填写完整信息')
						return false;
					}
				})
			},
			// 取消
			cancel(){
				this.visible.show = false;
				this.$refs['form'].resetFields();
				this.form.memberList = [];
				this.$emit('changeId');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/asset/scss/vars.scss';
	@import '~@/asset/scss/subject_dialog.scss';
</style>

<style lang="scss">
.publish_task{
	.el-textarea__inner{
		height: 85px;
	}
	.el-input__inner{
		height: 38px;
	}
	.el-select{
		height: auto;
		width: 100%;
		.el-tag{
			margin: 3px;
		}
	}
	.date-box {
		.el-form-item__content {
			margin-left: 0px !important;
		}
	}
}
</style>

