<template>
    <div
        id="works_detail"
        class="w100"
        v-bind:class="{'container': $route.path.includes('worksDetail')}"
    >
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="route">{{breadTxt}}</el-breadcrumb-item>
            <el-breadcrumb-item>参赛详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 评审 -->
        <div class="comment-wrap bgw" v-if="$route.path.includes('review')">
            <v-tabs :tabs="[
		      		{ name: '评审', type: 'review'},
			  	]" :router="router"></v-tabs>
            <!-- <v-tabs :tabs="[
		      		{ name: '评论区', type: 'comment'},
		      		{ name: '评审', type: 'review'},
            ]" :router="router"></v-tabs>-->
            <router-view :indexList="indexList"></router-view>
        </div>

        <div class="detail-wrap bgw">
            <offline-detail v-if="Number($route.query.type) === 2" @callback="setBrowseNum"></offline-detail>
            <div v-else>
                <!-- 作品标题信息 -->
                <section class="detail-head">
                    <h4 class="works-title">{{worksDetail.name || '暂无标题'}}</h4>
                    <!-- <div class="works-msg">
    					<span class="msg-praise"><i class="icon-btn-thumbsup" title="点赞" v-bind:class="{ c_blue: ifPrasise }" @click="praiseOperate"></i> <b class="c_blue">{{praiseNum || 0}}</b>人</span>
    					<span class="msg-browse"><i class="icon-btn-browse" title="浏览数"></i> <b class="c_blue">{{worksDetail.browseNum || 0}}</b>人</span>
    					<span class="msg-score"><i class="">评分：</i> <b class="c_blue">{{worksDetail.score || 0}}</b></span>
                    </div>-->
                </section>
                <!-- 作品信息表 -->
                <section class="works-info clearfix">
                    <div class="fl info-box bxs_bb" v-for="(info, index) in worksInfo">
                        <dl class="clearfix info-item" v-for="(item, index) in info.info">
                            <dt class="item-tit fl bxs_bb">{{item.name}}</dt>
                            <dl
                                class="item-name fl bxs_bb ellipsis"
                                v-if="item.name === '所属区域'"
                            >{{worksDetail.provinceName}}{{worksDetail.cityName}}{{worksDetail.areaName}}</dl>
                            <dl
                                class="item-name fl bxs_bb ellipsis"
                                v-else-if="item.name === '参赛人群'"
                            >{{actorType[detail.actorType] || worksDetail.identity}}</dl>
                            <dl
                                class="item-name fl bxs_bb ellipsis"
                                v-else
                            >{{worksDetail[item.key] || '暂无'}}</dl>
                        </dl>
                    </div>
                </section>
                <!-- 作品图片 -->
                <thum-carousel :imgs="worksDetail.worksList"></thum-carousel>
                <!-- <section class="works-pic">
    		        <el-carousel height='362px' type="card" :interval="3000">
    		            <el-carousel-item v-for='(item, index) in worksDetail.worksList' :key="index">
    		                <div class='banner-img' :style='{"background-image": "url(" +getFileUrl(item.resourceId)+ ")"}'></div>
    		            </el-carousel-item>
    		        </el-carousel>
                </section>-->
                <!-- 作品详情 -->
                <section class="works-detail">
                    <article class="detail-content" v-html="worksDetail.description"></article>
                    <dl class="detail-file clearfix">
                        <dt class="fl">附件：</dt>
                        <dd
                            class="fl file"
                            v-if="worksDetail.attachmentList != null && worksDetail.attachmentList.length"
                        >
                            <!-- <a class="c_blue" v-for="(file, index) in worksDetail.attachmentList" :href="downloadUrl(file.resourceId, file.name)" :download="downloadName(file.name)" :title="file.name">{{file.name}}</a><br> -->
                            <a
                                class="c_blue"
                                v-for="(file, index) in worksDetail.attachmentList"
                                href="javascript:;"
                                @click="downloadUrl(file.resourceId, file.name )"
                            >{{file.name}}</a>
                            <br />
                        </dd>
                        <dd class="fl file" v-else>暂无附件</dd>
                    </dl>
                </section>
            </div>
            <!-- 点赞以及评论评分 -->
            <section class="praise-operate">
                <div class="praise-box">
                    <span
                        class="icon-btn icon-btn-thumbsup"
                        :title="praiseTitle"
                        :class="{active: ifPrasise}"
                        @click="praiseOperate"
                    ></span>
                    <!-- <p class="praise-txt" v-if="ifPrasise">已点赞</p> -->
                    <p class="praise-txt">赞</p>
                </div>
                <div class="stati-data">
                    <span class="msg-praise">
                        点赞：
                        <i class="c_orange">{{praiseNum || 0}}</i>人
                    </span>
                    <span class="msg-browse" v-if="Number($route.query.type) === 1">
                        浏览：
                        <i class="c_orange">{{worksDetail.browseNum || 0}}</i>人
                    </span>
                    <span class="msg-browse" v-else>
                        浏览：
                        <i class="c_orange">{{offlineBrowseNum || 0}}</i>人
                    </span>
                    <span class="msg-score" v-if="Number($route.query.type) === 1">
                        评分：
                        <i class="c_orange">{{worksDetail.score || 0}}</i>
                    </span>
                </div>
            </section>
        </div>

        <!-- <div class="comment-wrap bgw" v-else>
			<h4 class="comment-head">评论区</h4>
			<v-comment :commentProps="commentProps"></v-comment>
        </div>-->
    </div>
