<template>
	<section class="topic_detail">
		<el-breadcrumb separator=">">
		  	<el-breadcrumb-item :to="{ path: routePath,query:{ id: $route.query.id } }">全部话题</el-breadcrumb-item>
		  	<el-breadcrumb-item>话题详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content-box bgw">
			<!-- 话题主题 -->
			<section class="topic-title clearfix">
				<p class="title fl">{{topicDetail.title}}</p>
				<div class="btn-box fr">
					<button @click="onlyReadHost">
						<span v-if="readHost">取消只看楼主</span>
						<span v-else>只看楼主</span>
					</button>
					<button @click="goAnchor('#reply-title')" v-if="isMember">回复</button>
				</div>
			</section>
			<!-- 话题内容 -->
			<div class="list-item-detail">
				<div class="tips"><span>楼主</span></div>
				<section class="theme-box clearfix">
					<div class="avatar fl">
						<img :src="getFileUrl(topicDetail.headPortrait) || faceDefault">
						<div class="name">
							{{topicDetail.userName}}
						</div>
					</div>
					<div class="contents">
						<div class="reply-txt" v-html="topicDetail.content"></div>
					</div>
					<div class="reply-operate">
						<div class="date-reply">
							<span class="floor">楼主</span>
							<span class="date">{{topicDetail.createDate | dateFormat('yyyy-MM-dd HH:mm')}}</span>
						</div>
					</div>
				</section>
			</div>
			<!-- 评论列表 -->
			<transition-group class="topic-list" v-if="commentList.length > 0" name="list-item" mode="out-in" tag="ul">
			<!-- <ul class="topic-list" v-if="commentList.length > 0"> -->
				<li class="list-item-detail" v-for="(item,index) in commentList" :key="index">
					<div class="tips" v-if="item.createId == topicDetail.createId"><span>楼主</span></div>
					<section class="theme-box clearfix">
						<div class="avatar fl">
							<img :src="getFileUrl(item.headPortrait) || faceDefault">
							<div class="name">
								{{item.userName}}
							</div>
						</div>
						<div class="contents">
							<div class="reply-txt" v-html="item.content"></div>
						</div>
						<div class="reply-operate">
							<div class="date-reply">
								<span class="floor">{{index+1}}楼</span>
								<span class="date">{{item.createDate | dateFormat('yyyy-MM-dd HH:mm')}}</span>
								<span v-if="isMember" class="reply-btn icon-i-reply" @click="setShow"> 回复 ({{item.comments.totalNum}})</span>
								<del-popover v-if="isAdmin" title="删除" class="delete" :delData="{ url:'maker/topic/comment/del', params:{id:item.id}, name:'评论' }" @callback="getCommentList"></del-popover>
							</div>
							<v-reply :params="{ topicId: $route.query.topicId, pId: item.id, replyCommentId: item.id }" @callback="getCommentList"></v-reply>
						</div>
					</section>
					<ul class="reply-box" v-if="item.comments.resultData.length > 0">
						<li class="reply-item" v-for="(reply,idx) in item.comments.resultData" :key="idx">
							<section class="reply-content clearfix">
								<div class="avatar fl">
									<img :src="getFileUrl(reply.headPortrait) || faceDefault">
									<div class="louzhu" v-if="reply.createId == topicDetail.createId"><span>楼主</span></div>
								</div>
								<div class="reply-content-box">
									<div class="title-content clearfix">
										<div class="name fl">
											<span>{{reply.userName}}</span><span v-if="reply.toUserName">回复</span><span>{{reply.toUserName}}</span>:
										</div>
										<div class="reply-content fl">{{reply.content}}</div>
									</div>
									<div class="date-reply">
										<span class="date">{{reply.createDate | dateFormat('yyyy-MM-dd HH:mm')}}</span>
										<span class="reply-btn icon-i-reply" v-if="isMember" @click="setShow"> 回复</span>
									</div>
									<v-reply :params="{ topicId: $route.query.topicId, pId: reply.id, replyCommentId: item.id }" @callback="getCommentList"></v-reply>
								</div>
							</section>
						</li>
						<div class="open-all" v-if="item.comments.totalNum > item.comments.resultData.length" @click="replyPageNum++;getReplyList(item.id,index)">展开更多回复>></div>
						<div class="open-all" v-if="item.comments.resultData.length > 10" @click="replyPageNum = 1;getReplyList(item.id,index)">&#8593;收起更多回复</div>
					</ul>
				</li>
			<!-- </ul> -->
			</transition-group>
			<div class="empty-block" v-else>暂无评论</div>
			<v-pagination :param="param" :changePage="changePage"></v-pagination>
		</div>
		<!-- 回复 -->
		<!-- <div id="reply-box" class="bgw"> -->
		<div id="reply-box" class="bgw" v-if="isMember">
			<h5 class="reply-head" id="reply-title"><a>回复</a></h5>
			<section class="form-box">
				<el-form ref="form" :model="form" label-width="60px">
			        <el-row>
			        	<el-form-item label="内容" class="edit-box" required>
			        		<el-col :span="24">
			        			<div id="editor-trigger" style="height: 200px">
			        				<!-- <p>{{placeholder}}</p> -->
			        			</div>
			        		</el-col>
			        	</el-form-item>
			        </el-row>
			        <div style="color:#d00;margin-bottom:10px;padding-left:60px;">{{overTips}}</div>
			        <el-form-item class="btn">
			          	<el-button @click="addComment()" type="primary" style="width:96px;border-radius:.2em;">发表</el-button>
			        </el-form-item>
		       	</el-form>
			</section>
		</div>
	</section>
