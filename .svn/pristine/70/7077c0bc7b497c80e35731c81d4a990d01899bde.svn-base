<template>
    <div class="fr func">
        <el-popover ref="popover" trigger="hover" popper-class="context-menu-box">
            <ul class="project-list" v-if="projectList.length">
                <li class="project-list-item" v-for="(item, index) in projectList" @click="enrolContest(item)">
                    {{item.projectName}}
                </li>
            </ul>
            <div v-else>没有可选的参赛类型</div>
        </el-popover>
        <a class="btn_enrol" title="报名参赛" v-popover:popover>报名参赛</a>
        <a class="btn_enrol" title="管理入口" @click.prevent="toManage">管理入口</a>
    </div>
</template>

<script>
import { judgeManageOffline } from '@/service/contest_detail.js'
import { requestProjectRelation } from '@/service/matchEntrance.js'

export default {
    data() {
        const baseInfo = this.$ls.get('baseInfo') && this.$ls.get('baseInfo').baseInfo
        return {
            baseInfo: baseInfo,
            identity: this.$ls.get('userIdentity') || '', // 登录用户身份
            projectList: [],
            userType: '',
        }
    },
    props: {
        addRoute: {
            type: Function,
            default: function () {}
        },
        enrollHandler: {
            type: Function,
            default: function () {}
        },
    },
    mounted() {
        this.setUserType()
        this.getProjectRelation()
    },
    methods: {
        setUserType() {
            if (this.$ls.get('userIdentity') === 'teacher') {
                this.userType = '1'
            } else if (this.$ls.get('userIdentity') === 'student') {
                this.userType = '0'
            } else {
                this.userType = ''
            }
        },
        toManage() {
            if (this.baseInfo) {
                judgeManageOffline({ id: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.addRoute('manage')
                    } else {
                        this.showMessage('info', res.data.msg)
                    }
                })
            } else if (this.identity === 'admin') {
                this.showMessage('info', '温馨提示：您不是本赛事的管理人员，不能进入管理入口', 2000)
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        // 报名参赛
        enrolContest(item) {
            this.enrollHandler(item)
        },
        async getProjectRelation() {
            const res = await requestProjectRelation({ businessId: this.$route.query.id })
            if (res.data.code === 200) {
                if (this.userType !== '') {
                    this.projectList = res.data.entity.filter((x) => { return x.actorType.includes(this.userType) }) || []
                } else {
                    this.projectList = res.data.entity
                }
            }
        },
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.func {
    .btn_enrol {
        margin: 0;
        padding: 6px 10px;
        font-size: 14px;
        color: #23b8ff;
        border: 1px solid #23b8ff;
        margin-right: 10px;
        border-radius: 4px;
        background-color: #23b8ff;
        color: #fff;
        &:hover {
            background-color: nth($default-color, 2)
        }
        &:last-child {
            margin-right: 0px;
        }
    }
}

.project-list {
    .project-list-item {
        font-size: 14px;
        line-height: 2.5;
        padding-left: 10px;
        &:hover {
            color: $theme-color;
            background-color: #f3f3f3;
        }
    }
}
</style>
