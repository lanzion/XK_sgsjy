<template>
	<el-dialog :visible.sync="visible.show" title="管理分类" class="studio-type">
		<!-- <header class="head">管理分类</header> -->
		<section class="type-list">
			<div class="list-head clearfix">
				<span class="type-title fl">分类名称</span>
				<span class="type-operate fr">操作</span>
			</div>
			<div class="add-box" v-if='isAdd'>
				<el-input v-model="name" placeholder="请输入内容" style="width:204px;"></el-input>
				<a href="javaScript:;" class="cancel-btn fr" @click="isAdd = false;">取消</a>
				<a href="javaScript:;" class="comfirm-btn fr" @click="addType">确定</a>
			</div>
			<ul class="list-box">
				<li class="clearfix list-item" v-for="(item,index) in typeList">
					<div class="content fl">
						<el-input v-model="item.name" placeholder="请输入内容" v-if='modifyIndex == index' style="width:204px;"></el-input>
                    	<span v-else>{{item.name}}</span>
					</div>
					<div class="operate fr">
						<div class="btn-box" v-if="modifyIndex == index">
							<a href="javaScript:;" class="comfirm-btn" @click="modifyType(item.id,item.name,index)">确定</a>
							<a href="javaScript:;" class="cancel-btn" @click="modifyIndex = null;">取消</a>
						</div>
						<div class="" v-else>
							<span title="修改" style="margin-right:10px;" class="icon-btn-edit2 edit" @click="modifyIndex = index;isAdd = false;"></span>
							<del-popover title="删除" class="delete" :delData="{ url:'maker/studioType/del', params:{id:item.id}, name:'分类' }" @callback="getTypeList"></del-popover>
						</div>
					</div>
				</li>
			</ul>
			<div class="add-btn" @click="isAdd = !isAdd;modifyIndex = null"><i class="icon-btn-add-circle"></i>添加分类</div>
		</section>
	</el-dialog>
</template>

<script>
	import { addType,requestTypeList,modifyType } from '@/service/studio.js'
	import delPopover from 'Common/del_popover.vue'
	export default {
		name: 'studio_type',
		components:{
			'del-popover': delPopover
		},
		data () {
			return {
				typeList:[],
				name:'',
				isAdd:false,
				modifyIndex:null,
				tooLong:false
			}
		},
		props:{
			typeNum:{
				type:Number,
				default: 1
			},
			visible:{
				type:Object,
				default () {
					return {
						show:false
					}
				}
			}
		},
		mounted(){
			this.getTypeList()
		},
		watch:{
			name:{
				handler:function(val,oldVal){
					if(val.length > 40){
						this.showMessage('error','不能超过40个字符');
						this.tooLong = true
					}else{
						this.tooLong = false
					}
				},
				deep:true
			}
		},
		methods:{
			// 获取分类列表
			getTypeList(){
				requestTypeList({type:this.typeNum,studioId:'d6d1e297dd76449d91dd8159d14b8f28'}).then((res) => {
					if(res.data.code === 200){
						this.typeList = res.data.appendInfo.list
					}
				})
			},
			// 添加分类
			addType(){
				if(!this.tooLong){
					let params = {
						type:this.typeNum,
						studioId:'d6d1e297dd76449d91dd8159d14b8f28',
						name:this.name
					};
					addType(params).then((res) => {
						if(res.data.code === 200){
							this.showMessage('success','添加成功');
							this.getTypeList();
							this.name = '';
							this.isAdd = false;
						}else{
							this.showMessage('error',res.data.msg)
						}
					})
				}else{
					this.showMessage('error','分类名称过长')
				}
			},
			modifyType(id,name,index){
				let params = {
					id:id,
					type:this.typeNum,
					studioId:'d6d1e297dd76449d91dd8159d14b8f28',
					name:name
				};
				modifyType(params).then((res) => {
					if(res.data.code === 200){
						this.showMessage('success','修改成功');
						this.$set(this.$data.typeList[index],'name',name);
						this.modifyIndex = null;
					}else{
						this.showMessage('error',res.data.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	*{
		box-sizing:border-box;
	}
	.studio-type{
		//确定、取消按钮
		.cancel-btn{
			color: #d00;
			border:1px solid #d00;
			border-radius: 3px;
			padding: 4px 9px;
		}
		.comfirm-btn{
			color: #fff;
			background-color: #d00;
			border-radius: 3px;
			margin-right: 10px;
			padding: 5px 10px;
			&:hover{
				opacity: 0.75;
			}
		}
		//分类列表
		.type-list{
			padding: 20px 30px 40px;
			.list-head{
				padding: 13px 20px;
				background-color: #f6f6f6;
			}
			.add-box{
				padding: 9px 13px;
				border:1px solid #eee;
				border-top: none;
				a{
					font-size: 12px;
					margin-top: 5px;
				}
			}
			.list-box{
				margin-bottom: 10px;
				.list-item{
					padding: 15px 20px;
					border:1px solid #eee;
					border-top: none;
					line-height: 32px;
					.operate{
						.btn-box{
							a{
								font-size: 12px;
							}
						}
					}
				}
			}
			.add-btn{
				border:1px dashed #f19494;
				text-align: center;
				cursor: pointer;
				background-color: #fff9f9;
				padding: 10px 0;
				i{
					color: #f19494;
					margin-right: 10px;
				}
			}
		}
	}
</style>

<style lang="scss">
	.studio-type{
		.el-dialog{
			width: 475px;
		}
		.el-dialog__body{
			padding: 0;
			.head{
				font-size: 16px;
				background-color: #f6f6f6;
				padding: 18px 20px;
				border-bottom: 1px solid #ccc;
			}
		}
	}
</style>