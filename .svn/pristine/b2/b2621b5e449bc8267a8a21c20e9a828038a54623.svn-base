<template>
	<div id="microClass_list" class="container clearfix">
		<div class="content-left bgw fl">
			<side-tabs :typeNum="typeNum" @callback="changeType"></side-tabs>
		</div>
		<div class="content-right bgw fr">
			<div class="search-box clearfix">
				<a href="javaScript:;" class="publish-res fr" @click="visible.show = true" v-if="isMember">发布微课</a>
				<v-search :tips="tips" @search="getSearch" class="fr"></v-search>
			</div>
			<div class="list-box">
				<v-list :items="items" :listData="listData">
	                <template scope="props">
	                    <div class="list-item-img__box">
	                    	<div class="bg-img__wrap" :style="{ backgroundImage: `url(${getFileUrl(props.item.cover) || listDefault})` }"></div>
	                        <!-- <img :src="getFileUrl(props.item.cover) || listDefault" /> -->
	                    </div>
	                    <h6 class="list-item-title clearfix">
	                        <span class="item-title fl" :title="props.item.name">{{ props.item.name | textOverflow(14) }}</span>
	                        <span class="item-name fr">{{props.item.createName || '暂无名字'}}</span>
	                    </h6>
	                    <h6 class="list-item-operate" v-if="isAdmin">
	                    	<button href="javaScript:;" title="编辑" @click.stop="openDialog(props.item.id)">编辑</button>
	                    	<button href="javaScript:;" title="删除" @click.stop="delMicroClass(props.item.id)">删除</button>
	                    </h6>
	                </template>
	            </v-list>
			</div>
			<v-pagination :param="pageParams" :changePage="changePage"></v-pagination>
			<publish-class :visible="visible" :id="id" @resetId="resetId" @callback="getMicroClassList"></publish-class>
		</div>
	</div>
</template>

<script>
	import sideTabs from 'components/studio/sideTabs.vue'
	import publishClass from 'components/studio/publish_microCourse.vue'
	import vSearch from 'Common/search.vue'
	import vPagination from 'Common/pagination.vue'
	import list from 'Common/classificationList/list/graphic/list.vue'
	import { requestMicroClassList,deleteMicroClass } from '@/service/studio.js'
	export default {
		name: 'microClass_list',
		components:{
			sideTabs,
			vSearch,
			vPagination,
			'v-list': list,
			publishClass
		},
		data(){
			return {
				visible:{
					show:false
				},
				typeNum:4,
				tips:'请输入微课名称',
				items:[],
				search:{
					name:'',
					type:''
				},
				pageParams:{
					pageSize:10,
					pageNum:1,
					totalNum:0
				},
				listData: {
	                col: 3,
	                pathUrl: '/studioMemberDetail/microClass/detail',
	                params: {
	                    names: 'id',
	                    val: 'id'
	                }
	            },
	            id: ''				//微课id,传给发布弹窗组件
			}
		},
		props:['isMember','isAdmin'],
		mounted(){
			this.getMicroClassList()
		},
		watch:{
			search:{
				handler:function(val,oldVal){
					this.getMicroClassList();
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
				this.getMicroClassList()
			},
			/*获取微课列表*/
			getMicroClassList(){
				let params = {
					name: this.search.name,
					type: this.search.type,
					studioId: this.$route.query.id
				};
				requestMicroClassList(params,this.pageParams).then((res) => {
					if(res.data.code === 200){
						this.items = res.data.entity.resultData;
						this.pageParams.totalNum = res.data.entity.totalNum;
					}
				})
			},
			/*微课删除*/
			delMicroClass(id){
				this.$confirm('此操作将删除该微课堂，是否继续？', '温馨提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning',
		          	customClass: '__custom-msg-box'
		        }).then(() => {
		          	deleteMicroClass([{id:id}]).then((res) => {
		          		if(res.data.code === 200){
		          			this.showMessage('success','删除成功');
		          			this.getMicroClassList()
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
@import '~@/asset/scss/item_list.scss';
@import '~@/asset/scss/cols.scss';
	* {
		box-sizing: border-box;
	}
	#microClass_list{
		margin-top: 30px;
		.content-left{
			width: 201px;
			min-height: 600px;
		}
		.content-right{
			width: 980px;
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
			.list-box{
				padding: 0 15px;
				.list-item-operate{
					button{
						border:none;
						margin-right: 15px;
						font-size: 14px;
						line-height: 2;
						&:hover{
							color: #ff7200;
						}
					}
				}
			}
		}
	}
</style>