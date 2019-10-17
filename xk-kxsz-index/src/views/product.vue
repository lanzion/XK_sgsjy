<template>
    <div class="about-wrapper">
        <banner v-bind="{banners}" :isStatic="true" :height="320"></banner>
        <section class="content">
            <article class="list-group list-group__intelligence">
                <div class="container">
                    <h2 class="list-group-title">
                        <span class="big">智能化教务系统</span>
                        <small class="small">Intelligent educational administration system</small>
                    </h2>
                    <div class="list-group-content pr">
                        <p class="list-group-desc">{{txt.intelligence.desc}}</p>
                        <ul class="list-group-main clearfix">
                            <li v-for="(item, idx) in txt.intelligence.items" :key="idx" class="list-group-main__item fl">
                                <div class="icon-box">
                                    <i :class="[item.iconCls]" class="icon">
                                        <i v-if="item.path !== undefined" v-for="(path, i) in item.path" :key="i"
                                             :class="'path' + (i + 1)"></i>
                                    </i>
                                    <h4 class="title">{{item.title}}</h4>
                                </div>
                                <p class="content">{{item.content}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
            <article class="list-group list-group__eval bg-gray">
                <div class="container">
                    <h2 class="list-group-title">
                        <span class="big">智能化评课系统</span>
                        <small class="small">Intelligent course evaluation system</small>
                    </h2>
                    <div class="list-group-content pr">
                        <p class="list-group-desc">{{txt.eval.desc}}</p>
                        <ul class="list-group-main clearfix">
                            <li v-for="(item, idx) in txt.eval.items" :key="idx" class="list-group-main__item fl">
                                <div class="icon-box">
                                    <i :class="[item.iconCls]" class="icon">
                                        <i v-if="item.path !== undefined" v-for="(path, i) in item.path" :key="i"
                                             :class="'path' + (i + 1)"></i>
                                    </i>
                                </div>
                                <div class="txt-box bgw">
                                    <h4 class="title">{{item.title}}</h4>
                                    <p class="content">{{item.content}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
            <article class="list-group list-group__support">
                <div class="container">
                    <h2 class="list-group-title">
                        <span class="big">基础支撑平台</span>
                        <small class="small">Foundation support platform</small>
                    </h2>
                    <div class="list-group-content pr">
                        <p class="list-group-desc">{{txt.support.desc}}</p>
                        <ul class="list-group-main clearfix">
                            <li v-for="(item, idx) in txt.support.items" :key="idx" class="list-group-main__item fl">
                                <div class="icon-box">
                                    <i :class="[item.iconCls]" class="icon">
                                        <i v-if="item.path !== undefined" v-for="(path, i) in item.path" :key="i"
                                             :class="'path' + (i + 1)"></i>
                                    </i>
                                    <h4 class="title">{{item.title}}</h4>
                                </div>
                                <p class="content">{{item.content}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
        </section>
    </div>
</template>

<script>
    import banner from '@/components/common/banner.vue'

    import banner01 from 'Asset/img/about/about_ours.png'

    export default {
        name: 'aboutOurs',

        data() {
            return {
                banners: [banner01],
                txt: {
                    intelligence: {
                        desc: '围绕学校教务排课、分班、排考、排座四大核心业务，采用高效算法，并结合学校教务实际，建立智能化教务系统，实现教务工作自动化、智能化。',
                        items: [
                            {
                                title: '智能排课',
                                iconCls: 'icon-intelligent-select-course',
                                content: '涵盖班级、课程、教师设置，满足班级优先、课程优先、连堂课、合班课、必排课的精细化排课要求；一键生成适合全校、学科组长、任课教师、班级、学生/家长查看的课表。',
                                path: 8,
                            },
                            {
                                title: '智能分班',
                                iconCls: 'icon-intelligent-placement',
                                content: '满足学校新生分班、老生分班、手动调班三位一体的智能分班功能。满足文理分班、特长分班、拆班、合班的需要；同时支持成绩均衡、性别均衡、身高均衡、城乡均衡、自由分班等多种分班规则，满足大部分学校分班需要。',
                                path: 9,
                            },
                            {
                                title: '智能考务',
                                iconCls: 'icon-intelligent-exam',
                                content: '实现自动排考，自动生成考试信息、考生信息、监考信息，并支持导出打印，降低开考成本及工作量。运用科学的算法，支持按成绩、班级等规则进行排考。',
                                path: 6,
                            },
                            {
                                title: '智能排座',
                                iconCls: 'icon-intelligent-select-seat',
                                content: '以直观且智能的排座，满足老师日常排座工作的需求；以学生身高、成绩、视力、性别结合的方式，对学生座位进行智能安排；同时支持一键左移，一键右移，满足座位定期轮换的需求。',
                            },
                        ],
                    },
                    eval: {
                        desc: ' 运用网络信息技术，打破传统现场听评课限制，让听评课网络化；不再受限于场地和时间，让听评课广泛化；采用标准化评价模板，让听评课规范化；评课结果实时记录，实时统计，让听评课有理有据，进一步提升听评课作用，从而提升教学水平。',
                        items: [
                            {
                                title: '直播与录播的结合',
                                content: '运用网络信息技术，实现课堂直播与录播，让听评课不再局限于教室，专家、领导、学生、家长、教室都可在线观看课堂教学，打破了时间和场地的限制。',
                                iconCls: 'icon-broadcast',
                                path: 3,
                            },
                            {
                                title: '标准化评课模板',
                                content: '汇集专业评课指标，形成标准化评课模板，让评课有理可依，提升评课效率；同时支持自定评课指标，以满足区域特色，确保评课的科学性及合理性。',
                                iconCls: 'icon-eval-tmpl',
                            },
                            {
                                title: '评课结果智能分析',
                                content: '通过不同维度的查询条件，系统对其进行组合分析，可以得到不同维度的查询评课结果。不仅可以对单个教师的课程进行智能分析，还可以实现学校与学校之间、教师与教师之间的纵向和横向对比分析。',
                                iconCls: 'icon-intelligent-analysis',
                                path: 2,
                            },
                        ]
                    },
                    support: {
                        desc: ' 为教育管理机构应用系统、数据整合提供基础支撑，秉承开放原则，建立统一数据中心、统一门户、统一用户管理与认证授权、统一应用接入、统一运维管理，形成完整生态。',
                        items: [
                            {
                                title: '标准的数据结构',
                                iconCls: 'icon-data-structure',
                                content: '按照国标建立标准的教育基础数据库，教育资源数据库，实现对学籍系统、教师信息系统、资源公共平台数据的无缝集成，实现数据汇聚。',
                            },
                            {
                                title: '开放的应用体系',
                                iconCls: 'icon-app-system',
                                content: '采用开放式的平台架构，采取“平台+应用+服务”的模式，允许融入优质的第三方应用和服务；支持OAuth2协议，提供多种开放API，满足第三方应用数据需求。',
                            },
                            {
                                title: '高效的内容管理',
                                iconCls: 'icon-management',
                                content: '采用了一套基于 J2EE 和    AJAX    技术的企业级网站内容管理软件，集内容创作、内容审核、基于模板的内容发布、内容采集、内容检索、多媒体内容管理于一身。可由非专业人员创建内容、实现内容信息发布与共享。基于Web浏览器的操作界面易于使用，让使用者可以高效率地完成内容的创建、管理与发布。',
                            },
                            {
                                title: '统一的认证与授权',
                                iconCls: 'icon-authorization',
                                content: '建设统一的身份认证、权限管理、实名制认证系统，建设以目录服务和认证服务为基础，将组织信息、用户信息统一存储、分级授权与集中身份认证，规范应用系统的用户认证方式，提高应用系统的安全性和用户使用的方便性，实现全部应用的单点登录。',
                            },
                        ],
                    },
                },
                curSystemItem: 0
            }
        },

        created() {
        },

        components: {
            banner,
        },
    }
</script>

<style lang="stylus" scoped>
    .list-group
        padding: 90px 0
        .list-group-title
            box-sizing: border-box
            height: 95px
            text-align: center
            font-size: 36px
            .big
                display: block
                margin-bottom: -12px
            .small
                font-size: 18px
        .list-group-content
            .list-group-desc
                margin-bottom: 56px
                font-size: 14px
                line-height: 1.5
                text-align: center
        .list-group-main__item
            box-sizing: border-box
            width: 25%
            padding: 0 28px
            font-size: 14px
            color: #333
            .icon-box
                text-align: center
            .icon
                box-sizing: border-box
                display: block
                height: 60px
                margin: 0 auto
                font-size: 58px
            .title
                margin-top: 12px
                font-size: 24px
            .content
                margin-top: 50px
                line-height: 1.6

    .list-group__eval
        padding: 60px 0
        .list-group-main__item
            width: 385px
            border: 1px solid #ddd
            padding: 0
            box-shadow: 0 0 6px 1px #ddd
            & + .list-group-main__item
                margin-left: 20px
            .icon
                height: 170px
                line-height: @height
                font-size: 90px
                &.icon-eval-tmpl
                    color: #3a94f1
            .txt-box
                box-sizing: border-box
                height: 310px
                border-top: 1px solid #ddd
                padding: 0 18px
                .title
                    line-height: 120px
                .content
                    margin-top: 0
                    line-height: 2

    .list-group__support
        .list-group-main
            border: 1px solid #ddd
            box-shadow: 0 0 40px #feeeee
            padding: 20px 0
            .list-group-main__item
                height: 385px
                padding-top: 40px
                & + .list-group-main__item
                    border-left: @border
                .icon:before
                    color: #f13a3a
                .content
                    text-align: justify
</style>

