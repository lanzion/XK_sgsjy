<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <button type="button" class="fl bs-handle-button i-form-button is-plain" v-for="(btn, index) in bannerTypes" :class="{active: curType==index}" :key="index" @click="curType=index">{{btn.name}}</button>
            <el-upload action :before-upload="UploadFile" :show-file-list="false">
                <button type="button" class="fl bs-handle-button i-form-button btn-upload">+上传图片</button>
            </el-upload>
        </section>
        <transition-group class="banner-list clearfix" v-if="items.length" name="banner-item" tag="ul" mode="out-in">
        <!-- <ul class="banner-list clearfix"> -->
            <li class="banner-item" v-for="(item, index) in items" :key="item.bannerFileId">
                <section class="banner-item-detail">
                    <template v-if="item.bannerType==bannerTypes[curType].type">
                        <el-input class="banner-item-sort" size="mini" placeholder="序号" v-model.number="item.sort" @keyup.enter.native="updateSort(index)"></el-input>
                        <i class="banner-item-handle i-success-bg"></i>
                        <i class="banner-item-handle icon-status-selected"></i>
                    </template>
                    <i class="banner-item-handle icon-btn-close2" @click="delBanner(index)"></i>
                    <img class="banner-img" :src="getFileUrl(item.imageUrl)" @click="setRelation(index)">
                </section>
            </li>
        <!-- </ul> -->
        </transition-group>
    </div>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { requestSystemBanner, addBanner, delBanner, addBannerRelation, delBannerRelation, updateBannerSort, updateBannerTime } from '@/service/admin_system.js'
    import dataTranslation from '@/js/dataTranslation.js'
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
                    { type: 2, name: '教育-项目' },
                    { type: 12, name: '教育-课程' },
                    { type: 3, name: '教育-实训' },
                    { type: 4, name: '空间-教育局' },
                    { type: 5, name: '空间-学校' },
                    { type: 6, name: '空间-班级' },
                    { type: 7, name: '空间-教师' },
                    { type: 8, name: '空间-学生' },
                    { type: 9, name: '空间-兴趣组' },
                    { type: 18, name: '空间-企业空间' },
                    { type: 19, name: '空间-投资人空间' },
                    { type: 20, name: '空间-投资机构空间' },
                    { type: 21, name: '空间-众创空间' },
                    { type: 10, name: '导师工作室' },
                    { type: 11, name: '创客示范校' },
                    { type: 13, name: '街区-首页' },
                    { type: 14, name: '街区-秀优品' },
                    { type: 15, name: '街区-创活动' },
                    { type: 16, name: '街区-求拉勾' },
                    { type: 17, name: '街区-找合作' },
                    { type: 22, name: '竞赛活动' }
                ],
                items: []
            }
        },
        mounted() {
            this.getData();
        },
        watch: {
            curType: 'getData'
        },
        methods: {
            /*
             * 获取Banner列表
             * bannerType: Banner类型
             * 0.待定,
             * 1.平台首页,10.导师工作室,11.示范校
             * 2.教育-项目,3.教育-实训,12.教育-课程
             * 4.教育局空间,5.学校空间,6.班级空间,7.教师空间,8.学生空间,9.兴趣组空间,18.企业空间,19.投资人空间,20.投资机构空间,21.众创空间
             * 13.街区-首页,14.街区-秀优品,15.街区-创活动,16.街区-求拉勾,17.街区-找合作
             */
            getData() {
                let _curType = this.bannerTypes[this.curType].type;
                requestSystemBanner({"bannerType": _curType}).then(response => {
                    if (response.data.code == 200) {
                        this.items = response.data.appendInfo.list;
                    }
                })
            },
            /*
             * 设置Banner关系
             * 添加Banner关系：bannerType - Banner类型, bannerFileId - 图片ID, sort - 排序序号
             * 删除Banner关系：id - 关系ID
             */
            setRelation(index) {
                let item = this.items[index],
                    _sort = item.sort ? item.sort : 0,
                    _curType = this.bannerTypes[this.curType].type,
                    flag = item.bannerType == null,
                    handler = flag ? addBannerRelation : delBannerRelation,
                    params = flag ? {bannerType: _curType, bannerFileId: item.bannerFileId, sort: _sort} : {id: item.id};

                handler(params).then(response => {
                    if (response.data.code == 200) {
                        this.$message({message: `${flag?'绑定':'解绑'}成功`, type: 'success'});
                        this.getData();
                    } else {
                        this.$message.error(response.data.msg || '操作失败');
                    }
                })
            },
            /*
             * 删除Banner图
             * bannerFileId: 图片ID
             */
            delBanner(index) {
                let item = this.items[index];
                let _id = item.bannerFileId;
                delBanner({bannerFileId: _id}).then(response => {
                    if (response.data.code == 200) {
                        this.items.splice(index, 1)
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
            },
            updateSort(index) {
                let item = this.items[index];
                updateBannerSort({id: item.id, sort: item.sort}).then(response => {
                    if (response.data.code == 200) {
                        this.$message({message: '修改成功', type: 'success'});
                    } else {
                        this.$message.error(response.data.msg);
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
                                _this.getData()
                                _this.$message({message: '上传成功', type: 'success'})
                            })
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    addBanner({imageUrl: imgUrl}).then(response => {
                        if(res.code === 200) {
                            _this.getData()
                        }
                    })
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
</style>
