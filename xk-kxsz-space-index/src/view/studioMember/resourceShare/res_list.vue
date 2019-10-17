<template>
	<div id="res_list" class="container clearfix">
		<div class="content-left bgw fl">
			<side-tabs :typeNum="typeNum" @callback="changeType"></side-tabs>
		</div>
		<div class="content-right bgw fr">
			<div class="search-box clearfix">
				<a href="javaScript:;" class="publish-res fr" @click="visible.show = true" v-if="isMember">发布资源</a>
				<v-search :tips="tips" @search="getSearch" class="fr"></v-search>
			</div>
			<ul class="res-list" v-if="resList.length > 0">
				<li class="list-item clearfix" v-for="(item,index) in resList">
					<div class="fl title-box">
						<i class="fl" :class="{'icon-file-text': item.fileType == 1, 'icon-file-video': item.fileType == 2, 'icon-file-music': item.fileType == 3, 'icon-file-empty': item.fileType == 5}"></i>
						<!-- <p class="fl title">{{item.name}}</p> -->
						<router-link class="title" :to="{path:'/studioMemberDetail/resource/detail',query:{id:$route.query.id,resId:item.id}}">{{item.name}}</router-link>
					</div>
					<div class="name-date fr clearfix">
						<span class="name fl">{{item.createName}}</span>
						<span class="date fl">{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>
						<a v-if="isAdmin" href="javaScript:;" class="delete-btn" title="编辑" @click="openDialog(item.id)">编辑</a>
						<a v-if="isAdmin" href="javaScript:;" class="delete-btn" title="删除" @click="delResource(item.id)">删除</a>
					</div>
				</li>
			</ul>
			<div class="empty-block" v-else>暂无数据</div>
			<v-pagination :param="pageParams" :changePage="changePage"></v-pagination>
			<publish-resource :visible="visible" :id="id" @resetId="resetId" @callback="getResList"></publish-resource>
		</div>
	</div>
</template>

<script>
	import sideTabs from 'components/studio/sideTabs.vue'
	import publishResource from 'components/studio/publish_resource.vue'
	import vSearch from 'Common/search.vue'
	import vPagination from 'Common/pagination.vue'
	import { requestResShareList,delStudioResource } from '@/service/studio.js'
	export default {
		name: 'res_list',
		components:{
			sideTabs,
			vSearch,
			vPagination,
			publishResource
		},
		data(){
			return {
				visible:{
					show:false
				},
				typeNum:3,
				tips:'请输入资源名称',
				resList:[],
				search:{
					name:'',
					type:''
				},
				pageParams:{
					pageSize:10,
					pageNum:1,
					totalNum:0
				},
				id: ''				//资源id,传给发布弹窗组件
			}
		},
		props:['isMember','isAdmin'],
		mounted(){
			this.getResList();
		},
		watch:{
			search:{
				handler:function(val,oldVal){
					this.getResList();
				},
				deep:true
			}
		},
		methods:{
			getSearch(val){
				this.search.name = val
			},
			changeType(val){
				this.search.type = val
			},
			changePage(val){
				this.pageParams.pageNum = val;
				this.getResList()
			},
			/*获取资源列表*/
			getResList(){
				let params = {
					name: this.search.name,
					type: this.search.type,
					studioId: this.$route.query.id
				};
				requestResShareList(params,this.pageParams).then((res) => {
					if(res.data.code === 200){
						this.resList = res.data.entity.resultData;
						this.pageParams.totalNum = res.data.entity.totalNum;
					}
				})
			},
			/*资源删除*/
			delResource(id){
				this.$confirm('此操作将删除该资源，是否继续？', '温馨提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning',
		          	customClass: '__custom-msg-box'
		        }).then(() => {
		          	delStudioResource([{id:id}]).then((res) => {
		          		if(res.data.code === 200){
		          			this.showMessage('success','删除成功');
		          			this.getResList()
		          		}else{
		          			this.showMessage('error',res.data.msg)
		          		}
					})
		        }).catch(() => {
		          this.showMessage('info','已取消删除')
		        });
			},
			/*发来发布弹窗*/
			openDialog(id){
				this.$set(this.$data,'id',id);
				this.visible.show = true
			},
			/*重置id*/
			resetId(){
				this.$set(this.$data,'id','')
			}
		}
	}
</script>

<style lang="scss" scoped>

	#res_list{
		margin-top: 30px;
		.content-left{
			width: 201px;
			min-height: 445px;
		}
		.content-right{
			width: 980px;
			min-height: 445px;
			.search-box{
				padding: 10px 15px;
				border-bottom: 1px solid #c9c9c9;
				.publish-res{
					display: inline-block;
					height: 34px;
					line-height: 34px;
					text-align: center;
					width: 96px;
					background-color: #ff7200;
					color: #fff;
					border-radius: 3px;
					margin-left: 10px;
					&:hover{
						opacity: 0.75;
					}
				}
			}
			.res-list{
				padding: 0 15px;
				.list-item{
					padding: 15px 0;
					border-bottom: 1px dashed #c9c9c9;
					font-size: 14px;
					.title-box{
						i{
							color: #686868;
							margin-right: 15px;
						}
						.title{
							color: #00a9e0;
							&:hover{
								color: #ff7200;
							}
						}
					}
					.name-date{
						color: #999;
						.name{
							margin-right: 28px;
						}
						.date{
						}
						.delete-btn{
							margin-left: 15px;
							&:hover{
								color: #ff7200;
							}
						}
					}
				}
			}
		}
	}
</style>