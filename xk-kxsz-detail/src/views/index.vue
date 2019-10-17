<template>
    <div class="wrap">
        <v-banner :banners="banners" :height="500"></v-banner>
        <div class="container">
            <el-row class="list-group__link" :gutter="7">
                <el-col :span="24/indexLink.length" v-for="(item, index) in indexLink" :key="index">
                    <router-link :to="item.router"><img :src="item.pic" alt="" width="100%"></router-link>
                </el-col>
            </el-row>
            <section class="list-group list-group__works">
                <header class="list-group__header clearfix">
                    <h3 class="title fl">优秀作品</h3>
                    <a class="more fr" @click="redirect(pages.list.works)">更多>></a>
                </header>
                <el-row class="list-group__main" :gutter="20" v-if="works.length">
                    <el-col :span="6" v-for="(item, index) in works" :key="item.id">
                        <div class="list-group__item">
                            <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.resourceId) || listDefault})` }" @click="redirect(pages.detail.works, { query: { id: item.id }})"></a>
                            <div class="info">
                                <h6 class="item-title" @click="redirect(pages.detail.works, { query: { id: item.id }})">{{ item.workName }}</h6>
                                <p class="org">{{ item.schoolName || item.schoolId }}</p>
                                <div class="statis">
                                    <i class="icon icon-i-browse">{{ item.browseNum}}</i>
                                    <i class="icon icon-i-collect">{{ item.collectionCount }}</i>
                                    <i class="icon icon-i-like">{{ item.praiseCount }}</i>
                                </div>
                            </div>
                            <div class="author-info clearfix">
                                <div class="face bg-img__wrap fl" :style="{ 'background-image': `url(${getFileUrl(item.face) || faceDefault})` }"></div>
                                <span>{{ item.userName }}</span>
                                <time class="time fr">{{ item.createDate | dateTimeStamp('yyyy-MM-dd') }}</time>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="no-data" v-else>暂无优秀作品</div>
            </section>
            <section class="list-group list-group__contest">
                <header class="list-group__header clearfix">
                    <h3 class="title fl">热门竞赛</h3>
                    <a class="more fr" @click="redirect(pages.list.contest)">更多>></a>
                </header>
                <el-row class="list-group__main" :gutter="20" v-if="activity.length">
                    <el-col :span="12" v-for="(item, index) in activity" :key="item.id">
                        <div class="list-group__item">
                            <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover) || listDefault})` }" @click="redirect(pages.detail.contest, { query: { id: item.id }})"></a>
                            <div class="info">
                                <h6 class="item-title ellipsis" @click="redirect(pages.detail.contest, { query: { id: item.id }})">{{ item.title }}</h6>
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
                <div class="no-data" v-else>暂无热门竞赛</div>
            </section>
            <section class="list-group list-group__course">
                <header class="list-group__header clearfix">
                    <h3 class="title fl">热门课程</h3>
                    <a class="more fr" @click="redirect(pages.list.course)">更多>></a>
                </header>
                <el-row class="list-group__main" :gutter="20" v-if="course.length">
                    <el-col class="w-p-20" v-for="(item, index) in course" :key="item.id">
                        <div class="list-group__item">
                            <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover) || listDefault})` }" @click="redirect(pages.detail.course, { query: { id: item.id }})"></a>
                            <div class="info">
                                <h6 class="item-title ellipsis" @click="redirect(pages.detail.course, { query: { id: item.id }})">{{ item.name }}</h6>
                                <div class="other-info clearfix">
                                    <span class="price">免费</span>
                                    <span class="fr">{{ item.num }}人学习</span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="no-data" v-else>暂无热门课程</div>
            </section>
            <section class="list-group list-group__space">
                <header class="list-group__header clearfix">
                    <h3 class="title fl">创客</h3>
                    <ul class="tab-group fl">
                        <li class="tab-group__item" v-for="(item, index) in spaceNav" :key="index" :class="{active: spaceNavActiveIndex == index}" @click="spaceNavActiveIndex = index">{{ item.name }}</li>
                    </ul>
                    <a class="more fr" @click="redirect(pages.list[spaceNav[spaceNavActiveIndex].model])">更多>></a>
                </header>
                <el-row class="list-group__main" :gutter="20" v-if="space[spaceNav[spaceNavActiveIndex].model].length">
                    <el-col :span="8" v-for="(item, index) in space[spaceNav[spaceNavActiveIndex].model]" :key="item.id">
                        <div class="list-group__item">
                            <div class="author-info table-layout">
                                <figure class="face-box table-cell">
                                    <a class="face bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover) || faceDefault})` }" @click="redirect(pages.detail[spaceNav[spaceNavActiveIndex].model], { query: { id: item.orgId, uid: item.id } })"></a>
                                </figure>
                                <div class="base table-cell">
                                    <h6 class="item-title" @click="redirect(pages.detail[spaceNav[spaceNavActiveIndex].model], { query: { id: item.orgId, uid: item.id } })">{{ item.teacherName || item.studentName }}（{{spaceNav[spaceNavActiveIndex].name}}）</h6>
                                    <time class="item-belong">{{ item.schoolName }}</time>
                                </div>
                            </div>
                            <p class="sign table-cell">{{ (item.sign || '这家伙很懒，什么都没留下') | handleHtmlDesc(60)}}</p>
                            <ul class="statis clearfix">
                                <li class="statis-item" v-for="(statis, index) in spaceNav[spaceNavActiveIndex].statis">
                                    <p class="count">{{ item.counts[statis.param] || 0 }}</p>
                                    <p class="txt">{{ statis.name }}</p>
                                </li>
                            </ul>
                            <div class="btn-group">
                                <button class="i-form-button is-plain" type="button" @click.stop="handleFollow(item.userId, !!item.isAttention, item)">{{ !item.isAttention ? '关注' : '已关注' }}</button>
                                <button class="i-form-button" type="button" @click.stop="showPrivateLetterDialog(item.userId)">私信</button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="no-data" v-else>暂无{{ spaceNav[spaceNavActiveIndex].name }}空间</div>
            </section>
            <section class="list-group list-group__info">
                <header class="list-group__header clearfix">
                    <h3 class="title fl">资讯中心</h3>
                    <router-link :to="{path: '/news/list'}" tag="a" class="more fr">更多>></router-link>
                </header>
                <div class="list-group__main">
                    <el-row :gutter="20" v-if="infos.length">
                        <el-col :span="12">
                            <el-carousel height="318px" arrow="never" @change="changeBanner" :autoplay="false" ref="banner" class="banner-trigger__circle">
                                <el-carousel-item v-for="(item, index) in infos" :key="item.id">
                                    <router-link tag="div" :to="{ name: 'newsDetail', params: { type: noticeType }, query: { id: item.id } }" class="bg-img__wrap banner" :style="{ 'background-image': `url(${getFileUrl(item.pic) || listDefault})` }"></router-link>
                                </el-carousel-item>
                            </el-carousel>
                        </el-col>
                        <el-col :span="12">
                            <ul class="info-list">
                                <li class="info-list__item ellipsis" v-for="(item, index) in infos" :key="item.id" :class="{ 'active': bannerActiveIndex == index }" @mouseover="setActiveBanner(index)">
                                    <router-link tag="h6" class="item-title" :to="{ name: 'newsDetail', params: { type: noticeType }, query: { id: item.id } }" :title="item.title">{{ item.title }}</router-link>
                                    <p class="item-content">{{item.content | handleHtmlDesc}}</p>
                                </li>
                            </ul>
                        </el-col>
                    </el-row>
                <div class="no-data" v-else>暂无资讯</div>
                </div>
            </section>
        </div>
        <send-private-letter v-if="dialog.isVisible" :dialog="dialog"></send-private-letter>
    </div>
