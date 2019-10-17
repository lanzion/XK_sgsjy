<template>
  <section class="course-intro-wrapper clearfix">
    <figure class="pic">
      <img title="点击查看原图" @click="visible.show = true" :src="getFileUrl(courseInfo.imgUrl) || listDefault" width="100%" height="100%">
    </figure>
    <div class="content">
      <h3 class="name">{{courseInfo.name}}</h3>
      <p class="desc">{{courseInfo.content}}</p>
      <div class="courseIntro-other">
        <span class="">分类：{{courseInfo.courseTypeName}}</span>
        <span class="">级别：{{courseInfo.grade}}</span>
        <span class="">适合学生：{{courseInfo.fit}}</span>
      </div>
      <p class="student">学员：<em>{{courseInfo.total}}</em></p>
    </div>
    <img-preview :visible.sync="visible" :imgUrl="courseInfo.imgUrl"></img-preview>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import listDefault from 'Asset/img/common/info.png'
  import imgPreview from '@/components/common/img_preview/img_preview.vue'

  export default {
    name: 'courseIntro', // 课程介绍
    components: {
      'img-preview': imgPreview
    },
    data () {
      return {
        listDefault,
        visible: { // 查看大图的控制
            show: false
        }
      }
    },
    computed: {
      ...mapState('course', {courseInfo: 'courseDetail'})
    },
    created () {
      this.requestCourseDetail({id: this.$route.query.id})
    },
    methods: {
      ...mapActions('course', ['requestCourseDetail']),
    }
  }
</script>
<style lang='scss'>
  .course-intro-wrapper .el-rate {
    display: inline-block;
    margin-right: 12px;
    vertical-align: top;
  }
</style>
<style lang='scss' scoped>
  .course-intro-wrapper {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 30px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    border: 0;
    .pic {
      float: left;
      width: 192px;
      height: 192px;
    }
    .content {
      float: left;
      width: 70%;
      padding-left: 30px;
      .name {
        font-size: 24px;
        line-height: 3;
      }
      .desc {
        margin-bottom: 1em;
        font-size: 14px;
        line-height: 1.5;
      }
      .courseIntro-other {
        margin: 34px 0 16px;
        font-size: 14px;
        color: #999;
        span {
          display: inline-block;
          height: 14px;
          padding: 0 16px;
          border-right: 1px solid #999;
          &:first-child {
            padding-left: 0;
          }
          &:last-child {
            border-right: 0;
          }
        }
      }
      .free {
        margin-top: 50px;
        font-size: 30px;
        color: #00a0e9;
      }
      .student {
        font-size: 14px;
        em {
          color: #00a0e9;
        }
      }
    }
  }
</style>
