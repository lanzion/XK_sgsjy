<template>
	<!-- 评论部分 -->
		<section id="plan_comment" class="comment">
			<v-comment :commentProps="commentProps" @addComment="addComment"></v-comment>
		</section>
</template>

<script type="text/javascript">

	import comment from 'Common/comments/comment.vue';
	export default {
   	name: 'planComment',
  	components: {
  		'v-comment':comment
		},
  	data () {
  		return {
        commentProps:{
          parmasKey: 'businessPlanId',
          replyKey: 'comments',
          addApi: 'maker/business/planComment/add',
          reportApi: 'maker/businessPlanCommentReport/add',
          getListApi: 'maker/business/planComment/list',
          addPraiseApi: 'maker/businessPlanCommentPraise/add',
          cancelPraiseApi: 'maker/businessPlanCommentPraise/add'
        }
  		}
  	},
  	methods: {
      addComment(){
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