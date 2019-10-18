<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <button type="button" class=" bs-handle-button i-form-button is-plain" v-for="(btn, index) in bannerTypes" :class="{active: curType==index}" :key="index" @click="curType=index">{{btn.name}}</button>
            <div id="v_picker">+上传图片</div>
            <!-- <el-upload action :before-upload="UploadFile" :show-file-list="false">
                <button type="button" class="fl bs-handle-button i-form-button btn-upload">+上传图片</button>
            </el-upload> -->
        </section>
        <transition-group class="banner-list clearfix" v-if="items.length" name="banner-item" tag="ul" mode="out-in">
        <!-- <ul class="banner-list clearfix"> -->
            <li class="banner-item" v-for="(item, index) in items" :key="item.bannerFileId">
                <section class="banner-item-detail">
                    <template v-if="item.bannerType==bannerTypes[curType].type">
                        <el-input class="banner-item-sort" size="mini" placeholder="序号" v-model.number="item.sort" @keyup.enter.native="updateBanner(item)"></el-input>
                        <i class="banner-item-handle i-success-bg"></i>
                        <i class="banner-item-handle icon-status-selected"></i>
                    </template>
                    <i class="banner-item-handle icon-btn-close2" @click="delBanner(item,index)"></i>
                    <img class="banner-img" :src="getFileUrl(item.imageUrl)" @click="setRelation(item)">
                    <el-input placeholder="请输入链接地址" v-model="item.url" @keyup.enter.native="updateBanner(item)">
                        <template slot="prepend">
                            <a class="banner-link" :href="item.url" target="_blank">URL地址</a>
                        </template>
                    </el-input>
                </section>
            </li>
        <!-- </ul> -->
        </transition-group>
    </div>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { requestSystemBanner, addBanner, delBanner, addBannerRelation, delBannerRelation, updateBannerSort } from '@/service/admin_system.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    const fileUploadAddress = location.protocol + '//' + location.host
    export default {
        name: 'bannerManage',
        mixins: [uploadFileSize],
        components: {
        },
        data() {
            return {
                curType: 0,
                bannerTypes: [
                    { type: 1, name: '首页' },
                    { type: 2, name: '作品' },
                    { type: 3, name: '活动' },
                    { type: 4, name: '学习' },
                    // { type: 5, name: '空间' },
                ],
                items: []
            }
        },
        mounted() {
            this.getData();
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
                    addBanner({imageUrl: imgUrl}).then(response => {
                        self.$message({message: '上传成功', type: 'success'})
                        self.getData()
                    })
                }
            });
            setTimeout(function(){
              $('#v_picker input').css({display: 'none'})  
            },100)  
        },
        watch: {
            curType: 'getData'
        },
        methods: {
            /*
             * 获取Banner列表
             * bannerType: Banner类型
             */
            getData() {
                let _curType = this.bannerTypes[this.curType].type;
                requestSystemBanner({"bannerType": _curType}).then(response => {
                    if (response.data.code == 200) {
                        this.items = response.data.appendInfo.list
                    }
                })
            },
            /*
             * 设置Banner关系
             * 添加Banner关系：bannerType - Banner类型, bannerFileId - 图片ID, sort - 排序序号
             * 删除Banner关系：id - 关系ID
             */
            setRelation(item) {
                let _sort = item.sort ? item.sort : 0,
                    _curType = this.bannerTypes[this.curType].type,
                    flag = item.bannerType == null,
                    handler = flag ? addBannerRelation : delBannerRelation,
                    params = flag ? { bannerType: _curType, bannerFileId: item.bannerFileId, sort: _sort } : { id: item.id }

                handler(params).then(response => {
                    if (response.data.code == 200) {
                        this.$message({message: `${flag?'绑定':'解绑'}成功`, type: 'success'})
                        this.getData()
                    } else {
                        this.$message.error(response.data.msg || '操作失败');
                    }
                })
            },
            /*
             * 删除Banner图
             * bannerFileId: 图片ID
             */
            delBanner(item,index) {
                let _id = item.bannerFileId
                delBanner({bannerFileId: _id}).then(response => {
                    if (response.data.code == 200) {
                        this.items.splice(index, 1)
                        this.$message({message: '删除成功', type: 'success'})
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            },
            updateBanner(item) {
                updateBannerSort({ id: item.id, sort: item.sort, url: item.url }).then(response => {
                    if (response.data.code == 200) {
                        this.$message({message: '修改成功', type: 'success'})
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            },
            UploadFile (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if (fileSize < (_this.imgStandardFileSize * 1024 * 1024) && /(jpe?g|gif|png)$/i.test(expandName)) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            let imgUrl = res.appendInfo.resourceId;
                            // 上传成功后添加图片至Banner图列表
                            addBanner({imageUrl: imgUrl}).then(response => {
                                _this.$message({message: '上传成功', type: 'success'})
                                _this.getData()
                            })
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
            }
        }
    }
</script>

<style lang="scss">
.backend-content__middle {
    .banner-item {
        .banner-item-sort {
            .el-input__inner {
                text-align: center;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
// 过渡动画
.banner-item-enter,
.banner-item-leave-active {
    opacity: 0;
    transform: translate(0);
}
.banner-item-enter {
    transform: scale(.1);
}
.banner-item-leave-active {
    position: absolute;
}

.backend-content__middle {
    .i-form-button {
        margin: 0 10px 5px 0;

        & + .i-form-button {
            margin-left: 0;
        }

        &.btn-upload {
            margin-left: 10px;
        }
    }
    $banner-margin: 10px;
    .banner-list {
        margin-left: -$banner-margin;

        .banner-item {
            float: left;
            width: 25%;
            padding: 0 0 $banner-margin $banner-margin;
            box-sizing: border-box;
            transition: opacity .8s, transform .8s;
            cursor: pointer;

            .banner-item-detail {
                position: relative;
                border-radius: 5px 5px 0 0;
                overflow: hidden;
            }

            .banner-img {
                width: 100%;
                height: 150px;
                margin-bottom: -1px;
                cursor: pointer;
            }

            .banner-link {
                color: #ccc;
            }

            &:hover{
                .banner-item-handle {
                    &.i-success-bg,
                    &.icon-status-selected {
                        display: none;
                    }
                    &.icon-btn-close2 {
                        display: inline-block;
                    }
                }
            }

            $item-content-padding: 7px;
            .banner-item-sort {
                position: absolute;
                top: $item-content-padding;
                left: $item-content-padding;
                width: 4em;
            }

            $triangle-height: 30px;
            $triangle-width: 40px;
            .banner-item-handle {
                position: absolute;
                top: 0;
                right: 0;
                color: #fff;
                line-height: $triangle-width / 2;
                // text-indent: - $triangle-height / 2;

                &.icon-status-selected{
                    right: $item-content-padding;
                }

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
}
#v_picker{
    position: relative;
    width: 100px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    background: #3083eb;
    display: inline-block;
    input{
            display: none !important;
        }
    div{
        left: 0;
        top: 0;
        
    }
}
</style>
