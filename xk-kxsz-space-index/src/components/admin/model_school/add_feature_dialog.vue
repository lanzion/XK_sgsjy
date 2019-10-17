<template>
    <el-dialog :visible.sync="dialog.isVisible" :title="`${label}特色`" class="add-feature dialog-wrapper">
        <div class="dialog-content">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="标题" prop="name">
                    <el-col :span="20">
                        <el-input v-model="form.name" placeholder="请输入标题，最多20字" :maxlength="20"/>
                    </el-col>
                </el-form-item>
                <el-form-item label="主图" prop="cover" class="pr">
                    <el-col :span="20">
                        <el-upload action :show-file-list="false" class="cover-uploader fl" :before-upload="UploadFile" style="border:none;">
                            <img v-if="form.cover" :src="getFileUrl(form.cover)" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                            <span slot="tip" class="upload-tip">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</span>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-col :span="22">
                        <div id="editor-trigger" style="height: 220px"></div>
                    </el-col>
                </el-form-item>
            </el-form>
            <div class="btn-row">
                <a @click="dialog.isVisible = false" href="javascript:;" class="btn btn-cancel">取消</a>
                <a @click="submit" href="javascript:;" class="btn btn-ok">确定</a>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { editor } from '@/mixin/wangEditor.js'
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { editFeature, addFeature } from '@/service/model_school.js'

export default {
    name: 'featureDialog', // 教育特色弹窗
    mixins: [uploadFileSize, editor],
    data () {
        return {
            curEditingId: '',
            isEditing: false,
            form: {
                content: '',
                cover: '',
                name: '',
            },
            label: '新增',
            rules: {
                name: [
                    {required: true, message: '请输入教育特色标题', trigger: 'change'}
                ],
                cover: [
                    {required: true, message: '请上传主图', trigger: 'change'}
                ],
                content: [
                    {required: true, message: '请输入教育特色内容', trigger: 'change'}
                ]
            }
        }
    },
    props: {
        curEditingItem: {
            type: Object,
            default: () => {}
        },
        dialog: {
            type: Object,
            default: () => {}
        },
        handleRequest: Function,
    },
    created () {
        this.initData()
        this.$nextTick(this.initEdit)
    },
    methods: {
        // 初始弹窗数据
        initData () {
            const {action, id, content, cover, name = '',} = this.curEditingItem

            // 编辑
            if (action === 'edit') {
                this.form = {content, name, cover}
                this.isEditing = true
                this.curEditingId = id
                this.label = '修改'
            }
        },
        initEdit() {
            const {form: {content}, isEditing} = this
            let self = this
            this.initEditor()
            this.editor.onchange = function () {
                self.form.content = this.$txt.html();
            }
            isEditing && this.editor.$txt.html(content)
        },
        UploadFile (file, fileList) {
            const fileSize = file.size,
                  fileName = file.name,
                  expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                  _this = this
            if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                    if(res.code === 200) {
                        _this.form.cover = res.appendInfo.resourceId
                    }
                })
                uploader.off('uploadError').on('uploadError', function (file, reason) {
                    _this.$message({ message: reason.msg })
                })
            }else {
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
                uploader.cancelFile(file)
            }
        },
        // 添加/修改
        submit () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const {label, isEditing, curEditingId} = this
                    const handler = isEditing && editFeature || addFeature
                    const id = isEditing ? curEditingId : undefined
                    const errMsg = `${label}教育特色失败，请稍后重试`
                    const maxContentLen = 1000
                    if (this.form.content.length >= maxContentLen) {
                        this.$message('特色内容过多，请调整后再提交。。')
                        return false
                    }
                    handler({
                        id,
                        ...this.form,
                    }).then(res => {
                        if (res.status === 200 && res.data.code === 200) {
                            this.$message({type: 'success', message: `成功${label}教育特色`, duration: 1000})
                            this.handleRequest()
                            this.dialog.isVisible = false
                            return
                        }

                        this.$message.error(res.data.msg || errMsg)
                    }).catch(() => {
                        this.$message.error(errMsg)
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
    @import "~@/asset/scss/admin_projectForm.scss";

    $uploader-height: 90px;
    .add-feature .el-dialog {
        box-sizing: border-box;
        width: 660px;
        height: 550px;
        .el-dialog__body {
            padding: 0;
        }
        .el-input__inner {
            width: 330px;
        }
        .cover-uploader {
            height: $uploader-height;
            background-color: #fff;
            .el-upload {
                box-sizing: border-box;
                width: $uploader-height;
                height: $uploader-height;
                margin-right: 20px;
                border: 1px dashed #42b8fd;
                background-color: #e8f5fd;
                .el-icon-plus {
                    width: $uploader-height;
                    height: $uploader-height;
                    line-height: $uploader-height;
                }
                .cover {
                    width: 88px;
                    height: 88px;
                }
            }
            .upload-tip {
                line-height: $uploader-height;
                vertical-align: top;
                font-size: 12px;
                color: #999;
            }
        }
    }
</style>
<style lang="scss" scoped>
    @import "~@/asset/scss/vars.scss";

    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .dialog-wrapper .btn-row {
                .btn-ok {
                    background-color: $color-value;
                }
                .btn-cancel {
                    border: 1px solid $color-value;
                    color: $color-value;
                }
            }
        }
    }

    .dialog-wrapper {
        .dialog-content {
            padding-top: 20px;
        }
        .btn-row {
            position: absolute;
            right: 20px;
            bottom: 20px;
            margin-bottom: 0;
            text-align: right;
            font-size: 0;
            .btn {
                display: inline-block;
                box-sizing: border-box;
                width: 62px;
                height: 28px;
                line-height: 26px;
                vertical-align: top;
                text-align: center;
                font-size: 12px;
            }
            .btn-cancel {
                margin-right: 10px;
            }
            .btn-ok {
                color: #fff;
            }
        }
    }
</style>

