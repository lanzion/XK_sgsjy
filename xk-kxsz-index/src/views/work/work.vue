<template>
    <div class="wrap work">
        <v-banner :banners="banners" :height="400"></v-banner>
        <div class="container">
            <!-- 最新作品 -->
            <h1 class="work_title">——— 最新作品 ———<a class="more fr" @click="redirect(pages.list.works)">更多>></a></h1>

            <ul class="work_ul" v-if="newList.length">
                <li :span="6" class="work_lis bgw" v-for="(i, k) in newList" :key="k" @click="redirect(pages.detail.works, { query: { id: i.id }})">
                    <div class="work_lis_img" :style="{ 'background-image': `url(${i.resourceId})`}"></div>
                    <div class="work_lis_msg">
                        <h2 class="work_lis_msg_title" :title="i.workName">
                            {{ i.workName | handleHtmlDesc(15) }}
                        </h2>
                        <div class="work_lis_msg_school">
                            {{ i.schoolName }}
                        </div>
                        <div class="work_lis_msg_icon">
                            <i class="icon-i-browse"> {{ i.browseNum }} </i>
                            <i class="icon-i-collect"> {{ i.commentNum }} </i>
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
                </li>
            </ul>
            <div class="no-data" v-else></div>
            <!-- 热门推荐 -->
            <h1 class="work_title">——— 热门推荐 ———<a class="more fr" @click="redirect(pages.list.works)">更多>></a></h1>
            <ul class="work_ul" v-if="hotList.length">
                <li :span="6" class="work_lis bgw" v-for="(i, k) in hotList" :key="k" @click="redirect(pages.detail.works, { query: { id: i.id }})">
                    <div class="work_lis_img" :style="{ 'background-image': `url(${i.resourceId})`}"></div>
                    <div class="work_lis_msg">
                        <h2 class="work_lis_msg_title" :title="i.workName">
                            {{ i.workName | handleHtmlDesc(15) }}
                        </h2>
                        <div class="work_lis_msg_school">
                            {{ i.schoolName }}
                        </div>
                        <div class="work_lis_msg_icon">
                            <i class="icon-i-browse"> {{ i.browseNum }} </i>
                            <i class="icon-i-collect"> {{ i.commentNum }} </i>
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
                </li>
            </ul>
            <div class="no-data" v-else></div>
            <!-- 猜你喜欢 -->
            <h1 class="work_title">——— 猜你喜欢 ———<a class="more fr" @click="redirect(pages.list.works)">更多>></a></h1>

            <ul class="work_ul" v-if="likeList.length">
                <li class="work_lis bgw" v-for="(i, k) in likeList" :key="k" @click="redirect(pages.detail.works, { query: { id: i.id }})">
                    <div class="work_lis_img" :style="{ 'background-image': `url(${i.resourceId})`}"></div>
                    <div class="work_lis_msg">
                        <h2 class="work_lis_msg_title" :title="i.workName">
                            {{ i.workName | handleHtmlDesc(15) }}
                        </h2>
                        <div class="work_lis_msg_school">
                            {{ i.schoolName }}
                        </div>
                        <div class="work_lis_msg_icon">
                            <i class="icon-i-browse"> {{ i.browseNum }} </i>
                            <i class="icon-i-collect"> {{ i.commentNum }} </i>
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
                </li>
            </ul>
            <div class="no-data" v-else></div>
        </div>
    </div>
</template>

<script>
import banner from '@/components/common/banner.vue'
import { requestHot, requestBannerList } from '@/service/work.js'

export default {
    data() {
        return {
            banners: [],
            pageParam: {
                pageSize: 8,
                pageNum: 1
            },
            newList: [],
            hotList: [],
            likeList: [],
        }
    },
    components: {
        'v-banner': banner
    },
    methods: {
        getNewList() {
            requestHot({}, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    this.newList = res.data.entity.resultData
                }
            })
        },
        getHotList() {
            requestHot({ praiseCount: 1 }, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    this.hotList = res.data.entity.resultData
                }
            })
        },
        getLikeList() {
            requestHot({ collectionCount: 1 }, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    this.likeList = res.data.entity.resultData
                }
            })
        },
        getWorkBanner() {
            requestBannerList({ bannerType: '14' }).then((res) => {
                if (res.data.code === 200) {
                    this.banners = res.data.appendInfo.list
                }
            })
        }
    },
    mounted() {
        this.getNewList()
        this.getHotList()
        this.getLikeList()
        this.getWorkBanner()
    },
    filters: {
        handleHtmlDesc(txt = '', len = 150, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            let str = '暂无'
            if (txt) {
                str = txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
            }
            return str
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.work {
    margin-bottom: 90px;
    .container {
        .work_title {
            height: 125px;
            padding: 40px 20px;
            box-sizing: border-box;
            font-size: 30px;
            text-align: center;
            .more {
                line-height: 3;
                font-size: 14px;
                color: #848484;
                &:hover {
                    color: #0da8ff;
                }
            }
        }
        .work_ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .work_lis {
                width: 285px;
                height: 342px;
                overflow: hidden;
                margin-bottom: 20px;
                border-radius: 5px;
                transition: box-shadow .5s;
                cursor: pointer;
                .work_lis_img {
                    width: 285px;
                    height: 194px;
                    background-size: 100% 100%;
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
    }
}
</style>
