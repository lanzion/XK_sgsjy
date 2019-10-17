<template>
    <div id="educationBureauSpace" class="container informationBar clearfix">
        <h1 class="title">{{eduDetail?eduDetail.eduName:''}}<span class="title_sub">{{eduDetail?eduDetail.provinceName:''}}{{eduDetail?eduDetail.cityName:''}}{{eduDetail?eduDetail.areaName:''}}</span></h1>
        <div class='banner-img' :style='{backgroundImage: "url(" + getFileUrl((eduDetail?eduDetail.backgroundUrl:null)) + "), url(" + listDefault + ")"}'></div>
        <nav class="title_nav">
            <router-link class="title_nav_link" v-for="(item, index) in navList" :key="index" :to="{ path: item.path, query: {id: $route.query.id} }">{{ item.name }}</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import { scrollToTop } from '@/js/scrollToTop.js'
import { eduDetails } from '@/service/homePage.js'
export default {
    name: 'educationBureauSpace',
    data () {
        return {
            navList: [
                {
                    name: '主页',
                    path: '/educationBureauSpace/homepage'
                },{
                    name: '资讯',
                    path: '/educationBureauSpace/information'
                },{
                    name: '作品',
                    path: '/educationBureauSpace/works'
                },{
                    name: '资源',
                    path: '/educationBureauSpace/resources'
                },{
                    name: '课程',
                    path: '/educationBureauSpace/course'
                },{
                    name: '项目',
                    path: '/educationBureauSpace/project'
                },{
                    name: '活动',
                    path: '/educationBureauSpace/activity'
                },{
                    name: '课题',
                    path: '/educationBureauSpace/subject'
                },{
                    name: '统计',
                    path: '/educationBureauSpace/statistical'
                }
            ],
            eduDetail: null
        }
    },
    mounted() {
        scrollToTop()
        eduDetails({id: this.$route.query.id}).then(res => {
            if(res.data.code === 200 && res.data.entity != null) {
                this.eduDetail = res.data.entity
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
@import '~@/asset/scss/space_homepage.scss';
.banner-img {
    width: 1200px;
    height: 300px;
    background-size: cover;
    background-position: center;
}
</style>
