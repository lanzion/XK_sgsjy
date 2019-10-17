<template>
	<div class="adminworksDetails">
		<works-detail :detailData="detailData"></works-detail>
	</div>
</template>

<script>
	import worksDetail from 'components/works/works_details.vue'

	export default {
		name:'adminworksDetails',
		components:{
			'works-detail': worksDetail
		},
		data () {
			return {
				detailData:{
					isStudent: this.$ls.get('userIdentity') === 'student'
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
.adminworksDetails{
	width: 100%;
}
</style>
