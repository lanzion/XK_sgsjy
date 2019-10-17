<template>
    <div id="homePage" class="container org-homepage clearfix">
        <v-info-bar></v-info-bar>
        <div class="content_l">
            <section class="homepage-model">
                <h2 class="homepage-model-title">推荐学校</h2>
                <v-list :listData="schoolList" :items="listData.school">
                    <template scope="props">
                        <div class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
                        </div>
                        <h6 class="list-item-title" v-text="props.item.schoolName ? props.item.schoolName:''"></h6>
                        <ul class="cols-list list-item-count">
                            <li class="cols-item">收藏: {{ props.item.resouceNum ? props.item.resouceNum : 0 }}</li>
                            <li class="cols-item">课程: {{ props.item.coursesNum ? props.item.coursesNum : 0 }}</li>
                            <li class="cols-item">项目: {{ props.item.projectsNum ? props.item.projectsNum : 0 }}</li>
                            <li class="cols-item">作品: {{ props.item.productionNum ? props.item.productionNum : 0 }}</li>
                        </ul>
                    </template>
                </v-list>
            </section>
            <section class="homepage-model">
                <h2 class="homepage-model-title">优秀作品</h2>
                <v-list :listData="workList" :items="listData.work">
                    <template scope="props">
                        <div class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.resourceId) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(props.item.resourceId)" /> -->
                        </div>
                        <h6 class="list-item-title" v-text="props.item.workName ? props.item.workName : ''"></h6>
                        <ul class="workslist-item-count">
                            <li class="count-item"><i class="icon-btn-collection"></i> {{ props.item.collectNum ? props.item.collectNum : 0 }}</li>
                            <li class="count-item"><i class="icon-i-reply"></i> {{ props.item.commentNum ? props.item.commentNum : 0 }}</li>
                            <li class="count-item"><i class="icon-i-browse"></i> {{ props.item.browseNum ? props.item.browseNum : 0 }}</li>
                        </ul>
                    </template>
                </v-list>
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
import infoBar from 'Common/classificationList/list/graphic/infoBar.vue'
import list from 'Common/classificationList/list/graphic/list.vue'
import tabs from 'Common/classificationList/classification/tabs.vue'
import personList from 'Common/classificationList/list/text/personList.vue'
import * as requeryHomePage from '@/service/homePage.js'
export default {
    name: 'homePage',
    data() {
        return {
            sideBarModel: 'student',
            sideBarUrl: '/studentSpace',
            listData: {
                school: [],
                work: [],
                teacher: [],
                student: [],
                statis: {}
            },
            recommend_person_type: {
                tabs: [
                    { name: '优秀学生', type: 7},
                    { name: '优秀教师', type: 8}
                ],
                cur_tab: 0
            },
            //推荐学校配置
            schoolList: {
                col: 3,
                pathUrl: '/schoolSpace/homePage',
                params: {
                    names: 'id',
                    val: 'schoolId'
                }
            },
            //推荐作品配置
            workList: {
                col: 3,
                pathUrl: '/space/works/details',
                params: {
                    names: 'id',
                    val: 'workId'
                }
            },
            counts: {
                'school': '学校创客空间',
                'work': '创客作品数',
                'collection': '创客资源数',
                'course': '创客课程数',
                'project': '创客项目数',
                'activity': '创客活动数',
                'subject': '课题数',
                'teacher': '教师数',
                'student': '学生数',
                'class': '班级数'
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
        this.getStatis();
        this.setRPCurTab('0')
        this.recommend_person_type.cur_type = this.recommend_person_type.tabs[this.recommend_person_type.cur_tab].type;
    },
    methods: {
        getPager(model, pageSize) {
            requeryHomePage[model+ 'Pager']({orgId: this.$route.query.id}, {'pageSize': pageSize, pageNum: 1}).then(res => {
                if (res.data.code == 200) {
                    this.$set(this.listData, model, res.data.entity.resultData || [])
                }
            })
        },
        getStatis() {
            requeryHomePage['eduStatisPager']({orgId: this.$route.query.id}).then(res => {
                if (res.data.code == 200) {
                    this.$set(this.listData, 'statis', res.data.entity || {})
                }
            })
        },
        setRPCurTab (index) {
            if(index === '0'){
                this.getPager('student', 5)
                this.sideBarModel = 'student'
                this.sideBarUrl = '/studentSpace'
            }else if(index === '1'){
                this.getPager('teacher', 5)
                this.sideBarModel = 'teacher'
                this.sideBarUrl = '/teacherSpace'
            }
        },
        handleRequestFollow(isStudent) {
            const model = isStudent == '0' ? 'student' : 'teacher'
            this.getPager(model, 5)
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/item_list.scss';
@import '~@/asset/scss/cols.scss';
@import '~@/asset/scss/space_homepage.scss';
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
