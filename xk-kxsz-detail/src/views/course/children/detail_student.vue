<template>
    <div class="student-wrapper pr dpd15">
        <ul v-if="isAdmin">
            <li v-for="(student, index) in students" :key="index" class="student-item table-layout">
                <figure class="avatar table-cell">
                    <img @click="toPersonDetail(student)" :src="getFileUrl(student.headImageUrl) || faceDefault" alt="" width="72" height="72">
                </figure>
                <div class="student-info table-cell">
                    <p class="name">
                        <a @click="toPersonDetail(student)" :title="student.applyName" class="link" href="javascript:;">
                            {{student.applyName || '暂无姓名'}} （{{identityList[student.identity]}}）
                        </a>
                    </p>
                    <div class="from">
                        <span class="school">{{student.schoolName || '暂无所属学校'}}</span>
                        <div class="progress-bar-wrapper">
                            <el-progress class="progress-bar" :text-inside="true" :stroke-width="18" :percentage="student.progress || 0" status=""></el-progress>
                        </div>
                    </div>
                    <time class="time">{{student.createDate | dateFormat('yyyy-MM-dd')}}</time>
                </div>
            </li>
        </ul>
        <ul v-else class="clearfix">
            <li v-for="(student, index) in students" :key="index" class="student-item fl">
                <a @click="toPersonDetail(student)" :title="student.applyName" class="clearfix">
                    <figure class="avatar fl">
                        <img :src="getFileUrl(student.headImageUrl) || faceDefault" alt="" width="72" height="72">
                    </figure>
                    <div class="student-info fl">
                        <h5 class="link name ellipsis">{{student.applyName || '暂无姓名'}}（{{identityList[student.identity]}}）</h5>
                        <div class="from ellipsis">{{student.schoolName || '暂无所属学校'}}</div>
                    </div>
                </a>
            </li>
        </ul>
        <p v-if="students.length === 0" class="no-data">暂无数据</p>
        <v-pagination :param.sync="pageParam" :change-page="requestStudentList"></v-pagination>
        <a v-if="isAdmin" @click="dialogVisible.show = true" href="javascript:;" class="btn-invite pa">+ 邀请学员</a>
        <invite-member :visible="dialogVisible" model="courseId"></invite-member>
    </div>
</template>

<script>
    import { requestStudentList } from '@/service/course.js'
    import { joinSpace } from '@/mixin/joinSpace.js'
    import pagination from 'Common/pagination.vue'
    import inviteMember from 'components/project/inviteMembers.vue'

    export default {
        name: 'courseStudent', // 课程学员
        inheritAttrs: false,
        mixins: [joinSpace],
        data() {
            return {
                identityList: ['学生', '教师', '投资人'],
                dialogVisible: { show: false },
                pageParam: {
                    pageSize: this.isAdmin && 5 || 16,
                    pageNum: 1,
                    totalNum: 0
                },
                students: [] // 学员列表
            }
        },

        created() {
            console.log('5555555', this.identityList)
            this.requestStudentList()
        },

        components: {
            'v-pagination': pagination,
            inviteMember
        },

        // mounted() {
        //     console.log('5555555', this.identityList)
        //     this.requestStudentList()
        // },

        methods: {
            async requestStudentList() { // 获取学员列表
                const res = await requestStudentList({ ...this.pageParam, courseId: this.$route.query.id })

                if (res.data.code === 200) {
                    const { resultData, totalNum } = res.data.entity || {}
                    this.students = resultData || []
                    console.log('列表啊：', this.students)
                    this.pageParam.totalNum = totalNum || 0
                }
            },

            handleLink({ orgId, userId, identity }) {
                const [studentCode, teacherCode] = ['0', '1']

                if (identity === studentCode || identity === teacherCode) {
                    const label = identity === studentCode && 'student' || 'teacher'
                    this.$router.push({ path: `/space/${label}/dynamic`, query: { id: orgId, uid: userId } })
                    return
                }
//                location.href = '/admin.html'
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/scss/vars.scss';

    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .student-wrapper .btn-invite {
                border: 1px solid $color-value;
                color: $color-value;
                &:hover{
                    color: #fff;
                    background-color: $color-value;
                }
            }
        }
    }

    .is-admin .student-wrapper {
        .student-item {
            height: 100px;
            box-sizing: border-box;
            border-bottom: 1px dashed #c9c9c9;
            .student-info {
                padding-left: 12px;
                color: #3e3e3e;
                .link {
                    font-size: 18px;
                    &:hover {
                        color: #00a0e9;
                    }
                }
                .from {
                    width: 100%;
                    margin: 12px 0 6px;
                    .school {
                        display: inline-block;
                        min-width: 50px;
                        font-size: 14px;
                        margin-right: 12px;
                    }
                    .progress-bar-wrapper {
                        display: inline-block;
                        width: 348px;
                        vertical-align: text-top;
                    }
                }
                .time {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }

    .student-wrapper {
        .student-item {
            margin: 0 28px 28px 0;
        }
        .avatar {
            width: 72px;
            height: 72px;
            img {
                border-radius: 50%;
            }
        }
        .student-info {
            margin-left: 10px;
            margin-top: 12px;
            .link {
                font-size: 18px;
                &:hover {
                    color: #00a0e9;
                }
            }
            .name {
                width: 140px;
            }
            .from {
                width: 100px;
                margin-top: 12px;
                font-size: 14px;
            }
        }
    }

    .student-wrapper .no-data {
        font-size: 12px;
    }

    .student-wrapper .btn-invite {
        box-sizing: border-box;
        right: 15px;
        top: -56px;
        width: 90px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 14px;
    }
</style>