</template>

<script>
	import { editor } from '@/mixin/wangEditor.js'
	import { scrollToTop } from '@/js/scrollToTop.js'
	import reply from '../../../../components/classes/topic/reply.vue'
	import pagination from 'Common/pagination.vue'
	import delPopover from 'Common/del_popover.vue'
	import {
		requestTopicDetail,
		requestTopicCommentList,
		requestCommentReplyList,
		addTopicComment
	} from '@/service/topic.js'
	export default {
		name: 'topic_detail',
		mixins: [editor],
		components:{
			'v-pagination': pagination,
			'v-reply':reply,
			'del-popover':delPopover,
		},
		data() {
			return {
				param:{
					totalNum:0,
					pageSize:10,
					pageNum:1
				},
				replyPageNum:1,
				form:{
					content:''
				},
				restNum:500,
		        txtLength:'',
		        overTips:'',
		        topicDetail:{},
		        readHost:false,
		        commentList:[],
		        replyList:[],
		        routePath:'',
		        userId:'',
		        contentText:''
			}
		},
		props:['isAdmin','isMember'],
		created(){
			scrollToTop();
			let path = this.$route.path
			if(path.includes('claszSpace')){
				this.routePath = '/claszSpace/topic';
			}else if(path.includes('studioMemberDetail')) {
				this.routePath = '/studioMemberDetail/topic'
			}else{
				this.routePath = '/interestsSpace/topic'
			}
		},
		mounted() {
			this.getTopicDetail()
		    this.getCommentList()
			const self = this
			setTimeout(() => {
				if(self.isMember){
					self.init()
				}
			},300)
		},
		methods:{
			init(){
				var self = this;
				this.initEditor()
				this.editor.onchange = function () {
		           	if(self.editor.$txt.html().length > 500){
		            	self.overTips = '输入内容过多'
		            }else{
		            	self.overTips = ''
		            };
		            self.form.content = this.$txt.html();
		            self.contentText = this.$txt.text().trim().length || this.$txt.find('img').length;
		        };
			},
			goAnchor(selector) {
		        var anchor = this.$el.querySelector(selector)
		        window.scrollTo(0, anchor.offsetTop)
		        // document.body.scrollTop = anchor.offsetTop
		    },
			setShow: function (event) {
	            if(this.isMember){
	            	let evt = window.event || event;
		            let targetObj = evt.target || evt.srcElement;
		            let parentObj = targetObj.parentNode.parentNode;
		            let lastObj = parentObj.lastChild;
		            let reply = document.querySelectorAll('.reply');
		            // reply.forEach(function (i) {
		            //     i.className = 'reply'
		            // })
		            for(let i = 0; i < reply.length; i ++){
		            	reply[i].className = 'reply'
		            }
		            lastObj.className = 'reply reply-show'
	            }else{
	            	this.showMessage('warning','非成员不能回复')
	            }
	        },
			changePage(val){
				this.param.pageNum = val;
				this.getCommentList()
			},
			/*
			*主看楼主
			*/
			onlyReadHost(){
				this.readHost = !this.readHost;
				if(this.readHost){
					this.userId = this.topicDetail.userId;
				}else{
					this.userId = ''
				};
				this.getCommentList();
			},
			/*
			*话题-详情
			*id:话题id
			*isHot：是否为热门话题
			*/
			getTopicDetail(){
				let params = {
					id:this.$route.query.topicId
				}
				requestTopicDetail(params).then((res)=>{
					this.topicDetail = res.data.entity;
				})
			},
			/*
			*评论、回复
			*topicId:话题id
			*content:评论回复内容
			*pId:回复时需要传入(回复谁就传入谁的id)
			*replyCommentId:最上层的评论ID
			*/
			addComment(){
				if(localStorage.getItem('loginInfo')){
					if(this.contentText <= 0){
						this.showMessage('warning','请输入回复内容')
					}else if(this.form.content.length > 500){
						this.showMessage('warning','输入内容过长')
					} else {
						let params = {
							topicId: this.$route.query.topicId,
							content: this.form.content,
							pId: '',
							replyCommentId: ''
						}
						addTopicComment(params).then((res)=>{
							if(res.data.code === 200){
		  	   					this.showMessage('success','发表成功');
		  	   					this.editor.$txt.html('<p><br></p>');
		  	   					this.getCommentList()
		  	   					scrollToTop()
		  	   				}else{
		  	   					this.showMessage('warning',res.data.msg)
		  	   				}
						})
					}
				} else {
					this.$store.commit('toggleLoginModal', true);
				}
			},
			/*
			*话题-评论-列表(分页)
			*topicId:话题id
			*/
			getCommentList(){
				let params = {
					topicId: this.$route.query.topicId,
					userId:this.userId
				};
				requestTopicCommentList(params,{pageSize:10,pageNum:this.param.pageNum}).then((res)=>{
					this.commentList = res.data.entity.resultData;
					this.param.totalNum = res.data.entity.totalNum;
				})
			},
			/*
			*话题-评论-列表回复(分页)
			*topicId:话题id
			*/
			getReplyList(id,index){
				let params = {
					topicId: this.$route.query.topicId,
					replyCommentId: id
				};
				requestCommentReplyList(params,{pageSize:10,pageNum:this.replyPageNum}).then((res)=>{
					if(res.data.code === 200){
						if(this.replyPageNum > 1){
							this.commentList[index].comments.resultData = res.data.entity.resultData.reduce((coll,item)=>{
							    coll.push( item );
							    return coll;
							}, this.commentList[index].comments.resultData );
						}else{
							this.commentList[index].comments.resultData = res.data.entity.resultData;
						}
					}
				})
			},
		}
	}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
		.reply-head {
			a {
				color: $color-value;
				border-bottom: 2px solid $color-value;
			}
		}
		.reply-btn:hover {
			color: $color-value !important;
		}
		.btn-box{
			button{
				border:1px solid $color-value;
				color: $color-value;
				&:hover {
					background-color: $color-value;
				}
			}
		}
    }
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
	.topic_detail{
		.content-box{
			padding: 0 20px 20px;
			.topic-title{
				padding: 10px 0;
				border-bottom: 1px solid #c9c9c9;
				.title{
					padding-left: 15px;
					font-size: 16px;
					color: #00a0e9;
					line-height: 2.5em;
				}
				.btn-box{
					margin-top: 4px;
					button{
						border-radius: 3px;
						padding:6px 15px;
						margin-left: 10px;
						font-size: 14px;
					}
					button:hover{
						color: #fff;
					}
				}
			}
			.list-item-detail{
				padding: 15px 0 10px;
				margin-top: 5px;
				overflow: hidden;
				border-bottom: 1px dashed #c9c9c9;
				position: relative;
				.tips{
					box-sizing: border-box;
					width: 46px;
					height: 26px;
					position: absolute;
					top: -6px;
					left: -16px;
					text-align: center;
					padding-top: 10px;
					background-color: #00a0e9;
					color: #fff;
					transform: rotate(-45deg);
				    -ms-transform: rotate(-45deg);       /* IE 9 */
				    -webkit-transform: rotate(-45deg);   /* Safari and Chrome */
				    -o-transform: rotate(-45deg);        /* Opera */
				    -moz-transform: rotate(-45deg);      /* Firefox */
				    span{
				    	display: inline-block;
				    	transform:scale(0.8,0.8);
				    	-ms-transform:scale(0.8,0.8);
				    	-webkit-transform:scale(0.8,0.8);
				    	-o-transform:scale(0.8,0.8);
				    	-moz-transform:scale(0.8,0.8);
				    }
				}
				.theme-box{
					font-size: 14px;
					.avatar{
						img{
							width: 72px;
							height: 72px;
							border-radius: 1000px;
						}
						.name{
							color: #00a0e9;
							width: 72px;
							text-align: center;
							margin-top: 10px;
						}
					}
					.contents{
						padding-left: 92px;
						padding-top: 15px;
						min-height: 100px;
						position: relative;
						.reply-txt{
							width: 70%;
							margin-bottom: 15px;
							p{
								word-wrap:break-word;
							}
						}
					}
					.reply-operate{
						padding-left: 92px;
						margin-bottom: 15px;
						.date-reply{
							text-align: right;
							height: 14px;
							font-size: 12px;
							.reply-btn{
								display: inline-block;
								vertical-align: top;
							}
							span{
								margin-left: 15px;
								color: #bbb;
							}
						}
					}
				}
			}
			.reply-box{
				margin:0px 0 10px 92px;
			    border: 1px solid #dfdfdf;
			    background-color: #f7f8fa;
			    padding:0 10px 10px;
				.reply-item{
					padding-top: 10px;
					.reply-content{
						font-size: 14px;
						.avatar{
							position: relative;
							.louzhu{
								position: absolute;
								bottom: 0px;
								right: -10px;
								background-color: #00a0e9;
								color: #fff;
								padding:2px 3px;
								border-radius: 3px;
								font-size: 12px;
								span{
							    	display: inline-block;
							    	transform:scale(0.8,0.8);
							    	-ms-transform:scale(0.8,0.8);
							    	-webkit-transform:scale(0.8,0.8);
							    	-o-transform:scale(0.8,0.8);
							    	-moz-transform:scale(0.8,0.8);
							    }
							}
							img{
								width: 41px;
								height: 41px;
								border-radius: 1000px;
							}
						}
						.reply-content-box{
							width: 100%;
							padding-left: 51px;
							padding-top: 10px;
							box-sizing: border-box;
							.title-content{
								.name{
									color: #00a0e9;
								}
								.reply-content{
									width: 70%;
									margin-left: 10px;
									word-wrap:break-word;
								}
							}
							.date-reply{
								font-size: 12px;
								vertical-align: top;
								text-align: right;
								color: #bbb;
								.reply-btn{
									vertical-align: top;
									color: #bbb;
								}
							}
						}
					}
				}
				.open-all{
					color: #00a0e9;
					cursor: pointer;
					text-align: right;
					margin-top: 10px;
				}
			}
		}
	}
/* 回复 */
	#reply-box{
		margin-top: 20px;
		padding-top: 6px;
		padding-bottom: 20px;
		.reply-head{
			border-bottom: 1px solid #c9c9c9;
			height: 27px;
			margin-top:5px;
			a {
				font-size: 16px;
				padding: 0 12px 7px;
			}
		}
		.form-box{
			margin-top: 30px;
			padding:0 15px;
		}
	}
</style>

<style lang='scss'>
	.topic_detail{
		.form-box{
			.el-form-item__label{
				font-size: 16px;
			}
			.el-input__inner{
				height: 38px;
			}
			.el-form-item{
				margin-bottom: 10px;
			}
			.edit-box{
				.el-form-item__content{
					border:1px solid #c9c9c9;
					.wangEditor-container{
						border: none;
						// border-bottom: 1px solid #c9c9c9;
					}
				}
			}
		}
		#delPopover {
			.delete-btn{
				font-size: 14px;
			}
		}

		p{
			text-align: left;
			font-size: 14px;
			line-height: 2em;
			img{
				max-width: 100%;
				margin: 20px 0;
			}
		}
	}
</style>