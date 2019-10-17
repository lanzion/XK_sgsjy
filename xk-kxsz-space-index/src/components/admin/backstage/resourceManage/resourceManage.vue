<template>
	<div class="resourceManage backend-content__middle">
		<div class="option-box clearfix">
			<div class="search clearfix">
	      	<input type="text" placeholder="请输入资源名称" class="search_text">
	      	<div class="el-search_btn icon-search"></div>
	    </div>
	    <div class="fr btn-box">
	    	<button class="recommend">推荐</button>
	    	<button class="audited" v-if="userIdentity === 'school'">审核</button>
	    	<button class="delete">删除</button>
	    	<button class="upload-res">发布资源</button>
	    </div>
		</div>
		<!-- 活动管理表 -->
		<div class="resource-table manage-table">
			<el-table class="data-table" :data="listData" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="28"></el-table-column>
		        <el-table-column prop="resourceName" label="资源名称">
		        	<template scope="scope">
		        		<template>
		        			<span class="resource-name">
		        				<router-link :to="{ path:'/admin/resource/details', query:{id:'36937da79d2f464091bdd99b1efdd82d'} }">{{scope.row.resourceName}}</router-link>
		        			</span>
		        		</template>
		        	</template>
		        </el-table-column>
		        <el-table-column
		        	prop="resourceType"
		        	label="资源分类"
		        	:filters="classifyFilter"
			        :filter-method="filterClassify"
			        filter-placement="bottom-end">
			        <template scope="scope">
			        	{{scope.row.resourceType}}
			        </template>
		        </el-table-column>
		        <!-- <el-table-column
		        	prop="resourceLevel"
		        	label="级别"
		        	width="80"
		        	:filters="[{ text:'入门级', value:'入门级' }, { text:'中级', value:'中级' }, { text:'高级', value:'高级' }]"
			        :filter-method="filterLevel"
			        filter-placement="bottom-end">
			        <template scope="scope">
			        	{{scope.row.resourceLevel}}
			        </template>
		        </el-table-column> -->
		        <el-table-column prop="createName" label="上传人"></el-table-column>
		        <el-table-column prop="createDate" label="上传时间">
		        	<template scope="scope">
		        		{{scope.row.createDate | dateFormat("yyyy-MM-dd")}}
		        	</template>
		        </el-table-column>
		        <el-table-column prop="size" label="大小">
		        	<template scope="scope">{{scope.row.size}}KB</template>
		        </el-table-column>
		        <el-table-column
		        	prop="auditStatus"
		         	label="审核"
		         	:filters="auditedFilter"
			        :filter-method="filterCheck"
			        filter-placement="bottom-end">
			        <template scope="scope">
			        	<span v-if="scope.row.auditStatus === 1">已审核</span>
			        	<span v-if="scope.row.auditStatus === 0">待审核</span>
			        </template>
		        </el-table-column>
		        <el-table-column
		        	v-if="userIdentity === 'educatioqn'"
		        	prop="schoolName"
		         	label="区域"
		         	:filters="schoolFilter"
			        :filter-method="filterRegion"
			        filter-placement="bottom-end">
			        <template scope="scope">
			        	{{scope.row.schoolName}}
			        </template>
		        </el-table-column>
		        <el-table-column label="操作">
		          	<template scope="scope">
			            <i title="推荐" class="icon-btn-reprint"></i>
			            <i title="审核" class="icon-btn-feedback" v-if="userIdentity === 'school'"></i>
			            <del-popover title="删除" class="delete" :delData="{ url:'maker/resource/audit/delByIds', params:[{id: scope.row.id}], name:'资源' }" v-on:callback="getData"></del-popover>
			            <router-link :to="{path:'/admin/resource/edit',query:{id: scope.row.id}}">
							<i title="编辑" class="icon-btn-edit2"></i>
						</router-link>
		          	</template>
		        </el-table-column>
      		</el-table>
		</div>
		<v-pagination :param="param" :changePage="changePage"></v-pagination>
	</div>
</template>

