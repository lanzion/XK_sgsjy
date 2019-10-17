<template>
  <div class="container model-school">
    <h1 class="title clearfix">
      <span class="name fl">{{schoolDetail.schoolName || '暂无学校名称'}}（创客示范校）</span>
      <router-link :to="{path: '/schoolSpace/homePage', query}" class="link fr">访问空间</router-link>
    </h1>
    <div class="banner-img">
      <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(schoolDetail.cover) || listDefault})` }"></div>
      <!-- <img :src="getFileUrl(schoolDetail.cover) || listDefault" alt="" width="1200" height="330" /> -->
    </div>
    <nav class="nav">
      <router-link class="nav-link" v-for="(item, index) in navList" :key="index"
                   :to="{path: item.path, query}">{{item.name}}</router-link>
    </nav>
    <router-view v-bind="{categoryList, schoolDetail}"></router-view>
  </div>
</template>

<script>
  import { queryModelSchoolDetail, requestAchievementCategoryList } from '@/service/model_school.js'

  export default {
    name: 'modelSchoolIndex',

    data () {
      return {
        categoryList: [],

        navList: [
          {
            name: '示范校主页',
            path: '/model/school/home',
          },
          {
            name: '创客建设',
            path: '/model/school/achv',
          },
          {
            name: '创客特色',
            path: '/model/school/feature',
          },
          {
            name: '创客荣誉',
            path: '/model/school/honor',
          },
          {
            name: '创客事件',
            path: '/model/school/event',
          },
        ],

        schoolDetail: {},
      }
    },

    created () {
      this.query = this.$route.query
      this.schoolId = this.query.id
      this.queryDetail()
      this.requestCategoryList()
    },

    methods: {
      async queryDetail () {
        const {schoolId} = this
        const res = await queryModelSchoolDetail({schoolId})

        if (res.status === 200 && res.data.code === 200) {
          this.schoolDetail = res.data.entity || {}
        }
      },

      // 成果分类列表
      async requestCategoryList () {
        const {schoolId} = this
        const res = await requestAchievementCategoryList({schoolId})

        if (res.status === 200 && res.data.code === 200) {
          this.categoryList = res.data.entity || []
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/asset/scss/vars.scss";

  @each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
      .model-school {
        .link {
          background-color: $color-value;
          &:hover {
            background-color: #37a7fc;
          }
        }
        .nav-link {
          &:hover {
            color: $color-value;
          }
          &.active {
            background-color: $color-value;
            color: #fff;
          }
        }
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