</template>

<script>
import picEducate from 'Asset/img/index/index_educate.png'
import picActivity from 'Asset/img/index/index_activity.png'
import picWorks from 'Asset/img/index/index_works.png'
import picSpace from 'Asset/img/index/index_space.png'
import banner from '@/components/common/banner.vue'
import sendPrivateLetter from '@/components/common/send_private_letter_dialog.vue'
import { requestBanner, requestInfo } from '@/service/common.js'
import { requestWorksList, requestEventList, requestCourseList } from '@/service/index.js'
import { requestTeacher, requestStudent } from '@/service/space.js'
import { follow, privateLetter } from '@/mixin/teacherAndStudent.js'
import { mapState } from 'vuex'

export default {
    name: 'index',
    mixins: [follow, privateLetter],
    components: {
        'v-banner': banner,
        sendPrivateLetter
    },
    data() {
        return {
            banners: [],
            indexLink: [
                {
                    pic: picEducate,
                    router: {
                        path: '/education'
                    }
                }, {
                    pic: picActivity,
                    router: {
                        path: '/activity'
                    }
                }, {
                    pic: picWorks,
                    router: {
                        path: '/work'
                    }
                }, {
                    pic: picSpace,
                    router: {
                        path: '/space'
                    }
                }
            ],
            spaceNavActiveIndex: 0,
            spaceNav: [
                {
                    name: '教师',
                    model: 'teacher',
                    handle: requestTeacher,
                    statis: [
                        { name: '作品', param: 'productionNum' },
                        { name: '课程', param: 'coursesNum' },
                        { name: '文章', param: 'articleNum' },
                        { name: '话题', param: 'topicNum' },
                        { name: '粉丝', param: 'fansNum' }
                    ]
                }, {
                    name: '学生',
                    model: 'student',
                    handle: requestStudent,
                    statis: [
                        { name: '作品', param: 'productionNum' },
                        { name: '文章', param: 'articleNum' },
                        { name: '话题', param: 'topicNum' },
                        { name: '粉丝', param: 'fansNum' }
                    ]
                },
            ],
            space: {
                student: [],
                teacher: []
            },
            works: [],
            activity: [],
            course: [],
            infos: [],
            bannerActiveIndex: 0,
            noticeType: 38,
            dialog: {
                addresseeId: '', // 私信收信人
                isVisible: false
            },
        }
    },
    created() {
        this.getBanners()
        this.getWorks()
        this.getEvent()
        this.getCourse()
        this.getInfoList()
        this.spaceNav.forEach((x) => {
            this.getSpace(x)
        })
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
        getWorks() {
            requestWorksList({ pageSize: 8, pageNum: 1 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.works = _data.resultData || []
                }
            })
        },
        getEvent() {
            requestEventList({ pageSize: 4, pageNum: 1 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.activity = _data.resultData || []
                }
            })
        },
        getSpace(item) {
            item.handle({ composite: 0 }, { pageNum: 1, pageSize: 6 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.space[item.model] = _data.resultData || []
                }
            })
        },
        getCourse() {
            requestCourseList({ pageSize: 10, pageNum: 1 }).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.course = _data.resultData || []
                }
            })
        },
        getInfoList() {
            requestInfo(Object.assign({ noticeTypeId: this.noticeType, orgId: this.$route.query.id }, { pageSize: 6, pageNum: 1 })).then((res) => {
                if (res.status === 200) {
                    const _data = res.data.entity || {}
                    this.infos = _data.resultData || []
                }
            })
        },
        changeBanner(index) {
            this.bannerActiveIndex = index
        },
        setActiveBanner(index) {
            this.bannerActiveIndex = index
            this.$refs.banner.setActiveItem(index)
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
    margin-top: 32px;

    .list-group__header {
        margin-bottom: $box-margin;
        border-bottom: 1px solid #dfdfdf;
        line-height: 40px;

        .title {
            font-size: 24px;
        }
        .more {
            font-size: 14px;
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

.list-group__works {
    .list-group__item {
        .pic {
            height: 196px;
        }
        .info {
            height: 100px;
            padding: 1em;
            border-bottom: $box-border;
            box-sizing: border-box;
            .item-title {
                font-size: 14px;
                line-height: 2;
            }
            .org,
            .statis {
                color: #bbb;
            }
            .statis {
                line-height: 4;
                .icon {
                    &:before {
                        margin-right: 5px;
                        vertical-align: middle;
                    }
                    & + .icon {
                        margin-left: 10px;
                    }
                }
            }
        }
        .author-info {
            padding: 1em;
            box-sizing: border-box;
            line-height: $face-size;
            .time {
                color: #bbb;
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

.list-group__course {
    .w-p-20 {
        width: 20%;
    }
    .list-group__item {
        .pic {
            height: 124px;
        }
        .info {
            padding: 0 1em;
            border-bottom: $box-border;
            box-sizing: border-box;
            line-height: 2;
            .item-title {
                font-size: 14px;
            }
            .price {
                color: #5fb41b;
            }
            .other-info {
                font-size: 12px;
                color: #999;
            }
        }
    }
}

.list-group__space {
    .list-group__header {
        .tab-group {
            $c: #999;
            margin-left: 30px;
            font-size: 14px;
            color: $c;

            .tab-group__item {
                display: inline-block;
                cursor: pointer;

                &.active {
                    color: nth($default-color, 1);
                }

                & + .tab-group__item {
                    &:before {
                        content: '/';
                        padding: 0 1em;
                        color: $c;
                        cursor: default;
                    }
                }
            }
        }
    }
    .list-group__item {
        $fs: 14px;
        $lh: 1.5;
        padding: 1em;
        font-size: 14px;
        line-height: $lh;
        .author-info {
            .face-box {
                $size: 75px;
                width: $size;
                height: $size;
                padding: 0 1em;

                .face {
                    width: $size;
                    height: $size;
                }
            }
            .item-title {
                font-size: 18px;
            }
            .item-belong {
                color: #bbb;
            }
        }
        .sign {
            width: 100%;
            height: $fs * $lh * 2;
        }
        .statis {
            margin: 1em 0 2em;
            line-height: 1;
            text-align: center;

            .statis-item {
                display: inline-block;
                width: 5em;

                .txt {
                    margin-top: 1em;
                    font-size: 12px;
                    color: #bbb;
                }

                & + .statis-item {
                    border-left: 1px solid #ddd;
                }
            }
        }
        .btn-group {
            margin: 1em 0 .5em;
            text-align: center;
            .i-form-button {
                $button-heigth: 34px;
                width: 90px;
                height: $button-heigth;
                line-height: $button-heigth - 2;
                border: 1px solid #dfdfdf;
                border-radius: $box-radiu;
                color: #666;
                background-color: #fff;

                &:hover {
                    border-color: nth($default-color, 1);
                    color: nth($default-color, 1);
                }

                &.is-plain {
                    border-color: nth($default-color, 1);
                    background-color: nth($default-color, 1);
                    color: #fff;

                    &:hover {
                        background-color: nth($default-color, 2);
                    }
                }

                & + .i-form-button {
                    margin-left: 30px;
                }
            }
        }
    }
}

.list-group__info {
    .list-group__main {
        padding: 15px;
        border-radius: $box-radiu;
        background-color: #fff;
        .banner {
            height: 318px;
            cursor: pointer;
        }
        .info-list {
            font-size: 14px;
            line-height: 2;
            list-style-type: disc;

            .info-list__item {
                list-style: inside disc;

                .item-title {
                    display: inline;
                    cursor: pointer;
                }
                .item-content {
                    display: none;
                    padding: .5em 0;
                    color: #999;
                    text-align: justify;
                    white-space: normal;
                }

                &.active {
                    $mar: .5em;
                    padding: 0 1em;
                    margin: $mar 0;
                    border-radius: 8px;
                    background-color: #f4f4f4;
                    list-style-type: none;

                    &:first-child {
                        margin: 0 0 #{$mar * 2};
                    }
                    &:last-child {
                        margin: #{$mar * 2} 0 0;
                    }

                    .item-title {
                        font-size: 20px;
                        &:hover {
                            color: nth($default-color, 1);
                        }
                    }
                    .item-content {
                        display: block;
                    }
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