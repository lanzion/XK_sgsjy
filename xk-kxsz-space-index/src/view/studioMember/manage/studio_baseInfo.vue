<template>
	<section id="studio_baseInfo">
		<header class="head-tip bgw"><span class="tip-text">基本信息</span></header>
		<div class="form-box bgw">
			<el-form ref="form" :model="form" label-width="100px" :rules="rules">
				<!-- 头像 -->
                <el-row>
                    <el-form-item label="导师照片" prop="imgUrl">
                        <el-col :span="14">
                            <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadFile">
                                <img v-if="img != '' && img != null" :src="getFileUrl(img)" class="cover">
                                <i v-else class="el-icon-plus cover-uploader-icon"></i>
                            </el-upload>
                            <div class="tips fl" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M</div>
                        </el-col>
                    </el-form-item>
                </el-row>
		        <!-- 别名-->
				<el-row>
					<el-form-item label="工作室名称" prop="name">
					    <el-col :span="9">
					    	<el-input placeholder="请输入工作室，最多20字" v-model="form.name"></el-input>
					    </el-col>
				  	</el-form-item>
				</el-row>
				<!-- 简介 -->
			  	<el-row>
				  	<el-form-item label="工作室简介" prop="introduction">
				  		<el-col :span="23">
					    	<el-input type="textarea" v-model="form.introduction" placeholder="请输入工作室简介，不超过300字" style="height: 100px;"></el-input>
					    </el-col>
				  	</el-form-item>
			  	</el-row>
			  	<el-form-item>
          			<button class="btn submit-btn" @click.prevent="modifyInfo">保存</button>
        		</el-form-item>
			</el-form>
		</div>
	</section>
</template>

<script>
	import { uploadFileSize } from '@/mixin/uploadFileSize.js'
	import { modifyBaseInfo,studioDetail } from '@/service/studio.js';
	export default{
		name:'studio_baseInfo',
		mixins: [uploadFileSize],
		components:{},
		data(){
			return{
				form:{
					imgUrl:'',
					name:'',
					introduction:''
				},
				fileList:[],
				rules:{
					imgUrl:[
						{ required: true, message: '请上传图片', trigger: 'change' },
					],
					name:[
						{ required: true, message: '请输入工作室别名', trigger: 'change' },
						{ max: 20, message: '不超过20字符', trigger: 'change' }
					],
					introduction:[
						{ required: true, message: '请输入工作室简介', trigger: 'change' },
						{ max: 500, message: '不超过300字符', trigger: 'change' }
					]
				},
				studioId: '',
				img: null
			}
		},
		created(){
			this.studioId = this.$route.query.id
		},
		mounted(){
	        this.getClaszInfo()
		},
		methods:{
			handleRemove(file, fileList) {
	            this.fileList = fileList
	        },
	        UploadFile (file, fileList) {
	            const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
	                uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
	                    if (res.code === 200) {
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
	         * 获基本信息
	         * id：studioId
	         */
	        getClaszInfo(){
	        	studioDetail({id: this.studioId}).then((res)=>{
	        		let info = res.data.entity;
	        		this.form.imgUrl = info.face;
	        		this.img = info.face;
	        		this.form.name = info.name;
	        		this.form.introduction = info.introduction;
	        	})
	        },
	        /*
	        *-管理-基本信息-修改
	        *"id": "1706ebd714d54e35b75578eea16a5cf8",
	        *"face": "11111111",
	        *"name": "werewr",
	        *"introduction": "ddddd"
	         */
	       	modifyInfo(event){
	       		let evt = window.event || event;
	       		evt.preventDefault()
	       		if( !localStorage.getItem('loginInfo')){
	       			this.$store.commit('toggleLoginModal', true);
	       		}else{
	       			this.$refs['form'].validate((valid) => {
	       				if(valid){
		       				let params = {
		       					id: this.studioId,
		       					face: this.form.imgUrl,
		       					name: this.form.name,
		       					introduction: this.form.introduction,
		       				};
		       				modifyBaseInfo(params).then((res)=>{
		       					if(res.data.code === 200){
		       						this.showMessage('success','修改成功');
		       					}else{
		       						this.showMessage('warning',res.data.msg);
		       					}
		       				})
		       			}else{
		       				this.showMessage('warning','请按要求填写完整信息哦')
		       				return false
		       			}
	       			})
	       		}
	       	}
		}
	}
</script>

<style lang="scss" scoped>
	*{
		box-sizing: border-box;
	}
	#studio_baseInfo{
		width: 100%;
		.head-tip{
			border-bottom: 1px solid #ddd;
			font-size: 16px;
			.tip-text{
				display: inline-block;
				padding: 15px 15px 10px;
				color: #ff7200;
				border-bottom: 2px solid #ff7200;
				margin-bottom: -1px;
			}
		}
		.form-box{
			padding: 20px 10px;

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

.submit-btn{
	width: 96px;
	text-align: center;
	border-radius: 4px;
	color: #fff;
	height: 32px;
	line-height: 29px;
	font-size: 14px;
	background-color: #ff7200;
}
.submit-btn:hover{
	opacity: 0.75;
}
</style>

<style lang="scss">
	#studio_baseInfo{
		.el-textarea__inner{
			height: 102px;
			border-radius: 3px;
		}
		.el-input__inner{
			height: 38px;
			border-radius: 3px;
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
	}
</style>