<template>
	<article id="plan_detail">
		<div v-html="description"></div>
	</article>
</template>

<script>
	export default {
		name: 'plan_detail',
		data () {
			return {}
		},
		props:{
			description:{
				type: String,
				default () {
					return ""
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	#plan_detail{
		padding: 15px;
		p{
			text-align: left;
			font-size: 14px;
			line-height: 2em;
			img{
				width: 100%;
				margin: 20px 0;
			}
		}
	}
</style>