<template>
	<div class="submit-form backend-content__middle">
		<el-form ref="form" :model="form" label-width="100px" :rules="rules">
			<el-row>
				<el-form-item label="编码" prop="identityCode">
				    <el-col :span="8">
				    	<el-input placeholder="请输入编码" v-model="form.identityCode" disabled></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="机构名称" prop="eduName">
				    <el-col :span="8">
				    	<el-input placeholder="请输入机构名称" v-model="form.eduName" disabled></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="区域" prop="areaName">
				    <el-col :span="8">
				    	<el-input placeholder="请输入区域" v-model="form.areaName" disabled></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="上级机构" prop="parentName">
				    <el-col :span="8">
				    	<el-input placeholder="请输入上级机构" v-model="form.parentName" disabled></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="联系人" prop="linkName">
				    <el-col :span="8">
				    	<el-input placeholder="请输入联系人" v-model="form.linkName" :disabled="isReadOnly"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row v-if="disabled">
				<el-form-item label="联系电话" prop="phone">
				    <el-col :span="8">
				    	<el-input placeholder="请输入联系电话" v-model="form.phone" disabled></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="传真" prop="fax">
				    <el-col :span="8">
				    	<el-input placeholder="请输入传真" v-model="form.fax" :disabled="isReadOnly"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row v-if="disabled">
				<el-form-item label="电子邮箱" prop="email">
				    <el-col :span="8">
				    	<el-input placeholder="请输入电子邮箱" v-model="form.email" disabled></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="联系地址" prop="street">
				    <el-col :span="8">
				    	<el-input placeholder="请输入联系地址" v-model="form.street" :disabled="isReadOnly"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-row>
		  		<el-form-item label="教育局简介" prop="remark">
		  			<el-col :span="12">
			    		<el-input type="textarea" v-model="form.remark" placeholder="请输入教育局简介" style="height: 100px;" :disabled="isReadOnly"></el-input>
			    	</el-col>
		  		</el-form-item>
		  	</el-row>
            <el-form-item v-if="isReadOnly">
                <button class="bs-form-button i-form-button" type="button" @click="$router.go(-1)">返回</button>
            </el-form-item>
            <el-form-item v-else>
	            <button class="bs-form-button i-form-button" type="button" @click.prevent="onSubmit('form')">确定</button>
	            <button class="bs-form-button i-form-button is-plain" type="button" @click="$router.go(-1)">取消</button>
            </el-form-item>
		</el-form>
        </section>
	</div>
</template>

<script>
	import { requestEduDetail, modifyEduMsg } from '@/service/admin_base.js';
	export default {
		name: 'eduManage_edit',
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
				form: {
					identityCode:'',
					eduName:'',
					areaName:'',
					parentName:'',
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
					// phone:[
					// 	{ validator: validatePhone, required: true, trigger: 'blur' }
					// ],
					fax: [
						{ validator: validateFax, required: true, trigger: 'blur' }
					],
					// email: [
					// 	{ validator: validateEmail, required: true, trigger: 'blur' }
					// ],
					street: [
						{ required: true, message: '请输入联系地址', trigger: 'blur' }
					],
					remark: [
						{ required: true, message: '请输入教育局简介', trigger: 'blur' }
					]
				},
            	disabled: false,      //是否禁用不能修改的选项
				isReadOnly: false
			}
		},
		methods:{
	        // 获取机构详情
	        getEduDetail() {
	            requestEduDetail({ id: this.form.id }).then((response) => {
	                if (response.data.code === 200) {
	                    let detail = response.data.entity || {};
	                    let _form = {};
                    	_form.id = detail.id;
						_form.identityCode = detail.identityCode;
						_form.eduName = detail.eduName;
						_form.areaName = detail.areaName;
						_form.parentName = detail.parentName;
						_form.linkName = detail.linkName;
						_form.phone = detail.phone;
						_form.fax = detail.fax;
						_form.email = detail.email;
						_form.street = detail.street;
						_form.remark = detail.remark;
                    	this.$set(this.$data, 'form', _form);
	                }

	            })
	        },
			/*
			 * 编辑提交
			 * linkName: 联系人
			 * phone: phone
			 * fax: 传真
			 * email: 电子邮箱
			 * street: 详细地址
			 * remark: 简介
			 */
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const params = Object.assign({}, this.form)
						delete params.identityCode
						delete params.eduName
						delete params.areaName
						delete params.parentName

						modifyEduMsg(params).then((res) => {
							if (res.data.code === 200) {
								this.showMessage('success', '保存成功')
                                this.$router.go(-1)
							} else {
								this.showMessage('error', res.data.msg)
							}
						})
					} else {
						return false
					}
				})
			}
		},
		mounted() {
		    if (this.$route.path.includes('detail')) {
		        this.isReadOnly = true
		    }

		    let _id = this.$route.query.id
		    if(_id != undefined){
            	this.disabled = true
		        this.$set(this.$data.form, 'id', _id)
		        this.getEduDetail()
            	this.$refs.form.resetFields()
		    }
		},
	}
</script>

<style lang="scss" scoped>
	@import '~@/assets/css/scss/table.scss';
	@import '~@/assets/css/scss/admin_back-stage_content.scss';
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