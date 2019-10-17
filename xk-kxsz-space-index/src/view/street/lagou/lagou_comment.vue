<template>
	<!-- 评论部分 -->
		<section id="lagou_comment" class="comment">
			<v-comment :commentProps="commentProps" @addComment="addComment"></v-comment>
		</section>
</template>

<script type="text/javascript">

	import comment from 'Common/comments/comment.vue';
	export default {
   	name: 'lagouComment',
  	components: {
  		'v-comment':comment
		},
  	data () {
  		return {
        commentProps:{},
        type: this.$route.params.type
  		}
  	},
    created(){
      if(this.type == '1'){
        this.commentProps = {
          parmasKey: 'serveId',
          replyKey: 'comments',
          addApi: 'maker/serveComment/add',
          reportApi: 'maker/serveCommentReport/add',
          getListApi: 'maker/serveComment/selectPager',
          addPraiseApi: 'maker/serveCommentPraise/add',
          cancelPraiseApi: 'maker/serveCommentPraise/add'
        }
      }else{
        this.commentProps = {
          parmasKey: 'demandId',
          replyKey: 'comments',
          addApi: 'maker/demandComment/add',
          reportApi: 'maker/demandCommentReport/addOrUpdate',
          getListApi: 'maker/demandComment/selectPager',
          addPraiseApi: 'maker/demandCommentPraise/addOrUpdate',
          cancelPraiseApi: 'maker/demandCommentPraise/addOrUpdate'
        }
      }
    },
  	methods: {
      addComment(){
        this.$emit('commentAdd');
        this.$emit('commentChange');
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