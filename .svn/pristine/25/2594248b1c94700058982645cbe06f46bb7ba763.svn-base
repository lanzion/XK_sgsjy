<template>
    <div id="infoBar" class="container info-bar-detail clearfix bgc_w">
        <v-tabs :tabs="tabs" :cur_tab="cur_tab" :more="more" @cur_tab="setCurTab"></v-tabs>
        <section class="info-bar-banner">
            <el-carousel height='334px' v-if="imgs.length > 0">
                <el-carousel-item v-for='(item, index) in imgs' :key="index" >
                    <router-link :to="{ path: details.path, query: {[details.query.infor]: item.id, id: $route.query.id}}">
                        <div class='banner-img' :style='{backgroundImage: "url(" + getFileUrl(item.pic) + ")"}'></div>
                        <p class="banner-title" v-text="item.title"></p>
                    </router-link>
                </el-carousel-item>
            </el-carousel>
            <div :style='{backgroundImage: "url(" + info + ")"}' v-else style="height:334px;background-position:center;"></div>
        </section>
        <ul class="info-list" v-if="cur_tab == '0'">
            <li class="info-list__item ellipsis" v-for="(item, index) in items" :key="item.id" :class="{ 'active': bannerActiveIndex == index }" @mouseover="setActiveBanner(index)">
                <router-link tag="h6" class="item-title" :to="{ path: details.path, query: {[details.query.infor]: item.id, id: $route.query.id}}" :title="item.title">{{ item.title }}</router-link>
                <p class="item-content">{{item.content | handleHtmlDesc}}</p>
            </li>
        </ul>
        <ul class="info-bar-list hover clearfix" v-else-if="cur_tab == '1'">
            <li v-for="(item, index) in items" :key="item.id" :class="{hover:index==tabs[cur_tab].curList}" class="notice-box" @mouseenter="setCurList(index)">
                <router-link :to="{ path: details.path, query: {[details.query.infor]: item.id, id: $route.query.id}}" class="item-detail clearfix" target="_blank">
                    <div class="calendar-block fl">
                        <span class="calender-day">{{item.publishDate | dateFormat('dd')}}</span>
                        <span class="calender-year">{{item.publishDate | dateFormat('yyyy-MM')}}</span>
                    </div>
                    <a class="item-title" :title="item.title" v-text="item.title"></a>
                    <p class="item-profile">{{item.content | handleHtmlDesc}}</p>
                </router-link>
            </li>
        </ul>
        <div class="no-data" v-else></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import tabs from 'Common/tabs.vue'
import { inforData } from '@/service/homePage.js'
import info from '@/assets/img/common/info.png'

