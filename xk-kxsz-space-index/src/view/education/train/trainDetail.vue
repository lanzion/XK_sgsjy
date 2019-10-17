<template>
    <div class="trainDetails container">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="navigation">
            <el-breadcrumb-item :to="{ path: '/education/train' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/education/train/list' }">作品列表</el-breadcrumb-item>
            <el-breadcrumb-item>作品详情</el-breadcrumb-item>
        </el-breadcrumb>

        <section class="intro">
            <el-row :gutter="20">
                <el-col :span="11">
                    <div class='introPrev' title="点击查看原图" @click="visible.show = true" :style="{backgroundImage:'url('+ getFileUrl((trainDetail.cover?trainDetail.cover:null))+')'}"></div>
                </el-col>
                <el-col :span="13">
                    <div class='introMsg'>
                        <h3 class="introMsg-header clearfix">
                            <span class="introMsg-header-title" :title="trainDetail.name">{{ trainDetail.name}}</span>
                            <span class="introMsg-header-score">{{ trainDetail.score ? (trainDetail.score + '分') : '' }}</span>
                            <v-btn-group class="fr" :title.sync="trainDetail.name" module="train" :img="trainDetail.imgUrl"></v-btn-group>
                        </h3>
                        <div class="train-type">价格: <em class="free-or-not">免费</em></div>
                        <p class="intro-introduction">{{ trainDetail.introduction | textOverflow('80')}}</p>
                        <div class="projectIntro-other">
                            <span class="projectIntro-other-item">
                                <i class="icon-i-classify"></i>
                                分类：{{ trainDetail.typeName }}
                            </span>
                            <span class="projectIntro-other-item">
                                <i class="icon-i-member"></i>
                                实训人数：{{ trainDetail.memberNum }}
                            </span>
                            <span class="projectIntro-other-item">
                                <i class="icon-i-creator"></i>
                                提供者：{{ trainDetail.createName }}
                            </span>
                        </div>
                        <a class="btn-b-grassGreen" :href="trainDetail.url">进入实训</a>
                    </div>
                </el-col>
            </el-row>
        </section>
        <div class="clearfix">
            <div class="content_l">
                <v-tabs :tabs="[
                    { name: '评价', type: 'evaluate'},
                    { name: '讨论区', type: 'discuss'}
                ]" :router="router" class="evaluation-tabs"></v-tabs>
                <router-view :trainDetail.sync="trainDetail" ref="detail"></router-view>
            </div>
            <div class="content_r">
                <div>
                    <h4 class="content_r_title clearfix"><span class="fl">相关课程</span><span class="more fr" @click="$router.push({path:'/education/course'})">更多>></span></h4>
                    <ul class="list clearfix" v-if="courseList.length">
                        <li v-for="(item, index) in courseList" :key="index" @click="generateCourseRoute(item)" class="list-item__box">
                            <figure class="list-item-img__box">
                                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.cover) || listDefault})` }"></div>
                                <!-- <img :src="getFileUrl(item.cover) || listDefault" /> -->
                            </figure>
                            <div class="about-item clearfix">
                                <h6>{{item.name | textOverflow(14) }}</h6>
                                <span class="about-item-other "><i class="icon-i-time"></i>{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                                <span class="about-item-other fr"><i class="icon-i-member"></i>{{ item.currNum || 0 }}/{{ item.totalNum || 0 }}</span>
                            </div>
                        </li>
                    </ul>
                    <div v-else class="empty-block">暂无数据</div>
                </div>
                <div style="margin-top:20px;">
                    <h4 class="content_r_title clearfix"><span class="fl">相关项目</span><span class="more fr" @click="$router.push({path:'/education/project'})">更多>></span></h4>
                    <ul class="list clearfix" v-if="aboutList.length">
                        <li v-for="(item, index) in aboutList" :key="index" @click="generateRoute(item)" class="list-item__box">
                            <figure class="list-item-img__box">
                                <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.imgUrl) || listDefault})` }"></div>
                                <!-- <img :src="getFileUrl(item.imgUrl) || listDefault" /> -->
                            </figure>
                            <div class="about-item clearfix">
                                <h6>{{item.name | textOverflow(14) }}</h6>
                                <span class="about-item-other "><i class="icon-i-time"></i>{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                                <span class="about-item-other fr"><i class="icon-i-member"></i>{{ item.currNum || 0 }}/{{ item.totalNum || 0 }}</span>
                            </div>
                        </li>
                    </ul>
                    <div v-else class="empty-block">暂无数据</div>
                </div>
            </div>
        </div>
        <img-preview :visible.sync="visible" :imgUrl="trainDetail.cover"></img-preview>
    </div>
</template>

<script>
import breadcrumb from 'Common/breadcrumb.vue'
import btnGroup from 'Common/button/com_panel_event.vue'
import tabs from 'Common/classificationList/classification/tabs.vue'
import { trainDetail } from '@/service/train.js'
import list from 'Common/classificationList/list/graphic/list.vue'
import { projectAboutList } from '@/service/project.js'
import { requestHotCourseList } from '@/service/course.js'
import imgPreview from '@/components/common/img_preview/img_preview.vue'

export default {
    data() {
        return{
            router: {
                path: '/education/train/detail'
            },
            trainDetail: {},
            status: {num:''},
            aboutList: [],
            listData: {
                col: 1,
                pathUrl: '/education/project/detail',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            courseList: [],
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    created() {
        let path = this.$route.path;
        let item = path.match(/\/\w+/g)[0];
        this.router.query = this.$route.query;
        trainDetail({"id": this.$route.query.id}).then(res => {
            this.trainDetail = res.data.entity
            this.getAboutList()
            this.getCourseList()
        })
    },
    components: {
        'v-breadcrumb': breadcrumb,
        'v-tabs': tabs,
        'v-list': list,
        'v-btn-group': btnGroup,
        'img-preview': imgPreview
    },
    methods: {
        getAboutList () {
            projectAboutList( { createId: this.trainDetail.createId, projectId: this.$route.query.id }, { pageNum: 1, pageSize: 1 } ).then(res => {
                if(res.data.entity && res.data.code == 200) {
                    this.aboutList = res.data.entity.resultData
                }
            })
        },
        getCourseList () {
            requestHotCourseList( { pageNum: 1, pageSize: 2  } ).then(res => {
                if(res.data.entity && res.data.code == 200) {
                    this.courseList = res.data.entity.resultData
                }
            })
        },
        generateRoute(item = {}) {
            this.$router.push({ path: '/education/project/detail', query: { id: item.id} })
        },
        generateCourseRoute(item = {}) {
            this.$router.push({ path: '/education/course/detail', query: { id: item.id} })
        }
    },
    watch: {
        '$route.query.id' () {
            this.tabs = [ { name: '项目详情', type: 'repertoire'}, { name: '项目评价', type: 'evaluate'} ]
            this.isApply()
            this.router.query = this.$route.query;
            detailProject({"id": this.$route.query.id}).then(res => {
                this.trainDetail = res.data.entity
                this.$refs.detail.detail = res.data.entity
                this.getAboutList()
            })
        }
    }
}
</script>

<style lang='scss' scoped>
@import "~@/asset/scss/vars.scss";
@import '~@/asset/scss/item_list.scss';
@import '~@/asset/scss/cols.scss';
@import '~@/asset/scss/index_list.scss';
@import '~@/asset/scss/form.scss';
@each $color-key, $color-value in $color-data-set {
    .theme-#{$color-key} {
        .btn-b-grassGreen {
            background:  nth($color-value, 3);
            &:hover {
                background:  nth($color-value, 1);
            }
        }
    }
}

.trainDetails {
    // margin-top: 20px;
    .intro {
        position: relative;
        width: 100%;
        padding: 20px;
        margin-bottom: 20px;
        background-color: #fff;
        box-sizing: border-box;
        .introPrev {
            width: 100%;
            height: 378px;
            background-size: cover;
            background-position: center;
        }
        .introMsg {
            .introMsg-header {
                line-height: 3;
                font-size: 24px;
                .introMsg-header-score {
                    color: #D00;
                }
            }
            .train-type {
                height: 44px;
                line-height: 44px;
                margin-bottom: 22px;
                background-color: #f9f9f9;
                font-size: 20px;
                text-indent: 10px;
                .free-or-not {
                    color: #00a0e9;
                }
            }
            .projectIntro-other {
                .projectIntro-other-item {
                    display: inline-block;
                    box-sizing: border-box;
                    width: 48%;
                    line-height: 2;
                    padding-right: 12px;
                    font-size: 14px;
                    color: #626262;
                }

                [class^="icon-"],
                [class*=" icon-"] {
                    font-size: 14px;
                    margin-right: 10px;
                }
            }
            .intro-introduction {
                margin-bottom: 1em;
                line-height: 2;
                word-wrap: break-word;
            }
            .btn-b-grassGreen {
                position: absolute;
                bottom: 0;
                width: 160px;
                height: 46px;
                font-size: 16px;
                color: #fff;
                text-align: center;
                line-height: 46px;
            }
        }
    }
}
.content_l {
    box-sizing: border-box;
    background-color: #fff;
}
.content_l {
    float: left;
    width: 75%;
}
.content_r {
    float: right;
    width: 23.5%;
    div {
        background-color: #fff;
        .list {
            margin: 0;
            .list-item__box {
                display: block;
            }
            .list-item__box + .list-item__box {
                border-top: 1px solid #ddd;
            }
        }
        .content_r_title {
            padding: 0 10px;
            border-bottom: 1px solid #ddd;
            font-size: 16px;
            line-height: 42px;

            .more {
                cursor: pointer;
                color: #999;
                &:hover {
                    color: $default-color;
                }
            }
        }
        .about-item {
            font-size: 14px;
            line-height: 1.5;
            .about-item-other {
                color: #999;
                font-size: 12px;
                vertical-align: center;
            }
        }
    }
}
</style>
