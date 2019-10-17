<template>
    <el-dialog class="dialog complete_task" :visible.sync="visible.show" size="tiny" title="完成任务" @close="close">
        <!-- <header class="header">完成任务</header> -->
        <section class="content-box clearfix">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <!-- 名称 -->
                <el-row>
                    <el-form-item label="完成说明" prop="instruction">
                        <el-col :span="20">
                            <el-input :maxlength="200" placeholder="请输入说明，最多200字" v-model="form.instruction"></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <!-- 任务期限 -->
                <el-row>
                    <el-form-item label="完成时间" prop="endDate">
                        <el-col :span="20">
                            <el-date-picker type="date" placeholder="选择完成时间" v-model="form.endDate" :picker-options="pickerOptions" style="width: 100%;" ></el-date-picker>
                      </el-col>
                    </el-form-item>
                </el-row>
                <!-- 附件 -->
                <el-row>
                    <el-form-item label="附件" required>
                        <el-col :span="20">
                            <el-upload class="upload-demo" action :file-list="fileList" :on-remove="handleRemove" :before-upload="UploadFile">
                                <span class="upload-btn"><i class="icon-btn-add-circle"></i> 上传文件</span>
                                <span slot="tip" class="upload-tip">单个文件最大{{ standardFileSize }}M</span>
                            </el-upload>
                        </el-col>
                    </el-form-item>
                </el-row>
            </el-form>
        </section>
        <div class="buttonGroup clearfix">
            <a class="reply_btn reply_btn2" @click="visible.show = false">取消</a>
            <a class="reply_btn reply_btn1" @click="submitComplete">确定</a>
        </div>
    </el-dialog>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { fileUpload } from '@/js/common-config.js'
    import { modifySubjectTask } from '@/service/subject.js'

    export default {
        name: 'complete_task',
        mixins: [uploadFileSize],
        data() {
            return {
                fileUpload: fileUpload,
                form: {
                    instruction: '',
                    endDate: '',
                    resource: ''
                },
                fileList: [],
                resources: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                id: '',
                rules: {
                    instruction: [
                        { required: true, message: '请输入完成说明', trigger: 'change' },
                        { max: 200, message: '不超过200个字符', trigger: 'change' }
                    ],
                    endDate: [
                        { type: 'date', required: true, message: '请选择完成时间', trigger: 'change' }
                    ]
                }
            }
        },
        props: {
            visible: {
                type: Object,
                default: { visible: false }
            },
            taskId: {
                type: String,
                default: ''
            }
        },
        watch: {
            taskId: {
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
                            _this.fileList.push({ name: file.name, size: file.size, url: res.appendInfo.resourceId, fileid: res.appendInfo.resourceId })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (files, reason) {
                        _this.$message({ message: reason.msg })
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
            submitComplete() {
                const form = this.form
                if (form.instruction !== '' && form.endDate !== '' && this.fileList.length > 0) {
                    for (const i in this.fileList) {
                        this.resources.push({ resourceId: this.fileList[i].url, fileSize: this.fileList[i].size, name: this.fileList[i].name, resourceType: 6 })
                    }
                    const params = {
                        id: this.id,
                        introduction: form.instruction,
                        endDate: form.endDate.getTime(),
                        resources: this.resources,
                        status: 2
                    }
                    modifySubjectTask(params).then((res) => {
                        if (res.data.code === 200) {
                            this.showMessage('success', '已完成')
                            this.$refs.form.resetFields()
                            this.fileList = []
                            this.resources = []
                            this.$emit('callback')
                            this.visible.show = false
                        } else {
                            this.showMessage('warning', res.data.msg)
                        }
                    })
                } else {
                    this.showMessage('warning', '请填写完整的信息')
                }
            },
            close() {
                this.$refs.form.resetFields()
                this.fileList = []
                this.resources = []
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/scss/vars.scss';
    @import '~@/assets/css/scss/subject_dialog.scss';
</style>

<style lang='scss'>
.dialog.complete_task{
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

