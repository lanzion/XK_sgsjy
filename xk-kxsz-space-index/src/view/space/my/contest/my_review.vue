<template>
	<div class="my_review bgw">
		<section class="contest-list">
			<ul class="list-box" v-if="contestList.length">
				<li class="list-item table-layout" v-for="(item, index) in contestList">
					<div class="img-box table-cell">
						<a href="javaScript:;" :style="{backgroundImage: `url(${getFileUrl(item.cover) || listDefault})`}"></a>
						<div class="label">
							<p class="begin" v-if="Number(item.enrollStartDate) > Number(nowTime)">报名未开始</p>
							<p class="end" v-else-if="Number(item.enrollEndDate) < Number(nowTime)">报名已结束</p>
							<p class="doing" v-else>报名进行中</p>
						</div>
					</div>
					<div class="msg-box table-cell">
						<h4 class="contest-name">
							<a href="javaScript:;" @click="toMatch(item.id)">{{item.title}}</a>
						</h4>
						<div class="msg clearfix">
							<p class="fl w275 msg-item">
								<span class="msg-label"><i class="icon-i-statis-project"></i> 分类：</span>
								<span class="msg-name">{{item.projectListString}}</span>
							</p>
							<p class="fl w275 msg-item">
								<span class="msg-label"><i class="icon-i-statis-article"></i> 竞赛区域：</span>
								<span class="msg-name">{{item.provinceName}}</span>
							</p>
						</div>
						<div class="msg clearfix">
							<p class="fl w275 msg-item">
								<span class="msg-label"><i class="icon-i-activeTime"></i> 竞赛时间：</span>
								<span class="msg-name">{{item.matchStartDate | dateFormat('yyyy.MM.dd')}} — {{item.matchEndDate | dateFormat('yyyy.MM.dd')}}</span>
							</p>
							<p class="fl w275 msg-item">
								<span class="msg-label"><i class="icon-i-time"></i> 报名时间：</span>
								<span class="msg-name">{{item.enrollStartDate | dateFormat('yyyy.MM.dd')}} — {{item.enrollEndDate | dateFormat('yyyy.MM.dd')}}</span>
							</p>
						</div>
						<div class="msg clearfix 广东省广州市">
							<p class="fl w275 msg-item">
								<span class="msg-label"><i class="icon-i-creator"></i> 举办者：</span>
								<span class="msg-name" :title="item.createName">{{item.createName}}</span>
							</p>
							<p class="fl w275 msg-item ellipsis">
								<span class="msg-label"><i class="icon-i-member"></i> 已参加人数：</span>
								<span class="msg-name num">{{item.memberCount}}</span> 人
							</p>
						</div>
					</div>
					<div class="btn-box table-cell">
						<div class="contest-status">
							<span v-if="Number(item.matchStartDate) > Number(nowTime)">未开始</span>
							<span v-else-if="Number(item.matchEndDate) < Number(nowTime)">已结束</span>
							<span v-else>进行中</span>
						</div>
						<div class="to-detail">
							<a href="javaScript:;" @click="toMatch(item.id)">去评审</a>
						</div>
					</div>
				</li>
			</ul>
			<div class="empty-block" v-else>暂无数据</div>
			<v-pagination :param="param" :changePage="changePage"></v-pagination>
		</section>
	</div>
</template>

<script>
    import search from '@/components/common/search.vue'
    import pagination from '@/components/common/pagination.vue'
    import { requestMyReview } from '@/service/contest.js'

	export default {
		name: 'my_review',
		components: {
			'v-search': search,
			'v-pagination': pagination
		},
		data() {
			return {
				contestList: [],
				param: {
		        	totalNum: 0,
		        	pageSize: 5,
		        	pageNum: 1
		        },
		        nowTime: new Date().getTime(),
			}
		},
		props:{
			search:{
				type:String,
				default:''
			}
		},
		watch: {
			search: {
				handler: function(val, oldVal) {
					this.getMyContest()
				},
				deep: true
			}
		},
		mounted() {
			this.getMyContest()
		},
		methods: {
			changePage(val) {
	        	this.param.pageNum = val
	        	this.getMyContest()
	        },
	        getMyContest() {
                requestMyReview({ title: this.search }, this.param).then((res) => {
                    if (res.data.code === 200) {
                        this.contestList = res.data.entity.resultData
                        this.param.totalNum = res.data.entity.totalNum
                        this.$emit('totalNum', res.data.entity.totalNum)
                    }
                })
	        },
            toMatch(id) {
                const _location = window.location
                const href = `${location.protocol}//${location.host}/match/#/contest/review/pending?id=${id}`
                window.location.href = href
            }
		}
	}
</script>

<style lang="scss" scoped>
	.w275 {
		width: 275px;
	}
	.num {
		color: #00a0e9;
	}
	.my_review {
		margin-bottom: 20px;
		.search-box {
			padding: 10px 15px;
			border-bottom: 1px solid #ddd;
			.total {
				line-height: 35px;
				font-size: 14px;
				margin-right: 10px;
			}
		}
		.contest-list {
			padding: 0px 15px 20px;
			.list-box {
				.list-item {
					padding: 15px 0;
					border-bottom: 1px solid #ddd;
					.img-box {
						width: 280px;
						position: relative;
						a {
							display: inline-block;
							width: 280px;
							height: 180px;
							background-repeat: no-repeat;
							background-position: center;
                    		background-size: cover;
						}
						.label {
							width: 75px;
						    height: 75px;
						    background-color: rgba(0,0,0,0);
						    position: absolute;
						    top: 0;
						    left: 0;
						    overflow: hidden;
						    p {
						    	box-sizing: border-box;
							    width: 130px;
							    position: absolute;
							    top: -10px;
							    left: -48px;
							    line-height: 39px;
							    padding-top: 17px;
							    text-align: center;
							    color: #fff;
							    transform: rotate(-45deg);
							    -ms-transform: rotate(-45deg); /* IE 9 */
							    -moz-transform: roate(-45deg);
							    -webkit-transform: rotate(-45deg); /* Safari and Chrome */
						    }
						    .doing {
						    	background-color: #00a0e9;
						    }
						    .end{   /*活动已结束*/
							    background-color: #c9c9c9;
							}
							.begin{  /*活动未开始*/
							    background-color: #46c475;
							}
						}
					}
					.msg-box {
						padding-left: 20px;
						.contest-name {
							line-height: 50px;
							margin-bottom: 23px;
							a {
								font-size: 22px;
								color: #333;
								&:hover {
									color: #d00;
								}
							}
						}
						.msg {
							.msg-item {
								font-size: 14px;
								color: #626262;
								margin-bottom: 15px;
							}
						}
					}
					.btn-box {
						text-align: center;
						.contest-status {
							width: 86px;
							line-height: 50px;
							margin-bottom: 23px;
							font-size: 16px;
							color: #00a0e9;
						}
						.to-detail {
							margin-bottom: 62px;
							a {
								display: inline-block;
								width: 86px;
								height: 30px;
								line-height: 30px;
								font-size: 14px;
								border: 1px solid #d00;
								border-radius: 3px;
								color: #d00;
								&:hover {
									background-color: #d00;
									color: #fff;
								}
							}
						}
					}
				}
			}
		}
	}
</style>