<template>
    <section id="spaceScene" class="spaceScene">
        <h2 class="title">背景设置</h2>
        <section class="option-box clearfix">
            <el-upload action :show-file-list="false" :before-upload="UploadFile">
                <button type="button" class="bs-handle-button i-form-button btn-upload">+上传图片</button>
            </el-upload>
        </section>
        <transition-group class="banner-list clearfix" v-if="scene.length" name="banner-item" tag="ul" mode="out-in">
            <li class="banner-item" v-for="(item, index) in scene" :key="index">
                <section class="banner-item-detail">
                    <i class="banner-item-handle icon-btn-close2" @click="delScene(index, item.id)"></i>
                    <img class="banner-img" :src="getFileUrl(item.bannerUrl)">
                </section>
            </li>
        </transition-group>
        <img class="preview" :src="bgc" v-else>
        <div class="button-group">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="close" class="btn2">取消</el-button>
        </div>
    </section>
</template>

<script>
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { addSchoolScene, delSchoolScene, requestSchoolScene } from '@/service/admin_base.js'
import bgc from 'res/images/info.png'
    export default {
        name: 'spaceScene',
        mixins: [uploadFileSize],
        props: {
            scene: Array,
            close: Function,
            businessId: String
        },
        data() {
            return {
                curType: 0,
                items: [],
                bgc: bgc
            }
        },
        methods: {
            /*
             * 删除Banner图
             * bannerFileId: 图片ID
             */
            delScene(index, id) {
                delSchoolScene({'id': id}).then(response => {
                    if (response.data.code == 200) {
                        this.scene.splice(index, 1)
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
            },
            // 上传图片
            UploadFile (file, fileList) {
                this.fileList = []
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if (res.code === 200) {
                            if(_this.scene.length < 5) {
                                const imgUrl = res.appendInfo.resourceId;
                                addSchoolScene({businessId: _this.businessId, bannerUrl: imgUrl}).then(response => {
                                    _this.$emit('getSceneList' );
                                    _this.$message({message: '上传成功', type: 'success'});
                                })
                            }else {
                                _this.$message({message:'最多上传5张图片'})
                            }
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
                    uploader.cancelFile(file)
                }
            },
            save () {
                this.$message({message: '上传成功', type: 'success'})
                this.close()
            }
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
.spaceScene {
    font-size: 14px;
    .title {
        margin-bottom: 20px;
    }
    .cover-uploader {
        margin-bottom: 30px;
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
        width: 30%;
    }
    $banner-margin: 10px;
    .banner-list {
        margin-left: -$banner-margin;
        max-height: 324px;
        overflow-x: auto;
        .preview,
        .banner-item {
            float: left;
            width: 33.33%;
            padding: 0 0 $banner-margin $banner-margin;
            box-sizing: border-box;
            transition: opacity .8s, transform .8s;
            cursor: pointer;

            .banner-item-detail {
                position: relative;
                border-radius: 5px;
                overflow: hidden;
            }

            .banner-img {
                width: 100%;
                height: 150px;
                cursor: pointer;
            }

            &:hover{
                .banner-item-handle {
                    &.icon-btn-close2 {
                        display: inline-block;
                    }
                }
            }

            $item-content-padding: 7px;

            $triangle-height: 30px;
            $triangle-width: 40px;
            .banner-item-handle {
                position: absolute;
                top: 0;
                right: 0;
                color: #fff;
                line-height: $triangle-width / 2;

                &.icon-btn-close2 {
                    display: none;
                    width: $triangle-width / 2;
                    height: $triangle-width / 2;
                    text-align: center;
                    transition: color .3s ease;

                    &:hover {
                        color: #666;
                    }
                }
            }

            .i-success-bg {
                width: 0;
                height: 0;
                border-top: 30px solid #13ce66;
                border-left: $triangle-width solid transparent;
            }
        }
    }
    .button-group {
        margin-top: 10px;
        .upload-btn {
            line-height: 2.5em;
            padding: 0 1em;
            margin-right: 15px;
        }
    }
}
</style>