<template>
    <div class="container listBox">
        <section class="list-group list-group__works">
            <el-row :gutter="20" class="list-group__main" v-if="items.length">
                <el-col :span="6" v-for="(item, index) in items" :key="item.id || index">
                    <div class="list-group__item" @click="redirect(pages.detail.works, { query: { id: item.id }})">
                        <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.resourceId) || listDefault})` }"></a>
                        <div class="info">
                            <h6 class="item-title" v-html="filterKeyWords(item.workName, keyWords)"></h6>
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
            <div class="no-data" v-else>暂无作品数据</div>
            <v-pagination :param.sync='pageParam' @callback="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>
import { requestHot } from '@/service/work.js'
import list from '@/components/common/list.vue'
import pagination from '@/components/common/pagination.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'worksList',
    components: {
        'v-list': list,
        'v-pagination': pagination,
    },
    data() {
        return {
            items: [],
            pageParam: {
                pageNum: 1,
                pageSize: 16,
                totalNum: 0
            },
        }
    },
    methods: {
        ...mapActions('globalSearch', ['setTotalNum']),
        getData(param) {
            this.loading = true
            requestHot(param, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.items = _data.resultData || []
                    this.setTotalNum(_data.totalNum)
                    this.$set(this.pageParam, 'totalNum', _data.totalNum || 0)
                }
                this.loading = false
            })
        },
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            this.getData({ workName: this.keyWords })
        }
    },
    mounted() {
        this.getData({ workName: this.keyWords })
    },
    computed: {
        ...mapState({
            keyWords: state => state.globalSearch.keyWords
        })
        // keyWords: () => {
        //     return localStorage.getItem('keyWords')
        // }
    },
    watch: {
        keyWords: {
            handler: function (val) {
                this.getData({ workName: val })
            },
            deep: true
        }
    }
}

</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/list.scss';
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/vars.scss';
.screeningBox {
    border: none;
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
</style>
