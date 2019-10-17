<template>
    <div class="container listBox activity-more">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="screeningBox bgw">
            <v-cascade class="category-box" model="activity" :isAll='true' :changeCascade="changeActivityType"></v-cascade>
            <v-classificationDictionary model="activityStatus" :changeDataDic="changeStatus"></v-classificationDictionary>
            <v-classificationDictionary model="activityRegister" :changeDataDic="changeEnrollStatus"></v-classificationDictionary>
            <dl class="category-box category-input-box clearfix">
                <dd class="category-title"><span class="cate-tit">区域</span>:</dd>
                <dt class="category-list clearfix">
                    <xk-region-select class="fl select-region mr10" @region="changeRegion" :clearable="true"/>
                    <el-select v-model="params.schoolName" placeholder="请选择学校" filterable clearable class="fl select-school mr10" @change="setSearchSchool">
                        <el-option
                            v-for="item in schoolList"
                            :key="item.id"
                            :label="item.schoolName"
                            :value="item.schoolName">
                        </el-option>
                    </el-select>
                    <v-search class="fl" tips="请输入学校名称" @search="setSearchSchool"/>
                </dt>
            </dl>
        </div>
        <div class="list-group list-group__activity">
            <v-tabs :tabs="tabs" @searchVal="searchParam" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" :total="totalNum"></v-tabs>
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
        </div>
        <v-pagination :param="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
import cascade from '@/components/common/screening/cascade.vue'
import tabs from '@/components/common/tabs.vue'
import pagination from '@/components/common/pagination.vue'
// import region from '@/components/common/select/region_select.vue'
import search from '@/components/common/search.vue'

import { requestActivityList } from '@/service/activity.js'
import { requestSchoolList } from '@/service/common.js'

export default {
    name: 'activityList',
    components: {
        'v-classificationDictionary': classificationDictionary,
        'v-cascade': cascade,
        'v-tabs': tabs,
        'v-pagination': pagination,
        // 'v-region-select': region,
        'v-search': search,
    },
    data() {
        return {
            breadcrumb: [
                { path: '/street', name: '活动街区' },
                { path: '', name: '交流活动列表' }
            ],
            tabs: [
                { name: '全部活动', type: 0 },
                { name: '热门活动', type: 1 }
            ],
            cur_tab: 0,
            is_always_req: true,
            is_search: true,
            count: {
                name: '活动'
            },
            totalNum: 0,
            pageParam: {
                totalNum: 0,
                pageSize: 12,
                pageNum: 1
            },
            items: [],
            listData: [],
            params: {
                title: '',
                activityType: '',
                enrollStatus: '',
                status: '',
                schoolName: '',
                orgId: this.$route.query.id
            },
            nowTime: new Date().getTime(),
            userId: null,
            region: {
                province: null,
                city: null,
                area: null
            },
            schoolList: [], // 学校列表
        }
    },
    created() {
        const loginInfo = this.$ls.get('loginInfo')
        if (loginInfo) {
            this.$set(this.params, 'userId', loginInfo.userInfo.id)
        } else {
            this.getActivityList()
        }
    },
    watch: {
        params: {
            handler: function () {
                this.getActivityList()
            },
            deep: true
        },
        cur_tab: {
            handler: function (val) {
                if (val === '1') {
                    this.$set(this.params, 'partSort', 1)
                } else {
                    const _params = JSON.parse(JSON.stringify(this.params))
                    delete _params.partSort
                    this.params = _params
                }
            },
            deep: true
        }
    },
    methods: {
        async requestSchoolList() {
            const res = await requestSchoolList(this.region)

            if (res.status === 200 && res.data.code === 200) {
                this.schoolList = (res.data.appendInfo || {}).comboxList || []
            }
        },
        changeRegion([provinceId = null, cityId = null, areaId = null] = []) {
            this.region = { provinceId, cityId, areaId }
            this.params = { ...this.params, ...this.region }
            this.params.schoolName = ''

            // 重置省市区，清空学校列表
            if (!provinceId && !cityId && !areaId) {
                this.schoolList = []
                return false
            }

            this.requestSchoolList()
        },

        // 学校搜索框/下拉框改变
        setSearchSchool(name) {
            this.params.schoolName = name
        },
        searchParam(val) {
            this.$set(this.params, 'title', val)
        },
        changeActivityType(val) {
            const cascadeCode = Array.from(val, x => x.id)
            this.$set(this.params, 'activityType', cascadeCode.join('-'))
        },
        changeStatus(val) {
            this.$set(this.params, 'status', val.id)
        },
        changeEnrollStatus(val) {
            this.$set(this.params, 'enrollStatus', val.id)
        },
        changePage(val) {
            this.pageParam.pageNum = val
            this.getActivityList()
        },
        setCurTab(index) {
            this.cur_tab = index
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
            requestActivityList(this.params, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    this.pageParam.totalNum = res.data.entity.totalNum
                    this.totalNum = res.data.entity.totalNum
                    this.listData = res.data.entity.resultData
                }
            })
        },
        /*
         * 根据isApply判断活动状态
         * -1.未开始，6.活动已结束，其它.进行中
         */
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
            activityStatusDL(state) {
                const dicList = (state.activityStatusDicList || {}).dicList || []
                return dicList
            }
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