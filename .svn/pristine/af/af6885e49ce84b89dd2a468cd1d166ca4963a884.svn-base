<template>
	<section class="subject_details">
		<dl class="clearfix">
			<dt class="fl">选题依据：</dt>
			<dd class="fl">{{subjectDetails.topicBasis}}</dd>
		</dl>
		<dl>
			<dt>课题研究的背景及意义：</dt>
			<dd class="ml55">
				<p class="">{{subjectDetails.significance}}</p>
			</dd>
		</dl>
		<dl>
			<dt>课题研究的内容：</dt>
			<dd class="ml55">
				<p class="">{{subjectDetails.connent}}</p>
			</dd>
		</dl>
		<dl>
			<dt>课题研究的过程及方法：</dt>
			<dd class="ml55">
				<p class="">{{subjectDetails.methodStep}}</p>
			</dd>
		</dl>
		<dl>
			<dt>课题研究的预期成果：</dt>
			<dd class="ml55">
				<p class="">{{subjectDetails.result}}</p>
			</dd>
		</dl>
	</section>
</template>

<script>
	export default {
		name:'subject_details',
		components:{},
		data() {
			return{

			}
		},
		props:{
			subjectDetails:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.subject_details{
		padding: 5px 15px 15px;
		dl{
			font-size: 14px;
			width: 100%;
			line-height: 20px;
			margin-bottom: 20px;
			dt{
				font-weight: bold;
			}
			dd{
				width: 80%;
			}
		}
	}
	.ml55{
		margin-left: 70px;
	}
</style>