<template>
    <div id="resourcesDetails" class="theme-lightBlue clearfix" v-bind:class="{'mgt0': !isFront,'container': isFront }">
        <div class="content-left fl" v-bind:class="{'width100':!isFront}">
            <!-- 预览 -->
            <div class="preview-box bgw">
                <doc-reader v-if="detailsData.documentId" v-bind="{docId: detailsData.documentId, width: docWidth}"></doc-reader>
                <div class="wrapper" v-else-if="detailsData.fileType == '2'">
                    <video ref="video" :src="getFileUrl(detailsData.fileId,{filetype: 'video'})" height="550" @click="togglePlay" @ended="videoIsEnded" @play="videoHasPaused = false" @pause="videoHasPaused = true" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" controls="controls">您的浏览器不支持video标签</video>
                    <transition name="fade">
                        <div class="btn-start" v-show="videoHasPaused" @click.stop="play"><i class=""></i></div>
                    </transition>
                </div>
                <div v-else class="preview-img" title="点击查看原图" @click="visible.show = true" :style="{backgroundImage: `url(${getFileUrl(detailsData.fileId) || listDefault})`}"></div>
            </div>
            <!-- 资源信息 -->
            <section class="resource-msg bgw">
                <com-panel-event module="resource" class="operate-group" :title.sync="detailsData.name"></com-panel-event>
                <h5 class="resource-title" :title="detailsData.name">{{detailsData.name}}</h5>
                <div class="intro-box">资源简介：{{detailsData.introduction}}</div>
                <div class="msg-box clearfix">
                    <p class="w308 fl">
                        <i class="icon-input-user"></i>上传人：{{detailsData.userName || '暂无'}}
                    </p>
                    <p class="w308 fl">
                        <i class="icon-btn-browse"></i>浏览：{{detailsData.browseNum || 0}}
                    </p>
                </div>
                <div class="msg-box clearfix">
                    <p class="w308 fl">
                        <i class="icon-file-empty"></i>文件大小：{{detailsData.fileSize ? (detailsData.fileSize / 1024).toFixed(1) : 0}}kb
                    </p>
                    <p class="w308 fl">
                        <i class="icon-i-time"></i>上传时间：{{detailsData.createDate | dateFormat('yyyy-MM-dd')}}
                    </p>
                </div>
                <a class="dl-btn" v-if="$ls.get('loginInfo')" :href="downloadUrl(detailsData.fileId, detailsData.name)" :download="detailsData.name" @click="downloadAdd">下载</a>
            </section>
            <!-- 评价部分 -->
            <evaluate-details :evaluateData="evaluateData" v-if="detailsData.auditStatus == 1" class="bgw" style="padding:15px;"></evaluate-details>
        </div>
        <div class="related-list bgw fr" v-if="isFront">
            <h4 class="clearfix">
                <span class="title fl">相关资源</span>
                <router-link :to="morePath" class="btn-more fr">更多>></router-link>
            </h4>
            <v-list :items="items" :listData="listData">
                <template scope="props">
                    <div class="list-item-img__box">
                        <!-- <img :src="getFileUrl(props.item.cover) || listDefault"> -->
                        <img v-if="Number(props.item.fileType) == 4" :src="getFileUrl(props.item.fileId) || listDefault">
                        <i v-else :class="{'icon-file-text': props.item.fileType == 1, 'icon-file-video': props.item.fileType == 2, 'icon-file-music': props.item.fileType == 3, 'icon-file-empty': props.item.fileType == 5}"></i>
                    </div>
                    <div class="list-item-title">
                        <p class="list-title ellipsis" :title="props.item.name">{{ props.item.name }}</p>
                        <p class="msg">
                            <span title="收藏数"><i class="icon-btn-i-collection on"></i>{{props.item.collectNum || 0}}</span>
                            <span title="评论数"><i class="icon-btn-i-reply"></i>{{props.item.commentCount || 0}}</span>
                            <span title="浏览数"><i class="icon-i-browse"></i>{{props.item.browseNum || 0}}</span>
                        </p>
                    </div>
                </template>
            </v-list>
        </div>
        <img-preview :visible.sync="visible" :imgUrl="detailsData.fileId"></img-preview>
    </div>
</template>

<script>
let color = {
    red: ['#f85959', '#fee0e0'],
    grassGreen: ['#2cbb61', '#e2fbde']
};
import { mapState, mapMutations, mapActions } from 'Vuex'
import { requestResourceDetails,downloadAdd,requestcFrontendResourceList } from '@/service/resource.js'
import evaluateDetails from 'Common/evaluation/detailEvaluation.vue'
import breadcrumb from 'Common/breadcrumb.vue'
import comPanelEvent from 'Common/button/com_panel_event.vue'
import list from 'Common/classificationList/list/graphic/list.vue'
import docReader from './doc_reader.vue'
import imgPreview from '@/components/common/img_preview/img_preview.vue'