</template>

<script>
import tabs from '@/components/common/tabs.vue'
import comment from '@/components/common/comment.vue'
import thumbnailCarousel from '@/components/common/thumbnail_carousel.vue'
import offlineDetail from '@/components/works/offline_worksDetail.vue'
import {
    requestWorksDetail,
    requestEvalIndex,
    countBrowseNum,
    countOfflineBrowseNum,
    judgePraise,
    commonStatistics,
    worksPraise,
    worksCancelPraise
} from '@/service/works.js'
import { mapState } from 'vuex'

export default {
    name: 'works_detail',
    components: {
        'v-tabs': tabs,
        'v-comment': comment,
        'thum-carousel': thumbnailCarousel,
        'offline-detail': offlineDetail
    },
    data() {
        return {
            worksInfo: [
                {
                    info: [
                        // { name: '作者', key: 'userName' },
                        { name: '参赛人群', key: '' },
                        { name: '所属区域', key: '' },
                        { name: '所属学校', key: 'schoolName' },
                        { name: '竞赛分组', key: 'actorGroup' }
                    ]
                },
                {
                    info: [
                        { name: '竞赛项目', key: 'projectName' },
                        { name: '竞赛形式', key: 'actorWay' },
                        // { name: '团队成员', key: 'teamMembers' },
                        // { name: '指导教师', key: 'instructor' },
                        { name: '当前赛程', key: 'phaseName' },
                        { name: '作品编号', key: 'workNo' }
                    ]
                }
            ],
            actorType: {
                1: '学生',
                2: '教师'
            },
            router: {
                path: '',
                query: {}
            },
            worksDetail: {},
            commentProps: {
                queryKey: 'worksId',
                parmasKey: 'worksId', // 请求参数名
                replyKey: 'comments', // 获取评论中的回复列表的字段
                reportApi: 'maker/matchWorksCommentReport/add', // 举报api
                addApi: 'maker/matchWorksComment/add', // 添加评论api
                getListApi: 'maker/matchWorksComment/selectPager', // 获取评论列表api
                addPraiseApi: 'maker/work/comment/praise/add', // 点赞api
                cancelPraiseApi: '/maker/work/comment/praise/cancelPraise', // 取消点赞api
                replyListApi: 'maker/matchWorksComment/selectPager/reply' // 评论 --回复列表api
            },
            indexList: [],
            route: {
                // 面包屑返回的路由
                path: '',
                query: {
                    id: this.$route.query.id,
                    type: this.$route.query.type
                }
            },
            ifPrasise: false,
            praiseNum: 0,
            msg: '',
            breadTxt: '全部参赛',
            praiseTitle: '点赞',
            offlineBrowseNum: 0
        }
    },
    computed: {
        ...mapState('matchDetail', {
            detail(state) {
                const details = state.detail || {}
                return details
            }
        })
    },
    watch: {
        ifPrasise: {
            handler: function(val) {
                this.praiseTitle = val ? '取消点赞' : '点赞'
            },
            deep: true
        }
    },
    created() {
        if (this.$route.path === '/contest/review/audited/detail/review') {
            this.router.path = '/contest/review/audited/detail'
            this.router.query = this.$route.query
            this.route.path = '/contest/review/audited'
            this.breadTxt = '经我评审'
        } else if (
            this.$route.path === '/contest/review/pending/detail/review'
        ) {
            this.router.path = '/contest/review/pending/detail'
            this.router.query = this.$route.query
            this.route.path = '/contest/review/pending'
            this.breadTxt = '待我评审'
        }
        if (Number(this.$route.query.type) !== 2) {
            this.getWorksDetail()
        }
    },
    mounted() {
        window.scrollTo(0, 0)
        if (this.$ls.get('loginUId')) {
            judgePraise({
                busId: this.$route.query.worksId,
                userId: this.$ls.get('loginUId')
            }).then(res => {
                if (res.data.code === 200) {
                    this.ifPrasise = res.data.appendInfo.isPraise
                }
            })
        }
        commonStatistics({ busId: this.$route.query.worksId }).then(res => {
            if (res.data.code === 200) {
                this.praiseNum = res.data.appendInfo.praiseCount
            }
        })
        // 竞赛-作品-计算浏览数量
        const handle =
            Number(this.$route.query.type) === 1
                ? countBrowseNum
                : countOfflineBrowseNum
        handle({ id: this.$route.query.worksId }).then(() => {})

        const model = this.$route.params.model
        switch (model) {
            case 'compete':
                this.route.path = '/contest/works'
                this.breadTxt = '全部参赛'
                break
            case 'awards':
                this.route.path = '/contest/awards'
                this.breadTxt = '获奖作品'
                break
            default:
                break
        }
    },
    methods: {
        getWorksDetail() {
            requestWorksDetail({ id: this.$route.query.worksId }).then(res => {
                if (res.data.code === 200) {
                    this.worksDetail = res.data.entity
                    if (this.$route.path.includes('review')) {
                        // 获取评审指标
                        requestEvalIndex({
                            projectId: this.worksDetail.projectId
                        }).then(response => {
                            if (response.data.code === 200) {
                                this.indexList = response.data.entity.resultData
                                for (
                                    let i = 0;
                                    i < this.indexList.length;
                                    i++
                                ) {
                                    this.$set(
                                        this.indexList[i],
                                        'scoreInput',
                                        0
                                    )
                                }
                            }
                        })
                    }
                }
            })
        },
        praiseOperate() {
            let handle
            if (this.ifPrasise) {
                handle = worksCancelPraise
                this.msg = '成功取消点赞'
            } else {
                handle = worksPraise
                this.msg = '点赞成功'
            }
            handle({ busId: this.$route.query.worksId }).then(res => {
                if (res.data.code === 200) {
                    this.showMessage('success', this.msg)
                    if (this.ifPrasise) {
                        this.praiseNum--
                    } else {
                        this.praiseNum++
                    }
                    this.ifPrasise = !this.ifPrasise
                } else {
                    this.showMessage('error', res.data.msg)
                }
            })
        },
        setBrowseNum(val) {
            this.offlineBrowseNum = val
        },
        downloadName(name) {
            return (
                this.worksDetail.groupDisDetailName +
                '_' +
                this.worksDetail.projectName +
                '_' +
                this.worksDetail.schoolName +
                '_' +
                this.worksDetail.userName +
                '_' +
                name
            )
        }
    }
}
</script>

