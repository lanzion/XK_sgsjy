<template>
    <div class="container model-school">
        <h1 class="title clearfix">
            <span class="name fl">{{schoolDetail.schoolName || '暂无学校名称'}}（创客示范校）</span>
            <router-link :to="{path: `${pages.detail.school.path}`, query}" class="link fr" target="_blank">访问空间</router-link>
        </h1>
        <div class="banner-img">
            <div class="bg-img__wrap" title="点击查看原图" @click="visible.show = true" :style="{ backgroundImage: `url(${getFileUrl(schoolDetail.cover) || listDefault})` }"></div>
        </div>
        <nav class="nav">
            <router-link class="nav-link" v-for="(item, index) in navList" :key="index" :to="{path: item.path, query}">{{item.name}}</router-link>
        </nav>
        <router-view v-bind="{categoryList, schoolDetail}"></router-view>
        <img-preview :visible.sync="visible" :imgUrl="schoolDetail.cover"></img-preview>
    </div>
</template>

<script>
    import { queryModelSchoolDetail, requestAchievementCategoryList } from '@/service/model_school.js'
    import imgPreview from '@/components/common/img_preview/img_preview.vue'

    export default {
        components: {
            'img-preview': imgPreview
        },
        data() {
            return {
                categoryList: [],

                navList: [
                    {
                        name: '示范校主页',
                        path: `${this.pages.detail.model.path}/homepage`,
                    },
                    {
                        name: '创客建设',
                        path: `${this.pages.detail.model.path}/achv`,
                    },
                    {
                        name: '创客特色',
                        path: `${this.pages.detail.model.path}/feature`,
                    },
                    {
                        name: '创客荣誉',
                        path: `${this.pages.detail.model.path}/honor`,
                    },
                    {
                        name: '创客事件',
                        path: `${this.pages.detail.model.path}/event`,
                    },
                ],

                schoolDetail: {},
                visible: { // 查看大图的控制
                    show: false
                }
            }
        },
        created() {
            this.query = this.$route.query
            this.schoolId = this.query.id
            this.queryDetail()
            this.requestCategoryList()
        },
        methods: {
            async queryDetail() {
                const { schoolId } = this
                const res = await queryModelSchoolDetail({ schoolId })
                if (res.status === 200 && res.data.code === 200) {
                    this.schoolDetail = res.data.entity || {}
                }
            },
            // 成果分类列表
            async requestCategoryList() {
                const { schoolId } = this
                const res = await requestAchievementCategoryList({ schoolId })
                if (res.status === 200 && res.data.code === 200) {
                    this.categoryList = res.data.entity || []
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
@import "~@/assets/css/scss/vars.scss";
.model-school {
    .link {
        background-color: nth($default-color, 1);
        &:hover {
            background-color: #37a7fc;
        }
    }
    .nav-link {
        &:hover {
            color: nth($default-color, 1);
        }
        &.active {
            background-color: nth($default-color, 1);
            color: #fff;
        }
    }
}
    .model-school {
        .title {
            font-size: 20px;
            line-height: 52px;
            .link {
                box-sizing: border-box;
                width: 100px;
                height: 38px;
                line-height: 38px;
                margin-top: 8px;
                font-size: 16px;
                color: #fefefe;
                text-align: center;
                border-radius: 4px;
            }
        }
        .banner-img {
            height: 330px;
            background-color: #ddd;
            .bg-img__wrap {
                width: 100%;
                height: 100%;
            }
        }
    }

    .nav {
        margin: 20px 0;
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        background-color: #fff;
        box-sizing: border-box;
        .nav-link {
            display: inline-block;
            padding: 0 20px;
            border-right: 1px solid #f4f4f4;
            height: inherit;
            line-height: inherit;
            text-align: center;
            color: #333;
        }
    }
</style>
