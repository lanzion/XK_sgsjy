<template>
    <div class="container listBox">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="screeningBox">
            <v-cascade class="category-box" :changeCascade="changeCascade" model="course"></v-cascade>
            <v-classificationDictionary model="technicalClassification" :changeDataDic="changeTechnology"></v-classificationDictionary>
            <v-classificationDictionary model="courseGrade" :changeDataDic="changeLevel"></v-classificationDictionary>
        </div>
        <v-tabs :tabs="tabs" :cur_tab="selected.orderDesc" :is_search="isSearch" :count="count" @cur_tab="setCurTab"
                        @searchVal="setKeyWords" :total="pageParam.totalNum" class="tabs"></v-tabs>
        <el-row class="list-group__main" :gutter="20" v-if="items.length">
            <el-col class="w-p-20" v-for="(item, index) in items" :key="item.id">
                <div class="list-group__item" @click="redirect(pages.detail.course, { query: { id: item.id }, target: '_blank' })">
                    <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover)})` }"></a>
                    <div class="info">
                        <h6 class="item-title c_333 ellipsis">{{ item.name }}</h6>
                        <div class="other-info clearfix">
                            <span class="price">{{handleIsFree(item.isFree)}}</span>
                            <span class="fr c_bbb">{{ item.num || 0 }}人学习</span>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="empty-block" v-else>暂无数据</div>
        <!-- <el-row :gutter="20" class="list" v-if="items.length">
            <el-col :span="6" class="list-item__box list-item__shadow" v-for="(item, index) in items" :key="item.id || index">
                <div class="list-item-img__box" @click="redirect(pages.detail.course, { query: { id: item.id }})">
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
            </el-col>
        </el-row> -->
        <v-pagination :param.sync="pageParam" @callback="changePage"></v-pagination>
    </div>
</template>

<script>
    import { requestCourseList } from '@/service/study.js'
    import { mapState } from 'vuex'
    import classificationDictionary from '@/components/common/screening/classificationDictionary.vue'
    import cascade from '@/components/common/screening/cascade.vue'
    import tabs from '@/components/common/tabs.vue'
    import list from '@/components/common/list.vue'
    import pagination from '@/components/common/pagination.vue'

    export default {
        name: 'course',

        data() {
            return {
                breadcrumb: [
                    { path: '/education', name: '活动培训' },
                    { path: '', name: '课程列表' }
                ],
                count: {
                    num: 0,
                    name: '课程',
                    color: 'lightBlue'
                },
                isSearch: true,
                items: [],
                pageParam: {
                    pageNum: 1,
                    pageSize: 20,
                    totalNum: 0
                },
                selected: {
                    // courseType: this.$store.state.edu.fieldSelected.idArr.join('-'), // 课程分类
                    courseType: '',
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
        computed: {
            ...mapState('edu', ['fieldSelected'])
        },

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
                const res = await requestCourseList({
                    ...this.selected,
                    ...this.pageParam
                })
                if (res.status === 200) {
                    const _entity = res.data.entity || {}
                    this.items = _entity.resultData || []
                    this.pageParam.totalNum = _entity.totalNum || 0
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
            },
            changePage(val) {
                this.$set(this.pageParam, 'pageNum', val)
                this.requestCourseList()
            }
        },
        watch: {
            selected: {
                handler() {
                    this.requestCourseList()
                },
                deep: true,
//                immediate: false
            },
            // pageParam: {
            //     handler() {
            //         this.requestCourseList()
            //     },
            //     deep: true,
            // },
        }
    }

</script>

<style lang='scss' scoped>
    @import '~@/assets/css/scss/item_list.scss';
    @import '~@/assets/css/scss/vars.scss';
    $box-radiu: 5px;
    $face-size: 24px;

/*     .list-item-title {
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
    } */
    .list-group__main {
        margin-top: 18px;
        .w-p-20 {
            width: 20%;
        }
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
                font-size: 14px;
                &:hover {
                    color: nth($default-color, 1);
                    cursor: pointer;
                }
            }
        }
        .pic {
            display: block;
            height: 124px;
        }
        .info {
            padding: 2px 15px;
            border-bottom: 1px solid #f5f5f5;
            box-sizing: border-box;
            line-height: 2;
            .price {
                color: #5fb41b;
            }
            .other-info {
                font-size: 12px;
            }
        }
    }
</style>