export default {
    data() {
        return {
            imgs: [],
            items: [],
            tabs: [
                { name: '' },
                { name: '' }
            ],
            cur_tab: '0',
            is_always_req: false,
            more: {
                path: 'information',
                query: 'type'
            },
            details: {
                path: 'informationDetail/0',
                query: {
                    infor: 'inforId',
                    eduId: 'id'
                }
            },
            param: {
                pageSize: 6,
                pageNum: 1
            },
            info: info,
            bannerActiveIndex: 0
        }
    },
    components: {
        'v-tabs': tabs,
    },
    created() {
        this.getDictComb('noticeType').then((res) => {
            if (res.dicList) {
                this.tabs = res.dicList.map((i, k) => ({ name: i.name, type: k, curList: 0, isLoad: false, id: i.id }))
            }
            this.getList(this.cur_tab)
        })
        this.tabs.map((item, index) => { item.curList = index * this.param.pageSize })
    },
    methods: {
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        }),
        setCurTab(index) {
            this.cur_tab = index
            this.details.path = `informationDetail/${index}`
            this.getList(index)
        },
        setCurList(index) {
            this.tabs[this.cur_tab].curList = index
        },
        getList(_type) {
            if (!this.is_always_req) {
                inforData({ orgId: this.$route.query.id, noticeTypeId: this.tabs[_type].id, isMore: 1 }, this.param).then((res) => {
                    if (res.status === 200) {
                        this.imgs = res.data.appendInfo.imgUrl || []
                        this.items = res.data.entity.resultData || []
                    }
                })
            }
        },
        setActiveBanner(index) {
            this.bannerActiveIndex = index
        }
    },
    filters: {
        handleHtmlDesc(txt = '', len = 60, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    }
}
</script>
<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
/* .info-bar-banner .el-carousel__indicators {
    left: auto;
    right: 6px;
    bottom: 0;
    transform: translateX(0);
    .el-carousel__indicator {
        padding: 14px 3px;
        &.is-active .el-carousel__button {
            background-color: $default-color;
        }
        .el-carousel__button {
            width: 8px;
            height: 8px;
        }
    }
} */
#infoBar {
    #tabs {
        .tabs-btn-more {
            color: #999;
            &:hover {
                color: nth($default-color, 1);
            }
        }
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/tabs.scss';
$dot: 6px;
$calendar-width: 70px;
$calendar-height: 88px;
$content-box-padding: 10px;
.info-bar-detail {
    width: 100%;
    .tabs-bar-header {
        margin-bottom: 16px;
    }
    .info-bar-banner,
    .info-bar-list {
        position: relative;
        float: left;
        width: 50%;
        box-sizing: border-box;
        padding: 10px 16px;
        padding-top: 0;
    }

    .info-bar-banner {
        padding-right: $content-box-padding;

        .banner-img {
            height: 100%;
            background-position: center;
            background-size: cover;
        }

        .banner-title {
            position: absolute;
            width: 100%;
            bottom: 0;
            line-height: 3;
            text-indent: 10px;
            color: #fff;
            background: rgba(0, 0, 0, .3);
        }

    }
    .info-list {
        font-size: 14px;
        line-height: 2;
        list-style-type: disc;
        float: right;
        width: 48%;
        margin-right: 15px;
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
    .info-bar-list {
        padding-left: $content-box-padding;
        .notice-box {
            padding: 14px 0;
            border-bottom: 1px solid #eee;
            cursor: pointer;

            .calendar-block {
                position: relative;
                box-sizing: border-box;
                display: inline-block;
                height: 1.2em;
                margin-right: 1em;
                border-left: 6px solid nth($default-color, 1);
                text-align: center;
                .calender-day,
                .calender-year {
                    display: none;
                    width: 100%;
                    background-color: #fff;
                }
                .calender-day {
                    position: relative;
                    color: nth($default-color, 1);
                    font-size: 2em;
                    line-height: 1.5;
                    &:after {
                        position: absolute;
                        content: '';
                        left: 50%;
                        bottom: 0;
                        width: 80%;
                        transform: translate(-50%);
                        border-bottom: 1px solid #ddd;
                    }
                }
                .calender-year {
                    font-size: 0.85em;
                    color: #999;
                    line-height: 2.5;
                    border-radius: 5px;
                }
            }
            .item-title {
                display: block;
                font-size: 14px;
                line-height: 1;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .item-profile {
                display: none;
                line-height: 2;
            }
            &.hover,
            &:hover {
                border-style: dashed;
                .calendar-block {
                    width: $calendar-width;
                    height: auto;
                    border: 1px solid #ddd;
                    border-top: 12px solid nth($default-color, 1);
                    border-radius: 5px;
                    &::before {
                        position: absolute;
                        content: '';
                        width: $dot;
                        height: $dot;
                        border-radius: 50%;
                        background-color: #fff;
                        transform: translate(-50%, -50%);
                        top: -6px;
                        left: 50%;
                    }
                }

                .calender-day,
                .calender-year {
                    display: block;
                    width: 100%;
                }

                .item-title {
                    line-height: 2;
                    color: $theme-color;
                }

                .item-profile {
                    display: block;
                    color: #808080;
                }
            }
        }
    }
}
</style>
