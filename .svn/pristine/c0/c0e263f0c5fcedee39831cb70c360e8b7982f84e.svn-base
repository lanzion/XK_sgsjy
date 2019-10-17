<template>
	<div class="storyPublish backend-content__middle">
		<el-form ref="form" :model="form" label-width="80px" :rules="rules">
			<!-- 作品名称 -->
	        <el-row>
	          	<el-form-item label="故事标题" prop='name'>
		            <el-col :span="9">
		              	<el-input :disabled="isPreview" placeholder="请输入故事标题，不超过50字" :maxlength="50" v-model="form.name"></el-input>
		            </el-col>
	          	</el-form-item>
	        </el-row>
	        <!-- 所属分类 -->
	        <el-row>
	        	<el-form-item label="故事分类" prop='category'>
	        		<el-col :span="9">
	        			<el-select :disabled="isPreview" v-model="form.category" placeholder="请选择故事分类" style="width:100%;height:38px;">
			                <el-option v-for="item in storyCategory" :key="item.id" :label="item.name" :value="item.id"></el-option>
			            </el-select>
	        		</el-col>
	        	</el-form-item>
	        </el-row>
	        <!-- 故事封面 -->
            <el-row>
                <el-form-item label="故事封面" required style="position:relative;">
                    <el-col :span="14">
                        <el-upload :disabled="isPreview" class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadCover">
                            <img v-if="img" :src="img" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload>
                        <div class="tips fl" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 故事简介 -->
		  	<el-row>
			  	<el-form-item label="故事简介" prop="introduction">
			  		<el-col :span="23">
				    	<el-input :disabled="isPreview" type="textarea" :maxlength="300" v-model="form.introduction" placeholder="请输入故事简介，300字以内" style="height: 100px;"></el-input>
				    </el-col>
			  	</el-form-item>
		  	</el-row>
		  	<!-- 故事详情 -->
	        <el-row>
	        	<el-form-item label="故事详情" prop='contentText' style="position:relative;">
	        		<el-col :span="23">
	        			<el-input :disabled="isPreview" v-model="form.contentText" v-show="false"></el-input>
	        			<div id="editor-trigger" style="height: 200px"></div>
	        		</el-col>
	        		<div style="position:absolute;font-size:12px;bottom:-27px;color:#d00;" v-if="isToMuch">
                      	输入内容过多
                    </div>
	        	</el-form-item>
	        </el-row>
	        <!-- 按钮部分 -->
	        <el-form-item v-if="!isPreview">
	        	<button class="save-btn" @click.prevent="onSubmit(0)" type="button">保存</button>
	        	<button class="save-btn" @click.prevent="onSubmit(1)" type="button">提交审核</button>
	          	<button class="btn" @click.prevent="$router.push({name:'adminStory'})">取消</button>
	        </el-form-item>
		</el-form>
	</div>
</template>