<style lang="scss">
@import '~@/assets/css/scss/vars.scss';
#works_detail {
    .el-breadcrumb {
        padding: 14px 0;
    }
    .comment-box {
        padding: 15px;
    }
    .praise-box {
        [class*='icon-btn-']:hover {
            color: $theme-color;
        }
    }
}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
$border_c: #dfdfdf;
.c_orange {
    color: #ffb200;
}
.c_red {
    color: #d00;
}
.c_blue {
    color: $theme-color;
}
.bxs_bb {
    box-sizing: border-box;
}
.w100 {
    width: 100%;
}
#works_detail {
    margin-bottom: 40px;
    .detail-wrap {
        margin-bottom: 20px;
        padding: 15px;
        // 作品标题信息
        .detail-head {
            margin-bottom: 25px;
            .works-title,
            .works-msg {
                text-align: center;
            }
            .works-title {
                line-height: 84px;
                font-size: 22px;
                color: #333;
            }
            .works-msg {
                font-size: 14px;
            }
            .msg-praise,
            .msg-browse {
                margin-right: 30px;
            }
        }
        // 作品信息表
        .works-info {
            margin-bottom: 40px;
            .info-box {
                font-size: 14px;
                width: 50%;
                border: 1px solid $border_c;
                &:last-child {
                    border-left: none;
                }
                .info-item {
                    line-height: 40px;
                    border-bottom: 1px solid $border_c;
                    &:last-child {
                        border-bottom: none;
                    }
                    .item-tit {
                        text-align: center;
                        background-color: #fbfbfb;
                        color: #999;
                        width: 39%;
                        border-right: 1px solid $border_c;
                    }
                    .item-name {
                        color: #3e3e3e;
                        width: 61%;
                        padding-left: 50px;
                    }
                }
            }
        }
        // 作品详情
        .works-detail {
            margin: 30px 0 15px;
            .detail-content {
                line-height: 2em;
                font-size: 14px;
                margin-bottom: 20px;
                word-wrap: break-word;
                text-align: justify;
            }
            .detail-file {
                line-height: 2em;
                font-size: 14px;
                .file {
                    width: 95%;
                    a {
                        display: block;
                    }
                }
            }
        }

        // 点赞评论评分统计
        .praise-operate {
            position: relative;
            width: 100%;
            height: 120px;
            margin-bottom: 15px;
            .praise-box {
                width: 66px;
                height: 100px;
                text-align: center;
                margin: 0 auto;
                .icon-btn {
                    font-size: 28px;
                    width: 66px;
                    height: 66px;
                    line-height: 66px;
                    border: 1px solid $theme-color;
                    border-radius: 1000px;
                    display: block;
                    color: $theme-color;
                }
                .praise-txt {
                    font-size: 14px;
                    margin-top: 15px;
                    color: #666666;
                }
            }
            .stati-data {
                position: absolute;
                bottom: -8px;
                right: 50%;
                transform: translate(50%, 0);
                -ms-transform: translate(50%, 0); /* IE 9 */
                -moz-transform: translate(50%, 0);
                -webkit-transform: translate(50%, 0); /* Safari and Chrome */
                color: #999;
                .msg-praise {
                    margin-right: 25px;
                }
                .msg-score {
                    margin-left: 25px;
                }
                i {
                    font-weight: bold;
                }
            }
        }
    }
    // 评论-评审
    .comment-wrap {
        .comment-head {
            line-height: 40px;
            font-size: 16px;
            padding-left: 15px;
            border-bottom: 1px solid $border_c;
        }
    }
}
.el-carousel__item .banner-img {
    height: 100%;
    background-position: center;
    background-size: cover;
}
</style>