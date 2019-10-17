<template>
	<section class="activity_info">
		<dl class="info-item clearfix">
			<dt class="item-title">【活动主题】：</dt>
			<dd class="item-detail">{{activityDetails.title}}</dd>
		</dl>
		<dl class="info-item clearfix">
			<dt class="item-title">【活动详情】：</dt>
			<dd class="item-detail">{{activityDetails.details}}</dd>
		</dl>
		<dl class="info-item clearfix">
			<dt class="item-title">【活动要求】：</dt>
			<dd class="item-detail">{{activityDetails.requirement}}</dd>
		</dl>
		<dl class="info-item clearfix">
			<dt class="item-title">【联系方式】：</dt>
			<dd class="item-detail">{{activityDetails.contactWay}}</dd>
		</dl>
	</section>
</template>

<script>
	export default {
		name:'activity_info',
		data(){
			return{}
		},
		props:['activityDetails']
	}
</script>

<style lang="scss" scoped>
	.activity_info{
		padding: 10px 15px 15px 10px;
		.info-item{
			margin-bottom: 23px;
			.item-title{
				font-size: 16px;
				line-height: 25px;
				color: #333;
				float: left;
			}
			.item-detail{
				width: 85%;
				float: left;
				font-size: 14px;
				line-height: 1.8em;
				padding-left: 10px;
				word-break: break-word;
			}
		}
	}
</style>