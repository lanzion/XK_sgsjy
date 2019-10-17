<template>
	<div class="contest_comment bgw">
        <h4 class="comment-head">评论</h4>
		<v-comment :commentProps="commentProps"></v-comment>
	</div>
</template>

<script>
    import comment from '@/components/common/comment.vue'

    export default {
        name: 'contest_comment',
        components: {
            'v-comment': comment
        },
        data() {
            return {
                commentProps: {
                    queryKey: 'id',
                    parmasKey: 'matchId', // 请求参数名
                    replyKey: 'comments', // 获取评论中的回复列表的字段
                    reportApi: 'maker/matchCommentReport/add', // 举报api
                    addApi: 'maker/matchComment/add', // 添加评论api
                    getListApi: 'maker/matchComment/selectPager', // 获取评论列表api
                    addPraiseApi: 'maker/matchCommentPraise/do', // 点赞api
                    cancelPraiseApi: 'maker/matchCommentPraise/cancel', // 取消点赞api
                    replyListApi: 'maker/matchComment/selectPager/reply' // 评论 --回复列表api
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contest_comment {
        padding: 15px;
        .comment-head {
            font-size: 16px;
            margin-bottom: 12px;
        }
    }
</style>