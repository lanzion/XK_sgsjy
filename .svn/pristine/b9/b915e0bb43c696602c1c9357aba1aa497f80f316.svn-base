<template>
	<div id="collection" class="private-letter bgw admin-list-head">
		<div class="search-box">
			<el-select class="select-type" v-model="cur_tab" placeholder="请选择收藏分类">
    			<el-option
      				v-for="item in options"
			      	:key="item.type"
			      	:label="item.name"
			      	:value="item.type">
    			</el-option>
  			</el-select>
			<v-tabs :tabs="tabs" @searchVal="searchParam" :total="totalNum" :is_search="true" :count="count"></v-tabs>
		</div>
		<section class="collection-list">
			<transition-group class="list clearfix" v-if="collectionData.length" name="list-item" tag="ul" mode="out-in">
				<li class="list-item-box clearfix fl" :style="{width: listWidth}" v-for="(item,index) in collectionData" :key="item.id">
					<div class="face-box fl">
						<router-link :to="dynamicPath({ identity: item.identity, orgId: item.orgId, userId: item.userInfoId })" class="name">
							<img :src="getFileUrl(item.face) || faceDefault">
						</router-link>
					</div>
					<div class="msg-box">
						<p class="content ellipsis">
							<a :href="item.url" :title="item.name">
								{{item.name | textOverflow(12)}}
							</a>
						</p>
						<p class="content ellipsis">
							<span class="coll_type">{{item.userName}}</span>
							<span class="coll_type">的{{collectionType[item.collectType]}}</span>
						</p>
						<a class="cancel-btn" href="javaScript:;" @click="cancelCollect(item.busId)">取消收藏</a>
					</div>
				</li>
			</transition-group>
			<div class="empty-block" v-else>暂无收藏</div>
			<v-pagination :param="param" :changePage="changePage"></v-pagination>
		</section>
	</div>
</template>

