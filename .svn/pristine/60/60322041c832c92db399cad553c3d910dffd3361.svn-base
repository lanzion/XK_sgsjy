<template>
    <section id="bgcPopup" class="backend-content__middle">
        <h2 class="title">背景设置</h2>
        <el-upload :show-file-list="false" action :before-upload="UploadFile">
            <button class="upload-btn" type="button"> 选择照片 </button>
            <span slot="tip" class="upload-tip">大小不能超过{{imgStandardFileSize}}M, 仅支持:gif、jpg、png</span>
        </el-upload>
        <img class="preview" :src="getFileUrl(background) || listDefault">
        <div class="button-group">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="$router.go(-1)" class="btn2">取消</el-button>
        </div>
    </section>
</template>

<script>
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { modifyBaseInfo, studioDetail } from '@/service/studio.js'
    export default {
        name: 'bgcPopup',
        mixins: [uploadFileSize],
        data() {
            return {
                background: ''
            }
        },
        methods: {
            UploadFile (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if (res.code === 200) {
                            _this.background = res.appendInfo.resourceId
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
                    _this.background = null
                    uploader.cancelFile(file)
                }
            },
            save () {
                let param = {
                    id: this.$route.query.id,
                    cover: this.background
                }
                modifyBaseInfo(param).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        });
                    }else {
                        this.$message({message: res.data.msg})
                    }
                })
            },
            getDetail() {

            }
        },
        mounted() {
            studioDetail({id: this.$route.query.id}).then(res => {
                this.background = res.data.entity.cover
            })
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .upload-btn, .btn2 {
            border: 1px solid $color-value;
            color: $color-value;
        }
    }
}
#bgcPopup {
    font-size: 14px;
    .title {
        margin-bottom: 20px;
    }
    .upload-btn {
        line-height: 2.5em;
        padding: 0 1em;
        margin-right: 15px;
    }
    .upload-tip {
        color: #999;
    }
    .preview {
        margin: 30px 0;
        height: 360px;
        width: 100%;
    }
    .upload-btn {
        line-height: 2.5em;
        padding: 0 1em;
        margin-right: 15px;
    }
}
</style>