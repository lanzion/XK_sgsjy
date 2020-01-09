<template>
    <div class="func">
        <!-- <a class="btn_enrol" title="立即报名" @click.prevent="enrolWindow">立即报名</a> -->
        <a class="btn_enrol" title="参赛入口" @click.prevent="toPlay">参赛入口</a>
        <a class="btn_enrol" title="专家入口" @click.prevent="toMyReview">专家入口</a>
        <a class="btn_enrol" title="管理入口" @click.prevent="toManage">管理入口</a>
    </div>
</template>

<script>
import {
    judgeTakepartIn,
    judgeExpert,
    judgeManage,
    requestIsApply
} from '@/service/contest_detail.js'
import { mapState } from 'vuex'

export default {
    data() {
        const baseInfo =
            this.$ls.get('baseInfo') && this.$ls.get('baseInfo').baseInfo
        return {
            baseInfo: baseInfo,
            identity: this.$ls.get('userIdentity') || '' // 登录用户身份
        }
    },
    props: {
        addRoute: {
            type: Function,
            default: function() {}
        },
        enrollHandler: {
            type: Function,
            default: function() {}
        }
    },
    computed: {
        ...mapState({
            detail: state => state.matchDetail.detail
        })
    },
    mounted() {},
    methods: {
        toMyReview() {
            if (this.baseInfo) {
                judgeExpert({ matchId: this.$route.query.id }).then(res => {
                    if (res.data.code === 200) {
                        this.addRoute('review')
                    } else {
                        this.showMessage('info', res.data.msg)
                    }
                })
            } else if (this.identity === 'admin') {
                this.showMessage(
                    'info',
                    '温馨提示：您不是本赛事的评审专家，去欣赏参赛作品吧',
                    2000
                )
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        toManage() {
            if (this.baseInfo) {
                judgeManage({ id: this.$route.query.id }).then(res => {
                    if (res.data.code === 200) {
                        this.addRoute('manage')
                    } else {
                        this.showMessage('info', res.data.msg)
                    }
                })
            } else if (this.identity === 'admin') {
                this.showMessage(
                    'info',
                    '温馨提示：您不是本赛事的管理人员，不能进入管理入口',
                    2000
                )
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        // 参赛入口
        toPlay() {
            if (this.baseInfo) {
                if (
                    (this.detail.actorType === '1' &&
                        this.identity === 'student') ||
                    ((this.detail.actorType === '2' ||
                        this.detail.actorType === '1') &&
                        this.identity === 'teacher')
                ) {
                    requestIsApply({ matchId: this.$route.query.id }).then(
                        res => {
                            // isProhibit: 判断是否在同一区域
                            if (res.data.appendInfo.isProhibit) {
                                this.addRoute('myPlay')
                            } else {
                                this.$message({
                                    message: '参赛人员与赛事不在同一区域！'
                                })
                            }
                        }
                    )
                } else {
                    this.showMessage(
                        'info',
                        '温馨提示：您的身份不符合参赛要求，去欣赏参赛作品吧',
                        2000
                    )
                }
            } else if (this.identity === 'admin') {
                this.showMessage(
                    'info',
                    '温馨提示：您的身份不符合参赛要求，去欣赏参赛作品吧',
                    2000
                )
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        enrolWindow() {
            if (this.baseInfo) {
                this.enrollHandler()
            } else if (this.identity === 'admin') {
                this.showMessage(
                    'info',
                    '温馨提示：您的身份不符合参赛要求，去欣赏参赛作品吧',
                    2000
                )
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        }
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
            background-color: nth($default-color, 2);
        }
        &:last-child {
            margin-right: 0px;
        }
    }
}
</style>
