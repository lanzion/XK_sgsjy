<template>
    <div id="microClassDetail" class="theme-orange container clearfix">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/studioMemberDetail/microClass',query:{id:detailsData.studioId} }">全部微课</el-breadcrumb-item>
            <el-breadcrumb-item>微课详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content-left">
            <!-- 预览 -->
            <div class="video-box bgw">
                <div class="wrapper">
                    <video ref="video" :src="getFileUrl(detailsData.resourceId,{filetype: 'video'})" height="620" @click="togglePlay" @ended="videoIsEnded" @play="videoHasPaused = false" @pause="videoHasPaused = true" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" controls="controls">您的浏览器不支持video标签</video>
                    <transition name="fade">
                        <div class="btn-start" v-show="videoHasPaused" @click.stop="play"><i class=""></i></div>
                    </transition>
                </div>
            </div>
            <!-- 资源信息 -->
            <section class="resource-msg bgw">
                <com-panel-event module="resource" class="operate-group" :title.sync="detailsData.name"></com-panel-event>
                <h5 class="resource-title" :title="detailsData.name">{{detailsData.name | textOverflow(22)}}</h5>
                <div class="intro-box">微课简介：{{detailsData.introduction | handleDesc(500)}}</div>
                <div class="msg-box clearfix">
                    <p class="w30  fl">
                        <i class="icon-input-user"></i>上传人：{{detailsData.createName || '暂无'}}
                    </p>
                    <p class="w30 fl">
                        <i class="icon-btn-browse"></i>观看数：{{detailsData.browseNum || 0}}
                    </p>
                    <p class="w30 fl">
                        <i class="icon-i-time"></i>上传时间：{{detailsData.createDate | dateFormat('yyyy-MM-dd')}}
                    </p>
                </div>
            </section>
            <!-- 评价部分 -->
            <evaluate-details :evaluateData="evaluateData" class="bgw" style="padding:15px;"></evaluate-details>
        </div>
    </div>
</template>

<script>
let color = {
    red: ['#f85959', '#fee0e0'],
    grassGreen: ['#2cbb61', '#e2fbde']
}
// import s from '../../../asset/'
import { mapState, mapMutations,mapGetters, mapActions } from 'Vuex'
import dataTranslation from '@/js/dataTranslation.js'
import { loginInfo } from '@/js/getUserInfo.js'
import { fileBaseUrl } from '@/js/common-config.js'
import { downloadAdd } from '@/service/resource.js'
import { requestMicroClassDetail,requestMicroClassList } from '@/service/studio.js'
import evaluateDetails from 'Common/evaluation/detailEvaluation.vue'
import breadcrumb from 'Common/breadcrumb.vue'
import comPanelEvent from 'Common/button/com_panel_event.vue'
import list from 'Common/classificationList/list/graphic/list.vue'
import docReader from 'components/resource/doc_reader.vue'

export default {
    name: 'microClassDetail',
    components: {
        'evaluate-details': evaluateDetails,
        'bread-crumb': breadcrumb,
        'com-panel-event':comPanelEvent,
        docReader,
        'v-list':list,
    },
    data() {
  	    return {
            fileBaseUrl,
            evaluateData:{
                name:'微课',  //类型名称
                reportApi:'maker/studioClassroomEvaluateReport/add',// 举报api
                dataUrl:{
                    evaluateCount:'maker/studioClassroomEvaluate/selectEvaluateCount',   //评论统计的url
                    evaluateList:'maker/studioClassroomEvaluate/selectPager',    //评论列表url
                    evaluationAdd:'maker/studioClassroomEvaluate/add',   //发表评论url
                },
                params:'classroomId',    //字段名
                id:'',
                labelType:'5'
            },
            detailsData:'',
            isPraise:false,
            items:[],
            listData:{
                col:1,
                pathUrl:'/studioMemberDetail/microClass/detail',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            videoHasPaused: true
  	    }
    },
    created() {
        this.evaluateData.id = this.$route.query.id;
        // this.checkStatistics();
        // 设置返回的路由
    },
    watch:{
        '$route.query.id' () {
            this.evaluateData.id = this.$route.query.id;
            this.getmicroClassDetails();
        }
    },
    computed: {
    },
    mounted() {
        this.getmicroClassDetails();
        // this.getRelatedClass();
    },
    filters: {
        handleDesc (txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
            let reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    },
    methods:{
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
        },
        ...mapActions({
          'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        /*
        *获取weike详情
        *id:weikeid
        */
        getmicroClassDetails(){
            let data = {
                id: this.evaluateData.id
            };
            requestMicroClassDetail(data).then((res) => {
                this.detailsData = res.data.entity;
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
        async getRelatedClass(){
            const res = await requestMicroClassList({studioId:this.$route.query.id},{pageSize:5,pageNum:1});
            if(res.data.code == 200){
                this.items = res.data.entity.resultData
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
    *{
        box-sizing: border-box;
    }
    .w30{
        width: 30%;
    }
    #microClassDetail{
    	overflow: hidden;
    	margin: 0 auto;
        // margin-top: 20px;
        // 左边部分
        .content-left{
            // width: 906px;
            .video-box{
                padding: 15px;
                margin-bottom: 20px;
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
                    background-color: #ff7200;
                    border-radius: 3px;
                    &:hover{
                        opacity: 0.75;
                    }
                }
                .resource-title{
                    cursor: default;
                    height: 40px;
                    line-height: 40px;
                    font-size: 22px;
                    margin-bottom: 10px;
                    color: #333;
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
    #microClassDetail{
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

    video::-internal-media-controls-download-button {
        display:none;
    }

    video::-webkit-media-controls-enclosure {
        overflow:hidden;
    }

    video::-webkit-media-controls-panel {
        width: calc(100% + 30px);
    }

</style>

<style lang="scss">
    #microClassDetail{
        .list{
            .list-item__box{
                border-top: 1px solid #ddd !important;
                margin-bottom: 0;
                &:hover{
                    .list-title{
                        color: #ff7200;
                    }
                }
            }
        }
    }
</style>
