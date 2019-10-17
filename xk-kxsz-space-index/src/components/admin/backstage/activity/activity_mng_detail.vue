<template>
	<div id="mng_activity_details" class="backend-content__middle">
	<!-- 详情内容 -->
		<div class="content">
			<div class="content-box clearfix">
				<h4 class="fl">活动主题：</h4>
				<p class="content-left fl">{{detailsData.title}}</p>
			</div>
			<div class="content-box clearfix">
				<h4 class="fl">活动分类：</h4>
				<p class="content-left fl">{{detailsData.activityTypeName}}</p>
			</div>
			<div class="content-box clearfix">
				<h4 class="fl">活动时间：</h4>
				<div class="content-left fl">
					<p class="">活动时间：<span>{{detailsData.startDate | dateFormat('yyyy-MM-dd HH:mm')}}</span> 至 <span>{{detailsData.endDate | dateFormat('yyyy-MM-dd HH:mm')}}</span></p>
					<p class="">报名截止：<span>{{detailsData.stopDate | dateFormat('yyyy-MM-dd HH:mm')}}</span></p>
				</div>
			</div>
			<div class="content-box clearfix">
				<h4 class="fl">活动详情：</h4>
				<div class="content-left fl">
					<p class="fl">
						{{detailsData.details}}
					</p>
				</div>
			</div>
			<div class="content-box clearfix">
				<h4 class="fl">活动要求：</h4>
				<div class="content-left fl">
					<p class="fl">
						{{detailsData.requirement}}
					</p>
				</div>
			</div>
			<div class="content-box clearfix">
				<h4 class="fl">活动地点：</h4>
				<p class="content-left fl">{{detailsData.site}}</p>
			</div>
			<div class="content-box clearfix">
				<h4 class="fl">联系方式：</h4>
				<div class="content-left fl">
					{{detailsData.contactWay}}
				</div>
			</div>
			<div class="content-box clearfix">
				<h4 class="fl">附件：</h4>
				<div class="content-left fl" v-if="detailsData.resourceList.length > 0">
					<p class="attachment" v-for="(item,index) in detailsData.resourceList">
						<a :href="fileBaseUrl+item.resourceId">{{item.name}}</a>
					</p>
				</div>
				<div v-else class="content-left fl">暂无附件</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {fileBaseUrl} from '@/js/common-config.js'
	export default {
		name: 'mng_activity_details',
		data() {
			return {
				fileBaseUrl
			}
		},
		props:{
			detailsData:{
				type:Object,
				default:function () {
					return {
						resourceList:[],
					}
				}
			}
		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>
*{
	box-sizing: border-box;
}
/*介绍内容*/
.content{
	width: 100%;
	min-height: 442px;
	overflow: hidden;
	.content-box{
		width: 100%;
		font-size: 14px;
		margin-bottom: 27px;
		h4{
			font-size: 15px;
			font-weight: bold;
			color: #000;
		}
		p{
			margin-bottom: 5px;
			color: #222;
			line-height: 16px;
		}
		.content-left{
			width: 800px;
			padding-right: 80px;
			margin-bottom: 0;
			.attachment{
				a{
					color: #00a0e9;
				}
			}
		}
	}
}
</style>