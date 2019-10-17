<template>
    <div id="admin_works_details">
        <div v-if="Object.keys(worksDetails).length">
            <!-- 作品信息 -->
            <div class="works-msg backend-content__middle">
                <div class="works-title clearfix">
                    <h4 class="title fl">{{worksDetails.workName}}</h4>
                    <option-btn :title='worksDetails.workName' module="works" class="fr" v-if="!isAdmin" :img="worksDetails.resourceId"></option-btn>
                </div>
                <el-row :gutter="20" class="works-classify">
                    <el-col :span="12">
                        <span class="icon-i-classify"> 分类：{{ worksDetails.workTypeName }} </span>
                    </el-col>
                    <el-col :span="12">
                        <span class="icon-i-browse"> 浏览：{{ worksDetails.browseNum === null ? 0 : worksDetails.browseNum }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="works-classify">
                    <el-col :span="12">
                        <span class="icon-i-technology"> 技术：{{ worksDetails.technologyName }}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="icon-i-time2"> 上传时间：{{ worksDetails.createDate | dateFormat('yyyy-MM-dd HH:mm') }}</span>
                    </el-col>
                </el-row>
                <div class="works-introduction" :class="{show}">
                    作品简介：{{ worksDetails.introduction | textOverflow(introLen) }}
                    <div v-if="worksDetails.introduction.length > introLen" class="more" title="收回更多" @click="showMore(9999, true, '&lt;&lt;收回')" v-html='moreString'></div>
                    <div v-else-if="introLen === 9999" class="more" title="展开更多" @click="showMore(350, false, '展开更多')" v-html='moreString'></div>
                </div>
            </div>
            <!-- 作品图片 -->
            <el-tabs v-model="activeName" class="img-video bgw">
                <el-tab-pane label="作品图片" name="imgs">
                    <thu-carous :imgs="imgSrc"></thu-carous>
                </el-tab-pane>
                <el-tab-pane label="作品视频" name="vedio">
                    <div class="works-video backend-content__middle" v-if="videoSrc">
                        <h4 class="works-video_title"> [视频] <span style="color:#333;font-weight:normal;">{{ videoName }}</span> </h4>
                        <div class="wrapper">
                            <video ref="video" :src="videoSrc" height="500" width="906" @click="togglePlay" @ended="videoIsEnded" @play="videoHasPaused = false" @pause="videoHasPaused = true" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" controls="controls"></video>
                            <transition name="fade">
                                <div class="btn-start" v-show="videoHasPaused" @click.stop="play"><i class=""></i></div>
                            </transition>
                          </div>
                    </div>
                    <div class="empty-block" v-else>暂无视频</div>
                </el-tab-pane>
              </el-tabs>
            <!-- <div class="works-img backend-content__middle">
                <section class="img-box">
                    <el-carousel height='300px' type="card">
                        <el-carousel-item v-for='(item, index) in imgSrc' :key="index">
                            <img class='banner-img' :src="getFileUrl(item.resourceId) || listDefault"></img>
                        </el-carousel-item>
                    </el-carousel>
                </section>
            </div> -->
            <!-- 作品视频 -->
            <!-- 评论部分 -->
            <!-- <div class="works-comment backend-content__middle">
                <header class="header">
                    <h4>评论</h4>
                </header>
                <v-comment :commentProps="commentProps"></v-comment>
            </div> -->
            <div v-if="detailData.isStudent && $ls.get('loginInfo')" class="eval-wrapper bgw">
                <admin-evaluation class="works-detail-evaluation" :createDate="worksDetails.createTime" :createId="worksDetails.createId"></admin-evaluation>
            </div>
        </div>
        <div v-else class="backend-content__middle empty-block">暂无数据</div>
    </div>
</template>

<script>
    import optionBtn from 'Common/button/com_panel_event.vue'
    import comment from 'Common/comments/comment.vue'
    import adminEvaluation from 'View/evaluation/evaluation.vue'
    import thuCarous from 'Common/thumbnail_carousel.vue'
    import { requestWorksDetails } from '@/service/works.js'

    export default {
        name: 'admin_works_details',
        components: {
            'option-btn': optionBtn,
            'v-comment': comment,
            adminEvaluation,
            thuCarous
        },
        props: ['detailData'],
        data() {
            return {
                // 轮播
                imgSrc: [],
                // 视频地址
                videoSrc: '',
                // 视频名称
                videoName: '',
                // 视频暂停
                videoHasPaused: true,
                id: '',
                worksDetails: {},
                isAdmin: false,
                commentProps: {
                    parmasKey: 'workId',
                    replyKey: 'comments',
                    addApi: 'maker/work/comment/add',
                    reportApi: 'maker/work/comment/report/add',
                    getListApi: 'maker/work/comment/selectPager',
                    addPraiseApi: 'maker/work/comment/praise/add',
                    cancelPraiseApi: 'maker/work/comment/praise/cancelPraise'
                },
                activeName: 'imgs',
                introLen: 350,
                show: false,
                moreString: '展开更多'
            }
        },
        created() {
            const isTeacherOrStudentSpace = /^\/space\/student|teacher\/works\/detail/.test(this.$route.path)
            this.isTeacherOrStudentSpace = isTeacherOrStudentSpace
            isTeacherOrStudentSpace && window.scrollTo(0, document.body.scrollHeight)
            this.id = this.$route.query.worksId
            if (!isTeacherOrStudentSpace) {
                this.id = this.$route.query.id
            }
            this.getWorksDetails()
        },
        mounted() {
        },
        methods: {
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
                if (!this.autoPlayChecked) {
                    this.videoHasPaused = true
                }
            },
            // 获取作品详情
            getWorksDetails(id) {
                this.videoSrc = ''
                this.videoName = ''
                const { worksId } = this.$route.query
                let data = { id: this.isTeacherOrStudentSpace ? worksId : this.id }
                if (id) data = { id }
                requestWorksDetails(data).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity
                        this.worksDetails = _data
                        this.$emit('getOrgId', _data)
                        this.imgSrc = _data.workResource.filter(i => i.resourceType === 1)
                        const video = _data.workResource.find(i => i.resourceType === 2)
                        this.videoSrc = video ? this.getFileUrl(video.resourceId, { filetype: 'mp4' }) : null
                        this.videoName = video ? video.name : null
                        this.$emit('getCreator', _data.createId)
                    }
                })
            },
            showMore(len, isShow, moreString) {
                this.introLen = len
                this.show = isShow
                this.moreString = moreString
            }
        },
        filters: {
            // 处理作品描述字段，字段包括HTML标签内容
            handleWorksDesc(txt = '', len = 50, sep = '...') {
                const reg = new RegExp('(.{' + len + '}).+')
                return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
            }
        }
    }
