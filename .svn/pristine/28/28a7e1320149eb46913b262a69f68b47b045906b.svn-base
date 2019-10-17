<template>
    <div class="faq-wrapper">
        <el-collapse v-if="faqList.length > 0" v-model="activeName">
            <el-collapse-item v-for="(item, idx) in faqList" :key="idx" :title="item.name" :name="idx">
                <div class="faq-detail" v-html="item.content"></div>
            </el-collapse-item>
        </el-collapse>
        <div v-else class="empty-block">暂无常见问题</div>
        <pagination :param="pageParam" @callback="changePage"></pagination>
    </div>
</template>

<script>
    import pagination from '@/components/common/pagination.vue'
    import { requestFaqList } from '@/service/help.js'

    export default {
        name: 'faq',

        data() {
            return {
                activeName: 0,
                pageParam: {
                    pageSize: 5,
                    totalNum: 0,
                    pageNum: 1
                },
                faqList: []
            }
        },

        created() {},

        components: {
            pagination
        },

        mounted() {
            this.getFaqList()
        },

        methods: {
            changePage(val) {
                this.pageParam.pageNum = val
                this.getFaqList()
            },
            getFaqList() {
                requestFaqList({}, this.pageParam).then((res) => {
                    if (res.data.code === 200) {
                        this.faqList = res.data.entity.resultData
                        this.pageParam.totalNum = res.data.entity.totalNum
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
@import '~@/assets/css/scss/vars.scss';

.faq-wrapper {
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

<style lang="stylus" scoped>
    .faq-wrapper
        margin-top: 40px
        .faq-detail
            padding: 25px 20px 0px
            p
                light-heigth: 2em
                font-size: 14px
            img
                max-width: 850px
                margin: 20px 0
                transform: translate(50%,0)
                -ms-transform: translate(50%,0)       /* IE 9 */
                -webkit-transform: translate(50%,0)   /* Safari and Chrome */
                -o-transform: translate(50%,0)        /* Opera */
                -moz-transform: translate(50%,0)      /* Firefox */
</style>

