<template>
    <el-dialog class="stage_initiate dialog" :title="tips.headTitle" :visible.sync="visible.show" size="tiny" @close="dialogClose">
        <!-- <header class="header">{{tips.headTitle}}</header> -->
        <section class="content-box clearfix">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <!-- 名称 -->
                <el-row>
                    <el-form-item :label="tips.label" prop="auditRemark">
                        <el-col :span="20">
                            <el-input type="textarea" v-model="form.auditRemark" :placeholder="tips.placeholder" style="height: 100px;"></el-input>
                        </el-col>
                      </el-form-item>
                </el-row>
                  <!-- 附件 -->
                <el-row>
                    <!-- <el-form-item label="附件" required> -->
                    <el-form-item label="附件">
                        <el-col :span="20">
                            <el-upload class="upload-demo" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                                <span class="psn-upload-btn"><i class="icon-btn-add-circle"></i> 上传文件</span>
                                <span slot="tip" class="upload-tip">单个文件最大{{ standardFileSize }}M</span>
                            </el-upload>
                        </el-col>
                    </el-form-item>
                </el-row>
            </el-form>
        </section>
        <div class="buttonGroup clearfix">
            <a class="psn-cancel-btn" @click="dialogClose">取消</a>
            <a class="psn-confirm-btn" @click="submitUpload">确定</a>
        </div>
    </el-dialog>
</template>

<script>
    import { fileUpload } from 'Asset/js/common-config.js'
    import { modifySubjectStage } from '@/service/subject.js'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'

    export default{
        name: 'stage_initiate',
        mixins: [uploadFileSize],
        data() {
            return {
                fileUpload: fileUpload,
                form: {
                    auditRemark: '',
                },
                fileList: [],
                rules: {
                    auditRemark: [
                        { required: true, message: '请输入开题报告', trigger: 'change' },
                        { max: 500, message: '不超过500字符', trigger: 'change' }
                    ],
                },
                tips: {},
                id: ''
            }
        },
        props: {
            visible: {
                type: Object,
                default: { visible: false }
            },
            stageCode: {
                type: Number,
                default: 2
            },
            stageId: {
                type: String,
                default: ''
            }
        },
        watch: {
            stageCode: {
                handler: function (val) {
                    switch (val) {
                        case 2 :
                            this.tips = { headTitle: '发起开题', placeholder: '请输入开题报告', label: '开题报告' }
                            break
                        case 3 :
                            this.tips = { headTitle: '发起中期评估', placeholder: '请输入中期评估', label: '中期报告' }
                            break
                        case 4 :
                            this.tips = { headTitle: '发起结题验收', placeholder: '请输入结题验收', label: '结题报告' }
                            break
                        default :
                            this.tips = { headTitle: '发起开题', placeholder: '请输入开题报告', label: '开题报告' }
                            break
                    }
                },
                deep: true
            },
            stageId: {
                handler: function (val) {
                    this.id = val
                },
                deep: true
            }
        },
        methods: {
            UploadFile(file) {
                const fileSize = file.size
                const _this = this
                if (fileSize < (_this.standardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.fileList = []
                            _this.fileList.push({ name: files.name, size: fileSize, url: res.appendInfo.resourceId, status: 'finished' })
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
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const params = {
                            id: this.id,
                            auditRemark: this.form.auditRemark,
                            resourceType: this.fileList.length ? 4 : null,
                            name: this.fileList.length ? this.fileList[0].name : null,
                            resourceId: this.fileList.length ? this.fileList[0].url : null,
                            fileSize: this.fileList.length ? this.fileList[0].size : null
                        }
                        modifySubjectStage(params).then((res) => {
                            if (res.data.code === 200) {
                                this.visible.show = false
                                this.fileList = []
                                this.form.auditRemark = ''
                                this.showMessage('success', '发起成功')
                                this.$emit('callback')
                            } else {
                                this.showMessage('info', res.data.msg)
                            }
                        })
                    } else {
                        return false
                    }
                })
            },
            dialogClose() {
                this.visible.show = false
                this.fileList = []
                this.form.auditRemark = ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    @import '~@/assets/css/scss/subject_dialog.scss';
    .stage_initiate{
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
.stage_initiate{
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

