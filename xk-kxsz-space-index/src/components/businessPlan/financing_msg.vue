<template>
	<div id="financingMsg">
		<h4 class="title">{{title}}</h4>
		<div class="msg">
			<p class="">融资金额起：{{ startMoney.toFixed(2) || 0.00}}(元)</p>
			<p class="">融资金额止：{{ endMoney.toFixed(2) || 0.00}}(元)</p>
		</div>
	</div>
</template>

<script>
	export default {
		name:'financingMsg',
		data () {
			return {
				item: {},
				identity: 'student'
			}
		},
		props: {
			startMoney:{
				type:Number,
				default:0
			},
			endMoney:{
				type:Number,
				default:0
			},
			title:{
				type:String,
				default:'融资信息'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
*{
	box-sizing: border-box;
}
#financingMsg{
	width: 100%;
	padding: 0 0 16px;
	line-height: 24px;
	//
	.title{
		font-size: 18px;
		padding: 12px 15px;
		border-bottom: 1px solid #ccc;
	}
	//
	.msg{
		padding:10px 15px 20px;
		font-size: 14px;
		line-height: 2em;
	}
}
</style>