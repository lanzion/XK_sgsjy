<template>
    <el-dialog class="upload_result dialog" title="上传成果" :visible.sync="visible.show" size="tiny" @close="close">
        <!-- <header class="header">上传成果</header> -->
        <section class="content-box clearfix">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <!-- 名称 -->
                <el-row>
                    <el-form-item label="成果名称" prop="name">
                        <el-col :span="20">
                            <el-input placeholder="请输入成果名称" style="width:323px;" v-model="form.name"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                  <!-- 附件 -->
                <el-row>
                    <el-form-item label="附件" required>
                        <el-col :span="20">
                            <el-upload class="upload-demo" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                                <span class="psn-upload-btn"><i class="icon-btn-add-circle"></i> 上传文件</span>
                                <span slot="tip" class="upload-tip">单个文件最大{{standardFileSize}}M</span>
                            </el-upload>
                        </el-col>
                        <div style="position:absolute;font-size:12px;top:80%;color:#ff4949;" v-if="noFile">
                            请选择附件
                        </div>
                    </el-form-item>
                </el-row>
                <!-- 成果类型 -->
                <el-row>
                    <el-form-item label="成果类型" required>
                        <el-col :span="10">
                            <el-select style="width:323px;" v-model="form.resultType" placeholder="请选择成果类型">
                                <el-option
                                      v-for="item in resultTypeDicList.dicList"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                </el-option>
                              </el-select>
                        </el-col>
                    </el-form-item>
                </el-row>
            </el-form>
        </section>
        <div class="buttonGroup clearfix">
            <a class="psn-cancel-btn" @click="visible.show = false">取消</a>
            <a class="psn-confirm-btn" @click="submitUpload">确定</a>
        </div>
    </el-dialog>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { fileUpload } from 'Asset/js/common-config.js'
    import { uploadSubjectResult } from '@/service/subject.js'
    import { mapState, mapActions } from 'vuex'

    export default{
        name: 'upload_result',
        mixins: [uploadFileSize],
        data() {
            return {
                fileUpload,
                form: {
                    name: '',
                    resultType: ''
                },
                fileList: [],
                rules: {
                    name: [
                        { required: true, message: '请输入成果名称', trigger: 'change' },
                        { max: 20, message: '不超过20字符', trigger: 'change' }
                    ],
                    resultType: [
                        { required: true, message: '请选择成果类型', trigger: 'change' }
                    ]
                },
                noFile: false,
            }
        },
        props: {
            visible: {
                type: Object,
                default: { visible: false }
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                resultTypeDicList: 'resultTypeDicList'
            })
        },
        watch: {
            fileList: {
                handler: function (val) {
                    if (val.length > 0) {
                        this.noFile = false
                    }
                },
                deep: true
            }
        },
        methods: {
            ...mapActions('subject', ['statisticalAdd']),
            UploadFile(file) {
                const fileSize = file.size
                const _this = this
                if (fileSize < (_this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.fileList.push({ name: files.name, size: fileSize, url: res.appendInfo.resourceId })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (files, reason) {
                        _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
                    })
                } else {
                    _this.fileList.splice(_this.fileList.length, 1)
                    _this.$message({ message: `文件大小不超过${_this.standardFileSize}M` })
                    uploader.cancelFile(file)
                }
            },
            handleRemove(file, fileList) {
                this.fileList = fileList
            },
            submitUpload() {
                if (localStorage.getItem('loginInfo')) {
                    if (!this.fileList.length > 0) {
                        this.noFile = true
                    }
                    this.$refs.form.validate((valid) => {
                        if (valid && !this.noFile) {
                            // const form = this.form
                            const params = {
                                name: this.form.name,
                                resultType: this.form.resultType,
                                resourceId: this.fileList[0].url,
                                subjectId: this.$route.query.subjectId,
                                resourceName: this.fileList[0].name,
                                fileSize: this.fileList[0].size
                            }
                            uploadSubjectResult(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.visible.show = false
                                    this.$refs.form.resetFields()
                                    this.fileList = []
                                    this.form.resultType = ''
                                    this.showMessage('success', '上传成功')
                                    this.$emit('callback')
                                    this.statisticalAdd('resultNum')
                                } else {
                                    this.showMessage('error', res.data.msg)
                                }
                            })
                        } else {
                            this.showMessage('warning', '请按要求填写完整的信息')
                             return false
                        }
                    })
                } else {
                    this.showMessage('warning', '请登录后再操作')
                }
            },
            close() {
                this.$refs.form.resetFields()
                this.fileList = []
                this.form.resultType = ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    @import '~@/assets/css/scss/subject_dialog.scss';
    .upload_result{
        .content-box{
            margin: 35px 0 80px;
            .label{
                line-height: 38px;
                margin: 0 18px 0px 40px;
                font-size: 18px;
            }
            .upload-btn{
                width: 96px;
                height: 38px;
                line-height: 38px;
                border:1px solid #ccc;
                padding: 8px;
                margin-right: 15px;
                i{
                    font-size: 14px;
                    color: $theme_color;
                }
            }
        }
    }
</style>

<style lang="scss">
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/subject_dialog.scss';
.upload_result{
    .el-textarea__inner{
        height: 85px;
    }
    .el-input__inner{
        height: 38px;
    }
    .el-select{
        height: 38px;
        width: 100%;
    }
    .el-upload-list__item.is-success .el-icon-close, .el-upload__input {
        position: absolute;
        top: 5px;
        right: 10px;
    }
}
</style>

