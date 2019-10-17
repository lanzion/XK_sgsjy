<template>
	<div class="comment-box">
		<!-- 发表评论输入框 -->
		<div class="publish">
			<div class="commment-item-publishbox">
				<textarea placeholder="我来说两句(最多500字)" :maxlength="500" v-model="content" style="resize:none" v-on:keyup.enter="addEvaluation()"></textarea>
				<div class="btn-box">
					<button @click="addEvaluation()">发表</button>
				</div>
			</div>
		</div>
		<!-- 评论列表 -->
		<div class="comment-list">
			<div class="empty-block" v-if="commentList.length === 0">暂无评价</div>
			<!-- <ul class="list-box" v-else> -->
			<transition-group class="list-box" name="comment-item" mode="out-in" tag="ul">
				<li class="comment-item-detail clearfix" v-for="(comment,index) in commentList" :key="index">
					<div class="comment-item-avatar ">
						<img :src="getFileUrl(comment.url) || faceDefault" width="41" height="41">
					</div>
					<div class="comment-item-content">
						<p class="clearfix user-box">
							<span class="name fl">{{comment.userName}} </span>&nbsp;&nbsp;
							<span class="date fl"> {{comment.createDate | dateFormat('yyyy.MM.dd')}}</span>
							<span class="report fr">
								<v-report v-if="!comment.report && comment.createId !== userId" :report-data="{'url': reportApi, params: {'commentId': comment.id, status:'0'}}"></v-report>
							</span>
						</p>
						<p class="content">{{comment.content}}</p>
						<div class="option-box">
							<div class="option">
								<span class="like" @click="praiseItem(commentList,index)"><i class="icon-btn-thumbsup" :class="{'active':comment.praise}"></i> ({{comment.praisCount ? comment.praisCount : 0}}) </span>
								<span v-on:click="showPublish([index,null])" class="reply"> <i class="icon-i-reply"></i> 回复 ( {{comment.replyNum ? comment.replyNum : 0}} )</span>
							</div>
							<div class="publish" v-if="show[0] == index && show[1] == null">
								<div class="commment-item-publishbox">
									<textarea placeholder="我来说两句(最多500字)" :maxlength="500" v-model="replyContent" v-on:keyup.enter="replyComment(index,comment.id,$event)" style="resize:none"></textarea>
									<div class="btn-box">
										<button @click.prevent="replyComment(index,comment.id,$event)">发表</button>
									</div>
								</div>
							</div>
						</div>
						<!-- 回复部分 -->
						<div class="comment-item-reply" v-if="comment[replys] && comment[replys].length > 0">
							<ul>
								<li class="comment-item-detail clearfix" v-for="(reply,i) in comment[replys]" :key="i">
									<div class="comment-item-avatar">
										<img :src="getFileUrl(reply.url) || faceDefault" width="41" height="41">
									</div>
									<div class="comment-item-content">
										<p class="clearfix user-box"><span class="name fl">{{reply.userName}}</span> &nbsp;&nbsp;
											<span class="date fl"> {{reply.createDate | dateFormat('yyyy.MM.dd')}}</span>
										</p>
										<p class="content">{{reply.content}}</p>
										<div class="option-box">
											<div class="option">
												<span class="like" @click="praiseItem(comment[replys],i)"><i class="icon-btn-thumbsup" :class="{'active':reply.praise}"></i> ({{reply.praisCount}}) </span>
												<span v-on:click="showPublish([index,i])" class="reply"> <i class="icon-i-reply"></i> 回复 ( {{reply.replyNum === null ? 0 : reply.replyNum}} )</span>
											</div>
											<div class="publish" v-if="show[0] == index && show[1] == i">
												<div class="commment-item-publishbox">
													<textarea placeholder="我来说两句" :maxlength="500" v-model="replyContent" v-on:keyup.enter="replyComment(index,comment.id,$event)" style="resize:none"></textarea>
													<div class="btn-box">
														<button v-on:click="replyComment(index,comment.id,$event)">发表</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</li>
			</transition-group>
			<!-- </ul> -->
		</div>

		<!-- <div class="load-more" v-if="totalEvalu > commentList.length" @click="pageParam.pageNum++;getEvaluateList()">
			<i class="icon-btn-refresh"></i> 加载更多
        </div> -->
	</div>
