<template>
  <article class="course-intro-panel">
    <div class="course-intro-summary">
      <h3 class="course-intro-header clearfix">
        <span class="course-intro-title fl">{{courseDetail.name || '暂无课程名称'}}</span>
        <v-btn-group class="fr" module="course" :title.sync="courseDetail.name" :img="courseDetail.imageUrl"></v-btn-group>
      </h3>
      <div class="course-intro-other">
        <span class="total-time">学习时长：<em>{{progressInfo.learnLen || 0}}</em>分钟 </span>
        <span class="progress">学习进度：<em>{{progressInfo.proccess || 0}}% </em></span>
        <span class="count">评分：<em>{{courseDetail.score || 0}}</em>分</span>
      </div>
    </div>
    <div class="progress-wrapper">
      <el-progress class="progress-bar" :text-inside="true" :stroke-width="22" :percentage="(progressInfo.proccess || 0)"
      ></el-progress>
      <p class="tip">已学习 <em>{{progressInfo.sectionNum || 0}}</em>
        个课时，还剩{{(progressInfo.sectionSum || 0) - (progressInfo.sectionNum || 0)}}个课时。</p>
    </div>
  </article>
</template>

<script>
// import { queryStudyingProgress } from '@/service/course.js'
import { mapState } from 'vuex'
import btnGroup from 'components/common/button/com_panel_event.vue'

export default {
    name: 'courseIntro', // 课程视频页面，课程介绍
    data() {
        return {}
    },
    components: {
        'v-btn-group': btnGroup
    },
    computed: {
        ...mapState('course', ['courseDetail', 'progressInfo'])
    }
}
</script>
<style lang='scss' scoped>
  .course-intro-panel {
    height: 202px;
    box-sizing: border-box;
    margin-top: 20px;
    padding: 30px 20px;
    color: #3e3e3e;
    background-color: #fff;
  }

  .course-intro-header {
    line-height: 20px;
    margin-bottom: 12px;
    font-size: 20px;
  }

  .course-intro-other {
    font-size: 14px;
    span {
      padding: 0 16px;
      border-right: 1px solid #3e3e3e;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: 0;
      }
    }
    em {
      color: #fd8c88;
    }
  }

  .progress-wrapper {
    width: 510px;
    margin-top: 38px;
    .tip {
      margin-top: 20px;
      font-size: 16px;
    }
    em {
      color: #fd8c88;
    }
  }
</style>
