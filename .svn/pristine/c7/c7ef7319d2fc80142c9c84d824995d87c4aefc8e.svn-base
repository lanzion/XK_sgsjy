<template>
    <section class="background backend-content__middle pr">
        <h2 class="title">背景设置</h2>
        <el-upload action :show-file-list="false" :before-upload="UploadFile">
            <button class="upload-btn" type="button"> 选择照片 </button>
            <span slot="tip" class="upload-tip">大小不能超过{{ imgStandardFileSize }}M，支持格式为:gif、jpg、jpeg、png等</span>
        </el-upload>
        <img class="preview" :src="getFileUrl(background) || listDefault" width="760" height="362">
        <div class="button-group">
            <button @click="handleSave" class="bs-search-button i-form-button">保存</button>
        </div>
    </section>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import {
        queryModelSchoolDetail,
        editDetail,
    } from '@/service/model_school.js'

    export default {
        name: 'modelBackground',
        mixins: [uploadFileSize],
        data () {
            return {
                background: ''
            }
        },

        created () {
            this.queryDetail()
        },

        methods: {
            async queryDetail () {
                const loginInfo = this.$ls.get('loginInfo')
                const schoolId = loginInfo && loginInfo.userInfo.baseId || ''
                const res = await queryModelSchoolDetail({schoolId})
                this.schoolId = schoolId

                if (res.status === 200 && res.data.code === 200) {
                    const {cover} = res.data.entity || {}
                    this.background = cover
                }
            },

            handleSave () {
                const {schoolId, background: cover} = this
                const errMsg = '修改学校背景图失败，请稍后重试'

                editDetail({
                    cover,
                    schoolId,
                }).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '成功保存学校背景图',
                            duration: 1000,
                        })

                        return
                    }

                    this.$message.error(res.data.msg || errMsg)
                }).catch(() => {
                    this.$message.error(errMsg)
                })
            },
            UploadFile (file, fileList) {
                  const fileSize = file.size,
                        fileName = file.name,
                        expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                        _this = this
                    if (/(jpe?g|gif|png)$/i.test(expandName) && fileSize < (_thiss.imgStandardFileSize * 1024 * 1024) ) {
                            uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                                if (res.code === 200) {
                                    _this.background = res.appendInfo.resourceId
                                }
                            })
                            uploader.off('uploadError').on('uploadError', function (file, reason) {
                                _this.$message({ message: reason.msg })
                            })
                    } else {
                        _this.background = null
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
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/asset/scss/vars.scss";

    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .upload-btn, .btn2 {
                border: 1px solid $color-value;
                color: $color-value;
            }
        }
    }

    .background {
        font-size: 14px;
        .title {
            margin-bottom: 20px;
            font-size: 16px;
        }
        .upload-btn {
            line-height: 2.5em;
            padding: 0 1em;
            margin-right: 15px;
        }
        .upload-tip {
            color: #999;
            font-size: 12px;
        }
        .preview {
            margin: 30px 0;
        }
    }
</style>
