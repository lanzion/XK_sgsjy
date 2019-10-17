<template>
    <!-- 评论部分 -->
        <section id="story_comment" class="comment">
            <v-comment :commentProps="commentProps" @addComment="addComment"></v-comment>
        </section>
</template>

<script type="text/javascript">
    import comment from 'Common/comments/comment.vue'

    export default {
        name: 'storyComment',
        components: {
            'v-comment': comment
        },
        data() {
            return {
                commentProps: {
                    parmasKey: 'storyId',
                    replyKey: 'comments',
                    addApi: 'maker/storyComment/add',
                    reportApi: 'maker/storyCommentReport/addOrUpdate',
                    getListApi: 'maker/storyComment/selectPager',
                    addPraiseApi: 'maker/storyCommentPraise/addOrUpdate',
                    cancelPraiseApi: 'maker/storyCommentPraise/addOrUpdate'
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
    padding: 0 15px 15px;
}
</style>