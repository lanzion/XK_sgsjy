<template>
	<div id="admin_interest" class="bgw">
		<!-- 筛选盒子 -->
		<div class="options-and-search clearfix">
	      	<div class="options fl">
		        <multi-select :clearable="true" :selectData="selected.category" model="interest" :ifAll='true' style="width:175px;display:inline-block;"></multi-select>
		        <single-select :single-select-data="singleSelectDatas"
                     style="width:175px;margin-left:10px;" @callback="filterTechnology"></single-select>
	      	</div>
	      	<div class="fr">
		        <span class="total fl">共计<i>{{pageParam.totalNum}}</i>个兴趣组</span>
		        <v-search class="fl" @search="setKeyWords"></v-search>
		        <span class="btn-box">
		        	<router-link :to="{ path:'/admin/interest/create' }">创建兴趣组</router-link>
		        </span>
	      	</div>
	    </div>
	    <section class="list-box">
	    	<ul class="list" v-if="interestData.length > 0">
				<li v-for="(item,index) in interestData" class="clearfix">
					<div class="img-box">
						<img :src="getFileUrl(item.cover) || listDefault">
					</div>
					<div class="msg-box verticle-middle">
						<div class="interest-name clearfix">
							<router-link :to="{ path:'/interestsSpace/homePage',query:{ id: item.id } }" v-if="item.auditStatus == 1" class="name fl red">
								{{item.name}}
							</router-link>
							<a class="name fl" v-else>
								{{item.name}}
							</a>
						</div>
						<p class="interest-content">{{item.introduction | textOverflow(70)}}</p>
						<div class="people clearfix mb10">
							<p class="creater fl">
								<span>分类：{{item.interestType}}</span><span class="shim">|</span>
								<span>上传人：{{item.userName}}</span><span class="shim">|</span>
								<span>成员：{{item.num}}</span>
							</p>
						</div>
						<p class="interest_msg">
							<span>创建时间：{{item.createDate | dateFormat('yyyy-MM-dd')}}</span>&nbsp;&nbsp;
						</p>
					</div>
					<div class="option-box fr clearfix">
						<span class="operate-box" v-if="item.auditStatus == -1 || item.auditStatus == 2">
							<v-operate @on-submit="submitAudit(item.id,index)" @on-edit="editInterest(item.id)" :icon-group="['edit','submit']" label="兴趣组"></v-operate>
				        </span>
				        <span class="btn-box" v-else>
							<a href="javaScript:;" class="audit" v-if="item.auditStatus == 0">待审核</a>
							<a href="javaScript:;" class="audit" v-if="item.auditStatus == 3">审核中</a>
							<router-link class="link" :to="{ path:'/interestsSpace/homePage',query:{ id: item.id } }" v-if="item.auditStatus == 1">进入兴趣组</router-link>
						</span>
					</div>
				</li>
			</ul>
			<div class="empty-block" v-else>暂无数据</div>
			<v-pagination :param="pageParam" :changePage="changePage"></v-pagination>
	    </section>
	</div>
</template>