<script>
	import tabs from 'Common/classificationList/classification/tabs.vue'
	import pagination from 'Common/pagination.vue'
	import { requestCollectionList, cancelCollection } from '@/service/collection.js'
 	export default {
		name: 'collection',
		components: {
			'v-tabs': tabs,
			'v-pagination': pagination
		},
		data() {
			return {
				search:'',
				totalNum:0,
				tabs: [],
				options: [
		          	{ name: '全部', type: '' },
		          	{ name: '作品', type: '1' },
		          	{ name: '资源', type: '2' },
		          	{ name: '课程', type: '3' },
		          	{ name: '项目', type: '4' },
		          	{ name: '活动', type: '5' },
		          	{ name: '课题', type: '6' },
		          	{ name: '服务', type: '7' },
		          	{ name: '需求', type: '8' },
		          	{ name: '商业策划', type: '9' },
		          	{ name: '故事', type: '10' },
		          	{ name: '文章', type: '11' },
		          	{ name: '网上实训室', type: '12' },
		        ],
		        count: {'name':'收藏'},
		        cur_tab: null,
		        param:{
		        	totalNum:0,
		        	pageSize:9,
		        	pageNum:1
		        },
		        pageParam:{
		        	pageSize:9,
		        	pageNum:1
		        },
		        collectionData:[],
		        userId:'',
		        collectionType: {				//收藏类型
		        	'1': '作品',
		        	'2': '资源',
		        	'3': '课程',
		        	'4': '项目',
		        	'5': '活动',
		        	'6': '课题',
		        	'7': '服务',
		        	'8': '需求',
		        	'9': '商业策划',
		        	'10': '故事',
		        	'11': '文章',
		        	'12': '网上实训室'
		        }
			}
		},
		computed: {
	        listWidth: function() {
	            return this.getWidth(4)
	        }
	    },
	    watch: {
	    	cur_tab: {
	    		handler: function(val, oldVal) {
	    			this.getCollectionList()
	    		},
	    		deep: true
	    	}
	    },
		mounted(){
			if(localStorage.getItem('loginInfo')){
				this.userId = JSON.parse(localStorage.getItem('loginInfo')).userInfo.id;
			};
			this.getCollectionList();
		},
		methods: {
			searchParam(val){
				this.search = val;
				this.getCollectionList();
			},
	  	    changePage(val){
	  	    	this.pageParam.pageNum = val;
	  	    	this.getCollectionList();
	  	    },
	  	    /*
	  	    *获取收藏列表
	  	    *userId；用户id
	  	    *collectType 0.所有1.作品,2.资源,3.课程,4.项目,5.活动,6.课题
	  	    *name：模糊查询
	  	    */
	  	    getCollectionList(){
	  	    	let params = {
	  	    		userId: this.userId,
	  	    		collectType: this.cur_tab == null ? '' : this.cur_tab,
	  	    		name: this.search
	  	    	};
	  	    	requestCollectionList(params,this.pageParam).then((res) => {
	  	    		if(res.data.code === 200){
	  	    			this.collectionData = res.data.entity.resultData;
	  	    			this.totalNum = res.data.entity.totalNum;
	  	    			this.param.totalNum = res.data.entity.totalNum;
	  	    		}
	  	    	});
	  	    },
	  	    /*
	  	    *取消收藏
	  	    *busId: 业务id
	  	    *collectType：收藏类型(1.作品,2.资源,3.课程,4.项目,5.活动,6.课题)
	  	    *userId：登录用户id
	  	    */
	  	   	async cancelCollect(id){
	  	   		if(localStorage.getItem('loginInfo')){
	  	   			let params = {
		  	   			busId: id,
		  	   			userId: this.userId
		  	   		};
		  	   		cancelCollection(params).then((res) => {
		  	   			if (res.data.code === 200) {
		  	   				this.showMessage('success','已取消收藏');
		  	   				this.getCollectionList()
		  	   			} else {
		  	   				this.showMessage('warning',res.data.msg)
		  	   			}
		  	   		})
	  	   		} else {
	  	   			this.$store.commit('toggleLoginModal', true);
	  	   		}
	  	   	}
		}
	}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
	// 过渡动画
	.list-item-box {
	    transition: opacity .5s, transform .5s;
	    cursor: pointer;
	}
	.list-item-enter, .list-item-leave-active {
	    opacity: 0;
	    transform: translate(0);
	}
	.list-item-enter {
	    transform: scale(.1);
	}
	.list-item-leave-active {
	    position: absolute;
	}
	#collection{
		.search-box {
			border-bottom: 1px solid #c9c9c9;
			position: relative;
			.select-type {
				position: absolute;
    			bottom: 10px;
			    left: 15px;
			    z-index: 2;
			}
		}

		.collection-list{
			padding: 0px 18px 20px;
			.list{
				.list-item-box{
					padding: 20px 0px;
					.face-box{
						margin-right: 10px;
						img{
							width: 52px;
							height: 52px;
							border-radius: 100%;
						}
					}
					.msg-box{
						.content{
							font-size: 14px;
							line-height: 22px;
							.coll_type{
								font-size: 12px;
								cursor: default;
								color: #999;
							}
							a{
								font-size: 14px;
								color: #333;
								&:hover{
									color: $default-color;
								}
							}
						}
						.cancel-btn{
							box-sizing: border-box;
							display: inline-block;
							width: 62px;
							height: 24px;
							line-height: 22px;
							text-align: center;
							border-radius: 3px;
							border: 1px solid #dfdfdf;
							color: #626262;
							margin-top: 5px;
							&:hover{
								color: $default-color;
								border-color: $default-color;
							}
						}
					}
				}
			}
		}
	}
</style>

<style lang="scss">
	#collection{
		.search-box {
			.tabs-bar-header {
				margin-bottom: 0px;
			}
			.el-tabs__header {
				border: none;
			}
		}
	}
</style>