<script>
	import delPopover from '../../../common/del_popover.vue'
	import pagination from '../../../common/pagination.vue'
	import { requestResourceManageList } from '@/service/resource.js'
	export default {
		name:'resourceManage',
		components:{
			'v-pagination': pagination,
			'del-popover': delPopover
		},
		data() {
			return{
				userIdentity:'',
		        multipleSelection: [],
		        listData:[],
		        param:{
		        	totalNum:0,
		        	pageSize:10,
		        	pageNum:1
		        },
		        currentPage:1,
		        classifyFilter:[],
		        schoolFilter:[],
		        auditedFilter:[]
			}
		},
		created() {
			this.userIdentity = sessionStorage.getItem('userIdentity');
			this.getData()
		},
		methods:{
		    /*
		    *筛选过滤
		    */
		    filterClassify(value, row) {
        		return row.resourceType === value;
      		},
      		filterCheck(value, row) {
        		return row.auditStatus === value;
      		},
      		filterRegion(value, row) {
        		return row.schoolName === value;
      		},
      		/*
      		*获取数据列表
      		*/
      		getData() {
      			requestResourceManageList({ spaceType:3, pageSize:10, pageNum:this.currentPage }).then((res)=> {
      				console.log(res);
      				this.param.totalNum = res.data.entity.totalNum;
      				this.listData = res.data.entity.resultData;
      				let len = this.listData.length;
      				/*
      				*遍历出表格过滤类型
      				*/
      				for(let i = 0; i < len; i++){
      					let auditedObj = {};
      					let schoolObj = {};
      					let classifyObj = {};
      					let auditedFlag = true;
	      				let schoolFlag = true;
	      				let classifyFlag = true;
      					for(let j = 0; j < this.auditedFilter.length; j++){
      						if(this.auditedFilter[j].value === this.listData[i].auditStatus){
      							auditedFlag = false;
      						};
      					};
      					for(let j = 0; j < this.schoolFilter.length; j++){
      						if(this.schoolFilter[j].value === this.listData[i].schoolName){
      							schoolFlag = false;
      						};
      					};
      					for(let j = 0; j < this.classifyFilter.length; j++){
      						if(this.classifyFilter[j].value === this.listData[i].resourceType){
      							classifyFlag = false;
      						};
      					};
      					if(auditedFlag){
      						this.$set(auditedObj,'value',this.listData[i].auditStatus);
      						switch(this.listData[i].auditStatus){
      							case 0:
      								this.$set(auditedObj,'text','待审核');
      								break;
      							case 1:
      								this.$set(auditedObj,'text','已审核');
      								break;
      						};
      						this.auditedFilter.push(auditedObj);
      					};
      					if(schoolFlag){
      						this.$set(schoolObj,'value',this.listData[i].schoolName);
      						this.$set(schoolObj,'text',this.listData[i].schoolName);
      						this.schoolFilter.push(schoolObj);
      					};
      					if(classifyFlag){
      						this.$set(classifyObj,'value',this.listData[i].resourceType);
      						this.$set(classifyObj,'text',this.listData[i].resourceType);
      						this.classifyFilter.push(classifyObj);
      					};
      				};
      			})
      		},
      		changePage(val){
      			this.currentPage = val;
      			this.getData();
      		},
      		handleSelectionChange(val) {
        		this.multipleSelection = val;
        		console.log(this.multipleSelection)
      		}
		}
	}
</script>

<style lang="scss" scoped>
*{
	box-sizing: border-box;
}
.resourceManage{
	width: 100%;
	overflow: hidden;
	.option-box{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20px;
		// 搜索框
		.search {
		  float: left;
		  height: 32px;
		  border: 1px solid #DD0000;
		  .search_text {
		    float: left;
		    width: 172px;
		    height: 30px;
		    border: none;
		    text-indent: 5px;
		  }
		  .el-search_btn {
		    float: left;
		    width: 42px;
		    height: 31px;
		    line-height: 31px;
		    text-align: center;
		    background-color: #DD0000;
		    font-size: 14px;
		    color: #fff;
		    cursor: pointer;
		  }
		}
// 按钮
		.btn-box{
			button{
				float: left;
				height: 35px;
				// line-height: 35px;
				padding: 8px 15px;
				text-align: center;
				font-size: 14px;
				margin-left: 10px;
				border:1px solid #d00;
				color: #d00;
			}
			button:hover{
				background-color: #d00;
				color: #fff;
			}
			.upload-res{
				background-color: #d00;
				color: #fff;
			}
			.upload-res:hover{
				opacity: 0.75;
			}
		}
	}
}
</style>

<style lang="scss">
	.el-table-filter{
		.el-checkbox__inner::after{
			border-color: #2797ed!important;
		}
	}
	.manage-table{
		.el-table .cell, .el-table th > div{
			font-size: 12px;
			text-align: center;
		}
	}
</style>