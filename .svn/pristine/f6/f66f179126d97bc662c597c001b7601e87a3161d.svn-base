<template>
    <div id="schoolHomePage" class="org-homepage">
        <div class="content_l">
            <!-- 轮播 -->
            <el-carousel class="homepage-model bgc_w" height='300px' style="padding:0;" @change="changeIndex">
                <el-carousel-item v-for='(item, index) in imgs' :key="index">
                    <div class="bg-img__wrap" title="点击查看原图" @click="visible.show = true" :style="{ backgroundImage: `url(${getFileUrl(item ? item.bannerUrl : null) || listDefault})` }"></div>
                </el-carousel-item>
            </el-carousel>
            <section class="homepage-model">
                <v-info-bar></v-info-bar>
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
                <h3 class="homepage-model-title">学校简介</h3>
                <p class="homepage-model-content" v-if="schoolDetail && schoolDetail.remark">{{schoolDetail.remark}}</p>
                <p class="empty-block" v-else>暂无简介</p>
            </div>
            <div class="homepage-model">
                <v-tabs :tabs="recommend_person_type.tabs" :cur_tab="recommend_person_type.cur_tab" @cur_tab="setRPCurTab"></v-tabs>
                <v-person-list :datas="listData[sideBarModel]" :sideModel="sideBarModel" :pathUrl="sideBarUrl" :handle-request="setRPCurTab"></v-person-list>
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
        <img-preview :visible.sync="visible" :imgs="imgs" :imgKey="'bannerUrl'" :initIndex="activeIndex" :ifCarousel="true"></img-preview>
    </div>
</template>

<script>
import infoBar from 'Common/list/graphic/infoBar.vue'
import list from 'Common/list/graphic/list.vue'
import tabs from 'Common/tabs.vue'
import personList from 'Common/list/text/personList.vue'
import interestList from 'Common/side/recommend_interest.vue'
import * as requeryHomePage from '@/service/homePage.js'
import { requestSchoolScene } from '@/service/admin_base.js'
import imgPreview from '@/components/common/img_preview/img_preview.vue'

export default {
    name: 'schoolHomePage',
    data() {
        return {
            imgs: [], // banner
            sideBarModel: 'student', // 推荐教师、学生
            sideBarUrl: {}, // 推荐教师、学生url
            listData: {
                work: [],
                teacher: [],
                student: [],
                statis: {}
            }, // 列表数据
            recommend_person_type: {
                tabs: [
                    { name: '优秀学生', type: 7 },
                    { name: '优秀教师', type: 8 }
                ],
                cur_tab: 0
            },
            // 推荐作品配置
            workList: {
                col: 3,
                pathUrl: this.pages.works,
                params: {
                    names: 'id',
                    val: 'workId'
                }
            },
            // 统计列表
            counts: {
                work: '创客作品数',
                resource: '创客资源数',
                course: '创客课程数',
                project: '创客项目数',
                activity: '创客活动数',
                subject: '课题数',
                teacher: '教师数',
                student: '学生数',
            },
            visible: { // 查看大图的控制
                show: false
            },
            activeIndex: 0 // 当前轮播图的索引
        }
    },
    components: {
        'v-info-bar': infoBar,
        'v-tabs': tabs,
        'v-person-list': personList,
        'v-list': list,
        'v-interest-list': interestList,
        'img-preview': imgPreview
    },
    mounted() {
        requestSchoolScene({ businessId: this.$route.query.id }).then((res) => {
            if (res.data.appendInfo !== null) {
                this.imgs = res.data.appendInfo.list
            }
        })
        this.getPager('work', 9)
        this.getStatis()
        this.setRPCurTab('0')
        this.recommend_person_type.cur_type = this.recommend_person_type.tabs[this.recommend_person_type.cur_tab].type
    },
    methods: {
        getPager(model, pageSize) {
            requeryHomePage[model + 'Pager']({ orgId: this.$route.query.id }, { pageSize: pageSize, pageNum: 1 }).then((res) => {
                if (res.data.entity !== null) {
                    this.$set(this.listData, model, res.data.entity.resultData)
                }
            })
        },
        getRecommendPerson(model, pageSize) {
            requeryHomePage[model + 'Pager']({ orgId: this.$route.query.id }, { pageSize: pageSize, pageNum: 1 }).then((res) => {
                if (res.data.entity !== null) {
                    this.$set(this.listData, model, res.data.entity.resultData)
                }
            })
        },
        getStatis() {
            requeryHomePage.schoolStatisPager({ orgId: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    this.$set(this.listData, 'statis', res.data.entity || {})
                }
            })
        },
        setRPCurTab(index) {
            if (index === '0') {
                this.getRecommendPerson('student', 5)
                this.sideBarModel = 'student'
                this.sideBarUrl = this.pages.detail.student
            } else if (index === '1') {
                this.getRecommendPerson('teacher', 5)
                this.sideBarModel = 'teacher'
                this.sideBarUrl = this.pages.detail.teacher
            }
        },
        // 轮播图切换索引设置
        changeIndex(index) {
            this.activeIndex = index
        }
    },
    props: {
        schoolDetail: Object
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
.bg-img__wrap {
    width: 100%;
    height: 100%;
}
</style>
