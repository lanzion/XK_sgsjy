<template>
	<section id="finance_info">
		<el-table class="data-table back-stage-table" :data="inviteList" style="width: 100%">
	        <el-table-column prop="linkMan" label="投资人" show-overflow-tooltip></el-table-column>
	        <el-table-column prop="realMoney" label="融资金额(元)">
	        	<template scope="scope">
	        		<span>{{scope.row.realMoney != null ? scope.row.realMoney.toFixed(2) : '0.00'}}</span>
	        	</template>
	        </el-table-column>
	        <el-table-column prop="seduceDate" label="项目邀约时间" show-overflow-tooltip>
	            <template scope="scope">{{ scope.row.seduceDate | dateFormat('yyyy.MM.dd') }}</template>
	        </el-table-column>
	        <el-table-column prop="confirmDate" label="成功邀约时间" show-overflow-tooltip>
	            <template scope="scope">{{ scope.row.confirmDate | dateFormat('yyyy.MM.dd') }}</template>
	        </el-table-column>
	        <el-table-column prop="status" label="融资历时(天)">
	            <template scope="scope">
	            	<div style="text-align: center;">{{scope.row.duration < 1 ? '小于1' : scope.row.duration}}天</div>
	            </template>
	        </el-table-column>
	    </el-table>
	</section>
</template>

<script>
	import { requestInviteList } from '@/service/businessPlan.js'
	export default {
		name:'finance_info',
		data(){
			return{
			}
		},
		props:{
			inviteList:{
				type: Array,
				default () {
					return []
				}
			}
		},
		mounted(){
			// this.getFinanceList()
		},
		methods:{
			// getFinanceList(){
			// 	let params = {
			// 		businessPlanId: this.$route.query.id,
			// 		status: 3
			// 	}
			// 	requestInviteList(params).then((res) => {
			// 		if(res.data.code == 200){
			// 			this.financeList = res.data.entity.resultData
			// 			for(let i = 0; i < this.financeList.length; i++){
			// 				let dates = ((parseInt(this.financeList[i].confirmDate) - parseInt(this.financeList[i].seduceDate))/1000/3600/24).toFixed(0);
			// 				this.$set(this.$data.financeList[i],'duration',dates)
			// 			}
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	#finance_info{
		padding: 5px 15px;
		.back-stage-table.el-table{
			.cell{
				text-align: center;
				white-space: nowrap;
			}
		}
	}
</style>