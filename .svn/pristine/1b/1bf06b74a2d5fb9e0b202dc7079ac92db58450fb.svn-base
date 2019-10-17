<template>
    <!-- 评论部分 -->
        <div id="activity_comment" class="comment">
            <v-comment :commentProps="commentProps" @addComment="addComment"></v-comment>
        </div>
</template>

<script type="text/javascript">
    import comment from 'Common/comments/comment.vue'

    export default {
        name: 'activityComment',
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
        },
        methods: {
            addComment() {
                this.$emit('commentAdd')
            }
        }
    }
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}
.comment{
    width: 100%;
    overflow: hidden;
    padding: 15px;
}
</style>