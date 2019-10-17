<template>
	<div id="planDetail" class="detail-container container clearfix">
		<v-breadcrumb></v-breadcrumb>
		<!-- 左边内容 -->
		<section class="content-left fl">
			<!-- 信息 -->
			<div class="detail-info clearfix">
				<div class="img-box fl" :style="{backgroundImage: `url(${getFileUrl(detailData.cover) || listDefault})`}"></div>
				<div class="info-box">
					<div class="info-title clearfix">
						<h4 class="title fl">{{detailData.name}}</h4>
						<option-btn class="fr" :title.sync='detailData.name' module="plan" :img="detailData.cover"></option-btn>
					</div>
					<div class="info-msg">
						<span><i class="icon-i-classify"></i> 分类：</span>
						<span>{{detailData.category}}</span>
					</div>
					<div class="info-msg">
						<span><i class="icon-btn-browse"></i> 浏览：</span>
						<span>{{detailData.browseNum}}</span>
					</div>
					<div class="info-msg">
						<span><i class="icon-i-time"></i> 上传时间：</span>
						<span>{{detailData.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</span>
					</div>
				</div>
			</div>
			<!-- 详情，评论 -->
			<article class="info-comment">
				<v-tabs :tabs="[
		      		{ name: '策划详情', type: 'info'},
		      		{ name: '备注', type: 'remark'},
		      		{ name: '评论('+detailData.commentCount+')', type: 'comment' },
		      		{ name: '邀约列表('+detailData.inviteCount+')', type: 'invite' }
			  	]" :router="router"></v-tabs>
				<router-view :description="detailData.description" @commentAdd="commentAdd" :createId="detailData.createId" :remark="detailData.remark" :inviteList="inviteList"></router-view>
			</article>
		</section>
		<!-- 右边信息 -->
		<aside class="content-right fr">
			<div class="finacing-msg">
				<financing-msg :startMoney="detailData.startMoney" :endMoney="detailData.endMoney"></financing-msg>
			</div>
			<div class="user-info">
				<publisher-msg :createId="detailData.createId" @inviteAdd="inviteAdd"></publisher-msg>
			</div>
			<div class="related-list bgw">
				<h4 class="clearfix bgw">
					<span class="title fl">相关策划</span>
					<router-link to="/street/co/list/plan" class="btn-more fr">更多>></router-link>
				</h4>
				<v-list :items="items" :listData="listData">
	                <template scope="props">
	                    <div class="list-item-img__box">
	                    	<div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
	                        <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
	                    </div>
	                    <div class="list-item-title">
	                    	<p class="list-title" :title="props.item.name">{{ props.item.name | textOverflow(18) }}</p>
	                    	<p class="msg">
	                    		<span><i class="icon-btn-i-collection2"></i>{{props.item.collectNum}}</span>
	                    		<span><i class="icon-btn-i-reply"></i>{{props.item.commentCount}}</span>
	                    		<span><i class="icon-i-browse"></i>{{props.item.browseNum}}</span>
	                    	</p>
	                    </div>
	                </template>
	            </v-list>
			</div>
		</aside>
	</div>
</template>

<script>
	import tabs from 'Common/classificationList/classification/tabs.vue'
	import optionBtn from 'Common/button/com_panel_event.vue'
	import list from 'Common/classificationList/list/graphic/list.vue'
	import publisherMsg from 'components/businessPlan/publisher_msg.vue'
	import financingMsg from 'components/businessPlan/financing_msg.vue'
	import dataTranslation from '@/js/dataTranslation.js'
	import vBreadcrumb from 'Common/breadcrumb.vue'
	import { requestPlanDetail,requestInviteList,requestPlanBackendList } from '@/service/businessPlan.js'
	export default {
		name: 'planDetail',
		components: {
			'v-tabs': tabs,
			optionBtn,
			'v-list':list,
			publisherMsg,
			financingMsg,
			vBreadcrumb
		},
		data () {
			return {
			  	router: {
			  		path: '/street/co/plan/detail'
			  	},
			  	listData:{
			  		col:1,
	        		pathUrl:'/street/co/plan/detail/info',
	        		params: {
	                    names: 'id',
	                    val: 'id'
	                }
			  	},
			  	items:[],
			  	detailData:{
			  		commentCount:0,
			  		inviteCount:0
			  	},
			  	inviteList:[],
			  	pageParam:{
					totalNum:0,
					pageSize:5,
					pageNum:1
				},
				createId:''
			}
		},
		created(){
			this.router.query = this.$route.query
			this.getPlanDetail()
			this.getInviteList()
			this.getRelatedPlan()
		},
		watch:{
			createId:{
				handler:function(val,oldVal){
				},
				deep:true
			},
			'$route.query.id' () {
				this.router.query = this.$route.query
				this.getPlanDetail()
				this.getInviteList()
				this.getRelatedPlan()
			}
		},
		methods:{
			getPlanDetail(){
				requestPlanDetail({id:this.$route.query.id}).then((res) => {
					if (res.data.code == 200) {
						this.detailData = Object.assign({},res.data.entity)
						dataTranslation(this.detailData.category, 'businessPlanCategory', { key: 'id' }).then(res => {
                            this.detailData.category = res;
                        })
                        this.createId = this.detailData.createId
					}
				})
			},
			// 获取邀约列表
			getInviteList(){
				let params = {businessPlanId:this.$route.query.id}
				requestInviteList(params,this.pageParam).then((res) => {
					if(res.data.code == 200){
						this.inviteList = res.data.entity.resultData;
						this.pageParam.totalNum = res.data.entity.totalNum;
					}
				})
			},
			// 获取相关策划列表
			getRelatedPlan(){
				requestPlanBackendList({ auditStatus:1, businessPlanId: this.$route.query.id}).then((res) => {
					if(res.data.code == 200){
						this.items = res.data.entity.resultData
					}
				})
			},
			inviteAdd(){
				this.detailData.inviteCount++;
				this.getInviteList()
			},
			commentAdd(){
				this.detailData.commentCount++;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-container {
		.content-left{
			width:902px;
			.detail-info{
				padding: 15px;
				background-color: #fff;
				margin-bottom: 20px;
				.img-box{
					width: 280px;
					height: 182px;
					background-position: center;
    				background-size: cover;
				}
				.info-box{
					padding-left: 300px;
					padding-top: 10px;
					.info-title{
						margin-bottom: 35px;
						height: 22px;
						line-height: 22px;
						.title{
							font-size: 22px;
							color: #00b5f0;
						}
					}
					.info-msg{
						font-size: 14px;
						color: #b1b1b1;
						margin-top: 15px;
					}
				}
			}
			.info-comment{
				background-color: #fff;
				min-height: 455px;
			}
		}
		.content-right{
			width: 274px;
			.user-info,.finacing-msg{
				margin-bottom: 20px;
				background-color:#fff;
			}
			.related-list{
				h4{
					font-size: 17px;
					padding: 12px 15px;
					.btn-more{
						cursor: pointer;
						&:hover{
							color: #00a0e9;
						}
					}
				}
				.list-item-title{
					padding-top: 4px;
					margin-top: 0;
					.list-title{
						&:hover{
							color: #00a0e9;
						}
					}
					.msg{
						color: #999;
						font-size: 12px;
						span{
							margin-right: 20px;
						}
						i{
							font-size: 12px;
							color: #999;
						}
					}
				}
			}
		}
	}
</style>

<style lang="scss">
	.related-list{
		#list{
			margin:0;
			.list{
				margin: 0;
				.list-item__box{
					border-top: 1px solid #ddd;
					margin-bottom: 0;
					.list-item-img__box{
						img,
						.bg-img__wrap {
							height: 163px;
						}
					}
					&:hover{
						.list-item-title{
							.item-title{
								color: #00a0e9;
							}
						}
					}
				}
			}
		}
	}
</style>