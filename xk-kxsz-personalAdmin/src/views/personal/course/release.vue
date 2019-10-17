<template>
  <div class="course-release__wrapper bgw">
    <el-steps :space="300" :active="step" class="course-release-step">
      <el-step title="课程基本信息"></el-step>
      <el-step title="课程安排"></el-step>
    </el-steps>
    <keep-alive>
      <release-info v-if="step === 1" @on-change-step="changeStep"></release-info>
      <release-add v-else-if="step === 2" @on-change-step="changeStep" :first-step-data="firstStepData"
                   :edit-course-data="editCourseData"></release-add>
    </keep-alive>
  </div>
</template>

<script>
  import releaseAdd from '@/components/course/course_release_add.vue'
  import releaseInfo from '@/components/course/course_release_info.vue'
  // import { requestBackendCourseInfo } from '@/service/course.js'

  export default {
    name: 'courseRelease', // 后台课程发布
    data() {
      return {
        editCourseData: {}, // 修改课程的后台返回数据
        firstStepData: {}, // 课程基本信息数据
        step: 1 // 发布流程：1基本信息，2：课程安排
      }
    },
    components: {
      releaseAdd,
      releaseInfo
    },
    created() {},
    methods: {
      changeStep(step, data, editCourseData) { // 跳转下一步、上一步
        this.step = step
        data && (this.firstStepData = data)
        editCourseData && (this.editCourseData = editCourseData)
      }
    }
  }
</script>

<style lang="scss">
  /*@import '../../../../asset/scss/admin_projectForm.scss';*/
  @import "~@/assets/css/scss/form.scss";
</style>
<style lang='scss'>
  .course-release-step {
    margin-bottom: 20px;
    padding-left: 290px;
    .el-step .el-step__title {
      margin-left: -13px;
    }
    .el-step:nth-child(1) .el-step__title {
      margin-left: -26px;
    }
  }
</style>

<style lang="scss" scoped>
  .course-release__wrapper{
    padding: 15px;
  }
</style>
