<template>
    <div>
        <!-- 作品信息 -->
        <div class="works-msg">
            <div class="works-title clearfix">
                <h4 class="title fl">{{worksDetails.workName}}</h4>
            </div>
            <div class="works-classify">分类：<span>{{worksDetails.workTypeName}}</span></div>
            <div class="works-technology">技术：<span>{{worksDetails.technologyName}}</span></div>
            <div class="others">
                <span class="icon icon-i-browse"> {{worksDetails.browseNum === null ? 0 : worksDetails.browseNum}} </span>
                <span class="icon icon-btn-i-collection"> {{worksDetails.browseNum === null ? 0 : worksDetails.browseNum}} </span>
                <span class="icon icon-btn-i-thumbsup"> {{worksDetails.browseNum === null ? 0 : worksDetails.browseNum}} </span>
                <span class="icon icon-btn-i-share"> {{worksDetails.browseNum === null ? 0 : worksDetails.browseNum}} </span>
            </div>
            <div class="works-introduction">
                作品简介：{{ worksDetails.introduction }}
            </div>
        </div>
        <section class="img-box">
            <v-tab :tabs="tabs_img"></v-tab>
            <div style="width:900px;">
                <thu-carous :imgs="imgSrc"></thu-carous>
                <!-- <el-carousel height='380px' type="card">
                    <el-carousel-item v-for='(item, index) in imgSrc' :key="index">
                        <img class='banner-img' :src="getFileUrl(item)"></img>
                    </el-carousel-item>
                </el-carousel> -->
            </div>
        </section>
        <div class="works-video">
            <v-tab :tabs="tabs_video"></v-tab>
            <div class="wrapper">
                <video ref="video" :src="videoSrc" height="380" width="906" @click="togglePlay" @ended="videoIsEnded" @play="videoHasPaused = false" @pause="videoHasPaused = true" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" controls="controls"></video>
                <transition name="fade">
                    <div class="btn-start" v-show="videoHasPaused" @click.stop="play"><i class=""></i></div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import comment from '@/components/common/comment.vue'
import { requestWorksDetails } from '@/service/works.js'
import tabs from '@/components/common/tabs.vue'
import thuCarous from '@/components/common/thumbnail_carousel.vue'

export default {
    data () {
        return {
            title:'作品',
            imgSrc: [],
            videoSrc: '',
            videoHasPaused: true,
            worksDetails:{},
            commentData:{
                reportApi:'maker/work/comment/report/add',
                type:'works',
                replyKey:'workId'
            },
            tabs_img: [
                { name: '作品详情'}
            ],
            tabs_video: [
                { name: '作品视频'}
            ]
        }
    },
    components:{
        'v-comment':comment,
        'v-tab': tabs,
        thuCarous
    },
    mounted () {
        this.getWorksDetails()
        // this.router.query = this.$route.query;
    },
    methods: {
        // 请求数据
        getWorksDetails () {
            let data = { id: this.$route.query.id };
            requestWorksDetails(data).then( res => {
                let _data = res.data.entity
                this.worksDetails = _data
                _data.workResource.forEach( i => {
                    if(i.resourceType == 1) {
                        this.imgSrc.push(i.resourceId)
                    }else {
                        this.videoSrc = this.getFileUrl(i.resourceId, {filetype: 'mp4'})
                        this.videoName = i.name
                    }
                })
            })
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
            if (!this.autoPlayChecked) {
            this.videoHasPaused = true
            }
        }
    },
    filters: {
      handleWorksDesc (txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
        let reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
      }
    }
}
</script>

<style lang='scss' scoped>
.works-msg, .img-box, .works-video {
    border-radius: .5em;
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
    font-size: 16px;
    line-height: 25px;
}
.works-msg{
    .works-title{
        margin-bottom: 20px;
        .title{
            font-size: 22px;
            color: #00b5f0;
            margin-right: 35px;
        }
    }
    .works-introduction{
        margin-bottom: 20px;
        word-wrap: break-word;
    }
    .others{
        color: #999;
        .icon {
            padding-right: 10px;
            cursor: default;
        }
    }
}
.img-box {
    margin: 20px 0;
    .header{
        border-bottom: 1px solid #ccc;
        line-height: 2;
        h4{
            display: inline-block;
            line-height: 2;
            font-size: 16px;
            border-bottom: 2px solid #2797ed;
        }
    }
    .banner-img{
        width: 100%;
        height: 100%;
    }
}
.works-video {
    .wrapper {
        position: relative;
        width: 900px;
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
        /* background: url("../../../assets/img/course/btn_start.png") no-repeat; */
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
}
</style>

