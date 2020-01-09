<template>
    <div
        id="works_detail"
        class="w100"
        v-bind:class="{'container': $route.path.includes('worksDetail')}"
    >
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="route">{{breadTxt}}</el-breadcrumb-item>
            <el-breadcrumb-item>作品详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="detail-wrap bgw">
            <!-- 作品标题信息 -->
            <section class="detail-head">
                <h4 class="works-title">{{worksDetail.name || '暂无标题'}}</h4>
                <div class="works-msg">
                    <span class="msg-praise">
                        <i
                            class="icon-btn-thumbsup"
                            title="点赞"
                            v-bind:class="{ c_blue: ifPrasise }"
                            @click="praiseOperate"
                        ></i>
                        <b class="c_blue">{{praiseNum || 0}}</b>人
                    </span>
                    <span class="msg-browse">
                        <i class="icon-btn-browse" title="浏览数"></i>
                        <b class="c_blue">{{worksDetail.browseNum || 0}}</b>人
                    </span>
                    <span v-if="worksDetail.userName !== loginName" class="msg-score">
                        <i class>评分：</i>
                        <b class="c_blue">{{worksDetail.score || 0}}</b>
                    </span>
                </div>
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
            <!-- 预留字段信息 -->
            <section class="field-list">
                <h4 class="field-list-tit">其他信息</h4>
                <dl class="field-list-item clearfix">
                    <dt class="field-list-item-tit fl">手机号码:</dt>
                    <dd class="field-list-item-content fl">{{worksDetail.phone}}</dd>
                </dl>
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
                <article class="detail-content">{{worksDetail.description}}</article>
                <dl class="detail-file clearfix">
                    <dt class="fl">附件：</dt>
                    <dd
                        class="fl file"
                        v-if="worksDetail.attachmentList != null && worksDetail.attachmentList.length"
                    >
                        <!-- <a class="c_blue" v-for="(file, index) in worksDetail.attachmentList" :href="downloadUrl(file.resourceId, file.name)" :download="file.name" :title="file.name">{{file.name}}</a><br> -->
                        <a
                            class="c_blue"
                            v-for="(file, index) in worksDetail.attachmentList"
                            href="javascript:;"
                            @click="downloadUrl(file.resourceId, file.name )"
                            :title="file.name"
                        >{{file.name}}</a>
                        <br />
                    </dd>
                    <dd class="fl file" v-else>暂无附件</dd>
                </dl>
            </section>
        </div>
        <!-- <div class="comment-wrap bgw">
            <v-tabs :tabs="[
                    { name: '评论区', type: 'comment'},
                    { name: '评审', type: 'review'},
                ]" :router="router"></v-tabs>
            <router-view :indexList="indexList"></router-view>
        </div>-->
        <!--        <div class="comment-wrap bgw" v-else>
            <h4 class="comment-head">评论区</h4>
            <v-comment :commentProps="commentProps"></v-comment>
        </div>-->
    </div>
</template>

<script>
import tabs from '@/components/common/tabs.vue'
import comment from '@/components/common/comment.vue'
import thumbnailCarousel from '@/components/common/thumbnail_carousel.vue'
import {
    requestWorksDetail,
    requestEvalIndex,
    countBrowseNum,
    judgePraise,
    commonStatistics,
    worksPraise,
    worksCancelPraise
} from '@/service/works.js'
import { mapState } from 'vuex'

export default {
    components: {
        'v-tabs': tabs,
        'v-comment': comment,
        'thum-carousel': thumbnailCarousel
    },
    data() {
        return {
            loginName: '',
            worksInfo: [
                {
                    info: [
                        { name: '作者', key: 'userName' },
                        { name: '参赛人群', key: '' },
                        { name: '所属区域', key: '' },
                        { name: '所属学校', key: 'schoolName' },
                        { name: '竞赛分组', key: 'actorGroup' },
                        { name: '组别', key: 'groupDisDetailName' }
                    ]
                },
                {
                    info: [
                        { name: '竞赛项目', key: 'projectName' },
                        { name: '竞赛形式', key: 'actorWay' },
                        { name: '团队成员', key: 'teamMembers' },
                        { name: '指导教师', key: 'instructor' },
                        { name: '当前赛程', key: 'phaseName' },
                        { name: '学科', key: 'subjectDisDetailName' }
                    ]
                }
            ],
            actorType: {
                1: '学生',
                2: '教师'
            },
            router: {
                path: '/contest/myPlay/myWorks/detail',
                query: this.$route.query
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
                path: '/contest/myPlay/myWorks',
                query: this.$route.query
            },
            ifPrasise: false,
            praiseNum: 0,
            msg: '',
            breadTxt: '我的作品'
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
    created() {
        this.getWorksDetail()
        this.loginName = JSON.parse(
            localStorage.getItem('loginInfo')
        ).userInfo.userName
        console.log(this.loginName)
    },
    mounted() {
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
        countBrowseNum({ id: this.$route.query.worksId }).then(() => {})
    },
    methods: {
        getWorksDetail() {
            requestWorksDetail({ id: this.$route.query.worksId }).then(res => {
                if (res.data.code === 200) {
                    this.worksDetail = res.data.entity
                    console.log(this.worksDetail.userName)
                    console.log('详情：', this.worksDetail)
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
        }
    }
}
</script>

<style lang="scss">
#works_detail {
    .el-breadcrumb {
        padding: 14px 0;
    }
    .comment-box {
        padding: 15px;
    }
}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
$border_c: #dfdfdf;
.c_blue {
    color: $theme-color;
}
.c_red {
    color: #d00;
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
            margin-bottom: 20px;
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
        // 预留字段信息
        .field-list {
            margin-bottom: 40px;
            .field-list-tit {
                font-size: 18px;
                margin-bottom: 15px;
            }
            .field-list-item {
                line-height: 2;
                font-size: 14px;
                margin-bottom: 5px;
                .field-list-item-tit {
                    margin-right: 10px;
                }
            }
        }
        // 作品详情
        .works-detail {
            margin: 30px 0 15px;
            .detail-content {
                line-height: 2em;
                font-size: 14px;
                text-indent: 2em;
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
