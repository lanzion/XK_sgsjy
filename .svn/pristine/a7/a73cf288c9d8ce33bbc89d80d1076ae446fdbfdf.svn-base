<template>
  <div class="comment-wrapper">
    <v-comment :evaluate-data="evaluateData"></v-comment>
  </div>
</template>

<script>
  import detailEvaluation from '@/components/common/evaluation/detailEvaluation.vue'

  export default {
    name: 'courseComment', // 课程评论
    inheritAttrs: false,
    data() {
      return {
        evaluateData: {
          name: '课程', // 类型名称
          dataUrl: {
            evaluateCount: '/maker/course/evaluate/selectEvaluateCount', // 评论统计的url
            evaluateList: '/maker/course/evaluate/getList', // 评论列表url
            evaluationAdd: '/maker/course/evaluate/add' // 发表评论url
          },
          reportApi: '/maker/course/evaluate/addReport',
          params: 'courseId', // 字段名
          id: this.$route.query.id,
          labelType: '1'
        }
      }
    },
    components: {
      'v-comment': detailEvaluation
    }
  }
</script>

<style lang='scss'>

</style>
