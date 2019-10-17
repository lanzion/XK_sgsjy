<template>
    <div class="container listBox activity-more">
        <div class="list-group list-group__activity">
            <el-row class="list-group__main" :gutter="20" v-if="listData.length">
                <el-col :span="6" v-for="(item, index) in listData" :key="item.id">
                    <div class="list-group__item" @click="redirect(pages.detail.activity, { query: { id: item.id }})">
                        <div class="pic-box">
                            <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover) || listDefault})` }">
                                <span class="pa status" :class="[`status_${handleActivityStatus(item.isApply)}`]">{{ handleActivityStatus(item.isApply) | translate(activityStatusDL)}}</span>
                            </a>
                        </div>
                        <div class="info">
                            <span class="item-type fr" v-show="item.activityTypeName.length">{{ item.activityTypeName.split('-')[0].trim() }}</span>
                            <h6 class="item-title ellipsis" v-html="filterKeyWords(item.title, keyWords)"></h6>
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
        </div>
        <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import pagination from '@/components/common/pagination.vue'

import { requestActivityList } from '@/service/activity.js'

export default {
    name: 'activityList',
    components: {
        'v-pagination': pagination,
    },
    data() {
        return {
            pageParam: {
                pageSize: 12,
                pageNum: 1,
                totalNum: 0
            },
            listData: [],
        }
    },
    created() {
        this.getActivityList()
    },
    watch: {
        keyWords: {
            handler: function () {
                this.getActivityList()
            },
            deep: true
        },
    },
    methods: {
        ...mapActions('globalSearch', ['setTotalNum']),
        changePage(val) {
            this.pageParam.pageNum = val
            this.getActivityList()
        },
        /*
         * 获取活动列表
         * title: 活动名称
         * activityType: 活动类型
         * partSort: 按参加人数排序
         * enrollStatus: 报名状态
         * status: 活动状态(0.未开始, 1.进行中, 2.已结束)
         * orgId: 组织id
         */
        getActivityList() {
            requestActivityList({ title: this.keyWords }, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    this.pageParam.totalNum = res.data.entity.totalNum
                    this.listData = res.data.entity.resultData
                    this.setTotalNum(res.data.entity.totalNum)
                }
            })
        },
        handleActivityStatus(status) {
            const source = {
                '-1': 0,
                6: 2,
            }

            return source[status] || 1
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            activityStatusDL(state) {
                const dicList = (state.activityStatusDicList || {}).dicList || []
                return dicList
            }
        }),
        ...mapState({
            keyWords: state => state.globalSearch.keyWords
        })
    },
}

</script>

<style lang="scss">
@import '~@/assets/css/scss/form.scss';
    .activity-more {
        .screeningBox {
            .el-input__inner {
                height: 34px;
            }
        }
    }
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/cascader.scss';
$box-radiu: 5px;
$face-size: 24px;
$font-light-color: #bbb;
$status-data: (0: #ffba00, 1: nth($default-color, 1), 2: #999);

.mr10 {
    margin-right: 10px;
}

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
    margin-top: $box-margin;
}

.list-group {
    margin-top: $box-margin;

    .list-group__header {
        $title-size: 30px;
        position: relative;
        margin-bottom: 36px;
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

.list-group__activity {
    margin-top: $box-margin;
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
                    // transform: translate(($h - $w) * 2 / 5, ($w - $h) / 10) rotate(-45deg);
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