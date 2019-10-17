<template>
    <div id="resourcesDetails" class="clearfix" v-bind:class="{'mgt0': !isFront,'container': isFront }">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="navigation">
            <el-breadcrumb-item @click.native="redirect(pages.index.url)">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资源详情</el-breadcrumb-item>
        </el-breadcrumb>
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
                <a class="dl-btn" v-if="$ls.get('loginInfo')" :href="downloadUrl(detailsData.fileId, detailsData.name, detailsData.fileExt)" :download="detailsData.name" @click="downloadAdd">下载</a>
            </section>
            <!-- 评价部分 -->
            <evaluate-details :evaluateData="evaluateData" v-if="detailsData.auditStatus == 1" class="bgw" style="padding:15px;"></evaluate-details>
        </div>
        <div class="related-list bgw fr" v-if="isFront">
            <h4 class="title clearfix">相关资源
                <!-- <router-link :to="morePath" class="btn-more fr">更多>></router-link> -->
            </h4>
            <ul class="list clearfix" v-if="items.length">
                <li class="list-item__box" v-for="(item, index) in items" @click="redirect(pages.detail.resource, { query: { id: item.id } })" :key="item.id">
                    <div class="list-item-img__box">
                        <img v-if="Number(item.fileType) == 4" :src="getFileUrl(item.fileId) || listDefault" class="list-item-img__box_img">
                        <div class="video-cover" v-else-if="item.fileType == 2">
                            <i class="play-btn icon-btn-play"></i>
                            <video :id="item.id" :src="getFileUrl(item.fileId, {filetype: 'video'})" x-webkit-airplay="allow" autoplay preload="auto" style="display: none"></video>
                            {{captureImage(item.id, index, 'items')}}
                            <img class="list-item-img__box_img" :src="item.cover || listDefault">
                        </div>
                        <i v-else :class="{'icon-file-text': item.fileType == 1, 'icon-file-music': item.fileType == 3, 'icon-file-empty': item.fileType == 5}"></i>
                    </div>
                    <div class="list-item-title">
                        <div class="list-title ellipsis" :title="item.name">{{ item.name }}</div>
                        <p class="msg">
                            <span title="收藏数"><i class="icon-btn-i-collection on"></i>{{item.collection || 0}}</span>
                            <span title="评论数"><i class="icon-btn-i-reply"></i>{{item.evaluateCount || 0}}</span>
                            <span title="浏览数"><i class="icon-i-browse"></i>{{item.browseNum || 0}}</span>
                        </p>
                    </div>
                </li>
            </ul>
            <div v-else class="empty-block">暂无数据</div>
        </div>
        <img-preview :visible.sync="visible" :imgUrl="detailsData.fileId"></img-preview>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { requestResourceDetails, downloadAdd, requestcFrontendResourceList } from '@/service/resource.js'
import evaluateDetails from 'Common/evaluation/detailEvaluation.vue'
import breadcrumb from 'Common/breadcrumb.vue'
import comPanelEvent from 'Common/button/com_panel_event.vue'
import list from 'Common/list/graphic/list.vue'
import imgPreview from '@/components/common/img_preview/img_preview.vue'
import { interceptVideo } from '@/mixin/intercept_video.js'
import docReader from './doc_reader.vue'

// const color = {
//     red: ['#f85959', '#fee0e0'],
//     grassGreen: ['#2cbb61', '#e2fbde']
// }

