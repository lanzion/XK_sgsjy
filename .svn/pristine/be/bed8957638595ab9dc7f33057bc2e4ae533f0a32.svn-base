<template>
    <section id="discuss">
        <v-detail-evaluation :evaluateData="evaluateData"></v-detail-evaluation>
    </section>
</template>

<script>
import detailEvaluation from 'Common/evaluation/detailEvaluation.vue'

export default {
    name: 'projectDetailEvaluation',
    data() {
        return {
            evaluateData: {
                name: '项目',  // 类型名称
                dataUrl: {
                    evaluateCount: 'maker/projectEvaluate/selectEvaluateCount',   // 评论统计的url
                    evaluateList: 'maker/projectEvaluate/selectEvaluateList',     // 评论列表url
                    evaluationAdd: 'maker/projectEvaluate/add',   // 发表评论url
                },
                params: 'projectId',    // 字段名
                id: this.$route.query.id,
                labelType: '2'
            }
        }
    },
    components: {
        'v-detail-evaluation': detailEvaluation
    },
}
</script>
<style lang='scss'>
</style>
