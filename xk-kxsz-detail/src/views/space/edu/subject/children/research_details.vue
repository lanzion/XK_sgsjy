<template>
    <div id="research_details" class="container">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item :to="{ path: `/space/${type}/subject`, query: { id: $route.query.id } }">课题</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/space/${type}/subject/research`, query: { id: $route.query.id } }">在研课题</el-breadcrumb-item>
            <el-breadcrumb-item>课题详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content clearfix">
            <div class="content-left fl">
                <section class="subject-msg bgw">
                    <subject-msg :item="subjectDetails" :isDetails="true"></subject-msg>
                </section>
                <section class="subject-details bgw">
                    <v-tabs :tabs="[
                    { name: '课题详情', type: 'info' },
                    { name: '课题任务', type: 'task' },
                    { name: '课题活动', type: 'activity' },
                    { name: '课题成果', type: 'result' },
                    { name: '课题阶段', type: 'stage' },
                    { name: '讨论区', type: 'discuss' }
                ]" :router="router"></v-tabs>
                      <router-view :subjectDetails="subjectDetails" :isCreater="isCreater" :isMember="isMember"></router-view>
                </section>
            </div>
            <div class="content-right fr">
                <v-member :isBackend="false" :memberList="memberList"></v-member>
                <subject-statistical :isBackend="false"></subject-statistical>
            </div>
        </div>
    </div>
</template>

<script>
    import subjectMsg from 'Common/module/subject/subject_item_msg.vue'
    import breadCrumb from 'Common/breadcrumb.vue'
    import tabs from 'Common/tabs.vue'
    import member from 'Common/module/subject/subject_member.vue'
    import statistical from 'Common/module/subject/subject_statistical.vue'
    import { requestSubjectDetails, requestSubjectMembers } from '@/service/subject.js'
    import { mapActions } from 'vuex'

    export default {
        name: 'research_details',
        components: {
            'subject-msg': subjectMsg,
            'v-breadcrumb': breadCrumb,
            'v-tabs': tabs,
            'v-member': member,
            'subject-statistical': statistical
        },
        data() {
            return {
                router: { path: '/space/subject/research' },
                subjectDetails: {},
                statistical: {
                    status: 1,
                    taskNum: 0,
                    activityNum: 0,
                    resultNum: 0
                },
                memberList: [],
                userId: '',                            // 登录用户id
                isCreater: false,                    // 登录用户是不是创建者
                isMember: false,                     // 登录用户是不是课题成员
                type: 'edu'
            }
        },
        created() {
            this.router.query = this.$route.query
            if (this.$ls.get('loginInfo')) {
                this.userId = this.$ls.get('loginInfo').userInfo.id
            }
        },
        mounted() {
            this.getSubjectDetails()
            this.getSubjectMembers()
        },
        methods: {
            ...mapActions('subject', ['setStatistical']),
            /*
             * 获取课题详情
             * id: this.$route.query.id
             */
            getSubjectDetails() {
                requestSubjectDetails({ id: this.$route.query.subjectId }).then((res) => {
                    this.subjectDetails = res.data.entity
                    this.setStatistical(res.data.entity)
                    if (res.data.entity.headUserId === this.userId) {
                        this.isCreater = true
                    } else {
                        this.isCreater = false
                    }
                    if (res.data.entity.subjectLevel === '5') {
                        this.type = 'school'
                    }
                })
            },
            // 获取课题组成员
            getSubjectMembers() {
                requestSubjectMembers({ subjectId: this.$route.query.subjectId }).then((res) => {
                    if (res.data.code === 200) {
                        this.memberList = res.data.entity.resultData
                        for (const i in this.memberList) {
                            if (this.memberList[i].userId === this.userId) {
                                this.isMember = true
                                return
                            }
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    *{
        box-sizing: border-box;
    }
    #research_details{
        // margin-top: 20px;
    }
    .content{
        width: 100%;
        .content-left{
            width: 906px;
            .subject-msg{
                padding: 15px;
                margin-bottom: 20px;
            }
            .subject-details{
                min-height: 570px;
            }
        }
        .content-right{
            width: 274px;
        }
    }
</style>