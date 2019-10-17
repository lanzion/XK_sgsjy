<template>
	<div id="edit_edu">
		<el-form ref="form" :model="form" label-width="100px" :rules="rules">
			<el-row>
				<dl class="edu-msg clearfix">
					<dt class="fl">编码：</dt>
					<dd class="fl">{{identityCode}}</dd>
				</dl>
			</el-row>
			<el-row>
				<dl class="edu-msg clearfix">
					<dt class="fl">机构名称：</dt>
					<dd class="fl">{{eduName}}</dd>
				</dl>
			</el-row>
			<el-row>
				<dl class="edu-msg clearfix">
					<dt class="fl">区域：</dt>
					<dd class="fl">{{areaName}}</dd>
				</dl>
			</el-row>
			<el-row>
				<dl class="edu-msg clearfix" style="margin-bottom: 10px;">
					<dt class="fl">上级机构：</dt>
					<dd class="fl">{{parentName}}</dd>
				</dl>
			</el-row>
			<el-row>
				<el-form-item label="联系人" prop="linkName">
				    <el-col :span="12">
				    	<el-input placeholder="请输入联系人" v-model="form.linkName"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="联系电话" prop="phone">
				    <el-col :span="12">
				    	<el-input placeholder="请输入联系电话" v-model="form.phone"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="传真" prop="fax">
				    <el-col :span="12">
				    	<el-input placeholder="请输入传真" v-model="form.fax"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="电子邮箱" prop="email">
				    <el-col :span="12">
				    	<el-input placeholder="请输入电子邮箱" v-model="form.email"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="联系地址" prop="street">
				    <el-col :span="12">
				    	<el-input placeholder="请输入联系地址" v-model="form.street"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
		  		<el-form-item label="教育局简介" prop="remark">
		  			<el-col :span="23">
			    		<el-input type="textarea" v-model="form.remark" placeholder="请输入教育局简介" style="height: 100px;"></el-input>
			    	</el-col>
		  		</el-form-item>
		  	</el-row>
		</el-form>
		<section class="bs-d-btn-group">
            <button class="bs-search-button i-form-button" type="button" @click.prevent="submitModify('form')">确定</button>
            <button class="bs-search-button i-form-button is-plain" @click="close">取消</button>
        </section>
	</div>
</template>

<script>
	import { requestEduDetail,modifyEduMsg } from '@/service/admin_base.js';
	export default {
		name:'edit_edu',
		data(){
			var validatePhone = (rule, value, callback) => {
	            let regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/;
	            if (value === '') {
	                callback(new Error('请输入联系电话'));
	            } else if (!regular.test(value)) {
	                callback(new Error('请输入正确格式的电话号码'));
	            } else {
	                callback();
	            }
	        };
	        var validateFax = (rule, value, callback) => {
	            let regular = /^(\d{3,4}-)?\d{7,8}$/;
	            if (value === '') {
	                callback(new Error('请输入传真号'));
	            } else if (!regular.test(value)) {
	                callback(new Error('请输入正确格式的传真号'));
	            } else {
	                callback();
	            }
	        };
	        var validateEmail = (rule, value, callback) => {
	            let regular = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	            if (value === '') {
	                callback(new Error('请输入电子邮箱'));
	            } else if (!regular.test(value)) {
	                callback(new Error('请输入正确格式的电子邮箱'));
	            } else {
	                callback();
	            }
	        };
			return {
				identityCode:'',
				eduName:'',
				areaName:'',
				parentName:'',
				form: {
					linkName:'',
					phone:'',
					fax:'',
					email:'',
					street:'',
					remark:'',
					id:''
				},
				rules:{
					linkName:[
						{ required: true, message: '请输入联系人', trigger: 'blur' }
					],
					phone:[
						{ validator: validatePhone, required: true, trigger: 'blur' }
					],
					fax: [
						{ validator: validateFax, required: true, trigger: 'blur' }
					],
					email: [
						{ validator: validateEmail, required: true, trigger: 'blur' }
					],
					street: [
						{ required: true, message: '请输入联系地址', trigger: 'blur' }
					],
					remark: [
						{ required: true, message: '请输入教育局简介', trigger: 'blur' }
					]
				},
			}
		},
		props:{
			eduId:{
				type:String,
				default:null
			},
			close:Function,
			updateMsg:Function
		},
		watch:{
			eduId:{
				handler:function(val,oldVal){
					this.form.id = val;
					if(val){
						requestEduDetail({id:val}).then((res) => {
							let detail = res.data.entity
							this.identityCode = detail.identityCode;
							this.eduName = detail.eduName;
							this.areaName = detail.areaName;
							this.parentName = detail.parentName;
							this.form.linkName = detail.linkName;
							this.form.phone = detail.phone;
							this.form.fax = detail.fax;
							this.form.email = detail.email;
							this.form.street = detail.street;
							this.form.remark = detail.remark;
						})
					}
				},
				immediate: true
			}
		},
		methods:{
			/*
			*编辑提交
			*linkName:联系人
			*phone:phone
			*fax:传真
			*email：电子邮箱
			*street：详细地址
			*remark：简介
			 */
			submitModify(formName){
				if(localStorage.getItem('loginInfo')){
					this.$refs[formName].validate((valid) => {
						if(valid){
							modifyEduMsg(this.form).then((res) => {
								if(res.data.code === 200){
									this.showMessage('success','编辑成功');
									this.close();
									this.updateMsg(this.form)
								}else{
									this.showMessage('error',res.data.msg)
								}
							})
						}else{
							return false
						}
					})
				}else{
					this.showMessage('warning','请登录后再操作')
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '~@/asset/scss/table.scss';
	@import '~@/asset/scss/admin_back-stage_content.scss';
	.edu-msg{
		font-size: 14px;
		line-height: 2em;
		dt{
			width: 100px;
			text-align: right;
			margin-right: 5px;
		}
	}
</style>

<style lang="scss" scoped>
	#edit_edu{
		.el-textarea__inner{
			height: 102px;
		}
	}
</style>