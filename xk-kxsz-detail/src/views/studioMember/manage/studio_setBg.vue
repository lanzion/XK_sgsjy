<template>
    <section id="bgcPopup" class="backend-content__middle">
        <h2 class="title">背景设置</h2>
        <el-upload :show-file-list="false" action :before-upload="UploadFile">
            <button class="upload-btn" type="button"> 选择照片 </button>
            <span slot="tip" class="upload-tip">
                大小不能超过{{imgStandardFileSize}}M, 仅支持:gif、jpg、png。
                建议上传的图片像素为 1200 x 330
            </span>
        </el-upload>
        <img class="preview" :src="getFileUrl(background) || listDefault">
        <div class="button-group">
            <button @click="save" class="btn btn1">保存</button>
            <button @click="$router.go(-1)" class="btn btn2">取消</button>
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
            UploadFile(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                        if (res.code === 200) {
                            _this.background = res.appendInfo.resourceId
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
                    _this.background = null
                    uploader.cancelFile(file)
                }
            },
            save() {
                const param = {
                    id: this.$route.query.id,
                    cover: this.background
                }
                modifyBaseInfo(param).then((res) => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        })
                    } else {
                        this.$message({ message: res.data.msg })
                    }
                })
            },
            getDetail() {

            }
        },
        mounted() {
            studioDetail({ id: this.$route.query.id }).then((res) => {
                this.background = res.data.entity.cover
            })
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .upload-btn {
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
        border-radius: $button-radiu;
        &:hover {
            background-color: $theme-color;
            color: #fff;
        }
    }
    .upload-tip {
        color: #999;
        font-size: 12px;
        line-height: 2;
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
.button-group {
    height: 30px;
    text-align: left;
    padding: 0 30px 30px;
    .btn {
        display: inline-block;
        padding: 8px 15px;
        border-radius: $button-radiu;
        text-align: center;
        box-sizing: border-box;
    }
    .btn1 {
        margin-right: 10px;
        color: #fff;
        background-color: $theme-color;
        &:hover{
            opacity: 0.75;
        }
    }
    .btn2 {
        margin-right: 10px;
        border: 1px solid $theme-color;
        color: $theme-color;
        &:hover{
            background-color: $theme-color;
            color: #fff;
        }
    }
}
</style>