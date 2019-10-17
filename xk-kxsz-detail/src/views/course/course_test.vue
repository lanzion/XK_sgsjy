<template>
    <div id="courseTest" class="course-test container">
        <!-- <v-breadcrumb></v-breadcrumb> -->
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item @click.native="redirect({ url: `/#/education/course` }, { type: 6 })">课程列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/education/course', query: { id: $route.query.id } }">课程详情</el-breadcrumb-item>
            <el-breadcrumb-item>课程练习</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="test-wrapper bgw">
            <div class="test-header">
                <h2 class="title">{{courseDetail.name}}</h2>
                <p class="tip">完成测验，达到要求后将自动报名该课程。</p>
                <!--<p class="countdown">倒计时： <em>60:00</em></p>-->
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    // import breadcrumb from 'components/common/breadcrumb.vue'

    export default {
        name: 'courseTest', // 课程考试
        data() {
            return {}
        },
        components: {
            // 'v-breadcrumb': breadcrumb
        },
        computed: {
            ...mapState('course', ['courseDetail'])
        },
        created() {
            this.requestCourseDetail({ id: this.$route.query.id })
        },
        methods: {
            ...mapActions('course', ['requestCourseDetail'])
        }
    }
</script>

<style lang='scss'>
    #courseTest .test-header {
        text-align: center;
        .title {
            font-size: 24px;
        }
        .tip {
            margin-top: 6px;
            font-size: 12px;
            color: #999;
        }
        .countdown {
            margin-top: 22px;
            font-size: 14px;
        }
    }
    .test-wrapper {
            padding: 10px 42px 77px;
        }
</style>
