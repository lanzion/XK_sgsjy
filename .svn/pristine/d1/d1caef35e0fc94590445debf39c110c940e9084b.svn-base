<template>
	<section id="create_interest" class="backend-content__middle">
		<header class="head-tip" v-if="isEdit"><span class="tip-text">基本信息</span></header>
		<div class="form-box">
			<el-form ref="form" :model="form" label-width="100px" :rules="rules">
				<!-- 兴趣组头像 -->
                <el-row>
                    <el-form-item label="兴趣组头像" style="position:relative;" required>
                        <el-col :span="14">
                            <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadFile">
                                <img v-if="img != '' && img != null" :src="getFileUrl(img)" class="cover">
                                <i v-else class="el-icon-plus cover-uploader-icon"></i>
                            </el-upload>
                            <div class="tips fl" style="color:#8391a5;">
                                仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M。<br>
                                建议上传的图片像素为 450 x 250
                            </div>
                            <!-- <div class="tips fl" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div> -->
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 兴趣组属性 -->
		        <el-row>
		        	<el-form-item label="兴趣组属性" prop="interestAttr">
		        		<el-col :span="20">
		        			<el-radio-group v-model="form.interestAttr">
			                	<p class="radio-box" style="margin-bottom: 10px;">
			                		<el-radio :label="1" :key="1">公开<span class="radio-tips">平台所有用户都可看到</span></el-radio>
			                	</p>
			                	<p class="radio-box">
			                		<el-radio :label="2" :key="2">私密<span class="radio-tips">只有兴趣组成员可以看到</span></el-radio>
			                	</p>
		              		</el-radio-group>
		        		</el-col>
		        	</el-form-item>
		        </el-row>
		        <!-- 审核 -->
				<el-row>
					<el-form-item style="margin-bottom:10px;">
					    <el-col :span="9">
					    	<el-checkbox v-model="form.audit" style="padding-left: 3px;">加入审核</el-checkbox>
					    </el-col>
				  	</el-form-item>
				</el-row>
		        <!-- 兴趣组名称-->
				<el-row>
					<el-form-item label="兴趣组名称" prop="name">
					    <el-col :span="9">
					    	<el-input placeholder="请输入兴趣组名称，20字以内" :maxlength="20" v-model="form.name"></el-input>
					    </el-col>
				  	</el-form-item>
				</el-row>
				<!-- 兴趣组简介-->
			  	<el-row>
				  	<el-form-item label="兴趣组简介" prop="introduction">
				  		<el-col :span="23">
					    	<el-input type="textarea" :maxlength="500" v-model="form.introduction" placeholder="请输兴趣组简介，500字以内" style="height: 100px;"></el-input>
					    </el-col>
				  	</el-form-item>
			  	</el-row>
			  	<el-row>
				  	<el-form-item label="分类" prop="interestType">
				  		<el-col :span="9">
				  			<multi-select style="width:100%;display:inline-block;" :selectData.sync="form.interestType" :ifAll='false' :model='"interest"'></multi-select>
				  		</el-col>
				  	</el-form-item>
			  	</el-row>
			  	<el-row>
			  		<el-form-item label="相关技术" prop="technologys">
			  			<el-col :span="9">
			  				<el-select multiple placeholder="请选择相关技术" v-model="form.technologys" style="width:100%;">
				              	<el-option
				                v-for="item in technologysOptions"
				                :key="item.id"
				                :label="item.name"
				                :value="item.id">
				              	</el-option>
			            	</el-select>
			  			</el-col>
			  		</el-form-item>
			  	</el-row>
			  	<el-form-item>
          			<button class="submit-btn" type="button" @click.prevent="createInterest(0)">保存</button>
          			<button class="submit-btn" type="button" @click.prevent="createInterest(1)" v-if="!isManage">提交并审核</button>
          			<button class="btn" @click.prevent="$router.go(-1)" v-if="!isManage">取消</button>
        		</el-form-item>
			</el-form>
		</div>
	</section>
</template>

