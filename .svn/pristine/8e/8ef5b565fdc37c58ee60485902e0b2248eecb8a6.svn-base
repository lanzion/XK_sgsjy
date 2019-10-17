<template>
	<div class="works_comment">
		<v-comment :commentProps="commentProps"></v-comment>
	</div>
</template>

<script>
    import comment from '@/components/common/comment.vue'

    export default {
        name: 'works_comment',
        components: {
            'v-comment': comment
        },
        data() {
            return {
                commentProps: {
                    queryKey: 'worksId',
                    parmasKey: 'worksId', // 请求参数名
                    replyKey: 'comments', // 获取评论中的回复列表的字段
                    reportApi: 'maker/matchWorksCommentReport/add', // 举报api
                    addApi: 'maker/matchWorksComment/add', // 添加评论api
                    getListApi: 'maker/matchWorksComment/selectPager', // 获取评论列表api
                    addPraiseApi: 'maker/activity/comment/praise/add', // 点赞api
                    cancelPraiseApi: 'maker/activity/comment/praise/cancelPraise' // 取消点赞api
                }
            }
        }
    }
</script>