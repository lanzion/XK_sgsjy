<template>
	<div class="resource_upload backend-content__middle">
		<div class="upload-box">
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
				<!-- 上传文件 -->
				<el-row>
		          	<el-form-item label="文件" required>
		            	<el-col :span="10">
			              	<el-upload :disabled="isPreview" class="upload-demo" action :on-remove="handleRemove" :file-list="fileList" :before-upload="UploadFile">
				                <span class="upload-btn"><i class="icon-btn-add-circle"></i> 上传文件</span>
			                	<span slot="tip" class="upload-tip">文件大小在{{standardFileSize}}M以内</span>
			              	</el-upload>
		            	</el-col>
		            	<div style="position:absolute;font-size:12px;top:80%;color:#ff4949;" v-if="noFile">
                            请选择附件
                        </div>
		          	</el-form-item>
		      	</el-row>
				<!-- 资源名称 -->
		        <el-row>
		          <el-form-item label="资源名称" prop="name">
		            <el-col :span="10">
		              <el-input :disabled="isPreview" placeholder="根据资源文件名称自动生成，可修改，100字符以内" :maxlength="100" v-model="form.name"></el-input>
		            </el-col>
		          </el-form-item>
		        </el-row>
		        <!-- 资源简介 -->
		        <el-row>
		        	<el-form-item label="资源简介" prop="introduction">
		        		<el-col :span="23">
		              		<el-input :disabled="isPreview" type="textarea" :maxlength="500" placeholder="请输入资源简介，500字以内" v-model="form.introduction" style="height:100px;" :row="4"></el-input>
		            	</el-col>
		        	</el-form-item>
		        </el-row>
		        <!-- 所属分类 -->
		        <el-row>
		        	<el-form-item label="所属分类" prop="resourceType">
		        		<el-col :span="10">
		        			<multi-select style="width:323px;display:inline-block;" :disabled="isPreview" :selectData.sync="form.resourceType" :ifAll='false' :model='"resource"'></multi-select>
		        		</el-col>
		        	</el-form-item>
		        </el-row>
		        <!-- 涉及技术 -->
		        <el-row>
		        	<el-form-item label="涉及技术" prop="technologyType">
		        		<el-col :span="10">
		        			<el-select :disabled="isPreview" multiple placeholder="请选择涉及的技术" v-model="form.technologyType" style="width:100%;">
				              	<el-option
				                v-for="item in technologyOptions"
				                :key="item.id"
				                :label="item.name"
				                :value="item.id">
				              	</el-option>
			            	</el-select>
		        		</el-col>
		        	</el-form-item>
		        </el-row>
		        <!-- 来源 -->
		        <el-row>
		        	<el-form-item label="来源" prop="source">
		        		<el-col :span="10">
		        			<el-radio-group :disabled="isPreview" v-model="form.source">
		                		<el-radio v-for="item in sourceOptions" :label="item.value" :key="item.value">{{item.name}}
		                		</el-radio>
		              		</el-radio-group>
		        		</el-col>
		        	</el-form-item>
		        </el-row>
		        <!-- 共享类型 -->
		        <el-row>
		        	<el-form-item label="共享类型" prop="shareType">
		        		<el-col :span="20">
		        			<el-radio-group :disabled="isPreview" v-model="form.shareType">
			                	<el-radio v-for="item in shareTypeOptions" :label="item.value" :key="item.value">{{item.name}}
			                	</el-radio>
		              		</el-radio-group>
		        		</el-col>
		        	</el-form-item>
		        </el-row>
		        <el-form-item v-if="!isPreview">
		        	<button class="bs-search-button i-form-button" @click.prevent="onSubmit(0)" type="button">保存</button>
		          	<button class="bs-search-button i-form-button" @click.prevent="onSubmit(1)" type="button">提交审核</button>
	          		<button class="bs-search-button i-form-button is-plain" @click.prevent="$router.push({name:'adminResource'})">取消</button>
		        </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { loginInfo, userIdentity } from '@/js/getUserInfo.js';
	import { uploadFileSize } from '@/mixin/uploadFileSize.js'
	import { requestResourceDetails, uploadResource, modifyResource } from '@/service/resource.js'
	import { requestDictComb, requestPubSearch } from '@/service/common.js'
	import multiSelect from 'Common/select/multi_select.vue'
	export default {
		name: 'resourceUpload',
		mixins: [uploadFileSize],
		components: {
			'multi-select': multiSelect
		},
		data () {
			return {
				fileList: [],
		        form: {
		        	name: '',
		        	eduCityId: '',
		        	fileId: '',
		        	fileSize: '',
		        	introduction: '',
		        	source: '',
					shareType: '',
	        		resourceType: [],
	        		technologyType: []
		        },
		        sourceOptions: [
		        	{value: '1', name: '原创'},
					{value: '2', name: '转载'}
		        ],
		        shareTypeOptions: (userIdentity == 'student' || userIdentity == 'teacher') ? [
		        	{value: '1', name: '私有'},
					{value: '2', name: '个人共享'},
					{value: '3', name: '本校共享'},
					{value: '4', name: '本区县共享'},
					{value: '5', name: '本市共享'},
					{value: '6', name: '本省共享'},
					{value: '7', name: '所有共享'},
		        ] : [
		        	{value: '1', name: '私有'},
					{value: '2', name: '个人共享'},
					{value: '4', name: '本区县共享'},
					{value: '5', name: '本市共享'},
					{value: '6', name: '本省共享'},
					{value: '7', name: '所有共享'},
				],
		        technologyOptions: [],
				props: {
          			value: 'label',
          			children: 'children'
        		},
				//表单校验提示
	            rules: {
	                introduction: [
	                    { required: true, message: '请输入资源简介', trigger: 'blur' },
	                    { max: 500, message: '不超过500字符', trigger: 'change' }
	                ],
	                name: [
	                	{ required: true, message: '请输入资源名称', trigger: 'blur' },
	                	{ max: 100, message: '不超过100字符', trigger: 'change' }
	                ],
	                resourceType: [
	                	{ type: 'array', required: true, message: '请选择所属分类', trigger: 'change' }
	                ],
	                technologyType: [
	                	{ type:'array', required: true, message: '请选择技术类型', trigger: 'change' }
	                ],
	                source: [
	                	{ required: true, message: '请选择来源', trigger: 'change' }
	                ],
	                shareType: [
	                	{ required: true, message: '请选择共享类型', trigger: 'change' }
	                ]
	            },
	            fileToLarge: false,
	            noFile: false,
	            isPreview: false
			}
		},
		created() {
			this.isPreview = this.$route.path.includes('preview')
    		if (this.$route.query.id != undefined) {
    			let id = this.$route.query.id;
    			this.getResourceDetails(id);
    		}
			this.getSelect();
		},
		watch: {
			fileList:{
				handler: function(val,oldVal) {
					if (val.length > 0) {
						this.noFile = false;
					}
				},
				deep: true
			}
		},
		methods: {
			handleRemove(file, fileList) {
	            this.fileList = fileList;
	            this.form.name = this.fileList.length > 0 ? this.form.fileList[0].name : ''
	        },
	        UploadFile (file, fileList) {
	            const fileSize = file.size,
	                  _this = this
	            if (fileSize < (this.standardFileSize * 1024 * 1024) ) {
	                uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
	                    if (res.code === 200) {
	                    	const docId = (res.appendInfo || {}).documentId || ''
	                    	_this.fileList = [];
		                    _this.fileList.push({ name: file.name, size: file.size, url: res.appendInfo.resourceId, status: 'finished', docId });
		                    _this.form.name = _this.fileList[0].name;
	                    }
	                })
	                uploader.off('uploadError').on('uploadError', function (file, reason) {
	                    _this.$message({ message: reason.msg })
	                })
	            } else {
	            	this.fileList = []
                    _this.$message({ message: `文件大小不超过${_this.standardFileSize}M`})
                    uploader.cancelFile(file)
	            }
	        },
			// 资源修改时获取资源详情
			getResourceDetails(id) {
		      	let data = { id: id };
		      	requestResourceDetails(data).then((res) => {
		      		let data = res.data.entity;
		      		this.form.eduCityId = data.eduCityId;
		      		this.form.resourceType = data.resourceType.split('-');
		      		this.form.technologyType = data.technologyIds === null ? [] : data.technologyIds;
		      		this.form.source = data.source;
		      		this.form.shareType = data.shareType;
		      		this.form.introduction = data.introduction;
		      		this.fileList.push({ name: data.name, status: 'finished' });
		      		this.form.name = this.fileList[0].name;
		      	})
		    },
			// 获取技术select的options
			getSelect() {
				let data = { groupCode: 'technicalClassification' };
				// 获取技术分类
				requestDictComb(data).then((res) => {
					this.technologyOptions = res.data.entity.dicList;
				})
			},
			//提交
			onSubmit(isSubmit) {
				const sucMsg = isSubmit == 1 ? '上传成功' : '保存成功'
				if(!this.fileList.length > 0){
					this.noFile = true;
				};
				this.$refs['form'].validate((valid) => {
		          	if (valid && !this.noFile) {
		          		let form = this.form;
		            	let data = {
							name: form.name.trim(),
							fileId: this.fileList[0].url,
							fileSize: this.fileList[0].size,
							resourceType: form.resourceType.join('-'),
							resourceTypeParent: form.resourceType[0],
							technologyType: form.technologyType,
							source: form.source,
							shareType: form.shareType,
							introduction: form.introduction,
							isSubmit: isSubmit,
                  			documentId: this.fileList[0].docId
						};
						if (this.$route.query.id != undefined) {
							data.id = this.$route.query.id;
							modifyResource(data).then((res) => {
								if (res.data.code === 200) {
									this.showMessage('success', '修改成功')
									this.$router.push({ name: 'adminResource' })
								} else {
									this.showMessage('error', res.data.msg)
								}
							},(res) => {
								this.showMessage('error', '发生错误了')
							})
						} else {
							uploadResource(data).then((res) => {
								if (res.data.code === 200) {
									this.showMessage('success', sucMsg)
									this.$router.push({ name: 'adminResource' })
								} else {
									this.showMessage('error', res.data.msg)
								}
							}, (res)=> {
								 this.showMessage('error', '发生错误了')
							})
						}
		          	} else {
		          		this.showMessage('warning', '请按要求填写完整的信息')
		           	 	return false;
		          	}
		        });
			},
		}
	}
