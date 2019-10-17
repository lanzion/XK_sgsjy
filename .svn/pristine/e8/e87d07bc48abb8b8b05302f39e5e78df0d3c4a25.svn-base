<template>
    <div class="wrap">
        <v-banner :banners="banners" :height="400"></v-banner>
        <div class="container">
            <section class="list-group list-group__contest">
                <header class="list-group__header clearfix">
                    <h3 class="title fl">活动竞赛</h3>
                    <a class="more fr" @click="redirect(pages.list.contest, { type: 6 })">更多>></a>
                </header>
                <el-row class="list-group__main" :gutter="20" v-if="activity.length">
                    <el-col :span="12" v-for="(item, index) in activity" :key="item.id">
                        <div class="list-group__item">
                            <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover) || listDefault})` }" @click="redirect(pages.detail.contest, { query: { id: item.id, type: item.matchType }})"></a>
                            <div class="info">
                                <h6 class="item-title ellipsis" @click="redirect(pages.detail.contest, { query: { id: item.id, type: item.matchType }})">{{ item.title }}</h6>
                                <time class="time">活动时间：{{ item.matchStartDate | dateFormat('yyyy-MM-dd') }} —— {{ item.matchEndDate | dateFormat('yyyy-MM-dd') }}</time>
                                <span class="status" :class="[`status_${item.matchStatus}`]">{{item.matchStatus | translate(contestStatusDL)}}</span>
                            </div>
                            <div class="author-info clearfix">
                                <div class="face bg-img__wrap fl" :style="{ 'background-image': `url(${getFileUrl(item.face) || faceDefault})` }"></div>
                                <span>{{ item.createName }}</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="bgc_w no-data" v-else>暂无活动竞赛</div>
            </section>

            <!-- 资源 -->
            <section class="resource-train clearfix">
                <div class="section-left fl bgw">
                    <header class="section__header clearfix">
                        <h3 class="title fl">热门资源</h3>
                        <a @click="redirect(pages.list.resource, { type: 6 })" tag="a" class="more fr">更多>></a>
                    </header>
                    <ul class="res-list clearfix" v-if="resource.length">
                        <li class="res-list-item fl clearfix" v-for="(item, index) in resource" :key="index" @click="redirect(pages.detail.resource, { query: { id: item.id }})">
                            <div class="res-tit fl ellipsis" :title="item.name">
                                <i :class="{'icon-file-text2': item.fileType == 1, 'icon-file-video': item.fileType == 2, 'icon-file-music': item.fileType == 3, 'icon-file-picture': item.fileType == 4, 'icon-file-empty': item.fileType == 5}"></i>
                                {{item.name}}
                            </div>
                            <div class="browse-num fr ellipsis" :title="item.browseNum">
                                <i class="icon-i-browse"></i>
                                {{item.browseNum || 0}}
                            </div>
                        </li>
                    </ul>
                    <div class="bgw no-data" v-else>暂无资源</div>
                </div>
                <div class="section-right fr bgw">
                    <header class="section__header clearfix">
                        <h3 class="title fl">最新培训</h3>
                        <a @click="redirect(pages.list.actiTrain, { type: 6 })" class="more fr">更多>></a>
                    </header>
                    <ul class="train-list" v-if="train.length">
                        <li class="train-list-item clearfix" v-for="(item, index) in train" :key="index" @click="redirect(pages.detail.actiTrain, { query: { id: item.id }})">
                            <div class="date-box fl">
                                <p class="date day">{{item.startTime | dateFormat('dd')}}</p>
                                <p class="date year-month">{{item.startTime | dateFormat('yyyy.MM')}}</p>
                            </div>
                            <div class="info-box fl">
                                <h4 class="info-tit ellipsis" :title="item.theme">{{item.theme}}</h4>
                                <p class="info-content address">{{item.content | handleHtmlDesc(35)}}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="bgw no-data" v-else>暂无培训</div>
                </div>
            </section>

            <section class="list-group list-group__info">
                <header class="list-group__header clearfix">
                    <h3 class="title cursor-pointer fl" :class="{ active: noticeType === 38 }" @click="noticeType = 38">教育资讯</h3>
                    <h3 class="title cursor-pointer fl" :class="{ active: noticeType === 39 }" @click="noticeType = 39">通知公告</h3>
                    <router-link :to="{path: '/news/list'}" tag="a" class="more fr">更多>></router-link>
                </header>
                <div class="list-group__main">
                    <el-row v-if="infos.length">
                        <el-col :span="12">
                            <el-carousel height="400px" arrow="never" @change="changeBanner" :autoplay="false" ref="banner" class="banner-trigger__circle">
                                <el-carousel-item v-for="(item, index) in infoImgs" :key="item.id">
                                    <router-link tag="div" :to="{ name: 'newsDetail', params: { type: noticeType }, query: { id: item.id } }" class="bg-img__wrap banner" :style="{ 'background-image': `url(${getFileUrl(item.pic) || listDefault})` }"></router-link>
                                </el-carousel-item>
                            </el-carousel>
                        </el-col>
                        <el-col :span="12">
                            <div class="info-list__item">
                                <router-link tag="h6" class="item-title ellipsis" :to="{ name: 'newsDetail', params: { type: noticeType }, query: { id: infos[bannerActiveIndex].id } }" :title="infos[bannerActiveIndex].title">{{ infos[bannerActiveIndex].title }}</router-link>
                                <p class="info-date">{{infos[bannerActiveIndex].publishDate | dateFormat('yyyy.MM.dd')}}</p>
                                <p class="item-content">{{infos[bannerActiveIndex].content | handleHtmlDesc(300)}}</p>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="no-data" v-else>暂无资讯</div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
import { requestBanner, requestInfo } from '@/service/common.js'
import { requestContestList } from '@/service/activity.js'
import { requestResource } from '@/service/index.js'
import { requestActivityTrain } from '@/service/study.js'
import { mapState } from 'vuex'

export default {
    name: 'index',
    components: {
        'v-banner': banner,
    },
    data() {
        return {
            banners: [],
            activity: [],
            infos: [],
            bannerActiveIndex: 0,
            noticeType: 38,
            resource: [],
            train: [],
            infoImgs: []
        }
    },
    created() {
        this.getBanners()
        this.getEvent()
        this.getInfoList()
        this.getResource()
        this.getTrain()
    },
    watch: {
        noticeType: {
            handler: function () {
                this.getInfoList()
                this.bannerActiveIndex = 0
                const self = this
                window.setTimeout(function () {
                    self.$refs.banner.$children[0].$el.style.cssText = 'transform: translateX(0px) scale(1);'
                }, 500)
            },
            deep: true
        }
    },
    methods: {
        getBanners() {
            requestBanner({ bannerType: 1 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.appendInfo || {}
                    this.banners = _data.list || []
                }
            })
        },
        // 获取活动竞赛
        getEvent() {
            requestContestList({}, { pageSize: 4, pageNum: 1 }).then((res) => {
              console.log('活动江赛:::', res)
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.activity = _data.resultData || []
                }
            })
        },
        // 获取资源数据
        getResource() {
            requestResource({}, { pageSize: 24, pageNum: 1 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.resource = _data.resultData || []
                }
            })
        },
        // 获取培训数据
        getTrain() {
            requestActivityTrain({}, { pageSize: 5, pageNum: 1 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.train = _data.resultData || []
                }
            })
        },
        getInfoList() {
            requestInfo(Object.assign({ noticeTypeId: this.noticeType, orgId: 5 }, { pageSize: 6, pageNum: 1 })).then((res) => {
                if (res.status === 200) {
                    const _data = res.data.entity || {}
                    this.$set(this.$data, 'infos', _data.resultData)
                    this.$set(this.$data, 'infoImgs', res.data.appendInfo.imgUrl)
                }
            })
        },
        changeBanner(index) {
            this.bannerActiveIndex = index
        },
        handleFollow(followedUId, hasFollowed, item) { // 教师、学生空间，关注、取消关注
            this.handleFollowOrNot(followedUId, hasFollowed).then((res) => {
                if (res) {
                    item.isAttention = !hasFollowed
                }
            })
        },
    },
    computed: {
        ...mapState('dictionaryCommon', {
            contestStatusDL(state) {
                const dicList = (state.contestStatusDicList || {}).dicList || []
                return dicList
            },
        })
    },
    filters: {
        handleHtmlDesc(txt = '', len = 150, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$face-size: 24px;
$box-border: 1px solid #f5f5f5;

.cursor-pointer {
    cursor: pointer;
}

.wrap {
    padding-bottom: 100px;
}

.face {
    display: inline-block;
    width: $face-size;
    height: $face-size;
    margin-right: 10px;
    border-radius: 50%;
}

.list-group__link {
    margin-top: $box-margin;
}

.list-group {
    margin-top: 80px;

    .list-group__header {
        margin-bottom: $box-margin;
        border-bottom: 1px solid #dfdfdf;
        line-height: 30px;

        .title {
            font-size: 20px;
            padding: 0 10px 10px;
            margin-bottom: -1px;
            &.active {
                color: $theme-color;
                border-bottom: 1px solid $theme-color;
            }
        }
        .more {
            font-size: 16px;
            color: #999;
            &:hover {
                color: nth($default-color, 1);
            }
        }
    }

    .list-group__main {
        .list-group__item {
            margin-bottom: $box-item-margin;
            border-radius: $box-radiu;
            background-color: #fff;
            transition: box-shadow .2s;
            overflow: hidden;

            &:hover {
                box-shadow: $index-box-shadow;
            }

            .item-title {
                &:hover {
                    color: nth($default-color, 1);
                    cursor: pointer;
                }
            }
        }
        .pic {
            display: block;
        }
    }
}

// 资源-培训
.resource-train {
    margin-top: 80px;

    .section__header {
        // margin-bottom: $box-margin;
        border-bottom: 1px solid #dfdfdf;
        line-height: 30px;
        padding: 15px;

        .title {
            font-size: 20px;
        }
        .more {
            font-size: 16px;
            color: #999;
            &:hover {
                color: nth($default-color, 1);
            }
        }
    }

    .section-left {
        width: 738px;
        height: 578px;
        border-radius: 10px;
        .res-list {
            padding: 10px;
            .res-list-item {
                width: 50%;
                box-sizing: border-box;
                font-size: 16px;
                line-height: 1.5;
                padding: 10px;
                padding-right: 0;
                .res-tit {
                    width: 279px;
                    i {
                        vertical-align: middle;
                        color: nth($default-color, 1);
                    }
                    &:hover {
                        color: $theme-color;
                    }
                }
                .browse-num {
                    width: 69px;
                    color: #ccc;
                    i {
                        vertical-align: middle;
                        color: #ccc;
                        margin-right: 5px;
                    }
                }
            }
        }
    }

    .section-right {
        width: 440px;
        height: 578px;
        border-radius: 10px;
        .date-box {
            width: 84px;
            height: 78px;
            border: 1px solid $theme-color;
            border-radius: 10px;
            overflow: hidden;
            .date {
                width: 84px;
                height: 39px;
                line-height: 44px;
                text-align: center;
                font-size: 16px;
                color: $theme-color;
            }
            .year-month {
                color: #fff;
                background-color: $theme-color;
            }
        }
        .train-list {
            padding: 5px 0 15px;
            .train-list-item {
                padding: 8px 18px;
                .info-box {
                    width: 312px;
                    box-sizing: border-box;
                    padding-left: 12px;
                    .info-tit {
                        font-size: 18px;
                        margin-bottom: 10px;
                        color: #000;
                        line-height: 1.3;
                        &:hover {
                            color: $theme-color;
                        }
                    }
                    .info-content {
                        font-size: 16px;
                        color: #666;
                        line-height: 1.5;
                    }
                }
            }
        }
    }
}

.list-group__contest {
    .list-group__item {
        .pic {
            height: 300px;
        }
        .info {
            position: relative;
            padding: 1em;
            border-bottom: $box-border;
            box-sizing: border-box;
            .item-title {
                margin: 0 5em 10px 0;
                font-size: 18px;
                line-height: 2;
            }
            .time {
                font-size: 14px;
                color: #999;
            }
            .status {
                $h: 36px;
                position: absolute;
                display: inline-block;
                top: 20px;
                right: 0;
                height: $h;
                line-height: $h;
                padding-right: 20px;
                font-size: 14px;
                text-align: right;
                background-color: nth($default-color, 1);
                color: #fff;
                &:before {
                    content: '';
                    position: absolute;
                    transform: translateX(-100%);
                    border: 18px solid nth($default-color, 1);
                    border-width: 18px 10px;
                    border-left-color: transparent !important;
                }
                $status-data: (1: #ffba00, 2: nth($default-color, 1), 3: #999);
                @each $status-key, $status-value in $status-data {
                    &.status_#{$status-key} {
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


.list-group__info {
    .list-group__main {
        // padding: 15px;
        border-radius: $box-radiu;
        background-color: #fff;
        border-radius: 10px;
        .banner {
            height: 400px;
            cursor: pointer;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }

        .info-list__item {
            height: 400px;
            box-sizing: border-box;
            padding: 45px;
            background-color: #f4f4f4;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            .item-title {
                cursor: pointer;
                font-size: 20px;
                color: #000;
                margin-bottom: 10px;
                &:hover {
                    color: nth($default-color, 1);
                }
            }
            .info-date {
                font-size: 14px;
                color: #ccc;
                margin-bottom: 20px;
            }
            .item-content {
                font-size: 14px;
                line-height: 1.5;
                padding: .5em 0;
                color: #999;
                text-align: justify;
                white-space: normal;
                text-indent: 2em;
            }
            &:hover {
                // box-shadow: 2px 2px 15px 5px #ccc;
                .item-title {
                    color: nth($default-color, 1);
                }
            }
        }
    }
}
</style>
<style lang='scss'>
    .banner-trigger__circle {
        .el-carousel__button {
            $circle-size: 12px;
            width: $circle-size;
            height: $circle-size;
            border-radius: 50%;
        }
    }
</style>
