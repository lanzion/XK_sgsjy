<template>
	<div id="admin_story" class="bgw admin-list-head">
		<div>
			<v-tabs :tabs="[
					{ name: '已审故事', type: 'audited' },
					{ name: '待审故事', type: 'pending' }
				]" :router="router" @searchVal="searchParam" :total="totalNum" :is_search="true" :btns="btns" :count="count"></v-tabs>
		</div>
		<router-view :search="search" @totalNum="total"></router-view>
	</div>
</template>

<script>
	import tabs from 'Common/classificationList/classification/tabs.vue'
	export default {
		name: 'admin_story',
		components: {
			'v-tabs': tabs
		},
		data() {
			return {
				// tabs: [
				// 	{ name: '已审故事', type: 'audited' },
				// 	{ name: '待审故事', type: 'pending' }
				// ],
				router: {
					path: '/admin/story',
				},
				btns: [
					{url:'/admin/story/publish', name:'发布故事'}
				],
				count: {
					name:'故事'
				},
				search:'',
				totalNum:0
			}
		},
		methods:{
			searchParam(val){
				this.search = val;
			},
			total(val){
				this.totalNum = val;
			}
		}
	}
</script>

<style lang="scss" scoped>

#admin_story{
	width: 100%;
}
</style>