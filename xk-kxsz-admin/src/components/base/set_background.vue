<template>
    <section id="bgcPopup">
        <h2 class="title">背景设置</h2>
        <div id="v_picker2">点击上传</div>
        <span slot="tip" class="upload-tip">
                大小不能超过{{ imgStandardFileSize }}M, 仅支持:gif、jpg、png。
                建议上传的图片像素为 1200 x 300
            </span>
        <!-- <el-upload action :show-file-list="false" :before-upload="UploadFile">
            <button class="upload-btn" type="button"> 选择照片 </button>
            <span slot="tip" class="upload-tip">
                大小不能超过{{ imgStandardFileSize }}M, 仅支持:gif、jpg、png。
                建议上传的图片像素为 1200 x 300
            </span>
        </el-upload> -->
        <div style="position:absolute;font-size:12px;top:90%;color:#ff4949;" v-if="imgSizeBig">
            图片大于{{ imgStandardFileSize }}M
        </div>
        <img class="preview" :src="getFileUrl(background)" v-if="background">
        <img class="preview" :src="bgc" v-else="background">
        <div class="button-group">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="close" class="btn2">取消</el-button>
        </div>
    </section>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import bgc from 'Asset/img/common/info.png'
    const fileUploadAddress = location.protocol + '//' + location.host
    export default {
        name: 'bgcPopup',
        mixins: [uploadFileSize],
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            background: {
                type: String
            },
            save: Function,
            close: Function
        },
        data() {
            return {
                imgSizeBig: false,
                bgc: bgc
            }
        },
        mounted(){
            let self = this;
            var uploader = WebUploader.create({
                // swf文件路径
                swf:'../static/js/Uploader.swf',
                // 文件接收服务端。
                server: fileUploadAddress + '/file/authnw/fileUpload',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#v_picker2',
                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false,
                //是否开启自动上传
                auto:true
            });
            uploader.on( 'uploadError', function( file,res) {
                self.$message({ message: res.data.msg });
            });
            uploader.on( 'uploadSuccess', function( file,res ) {
                console.log('文件上传成功',file,res)
                if (res.status.value === 200) {
                    let imgUrl = res.data.resourceId;
                    self.$emit('changeBackground', imgUrl)
                }
            });
            setTimeout(function(){
              $('#v_picker2 input').css({display: 'none'})  
            },100)
        },
        methods: {
            UploadFile (file, fileList) {
                const fileSize = file.size
                if(fileSize < (this.imgStandardFileSize * 1024 * 1024) ) {
                    const _this = this
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this.$emit('changeBackground', res.appendInfo.resourceId)
                            _this.imgSizeBig = false
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                }else {
                    this.imgSizeBig = true
                    this.$emit('changeBackground', null)
                    uploader.cancelFile(file)
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
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
        font-size: 12px;
        line-height: 2;
    }
    .preview {
        margin: 30px 0;
        height: 190px;
        width: 100%;
    }
    .upload-btn {
        line-height: 2.5em;
        padding: 0 1em;
        margin-right: 15px;
    }
}

#v_picker2{
    color: #2797ed;
    padding: 8px 14px;
    display: inline-block;
    border: 1px solid #2797ed;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>