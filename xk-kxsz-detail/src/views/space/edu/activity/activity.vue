<template>
    <div id="edu_activity">
        <div class="container listBox">
            <div class="screeningBox bgw mb20">
                 <v-cascade :model="'activity'" :isAll='true' :changeCascade="changeActivityType"></v-cascade>
                <v-classificationDictionary :model="'activeState'" :changeDataDic="changeStatus"></v-classificationDictionary>
                <v-classificationDictionary :model="'activityRegister'" :changeDataDic="changeEnrollStatus"></v-classificationDictionary>
                <dl v-if="$route.path.startsWith('/street')" class="category-box category-input-box clearfix">
                    <dd class="category-title">区域:</dd>
                    <dt class="category-list clearfix">
                        <xk-region-select class="fl select-region" @region="changeRegion" :clearable="true"/>
                        <el-select v-model="params.schoolName" placeholder="请选择学校" filterable clearable class="fl select-school" @change="setSearchSchool">
                            <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.schoolName"></el-option>
                        </el-select>
                        <v-search class="fl" tips="请输入学校名称" @search="setSearchSchool"/>
                    </dt>
                </dl>
            </div>
            <div class="activity-list bgw">
                <v-tabs :tabs="tabs" @searchVal="searchParam" :cur_tab="cur_tab" :is_search="is_search" :count="count" @cur_tab="setCurTab" :total="totalNum"></v-tabs>
                <v-list :listData="listData"></v-list>
            </div>
            <v-pagination :param="param" @callback="changePage"></v-pagination>
        </div>
    </div>
</template>

<script>
import classificationDictionary from 'Common/screening/classificationDictionary.vue'
import cascade from 'Common/screening/cascade.vue'
import tabs from 'Common/tabs.vue'
import pagination from 'Common/pagination.vue'
import list from 'components/activity/activity_list.vue'
// import region from '@/components/common/select/region_select.vue'
import search from '@/components/common/search.vue'
import { requestActivityFrontendList } from '@/service/activity.js'
import { requestSchoolList } from '@/service/common.js'

export default {
    name: 'eduActivity',
    components: {
        'v-classificationDictionary': classificationDictionary,
        'v-cascade': cascade,
        'v-tabs': tabs,
        'v-pagination': pagination,
        'v-list': list,
        // 'v-region-select': region,
        'v-search': search,
    },
    data() {
        return {
            param: {
                totalNum: 0,
                pageSize: 8,
                pageNum: 1
            },
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
                pageSize: 8,
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
            link: this.pages.detail.activity.path
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
         * status: 活动状态(0.未开始 1.进行中,2.已结束)
         * orgId: 组织id
         */
        getActivityList() {
            requestActivityFrontendList(this.params, this.pageParam).then((res) => {
                if (res.data.code === 200) {
                    const _data = res.data.entity || {}
                    this.param.totalNum = _data.totalNum
                    this.totalNum = _data.totalNum
                    this.listData = _data.resultData
                }
            })
        }
    }
}

</script>

<style lang='scss' scoped>
.mb20{
    margin-bottom: 20px
}
.activity-list{
    // padding-top: 10px;
}
</style>

<style lang="scss">
    #edu_activity{
        .tabs-bar-header{
            .tabs-right{
                right: 15px;
            }
        }
        // #cascade{
        //     border-bottom: 1px solid #eee;
        //     .category-box{
        //         margin-bottom: 10px;
        //     }
        // }
        // #classificationDictionary{
        //     padding-bottom: 10px;
        //     margin: 10px 0 0 0;
        // }
    }
</style>