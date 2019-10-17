<template>
	<section id="street_comment" class="street-comment">
		<!-- 发表评论输入框 -->
		<div class="publish">
			<div class="commment-item-publishbox">
				<textarea placeholder="我来说两句(最多500字)" :maxlength="500" v-model="content" v-on:keyup.enter="addEvaluation()"></textarea>
				<div class="btn-box">
					<button @click="addEvaluation()">发表</button>
				</div>
			</div>
		</div>
		<!-- 评论列表 -->
		<div class="comment-list">
			<transition-group class="list-box" v-if="commentList.length > 0" name="list-item" mode="out-in" tag="ul">
				<li class="list-item-detail clearfix" v-for="(item,index) in commentList" :key="index">
					<div class="face-box fl">
						<img :src="getFileUrl(item[avatar]) || faceDefault">
					</div>
					<div class="content-box clearfix">
						<div class="name-date">
							<span class="name" style="color:#00a0e9">{{item.userName}}</span>
							<span class="name" v-if="item[receiveName]">回复</span>
							<span class="name" style="color:#00a0e9">{{item[receiveName]}}</span>
							<span class="date">{{item.createDate | dateFormat('yyyy.MM.dd')}}</span>
						</div>
						<div class="comment-content">
							{{item.content}}
						</div>
						<div class="operate-box">
							<span class="reply-btn" @click="showReplyBox(index)"><i class="icon-btn-reply"></i>回复</span>
							<div class="publish" v-if="show == index">
								<div class="commment-item-publishbox">
									<textarea placeholder="我来说两句(最多500字)" :maxlength="500" v-model="replyContent" v-on:keyup.enter="replyEvaluation(item.id)"></textarea>
									<div class="btn-box">
										<button @click="replyEvaluation(item.id)">发表</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>
			</transition-group>
			<div v-else class="empty-block">暂无评论</div>
		</div>
		<div class="load-more" v-if="totalEvalu > commentList.length" @click="pageParam.pageNum++;getCommentList()">
			<i class="icon-btn-refresh"></i> 加载更多
        </div>
	</section>
</template>

