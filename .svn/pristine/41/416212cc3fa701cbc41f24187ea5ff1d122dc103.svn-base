<template>
    <div id="schoolSpace" class="container informationBar clearfix">
        <h1 class="title">{{schoolDetail?schoolDetail.schoolName:''}}<sub class="title_sub">{{schoolDetail?schoolDetail.provinceName:''}}{{schoolDetail?schoolDetail.cityName:''}}{{schoolDetail?schoolDetail.areaName:''}}</sub></h1>
        <div class='banner-img' title="点击查看原图" @click="visible.show = true" :style='{backgroundImage: "url(" + getFileUrl(schoolDetail?schoolDetail.backgroundUrl:null) + "), url(" + listDefault + ")"}'></div>
        <nav class="title_nav">
            <router-link class="title_nav_link" v-for="(item, index) in navList" :key="index" :to="{ path: item.path, query: {id: $route.query.id} }">{{ item.name }}</router-link>
        </nav>
        <router-view :schoolDetail="schoolDetail"></router-view>
        <img-preview :visible.sync="visible" :imgUrl="schoolDetail.backgroundUrl"></img-preview>
    </div>
</template>

<script>
import { scrollToTop } from '@/js/scrollToTop.js'
import { schoolDetails } from '@/service/homePage.js'
import imgPreview from '@/components/common/img_preview/img_preview.vue'

export default {
  name: 'schoolSpace',
  components: {
    'img-preview': imgPreview
  },
  data() {
    return {
         navList: [
                {
                    name: '学校主页',
                    path: '/schoolSpace/homePage'
                },{
                    name: '学校资讯',
                    path: '/schoolSpace/information'
                },{
                    name: '学校作品',
                    path: '/schoolSpace/works'
                },{
                    name: '学校资源',
                    path: '/schoolSpace/resource'
                },{
                    name: '学校活动',
                    path: '/schoolSpace/activity'
                },{
                    name: '学校课程',
                    path: '/schoolSpace/schoolCourse'
                },{
                    name: '学校项目',
                    path: '/schoolSpace/schoolProject'
                },{
                    name: '学校课题',
                    path: '/schoolSpace/subject'
                },{
                    name: '学校统计',
                    path: '/schoolSpace/schoolStatistical'
                }
            ],
            schoolDetail: null,
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    mounted() {
        scrollToTop()
        schoolDetails({id: this.$route.query.id}).then(res => {
            if(res.data.code === 200 && res.data.entity != null) {
                this.schoolDetail = res.data.entity
            }
        })
    }
}
</script>

<style lang='scss' scoped>
@import './../../../asset/scss/space_homepage.scss';
.banner-img {
    width: 1200px;
    height: 300px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>