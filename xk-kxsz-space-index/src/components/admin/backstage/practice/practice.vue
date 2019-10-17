<template>
	<div id="admin_practice" class="backend-content__middle">
		<section class="filter-box clearfix">
			<term-select style="width:135px;margin-right:10px;"></term-select>
			<multi-select style="width:100px;display:inline-block" :selectData.sync="classify" :ifAll='true' :model='"project"'></multi-select>
			<div class="search-box fr clearfix">
				<span>共计{{totalNum}}次实践</span>
				<v-search class="fr" :tips="'活动名称'" @search="searchVal"></v-search>
			</div>
		</section>
		<practice-list :type="'backend'" @totalNum="total" :search="search"></practice-list>
	</div>
</template>

<script>
	import practiceList from '../../../common/module/practice/practice_list.vue';
	import termSelect from '../../../common/select/term_select.vue';
	import multiSelect from '../../../common/select/multi_select.vue';
	import search from '../../../common/search.vue';
	export default{
		name:'admin_practice',
		components:{
			'practice-list':practiceList,
			'term-select':termSelect,
			'multi-select':multiSelect,
			'v-search':search
		},
		data() {
			return {
				classify:[],
				totalNum:0,
				search:''
			}
		},
		methods:{
			searchVal(val){
				this.search = val;
			},
			total(val){
				this.totalNum = val;
			}
		}
	}
</script>

<style lang="scss" scoped>
#admin_practice{
	width: 100%;
	box-sizing: border-box;
	.filter-box{
		border-bottom: 1px solid #c9c9c9;
		padding-bottom: 10px;
		.search-box{
			height: 32px;
			span{
				display: inline-block;
				height: 32px;
				line-height: 32px;
				margin-right: 15px;
			}
		}
	}
}
</style>

<style lang="scss">
	#admin_practice{
		.el-input__inner{
			height: 34px;
			font-size: 12px;
		}
		.search{
			height: 30px;
			.search_text{
				height: 28px;
				line-height: 28px;
			}
			.el-search_btn{
				height: 30px;
				line-height: 30px;
			}
		}
	}
</style>