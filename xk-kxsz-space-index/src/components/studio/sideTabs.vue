<template>
	<nav class="side_tabs">
		<h5 class="tab-head">
			<span class="head-title">{{title}}</span>
			<span @click="visible.show = true" class="type-manage fr" v-if="hasPermissions">添加分类</span>
		</h5>
		<ul class="clearfix">
            <li class="tab_list" v-for="(item, index) in tabList" :class="{active:index == curId}" @click="listenCurTab(index, item.id)" :key="index">
            	{{ item.name | handleWorksDesc(8) }}
            </li>
        </ul>

        <el-dialog :visible.sync="visible.show" title="管理分类" class="studio-type">
			<!-- <header class="head">管理分类</header> -->
			<section class="type-list">
				<div class="list-head clearfix">
					<span class="type-title fl">分类名称</span>
					<span class="type-operate fr">操作</span>
				</div>
				<div class="add-box" v-if='isAdd'>
					<el-input v-model="name" placeholder="请输入内容" style="width:204px;" v-on:keyup.enter="addType"></el-input>
					<a href="javaScript:;" class="cancel-btn fr" @click="isAdd = false;">取消</a>
					<a href="javaScript:;" class="comfirm-btn fr" @click="addType">确定</a>
				</div>
				<ul class="list-box">
					<li class="clearfix list-item" v-for="(item,index) in typeList">
						<div class="content fl">
							<el-input v-model="item.name" placeholder="请输入内容" v-on:keyup.enter="modifyType(item.id,item.name,index)" v-if='modifyIndex == index' style="width:204px;"></el-input>
	                    	<span v-else>{{item.name}}</span>
						</div>
						<div class="operate fr">
							<div class="btn-box" v-if="modifyIndex == index">
								<a href="javaScript:;" class="comfirm-btn" @click="modifyType(item.id, item.name, index)">确定</a>
								<a href="javaScript:;" class="cancel-btn" @click="cancelModify(index)">取消</a>
							</div>
							<div v-else>
								<span title="修改" style="margin-right:10px;" class="icon-btn-edit2 edit" @click="modify(index, item.name)"></span>
								<del-popover title="删除" class="delete" :delData="{ url:'maker/studioType/del', params:{id:item.id}, name:'分类' }" @callback="getTypeList"></del-popover>
							</div>
						</div>
					</li>
				</ul>
				<div class="add-btn" @click="isAdd = !isAdd;modifyIndex = null"><i class="icon-btn-add-circle"></i>添加分类</div>
			</section>
		</el-dialog>
	</nav>
</template>

<script>
	import { mapState, mapActions } from 'Vuex'
	import delPopover from 'Common/del_popover.vue'
	import { addType, requestTypeList, modifyType } from '@/service/studio.js'
	export default{
		components:{
			'del-popover': delPopover
		},
		data(){
			return{
				visible:{
					show:false
				},
				curId: 0,
				tabList:[],
				typeList:[],
				title:'',	//头部的title
				name:'',	//添加分类的输入名称
				isAdd:false,
				modifyIndex:null,
				tooLong:false,
				studioId:'',
				curName: '', // 修改项的名称
			}
		},
		props:['typeNum'],
		created(){
			this.studioId = this.$route.query.id
		},
		mounted(){
			switch(this.typeNum){
				case 1 :
					this.title = '创客研究';
					break;
				case 2 :
					this.title = '创客成果';
					break;
				case 3 :
					this.title = '创客资源'
					break;
				case 4 :
					this.title = '微课';
					break;
				default:
					this.title = '';
					break;
			}
			this.getTypeList()
		},
		methods:{
			...mapActions({
	            'setTypeList': 'studio/setTypeList'
	        }),
			listenCurTab(index,id){
	            this.curId = index;
	            this.$emit('callback',id)
	        },
			// 获取分类列表
			getTypeList(){
				requestTypeList({type:this.typeNum,studioId:this.studioId}).then((res) => {
					if(res.data.code === 200){
						this.typeList = [...res.data.appendInfo.list]
						res.data.appendInfo.list.unshift({id:'',name:'全部'})
						this.tabList = res.data.appendInfo.list
						this.setTypeList(this.typeList)
						this.$emit('resList', res.data.appendInfo.list)
					}
				})
			},
			// 添加分类
			addType(){
				if(!this.tooLong){
					let params = {
						type:this.typeNum,
						studioId:this.studioId,
						name:this.name
					};
					addType(params).then((res) => {
						if(res.data.code === 200){
							this.showMessage('success','添加成功');
							this.getTypeList()
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
			// 切换修改状态
			modify(index, name) {
				this.modifyIndex = index
				this.isAdd = false
				this.curName = name
			},
			cancelModify(index) {
				this.modifyIndex = null
				this.$set(this.$data.typeList[index],'name', this.curName)
			},
			modifyType(id,name,index){
				let params = {
					id:id,
					type:this.typeNum,
					studioId:this.studioId,
					name:name
				};
				modifyType(params).then((res) => {
					if(res.data.code === 200){
						this.showMessage('success','修改成功');
						this.$set(this.$data.typeList[index],'name',name)
						this.modifyIndex = null;
						this.$emit('resList', res.data.appendInfo.list)
					}else{
						this.showMessage('error',res.data.msg)
					}
				})
			}
		},
		filters: {
	      	handleWorksDesc (txt = '', len = 50, sep = '。。。') { // 处理作品描述字段，字段包括HTML标签内容
	        	let reg = new RegExp('(.{' + len + '}).+')
	            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
	      	}
	    },
	    computed: mapState({
	        hasPermissions: state => state.studio.hasPermissions
	    })
	}
</script>

<style lang="scss" scoped>
$tc: #ff7200;
	.side_tabs{
		min-height: 356px;
		.tab-head{
			padding: 15px 20px;
			border-bottom: 1px solid #ccc;
			font-size: 16px;
			.head-title{
				line-height: 24px;
				font-weight: bold;
			}
			.type-manage{
				font-size: 12px;
				padding: 5px;
				border:1px solid $tc;
				border-radius: 3px;
				color: #ff7200;
				cursor: pointer;
				&:hover{
					color: #fff;
					background-color: $tc;
				}
			}
		}
		.tab_list {
		    height: 42px;
		    line-height: 42px;
		    text-indent: 40px;
		    font-size: 14px;
		    cursor: pointer;
		    box-sizing: border-box;
		    border-left: 2px solid transparent;
		    &.active {
		        color: $tc;
		        border-color: $tc;
		        background-color:  #fdf2e1;
		    }
		}
	}

	// 添加分类
	.studio-type{
		//确定、取消按钮
		.cancel-btn{
			color: #ff7200;
			border:1px solid #ff7200;
			border-radius: 3px;
			padding: 4px 9px;
		}
		.comfirm-btn{
			color: #fff;
			background-color: #ff7200;
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
					box-sizing: border-box;
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

<style lang='scss'>
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