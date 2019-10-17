<template>
    <section id="base_info">
        <header class="head-tip bgw"><span class="tip-text">基本信息</span></header>
        <div class="form-box bgw">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <!-- 班级头像 -->
                <el-row>
                    <el-form-item label="班级头像" required style="position:relative;">
                        <el-col :span="14">
                            <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadFile">
                                <img v-if="img != '' && img != null" :src="getFileUrl(img)" class="cover">
                                <i v-else class="el-icon-plus cover-uploader-icon"></i>
                            </el-upload>
                            <div class="tips fl" style="color:#8391a5;">
                                仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M。<br>
                                建议上传的图片像素为 450 x 250
                            </div>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 班级属性 -->
                <el-row>
                    <el-form-item label="班级属性" required>
                        <el-col :span="20">
                            <el-radio-group v-model="form.classAttr">
                                <p class="radio-box" style="margin-bottom: 10px;">
                                    <el-radio :label="'1'" :key="'1'">公开<span class="radio-tips">平台所有用户都可看到</span></el-radio>
                                </p>
                                <p class="radio-box">
                                    <el-radio :label="'2'" :key="'2'">私密<span class="radio-tips">只有班级成员可以看到</span></el-radio>
                                </p>
                              </el-radio-group>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 班级别名-->
                <!-- <el-row>
                    <el-form-item label="班级别名" prop="alias">
                        <el-col :span="9">
                            <el-input placeholder="请输入班级别名，最多20字" v-model="form.alias"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row> -->
                <!-- 班级简介 -->
                  <el-row>
                      <el-form-item label="班级简介" prop="remark">
                          <el-col :span="23">
                            <el-input type="textarea" v-model="form.remark" placeholder="请输入班级介绍，不超过500字" style="height: 100px;"></el-input>
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
    // import { beforeUploadFile } from '@/js/uploadFile.js'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { modifyClaszInfo, claszDetails } from '@/service/space_clasz.js'

    export default{
        name: 'base_info',
        mixins: [uploadFileSize],
        components: {},
        data() {
            return {
                form: {
                    imgUrl: '',
                    classAttr: '',
                    // alias: '',
                    remark: ''
                },
                fileList: [],
                rules: {
                    // alias: [
                    //     { required: true, message: '请输入班级别名', trigger: 'change' },
                    //     { max: 20, message: '不超过20字符', trigger: 'change' }
                    // ],
                    remark: [
                        { required: true, message: '请输入班级介绍', trigger: 'change' },
                        { max: 500, message: '不超过500字符', trigger: 'change' }
                    ]
                },
                claszId: this.$route.query.id || this.$ls.get('baseInfo').student.classId,
                img: null
            }
        },
        mounted() {
            this.getClaszInfo()
        },
        methods: {
            handleRemove(file, fileList) {
                this.fileList = fileList
            },
            UploadFile(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.form.imgUrl = res.appendInfo.resourceId
                            _this.img = res.appendInfo.resourceId
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (files, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this.form.imgUrl = null
                    _this.img = null
                    if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                        _this.$message({
                            message: '请上传支持格式的图片',
                        })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.imgStandardFileSize}M`
                        })
                    }
                    uploader.cancelFile(file)
                }
            },
            /*
             * 获取班级信息
             * id：班级id
             */
            getClaszInfo() {
                claszDetails({ id: this.claszId }).then((res) => {
                    if (res.data.code === 200) {
                        const info = res.data.entity || {}
                        const _form = {
                            imgUrl: info.face,
                            classAttr: info.properties,
                            // alias: info.alias,
                            remark: info.remark
                        }
                        this.form = _form
                        this.img = info.face
                    }
                })
            },
            /*
             * 班级空间-管理-基本信息-修改
             * id: "1706ebd714d54e35b75578eea16a5cf8",
             * face: "11111111",
             * properties: "1",
             * alias: "werewr",
             * remark: "ddddd"
             */
            modifyInfo(event) {
                const evt = window.event || event
                evt.preventDefault()
                if (!localStorage.getItem('loginInfo')) {
                    this.$store.commit('toggleLoginModal', true)
                } else {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            const params = {
                                id: this.claszId,
                                face: this.form.imgUrl,
                                properties: this.form.classAttr,
                                // alias: this.form.alias,
                                remark: this.form.remark
                            }
                            modifyClaszInfo(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.showMessage('success', '修改成功')
                                } else {
                                    this.showMessage('warning', res.data.msg)
                                }
                            })
                        } else {
                            this.showMessage('warning', '请按要求填写完整信息哦')
                        }
                    })
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars';
.head-tip {
    .tip-text {
        color: nth($default-color, 1);
        border-bottom: 2px solid nth($default-color, 1);
    }
}
    *{
        box-sizing: border-box;
    }
    #base_info{
        width: 100%;
        .head-tip{
            border-bottom: 1px solid #ddd;
            font-size: 16px;
            .tip-text{
                display: inline-block;
                padding: 15px 15px 10px;
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
    line-height: 2;
    font-size: 12px;
    padding-top: 20px;
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
    background-color: nth($default-color, 1);
}
.submit-btn:hover{
    opacity: 0.75;
}
</style>

<style lang='scss'>
@import '~@/assets/css/scss/form.scss';
    #base_info{
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