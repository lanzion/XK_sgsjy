<template>
	<div class="open_apply">
		<p class="prompt">我们欢迎全国各地的教育局和学校来平台使用，我们将会为您免费开通线上创客空间。请在下方留下联系方式，我们会在1个工作日内和您联系。</p>
		<el-form ref="form" :model="form" label-width="130px" label-suffix=" :" :rules="rules">
			<el-form-item label="单位类型" prop="type">
				<el-col :span="15">
					<el-radio-group v-model="form.type">
			      		<el-radio v-for="(item, index) in typeOptions" :label="item.label" :key="index">{{item.name}}</el-radio>
			    	</el-radio-group>
				</el-col>
  			</el-form-item>
  			<el-form-item label="级别" v-if="form.type == '2'" prop="eduType">
  				<el-col :span="15">
  					<el-select v-model="form.eduType" placeholder="请选择级别">
      					<el-option v-for="(item, index) in eduTypeOptions" :label="item.label" :value="item.value" :key="index"></el-option>
    				</el-select>
  				</el-col>
  			</el-form-item>
  			<el-form-item label="所在区域" prop="region">
  				<el-col :span="15">
  					<el-input v-model="form.region" v-show="false"></el-input>
  					<xk-region-select :clearable="true" @region="changeRegion"></xk-region-select>
  				</el-col>
  			</el-form-item>
  			<el-form-item label="单位名称" prop="name">
  				<el-col :span="15">
  					<el-input v-model="form.name" :maxlength="60" placeholder="请输入单位名称"></el-input>
  				</el-col>
  			</el-form-item>
  			<el-form-item label="联系人" prop="linkName">
  				<el-col :span="15">
  					<el-input v-model="form.linkName" :maxlength="20" placeholder="请输入联系人"></el-input>
  				</el-col>
  			</el-form-item>
  			<el-form-item label="联系电话" prop="phone">
  				<el-col :span="15">
  					<el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
  				</el-col>
  			</el-form-item>
  			<el-form-item label="地址" prop="address">
  				<el-col :span="15">
  					<el-input v-model="form.address" :maxlength="400" placeholder="请输入地址"></el-input>
  				</el-col>
  			</el-form-item>
  			<el-form-item label="邮箱验证" prop="email">
  				<el-col :span="15">
  					<el-input v-loading="loading" element-loading-text="验证码发送中" v-model="form.email" placeholder="请输入邮箱"></el-input>
  				</el-col>
  				<el-col :span="8" class="valid">
  					<a class="valid_btn" href="javaScript:;" @click.prevent="getEmailCode">验证</a>
  				</el-col>
  			</el-form-item>
  			<el-form-item label="" prop="validCode">
  				<el-col :span="15">
  					<el-input v-model="form.validCode" placeholder="请输入验证码"></el-input>
  				</el-col>
  			</el-form-item>
  			<el-form-item label="三证合一证件" prop="certPhoto" style="position:relative;">
                <el-col :span="15">
                    <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadCover">
                        <img v-if="img" :src="img" class="cover">
                        <i v-else class="el-icon-plus cover-uploader-icon"></i>
                    </el-upload>
                    <div class="tips fl" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="15">
                    <button class="apply-btn" @click.prevent="applyOrg">申请</button>
                </el-col>
            </el-form-item>
		</el-form>
	</div>
</template>

