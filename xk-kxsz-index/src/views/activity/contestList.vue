<template>
    <div class="container listBox contest">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <section class="screeningBox optionBox">
            <v-classificationDictionary model="contestLevel" :changeDataDic="changeMatchGrade"></v-classificationDictionary>
            <div class="category-box clearfix">
                <div class="category-title">竞赛区域：</div>
                <xk-region-select class="fl" @region="changeRegion" :clearable="true"></xk-region-select>
            </div>
            <v-classificationDictionary model="contestStatus" :changeDataDic="changeMatchStatus"></v-classificationDictionary>
            <v-classificationDictionary model="signupStatus" :changeDataDic="changeEnrollStatus"></v-classificationDictionary>
        </section>
        <section class="list-group list-group__contest">
            <div class="tabs-bar-header clearfix search bgc_w">
                <v-search class="fr" @search="changeSearch"></v-search>
                <p class="totalNum fr">共计<span class="highlight">{{ pageParam.totalNum ? pageParam.totalNum : 0 }}</span>个竞赛</p>
            </div>
            <el-row class="list-group__main" :gutter="20" v-if="listData.length">
                <el-col :span="12" v-for="(item, index) in listData" :key="item.id">
                    <div class="list-group__item" @click="redirect(pages.detail.contest, { query: { id: item.id, type: item.matchType }})">
                        <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover) || listDefault})` }"></a>
                        <div class="info">
                            <h6 class="item-title ellipsis">{{ item.title }}</h6>
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
            <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
        </section>
    </div>
</template>

<script>
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
// import region from '@/components/common/select/region_select.vue'
import search from '@/components/common/search.vue'
import pagination from '@/components/common/pagination.vue'
import { requestContestList } from '@/service/activity.js'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            breadcrumb: [
                { path: '/activity', name: '评审活动' },
                { path: '', name: '评审活动列表' }
            ],
            // 地址
            region: {
                provinceId: null,
                cityId: null,
                areaId: null
            },
            // 搜索条件
            options: {
                title: '',
                matchGrade: null,
                matchStatus: null,
                enrollStatus: null
            },
            count: {
                name: '竞赛',
                color: 'lightBlue'
            },
            // 列表数据
            listData: [],
            // 分页
            pageParam: {
                totalNum: 0,
                pageSize: 6,
                pageNum: 1
            },
            // 搜索
            search: '',
            nowTime: new Date().getTime()
        }
    },
    components: {
        'v-classificationDictionary': classificationDictionary,
        // 'v-region-select': region,
        'v-search': search,
        'v-pagination': pagination,
    },
    methods: {
        // 列表数据
        getList() {
            requestContestList(this.param, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    const entity = res.data.entity
                    this.listData = entity.resultData
                    this.$set(this.pageParam, 'totalNum', entity.totalNum)
                }
            })
        },
        // 设置级别
        changeMatchGrade(item) {
            this.$set(this.options, 'matchGrade', item.id)
        },
        // 设置竞赛状态
        changeMatchStatus(item) {
            this.$set(this.options, 'matchStatus', Number(item.id))
        },
        // 设置报名状态
        changeEnrollStatus(item) {
            this.$set(this.options, 'enrollStatus', Number(item.id))
        },
        // 设置搜索
        changeSearch(item) {
            this.$set(this.options, 'title', item)
        },
        // 设置地址
        changeRegion(items) {
            const _region = {}
            const [provinceId, cityId, areaId] = items
            _region.provinceId = provinceId || null
            _region.cityId = cityId || null
            _region.areaId = areaId || null
            this.$set(this.$data, 'region', _region)
        },
        // 翻页
        changePage(val) {
            this.$set(this.pageParam, 'pageNum', val)
            this.getList()
        }
    },
    computed: {
        param: function () {
            return Object.assign({}, this.options, this.region)
        },
        ...mapState('dictionaryCommon', {
            contestLevelOptions(state) {
                const dicList = (state.contestLevelDicList || {}).dicList || []
                return dicList
            },
            signupStatusOptions(state) {
                const dicList = (state.signupStatusDicList || {}).dicList || []
                return dicList
            },
            contestStatusDL(state) {
                const dicList = (state.contestStatusDicList || {}).dicList || []
                return dicList
            },
        })
    },
    watch: {
        param: {
            handler: function () {
                this.getList()
            },
            deep: true
        }
    },
    mounted() {
        this.getList()
    },
    filters: {
        handleWorksDesc(txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
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
