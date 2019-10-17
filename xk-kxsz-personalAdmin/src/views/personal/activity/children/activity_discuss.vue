<template>
    <div id="activity_discuss">
        <v-comment :commentProps="commentProps"></v-comment>
    </div>
</template>

<script>
    import comment from 'Common/comments/comment.vue'

    export default {
        name: 'activity_discuss',
        components: {
            'v-comment': comment
        },
        data() {
            return {
                commentProps: {
                    parmasKey: 'activityId',
                    replyKey: 'comments',
                    addApi: 'maker/activity/comment/add',
                    reportApi: 'maker/activity/comment/report/add',
                    getListApi: 'maker/activity/comment/selectPager',
                    addPraiseApi: 'maker/activity/comment/praise/add',
                    cancelPraiseApi: 'maker/activity/comment/praise/cancelPraise'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
#activity_discuss{
    padding: 5px 15px 15px;
}
</style>