</script>
<style lang="scss">
@import '~@/asset/scss/vars.scss';
	.upload-box{
		.el-textarea__inner{
			height: 100px;
			border-radius: 4px;
		}
		.el-input__inner{
			height: 38px;
			border-radius: 3px;
		}
		.el-input__icon{
			width: 10%;
		}
		.el-tag .el-icon-close:hover{
			background-color: $default-color;
		}
		.el-select{
			height: auto;
			.el-tag{
				margin: 3px;
			}
		}
		.el-upload-list__item.is-success .el-icon-close, .el-upload__input {
	    	position: absolute;
	    	top: 5px;
	    	right: 10px;
		}
		.el-cascader{
			width: 100%;
		}
	}
	  	.resource_upload .btn{
			padding: 8px 30px;
			border: 1px solid $default-color;
			color: $default-color;
			margin-left: 5px;
		}
		.publish-btn{
			padding: 0px 15px;
			height: 35px;
			line-height: 35px;
			background-color: $default-color;
			color: #fff;
		}
		.upload-tip{
			font-size: 12px;
		}
		.publish-btn:hover{
			opacity: 0.75;
		}
		.resource_upload .btn:hover{
			background-color: $default-color;
			color: #fff;
		}

</style>

<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
	.upload-box{
		min-height: 820px;
		font-size: 14px;
		.upload-btn{
			width: 90px;
			height: 38px;
			border: 1px solid #c9c9c9;
			border-radius: 2px;
			display: inline-block;
			margin-right: 10px;
			i{
				color: $default-color;
			}
		}
		.btn{
			padding: 8px 25px;
			border: 1px solid $default-color;
			color: $default-color;
			margin-left: 5px;
		}
		.btn:hover{
			background-color: $default-color;
			color: #fff;
		}

	}
</style>
