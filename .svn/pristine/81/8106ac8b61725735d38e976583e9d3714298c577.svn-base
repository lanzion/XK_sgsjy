<template>
    <div id="homePage" class="container org-homepage clearfix">
        <v-info-bar></v-info-bar>
        <div class="content_l">
            <section class="homepage-model">
                <h2 class="homepage-model-title">推荐学校</h2>
                <el-row class="list is-el-layout" v-if="listData.school.length">
                    <el-col :span="8" v-for="(item, index) in listData.school" :key="item.schoolId">
                        <section class="list-item__box list-item__shadow" @click="redirect(pages.detail.school, { query: { id: item.schoolId }})">
                            <div class="list-item-img__box">
                                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                            </div>
                            <h6 class="list-item-title" v-text="item.schoolName ? item.schoolName:''"></h6>
                            <ul class="cols-list list-item-count">
                                <li class="cols-item">收藏: {{ item.resouceNum ? item.resouceNum : 0 }}</li>
                                <li class="cols-item">课程: {{ item.coursesNum ? item.coursesNum : 0 }}</li>
                                <li class="cols-item">项目: {{ item.projectsNum ? item.projectsNum : 0 }}</li>
                                <li class="cols-item">作品: {{ item.productionNum ? item.productionNum : 0 }}</li>
                            </ul>
                        </section>
                    </el-col>
                </el-row>
                <div v-else class="empty-block">暂无数据</div>
            </section>
            <section class="homepage-model">
                <h2 class="homepage-model-title">优秀作品</h2>
                <el-row class="list is-el-layout" v-if="listData.work.length">
                    <el-col :span="8" v-for="(item, index) in listData.work" :key="item.workId">
                        <section class="list-item__box list-item__shadow" @click="redirect(pages.detail.works, { query: { id: item.workId }})">
                            <div class="list-item-img__box">
                                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.resourceId) || listDefault})` }"></div>
                            </div>
                            <h6 class="list-item-title" v-text="item.workName ? item.workName : ''"></h6>
                            <ul class="workslist-item-count">
                                <li class="count-item"><i class="icon-btn-collection"></i> {{ item.collectNum ? item.collectNum : 0 }}</li>
                                <li class="count-item"><i class="icon-i-reply"></i> {{ item.commentNum ? item.commentNum : 0 }}</li>
                                <li class="count-item"><i class="icon-i-browse"></i> {{ item.browseNum ? item.browseNum : 0 }}</li>
                            </ul>
                        </section>
                    </el-col>
                </el-row>
                <div v-else class="empty-block">暂无数据</div>
            </section>
        </div>
        <div class="content_r">
            <div class="homepage-model">
                <v-tabs :tabs="recommend_person_type.tabs" :cur_tab="recommend_person_type.cur_tab" @cur_tab="setRPCurTab"></v-tabs>
                <v-person-list :datas="listData[sideBarModel]" :pathUrl="sideBarUrl" :handleRequest="handleRequestFollow"></v-person-list>
            </div>
            <div class="homepage-model">
                <h3 class="homepage-model-title">教育局统计</h3>
                <ul class="statistical_ul">
                    <li class="statistical_li" v-for="(value, key) in counts" :key="key">
                        <i :class="['icon-s-statis-' + key]">
                            <span v-for="i in 6" :class="['path' + i]"></span>
                        </i>
                        <p>{{value}} : {{ listData.statis[`${key}Num`] || 0 }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import infoBar from 'Common/list/graphic/infoBar.vue'
import list from 'Common/list/graphic/list.vue'
import tabs from 'Common/tabs.vue'
import personList from 'Common/list/text/personList.vue'
import * as requeryHomePage from '@/service/homePage.js'

export default {
    name: 'homePage',
    data() {
        return {
            sideBarModel: 'student',
            sideBarUrl: {},
            listData: {
                school: [],
                work: [],
                teacher: [],
                student: [],
                statis: {}
            },
            recommend_person_type: {
                tabs: [
                    { name: '优秀学生', type: 7 },
                    { name: '优秀教师', type: 8 }
                ],
                cur_tab: 0
            },
            counts: {
                school: '学校创客空间',
                work: '创客作品数',
                collection: '创客资源数',
                course: '创客课程数',
                project: '创客项目数',
                activity: '创客活动数',
                subject: '课题数',
                teacher: '教师数',
                student: '学生数',
                class: '班级数'
            }
        }
    },
    components: {
        'v-info-bar': infoBar,
        'v-tabs': tabs,
        'v-person-list': personList,
        'v-list': list
    },
    mounted() {
        this.getPager('school', 6)
        this.getPager('work', 6)
        this.getStatis()
        this.setRPCurTab('0')
        this.recommend_person_type.cur_type = this.recommend_person_type.tabs[this.recommend_person_type.cur_tab].type
    },
    methods: {
        getPager(model, pageSize) {
            requeryHomePage[model + 'Pager']({ orgId: this.$route.query.id }, { pageSize: pageSize, pageNum: 1 }).then((res) => {
                if (res.data.code === 200) {
                    this.$set(this.listData, model, res.data.entity.resultData || [])
                }
            })
        },
        getStatis() {
            requeryHomePage.eduStatisPager({ orgId: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    this.$set(this.listData, 'statis', res.data.entity || {})
                }
            })
        },
        setRPCurTab(index) {
            if (index === '0') {
                this.getPager('student', 5)
                this.sideBarModel = 'student'
                this.sideBarUrl = this.pages.detail.student
            } else if (index === '1') {
                this.getPager('teacher', 5)
                this.sideBarModel = 'teacher'
                this.sideBarUrl = this.pages.detail.teacher
            }
        },
        handleRequestFollow(isStudent) {
            const model = isStudent === '0' ? 'student' : 'teacher'
            this.getPager(model, 5)
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/space_homepage.scss';
@import '~@/assets/css/scss/index_list.scss';
.workslist-item-count {
    font-size: 14px;
    .count-item {
        display: inline;
        margin-right: 1em;
        color: #999;
        vertical-align: bottom;
    }
}
.info-bar-detail {
    margin-bottom: 16px;
}
</style>
