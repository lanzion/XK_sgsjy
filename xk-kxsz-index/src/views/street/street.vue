<template>
    <div class="wrap work">
        <v-banner :banners="banners" :height="400"></v-banner>
        <div class="container">
            <section class="list-group list-group__event">
                <header class="list-group__header clearfix">
                    <h3 class="title">活动竞赛</h3>
                    <a class="more" @click="redirect(pages.list.contest, { type: 6 })">更多>></a>
                </header>
                <el-row class="list-group__main" :gutter="20" v-if="events.length">
                    <el-col :span="12" v-for="(item, index) in events" :key="item.id">
                        <div class="list-group__item" @click="redirect(pages.detail.contest, { query: { id: item.id, type: item.matchType }})">
                            <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover) || listDefault})` }"></a>
                            <div class="info">
                                <span class="status fr" :class="[`status_${item.matchStatus}`]">{{item.matchStatus | translate(contestStatusDL)}}</span>
                                <h6 class="item-title ellipsis">{{ item.title }}</h6>
                                <time class="time">活动时间：{{ item.matchStartDate | dateFormat('yyyy-MM-dd') }} —— {{ item.matchEndDate | dateFormat('yyyy-MM-dd') }}</time>
                            </div>
                            <div class="author-info clearfix">
                                <div class="face bg-img__wrap fl" :style="{ 'background-image': `url(${getFileUrl(item.face) || faceDefault})` }"></div>
                                <span>{{ item.createName }}</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="no-data" v-else>暂无活动竞赛</div>
            </section>
            <!-- 热门活动 -->
            <header class="list-group__header clearfix">
                <h3 class="title">热门活动</h3>
                <a class="more" @click="redirect(pages.list.activity, { type: 6 })">更多>></a>
            </header>
            <el-row class="list-group__main" :gutter="20" v-if="activity.length">
                <el-col :span="6" v-for="(item, index) in activity" :key="item.id">
                    <div class="list-group__item bgw" @click="redirect(pages.detail.activity, { query: { id: item.id }})">
                        <div class="pic-box">
                            <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover) || listDefault})` }">
                                <span class="pa status" :class="[`status_${handleActivityStatus(item.isApply)}`]">{{ handleActivityStatus(item.isApply) | translate(activityStatusDL)}}</span>
                            </a>
                        </div>
                        <div class="info">
                            <span class="item-type fr" v-show="item.activityTypeName.length">{{ item.activityTypeName.split('-')[0].trim() }}</span>
                            <h6 class="item-title ellipsis">{{ item.title }}</h6>
                            <p class="org">{{ item.schoolName || '&nbsp;'}}</p>
                            <div class="statis">
                                <i class="icon icon-i-browse">{{ item.browseNum}}</i>
                                <i class="icon icon-i-collect">{{ item.collectionCount }}</i>
                                <i class="icon icon-i-like">{{ item.praiseCount }}</i>
                            </div>
                        </div>
                        <div class="author-info clearfix">
                            <div class="face bg-img__wrap fl" :style="{ 'background-image': `url(${getFileUrl(item.face) || faceDefault})` }"></div>
                            <span>{{ item.createName }}</span>
                            <time class="time fr"><i class="icon icon-i-time">{{ item.startDate | dateTimeStamp('yyyy-MM-dd') }}</i></time>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="no-data" v-else>暂无交流活动</div>

            <!-- 最新作品 -->
            <header class="list-group__header clearfix">
                <h3 class="title">最新作品</h3>
                <a class="more" @click="redirect(pages.list.works, { type: 6 })">更多>></a>
            </header>
            <el-row class="list-group__main" :gutter="20" v-if="hotList.length">
                <el-col :span="6" v-for="(i, k) in hotList" :key="i.id">
                    <div class="list-group__item bgw"  @click="redirect(pages.detail.works, { query: { id: i.id }})">
                        <div class="work_lis_img bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(i.resourceId) || listDefault})`}"></div>
                        <div class="work_lis_msg">
                            <h2 class="work_lis_msg_title" :title="i.workName">
                                {{ i.workName | handleHtmlDesc(15) }}
                            </h2>
                            <div class="work_lis_msg_school">
                                {{ i.schoolName }}
                            </div>
                            <div class="work_lis_msg_icon">
                                <i class="icon-i-browse"> {{ i.browseNum }} </i>
                                <i class="icon-i-collect"> {{ i.collectionCount }} </i>
                                <i class="icon-i-like"> {{ i.praiseCount }} </i>
                            </div>
                            <div class="work_lis_msg_release clearfix">
                                <div class="fl work_lis_msg_release_face" :style="{ 'background-image': `url(${i.face || faceDefault})`}"></div>
                                <div class="fl work_lis_msg_release_author">{{ i.userName }}</div>
                                <div class="fr work_lis_msg_release_time">
                                    {{ i.createDate | dateTimeStamp }}
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="no-data" v-else>暂无最新作品</div>

            <!-- 热门故事 -->
            <header class="list-group__header clearfix">
                <h3 class="title">热门故事</h3>
                <a class="more" @click="redirect(pages.list.story, { type: 6 })">更多>></a>
            </header>
            <div id="list" :class="{'has-no-data': !storyList.length}">
                <transition-group class="list" v-if="storyList.length" name="list-item" tag="ul" mode="out-in">
                    <li class="list-item__box" :style="{width: listWidth}" v-for="(item, index) in storyList"
                                 :key="item.id || index" @click="redirect(pages.detail.story, { query: { id: item.id }})">
                        <div class="list-item__shadow">
                            <figure class="list-item-img__box">
                                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                            </figure>
                            <div class="about bgw">
                                <h6 class="list-item-title ellipsis">{{item.name || '暂无名称'}}</h6>
                                <p class="desc">{{item.content || '暂无描述内容' | handleStoryDesc(32)}}</p>
                            </div>
                        </div>
                    </li>
                </transition-group>
                <div v-else class="empty-block">暂无数据</div>
            </div>

            <!-- 需求 -->
            <header class="list-group__header clearfix">
                <h3 class="title">需求</h3>
                <a class="more" @click="redirect(pages.list.demand, { type: 6 })">更多>></a>
            </header>
            <div class="list-group section-group__content">
                <div class="section-group__item-container clearfix">
                  <div class="cover fl">
                    <figure class="figure">
                        <img src="~@/assets/img/street/lagou_requirement.jpg" class="section-group__item-pic" alt="" width="285"
                           height="480">
                    </figure>
                  </div>
                  <ul class="section-group__item-content fl" v-if="requirementList.length">
                    <li v-for="(item, i) in requirementList" class="section-group__item clearfix">
                      <figure class="pic fl">
                        <div class="bg-img__wrap img" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                      </figure>
                      <div class="section-group__item-main fl">
                        <h5 class="name ellipsis">
                          <a class="link light-red" href="javascript:;">{{item.name || '暂无名称'}}</a>
                        </h5>
                        <p class="info">
                          <span class="info-item">类别：{{item.category | translate(demandCategory, {key: 'id'})}}</span>
                          <span class="info-item">拉钩：<em class="light-red">{{item.seduceNum || 0}}</em>人</span>
                          <br>
                          <span class="info-item">发布人：{{item.createName || item.userName || '暂无'}}</span>
                          <span class="info-item">发布时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                        </p>
                      </div>
                      <div class="operate fr">
                        <a @click="redirect(pages.detail.demand, { query: { id: item.id }})" class="btn-detail">详情</a>
                      </div>
                    </li>
                  </ul>
                  <div class="empty-block section-group__item-content fl" v-else>暂无需求</div>
                </div>
            </div>

            <!-- 服务 -->
            <header class="list-group__header clearfix">
                <h3 class="title">服务</h3>
                <a class="more" @click="redirect(pages.list.service, { type: 6 })">更多>></a>
            </header>
            <div class="list-group section-group__content">
                <div class="section-group__item-container clearfix">
                  <div class="cover fl">
                    <figure class="figure">
                      <img src="~@/assets/img/street/lagou_service.jpg" class="section-group__item-pic" alt="" width="285"
                           height="480">
                    </figure>
                  </div>
                  <ul class="section-group__item-content fl" v-if="serviceList.length">
                    <li v-for="(item, i) in serviceList" class="section-group__item clearfix">
                      <figure class="pic fl">
                        <div class="bg-img__wrap img" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                      </figure>
                      <div class="section-group__item-main fl">
                        <h5 class="name ellipsis">
                          <a class="link light-red" href="javascript:;">{{item.name || '暂无名称'}}</a>
                        </h5>
                        <p class="info">
                          <span class="info-item">类别：{{item.category | translate(serviceCategory, {key: 'id'})}}</span>
                          <span class="info-item">拉钩：<em class="light-red">{{item.seduceNum || 0}}</em>人</span>
                          <br>
                          <span class="info-item">发布人：{{item.createName || '暂无'}}</span>
                          <span class="info-item">发布时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                        </p>
                      </div>
                      <div class="operate fr">
                        <a @click="redirect(pages.detail.service, { query: { id: item.id }})" class="btn-detail">详情</a>
                      </div>
                    </li>
                  </ul>
                  <div class="empty-block section-group__item-content fl" v-else>暂无服务</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
