<template>
	<div id="private_letter" class="private-letter bgw">
		<div class="tab-box">
			<v-tabs :tabs="[
		          	{ name: '私信', type: 'letter'},
		          	{ name: '系统消息', type: 'sysmsg'}
		        ]" :router="router" @searchVal="searchParam" :total="totalNum" :is_search='isPrivate' :count="count"></v-tabs>
			<button class="publish-letter" v-if="isPrivate" @click="visible.show = true">发私信</button>
		</div>
		<publish-letter :visible="visible" :getLetterList="getLetterList"></publish-letter>
		<router-view :msgData="msgData" :param="param" :getLetterList="getLetterList"></router-view>
	</div>
</template>

<script>
	import tabs from 'Common/classificationList/classification/tabs.vue'
	import publishLetter from 'components/admin/backstage/privateLetter/publish_letter.vue'
	import { requestLetterList } from '@/service/privateLetter.js';
	export default {
		name: 'private_letter',
		components: {
			'v-tabs': tabs,
			'publish-letter': publishLetter,
		},
		data() {
			return {
				visible:{
					show: false
				},
				is_search:false,
				search:'',
				totalNum:0,
				// tabs: [
		  //         	{ name: '私信', type: 'letter'},
		  //         	{ name: '系统消息', type: 'sysmsg'}
		  //       ],
		        count:{'name':'消息'},
		        router:{
		        	path:'/admin/privateLetter',
		        },
		        receiveId:'',
		        isPrivate:true,
		        param:{
					totalNum:0,
					pageSize:10,
					pageNum:1
				},
				msgData:[]
			}
		},
		mounted(){
			if(localStorage.getItem('loginInfo')){
				this.receiveId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id;
			};
			this.routeChange();
		},
		watch:{
			"$route":"routeChange",
		},
		methods: {
			routeChange(){
				if(this.$route.path.includes('letter') && !this.$route.path.includes('letterDetail')){
					this.getLetterList();
					this.isPrivate = true;
					this.count = {
						name:'联系人'
					}
				}else{
					this.isPrivate = false;
					this.count = undefined;
				}
			},
			searchParam(val){
				this.search = val;
				this.getLetterList(1);
			},
			/*
      		*获取私信列表
      		*receivedId:''
      		*sendUserName:''
      		*/
      		getLetterList(pageNum){
      			let params = {
      				toId:this.receiveId,
      				sendUserName:this.search
      			};
      			requestLetterList(params,{ pageNum: this.param.pageNum, pageSize: 10 }).then((res) => {
      				if(res.data.code === 200){
      					this.msgData = res.data.entity.resultData;
      					this.param.totalNum = res.data.entity.totalNum;
      					this.totalNum = res.data.entity.totalNum;
      				}
      			})
      		},
		}
	}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
	#private_letter{
		padding: 10px 0px 20px;
		.tab-box{
			position: relative;
		}
		.publish-letter{
			border:none;
			font-size: 14px;
			color: #fff;
			background-color: $default-color;
			padding:0px 15px;
			height: 34px;
			line-height: 34px;
			position: absolute;
			top: -1px;
			right: 18px;
			&:hover{
				opacity: 0.75;
			}
		}
	}
</style>

<style lang="scss">
	#private_letter{
		.tabs{
			position: relative;
		}
		.tabs-bar-header{
			.tabs-right{
				top: -1px;
				right: 102px;
			}
		}
		#pagination{
			.block{
				.el-pagination{
					padding-right: 18px;
				}
			}
		}
	}
</style>