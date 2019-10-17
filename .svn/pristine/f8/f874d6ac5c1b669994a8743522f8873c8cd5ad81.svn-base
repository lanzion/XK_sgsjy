<template>
    <div id="resources">
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
                        <li v-for="(item,index) in resourceData" :key="index" class="collection-item table-layout clearfix">
                            <div class="img-box table-cell">
                                <div v-if="Number(item.fileType) == 4" class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.fileId) || listDefault})` }"></div>
                                <!-- <img v-if="Number(item.fileType) == 4" :src="getFileUrl(item.fileId) || listDefault"> -->
                                <div class="video-cover" v-else-if="item.fileType == 2">
                                    <video :id="item.id" :src="getFileUrl(item.fileId, {filetype: 'video'})" x-webkit-airplay="allow" preload="auto" style="display: none"></video>
                                    {{captureImage(item.id, index, 'resourceData')}}
                                    <img :src="item.cover || listDefault">
                                </div>
                                <i v-else :class="{'icon-file-text': item.fileType == 1, 'icon-file-music': item.fileType == 3, 'icon-file-empty': item.fileType == 5}"></i>
                            </div>
                            <div class="msg-box table-cell">
                                <router-link :to="{path:linkTo,query:{id: item.id}}" :title="item.name">
                                    <h6 class="collection-name">{{item.name | textOverflow(30)}}</h6>
                                </router-link>
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
                                    <router-link :to="{ path: linkTo, query: { id: item.id } }" :data-id="item.id">
                                        <button class="preview">预览</button>
                                    </router-link>
                                </div>
                                <div class="option" v-if="$ls.get('loginInfo')">
                                    <a class="dl-btn" :href="downloadUrl(item.fileId, item.name, item.fileExt)" :download="item.name" @click="downloadAdd(item.id,index)">下载</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="empty-block" v-else>暂无数据</div>
                </div>
            </div>
            <v-pagination :param="pageParams" :changePage="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
import cascade from 'Common/screening/cascade.vue'
import classificationDictionary from 'Common/screening/classificationDictionary.vue'
import tabs from 'Common/classificationList/classification/tabs.vue'
import list from 'components/resource/resource_list.vue'
import pagination from 'Common/pagination.vue'
import { requestcFrontendResourceList,requestInterestResourceList, downloadAdd } from '@/service/resource.js'
import { interceptVideo } from '@/mixin/intercept_video.js'

export default {
    name: 'resources',
    mixins: [interceptVideo],
    components: {
        "v-cascade": cascade,
        "v-classificationDictionary": classificationDictionary,
        'v-tabs': tabs,
        'v-list': list,
        'v-pagination':pagination
    },
    data () {
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
            totalNum:0,
            resourceData: [],
            pageParams:{
                totalNum:0,
                pageSize:8,
                pageNum:1
            },
            search:'',
            resourceType:'',
            resourceTypeParent:'',
            technology:'',
            fileType:'',
            isInterest: false,
            params:{
                auditStatus:1,
                name:'',
                resourceType:'',
                resourceTypeParent:'',
                technology:'',
                fileType:'',
                cur_tab:''
            },
            linkTo: '/space/resource/details'
        }
    },
    created(){
        if(this.$route.path.includes('interestsSpace')){
            this.isInterest = true;
            this.$set(this.params,'interestId',this.$route.query.id)
        }else{
            this.$set(this.params,'orgId',this.$route.query.id)
        }
        // this.getResourceList(this.params)
    },
    mounted(){
    },
    computed: {
    },
    watch:{
        params:{
            handler:function(val,oldVal){
                switch (val.cur_tab){
                    case '1' :
                        this.paramsChange('browseNum');
                        break;
                    case '2' :
                        this.paramsChange('praise');
                        break;
                    case '3' :
                        this.paramsChange('collection');
                        break;
                    case '4' :
                        this.paramsChange('shareNum');
                        break;
                    case '5' :
                        this.paramsChange('downNum');
                        break;
                    case '6' :
                        this.paramsChange('avgScore');
                        break;
                    default:
                        this.paramsChange();
                        break;
                }
            },
            deep:true
        }
    },
    methods: {
        searchParam(val){
            this.params.name = val;
            this.getResourceList(this.params)
        },
        changeField(val) {
            let cascadeCode = Array.from(val, x => x.id)
            this.$set(this.params, 'resourceType', cascadeCode.join('-'))
            this.$set(this.params, 'resourceTypeParent', cascadeCode[0])
        },
        changeTechnology(val){
            this.$set(this.params, 'technology', val.id)
        },
        changeFormats(val){
            this.$set(this.params, 'fileType', val.id)
        },
        setCurTab: function (index) {
            this.params.cur_tab = index;
        },
        changePage(val) {
            this.pageParams.pageNum = val;
            // this.getResourceList(this.params)
            switch (this.params.cur_tab){
                case '1' :
                    this.paramsChange('browseNum');
                    break;
                case '2' :
                    this.paramsChange('praise');
                    break;
                case '3' :
                    this.paramsChange('collection');
                    break;
                case '4' :
                    this.paramsChange('shareNum');
                    break;
                case '5' :
                    this.paramsChange('downNum');
                    break;
                case '6' :
                    this.paramsChange('avgScore');
                    break;
                default:
                    this.paramsChange();
                    break;
            }
        },
        /*请求参数改变时调用*/
        paramsChange(key = ''){
            if(key !== ''){
                let obj = Object.assign({},this.params,{[key]:1})
                delete obj.cur_tab
                this.getResourceList(obj);
            }else{
                let obj = Object.assign({},this.params)
                delete obj.cur_tab
                this.getResourceList(obj);
            }
        },
        /*
         * 获取前台资源列表
         *, [this.idType]:组织Id
         * praise：
         * resourceType：资源类型
         * technology：技术分类
         */
        getResourceList(params){
            let handler = this.isInterest ? requestInterestResourceList : requestcFrontendResourceList;
            handler(params,this.pageParams).then((res)=>{
                if(res.data.code == 200){
                    this.pageParams.totalNum = res.data.entity.totalNum;
                    this.totalNum = res.data.entity.totalNum;
                    this.resourceData = res.data.entity.resultData;
                }
            })
        },
        /*
         * 下载次数加1
         */
        downloadAdd(id,index){
            downloadAdd({id:id}).then((res) => {
                if(res.data.code == 200){
                    this.resourceData[index].downNum ++;
                }
            })
        }
    }
}

</script>

<style lang="scss" scoped>
@import '~@/asset/scss/vars.scss';
@import '~@/asset/scss/cols.scss';
    .mb20{
        margin-bottom: 20px;
    }
    .resource-list{
        // padding-top: 10px;
    }


*{
    box-sizing: border-box;
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
            }
            //资源信息
            .msg-box {
                font-size: 14px;
                padding: 0 20px;
                padding-right: 40px;
                .collection-name{
                    font-size: 22px;
                    margin-bottom: 22px;
                    color: #333;
                    font-weight: lighter;
                    &:hover{
                        color: $default-color;
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
                            border: 1px solid $default-color;
                            border-radius: 3px;
                            color: $default-color;
                            &:hover{
                                background-color: $default-color;
                                color: #fff !important;
                            }
                        }
                    }
                    .dl-btn{
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        border-radius: 3px;
                        background-color: $default-color;
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

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        #collection_list {
            .list {
                .collection-item {
                    .msg-box {
                        .collection-name {
                            &:hover {
                                color: $color-value;
                            }
                        }
                    }
                    .option-box {
                        .option {
                            a {
                                .preview {
                                    border-color: $color-value;
                                    color: $color-value;
                                    &:hover{
                                        background-color: $color-value;
                                    }
                                }
                            }
                            .dl-btn {
                                background-color: $color-value;
                            }
                        }
                    }
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
        }
        // #cascade{
        //     // border-bottom: 1px solid #eee;
        //     .category-box{
        //         margin-bottom: 10px;
        //     }
        // }
        // #classificationDictionary{
        //     padding-bottom: 10px;
        //     margin: 10px 0 0 0;
        // }
    }

    #collection_list{
        .el-pagination{
            text-align: right;
            margin-top: 20px;
        }
    }
</style>