</template>

<script>
	import { loginInfo } from 'Asset/js/getUserInfo.js'
	import report from '@/components/common/report.vue'
	import { worksEvaluationAdd,requestWorksCommentList } from '@/service/works.js'
	import { requestActivityEvaluationList,addEvaluation } from '@/service/activity.js'
	import { requestStoryCommentList,addStoryComment } from '@/service/story.js'
  	import {
	  	requestAchievementCommentList,
    	addAchievementComment,
    	requestFeatureCommentList,
    	addFeatureComment,
  	} from '@/service/model_school.js'

  export default {
		name:'comment',
		components:{
			'v-report': report
		},
		data() {
			return {
				userId:'',
				commentList:[],
	  			// id:'',
	  			replyPage:1,
	  			totalEvalu:0,
	  			content:'', 			//发表评论的内容
	  			replyContent:'',		//回复内容
	  			pageParam:{
	  				pageSize:10,
	  				pageNum:1
	  			},
	  			userInfo:'',
	  			form:{
	  				content:''
	  			},
	  			show: [null, null],
	  			params:{},				//获取评论列表的请求参数
	  			handler:null,			//获取评论列表的请求操作
	  			reportApi:'',  			//举报api
	  			replyKey:'',   			//回复是要传的字段名
	  			replys:'',				//获取评论中的回复的的字段
	  			addPraise:'',			//点赞api
	  			cancelPraise:''			//取消点赞api
			}
		},
		props:{
			commentData:{
				type: Object,
				default () {
					return {type:''}
				}
			}
		},
		created () {
			this.init()
		},
		watch: {
			'id' () {
				this.init()
			}
		},
		computed: {
	        remainingWordCount: function () {
	            return this.totalWordCount - this.shareContent.trim().length;
	        },
	        id: function() {
	            return this.$route.query.id;
	        }
	    },
		methods:{
			init () {
				if(loginInfo){
					this.userInfo = loginInfo.userInfo;
					this.userId = loginInfo.userInfo.id;
				}
				switch(this.commentData.type){
					case 'works':
						this.handler = requestWorksCommentList;
						this.replyKey = 'workId';
						this.params = {workId:this.$route.query.id,status:1};
						this.reportApi = 'maker/work/comment/report/add';
						this.replys = 'workComments';
						this.addPraise = 'maker/work/comment/praise/add',
	          			this.cancelPraise = 'maker/work/comment/praise/cancelPraise'
						break;
					case 'activity':
						this.handler = requestActivityEvaluationList;
						this.replyKey = 'activityId';
						this.params = {activityId:this.id};
						this.reportApi = 'maker/activity/comment/report/add';
						this.replys = 'workComments';
						this.addPraise = 'maker/activity/comment/praise/add',
	          			this.cancelPraise = 'maker/activity/comment/praise/cancelPraise'
						break;
					case 'story':
						this.handler = requestStoryCommentList;
						this.replyKey = 'storyId';
						this.params = {storyId:this.id};
						this.reportApi = 'maker/storyCommentReport/addOrUpdate';
						this.replys = 'storyComments';
						this.addPraise = 'maker/storyCommentPraise/addOrUpdate',
	          			this.cancelPraise = 'maker/storyCommentPraise/addOrUpdate'
						break;

          			case 'modelSchoolAchv':
            			this.handler = requestAchievementCommentList
            			this.replyKey = 'resultId'
            			this.params = {resultId: this.id}
            			this.reportApi = 'maker/modelSchoolResultCommentReport/add'
            			this.replys = 'resultComments'
            			this.addPraise = 'maker/modelSchoolResultCommentPraise/add'
            			this.cancelPraise = 'maker/modelSchoolResultCommentPraise/add'
            			break;

          			case 'modelSchoolFeature':
            			this.handler = requestFeatureCommentList
            			this.replyKey = 'featureId'
            			this.params = {featureId: this.id}
            			this.reportApi = 'maker/modelSchoolFeatureCommentReport/add'
            			this.replys = 'featureComments'
            			this.addPraise = 'maker/modelSchoolFeatureCommentPraise/add'
            			this.cancelPraise = 'maker/modelSchoolFeatureCommentPraise/add'
            			break;
					}
				this.commentList = [];
				this.pageParam.pageNum = 1;
				// this.totalEvalu = 0
				this.id = this.$route.query.id;
				this.getEvaluateList();
			},
			/*控制回复输入框的显示*/
			showPublish(arr){
				if(this.$ls.get('loginInfo')){
					if(
						this.show[0] != null && this.show[1] == null && arr[0] == this.show[0] && arr[1] == null ||
						this.show[0] != null && this.show[1] != null && arr[0] == this.show[0] && arr[1] == this.show[1]
					){
						this.show = [null,null];
					}else{
						this.show = arr;
					};
				}else{
					this.$store.commit('toggleLoginModal',true)
				}
			},
			/*
			*回复评论
			 */
			replyComment(index,replyCommentId,event){
				let evt = window.event||event;
				if (this.replyContent === '') {
					this.showMessage('warning','请输入评论内容');
				} else if (this.replyContent.length > 500) {
					this.showMessage('warning','输入的内容不能超过500字')
				} else {
					if (localStorage.getItem('loginInfo')) {
						this.addEvaluationRequest({[this.replyKey]:this.id,content:this.replyContent,status:1,pId:this.commentList[0].id,replyCommentId:replyCommentId},(res)=>{
							if(res.data.code === 200){
								this.showMessage('success','回复成功');
								this.getEvaluateList()
								this.replyContent = ''
								this.show = [null,null];
							}else{
								this.showMessage('warning',res.data.msg);
							}
						})
					} else{
						this.$store.commit('toggleLoginModal', true);
					}
				}
			},
			// 添加评论的请求
			addEvaluationRequest(param,callback) {
				let data = param;
				if(this.commentData.type === 'works'){
					worksEvaluationAdd(data).then(callback);
				};
				if(this.commentData.type === 'activity'){
					addEvaluation(data).then(callback);
				};
				if(this.commentData.type === 'story'){
					addStoryComment(data).then(callback)
				}
		        if (this.commentData.type === 'modelSchoolAchv') {
		          	addAchievementComment(data).then(callback)
		        }
		        if (this.commentData.type === 'modelSchoolFeature') {
		          	addFeatureComment(data).then(callback)
		        }
			},
			/*
			*发表评论
			*workId:作品Id
			*content:评论内容
			*status：状态
			 */
			addEvaluation () {
				if (this.content === '') {
					this.showMessage('warning','请输入评论内容');
				} else if (this.content.length > 500) {
					this.showMessage('warning','输入的内容不能超过500字')
				} else if(localStorage.getItem('loginInfo')) {
					this.addEvaluationRequest({[this.replyKey]: this.id, content: this.content, status:1},(res)=>{
						if(res.data.code === 200){
							this.showMessage('success','评论成功');
							this.content = '';
							this.getEvaluateList()
						}else{
							this.showMessage('error',res.data.msg)
						}
					})
				}else{
					this.$store.commit('toggleLoginModal', true);
				}
			},
			/*
			*获取评论列表
			*workId:作品Id
			*status:状态
			*
			* activityId:活动Id
			*/
			getEvaluateList () {
				this.handler(this.params, this.pageParam).then((res) => {
					this.totalEvalu = res.data.entity.totalNum
					if(this.pageParam.pageNum === 1){
						this.commentList = res.data.entity === null ? [] : res.data.entity.resultData;
					}else{
						this.commentList.push(...res.data.entity.resultData);
					}
				})
			},
			/*
			*点赞/取消点赞
			*commentId：评论id
			*status：状态(1:启用0:禁用)
			 */
			praiseItem(items,index){
				 if (localStorage.getItem('loginInfo')){
				 	let item = items[index];
				 	let url,param
				 	if(item.praise){
            			url = this.cancelPraise;
				 		param = { commentId:item.id,status:0 }
				 	}else{
            			url = this.addPraise;
				 		param = { commentId:item.id,status:1 }
				 	}

				 	this.$http.post(url,param).then((res)=>{
				 		if(res.data.code === 200){
				 			item.praise = !item.praise;
				 			if(item.praise){
				 				this.$set(item,'praisCount',++item.praisCount);
				 				this.showMessage('success','点赞成功');
				 			}else{
				 				this.$set(item,'praisCount',--item.praisCount);
				 				this.showMessage('info','取消点赞')
				 			}
				 		}else{
				 			this.showMessage('error',res.data.msg)
				 		}
				 	})
				 }else{
				 	this.$store.commit('toggleLoginModal', true);
				 }
			},
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
*{
	box-sizing: border-box;
}
.hidden{
	display: none;
}
.comment-box{
	width: 100%;
	overflow: hidden;
	// padding: 30px 20px;
}
.comment-item-detail{
	transition: opacity .5s, transform .5s;
}
.comment-item-enter,
.comment-item-leave-active {
    opacity: 0;
    transform: translateY(-30px);
}
.comment-item-leave-active {
    position: absolute;
}
/*发表*/
.publish{
	width: 100%;
	overflow: hidden;
	.commment-item-publishbox{
		width: 100%;
		overflow: hidden;
		textarea{
			width: 100%;
			height: 80px;
			border: 1px solid #dfdfdf;
			padding: 10px;
		}
		.btn-box{
			width: 100%;
			height: 50px;
			border: 1px solid #dfdfdf;
			border-top: none;
			text-align: right;
			padding: 10px;
			button{
				// background-color: #d00;
				color: #fff;
				vertical-align: top;
				border: none;
				padding: 5px 15px;
			}
			button:hover{
				opacity: .75;
				// filter: alpha(opacity=75);
			}
		}
	}
}

// 点赞回复
.option{
	color: #929292;
	span{
		cursor: pointer;
	}
	.like{
		margin-right: 10px;
	}
	i:hover{
		color: #d00;
	}
}
/*评论列表*/
.comment-list{
	width: 100%;
	overflow: hidden;
	.list-box{
		width: 100%;
		overflow: hidden;
		margin-top: 20px;
	}
}
.comment-item-detail{
	width: 100%;
	overflow: hidden;
	border-bottom: 1px solid #dfdfdf;
	padding: 20px 0;
	.comment-item-avatar{
		width: 41px;
		height: 41px;
		float: left;
		margin-right: 10px;
		img{
			border-radius: 1000px;
		}
	}
	.comment-item-content{
		padding-left: 51px;
		.user-box{
			width: 100%;
			margin-bottom: 15px;
			font-size: 14px;
			height: 15px;
			line-height: 15px;
			.date{
				margin-left: 15px;
				color: #999;
				font-size: 12px;
			}
		}
		.option-box{
			width: 100%;
			transition: opacity .5s, transform .5s;
			.publish{
				margin-top:20px;
			}
		}
		.content{
			width: 95%;
			font-size: 14px;
			line-height: 1.5em;
			overflow: hidden;
			margin-bottom: 10px;
			word-wrap: break-word;
		}
	}

	&:hover {
        .report {
            display: block;
        }
    }
    .report {
        display: none;
        float: right;
        button {
            color: #999;
        }
    }
}
/*回复*/
.comment-item-reply{
	margin-top: 20px;
	overflow: hidden;
	border-top: 1px dashed #dfdfdf;

}
.comment-item-reply .comment-item-detail{
	border-bottom: none;
	padding-bottom: 0;
	.publish{
	}
}
// 加载更多
.load-more {
    width: 100%;
    margin-top: -1px;
    font-size: 14px;
    line-height: 3;
    background-color: #f0f0f0;
    cursor: pointer;
    text-align: center;
}

@each $color-key, $color-value in $color-data {
	.theme-#{$color-key} {
		.publish {
			.commment-item-publishbox {
				.btn-box {
					button{
						background-color: $color-value;
					}
				}
				textarea:focus{
					border-color: $color-value;
				}
			}
		}
	}
}
</style>
