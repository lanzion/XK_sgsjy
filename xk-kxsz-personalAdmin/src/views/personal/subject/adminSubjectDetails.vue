<template>
    <div class="adminSubjectDetails">
        <section class="bgw subject-msg">
            <subject-msg :item="subjectDetails" :isDetails="true"></subject-msg>
        </section>
        <div class="content-box clearfix">
            <div class="content-left fl bgw">
                <v-tabs :tabs="[
                    { name: '课题详情', type: 'info' },
                    { name: '课题任务', type: 'task' },
                    { name: '课题活动', type: 'activity' },
                    { name: '课题成果', type: 'result' },
                    { name: '课题阶段', type: 'stage' },
                    { name: '讨论区', type: 'discuss' }
                ]" :router="router"></v-tabs>
                  <router-view :subjectDetails="subjectDetails" :isCreater="isCreater" :isMember="isMember"></router-view>
            </div>
            <div class="content-right fr">
                <subject-member :memberList="memberList"></subject-member>
                <subject-statistical :statistical="statistical"></subject-statistical>
            </div>
        </div>
    </div>
</template>

<script>
    import subjectMsg from 'components/subject/subject_item_msg.vue'
    import tabs from 'Common/classificationList/classification/tabs.vue'
    import subjectMember from 'components/subject/subject_member.vue'
    import subjectStatistical from 'components/subject/subject_statistical.vue'
    import { requestSubjectDetails, requestSubjectMembers } from '@/service/subject.js'
    import { mapActions } from 'vuex'

    export default {
        name: 'adminSubjectDetails',
        components: {
            'subject-msg': subjectMsg,
            'v-tabs': tabs,
            'subject-member': subjectMember,
            'subject-statistical': subjectStatistical
        },
        data() {
            return {
                router: { path: '/admin/subject/detail' },
                listData: {
                    auditedStatus: 1
                },
                subjectDetails: {},
                statistical: {
                    status: 1,
                    taskNum: 0,
                    activityNum: 0,
                    resultNum: 0
                },
                memberList: [],
                userId: '',                             // 登录用户id
                isCreater: false,                       // 登录用户是不是创建者
                isMember: false                         // 登录用户是不是课题成员
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
            *获取课题详情
            *id:this.$route.query.id
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
    .subject-msg{
        padding: 15px;
        margin-bottom: 20px;
    }
    .content-box{
        width: 100%;
        .content-left{
            width: 686px;
            // min-height: 735px;
        }
        .content-right{
            width: 274px;
        }
        .tabs-bar-header .el-tabs__header{
            margin-bottom: 0;
        }
    }
</style>

<style lang="scss">
    .content-box{
        .tabs-bar-header .el-tabs__header{
            margin-bottom: 0;
        }
    }
</style>