<script>
	import { loginInfo } from '@/js/getUserInfo.js'
	import search from 'Common/search.vue'
	import multiSelect from '@/components/common/select/multi_select.vue'
	import singleSelect from 'Common/select/single_select.vue'
	import pagination from 'Common/pagination.vue'
	import { requestMyInterestList, submitInterest } from '@/service/interest.js'
	import operate from 'components/common/operate.vue'
	export default {
		name: 'admin_interest',
		components: {
			'v-search': search,
			'multi-select': multiSelect,
			'single-select': singleSelect,
			'v-pagination': pagination,
			'v-operate': operate
		},
		data() {
			return {
				singleSelectDatas: {
					groupCode: 'technicalClassification',
					'ifAll': true,
					name: '技术',
					placeholder: '选择技术'
				},
				selected: {
					category: [],
					technology: '',
					name: ''
				},
				pageParam: { // 分页数据
          			pageSize: 5,
         			pageNum: 1,
          			totalNum: 0
        		},
        		interestData: []
			}
		},
		mounted() {
			this.getInterestList()
		},
		watch: {
			selected: {
				handler: function(val,oldVal){
					this.getInterestList()
				},
				deep: true
			}
		},
		methods: {
			/*设置关键词*/
			setKeyWords (str) {
        		this.selected.name = str
      		},
      		changePage(val) {
      			this.pageParam.pageNum = val;
      			this.getInterestList()
      		},
      		/*
      		 * 获取兴趣列表
      		 * name: 兴趣组名称
      		 * interestType: 分类
      		 */
      		getInterestList() {
      			let params = {
      				name: this.selected.name,
      				interestType: this.selected.category.join('-'),
      				technology: this.selected.technology,
      				userId: loginInfo.userInfo.id
      			}
      			requestMyInterestList(params, this.pageParam).then((res)=>{
      				if (res.data.code === 200) {
      					let _data = res.data.entity;
      					this.interestData = _data.resultData;
      					this.pageParam.totalNum = _data.totalNum;
      				}
      			})
      		},
      		//筛选技术
			filterTechnology(val) {
				if (val === '0') {
					this.selected.technology = '';
				} else {
					this.selected.technology = val;
				}
			},
			//待审列表操作按钮
			generateIconGroup (status) {
		        const edit = status === -1 || status === 2 ? 'edit' : '';
		        const submit = status === -1 || status === 2 ? 'submit' : '';
				const del = status === -1 || status === 2 ? 'delete' : '';
		        return [ edit, submit, del];
      		},
			//提交审核
			submitAudit(id,index) {
				this.$confirm('此操作将该兴趣组提交审核，是否继续？', '温馨提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	submitInterest({id: id}).then((res) => {
						if (res.data.code == 200) {
							this.showMessage('success', '成功提交审核');
							this.$set(this.$data.interestData[index], 'auditStatus',0);
						} else {
							this.showMessage('error', this.data.msg);
						}
					})
		        }).catch(() => {
		          this.showMessage('info', '已取消提交')
		        });
			},
			//编辑活动
      		editInterest(id) {
      			this.$router.push({ path: '/admin/interest/create', query: { id: id } })
      		}
		}
	}
</script>

<style lang="scss" scoped="">
@import '~@/asset/scss/vars.scss';
.total {
    line-height: 34px;
    font-size: 14px;
    margin-right: 10px;
    i {
    	color: #2797ed;
    }
 }
 .mb10{
	margin-bottom: 10px;
}
.shim{
	margin: 0 20px;
}
 .options-and-search{
 	padding: 10px 20px;
 	border-bottom:1px solid #c9c9c9;
 	.btn-box{
 		display: inline-block;
 		height: 34px;
 		line-height: 34px;
 		border:none;
 		padding: 0 10px;
 		background-color: $default-color;
 		margin-left: 10px;
 		a{
 			color: #fff;
 		}
 	}
 	.btn-box:hover{
 		opacity: 0.75;
 	}
 }
.list-box{
	padding: 0 20px 20px;
}
 .list {
	li {
		width: 100%;
		height: 212px;
		padding: 20px 0;
		border-bottom: 1px dashed #ccc;
		position: relative;
		a{
			display: inline-block;
		}
		// 活动图片
		.img-box {
			width: 265px;
			height: 100%;
			img{
				width: 100%;
				height: 100%;
			}
		}
		// 活动信息
		.msg-box {
			font-size: 14px;
			padding-left: 285px;
			padding-right: 100px;
			.interest-name{
				margin-bottom: 17px;
				height: 22px;
				line-height: 22px;
				.name{
					font-size: 22px;
				}
				.evaluate{
					font-size: 16px;
					color: #fd8c88;
					margin-left: 50px;
				}
			}
			.interest-content {
				font-size: 14px;
				margin-bottom: 24px;
				line-height: 22px
			}
			.interest_msg{
				color: #999;
			}
		}
		// 下载编辑分享删除
		.option-box{
			position:absolute;
			top: 50%;
			right: 0;
			width: 100px;
			-ms-transform: translate(0,-50%);		/* IE 9 */
			-webkit-transform: translate(0,-50%);	/* Safari and Chrome */
			-o-transform: translate(0,-50%);		/* Opera */
			-moz-transform: translate(0,-50%);		/* Firefox */
			.btn-box{
				display: inline-block;
				float: right;
				a{
					padding: 11px 10px;
					border:1px solid $default-color;
					color: $default-color;
				}
				.audit {
					cursor: default;
				}
				&:hover{
					.link{
						background-color: $default-color;
						color: #fff;
					}
				}
			}
		}
	}
}
.red:hover {
	color: $default-color;
}
</style>