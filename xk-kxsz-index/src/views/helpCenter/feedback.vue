<template>
    <div class="feedback-wrapper">
        <div class="head-box clearfix">
            <div class="search fl">
                <input type="text" placeholder="请输入反馈内容" class="search-input" v-model="search" v-on:keyup.enter="getFeedbackList">
                <a href="javaScript:;" class="search-btn" @click="getFeedbackList">搜索</a>
            </div>
            <div class="btn fr">
                <a href="javaScript:;" title="我要反馈" @click="openDialog">我要反馈</a>
            </div>
        </div>
        <!-- 反馈列表 -->
        <section class="feedback-list">
            <ul class="list-box" v-if="feedbackList.length">
                <li class="list-item" v-for="(item, index) in feedbackList">
                    <div class="feedback clearfix">
                        <span class="label fl">反馈：</span>
                        <p class="content fl">{{item.content}}</p>
                        <span class="date fr">{{item.createTime | dateFormat('yyyy-MM-dd HH:mm')}}</span>
                    </div>
                    <div class="reply clearfix">
                        <span class="label fl">回复：</span>
                        <p class="content fl">{{item.replyContent}}</p>
                        <span class="date fr">{{item.updateDate | dateFormat('yyyy-MM-dd HH:mm')}}</span>
                    </div>
                </li>
            </ul>
            <div v-else class="empty-block">暂无反馈</div>
            <pagination :param="pageParam" @callback="changePage"></pagination>
        </section>
        <xk-feedback :visible="visible"></xk-feedback>
    </div>
</template>

<script>
    import pagination from '@/components/common/pagination.vue'
    import { requestFeedbackList } from '@/service/help.js'

    export default {
        name: 'feed_back',

        data() {
            return {
                activeName: 0,
                search: '',
                pageParam: {
                    totalNum: 0,
                    pageSize: 5,
                    pageNum: 1
                },
                feedbackList: [],
                visible: {
                    show: false
                }
            }
        },

        created() {},

        components: {
            pagination
        },

        mounted() {
            this.getFeedbackList()
        },

        methods: {
            changePage(val) {
                this.pageParam.pageNum = val
                this.getFeedbackList()
            },
            getFeedbackList() {
                const params = {
                    content: this.search,
                    replyStatus: 1
                }
                requestFeedbackList(params, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.feedbackList = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            },
            openDialog() {
                this.visible.show = true
                // if (this.$ls.get('loginInfo')) {
                //     this.visible.show = true
                // } else {
                //     this.$store.commit('toggleLoginModal', true)
                // }
            }
        }
    }
</script>

<style lang="scss">
@import '~@/assets/css/scss/vars.scss';

    .feedback-wrapper {
        .el-dialog {
            width: 620px;
        }
    }
    .recruit {
        .el-tabs__header {
            border-bottom: 0;
            margin-bottom: 38px;
        }
        .el-tabs__nav-wrap,
        .el-tabs__nav-scroll {
            overflow: visible;
        }
        .el-tabs__nav-scroll {
            text-align: center;
            .el-tabs__nav {
                float: none;
            }
            .el-tabs__active-bar {
                display: none;
            }
            .el-tabs__item {
                $h: 55px;
                position: relative;
                width: 170px;
                height: $h;
                line-height: $h;
                font-size: 24px;
                color: nth($default-color, 1);
                &.is-active {
                    background-color: nth($default-color, 1);
                    color: #fff;
                    &:before {
                        position: absolute;
                        left: 46%;
                        top: 100%;
                        content: "";
                        border: 8px solid transparent;
                        border-top-color: nth($default-color, 1);
                    }
                }
            }
        }
        .el-collapse {
            border: 0;
            color: #333;
            .el-collapse-item + .el-collapse-item {
                margin-top: 20px;
            }
            .el-collapse-item__header {
                $h: 50px;
                height: $h;
                line-height: $h;
                background-color: #eee;
                border-bottom: 0;
                font-size: 18px;
                padding-left: 20px;
                .el-collapse-item__header__arrow {
                    float: right;
                    line-height: $h;
                    margin-right: 12px;
                    color: nth($default-color, 1);
                }
            }
            .el-collapse-item__wrap {
                background-color: #fff;
                border-bottom: 0;
            }
            .el-collapse-item__content {
                padding: 0;
            }
        }
    }
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';

.feedback-wrapper {
    margin-top: 30px;
    .head-box {
        margin-bottom: 10px;
        .search {
            .search-input {
                height: 34px;
                border: 1px solid nth($default-color, 1);
                padding: 10px;
                box-sizing: border-box;
                vertical-align: top;
            }
            .search-btn {
                display: inline-block;
                line-height: 34px;
                background: nth($default-color, 1);
                color: #fff;
                margin-left: -4px;
                padding: 0px 10px;
            }
        }
        .btn {
            line-height: 34px;
            a {
                font-size: 14px;
                &:hover {
                    color: nth($default-color, 1);
                }
            }
        }
    }
    .feedback-list {
        padding: 0px 20px 20px;
        border: 1px solid #c9c9c9;
        .list-box {
            .list-item {
                padding: 35px 0px;
                border-bottom: 1px dashed #c9c9c9;
                font-size: 14px;
                color: #626262;
                .feedback {
                    margin-bottom: 24px;
                    .label,
                    .content {
                        font-size: 16px;
                        color: #nth($default-color, 1);
                    }
                }
                .content {
                    width: 840px;
                    word-wrap: break-word;
                }
            }
        }
    }
}
</style>