import { requestHot, requestBannerList, requestRecoWorks, requestLikeWorks } from '@/service/work.js'
import { requestFrontendStoryList } from '@/service/story.js'
import { requestFrontendRequirementList } from '@/service/requirement.js'
import { serviceAuditList } from '@/service/service.js'
import { requestActivityList, requestContestList } from '@/service/activity.js'
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            banners: [],
            pageParam: {
                pageSize: 8,
                pageNum: 1
            },
            hotList: [],
            storyList: [],
            requirementList: [],
            serviceList: [],
            activity: [],
            events: []
        }
    },
    components: {
        'v-banner': banner,
    },
    computed: {
        ...mapState('dictionaryCommon', {
            serviceCategory: state => (state.serveCategoryDicList || {}).dicList || [],
            demandCategory: state => (state.demandCategoryDicList || {}).dicList || [],
            activityStatusDL(state) {
                const dicList = (state.activityStatusDicList || {}).dicList || []
                return dicList
            },
            contestStatusDL(state) {
                const dicList = (state.contestStatusDicList || {}).dicList || []
                return dicList
            },
        }),
        listWidth: function () {
            return this.getWidth(4)
        }
    },
    methods: {
        ...mapActions('dictionaryCommon', ['getDictComb']),
        getHotList() {
            requestHot({}, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    this.hotList = res.data.entity.resultData
                }
            })
        },
        getWorkBanner() {
            requestBannerList({ bannerType: 2 }).then((res) => {
                if (res.data.code === 200) {
                    this.banners = res.data.appendInfo.list
                }
            })
        },
        // 获取热门故事列表
        async requestStoryList() {
            const res = await requestFrontendStoryList({ ...this.pageParam })

            if (res.status === 200 && res.data.code === 200) {
                this.storyList = (res.data.entity || {}).resultData || []
            }
        },
        // 需求列表
        async requestRequirementList() {
            const res = await requestFrontendRequirementList({ pageSize: 4, pageNum: 1 })

            if (res.status === 200 && res.data.code === 200) {
                this.requirementList = (res.data.entity || {}).resultData || []
            }
        },

        // 服务列表
        async requestServiceList() {
            const res = await serviceAuditList({ auditStatus: 1 }, { pageSize: 4, pageNum: 1 })

            if (res.status === 200 && res.data.code === 200) {
                this.serviceList = (res.data.entity || {}).resultData || []
            }
        },
        // 活动
        getActivity() {
            requestActivityList({}, { pageSize: 8, pageNum: 1 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.activity = _data.resultData || []
                }
            })
        },
        // 活动竞赛
        getEvent() {
            requestContestList({}, { pageSize: 4, pageNum: 1 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.events = _data.resultData || []
                }
            })
        },
        handleActivityStatus(status) {
            const source = {
                '-1': '0',
                6: '2',
            }

            return source[status] || 1
        }
    },
    mounted() {
        this.getHotList()
        this.getWorkBanner()
        this.requestStoryList()
        this.getDictComb('serveCategory')
        this.getDictComb('demandCategory')
        this.requestRequirementList()
        this.requestServiceList()
        this.getActivity()
        this.getEvent()
    },
    filters: {
        handleHtmlDesc(txt = '', len = 150, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            let str = '暂无'
            if (txt) {
                str = txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
            }
            return str
        },
        // 处理故事描述字段，字段包括HTML标签内容
        handleStoryDesc(txt = '', len = 50, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/lagou_list.scss';
@import '~@/assets/css/scss/index_list.scss';

$box-radiu: 5px;
$face-size: 24px;
$font-light-color: #bbb;
$status-data: (0: #ffba00, 1: nth($default-color, 1), 2: #999);

.face {
    display: inline-block;
    width: $face-size;
    height: $face-size;
    margin-right: 10px;
    border-radius: 50%;
}

.icon {
    &:before {
        margin-right: 5px;
        vertical-align: middle;
    }
    & + .icon {
        margin-left: 10px;
    }
}

.list-item-title {
    color: #333;
}
.work {
    margin-bottom: 90px;
    .container {
        .list-group__header {
            $title-size: 30px;
            position: relative;
            margin-bottom: 25px;
            line-height: $title-size;
            text-align: center;
            margin-top: 60px;
            .title {
                position: relative;
                display: inline-block;
                font-size: $title-size;

                &:before,
                &:after {
                    content: '';
                    position: absolute;
                    width: 50px;
                    border-top: 2px solid #8a8a8a;
                }
                &:before {
                    left: 0;
                    transform: translate(-120%, $title-size / 2);
                }
                &:after {
                    right: 0;
                    transform: translate(120%, $title-size / 2);
                }
            }
            .more {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 14px;
                color: #999;

                &:hover {
                    color: nth($default-color, 1);
                }
            }
            .icon {
                margin-right: 4px;
            }
        }
        .list-group__main {
            margin-bottom: -20px;

            .pic {
                display: block;
            }
            .list-group__item {
                height: 342px;
                overflow: hidden;
                margin-bottom: 20px;
                border-radius: 5px;
                transition: box-shadow .5s;
                cursor: pointer;
                .work_lis_img {
                    width: 285px;
                    height: 194px;
                }
                .work_lis_msg {
                    height: 100px;
                    .work_lis_msg_title {
                        padding: 15px 15px 5px;
                        box-sizing: border-box;
                        font-size: 14px;
                    }
                    .work_lis_msg_school {
                        padding: 5px 15px 20px;
                        box-sizing: border-box;
                        color: #bbb;
                        font-size: 12px;
                    }
                    .work_lis_msg_icon {
                        display: table;
                        padding: 0px 15px 20px;
                        box-sizing: border-box;
                        color: #bbb;
                        i {
                            display: table-cell;
                            padding: 0 5px;
                        }
                    }
                    .work_lis_msg_release {
                        padding: 0 15px 15px;
                        box-sizing: border-box;
                        border-top: 1px solid #eee;
                        .work_lis_msg_release_face {
                            display: inline-block;
                            width: 25px;
                            height: 25px;
                            margin-top: 8px;
                            border-radius: 50%;
                            background-size: cover;
                        }
                        .work_lis_msg_release_time {
                            line-height: 40px;
                            color: #bbb;
                        }
                        .work_lis_msg_release_author {
                            line-height: 40px;
                            margin-left: 10px;
                        }
                    }
                }
                &:hover {
                    box-shadow: $index-box-shadow;
                    .work_lis_msg_title {
                        color: #0da8ff;
                    }
                }
            }
        }

        .list-group__item {
            .pic-box {
                position: relative;
                padding: 1em 1em 0;
                .pic {
                    position: relative;
                    height: 172px;
                    border-radius: $box-radiu;
                    overflow: hidden;
                    .status {
                        $w: 80px;
                        $h: 20px;
                        display: inline-block;
                        width: $w;
                        height: $h;
                        line-height: $h;
                        transform: translate3D(($h - $w) * 2 / 5, ($w - $h) / 10, 0) rotate(-45deg);
                        font-size: 12px;
                        color: #fff;
                        text-align: center;
                        background-color: nth($default-color, 1);
                        @each $status-key, $status-value in $status-data {
                            &.status_#{$status-key} {
                                background-color: $status-value;
                            }
                        }
                    }
                }
            }
            .info {
                $title-fs: 14px;
                $title-lh: 2;
                height: 100px;
                padding: 1em;
                border-bottom: 1px solid #f5f5f5;
                box-sizing: border-box;
                .item-title {
                    font-size: $title-fs;
                    line-height: $title-lh;
                }
                .item-type {
                    $fs: 12px;
                    display: inline-block;
                    height: $title-fs;
                    padding: 0 .5em;
                    margin-top: ($title-fs * ($title-lh - 1)) / 2;
                    border-radius: $title-fs;
                    font-size: $fs;
                    line-height: $title-fs;
                    color: #fff;
                    background-color: #fa8074;
                }
                .org {
                    color: $font-light-color;
                }
                .statis {
                    color: $font-light-color;
                    line-height: 4;
                }
            }
            .author-info {
                padding: 1em;
                box-sizing: border-box;
                line-height: $face-size;
                .time {
                    color: $font-light-color;
                }
            }
        }
    }
}

.list-item__shadow {
    border-radius: 5px;
    overflow: hidden;
    &:hover {
        box-shadow: 0 3px 5px #D9D9D9;
    }
}
.list-item__box {
    .bg-img__wrap {
        height: 172px;
    }
    .about {
        height: 100px;
        .list-item-title {
            font-size: 14px;
            color: #333;
            padding: 12px;
        }
        .desc {
            font-size: 14px;
            color: #999;
            line-height: 1.5;
            padding: 0 12px 20px;
        }
    }
}

// 活动竞赛
.list-group__event {
    .list-group__item {
        height: auto !important;
        background-color: #fff;
        .pic {
            width: 100%;
            height: 300px;
        }
        .info {
            $title-fs: 18px;
            $title-lh: 2;
            position: relative;
            padding: 1em;
            border-bottom: 1px solid #f5f5f5;
            box-sizing: border-box;
            font-size: 14px;
            .item-title {
                margin-bottom: 10px;
                font-size: $title-fs;
                line-height: $title-lh;
            }
            .time {
                color: #999;
            }
            .status {
                $h: $title-fs * $title-lh;
                $status-padding: 20px;
                display: inline-block;
                height: $h;
                line-height: $h;
                padding-right: $status-padding;
                margin: #{($h - $title-fs) / 2} -1em 0 1em;
                text-align: right;
                background-color: nth($default-color, 1);
                color: #fff;
                &:before {
                    content: '';
                    position: absolute;
                    transform: translateX(-100%);
                    border: $title-fs solid nth($default-color, 1);
                    border-width: $title-fs #{$status-padding / 2};
                    border-left-color: transparent !important;
                }
                @each $status-key, $status-value in $status-data {
                    &.status_#{$status-key + 1} {
                        background-color: $status-value;
                        &:before {
                            border-color: $status-value;
                        }
                    }
                }
            }
        }
        .author-info {
            padding: 1em;
            box-sizing: border-box;
            line-height: $face-size;
        }
    }
}
</style>
