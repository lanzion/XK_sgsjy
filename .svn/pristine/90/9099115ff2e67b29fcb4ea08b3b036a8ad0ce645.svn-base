<template>
    <div id="schoolHomePage" class="org-homepage">
        <div class="content_l">
            <!-- 轮播 -->
            <el-carousel class="homepage-model bgc_w" height='300px' style="padding:0;">
                <el-carousel-item v-for='(item, index) in imgs' :key="index">
                    <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item ? item.bannerUrl : null) || listDefault})` }"></div>
                    <!-- <img :src="getFileUrl(item ? item.bannerUrl : null) || listDefault" style="width:100%; height: 100%;"> -->
                </el-carousel-item>
            </el-carousel>
            <section class="homepage-model">
                <v-info-bar></v-info-bar>
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
                <h3 class="homepage-model-title">学校简介</h3>
                <p class="homepage-model-content" v-if="schoolDetail && schoolDetail.remark">{{schoolDetail.remark}}</p>
                <p class="empty-block" v-else>暂无简介</p>
            </div>
            <div class="homepage-model">
                <v-tabs :tabs="recommend_person_type.tabs" :cur_tab="recommend_person_type.cur_tab" @cur_tab="setRPCurTab"></v-tabs>
                <v-person-list :datas="listData[sideBarModel]" :pathUrl="sideBarUrl" :handle-request="setRPCurTab"></v-person-list>
            </div>
            <div class="homepage-model">
                <v-interest-list></v-interest-list>
            </div>
            <div class="homepage-model">
                <h3 class="homepage-model-title">学校统计</h3>
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
import interestList from 'Common/side/recommend_interest.vue'
import * as requeryHomePage from '@/service/homePage.js'
import { requestSchoolScene } from '@/service/admin_base.js'
export default {
    name: 'schoolHomePage',
    data() {
        return {
            imgs: [],//banner
            sideBarModel: 'student',//推荐教师、学生
            sideBarUrl: '/studentSpace',//推荐教师、学生url
            listData: {
                work: [],
                teacher: [],
                student: [],
                statis: {}
            },//列表数据
            recommend_person_type: {
                tabs: [
                    { name: '优秀学生', type: 7},
                    { name: '优秀教师', type: 8}
                ],
                cur_tab: 0
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
            //统计列表
            counts: {
                'work': '创客作品数',
                'resource': '创客资源数',
                'course': '创客课程数',
                'project': '创客项目数',
                'activity': '创客活动数',
                'subject': '课题数',
                'teacher': '教师数',
                'student': '学生数',
            }
        }
    },
    components: {
        'v-info-bar': infoBar,
        'v-tabs': tabs,
        'v-person-list': personList,
        'v-list': list,
        'v-interest-list': interestList
    },
    mounted() {
        requestSchoolScene({businessId: this.$route.query.id}).then(res => {
            if(res.data.appendInfo != null) {
                this.imgs = res.data.appendInfo.list
            }
        })
        this.getPager('work', 9)
        this.getStatis();
        this.setRPCurTab('0')
        this.recommend_person_type.cur_type = this.recommend_person_type.tabs[this.recommend_person_type.cur_tab].type;
    },
    methods: {
        getPager(model, pageSize) {
            requeryHomePage[model+ 'Pager']({orgId: this.$route.query.id}, {'pageSize': pageSize, pageNum: 1}).then(res => {
                if(res.data.entity != null) {
                    this.$set(this.listData, model, res.data.entity.resultData)
                }
            })
        },
        getRecommendPerson(model, pageSize) {
            requeryHomePage[model+ 'Pager']({orgId: this.$route.query.id}, {'pageSize': pageSize, pageNum: 1}).then(res => {
                if(res.data.entity != null) {
                    this.$set(this.listData, model, res.data.entity.resultData)
                }
            })
        },
        getStatis() {
            requeryHomePage['schoolStatisPager']({orgId: this.$route.query.id}).then(res => {
                if (res.data.code == 200) {
                    this.$set(this.listData, 'statis', res.data.entity || {})
                }
            })
        },
        setRPCurTab (index) {
            if(index === '0'){
                this.getRecommendPerson('student', 5)
                this.sideBarModel = 'student'
                this.sideBarUrl = '/studentSpace'
            }else if(index === '1'){
                this.getRecommendPerson('teacher', 5)
                this.sideBarModel = 'teacher'
                this.sideBarUrl = '/teacherSpace'
            }
        }
    },
    props: {
        schoolDetail: Object
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
.bg-img__wrap {
    width: 100%;
    height: 100%;
}
</style>