<script>
	import { addPlanComment,requestPlanCommentList } from '@/service/businessPlan.js'
	import { requestStoryCommentList,addStoryComment } from '@/service/story.js'
	export default {
		name:'street_comment',
		data(){
			return {
				pageParam:{
	  				pageSize:10,
	  				pageNum:1
	  			},
				commentList:[],
				handler:null,			//获取评论列表的请求操作
				paramKey:'',
				content:'',				//发表评论内容
				replyContent:'',
				userId:'',  				//当前登录人id
				id:'',						//详情id
				totalEvalu:0,				//评论总数
				show:null,
				avatar:'',					//获取头像的字段名
				receiveName:''				//获取被回复者的字段名
			}
		},
		props:{
			module:{
				type:String,
				default:''
			}
		},
		created(){
			if(this.$ls.get('loginInfo')){
				this.userId = this.$ls.get('loginInfo').userInfo.id;
			};
			this.id = this.$route.query.id;
			switch(this.module){
				case 'plan':
					this.handler = requestPlanCommentList;
					this.paramKey = 'businessPlanId';
					this.avatar = 'face';
					this.receiveName = 'receiveName';
					break;
				case 'story':
					this.handler = requestStoryCommentList;
					this.paramKey = 'storyId';
					this.avatar = 'url';
					this.receiveName = 'replyUserName';
					break;
				default:
					break;
			};
			this.getCommentList()
		},
		methods:{
			showReplyBox(index){
				if(this.$ls.get('loginInfo')){
					if(this.show != null && this.show == index){
						this.show = null;
					}else{
						this.show = index;
					}
				}else{
					this.$store.commit('toggleLoginModal', true);
				}
			},
			// 添加评论的请求
			addEvaluationRequest(contentKey,pId,callback) {
				if(this.module === 'plan'){
					addPlanComment({createId:this.userId,businessPlanId:this.id,content:this[contentKey],pId:pId}).then(callback);
				};
				if(this.module === 'story'){
					addStoryComment({storyId:this.id,content:this[contentKey],pId:pId,replyCommentId:pId}).then(callback)
				}
			},
			// 发表评论
			addEvaluation(){
				if(this.content === ''){
					this.showMessage('warning','请输入评论内容')
				}else if(this.content.length > 500){
					this.showMessage('warning','评论内容不能超过500字符')
				}else{
					if(this.$ls.get('loginInfo')){
						this.addEvaluationRequest('content','',(res) => {
							if(res.data.code === 200){
								this.showMessage('success','发表成功');
								this.getCommentList();
								this.content = '';
								this.$emit('addComment')
							}else{
								this.showMessage('error',res.data.msg)
							}
						})
					}else{
						this.$store.commit('toggleLoginModal', true);
					}
				}
			},
			// 评论回复
			replyEvaluation(pId){
				if(this.replyContent === ''){
					this.showMessage('warning','请输入评论内容')
				}else if(this.replyContent.length > 500){
					this.showMessage('warning','评论内容不能超过500字符')
				}else{
					if(this.$ls.get('loginInfo')){
						this.addEvaluationRequest('replyContent',pId,(res) => {
							if(res.data.code === 200){
								this.showMessage('success','回复成功');
								this.getCommentList();
								this.show = null;
								this.replyContent = '';
								this.$emit('addComment')
							}else{
								this.showMessage('error',res.data.msg)
							}
						})
					}else{
						this.$store.commit('toggleLoginModal', true);
					}
				}
			},
			/*获取评论列表*/
			getCommentList(){
				this.handler({[this.paramKey]:this.id},this.pageParam).then((res) => {
					if(res.data.code == 200){
						this.totalEvalu = res.data.entity.totalNum;
						if(this.pageParam.pageNum === 1){
							this.commentList = res.data.entity.resultData;
						}else{
							this.commentList.push(...res.data.entity.resultData);
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/asset/scss/vars.scss';
	*{
		box-sizing: border-box;
	}
	.list-item-detail{
		transition: opacity .5s, transform .5s;
	}
	.list-item-enter,
	.list-item-leave-active {
	    opacity: 0;
	    transform: translateY(-30px);
	}
	.list-item-leave-active {
	    position: absolute;
	}
	/*发表*/
	.publish{
		width: 100%;
		overflow: hidden;
		margin-top: 10px;
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
					color: #fff;
					vertical-align: top;
					border: none;
					padding: 5px 15px;
				}
				button:hover{
					opacity: .75;
					filter: alpha(opacity=75);
				}
			}
		}
	}
	// 评论列表
	.list-item-detail{
		padding: 15px 0;
		border-bottom: 1px solid #eee;
		.face-box{
			img{
				width: 42px;
				height: 43px;
				border-radius: 1000px;
			}
		}
		.content-box{
			padding-left: 54px;
			.name-date{
				margin-bottom: 8px;
				.name{
					font-size: 14px;
					margin-right: 8px;
				}
				.date{
					color: #ccc;
					margin-right: 10px;
				}
			}
			.comment-content{
				font-size: 14px;
				line-height: 1.5em;
				margin-bottom: 10px;
				word-wrap: break-word;
			}
			.operate-box{
				.reply-btn{
					display: inline-block;
					width: 100%;
					text-align: right;
					cursor: pointer;
					color: #ccc;
					i{
						margin-right: 5px;
						color: #ccc;
					}
				}
			}
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
							background-color: $color-value
						}
					}
					textarea:focus{
						border-color: $color-value;
					}
				}
			}
			.operate-box{
				.reply-btn{
					&:hover{
						color: $color-value;
						i{
							color: $color-value;
						}
					}
				}
			}
		}
	}
</style>