<template>
    <div class="course-list">
        <div class="container listBox">
            <div class="screeningBox">
                <v-cascade :changeCascade="changeCascade" model="course"></v-cascade>
                <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
                <v-classificationDictionary model="courseGrade" :changeDataDic="changeLevel"></v-classificationDictionary>
            </div>
            <v-tabs :tabs="tabs" :cur_tab="selected.orderDesc" :is_search="isSearch" :count="count" @cur_tab="setCurTab" @searchVal="setKeyWords" :total="pageParam.totalNum" class="tabs"></v-tabs>
            <el-row :gutter="20" class="list is-el-layout" v-if="items.length">
                <el-col :span="6" class="list-item__box" v-for="(item, index) in items" :key="item.id">
                    <div class="bgc_w item" @click="redirect(pages.detail.course, { query: { id: item.id }})">
                        <div class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                        </div>
                        <div class="about">
                            <h6 class="list-item-title clearfix">
                                <span class="name fl ellipsis">{{item.name || '暂无课程名称'}}</span>
                                <span class="score fr">{{item.score || 0}}分</span>
                            </h6>
                            <p class="other-info clearfix">
                                <span class="free-or-not fl">{{handleIsFree(item.isFree)}}</span>
                                <span class="num fr">{{item.num || 0}}人学习</span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <v-pagination :param.sync="pageParam" :change-page="requestCourseList"></v-pagination>
        </div>
    </div>
</template>

<script>
    import { requestFrontendList } from '@/service/course.js'
    // import { mapState } from 'vuex'
    import classificationDictionary from 'components/common/screening/classificationDictionary.vue'
    import cascade from 'components/common/screening/cascade.vue'
    import tabs from 'Common/tabs.vue'
    import list from 'Common/list/graphic/list.vue'
    import pagination from 'components/common/pagination.vue'

    export default {
        name: 'course',

        data() {
            return {
                count: {
                    num: 0,
                    name: '课程'
                },
                isSearch: true,
                items: [],
                pageParam: {
                    pageNum: 1,
                    pageSize: 16,
                    totalNum: 0
                },
                selected: {
                    courseType: this.$store.state.edu.fieldSelected.idArr.join('-'), // 课程分类
                    grade: '', // 级别
                    name: '', // 课程名
                    orderDesc: '0', // 排序(1.按好评,2.热门)
                    orgId: this.$route.query.id || '', // 组织id（教育局id,学校id，教师id）
                    technologyId: '' // 技术id
                },
                tabs: [
                    { name: '全部课程', type: 0 },
                    { name: '好评', type: 1 },
                    { name: '热门', type: 2 }
                ]
            }
        },
        isSearch: true,
        items: [],

        created() {
            this.requestCourseList()
        },

        components: {
            'v-classificationDictionary': classificationDictionary,
            'v-cascade': cascade,
            'v-tabs': tabs,
            'v-list': list,
            'v-pagination': pagination
        },

        methods: {
            async requestCourseList() { // 获取课程列表
                const res = await requestFrontendList({
                    ...this.selected,
                    ...this.pageParam
                })
                if (res.status === 200) {
                    const _entity = res.data.entity
                    this.items = _entity && _entity.resultData || []
                    this.pageParam.totalNum = _entity && _entity.totalNum || 0
                }
            },
            changeCascade(data) { // 同步领域字段
                this.selected.courseType = data.map(item => item.id).join('-')
            },
            changeTechnology(data) { // 同步相关技术字段
                this.selected.technologyId = data.id
            },
            changeLevel(data) { // 同步级别字段
                this.selected.grade = data.id
            },
            handleIsFree(i) { // 处理费用类型
                const o = { 1: '免费', 0: '收费' }
                return o[i]
            },
            setCurTab(index) { // 同步排序字段
                this.selected.orderDesc = index
            },
            setKeyWords(val) { // 同步搜索字段
                this.selected.name = val
            }
        },
        watch: {
            selected: {
                handler() {
                    this.requestCourseList()
                },
                deep: true,
                // immediate: false
            },
        }
    }

</script>

<style lang='scss' scoped>
    @import '~@/assets/css/scss/item_list.scss';
    .item {
        border-radius: 5px;
        overflow: hidden;
    }
    .list-item-title {
        line-height: 2;
        font-size: 14px;
        .score {
            display: inline-block;
            font-size: 12px;
            color: #fd8c88;
        }
        .name {
            display: inline-block;
            max-width: 200px;
        }
    }

    .other-info {
        line-height: 1;
        font-size: 12px;
        .free-or-not {
            color: #2bbb61;
        }
    }

    .tabs {
        margin-top: 20px;
    }
</style>