export default {
    name: 'resourcesDetails',
    mixins: [interceptVideo],
    components: {
        'evaluate-details': evaluateDetails,
        'bread-crumb': breadcrumb,
        'com-panel-event': comPanelEvent,
        docReader,
        'v-list': list,
        'img-preview': imgPreview
    },
    data() {
        return {
            evaluateData: {
                name: '资源',  // 类型名称
                reportApi: 'maker/evaluate/addReport', // 举报api
                dataUrl: {
                    evaluateCount: 'maker/evaluate/selectEvaluateCount',   // 评论统计的url
                    evaluateList: 'maker/evaluate/getList',    // 评论列表url
                    evaluationAdd: 'maker/evaluate/add',   // 发表评论url
                },
                params: 'busId',    // 字段名
                id: '',
                labelType: '4'
            },
            detailsData: '',
            isFront: '', // 根据路由判断是否是后台，控制面包屑的显示。
            isPraise: false,
            items: [],
            listData: {
                col: 1,
                pathUrl: `#${this.pages.detail.resource.url}`,
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            morePath: '/educationBureauSpace/resources',
            videoHasPaused: true,
            docWidth: 950,
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    created() {
        this.evaluateData.id = this.$route.query.id
        // this.checkStatistics();
        // 设置返回的路由
        this.isFront = !this.$route.path.includes('admin')
        this.setDocWidth()
    },
    watch: {
        '$route.query.id'() {
            this.evaluateData.id = this.$route.query.id
            this.getResourceDetails()
            this.getRelatedResource()
        }
    },
    computed: {
    },
    mounted() {
        this.getResourceDetails()
        this.getRelatedResource()
    },
    methods: {
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        }),
        // 设置文件预览宽度
        setDocWidth() {
            const routrPath = this.$route.path
            switch (routrPath) {
                case '/resource':
                    this.docWidth = 876
                    break
                case '/space/studio/resource/detail':
                    this.docWidth = 1160
                    break
                default:
                    break
            }
        },
        /*
         * 获取资源详情
         * id: 资源id
         */
        getResourceDetails() {
            let borwSource = 1
            if (!this.isFront) {
                borwSource = 2
            }
            const data = {
                id: this.evaluateData.id,
                borwSource: borwSource
            }
            requestResourceDetails(data).then((res) => {
                const _data = res.data.entity
                this.detailsData = _data
            })
        },
        /*
         * 下载次数加1
         */
        downloadAdd() {
            downloadAdd({ id: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    this.detailsData.downNum ++
                }
            })
        },
        // 获取相关资源列表
        async getRelatedResource() {
            const res = await requestcFrontendResourceList({ resourceId: this.$route.query.id }, { pageSize: 5, pageNum: 1 })
            if (res.data.code === 200) {
                this.items = res.data.entity.resultData
            }
        },
        // 视频播放的控制
        play() {
            this.$refs.video.play()
            this.videoHasPaused = !this.videoHasPaused
        },
        togglePlay() {
            const videoEl = this.$refs.video
            if (this.videoHasPaused) {
                videoEl.play()
                this.videoHasPaused = false
                return
            }
            videoEl.pause()
            // videoEl.currentTime = 10
            this.videoHasPaused = true
        },
        videoIsEnded() {
            this.videoHasPaused = true
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/related_list.scss';
    .w308{
        width: 308px;
    }
    .mgt0{
        margin-top: 0 !important;
    }

    #resourcesDetails{
    	overflow: hidden;
    	margin: 0 auto;
        /* 左边部分 */
        .content-left{
            width: 906px;
            /* 预览图 */
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
                box-sizing: border-box;
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
                    background-color: nth($default-color, 1);
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
                    word-break: break-all;
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
        .related-list {
            .title {
                border-bottom: 1px solid #ddd;
            }
        }

        .list{
            font-size: 0;
            .list-item__box{
                display: inline-block;
                padding: 10px;
                box-sizing: border-box;
                /* margin-bottom: $box-padding; */
                list-style: none;
                overflow: hidden;
                width: 100%;
                margin-bottom: 0px;
                & + .list-item__box {
                    border-top: 1px solid #ddd;
                }
                .list-item-img__box{
                    background-color: #e7edf2;
                    text-align: center;
                    .list-item-img__box_img {
                        width: 100%;
                        height: 163px;
                    }

                    [class*="icon-file-"],
                    [class*=" icon-file-"] {
                        line-height: 163px;
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
            }
            .list-title {
                font-size: 14px;
                padding: 5px 0;
            }
        }
    }
    .width100{
        width: 100% !important;
    }

    /* 视频播放 */
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
