<template>
    <div id="educationBureauSpace" class="container informationBar clearfix">
        <h1 class="title">{{eduDetail?eduDetail.eduName:''}}<span class="title_sub">{{eduDetail?eduDetail.provinceName:''}}{{eduDetail?eduDetail.cityName:''}}{{eduDetail?eduDetail.areaName:''}}</span></h1>
        <div class='banner-img' title="点击查看原图" @click="visible.show = true" :style='{backgroundImage: "url(" + getFileUrl((eduDetail?eduDetail.backgroundUrl:null)) + "), url(" + listDefault + ")"}'></div>
        <nav class="title_nav">
            <router-link class="title_nav_link" v-for="(item, index) in navList" :key="index" :to="{ path: item.path, query: {id: $route.query.id} }">{{ item.name }}</router-link>
        </nav>
        <router-view></router-view>
        <img-preview :visible.sync="visible" :imgUrl="eduDetail.backgroundUrl"></img-preview>
    </div>
</template>

<script>
import { scrollToTop } from '@/js/scrollToTop.js'
import { eduDetails } from '@/service/homePage.js'
import imgPreview from '@/components/common/img_preview/img_preview.vue'

export default {
    components: {
        'img-preview': imgPreview
    },
    data() {
        return {
            navList: [
                {
                    name: '主页',
                    path: `${this.pages.detail.edu.path}/homepage`
                }, {
                    name: '资讯',
                    path: `${this.pages.detail.edu.path}/information`
                }, {
                    name: '作品',
                    path: `${this.pages.detail.edu.path}/works`
                }, {
                    name: '资源',
                    path: `${this.pages.detail.edu.path}/resources`
                }, {
                    name: '课程',
                    path: `${this.pages.detail.edu.path}/course`
                }, {
                    name: '项目',
                    path: `${this.pages.detail.edu.path}/project`
                }, {
                    name: '活动',
                    path: `${this.pages.detail.edu.path}/activity`
                }, {
                    name: '课题',
                    path: `${this.pages.detail.edu.path}/subject`
                }, {
                    name: '统计',
                    path: `${this.pages.detail.edu.path}/statistical`
                }
            ],
            eduDetail: {},
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    mounted() {
        scrollToTop()
        eduDetails({ id: this.$route.query.id }).then((res) => {
            if (res.data.code === 200) {
                this.eduDetail = res.data.entity || {}
            }
        })
    }
    // computed: {
    //     routeQuery: function() {
    //         return this.$route.query;
    //     }
    // }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/space_homepage.scss';
.banner-img {
    width: 1200px;
    height: 300px;
    background-size: cover;
    background-position: center;
}
</style>
