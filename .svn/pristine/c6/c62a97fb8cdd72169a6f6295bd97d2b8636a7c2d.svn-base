<template>
    <div id="subject_statistical">
        <h4>课题统计</h4>
        <section>
            <dl class="clearfix">
                <dt class="fl"><i class="icon-s-statis-status"></i>当前状态：</dt>
                <dd class="fl">
                    <span v-if="statistical.status === 1">立项</span>
                    <span v-if="statistical.status === 2">开题</span>
                    <span v-if="statistical.status === 3">中期评估</span>
                    <span v-if="statistical.status === 4">结题验收</span>
                    <span v-if="statistical.status === 5">已结束</span>
                </dd>
            </dl>
            <dl class="clearfix">
                <dt class="fl">
                    <span class="icon-sub-statis-task icon">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                    </span>
                    课题任务：
                </dt>
                <dd class="fl">{{statistical.taskNum}}</dd>
            </dl>
            <dl class="clearfix">
                <dt class="fl">
                    <span class="icon-sub-statis-activity icon">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                    </span>
                    课题活动：
                </dt>
                <dd class="fl">{{statistical.activityNum}}</dd>
            </dl>
            <dl class="clearfix">
                <dt class="fl">
                    <span class="icon-sub-statis-achievements icon">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                    </span>
                    课题成果：
                </dt>
                <dd class="fl">{{statistical.resultNum}}</dd>
            </dl>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'subject_statistical',
        data() {
            return {
            }
        },
        props: {
            isBackend: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            ...mapState('subject', { statistical: 'statistical' })
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    #subject_statistical{
        background-color: #fff;
        width: 274px;
        margin-bottom: 20px;
        h4{
            padding: 13px;
            border-bottom: 1px solid #c9c9c9;
            font-size: 16px;
        }
        section{
            padding: 15px;
            dl{
                line-height: 20px;
                margin-bottom: 20px;
                font-size: 14px;
                dt{
                    i{
                        margin-right: 10px;
                        font-size: 18px;
                    }
                    .icon{
                        margin-right: 6px;
                        font-size: 18px;
                    }
                }
            }
            dl:last-child{
                margin-bottom: 0;
            }
        }
    }
</style>