export default {
    name: 'resourcesDetails',
    components: {
        'evaluate-details': evaluateDetails,
        'bread-crumb': breadcrumb,
        'com-panel-event':comPanelEvent,
        docReader,
        'v-list':list,
        'img-preview': imgPreview
    },
    data() {
  	    return {
            evaluateData:{
                name:'资源',  //类型名称
                reportApi:'maker/evaluate/addReport',// 举报api
                dataUrl:{
                    evaluateCount:'maker/evaluate/selectEvaluateCount',   //评论统计的url
                    evaluateList:'maker/evaluate/getList',    //评论列表url
                    evaluationAdd:'maker/evaluate/add',   //发表评论url
                },
                params:'busId',    //字段名
                id:'',
                labelType:'4'
            },
            detailsData:'',
            isFront:'',//根据路由判断是否是后台，控制面包屑的显示。
            isPraise:false,
            items:[],
            listData:{
                col:1,
                pathUrl:'/space/resource/details',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            morePath:'/educationBureauSpace/resources',
            videoHasPaused: true,
            docWidth: 950,
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    created() {
        this.evaluateData.id = this.$route.query.id;
        // this.checkStatistics();
        // 设置返回的路由
        this.isFront = !this.$route.path.includes('admin')
        this.setDocWidth()
    },
    watch:{
        '$route.query.id' () {
            this.evaluateData.id = this.$route.query.id;
            this.getResourceDetails();
            this.getRelatedResource();
        }
    },
    computed: {
    },
    mounted() {
        this.getResourceDetails();
        this.getRelatedResource();
    },
    methods:{
        ...mapActions({
          'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        //设置文件预览宽度
        setDocWidth() {
            const routrPath = this.$route.path
            switch (routrPath) {
                case '/admin/resource/details':
                    this.docWidth = 950
                    break
                case '/space/resource/details':
                    this.docWidth = 876
                    break
                case '/studioMemberDetail/resource/detail':
                    this.docWidth = 876
                    break
                default:
                    break
            }
        },
        /*
        *获取资源详情
        *id:资源id
        */
        getResourceDetails(){
            let borwSource = 1;
            if(!this.isFront){
                borwSource = 2
            };
            let data = {
                id: this.evaluateData.id,
                borwSource: borwSource
            };
            requestResourceDetails(data).then((res) => {
                let _data = res.data.entity;
                this.detailsData = _data;
            });
        },
        /*
         * 下载次数加1
         */
        downloadAdd(){
            downloadAdd({id:this.$route.query.id}).then((res) => {
                if(res.data.code == 200){
                    this.detailsData.downNum ++;
                }
            })
        },
        // 获取相关资源列表
        async getRelatedResource(){
            const res = await requestcFrontendResourceList({ resourceId: this.$route.query.id },{pageSize:5,pageNum:1});
            if(res.data.code == 200){
                this.items = res.data.entity.resultData
            }
        },
        // 视频播放的控制
        play () {
            this.$refs.video.play()
            this.videoHasPaused = !this.videoHasPaused
        },
        togglePlay () {
            let videoEl = this.$refs.video
            if (this.videoHasPaused) {
                videoEl.play()
                this.videoHasPaused = false
                return
            }
            videoEl.pause()
            // videoEl.currentTime = 10
            this.videoHasPaused = true
        },
        videoIsEnded () {
            this.videoHasPaused = true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
@import '~@/asset/scss/related_list.scss';
    *{
        box-sizing: border-box;
    }
    .w308{
        width: 308px;
    }
    .mgt0{
        margin-top: 0 !important;
    }
    #resourcesDetails{
    	overflow: hidden;
    	margin: 0 auto;
        margin-top: 20px;
        // 左边部分
        .content-left{
            width: 906px;
            //预览图
            .preview-box{
                padding: 15px;
                margin-bottom: 20px;
                .preview-img{
                    width: 100%;
                    height: 369px;
                    background-position: center;
                    background-size: cover;
                }
            }
            .resource-msg{
                width: 100%;
                padding: 15px;
                margin-bottom: 20px;
                position: relative;
                .operate-group{
                    position: absolute;
                    top: 15px;
                    right: 15px;
                }
                .dl-btn{
                    position: absolute;
                    bottom: 15px;
                    right: 15px;
                    display: inline-block;
                    width: 96px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    font-size: 14px;
                    color: #fff;
                    background-color: $default-color;
                    border-radius: 3px;
                    &:hover{
                        opacity: 0.75;
                    }
                }
                .resource-title{
                    height: 40px;
                    line-height: 40px;
                    font-size: 22px;
                    margin-bottom: 10px;
                    color: #333;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 75%;
                    overflow: hidden;
                }
                .intro-box{
                    font-size: 14px;
                    color: #333;
                    line-height: 1.8em;
                    margin-bottom: 20px;
                }
                .msg-box{
                    width: 780px;
                    font-size: 14px;
                    color: #626262;
                    font-weight: lighter;
                    line-height: 2.2em;
                    &:last-child{
                    }
                    i{
                        margin-right:10px;
                    }
                }
            }
        }
    }
    #resourcesDetails{
        #list{
            margin: 0;
            .list{
                .list-item__box{
                    margin-bottom: 0px;
                    .list-item-img__box{
                        background-color: #e7edf2;
                        text-align: center;
                        img{
                            height: 163px;
                        }

                        [class*="icon-file-"],
                        [class*=" icon-file-"] {
                            line-height: 163px;
                            font-size: 80px;
                            color: #b3b3b3;
                        }
                    }
                }
            }
        }
    }
    .width100{
        width: 100% !important;
    }

    // 视频播放
    .wrapper {
        position: relative;
    }
    video {
        width: 100%;
        cursor: pointer;
    }
    .btn-start {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 96px;
        height: 96px;
        transform: translate(-50%, -50%) scale(1);
        // background: url("../../../asset/img/course/btn_start.png") no-repeat;
        border-radius: 50%;
        cursor: pointer;
        &.fade-enter-active, &.fade-leave-active {
            transition: all .5s ease;
        }
        &.fade-enter, &.fade-leave-to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.1);
        }
    }
</style>

<style lang="scss">
@import "~@/asset/scss/vars.scss";
    #resourcesDetails{
        .list{
            .list-item__box{
                border-top: 1px solid #ddd !important;
                margin-bottom: 0;
                &:hover{
                    .list-title{
                        color: $default-color;
                    }
                }
            }
        }
    }
</style>