<script>
	import { uploadFileSize } from '@/mixin/uploadFileSize.js'
	import multiSelect from 'Common/select/multi_select.vue';
	import { addInterestGroup, requestInterestDetail, modifyInterestGroup, judgeAdmin } from '@/service/interest.js';
	import { requestDictComb } from '@/service/common.js'
	export default{
		name: 'create_interest',
		mixins: [uploadFileSize],
		components: {
			'multi-select': multiSelect,
		},
		data(){
			return{
				singleSelectData:{
					groupCode: 'technicalClassification',
					ifAll: false,
					multiple:true,
					placeholder: '选择技术'
				},
				form:{
					imgUrl:'',
					interestAttr:'',
					audit:false,
					name:'',
					introduction:'',
					interestType:[],
					technologys:[]
				},
				technologysOptions:[],
				technologyList:[],
				rules:{
					interestAttr: [
						{ required: true, message: '请选择兴趣组属性' }
					],
					name: [
						{ required: true, message: '请输入兴趣组别名', trigger: 'blur' },
						{ max: 20, message: '不超过20字符', trigger: 'change' }
					],
					introduction: [
						{ required: true, message: '请输入兴趣组简介', trigger: 'blur' },
						{ max: 500, message: '不超过500字符', trigger: 'change' }
					],
					interestType: [
						{ required: true, type: 'array', message: '请选择分类', trigger: 'change' }
					],
					technologys: [
						{ required: true, type: 'array', message: '请选择相关技术', trigger: 'change' }
					]
				},
				img: null,
				isEdit:false,
				isManage:false,
			}
		},
		mounted() {
			if(this.$route.query.id != undefined){
				this.isEdit = true;
				this.getInterestInfo()
			};
			this.isManage = this.$route.path.includes('interestManage')
	        this.getSelect()
		},
		methods: {
			// 获取技术select的options
			getSelect() {
				let data = { groupCode: 'technicalClassification' };
				// 获取技术分类
				requestDictComb(data).then((res)=> {
					this.technologysOptions = res.data.entity.dicList;
				})
			},
	        UploadFile (file, fileList) {
	            const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
		                uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
		                    if(res.code === 200) {
		                    	_this.form.imgUrl = res.appendInfo.resourceId
		                    	_this.img = res.appendInfo.resourceId
		                    }
		                })
		                uploader.off('uploadError').on('uploadError', function (file, reason) {
		                    _this.$message({ message: reason.msg })
		                })
                } else {
                	if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                        _this.$message({
                            message: '请上传支持格式的图片',
                        })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.imgStandardFileSize}M`
                        })
                    }
                    _this.form.imgUrl = null
                    _this.img = null
                    uploader.cancelFile(file)
                }
	        },
	        /*
	        *获取兴趣组信息
	        *id：班级id
	         */
	        getInterestInfo(){
	        	let params = {
		            id:this.$route.query.id
		        }
		        requestInterestDetail(params).then((res) => {
		            let detail = res.data.entity;
		            let form = this.form;
		            form.imgUrl = detail.cover;
		            this.img = detail.cover;
		            form.interestAttr = detail.property === 'public' ? 1 : 2;
		            form.audit = detail.audit === 1 ? true : false;
		            form.name = detail.name;
		            form.introduction = detail.introduction;
		            form.interestType = detail.interestType ? detail.interestType.split('-') : [];
		            form.technologys = detail.techonolgyString ? detail.techonolgyString.split(',') : [];
		        })
	        },
	        /*
	        *添加兴趣组
	        * 	"cover": "1.兴趣组图片",
			    "property": "public",
			    "audit": 1,
			    "name": "1.创建的第一个兴趣组",
			    "introduction": "1.兴趣组简介",
			    "technologys": [
			        {
			            "technologyId": "afd8512d12c841eeaa8bbc565bcb2c14"
			        },
			        {
			            "technologyId": "d86d34f6b7ef41158223842955bf73c5"
			        }
			    ],
			    "interestType": "4-1-2-3",
			    "interestTypeParent":""
	         */
	       	createInterest(isSubmit) {
	       		if (localStorage.getItem('loginInfo')) {
	       			let sucMsg = isSubmit == 0 ? '保存成功' : '提交成功'
	       			this.$refs['form'].validate((valid) => {
	       				if (valid) {
	       					for (let i in this.form.technologys) {
		       					this.technologyList.push({ technologyId: this.form.technologys[i] })
		       				}
		       				let params = {
		       					cover: this.form.imgUrl,
		       					property: this.form.interestAttr === 1 ? 'public' : 'private',
		       					audit: this.form.audit ? 1 : 0,
		       					name: this.form.name,
		       					introduction: this.form.introduction,
		       					technologys: this.technologyList,
		       					interestType: this.form.interestType.join('-'),
		       					interestTypeParent: this.form.interestType[0],
		       					isSubmit: isSubmit
		       				};
		       				if (this.isEdit) {
		       					params.id = this.$route.query.id;
		       					modifyInterestGroup(params).then((res) => {
			       					if (res.data.code === 200) {
			       						this.showMessage('success', '修改成功');
			       						this.technologyList = [];
			       						if (this.$route.path.includes('admin')) {
			       							this.$router.push({name: 'adminInterest'})
			       						}
			       					} else {
			       						this.showMessage('warning', res.data.msg);
			       					}
			       				})
		       				} else {
		       					addInterestGroup(params).then((res) => {
			       					if (res.data.code === 200) {
			       						this.showMessage('success', sucMsg);
			       						this.$refs['form'].resetFields();
			       						this.$router.push({name: 'adminInterest'})
			       					} else {
			       						this.showMessage('warning', res.data.msg);
			       					}
			       				})
		       				}
	       				} else {
	       					return false;
	       					this.showMessage('warning', '请那要求填写完整信息哦')
	       				}
	       			})
	       		} else {
	       			this.showMessage('warning', '请先登录再操作')
	       		}
	       	}
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
*{
	box-sizing: border-box;
}
#create_interest{
	width: 100%;
	.head-tip{
		border-bottom: 1px solid #c9c9c9;
		font-size: 16px;
		margin-bottom: 20px;
		.tip-text{
			display: inline-block;
			padding: 15px 15px 10px;
			color: $default-color;
			border-bottom: 2px solid $default-color;
			margin-bottom: -1px;
		}
	}
}

	// 封面上传
.cover-uploader{
  	border: 1px dashed #fdbcba;
  	border-radius: 3px;
  	cursor: pointer;
  	position: relative;
 	 height: 100px;
  	width: 100px;
  	background-color: #fff9f9;
}
.tips {
	height: 100px;
	line-height: 2;
	font-size: 12px;
	padding-top: 12px;
	margin-left: 20px;
}
.cover-uploader .el-upload:hover {
  	border-color: #20a0ff;
}
.cover-uploader-icon {
  	font-size: 28px;
  	color: #8c939d;
  	width: 100px;
  	height: 100px;
  	line-height: 100px;
  	text-align: center;
}
.cover {
 	width: 100px;
  	height: 100px;
  	display: block;
}
.btn{
	width: 96px;
	height: 32px;
	border-radius: 3px;
	border: 1px solid $default-color;
	color: $default-color;
	font-size: 14px;
	line-height: 29px;
}
.btn:hover{
	background-color: $default-color;
	color: #fff;
}
.submit-btn{
	width: 96px;
	height: 33px;
	border-radius: 3px;
	color: #fff;
	font-size: 14px;
	background-color: $default-color;
	line-height: 29px;
	margin-right: 10px;
}
.submit-btn:hover{
	opacity: 0.75;
}
</style>

<style lang="scss">
	#create_interest{
		.el-textarea__inner{
			height: 102px;
			border-radius: 3px;
		}
		.el-input__inner{
			height: 38px;
			border-radius: 3px;
		}
		.el-select{
			height: auto;
			.el-tag{
				margin: 3px ;
			}
		}
		.radio-box{
			.el-radio{
				.el-radio__label{
					.radio-tips{
						font-size: 12px;
						color: #999;
						margin-left: 20px;
					}
				}
			}
		}
		.bs-search-button{
			margin-left:0;
		}
	}
</style>