<template>
  <div id="courseTest" class="course-test bgw">
    <!-- <v-breadcrumb></v-breadcrumb> -->
    <div class="test-wrapper">
      <div class="test-header">
        <h2 class="title">{{courseDetail.name}}</h2>
        <p class="tip">完成测验，达到要求后将自动报名该课程。</p>
        <!--<p class="countdown">倒计时： <em>60:00</em></p>-->
      </div>
      <test-question></test-question>
      <div class="btn-box">
        <button class="bs-search-button i-form-button is-plain" @click.prevent="$router.go(-1)">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  // import breadcrumb from 'components/common/admin_breadcrumb.vue'
  import testQuestion from '@/components/space/course/test_question.vue'

  export default {
    name: 'courseTestPreview', // 课程考试
    data () {
      return {}
    },
    components: {
      // 'v-breadcrumb': breadcrumb,
      testQuestion
    },
    computed: {
      ...mapState('course', ['courseDetail'])
    },
    created () {
      this.requestCourseDetail({id: this.$route.query.id})
    },
    methods: {
      ...mapActions('course', ['requestCourseDetail'])
    }
  }
</script>

<style lang='scss'>
  #courseTest{
    padding: 15px;
    .btn-box{
      margin-top: 20px;
      button{
        width: 65px;
        height: 34px;
        border-radius: 3px;
      }
    }
  }
  #courseTest .test-header {
    text-align: center;
    .title {
      font-size: 24px;
    }
    .tip {
      margin-top: 6px;
      font-size: 12px;
      color: #999;
    }
    .countdown {
      margin-top: 22px;
      font-size: 14px;
    }
  }
</style>