</script>

<style lang="scss">
@import '~@/assets/css/scss/vars.scss';
    #admin_works_details {
        .img-video {
            .el-tabs__active-bar {
                width: 112px!important;
                height: 2px;
            }
            .el-tabs__item {
                padding: 0 20px;
                font-size: 18px;
                color: #333;
                &.is-active {
                    color: $theme-color;
                }
            }
            .el-tabs__content {
                padding-top: 15px;
            }
        }
    }
    .works-detail-evaluation {
        .el-tabs__item {
            font-size: 16px;
        }
    }
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
    #admin_works_details{
        .works-msg{
            width: 100%;
            padding: 20px;
            line-height: 25px;
            background-color: #fff;
            font-size: 14px;
            box-sizing: border-box;
            .works-title{
                line-height: 2;
                .title{
                    font-size: 20px;
                    margin-right: 35px;
                }
            }
            .works-introduction{
                position: relative;
                padding: 10px 0;
                line-height: 1.5;
                word-wrap: break-word;
                .more {
                    display: inline-block;
                    color: $theme-color;
                    cursor: pointer;
                }
            }
            .works-classify {
                color: #999;
            }
        }
        .img-video {
            padding-bottom: 30px;
            margin-bottom: 20px;
            margin-top: 20px;
        }
        .works-img{
            background-color: #fff;
        }
        .works-video{
            padding: 0;
            background-color: #fff;
            .works-video_title {
                height: 60px;
                line-height: 60px;
                font-size: 18px;
                font-weight: bold;
                color: #2797ed;
                text-indent: .5em;
            }
        }
        .works-comment{
            background-color: #fff;
            margin-bottom: 20px;
        }
    }
    .header{
        height: 28px;
        h4{
            display: inline-block;
            font-size: 16px;
        }
    }
    // 轮播图
    .banner-img{
        width: 100%;
        height: 100%;
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
        // background: url("~@/asset/img/course/btn_start.png") no-repeat;
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
  .is-admin .eval-wrapper {
    padding: 0 20px 20px;
  }
</style>
