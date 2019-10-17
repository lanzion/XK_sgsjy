<template>
    <div class="wrap">
        <v-banner :banners="banners" :height="400"></v-banner>
        <div class="container">
            <!-- <section class="list-group list-group__event">
                <header class="list-group__header clearfix">
                    <h3 class="title">创客竞赛</h3>
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
                <div class="no-data" v-else>暂无创客竞赛</div>
            </section> -->
            <section class="list-group list-group__activity">
                <header class="list-group__header clearfix">
                    <h3 class="title">交流活动</h3>
                    <a class="more" @click="redirect(pages.list.activity, { type: 6 })">更多>></a>
                </header>
                <el-row class="list-group__main" :gutter="20" v-if="activity.length">
                    <el-col :span="6" v-for="(item, index) in activity" :key="item.id">
                        <div class="list-group__item" @click="redirect(pages.detail.activity, { query: { id: item.id }})">
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
            </section>
        </div>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
import { requestBanner } from '@/service/common.js'
import { requestRecoContest, requestRecoActivity } from '@/service/activity.js'
import { mapState } from 'vuex'

export default {
    name: 'index',
    components: {
        'v-banner': banner
    },
    data() {
        return {
            banners: [],
            events: [],
            activity: [],
        }
    },
    created() {
        this.getBanners()
        this.getActivity()
        // this.getEvent()
    },
    methods: {
        getBanners() {
            requestBanner({ bannerType: 3 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.appendInfo || {}
                    this.banners = _data.list || []
                }
            })
        },
        getActivity() {
            requestRecoActivity({}, { pageSize: 8, pageNum: 1 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.activity = _data.resultData || []
                }
            })
        },
        getEvent() {
            requestRecoContest({}, { pageSize: 6, pageNum: 1 }).then((res) => {
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
    computed: {
        ...mapState('dictionaryCommon', {
            contestStatusDL(state) {
                const dicList = (state.contestStatusDicList || {}).dicList || []
                return dicList
            },
            activityStatusDL(state) {
                const dicList = (state.activityStatusDicList || {}).dicList || []
                return dicList
            }
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
$box-radiu: 5px;
$face-size: 24px;
$font-light-color: #bbb;
$status-data: (0: #ffba00, 1: nth($default-color, 1), 2: #999);
.wrap {
    width: 100%;
    padding-bottom: 100px;
}

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

.list-group__link {
    margin-top: 20px;
}

.list-group {
    margin-top: 57px;
    margin-bottom: -20px;
    .list-group__header {
        $title-size: 30px;
        position: relative;
        margin-bottom: 25px;
        line-height: $title-size;
        text-align: center;

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
    }

    .list-group__main {
        .list-group__item {
            margin-bottom: $box-margin;
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

.list-group__event {
    .list-group__item {
        .pic {
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

.list-group__activity {
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

</style>