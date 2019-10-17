<template>
    <div id="schoolSpace" class="container informationBar clearfix">
        <h1 class="title">广东省实验中学<sub class="title_sub">广东省广州市天河区</sub></h1>
        <img src="./../../asset/img/moment/school-banner.png" height="300" width="1200" class="title_img">
        <nav class="title_nav">
            <router-link class="title_nav_link" to="/schoolSpace/schoolHomePage">学校主页</router-link>
            <router-link class="title_nav_link" to="/schoolSpace/works">学校作品</router-link>
            <router-link class="title_nav_link" to="/schoolSpace/resource">学校资源</router-link>
            <router-link class="title_nav_link" to="/schoolSpace/activity">学校活动</router-link>
            <router-link class="title_nav_link" to="/schoolSpace/schoolCourse">学校课程</router-link>
            <router-link class="title_nav_link" to="/schoolSpace/schoolProject">学校项目</router-link>
            <router-link class="title_nav_link" to="/schoolSpace/schoolSubject">学校课题</router-link>
            <router-link class="title_nav_link" to="/schoolSpace/schoolStatistical">学校统计</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import { scrollToTop } from '@/js/scrollToTop.js'
export default {
  name: 'schoolSpace',
  created() {
    scrollToTop()
  }
}
</script>

<style lang='scss' scoped>
@import './../../asset/scss/space_homepage.scss';
</style>