<script>
    // import region from '@/components/common/select/region_select.vue'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { requestEamilValidCode, addOrg } from '@/service/openOrg.js'

    export default {
        name: 'open_apply',
        mixins: [uploadFileSize],
        // components: {
        //     'v-region': region
        // },
        data() {
            const validateName = (rule, value, callback) => {
                const regular = /(^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$)|(^[a-zA-Z]+((\.|\s|·|-|=)[a-zA-Z]+)*$)/
                if (value === '') {
                    callback(new Error('请输入用户名'))
                } else if (!regular.test(value)) {
                    callback(new Error('您输入的用户名格式不正确'))
                } else {
                    callback()
                }
            }
            const validEduType = (rule, value, callback) => {
                if (this.form.type === '2' && value === '') {
                    callback(new Error('请选择教育局级别'))
                } else {
                    callback()
                }
            }
            const validPhone = (rule, value, callback) => {
                const regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/
                if (value === '') {
                    callback(new Error('请输入联系电话'))
                } else if (!regular.test(value)) {
                    callback(new Error('请输入正确格式的联系电话'))
                } else {
                    callback()
                }
            }
            const validEmail = (rule, value, callback) => {
                const regular = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
                if (value === '') {
                    callback(new Error('请输入电子邮箱'))
                } else if (!regular.test(value)) {
                    callback(new Error('请输入正确格式的电子邮箱'))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    name: '',
                    type: '1',
                    eduType: '',
                    linkName: '',
                    phone: '',
                    email: '',
                    address: '',
                    certPhoto: '',
                    validCode: '',
                    region: ''
                },
                rules: {
                    name: [
                        { validator: validateName, required: true, trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择单位类型' }
                    ],
                    eduType: [
                        { validator: validEduType, required: true }
                    ],
                    linkName: [
                        { required: true, message: '请输入联系人', trigger: 'blur' }
                    ],
                    phone: [
                        { validator: validPhone, required: true }
                    ],
                    email: [
                        { validator: validEmail, required: true }
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                    certPhoto: [
                        { required: true, message: '请上传三证合一证件' }
                    ],
                    validCode: [
                        { required: true, message: '请输入验证码' }
                    ],
                    region: [
                        { required: true, message: '请选择区域', trigger: 'change' }
                    ]
                },
                typeOptions: [
                    { name: '学校', label: '1' },
                    { name: '教育局', label: '2' }
                ],
                eduTypeOptions: [
                    { label: '省级', value: '1' },
                    { label: '市级', value: '2' },
                    { label: '区县级', value: '3' }
                ],
                img: '',
                trueEmail: false,
                loading: false
            }
        },
        methods: {
            changeRegion(val) {
                this.form.region = val.join(',')
            },
            // 上传组织机构代码
            UploadCover(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.form.certPhoto = res.appendInfo.resourceId
                            _this.img = _this.getFileUrl(res.appendInfo.resourceId)
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (files, reason) {
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
                    _this.form.certPhoto = null
                    _this.img = _this.getFileUrl(null)
                    uploader.cancelFile(file)
                }
            },
            // 获取邮箱验证码
            getEmailCode() {
                if (this.form.email === '') {
                    this.$message({
                        message: '请输入邮箱，再进行验证',
                        type: 'info'
                    })
                } else {
                    this.loading = true
                    const params = {
                        email: this.form.email
                    }
                    requestEamilValidCode(params).then((res) => {
                        this.loading = false
                        if (res.data.code === 200) {
                            this.$message({
                                message: '验证码已发送至您的邮箱，请查收验证',
                                type: 'success'
                            })
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            })
                        }
                    }, () => {
                        this.loading = false
                        this.$message({
                            message: '验证码发送失败，请重新验证',
                            type: 'error'
                        })
                    })
                }
            },
            applyOrg() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const form = this.form
                        const regionArr = this.form.region.split(',')
                        const params = {
                            name: form.name,
                            type: form.type,
                            eduType: form.eduType,
                            linkName: form.linkName,
                            phone: form.phone,
                            email: form.email,
                            validCode: form.validCode,
                            address: form.address,
                            provinceId: regionArr[0],
                            cityId: regionArr[1],
                            areaId: regionArr[2],
                            certPhoto: form.certPhoto
                        }
                        addOrg(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({
                                    message: '申请已成功提交',
                                    type: 'success'
                                })
                                this.$router.push({ path: '/open/rate' })
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        this.$message({
                            message: '请按要求输入完整的表单信息',
                            type: 'info'
                        })
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
@import '~@/assets/css/scss/form.scss';
	.open_apply {
		.el-input__inner {
			height: 38px;
			line-height: 38px;
			border-radius: 4px;
		}
		.el-form {
			width: 570px;
			margin: 0 auto;
		}
		.el-select {
			width: 100%;
		}
	}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
	.open_apply {
		padding: 0 150px;
		.prompt {
			font-size: 12px;
			color: #999;
			line-height: 1.5em;
			text-align: center;
			margin-bottom: 45px;
		}
	}
	.valid {
		line-height: 38px;
		.valid_btn {
			margin-left: 10px;
			padding: 8px 24px;
			font-size: 14px;
			color: #fff;
			background-color: nth($default-color, 1);
			border-radius: 5px;
			margin-top: 5px;
			&:hover {
				opacity: 0.75;
			}
		}
	}

	// 封面上传
	.cover-uploader{
	  border: 1px dashed nth($default-color, 1);
	  border-radius: 3px;
	  cursor: pointer;
	  position: relative;
	  height: 200px;
	  width: 280px;
	  background-color: rgba(35, 184, 255, 0.05);
	}
	.tips {
		line-height: 2em;
		margin-left: 20px;
	}
	.cover-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.cover-uploader-icon {
	  	font-size: 28px;
	  	color: #8c939d;
	  	width: 280px;
	  	height: 200px;
	  	line-height: 200px;
	  	text-align: center;
	}
	.cover {
	  	width: 280px;
	  	height: 200px;
	  	display: block;
	}
	.apply-btn {
		width: 100%;
		height: 44px;
		background-color: nth($default-color, 1);
		color: #fff;
		font-size: 18px;
		text-align: center;
		border-radius: 5px;
		&:hover {
			opacity: 0.75;
		}
	}
</style>