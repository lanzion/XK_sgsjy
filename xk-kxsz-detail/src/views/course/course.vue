<template>
    <!--绑定key，切换课程时，避免组件缓存-->
    <div :key="$route.query.id" class="container">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item @click.native="redirect(pages.index.url, { path: 'education' })">学习</el-breadcrumb-item>
            <el-breadcrumb-item @click.native="redirect({ url: `/#/education/course` }, { type: 6 })">课程列表</el-breadcrumb-item>
            <el-breadcrumb-item>课程详情</el-breadcrumb-item>
        </el-breadcrumb>
        <v-course-intro @on-register-success="handleRegisterSuccess" @on-be-creator="handleRegisterSuccess" :has-registered="hasRegistered"></v-course-intro>
        <div v-if="hasRegistered && loginUId != courseInfo.createId" class="goto-study clearfix">
            <div class="progress-wrapper fl">
                <el-progress class="progress-bar" :text-inside="true" :stroke-width="22" :percentage="progressInfo.proccess"></el-progress>
                <p class="tip">
                    已学习 <em>{{progressInfo.sectionNum}}</em>
                    个课时，还剩{{(progressInfo.sectionSum || 0) - (progressInfo.sectionNum || 0)}}个课时。
                </p>
            </div>
            <a @click="startStudying" class="btn-go-to-study fr" href="javascript:;">开始学习</a>
        </div>
        <div class="clearfix">
            <div class="content_l">
                <v-tabs :tabs="tabs" :router="router" class="evaluation-tabs"></v-tabs>
                <router-view @on-search="handleDiscussSearch" v-bind="{discussSearch, hasRegistered}"></router-view>
            </div>
            <div class="content_r">
                <v-aside></v-aside>
            </div>
        </div>
    </div>
</template>

<script>
    import { checkHasAppliedOrNot } from '@/service/course.js'
    import { mapState, mapActions, mapGetters } from 'vuex'
    import breadcrumb from 'Common/breadcrumb.vue'
    import tabs from 'Common/tabs.vue'
    import courseIntro from 'Common/module/course/intro.vue' // 课程介绍
    import aside from 'Common/module/course/aside.vue' // 课程侧边栏
    import { scrollToTop } from '@/js/scrollToTop.js'

    export default {
        name: 'courseDetail', // 课程详情页
        data() {
            return {
                discussSearch: {
                    input: '',
                    select: '',
                },
                hasRegistered: false,
                router: {
                    path: this.pages.detail.course.path
                },
                tabs: [
                    { name: '课程详情', type: 'info' },
                    { name: '课程目录', type: 'outline' },
                    { name: '课程评价', type: 'comment' }
                ],
                loginUId: ''
            }
        },
        components: {
            'v-breadcrumb': breadcrumb,
            'v-course-intro': courseIntro,
            'v-tabs': tabs,
            'v-aside': aside
        },
        computed: {
            ...mapState('course', ['courseOutline', 'progressInfo']),
            ...mapState('course', { courseInfo: 'courseDetail' }),
            ...mapGetters('course', ['videoSrcArr'])
        },
        beforeRouteUpdate(to, from, next) {
            // 个人前台空间
            const { query: toQuery, path: toPath } = to
            const { path: fromPath } = from
            // 在当前页面切换课程，重置数据
            if (toPath === fromPath) {
                this.router.query = toQuery
                this.id = toQuery.id
                this.hasRegistered = false
                this.tabs = [
                    { name: '课程详情', type: 'info' },
                    { name: '课程目录', type: 'outline' },
                    { name: '课程评价', type: 'comment' }
                ]

                this.initData()
            }

            next()
        },
        created() {
            scrollToTop() // 滚回顶部
            this.loginUId = this.$ls.get('loginUId')
            this.router.query = this.$route.query
            this.id = this.$route.query.id
            this.initData()
        },
        methods: {
            ...mapActions('course', ['requestOutline', 'queryStudyingProgress']),

            // 进入页面和路由更新时，重新获取数据
            initData() {
                if (this.loginUId) {
                    this.checkHasAppliedOrNot()
                    this.queryStudyingProgress({ courseId: this.id })
                }

                this.requestOutline({ courseId: this.id, userId: this.loginUId })
            },

            async checkHasAppliedOrNot() { // 检查是否已经报名
                const res = await checkHasAppliedOrNot({ courseId: this.id })
                if (res.data.code === 200) {
                    const _appendInfo = res.data.appendInfo || {}
                    const hasRegisteredCode = 1

                    // 0：未报名；1：已报名
                    _appendInfo.isApply === hasRegisteredCode && this.handleRegisterSuccess()
                }
            },
            handleRegisterSuccess() { // 报名成功，重新设置TAB
                this.hasRegistered = true
                this.tabs = [
                    { name: '课程详情', type: 'info' },
                    { name: '课程学员', type: 'student' },
                    { name: '课程目录', type: 'outline' },
                    { name: '讨论区', type: 'discuss' },
                    { name: '资源共享区', type: 'share' },
                    { name: '我的笔记', type: 'note' },
                    { name: '课程评价', type: 'comment' },
                ]
            },
            handleDiscussSearch(val) {
                const { path, query } = this.router
                this.discussSearch = val
                this.$router.push({ path: `${path}/discuss`, query })
            },
            startStudying() { // 去学习
                const sectionId = this.courseOutline[0] && this.courseOutline[0].courseHourSectionList[0].id || ''
                const type = this.courseOutline[0] && this.courseOutline[0].courseHourSectionList[0].sectionType || ''
                if (!sectionId) {
                    this.$message('该课程没有可学习的课时，请查看相关课程')
                    return
                }

                if (type === '1') {
                    this.$router.push({ path: `${this.pages.detail.course.path}/video`, query: { id: this.id, sectionId } })
                } else {
                    this.$router.push({ path: `${this.pages.detail.course.path}/test`, query: { id: this.id, sectionId } })
                }
            }
        },
    }
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/scss/vars';

    .goto-study {
        box-sizing: border-box;
        height: 123px;
        margin-bottom: 20px;
        padding: 30px 18px;
        background-color: #fff;
        .progress-wrapper {
            width: 510px;
            .tip {
                margin-top: 20px;
                font-size: 16px;
            }
            em {
                color: $theme-color;
            }
        }
        .btn-go-to-study {
            width: 92px;
            height: 38px;
            line-height: 38px;
            margin-top: 10px;
            font-size: 14px;
            text-align: center;
            border-radius: $button-radiu;
            border: 1px solid $theme-color;
            color: $theme-color;
            &:hover {
                background-color: $theme-color;
                color: #fff;
            }
        }
    }

    .content_l, .content_r {
        box-sizing: border-box;
        background-color: #fff;
    }

    .content_l {
        float: left;
        width: 75%;
        // padding: 12px 20px 20px;
    }

    .is-admin .content_l {
        float: none;
        width: 100%;
        padding: 0;
    }

    .content_r {
        float: right;
        width: 23.5%;
        padding: 0;
    }

    .evaluation-tabs {
        margin-bottom: 1.5em;
    }
</style>
