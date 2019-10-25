<template>
    <div id="resources">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="navigation">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container listBox">
            <div class="screeningBox bgw mb20">
                    <v-cascade :model="'resource'" :isAll='true' :changeCascade="changeField"></v-cascade>
                    <v-classificationDictionary :model="'technicalClassification'" :changeDataDic="changeTechnology"></v-classificationDictionary>
                    <v-classificationDictionary :model="'resourceFormats'" :changeDataDic="changeFormats"></v-classificationDictionary>
            </div>
            <div class="resource-list bgw">
                <v-tabs :tabs="tabs" :cur_tab="cur_tab" @searchVal="searchParam" :total="totalNum" :is_search="is_search" :count="count" @cur_tab="setCurTab"></v-tabs>
                <div id="collection_list" class="bgw">
                    <ul class="list" v-if="resourceData.length">
                        <li v-for="(item, index) in resourceData" :key="index" class="collection-item table-layout clearfix">
                            <div class="img-box table-cell" @click="redirect(linkTo, { query:{ id: item.id } })">
                                <div v-if="Number(item.fileType) == 4" class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.fileId) || listDefault})` }"></div>
                                <!-- <img v-if="Number(item.fileType) == 4" :src="getFileUrl(item.fileId) || listDefault"> -->
                                <div class="video-cover" v-else-if="item.fileType == 2">
                                    <i class="play-btn icon-btn-play"></i>
                                    <video :id="item.id" :src="getFileUrl(item.fileId, {filetype: 'video'})" x-webkit-airplay="allow" autoplay preload="auto" style="display: none"></video>
                                    {{captureImage(item.id, index, 'resourceData')}}
                                    <img :src="item.cover || listDefault">
                                </div>
                                <i v-else :class="{'icon-file-text': item.fileType == 1, 'icon-file-music': item.fileType == 3, 'icon-file-empty': item.fileType == 5}"></i>
                            </div>
                            <div class="msg-box table-cell">
                                <a @click.prevent="redirect(linkTo, { query:{ id: item.id } })" :title="item.name">
                                    <h6 class="collection-name">{{item.name | textOverflow(30)}}</h6>
                                </a>
                                <p class="collection-content">{{item.introduction | textOverflow(95)}}</p>
                                <div class="info-box clearfix mb20">
                                    <p class="w243 fl">
                                        <i class="icon-input-user"></i>上传人：{{item.userName}}
                                    </p>
                                    <p class=" w243 fl">
                                        <i class="icon-btn-browse"></i>浏览：<span style="color:#00a0e9;">{{item.browseNum || 0}}</span>人
                                    </p>
                                    <p class=" w243 fl">
                                        <i class="icon-btn-download"></i>下载数：<span style="color:#00a0e9;">{{item.downNum || 0}}</span>次
                                    </p>
                                </div>
                                <div class="info-box clearfix">
                                    <p class="w243 fl">
                                        <i class="icon-file-empty"></i>文件大小：{{item.fileSize ? (item.fileSize / 1024).toFixed(1) : 0}}kb
                                    </p>
                                    <p class=" w243 fl">
                                        <i class="icon-i-time"></i>上传时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}
                                    </p>
                                </div>
                            </div>
                            <div class="option-box table-cell">
                                <div class="evaluate option">{{item.avgScore === null ? 0 : item.avgScore}}分</div>
                                <div class="option">
                                    <a @click.prevent="redirect(linkTo, { query:{ id: item.id } })" :data-id="item.id">
                                        <button class="preview">预览</button>
                                    </a>
                                </div>
                                <div class="option" v-if="$ls.get('loginInfo')">
                                    <a class="dl-btn" href="javascript:;" :download="item.name" @click="downloadAdd(item.fileId, item.name,item.id, index)">下载</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="empty-block" v-else>暂无数据</div>
                </div>
            </div>
            <v-pagination :param="pageParams" @callback="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
import cascade from '@/components/common/screening/cascade.vue'
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
import tabs from '@/components/common/tabs.vue'
// import list from 'components/resource/resource_list.vue'
import pagination from '@/components/common/pagination.vue'
import { requestcFrontendResourceList, requestInterestResourceList, downloadAdd } from '@/service/resource.js'
import { interceptVideo } from '@/mixin/intercept_video.js'
import { fileBaseUrl } from 'Asset/js/common-config.js'

export default {
    name: 'resources',
    mixins: [interceptVideo],
    components: {
        'v-cascade': cascade,
        'v-classificationDictionary': classificationDictionary,
        'v-tabs': tabs,
        // 'v-list': list,
        'v-pagination': pagination
    },
    data() {
        return {
            tabs: [
                { name: '全部资源', type: 0 },
                { name: '最多浏览', type: 1 },
                { name: '最新点赞', type: 2 },
                { name: '最多收藏', type: 3 },
                { name: '最多分享', type: 4 },
                { name: '最多下载', type: 5 },
                { name: '最高评分', type: 6 }
            ],
            cur_tab: 0,
            is_always_req: true,
            is_search: true,
            count: {
                name: '资源'
            },
            totalNum: 0,
            resourceData: [],
            pageParams: {
                totalNum: 0,
                pageSize: 8,
                pageNum: 1
            },
            search: '',
            resourceType: '',
            resourceTypeParent: '',
            technology: '',
            fileType: '',
            isInterest: false,
            params: {
                auditStatus: 1,
                name: '',
                resourceType: '',
                resourceTypeParent: '',
                technology: '',
                fileType: '',
                cur_tab: ''
            },
            linkTo: this.pages.detail.resource
        }
    },
    created() {
        if (this.$route.path.includes('interest')) {
            this.isInterest = true
            this.$set(this.params, 'interestId', this.$route.query.id)
        } else {
            this.$set(this.params, 'orgId', this.$route.query.id)
        }
    },
    watch: {
        params: {
            handler: function (val) {
                switch (val.cur_tab) {
                    case '1':
                        this.paramsChange('browseNum')
                        break
                    case '2':
                        this.paramsChange('praise')
                        break
                    case '3':
                        this.paramsChange('collection')
                        break
                    case '4':
                        this.paramsChange('shareNum')
                        break
                    case '5':
                        this.paramsChange('downNum')
                        break
                    case '6':
                        this.paramsChange('avgScore')
                        break
                    default:
                        this.paramsChange()
                        break
                }
            },
            deep: true
        }
    },
    methods: {
        searchParam(val) {
            this.params.name = val
            this.getResourceList(this.params)
        },
        changeField(val) {
            const cascadeCode = Array.from(val, x => x.id)
            this.$set(this.params, 'resourceType', cascadeCode.join('-'))
            this.$set(this.params, 'resourceTypeParent', cascadeCode[0])
        },
        changeTechnology(val) {
            this.$set(this.params, 'technology', val.id)
        },
        changeFormats(val) {
            this.$set(this.params, 'fileType', val.id)
        },
        setCurTab: function (index) {
            this.params.cur_tab = index
        },
        changePage(val) {
            this.pageParams.pageNum = val
            // this.getResourceList(this.params)
            switch (this.params.cur_tab) {
                case '1':
                    this.paramsChange('browseNum')
                    break
                case '2':
                    this.paramsChange('praise')
                    break
                case '3':
                    this.paramsChange('collection')
                    break
                case '4':
                    this.paramsChange('shareNum')
                    break
                case '5':
                    this.paramsChange('downNum')
                    break
                case '6':
                    this.paramsChange('avgScore')
                    break
                default:
                    this.paramsChange()
                    break
            }
        },
        // 请求参数改变时调用
        paramsChange(key = '') {
            let obj = Object.assign({}, this.params)
            if (key !== '') {
                obj = Object.assign({}, this.params, { [key]: 1 })
            }
            delete obj.cur_tab
            this.getResourceList(obj)
        },
        /*
         * 获取前台资源列表
         * [this.idType]: 组织Id
         * praise：
         * resourceType：资源类型
         * technology：技术分类
         */
        getResourceList(params) {
            this.resourceData = []
            const handler = this.isInterest ? requestInterestResourceList : requestcFrontendResourceList
            handler(params, this.pageParams).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity
                    this.pageParams.totalNum = _data.totalNum
                    this.totalNum = _data.totalNum
                    this.resourceData = _data.resultData
                }
            })
        },
        /*
         * 下载次数加1
         */
        downloadAdd(resourceId, fileName,id, index) {
            const link = document.createElement("a");
                link.style.display = "none";
                link.href = fileBaseUrl+resourceId;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
            downloadAdd({ id: id }).then((res) => {
                if (res.data.code === 200) {
                    this.resourceData[index].downNum ++
                }
            })
        }
    }
}

</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/vars.scss';
    .mb20{
        margin-bottom: 20px;
    }
    .resource-list{
        // padding-top: 10px;
    }

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .focus{
            border-color: $color-value !important;
        }
        #collection_list {
            .list {
                .collection-item {
                    .msg-box {
                        .collection-name:hover{
                            color: $color-value;
                        }
                    }
                    .option-box{
                        .option{
                            .preview{
                                border: 1px solid $color-value;
                                color: $color-value;
                                &:hover{
                                    background-color: $color-value;
                                }
                            }
                            .dl-btn{
                                background-color: $color-value;
                            }
                        }
                    }
                }
            }
        }
    }
}
.mb20{
    margin-bottom: 20px;
}
.w243{
    width: 243px;
}
#collection_list {
    width: 100%;
    overflow: hidden;
    .list {
        width: 100%;
        overflow: hidden;
        .collection-item {
            width: 100%;
            padding: 20px 15px;
            box-sizing: border-box;
            font-weight: lighter;
            border-bottom: 1px solid #c9c9c9;
            a{
                display: inline-block;
            }
            //资源图片
            .img-box {
                $img-prev-height: 180px;
                width: 265px;
                height: $img-prev-height;
                background-color: #e7edf2;
                text-align: center;
                .bg-img__wrap,
                img {
                    width: 265px;
                    height: 180px;
                }

                [class*="icon-file-"],
                [class*=" icon-file-"] {
                    line-height: $img-prev-height;
                    font-size: 80px;
                    color: #b3b3b3;
                }

                .video-cover {
                    position: relative;
                    .play-btn {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        display: block;
                        width: 50px;
                        height: 50px;
                        color: #fff;
                        font-size: 50px;
                        &:hover {
                            color: $theme-color;
                        }
                    }
                }
            }
            //资源信息
            .msg-box {
                font-size: 14px;
                padding: 0 40px 0 20px;
                box-sizing: border-box;
                .collection-name{
                    font-size: 22px;
                    margin-bottom: 22px;
                    color: #333;
                    font-weight: lighter;
                    &:hover{
                        color: #d00;
                    }
                }
                .collection-content {
                    font-size: 16px;
                    height: 40px;
                    margin-bottom: 20px;
                    line-height: 20px;
                    overflow : hidden;
                    color: #333;
                    word-break: break-word;
                }
                .info-box{
                    color: #626262;
                    i{
                        margin-right: 10px;
                    }
                }
            }
            // 预览、下载
            .option-box{
                $option-width: 96px;
                width: $option-width;
                padding-right: 20px;
                box-sizing: border-box;
                .option{
                    width: $option-width;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    margin-bottom: 20px;
                    border-radius: 3px;
                    a{
                        width: 100%;
                        height: 100%;
                        font-size: 14px;
                        .preview{
                            width: 100%;
                            height: 100%;
                            border: 1px solid #d00;
                            box-sizing: border-box;
                            border-radius: 3px;
                            color: #d00;
                        }
                        .preview:hover{
                            background-color: #d00;
                            color: #fff;
                        }
                    }
                    .dl-btn{
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        border-radius: 3px;
                        background-color: #d00;
                        color: #fff;
                    }
                    .dl-btn:hover{
                        opacity: 0.75;
                    }
                }
                .evaluate{
                    font-size: 16px;
                    height: 16px;
                    line-height: 1;
                    color: #fd8c88;
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>

<style lang="scss">
    #resources{
        .tabs-bar-header{
            .tabs-right{
                right: 15px;
            }
        }
        .tabs-bar-header{
            margin-bottom: 0;
            .el-tabs__header {
                border-bottom: 1px solid #ccc;
            }
        }
    }

    #collection_list{
        .el-pagination{
            text-align: right;
            margin-top: 20px;
        }
    }
</style>