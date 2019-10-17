<template>
    <div class="about-wrapper">
        <banner :banners="banners" :isStatic="true" :height="320"></banner>
        <section class="content">
            <article class="list-group list-group__about-us">
                <div class="container">
                    <h2 class="list-group-title">
                        <span class="big">关于我们</span>
                        <small class="small">About us</small>
                    </h2>
                    <div class="list-group-content table-layout clearfix">
                        <figure class="pic table-cell">
                            <img src="~@/assets/img/about/pic_about_us.png" alt="" width="400">
                        </figure>
                        <div class="list-group-desc table-cell">
                            <p class="phase" v-for="(desc, i) in txt.about.desc">{{desc}}</p>
                        </div>
                    </div>
                </div>
            </article>
            <article class="list-group list-group__concept">
                <div class="container">
                    <h2 class="list-group-title">
                        <span class="big">文化理念</span>
                        <small class="small">Cultural concept</small>
                    </h2>
                    <div class="list-group-content pr">
                        <el-row class="list-group-main clearfix" :gutter="60">
                            <el-col :span="8" v-for="(item, idx) in txt.concept" :key="idx" class="list-group-main__item fl">
                                <div class="txt">
                                    <i class="icon-hexagon-line pr">
                                        <i class="icon-hexagon-straight pa">
                                            <i :class="[item.iconCls]" class="icon-inner pa"></i>
                                        </i>
                                    </i>
                                    <p class="title">{{item.title}}</p>
                                    <ul class="desc">
                                        <li v-for="(desc, d) in item.desc" :key="d">{{desc}}</li>
                                    </ul>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </article>
            <article class="list-group list-group__contact bg-gray">
                <div class="container">
                    <h2 class="list-group-title">
                        <span class="big">联系我们</span>
                        <small class="small">Contact us</small>
                    </h2>
                    <div class="list-group-content pr">
                        <ul class="list-group-main clearfix">
                            <li v-for="(item, idx) in txt.contact.items" :key="idx" class="list-group-main__item fl">
                                <div class="txt">
                                    <i class="icon-hexagon-line pr">
                                        <i class="icon-hexagon-straight pa">
                                            <i :class="[item.iconCls]" class="icon-inner pa"></i>
                                        </i>
                                    </i>
                                    <p class="title">{{item.title}}</p>
                                    <p class="desc">{{item.desc}}</p>
                                </div>
                            </li>
                        </ul>
                        <figure class="map">
                            <img src="~@/assets/img/about/pic_map.png" alt="" width="1200">
                        </figure>
                    </div>
                </div>
            </article>
        </section>
    </div>
</template>

<script>
    import banner from '@/components/common/banner.vue'
    import banner01 from '@/assets/img/about/about_us.png'

    export default {
        name: 'aboutUs',

        data() {
            return {
                activeName: 0,
                banners: [banner01],
                txt: {
                    about: {
                        desc: [
                            '广东习课科技有限公司成立于2016年，是立志打造成为一个拥有庞大用户数量与丰富线下现金流量的教育+互联网的平台型创新型企业。',
                            '习课科技主要提供如下服务：“创新创业”与“创客教育”解决方案、智慧课堂与智慧校园解决方案、平安校园解决方案。',
                            '习课科技将先进的理念、顶尖的技术与优质的内容深度融合，借助大数据、云计算、人工智能、移动互联等技术，连通课内课外、打通校内校外、贯通线上线下，全面满足教师、学生、家长的需求。'
                        ],
                    },
                    concept: [
                        {
                            title: '企业愿景',
                            iconCls: 'icon-i-vision',
                            desc: [
                                '立足创新教育，培养学生的创新思维'
                            ],
                        },
                        {
                            title: '企业核心价值观',
                            iconCls: 'icon-i-coreValues',
                            desc: [
                                '不断成长，是人生唯一的任务',
                                '只想，都是问题；做了，才是答案',
                                '没有深度思考，所有的勤奋都是扯淡'
                            ],
                        },
                        {
                            title: '企业使命',
                            iconCls: 'icon-i-mission',
                            desc: [
                                '为教育鼓维新',
                                '为主板添异彩'
                            ],
                        },
                    ],
                    contact: {
                        items: [
                            {
                                title: '服务热线',
                                desc: '020-37579580',
                                iconCls: 'icon-hot-line',
                            },
                            {
                                title: '在线服务QQ',
                                desc: '3453814364',
                                iconCls: 'icon-qq',
                            },
                            {
                                title: '邮箱',
                                desc: 'service@xk100.com',
                                iconCls: 'icon-email',
                            },
                            {
                                title: '地址',
                                desc: '广州市天河区科韵路16号信息港B座三楼',
                                iconCls: 'icon-addr',
                            }
                        ]
                    },
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

        created() {},

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

    .list-group__about-us {
        .list-group-content {
            .pic {
                opacity: .3;
            }
            .list-group-desc {
                padding-left: 40px;
                font-size: 20px;
                color: #666;
                text-align: justify;
                text-indent: 2em;
                .phase {
                    margin-bottom: 1em;
                }
            }
        }
    }

    .list-group__concept {
        color: #fff;
        background: url('~@/assets/img/about/culture_bg.png') center;
        background-size: cover;
        .list-group-title {
            padding-top: 60px;
        }
        .list-group-main {
            .list-group-main__item {
                text-align: center;
                .txt {
                    $icon-size: 120px;
                    $icon-inner-size: 90px;
                    color: #fff;
                    line-height: 1.3;
                    text-align: center;
                    .title {
                        color: #fff;
                    }
                    .icon-hexagon-line {
                        font-size: $icon-size;
                        line-height: 1.2;
                    }
                    .icon-hexagon-straight,
                    .icon-inner {
                        top: 0;
                        left: 0;
                        width: $icon-size;
                        height: $icon-size;
                        line-height: $icon-size;
                        text-align: center;
                    }
                    .icon-hexagon-straight {
                        font-size: $icon-inner-size;
                    }
                    .icon-inner {
                        font-size: 44px;
                        color: nth($default-color, 1);
                    }
                }
            }
        }
    }

    .list-group__contact {
        .list-group-main {
            .list-group-main__item {
                display: inline-block;
                width: 25%;
                text-align: center;
                .txt {
                    $icon-size: 120px;
                    $icon-inner-size: 90px;
                    text-align: center;
                    .icon-hexagon-line {
                        font-size: $icon-size;
                        line-height: 1.4;
                        color: #fff;
                        text-shadow: -1px 1px 2px #ccc;
                    }
                    .icon-hexagon-straight,
                    .icon-inner {
                        top: 0;
                        left: 0;
                        width: $icon-size;
                        height: $icon-size;
                        line-height: $icon-size;
                        text-align: center;
                    }
                    .icon-hexagon-straight {
                        font-size: $icon-inner-size;
                    }
                    .icon-inner {
                        font-size: 50px;
                        color: #d00;
                    }
                    .desc {
                        color: #666;
                    }
                }
            }
        }
        .map {
            margin-top: 52px;
        }
    }

</style>

