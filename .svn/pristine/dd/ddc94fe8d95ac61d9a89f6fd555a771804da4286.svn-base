<template>
    <div class="model-school__home clearfix">
        <div class="content_l fl">
            <section class="achievement bgw section-group">
                <h4 class="section-group__title bgw">
                    <span class="section-group__title-txt">创客建设</span>
                    <router-link :to="{path: `${pages.detail.model.path}/achv`, query}" class="link-more fr">更多>></router-link>
                </h4>
                <div class="main p15" v-if="achievementList.length">
                    <ul>
                        <li v-for="(item, idx) in achievementList" :title="item.name" class="achievement-item clearfix">
                            <router-link :to="{path: `${pages.detail.model.path}/achv/detail`, query: {id: item.id, orgId: $route.query.id}}" :key="idx">
                                <span class="label fl">【{{item.type | translate(categoryList, {key: 'id'})}}】</span>
                                <span class="name ellipsis fl">{{item.name || '暂无成果名称'}}</span>
                                <span class="date fr">{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div v-else class="no-data"></div>
            </section>
            <section class="section-group feature bgw">
                <h4 class="section-group__title">
                    <span class="section-group__title-txt">创客特色</span>
                    <router-link :to="{path: `${pages.detail.model.path}/feature`, query}" class="link-more fr">更多>></router-link>
                </h4>
                <div class="section-group__main" v-if="featureList.length">
                    <transition-group class="list" v-if="featureList.length" name="list-item" tag="ul" mode="out-in">
                        <li class="list-item__box" :class="{'list-item__shadow': false}" :style="{width: getWidth(3) }" v-for="(item, index) in featureList" :key="item.id || index">
                            <router-link :to="{path: `${pages.detail.model.path}/feature/detail`, query: { id: item.id, orgId: $route.query.id }}">
                            <figure class="list-item-img__box">
                                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                            </figure>
                            <h6 class="list-item-title about clearfix">
                                <span :title="item.name" class="name ellipsis fl">{{item.name || '暂无名称'}}</span>
                                <span :title="item.createName" class="creator ellipsis fr">{{item.createName || '暂无'}}</span>
                            </h6>
                            </router-link>
                        </li>
                    </transition-group>
                </div>
                <div v-else class="no-data"></div>
            </section>
            <section class="section-group bgw">
                <h4 class="section-group__title">
                    <span class="section-group__title-txt">创客荣誉</span>
                    <router-link :to="{path:  `${pages.detail.model.path}/honor`, query}" class="link-more fr">更多>></router-link>
                </h4>
                <div class="section-group__main" v-if="honorList.length">
                    <el-carousel :interval="4000" type="card" height="200px" class="bgw">
                        <el-carousel-item v-for="(item, idx) in honorList" :key="idx">
                            <router-link :to="{path: `${pages.detail.model.path}/honor/detail`, query: { id: item.id, orgId: $route.query.id }}">
                                <div :style="{'background-image': 'url(' + getFileUrl(item.cover) + ')'}" :title="item.name" class="el-carousel-item-pic"></div>
                            </router-link>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div v-else class="no-data"></div>
            </section>
        </div>
        <div class="aside fr">
            <div class="section-group bgw">
                <h4 class="section-group__title">示范校简介</h4>
                <p class="aside-content" v-if="schoolDetail.introduction">{{schoolDetail.introduction}}</p>
                <p class="no-data" v-else></p>
            </div>
            <div class="section-group bgw event">
                <h4 class="section-group__title bgw">
                    <span class="">创客事件</span>
                    <router-link :to="{path: `${pages.detail.model.path}/event`, query}" class="link-more fr">更多>></router-link>
                </h4>
                <div class="aside-content">
                    <ul>
                        <li v-for="(item, idx) in eventList" :key="idx" :title="item.name" class="event-item clearfix">
                            <span class="name ellipsis fl">{{item.content || '暂无事件名称'}}</span>
                            <span class="date ellipsis fr">{{item.eventDate | dateFormat('yyyy-MM-dd')}}</span>
                        </li>
                        <li v-if="eventList.length === 0" class="no-data"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import infoBar from 'Common/list/graphic/infoBar.vue'
    import list from 'Common/list/graphic/list.vue'
    import tabs from 'Common/tabs.vue'
    import personList from 'Common/list/text/personList.vue'
    import {
        requestAchievementList,
        requestFeatureList,
        requestHonorList,
        requestEventList,
    } from '@/service/model_school.js'
    // import { requestSchoolScene } from '@/service/admin_base.js'

    export default {
        name: 'modelSchoolHome',

        data() {
            return {
                achievementList: [],
                eventList: [],
                featureList: [],
                honorList: [],
                listDataOfFeature: {
                    col: 3,
                    pathUrl: `${this.pages.detail.model.path}/feature/detail`,
                    params: {
                        names: 'id',
                        val: 'id'
                    }
                },
                query: this.$route.query
            }
        },
        props: {
            categoryList: Array,
            schoolDetail: {
                type: Object,
                default: () => {}
            }
        },
        created() {
            const { id } = this.query
            this.options = { pageSize: 6, pageNum: 1, schoolId: id }
            this.requestAchievementList()
            this.requestFeatureList()
            this.requestHonorList()
            this.requestEventList()
        },
        components: {
            'v-info-bar': infoBar,
            'v-tabs': tabs,
            'v-person-list': personList,
            'v-list': list
        },
        methods: {
            async requestAchievementList() {
                const res = await requestAchievementList(this.options)

                if (res.status === 200 && res.data.code === 200) {
                    const { resultData } = res.data.entity || {}
                    this.achievementList = resultData || []
                }
            },
            async requestFeatureList() {
                const res = await requestFeatureList(this.options)

                if (res.status === 200 && res.data.code === 200) {
                    const { resultData } = res.data.entity || {}
                    this.featureList = resultData || []
                }
            },
            async requestHonorList() {
                const res = await requestHonorList(this.options)

                if (res.status === 200 && res.data.code === 200) {
                    const { resultData } = res.data.entity || {}
                    this.honorList = resultData || []
                }
            },
            async requestEventList() {
                const res = await requestEventList({ ...this.options, pageSize: 8 })

                if (res.status === 200 && res.data.code === 200) {
                    const { resultData } = res.data.entity || {}
                    this.eventList = resultData || []
                }
            }
        }
    }
</script>

<style lang='scss'>
    .model-school__home {
        .el-carousel--card {
            padding: 20px 15px;
        }
        .el-carousel__container {
            overflow: hidden;
        }
        .el-carousel__item {
            width: 48%;
            background-color: #ddd;
            .el-carousel-item-pic {
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
        }
    }
</style>
<style lang='scss' scoped>
    @import "~@/assets/css/scss/item_list.scss";
    @import "~@/assets/css/scss/cols.scss";
    @import '~@/assets/css/scss/index_list.scss';
    .p15 {
        padding: 15px;
        box-sizing: border-box;
    }
    $theme-color: #2797ed;
    .model-school__home {
        .content_l {
            width: 75.5%;
        }
        .aside {
            width: 23%;
            .section-group__title {
                padding-left: 15px;
            }
            .aside-content {
                line-height: 1.3;
                padding: 15px;
                font-size: 12px;
                color: #626262;
                word-wrap: break-word;
                text-align: justify;
            }
            .no-data {
                height: 200px;
            }
        }
        .achievement {
            margin-bottom: 20px;
            .achievement-item {
                line-height: 34px;
                border-bottom: 1px dashed #ddd;
                cursor: pointer;
                font-size: 16px;
                &:hover {
                    .label, .name {
                        color: $theme-color;
                    }
                }
            }
            .name {
                max-width: 350px;
                margin-left: 12px;
            }
            .date {
                font-size: 14px;
                color: #999;
            }
            .more {
                margin-top: 12px;
                text-align: right;
                .link-more {
                    font-size: 12px;
                    color: $theme-color;
                }
            }
            .no-data {
                height: 200px;
            }
        }
        .section-group {
            .section-group__title {
                box-sizing: border-box;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                padding-right: 15px;
                border-bottom: 1px solid #cacaca;
            }
            .section-group__title-txt {
                display: inline-block;
                width: 94px;
                line-height: 36px;
                // border-bottom: 2px solid $theme-color;
                // color: $theme-color;
                text-align: center;
            }
            .link-more {
                color: #999;
                font-size: 14px;
                &:hover {
                    color: $theme-color;
                }
            }
            .about {
                padding-bottom: 4px;
            }
        }
        .section-group + .section-group {
            margin-top: 20px;
        }
        .feature {
            .name {
                max-width: 150px;
            }
            .creator{
                max-width: 100px;
            }
        }
        .event {
            .aside-content {
                line-height: 2;
                font-size: 14px;
                color: #3e3e3e;
            }
            .event-item + .event-item {
                margin-top: 12px;
            }
            /*.event-item:hover {
                .name {
                    color: $theme-color;
                }
            }*/
            .name {
                max-width: 160px;
            }
            .date {
                color: #999;
            }
        }
    }
</style>
