<template>
	<div id="plan_remark" class="remark">{{remark}}</div>
</template>

<script>
	export default {
		name: 'plan_remark',
		data () {
			return {}
		},
		props:{
			remark:{
				type:String,
				default: ''
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	#plan_remark{
		padding: 15px;
		margin-top: 20px;
		line-height: 1.5em;
		font-size: 14px;
		text-indent: 2em;
	}
</style>