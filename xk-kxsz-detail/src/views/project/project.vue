<template>
    <div id="projectDetails" class="projectDetails container">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item @click.native="redirect(pages.index.url, { path: 'education' })">学习</el-breadcrumb-item>
            <el-breadcrumb-item @click.native="redirect({ url: `/#/education/project` }, { type: 6 })">项目列表</el-breadcrumb-item>
            <el-breadcrumb-item>项目详情</el-breadcrumb-item>
        </el-breadcrumb>
        <v-project-intro :projectDetail.sync="projectDetail" :status.sync="status" @enrollCk='isApply'></v-project-intro>
        <div class="clearfix">
            <div class="content_l">
                <v-tabs :tabs="tabs" :router="router" class="evaluation-tabs"></v-tabs>
                <router-view :projectDetail.sync="projectDetail" ref="detail"></router-view>
            </div>
            <div class="content_r">
                <h4 class="content_r_title clearfix"><span class="fl">相关项目</span><span class="more fr" @click="redirect({ url: '/#/education/project' }, { type: 3 })">更多>></span></h4>
                <ul class="list clearfix" v-if="aboutList.length">
                    <li v-for="(item, index) in aboutList" :key="index" @click="generateRoute(item)" class="list-item__box">
                        <figure class="list-item-img__box">
                            <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(item.imgUrl) || listDefault})` }"></div>
                            <!-- <img :src="getFileUrl(item.imgUrl) || listDefault" /> -->
                        </figure>
                        <div class="about-item clearfix">
                            <h6 class="about-item-title">{{item.name | textOverflow(14) }}</h6>
                            <span class="about-item-other "><i class="icon-i-time"></i>{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
                            <span class="about-item-other fr"><i class="icon-i-member"></i>{{ projectDetail.currNum }}/{{ projectDetail.totalNum }}</span>
                        </div>
                    </li>
                </ul>
                <div v-else class="empty-block">暂无数据</div>
            </div>
        </div>
    </div>
</template>

<script>
// import breadcrumb from 'Common/breadcrumb.vue'
import tabs from 'Common/tabs.vue'
import projectIntro from 'components/project/project_intro.vue'
import { detailProject, projectAboutList, projectApply, isSignedProject } from '@/service/project.js'
import { scrollToTop } from '@/js/scrollToTop.js'
import list from 'Common/list.vue'
import { mapActions } from 'vuex'

export default {
    name: 'projectDetails',
    data() {
        return {
            tabs: [
                { name: '项目详情', type: 'repertoire' },
                { name: '项目评价', type: 'evaluate' }
            ],
            router: {
                path: this.pages.detail.project.path
            },
            projectDetail: {},
            status: {
                num: '',
                isSigned: false,
                sysTime: new Date().getTime()
            },
            aboutList: [],
            listData: {
                col: 1,
                pathUrl: '/education/project/detail',
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
        }
    },
    created() {
        scrollToTop()

        this.router.query = this.$route.query
        detailProject({ id: this.$route.query.id }).then((res) => {
            this.projectDetail = res.data.entity
            this.save(res.data.entity)
            this.getAboutList()
            this.isApply()
            this.isSign()
        })
    },
    components: {
        // 'v-breadcrumb': breadcrumb,
        'v-project-intro': projectIntro,
        'v-tabs': tabs,
        'v-list': list
    },
    methods: {
        ...mapActions({
            save: 'project/save'
        }),
        isApply() {
            // if(this.$ls.get('loginInfo')) {
            projectApply({ projectId: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    this.status.num = res.data.appendInfo.isApply
                }
            })
            // }
        },
        isSign() {
            if (this.$ls.get('loginInfo')) {
                isSignedProject({ projectId: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.status.isSigned = res.data.appendInfo.isAudited
                        this.status.sysTime = res.data.appendInfo.nowTime
                        if (this.status.isSigned || (this.projectDetail.createId === this.$ls.get('loginUId'))) {
                            this.tabs = [
                                { name: '项目详情', type: 'repertoire' },
                                { name: '项目成员', type: 'member' },
                                { name: '项目阶段', type: 'stage' },
                                { name: '项目总结', type: 'summary' },
                                { name: '讨论区', type: 'discuss' },
                                { name: '资源共享区', type: 'share' },
                                { name: '项目评价', type: 'evaluate' }
                            ]
                        }
                    }
                })
            }
        },
        getAboutList() {
            projectAboutList({ createId: this.projectDetail.createId, projectId: this.$route.query.id }, { pageNum: 1, pageSize: 2 }).then((res) => {
                if (res.data.entity && res.data.code === 200) {
                    this.aboutList = res.data.entity.resultData
                }
            })
        },
        generateRoute(item = {}) {
            // this.$router.replace({ path: this.$route.path, query: { id: item.id} })
            this.redirect(this.pages.detail.project, { query: { id: item.id } })
        }
    },
    watch: {
        '$route.query.id'() {
            this.tabs = [{ name: '项目详情', type: 'repertoire' }, { name: '项目评价', type: 'evaluate' }]
            this.isApply()
            scrollToTop()
            this.router.query = this.$route.query
            detailProject({ id: this.$route.query.id }).then((res) => {
                this.projectDetail = res.data.entity
                this.$refs.detail.detail = res.data.entity
                this.save(res.data.entity)
                this.getAboutList()
                this.isSign()
            })
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/item_list.scss';
@import '~@/assets/css/scss/cols.scss';
@import '~@/assets/css/scss/index_list.scss';
@import '~@/assets/css/scss/vars.scss';
.list-item__box:hover {
    .about-item-title {
        color: nth($default-color, 1);
    }
}
.content_l,
.content_r {
    box-sizing: border-box;
    background-color: #fff;
}
.content_l {
    float: left;
    width: 75%;
    // padding: 10px 0;
}
.content_r {
    float: right;
    width: 23.5%;
    .list {
        margin: 0;
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
            font-size: 14px;
            cursor: pointer;
            color: #999;
            &:hover {
                color: $theme-color;
            }
        }
    }
    .about-item {
        font-size: 14px;
        line-height: 1.5;
        .about-item-title {
            padding: 5px 0;
            box-sizing: border-box;
        }
        .about-item-other {
            color: #999;
            font-size: 12px;
            vertical-align: center;
        }
    }
}
.list-item__box {
    display: block;
}
</style>
