<template>
    <div class="about-wrapper">
        <banner :banners="banners" :isStatic="true" :height="320"></banner>
        <section class="content">
            <article class="list-group list-group__join">
                <div class="container">
                    <h2 class="list-group-title">
                        <span class="big">加入我们</span>
                        <small class="small">Join us</small>
                    </h2>
                    <div class="list-group-content">
                        <div class="apply-steps">
                            <h4 class="sub-title">应聘流程</h4>
                            <ul class="apply-steps clearfix">
                                <li class="apply-step__item icon-arrow-right fl pr" v-for="(item, idx) in txt.join.items" :key="idx">
                                    <i :class="[item.iconCls]" class="icon">
                                        <i v-if="item.path !== undefined" v-for="(path, i) in item.path" :key="i"
                                             :class="'path' + (i + 1)"></i>
                                    </i>
                                    <p class="txt">{{item.title}}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="recruit">
                            <el-collapse v-if="recruitment.length" accordion>
                                <el-collapse-item v-for="(item, idx) in recruitment" :key="idx" :title="item.positionName" :name="idx">
                                    <div class="about-wrapper">
                                        <span class="about">工作职位：<i class="bold">{{item.positionName}}</i></span>
                                        <span v-if="item.department" class="about">部门：<i class="bold">{{item.department}}</i></span>
                                        <span class="about">发布日期：<i class="bold">{{item.createTime | dateFormat('yyyy-MM-dd')}}</i></span>
                                        <span class="about">薪资待遇：<i class="bold">{{item.money}}</i></span>
                                        <span v-if="item.workYear" class="about">工作年限：<i class="bold">{{item.workYear}}</i></span>
                                        <span class="about">学历：<i class="bold">{{item.education}}</i></span>
                                        <span class="about">招聘人数：<i class="bold">{{item.recruitNum}}人</i></span>
                                        <span v-if="item.expire" class="about">职位有效期：<i class="bold">{{item.expire}}</i></span>
                                        <span v-if="item.language" class="about">语言：<i class="bold">{{item.language}}</i></span>
                                    </div>
                                    <div class="recruit-content">
                                        <div class="responsibility">
                                            <h5 class="sub-title">【岗位职责】</h5>
                                            <p v-html="item.duty"></p>
                                        </div>
                                        <div class="requirement">
                                            <h5 class="sub-title">【岗位要求】</h5>
                                            <p v-html="item.requirement"></p>
                                        </div>
                                        <div class="btn-row">
                                            <a class="btn-apply" href='mailto: hr@xk100.com'>申请职位</a>
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                            <div v-else class="no-data">暂无招聘信息</div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    </div>
</template>

<script>
    import banner from '@/components/common/banner.vue'
    import banner01 from '@/assets/img/about/about_us.png'
    import { requestRecruitList } from '@/service/join.js'

    export default {
        name: 'aboutUs',

        data() {
            return {
                banners: [banner01],
                recruitment: [],
                txt: {
                    join: {
                        items: [
                            {
                                title: '选择岗位',
                                iconCls: 'icon-select-post',
                            },
                            {
                                title: '投递简历',
                                iconCls: 'icon-delivery-resume',
                                path: 8,
                            },
                            {
                                title: '电话面试',
                                iconCls: 'icon-calling',
                            },
                            {
                                title: '现场面试',
                                iconCls: 'icon-live-interview',
                            },
                            {
                                title: '确定录用',
                                iconCls: 'icon-recruitment',
                            },
                            {
                                title: '正式入职',
                                iconCls: 'icon-be-employee',
                            },
                        ]
                    },
                },
            }
        },

        created() {
            this.getRecruitData()
        },

        methods: {
            getRecruitData() {
                requestRecruitList().then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity || {}
                        this.recruitment = _data.resultData || []
                    }
                })
            }
        },

        components: {
            banner,
        },
    }
</script>

<style lang="scss">
@import '~@/assets/css/scss/vars.scss';
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
    .list-group {
        padding-bottom: 50px;
        & + .list-group:not(.bg-gray) {
            margin-top: 34px;
        }
        .img-center {
            margin: 0 auto;
        }
        .list-group-title {
            box-sizing: border-box;
            height: 200px;
            padding-top: 86px;
            text-align: center;
            font-size: 36px;
            .big {
                display: block;
                margin-bottom: -12px;
            }
            .small {
                font-size: 18px;
            }
        }
        .list-group-content {
            .list-group-desc {
                margin-bottom: 40px;
                font-size: 14px;
                line-height: 1.5;
                text-align: center;
            }
        }
        .list-group-main__item {
            font-size: 0;
            .icon, .txt {
                display: inline-block;
                vertical-align: middle;
            }
            .icon {
                box-sizing: border-box;
                width: 60px;
                height: 60px;
                margin-right: 20px;
                text-align: center;
                font-size: 38px;
                color: nth($default-color, 1);
            }
            .txt {
                font-size: 14px;
                color: #999;
            }
            .title {
                margin-bottom: 12px;
                font-size: 24px;
                color: #333;
            }
        }
    }

    .list-group__join {
        margin-top: 0 !important;
        color: #333;
        .apply-steps {
            .sub-title {
                margin-bottom: 60px;
                font-size: 24px;
                text-align: center;
            }
            .apply-step__item {
                $fs: 16px;
                box-sizing: border-box;
                width: 146px;
                height: 152px;
                border: 1px solid #ddd;
                font-size: $fs;
                text-align: center;
                &:first-child:before {
                    display: none;
                }
                & + .apply-step__item {
                    margin-left: 64px;
                    &:before {
                        position: absolute;
                        left: -33%;
                        top: 38%;
                        color: #bbb;
                        font-size: $fs * 2;
                    }
                }
                .icon {
                    $h: 56px;
                    display: block;
                    height: $h;
                    margin: 30px 0 20px;
                    font-size: $h;
                    &.icon-live-interview {
                        color: #ecac12;
                    }
                    &.icon-recruitment {
                        color: #81cb6b;
                    }
                    &.icon-be-employee {
                        color: nth($default-color, 1);
                    }
                }
            }
        }

        .recruit {
            margin-top: 60px;
            .about-wrapper {
                border-bottom: 1px solid #ddd;
                padding: 30px 20px 0;
                font-size: 0;
                .about {
                    display: inline-block;
                    width: 25%;
                    margin-bottom: 30px;
                    line-height: 1;
                    font-size: 14px;
                    color: #7b7b7b;
                }
                .bold {
                    color: #333;
                }
            }
            .recruit-content {
                padding: 0 20px 20px;
                font-size: 14px;
            }
            .requirement {
                margin-top: 30px;
            }
            .sub-title {
                line-height: 50px;
                font-weight: 600;
            }
            .list {
                // counter-reset: list;
                .item {
                    // counter-increment: list;
                    & + .item {
                        margin-top: 8px;
                    }
                    &:before {
                        content: counter(list) "、";
                    }
                }
            }
            .btn-row {
                margin-top: 20px;
                .btn-apply {
                    $h: 46px;
                    display: inline-block;
                    box-sizing: border-box;
                    width: 175px;
                    height: $h;
                    line-height: $h;
                    color: #fff;
                    font-size: 20px;
                    text-align: center;
                    background-color: nth($default-color, 1);
                }
            }
        }
    }
</style>

