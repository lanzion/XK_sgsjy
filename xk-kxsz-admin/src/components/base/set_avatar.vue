<template>
    <div id="teacherDynamic" class="backend-content__middle teacherDynamic" :class="{ pd0: isTeaStuAdmin}">
        <h2 class="title" v-if="!isTeaStuAdmin">头像设置</h2>
        <v-tabs :tabs="tabs" v-else></v-tabs>
        <div :class="{'backend-content__middle':isTeaStuAdmin}">
             <div id="v_picker">点击上传</div>
              <span slot="tip" class="upload-tip">大小不能超过{{ imgStandardFileSize }}M, 仅支持:gif、jpg、jpeg、png</span>
            <!-- <el-upload class="upload-demo" action :show-file-list="false" :on-remove="handleRemove" :before-upload="UploadFile" accept=".gif,.jpg,.png,.jpeg">
                <button class="upload-btn" type="button"> 点击上传 </button>
                <span slot="tip" class="upload-tip">大小不能超过{{ imgStandardFileSize }}M, 仅支持:gif、jpg、jpeg、png</span>
            </el-upload> -->
            <div class="preview">
                <span class="prompt">-------您上传的图片将自动生成三种尺寸的头像-------</span>
                <div class="size_g ml">
                    <img class="preview-avatar" :src="getFileUrl(img)" v-if="img">
                    <div class="preview-default" v-else></div>
                </div>
                <div class="size_b ml">
                    <img class="preview-avatar" :src="getFileUrl(img)" v-if="img">
                    <div class="preview-default" v-else></div>
                </div>
                <div class="size_m ml">
                    <img class="preview-avatar" :src="getFileUrl(img)" v-if="img">
                    <div class="preview-default" v-else></div>
                </div>
                <div class="size_s ml">
                    <img class="preview-avatar" :src="getFileUrl(img)" v-if="img">
                    <div class="preview-default" v-else></div>
                </div>
            </div>
            <div class="button-group">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="close" class="btn2" v-if="!isTeaStuAdmin">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import tabs from '@/components/common/tabs.vue'
const fileUploadAddress = location.protocol + '//' + location.host
export default {
    name: 'avatarOption',
    mixins: [uploadFileSize],
    data() {
        return {
            isTeaStuAdmin: false,
            tabs: [
                { name: '头像设置', type: ''}
            ],
        }
    },
    mounted() {
        this.isTeaStuAdmin = this.$route.fullPath === "/admin/avatar";
        let self = this;
            var uploader = WebUploader.create({
                // swf文件路径
                swf:'../static/js/Uploader.swf',
                // 文件接收服务端。
                server: fileUploadAddress + '/file/authnw/fileUpload',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#v_picker',
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
                    self.$emit('changeAvatar', imgUrl)
                }
            });
            setTimeout(function(){
              $('#v_picker input').css({display: 'none'})  
            },100)
    },
    methods: {
        handleRemove(file, fileList) {
            this.fileList = fileList
        },
        UploadFile (file, fileList) {
            const fileSize = file.size,
                  fileName = file.name,
                  expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                  _this = this
            if ( /(jpe?g|gif|png)$/i.test(expandName) && (fileSize < (_this.imgStandardFileSize * 1024 * 1024)) ) {
                uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                    if(res.code === 200) {
                        _this.$emit('changeAvatar', res.appendInfo.resourceId)
                    }
                })
                uploader.off('uploadError').on('uploadError', function (file, reason) {
                    _this.$message({ message: reason.msg })
                })
            } else {
                if (!/(jpe?g|gif|png)$/i.test(expandName)) {
                    _this.$message({
                        message: '请上传支持格式的图片',
                    })
                } else {
                    _this.$message({
                        message: `文件大小不超过${_this.imgStandardFileSize}M`
                    })
                }
                _this.$emit('changeAvatar', null)
                uploader.cancelFile(file)
            }
        }
    },
    props: {
        img: {
            type: String,
            default: null
        },
        close: Function,
        save: Function
    },
    components: {
        'v-tabs': tabs,
    },
}
</script>

<style lang='scss' scoped>
.pd0 {
    padding: 0 !important;
}
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .upload-btn, .btn2 {
            border: 1px solid $color-value;
            color: $color-value;
        }
        .upload-btn:hover {
            background-color: $color-value;
        }
    }
}
#admin .backend-content__middle.teacherDynamic {
    padding: 0;
}
.teacherDynamic {
    box-sizing: border-box;
    font-size: 14px;
    padding: 20px 40px;
    .upload-demo {
        margin-top: 20px;
        margin-bottom: 30px;
        .upload-tip {
            color: #8391a5;
        }
    }
    .war {
        padding: 10px 0;
        color: #2797ed;
        font-size: 12px;
    }
    .preview {
        position: relative;
        .ml {
            display: inline-block;
            & + .ml {
                margin-left: 30px;
            }
            .preview-avatar,
            .preview-default {
                width: 100%;
                height: 100%;
            }
            .preview-default {
                background-color: #c9c9c9;
            }
        }
        .prompt {
            position: absolute;
            top: 30px;
            left: 400px;
            font-size: .85em;
        }
        $size-data: (g: 300px, b: 180px, m: 140px, s: 60px);
        @each $size-key, $size-value in $size-data {
            .size_#{$size-key} {
                width: $size-value;
                height: $size-value;
            }
        }
    }
    .button-group {
        margin-top: 15px;
    }
    .upload-btn {
        line-height: 2.5em;
        padding: 0 1em;
        margin-right: 15px;
        &:hover {
            color: #fff;
        }
    }
}
#v_picker{
    color: #2797ed;
    padding: 8px 14px;
    display: inline-block;
    border: 1px solid #2797ed;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}

</style>