<script>
import { editor } from '@/mixin/wangEditor.js'
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { publishStory,modifyStory,requestStoryDetail } from '@/service/story.js'
import { requestDictComb } from '@/service/common.js'
	export default {
		name:'storyPublish',
		mixins: [uploadFileSize, editor],
		data () {
			var validContent = (rule, value, callback) => {
				if (value <= 0) {
					callback(new Error('请输入故事详情'))
				} else {
					callback()
				}
			};
			return {
				// 上传文件大小
				// 图片
				imgSize: 2,
				// 表单
				form: {
					name: '',
					category: '',
					cover: '',
					introduction: '',
			        content: '',
			        contentText: null,
			        id: null,
				},
				userIdentity:'',
				// 表单检验
				rules: {
					name: [
						{ required: true, message: '请输入故事标题', trigger: 'blur' },
	                    { max: 50, message: '不超过50字符', trigger: 'blur' }
					],
					category: [
						{ required: true, message: '请选择故事分类', trigger:'change'}
					],
					introduction: [
						{ required: true, message: '请输入故事简介', trigger:'blur' },
						{ max:300, message: '不超过300字符', trigger:'blur' }
					],
					contentText: [
						{ validator: validContent, trigger: 'change' },
					]
				},
				isToMuch: false,
				img: '',
				storyCategory: [],
				isPreview: false
			}
		},
		created () {
			this.isPreview = this.$route.path.includes('preview')
			// 登录账号类型
			this.userIdentity = this.$ls.get('userIdentity')
			this.getCategoryList()
		},
		mounted () {
			const self = this;
			this.initEditor()
			if (this.isPreview) {
				this.editor.disable()
			}
			this.editor.onchange = function () {
	            self.form.contentText = this.$txt.text().trim().length || this.$txt.find('img').length;
	            self.form.content = this.$txt.html();
	        }
	        if(this.$route.query.id !== undefined){
	        	requestStoryDetail({id:this.$route.query.id}).then((res) => {
	        		if(res.data.code == 200){
	        			let _form = this.form;
	        			let detail = res.data.entity;
	        			_form.name = detail.name;
	        			_form.category = detail.category;
	        			_form.cover = detail.cover;
	        			_form.introduction = detail.introduction;
	        			_form.content = detail.content;
	        			_form.id = detail.id;
	        			this.editor.$txt.html(detail.content);
	        			_form.contentText = this.editor.$txt.text().trim().length || this.editor.$txt.find('img').length;
	        			this.img = this.getFileUrl(detail.cover);
	        		}
	        	})
	        }
		},
		watch:{
			'form.content':{
				handler: function(val,oldVal){
					if(val.length > 6000){
						this.isToMuch = true
					}else{
						this.isToMuch = false
					}
				},
				deep:true
			}
		},
		methods: {
			//获取分类列表
            getCategoryList () {
            	requestDictComb({"groupCode": "storyCategory"}).then((res) => {
            		if(res.data.code == 200){
            			this.storyCategory = res.data.entity.dicList;
            		}
            	})
            },
            UploadCover (file, fileList) {
            	const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                            if(res.code === 200) {
                                _this.form.cover = res.appendInfo.resourceId
                        		_this.img = _this.getFileUrl(res.appendInfo.resourceId)
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
                    _this.form.cover = null
                    _this.img = _this.getFileUrl(null)
                    uploader.cancelFile(file)
                }
	        },
			onSubmit(isSubmit){
				this.$refs['form'].validate((valid)=>{
					if(valid && !this.isToMuch){
						let form = this.form
						let data = {
							name: form.name,
							category: form.category,
							introduction: form.introduction.replace(/[\r\n]/g,""),
							cover: form.cover,
							content: form.content,
							isSubmit: isSubmit
						};
						if(this.$route.query.id !== undefined){
							data.id = form.id
							modifyStory(data).then((res)=>{
								if(res.data.code == 200){
									this.showMessage('success','修改成功');
									this.$router.push({name: 'adminStory'})
								} else {
									this.showMessage('warning',res.data.msg)
								}
							})
						}else{
							publishStory(data).then((res)=>{
								if(res.data.code == 200){
									this.showMessage('success','发布成功');
									this.$router.push({name: 'adminStory'})
								} else {
									this.showMessage('warning',res.data.msg)
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
.storyPublish{
	min-height: 820px;
	font-size: 14px;
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
		line-height: 100px;
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
	// 发布、取消按钮

	.btn{
		padding: 0px 20px;
		height: 32px;
		line-height: 32px;
		border: 1px solid $default-color;
		color: $default-color;
		margin-left: 5px;
		box-sizing: border-box;
	}
	.save-btn{
		padding: 0px 20px;
		height: 34px;
		line-height: 34px;
		background-color: $default-color;
		color: #fff;
		margin-left: 5px;
	}
	.upload-tip{
		font-size: 12px;
	}
	.save-btn:hover{
		opacity: 0.75;
	}
	.btn:hover{
		background-color: $default-color;
		color: #fff;
	}
}
</style>

<style lang="scss">
	.storyPublish{
		.el-textarea__inner{
			height: 100px;
		}
		.el-input__inner{
			height: 38px;
		}
		.el-input__icon{
			width: 10%;
		}
	}
</style>
