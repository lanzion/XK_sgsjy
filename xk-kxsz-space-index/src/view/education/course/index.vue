<template>
  <div class="edu-course">
    <banner></banner>
    <div class="container list-wrapper">
      <div class="list-group hot-course">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">热门课程</em></span>
          <a @click="requestHotList" class="btn-refresh fr" href="javascript:;">
            <i class="icon-btn-refresh"></i>换一换
          </a>
        </p>
        <list v-bind="{items: hotList, listData}">
          <template scope="props">
            <figure class="list-item-img__box">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="bg-img__wrap"> -->
            </figure>
            <h6 class="list-item-title clearfix">
              <span class="name fl ellipsis">{{props.item.name || '暂无课程名称'}}</span>
              <!--<span class="score fr">{{props.item.score || 0}}分</span>-->
            </h6>
            <p class="other-info clearfix">
              <span class="free-or-not fl">{{handleIsFree(props.item.isFree)}}</span>
              <span class="num fr">{{props.item.num || 0}}人学习</span>
            </p>
          </template>
        </list>
      </div>
      <div class="list-group favorite-course">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">猜你喜欢</em></span>
          <a @click="requestFavoriteList" class="btn-refresh fr" href="javascript:;">
            <i class="icon-btn-refresh"></i>换一换
          </a>
        </p>
        <list v-bind="{items: favoriteList, listData}">
          <template scope="props">
            <figure class="list-item-img__box">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.cover) || listDefault" class="bg-img__wrap" /> -->
            </figure>
            <h6 class="list-item-title clearfix">
              <span class="name fl ellipsis">{{props.item.name || '暂无课程名称'}}</span>
              <!--<span class="score fr">{{props.item.score || 0}}分</span>-->
            </h6>
            <p class="other-info clearfix">
              <span class="free-or-not fl">{{handleIsFree(props.item.isFree)}}</span>
              <span class="num fr">{{props.item.num || 0}}人学习</span>
            </p>
          </template>
        </list>
      </div>
      <div class="list-group favorite-teacher">
        <p class="list-group__title clearfix">
          <span class="fl"><em class="font-large">明星教师</em></span>
          <a @click="requestFavoriteTeacherList" class="btn-refresh fr" href="javascript:;">
            <i class="icon-btn-refresh"></i>换一换
          </a>
        </p>
        <list v-bind="{items: favoriteTeacherList, listData: teacherListData}">
          <template scope="props">
            <figure class="list-item-img__box pr">
              <div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
              <!-- <img :src="getFileUrl(props.item.face) || squareFaceDefault" class="bg-img__wrap" /> -->
              <figcaption class="teacher-name pa">{{props.item.name || '暂无'}}</figcaption>
            </figure>
          </template>
        </list>
      </div>
    </div>
  </div>
</template>

<script>
  import { requestHotCourseList, requestFavoriteCourseList, requestFavoriteTeacherList } from '@/service/course.js'
  import banner from '@/components/common/banner.vue'
  import list from '@/components/common/classificationList/list/graphic/list.vue'

  export default {
    name: 'eduCourse',

    data () {
      return {
        favoriteList: [],
        favoriteTeacherList: [],
        hotList: [],
        listData: {
          col: 5,
          pathUrl: '/education/course/detail/info',
          params: {
            names: 'id',
            val: 'id'
          }
        },
        teacherListData: {
          col: 5,
          pathUrl: '/teacherSpace',
          params: {
            names: 'id',
            val: 'id'
          }
        },
        pageParam: {
          pageSize: 5,
          pageNum: 1,
        },
      }
    },

    created () {
      this.requestHotList()
      this.requestFavoriteList()
      this.requestFavoriteTeacherList()
    },

    components: {
      banner,
      list
    },

    methods: {
      // 获取热门课程
      async requestHotList () {
        const res = await requestHotCourseList(this.pageParam)

        if (res.status === 200 && res.data.code === 200) {
          const {resultData} = res.data.entity || {}
          this.hotList = resultData || []
        }
      },

      // 获取猜你喜欢
      async requestFavoriteList () {
        const res = await requestFavoriteCourseList(this.pageParam)

        if (res.status === 200 && res.data.code === 200) {
          const {resultData} = res.data.entity || {}
          this.favoriteList = resultData || []
        }
      },

      // 明星教师
      async requestFavoriteTeacherList () {
        const res = await requestFavoriteTeacherList(this.pageParam)

        if (res.status === 200 && res.data.code === 200) {
          const {resultData} = res.data.entity || {}
          this.favoriteTeacherList = resultData || []
        }
      },

      // 处理费用类型
      handleIsFree (i) {
        const source = {1: '免费', 0: '收费'}
        return source[i] || '免费'
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "~@/asset/scss/item_list.scss";
  @import "~@/asset/scss/cols.scss";

  .list-wrapper {
    margin-top: 30px;
  }

  .edu-course .hot-course, .edu-course .favorite-course {
    .list-item-img__box {
      height: 148px;
      .bg-img__wrap {
        height: 148px;
      }
    }
  }

  .edu-course .favorite-teacher .list-item-img__box {
    height: 240px;
    .bg-img__wrap {
      height: 240px;
    }
    .teacher-name {
      bottom: 0;
      left: 0;
      width: 100%;
      height: 24px;
      display: none;
      line-height: 24px;
      background-color: rgba(0, 0, 0, .3);
      color: #fefefe;
      font-size: 14px;
      text-align: center;
    }
    &:hover .teacher-name {
      display: block;
    }
  }

  .list-item-title {
    line-height: 2;
    font-size: 14px;
    .score {
      display: inline-block;
      font-size: 12px;
      color: #fd8c88;
    }
    .name {
      display: inline-block;
      max-width: 180px;
    }
  }

  .other-info {
    line-height: 1;
    font-size: 12px;
    .free-or-not {
      color: #2bbb61;
    }
  }
</style>


