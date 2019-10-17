<template>
    <div class="container listBox contest">
        <section class="list-group list-group__contest">
            <el-row class="list-group__main" :gutter="20" v-if="listData.length">
                <el-col :span="12" v-for="(item, index) in listData" :key="item.id">
                    <div class="list-group__item" @click="redirect(pages.detail.contest, { query: { id: item.id }})">
                        <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover) || listDefault})` }"></a>
                        <div class="info">
                            <h6 class="item-title ellipsis" v-html="filterKeyWords(item.title, keyWords)"></h6>
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
            <div class="no-data" v-else>暂无数据</div>
            <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>
import pagination from '@/components/common/pagination.vue'
import { requestContestList } from '@/service/activity.js'
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            // 列表数据
            listData: [],
            // 分页
            pageParam: {
                totalNum: 0,
                pageSize: 6,
                pageNum: 1
            },
        }
    },
    components: {
        'v-pagination': pagination,
    },
    methods: {
        ...mapActions('globalSearch', ['setTotalNum']),
        // 列表数据
        getList() {
            requestContestList({ title: this.keyWords }, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    const entity = res.data.entity
                    this.listData = entity.resultData
                    this.setTotalNum(entity.totalNum)
                    this.$set(this.pageParam, 'totalNum', entity.totalNum)
                }
            })
        },
        // 翻页
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            this.getList()
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            contestStatusDL(state) {
                const dicList = (state.contestStatusDicList || {}).dicList || []
                return dicList
            }
        }),
        ...mapState({
            keyWords: state => state.globalSearch.keyWords
        })
    },
    watch: {
        keyWords: {
            handler: function () {
                this.getList()
            },
            deep: true
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/cascader.scss';
.contest {
    .search {
        padding: 8px;
        box-sizing: border-box;
        color: #999;
        .totalNum {
            height: 34px;
            line-height: 34px;
            margin-right: 10px;
            font-size: 14px;
            .highlight {
                color: nth($default-color, 1);
            }
        }
    }
}

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
    margin-top: $box-margin;

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
        margin-top: 18px;
        .list-group__item {
            margin-bottom: 20px;
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
                padding-right: 20px;
                top: 20px;
                right: 0;
                height: $h;
                line-height: $h;
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
</style>
