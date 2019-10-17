<template>
    <div class="info-bar-detail clearfix">
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
            <div :style='{backgroundImage: "url(" + info + ")"}' v-else style="height:334px;"></div>
        </section>
        <ul class="info-bar-list clearfix">
            <li v-for="(item, index) in items" :key="item.id" :class="{hover:index==tabs[cur_tab].curList}" class="notice-box" @mouseenter="setCurList(index)">
                <router-link :to="{ path: details.path, query: {[details.query.infor]: item.id, id: $route.query.id}}" class="item-detail clearfix">
                    <div class="calendar-block fl">
                        <span class="calender-day">{{item.publishDate | dateFormat('dd')}}</span>
                        <span class="calender-year">{{item.publishDate | dateFormat('yyyy-MM')}}</span>
                    </div>
                    <a class="item-title" :title="item.title" v-text="item.title"></a>
                    <p class="item-profile">{{item.content | handleWorksDesc}}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import tabs from '@/components/common/tabs.vue'
import { requestInfo } from '@/service/common.js'
import info from 'Asset/img/common/info.png'

export default {
    data() {
        return {
            imgs: [],
            items: [],
            tabs: [
                { name: '教育资讯', type: 38, curList: 0 },
                { name: '通知公告', type: 39, curList: 0 }
            ],
            cur_tab: 0,
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
            page: {
                pageSize: 6,
                pageNum: 1
            },
            info: info
        }
    },
    components: {
        'v-tabs': tabs,
    },
    created() {
        this.getList(this.cur_tab)
    },
    methods: {
        ...mapActions({
            getDictComb: 'dictionaryCommon/getDictComb'
        }),
        setCurTab: function (index) {
            this.cur_tab = index - 0
            this.details.path = `informationDetail/${index}`
            this.getList(index)
        },
        setCurList: function (index) {
            this.tabs[this.cur_tab].curList = index
        },
        getList: function (_type) {
            requestInfo(Object.assign({ noticeTypeId: this.tabs[_type].type, isMore: 0, orgId: 5 }, this.page)).then((res) => {
                if (res.status === 200) {
                    this.imgs = res.data.appendInfo.imgUrl || []
                    this.items = res.data.entity.resultData || []
                }
            })
        }
    },
    filters: {
        handleWorksDesc(txt = '', len = 50, sep = '...') {
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    }
}
</script>
<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
.info-bar-banner .el-carousel__indicators {
    left: auto;
    right: 6px;
    bottom: 0;
    transform: translateX(0);

    .el-carousel__indicator {
        padding: 14px 3px;

        &.is-active .el-carousel__button {
            background-color: nth($default-color, 1);
        }
        .el-carousel__button {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }
    }
}
#infoBar {
    .tabs-btn-more {
        color: #D00;
        /* margin-right: 16px; */
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/tabs.scss';
$calendar-size: 80px;
$content-box-padding: 10px;
.info-bar-detail {
    width: 100%;
    .info-bar-banner,
    .info-bar-list {
        position: relative;
        float: left;
        width: 50%;
        box-sizing: border-box;
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

    .info-bar-list {
        padding-left: $content-box-padding;

        .notice-box {
            padding: 14px 0;
            border-bottom: 1px solid #eee;
            cursor: pointer;

            .calendar-block {
                float: left;
                display: inline-block;
                width: 6px;
                height: 16px;
                border: 1px solid;
                margin-right: 10px;
                background-color: #2779de;
                color: nth($default-color, 1);
                text-align: center;
                box-sizing: border-box;
                overflow: hidden;

                .calender-day,
                .calender-year {
                    display: none;
                    height: 50%;
                    line-height: $calendar-size / 2 - 1;
                }

                .calender-day {
                    font-size: 20px;
                    background-color: #fff;
                }

                .calender-year {
                    font-size: 16px;
                    background-color: nth($default-color, 1);
                    color: #fff;
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
                    width: $calendar-size;
                    height: $calendar-size;
                }

                .calender-day,
                .calender-year {
                    display: block;
                    width: 100%;
                }

                .item-title {
                    line-height: 2;
                    color: nth($default-color, 1);
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
