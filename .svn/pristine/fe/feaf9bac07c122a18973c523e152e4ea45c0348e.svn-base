<template>
	<div id="admin_mult" class="bgw admin-list-head">
		<div>
			<v-tabs :tabs="[
					{ name: '入驻空间', type: 'space' },
					{ name: '入驻申请', type: 'apply' },
					{ name: '入驻邀请', type: 'invite' }
				]" :router="router" @searchVal="searchParam" :total="totalNum" :is_search="isSearch" :count="count"></v-tabs>
		</div>
		<router-view :search="search" @totalNum="total"></router-view>
	</div>
</template>

<script>
	import tabs from 'Common/classificationList/classification/tabs.vue'
	export default {
		name: 'admin_mult',
		components: {
			'v-tabs': tabs
		},
		data() {
			return {
				// tabs: [
				// 	{ name: '入驻空间', type: 'space' },
				// 	{ name: '入驻申请', type: 'apply' },
				// 	{ name: '入驻邀请', type: 'invite' }
				// ],
				router: {
					path: '/admin/mult',
				},
				isSearch:true,
				count: {
					name:'众创空间'
				},
				search:'',
				totalNum:0
			}
		},
		mounted(){
			this.routeChange()
		},
		watch:{
			'$route':'routeChange'
		},
		methods:{
			routeChange(){
				if(this.$route.path.includes('space')){
					this.isSearch = true;
				}else{
					this.isSearch = false;
					this.count = undefined;
				}
			},
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
*{
	box-sizing: border-box;
}
#admin_mult{
	width: 100%;
}
</style>