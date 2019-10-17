<template>
  	<div id="activityDetails" class="container detail-content clearfix">
  		<!-- 左边-活动详情 -->
		<div class="content-left fl">
			<div class="banner-box clearfix">
				<div class="img-box fl">
					<img :src="getFileUrl(activityDetails.cover)" height="180" width="280">
				</div>
				<div class="msg-box fl">
					<div class="info-title">
						<h4 class="title" :title="activityDetails.title">{{activityDetails.title | textOverflow(18)}}</h4>
					</div>
					<div class="info-msg">
						<span><i class="icon-i-creator"></i>发布者：</span>
						<span>{{activityDetails.createName}}</span>
					</div>
					<div class="info-msg">
						<span><i class="icon-i-classify"></i>活动分类：</span>
						<span>{{activityDetails.activityTypeName}}</span>
					</div>
					<div class="info-msg">
						<span><i class="icon-btn-browse"></i>浏览：</span>
						<span style="color:#00a0e9;">{{activityDetails.browseNum}}</span>
					</div>
					<div class="info-msg">
						<span><i class="icon-i-address"></i>活动地点：</span>
						<span :title="activityDetails.site">{{activityDetails.site | textOverflow(20)}}</span>
					</div>
					<div class="info-msg">
						<span><i class="icon-i-activeTime"></i>活动时间：</span>
						<span>{{activityDetails.startDate | dateFormat('yyyy-MM-dd')}} 至 {{activityDetails.endDate | dateFormat('yyyy-MM-dd')}}</span>
					</div>
					<div class="info-msg">
						<span><i class="icon-i-time"></i>报名时间：</span>
						<span>{{activityDetails.beginDate | dateFormat('yyyy-MM-dd')}} 至 {{activityDetails.stopDate | dateFormat('yyyy-MM-dd')}}</span>
					</div>
				</div>
				<div class="btn-group">
					<option-btn :title='activityDetails.title' module="activity" :img="activityDetails.cover"></option-btn>
				</div>
				<div class="join-in fr" v-if="!isLogin || activityDetails.createName != userName && identity == 'student'">
					<el-button type="text" @click.prevent="showDialog" class="join-now" v-if="[0, 3, -2].includes(isApply)">立即参加</el-button>
					<el-button type="text" class="join-now f" disabled v-else-if="[-5, 1, 2, 4, 5, 6].includes(isApply)">{{applyStatus[isApply]}}</el-button>
					<el-button type="text" class="join-now f" disabled v-else>已报名</el-button>
					<el-dialog title="立即参加" :visible.sync="dialogFormVisible">
						<div class="tips">还可以输入{{inputNum}}字</div>
						<el-form :model="form">
					      	<el-input
								type="textarea"
								:autosize="{ minRows: 3, maxRows: 4}"
								placeholder="我来说点..."
								:maxlength='100'
								@change="inputChange"
								v-model="form.content"
								id="input">
							</el-input>
						</el-form>
					  	<div slot="footer" class="dialog-footer">
					    <el-button type="danger" class="btn" @click="dialogFormVisible = false;submitJoin()">提交</el-button>
					  	</div>
					</el-dialog>
				</div>
			</div>
			<div class="router-box bgw">
				<v-tab :tabs="[
	  			{ name: '活动详情', type: 'info'},
	      		{ name: '活动成员('+activityDetails.currNum+')', type: 'member'},
	      		{ name: '活动成果', type: 'result' },
	      		{ name: '活动评论('+activityDetails.commentNum+')', type: 'comment'}
		  	]" :router="router"></v-tab>
				<router-view :activityDetails="activityDetails" @commentAdd="commentAdd" :memberList="memberList" :isMember="isMember" :isCreater="activityDetails.createName === userName"></router-view>
			</div>
		</div>
		<!-- 右边-相关活动 -->
		<div class="related-list fr bgw">
			<h4 class="clearfix">
				<span class="title fl">相关活动</span>
				<a @click="toMore" class="btn-more fr">更多>></a>
			</h4>
			<v-list :items="items" :listData="listData">
                <template scope="props">
                    <div class="list-item-img__box">
                        <img :src="getFileUrl(props.item.cover) || listDefault">
                    </div>
                    <div class="list-item-title">
                    	<p class="list-title" :title="props.item.title">{{ props.item.title | textOverflow(18) }}</p>
                    	<p class="msg">
                    		<span><i class="icon-input-user"></i>{{props.item.browseNum}}人看过</span>
                    	</p>
                    </div>
                </template>
            </v-list>
		</div>
  	</div>
</template>

<script>
import breadCrumb from 'Common/breadcrumb.vue';
import optionBtn from 'Common/button/com_panel_event.vue';
import tab from 'Common/classificationList/classification/tabs.vue';
import list from 'Common/classificationList/list/graphic/list.vue'
import { scrollToTop } from '@/js/scrollToTop.js'
import {
	requestActivityDetails,
	activityApply,
	requestAuditedMember,
	checkHasAppliedOrNot,
	checkIsSigned,
	requestRelatedActivity} from '@/service/activity.js';
export default {
	name: 'activityDetails',
	components: {
		'v-tab':tab,
		'v-list':list,
		'bread-crumb':breadCrumb,
		'option-btn':optionBtn
	},
  	data () {
	  	return {
	  		form: {
	  			content:''
	  		},
	  		title:'活动',
	  		inputNum:100,
	  		// tabs: [
	  		// 	{ name: '活动详情', type: 'info'},
	    //   		{ name: '活动成员', type: 'member'},
	    //   		{ name: '活动成果', type: 'result' },
	    //   		{ name: '活动评论', type: 'comment'}
		  	// ],
		  	router: {
		  		path: '/space/activity/details'
		  	},
		  	applyStatus: {
		  		'-5': '报名未开始',
		  		'-1': '未开始',
		  		'0': '立即参加',		// 未报名
		  		'1': '待审核',			// 已报名
		  		'2': '已报名',			// 报名通过
		  		'3': '立即参加',		// 报名未通过
		  		'4': '人数已满',
		  		'5': '报名截止',
		  		'6': '活动结束'
		  	},
		  	isApply: 0,
		  	isSigned: false,
		  	sysTime: new Date(),
	  		dialogFormVisible: false,
	  		activityDetails:{
	  			currNum:0,
	  			commentNum:0
	  		},
	  		activityId:'',
	  		nowTime:new Date().getTime(),
	  		userName:'',
	  		identity:'',
	  		isLogin:false,
	  		listData:{
		  		col:1,
        		pathUrl:'/space/activity/details/info',
        		params: {
                    names: 'id',
                    val: 'id'
                }
		  	},
		  	items:[],
		  	memberList:[],				//活动成员数据
		  	// userId:'',  				//当前登录用户id
		  	isMember:false 				//是不是活动成员
	  	}
  	},
  	created() {
  		scrollToTop();
  		if(localStorage.getItem('loginInfo')){
  			this.userName = JSON.parse(localStorage.getItem('loginInfo')).userInfo.userName;
  			this.identity = localStorage.getItem('userIdentity');
  			this.isLogin = true;
  			this.userId = this.$ls.get('loginInfo').userInfo.id
  		}
  		this.router.query = this.$route.query;
  	},
  	mounted(){
  		this.getActivityDetails()
  		this.getRelatedActivity()
  		this.checkIsApply()
  		this.checkIsSigned()
  		if (this.$route.path.includes('member')) {
  			this.getMemberList()
  		}
   	},
  	watch:{
		'$route.query.id' () {
			scrollToTop()
			this.router.query = this.$route.query
			this.getActivityDetails()
			this.getRelatedActivity()
  			this.checkIsApply()
  			this.checkIsSigned()
  			this.getMemberList()
		},
		'$route.path': {
			handler: function(val, oldVal) {
				if (val.includes('member')) {
					this.getMemberList()
				}
			},
			deep: true
		}
	},
  	methods: {
  		/*
		 * 还可以输入字数提示的改变
		 */
		inputChange(){
			this.inputNum = 100;
			this.inputNum = this.inputNum - this.form.content.length;
		},
		/*
		 * 打开弹窗，改变activityId
		 */
		showDialog(){
			if (this.isSigned >= this.activityDetails.beginDate && this.isSigned <= this.activityDetails.stopDate) {
				this.showMessage('warning', '不在报名时间范围内');
			} else if (this.isLogin) {
				this.dialogFormVisible = true;
				this.inputNum = 100;
			} else {
				this.$store.commit('toggleLoginModal', true);
			}
		},
		/*
		 * 判断是否参与活动及活动状态
		 * activityId: 活动id
		 */
		checkIsApply() {
			if(this.isLogin){
				checkHasAppliedOrNot({ activityId: this.$route.query.id }).then((res)=>{
					if(res.data.code == 200){
						this.isApply = res.data.appendInfo.isApply;
					}
				})
			}
		},
		/*
		 * 判断是否报名成功
		 * activityId: 活动id
		 */
		checkIsSigned() {
			if(this.isLogin){
				checkIsSigned({ activityId: this.$route.query.id }).then((res)=>{
					if(res.data.code == 200){
						this.isSigned = res.data.appendInfo.isAudited
						this.sysTime = res.data.appendInfo.nowTime
					}
				})
			}
		},
		/*
		 * 获取活动详情
		 * id: 活动id
		 */
		getActivityDetails(){
			requestActivityDetails({id:this.$route.query.id}).then((res)=>{
				this.activityDetails = res.data.entity;
				if (!this.isLogin) {
					if(this.activityDetails.num <= this.activityDetails.currNum){
						this.isApply = 4
					}else if(new Date(this.activityDetails.stopDate).getTime() < this.nowTime ){
						this.isApply = 5
					}else if(new Date(this.activityDetails.endDate).getTime() < this.nowTime){
						this.isApply = 6
					}else if(new Date(this.activityDetails.beginDate).getTime() > this.nowTime ){
						this.isApply = -5
					}
				}
			})
		},
		/*
		 * 立即参加提交
		 */
		submitJoin(){
			let data = {
				activityId:this.$route.query.id,
				applyContent:this.form.content
			};
			activityApply(data).then((res)=>{
				if (res.data.code === 200) {
					this.isApply = this.activityDetails.audit === 0 ? 2 : 1
 					this.showMessage('success','申请已提交')
 					if (this.activityDetails.audit === 0 && this.$route.path.includes('member')) {
 						this.getMemberList()
 					}
				} else {
					this.showMessage('warning',res.data.msg);
				}
				this.form.content = '';
			})
		},
		// 获取相关活动
		async getRelatedActivity() {
			const res = await requestRelatedActivity({ activityId: this.$route.query.id },{ pageSize: 5, pageNum: 1 });
			if(res.data.code === 200){
				this.items = res.data.entity.resultData;
			}
		},
		/*
	    *获取活动成员
	    *activityId:活动Id
	    */
	    getMemberList(){
	      	requestAuditedMember({activityId:this.$route.query.id}).then((res)=>{
	        	if(res.data.code === 200){
	        		this.memberList = res.data.entity.resultData;
	        		for(let i in this.memberList){
	        			if(this.memberList[i].createName === this.userName){
	        				this.isMember = true;
	        				return
	        			}
	        		}
	        	}
	      	})
	    },
		// 评论数加1
		commentAdd(){
			this.activityDetails.commentNum++;
		},
		toMore(){
			const url = `${location.protocol}//${location.host}/${this.pages.list.activity}`
			window.location.href = url
		}
  	}
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/related_list.scss';
	*{
		box-sizing: border-box;
	}

	/*立即报名*/
	.join-in{
		margin-top: 71px;
		.join-now{
			padding:8px;
			width: 96px;
			height: 32px;
			border-radius: 3px;
			text-align: center;
			border:1px solid #d00;
			color: #d00 !important;
			.btn{
				background-color: #d00 !important;
			}
			.btn:hover{
				opacity: 0.75;
				filter: alpha(opacity=75);
			}
		}
	}

	.tips{
		text-align: right;
		width: 100%;
		line-height: 15px;
		font-size: 12px;
		margin-bottom: 5px;
	}

	.join-in:hover{
		.join-now{
			background-color: #d00;
			color: #fff!important;
		}
	}
	/*活动详情介绍*/
	.detail-content{
		// 左边
		.content-left{
			width: 906px;

			.banner-box{
				width: 100%;
				padding: 15px;
				background-color: #fff;
				margin-bottom: 20px;
				position: relative;
				.img-box{
					width: 280px;
					height: 180px;
				}
				.msg-box{
					width: 488px;
					margin-left: 12px;
					font-weight: lighter;
					.info-title{
						.title{
							cursor: default;
							height: 42px;
							line-height: 42px;
							font-size: 22px;
							font-weight: lighter;
							margin-bottom: 5px;
							color: #333;
						}
					}
					.info-msg{
						color: #626262;
						font-size: 14px;
						line-height: 1.8em;
						i{
							margin-right: 10px;
						}
					}
				}
				.btn-group{
					position: absolute;
					top: 15px;
					right: 15px;
				}
			}
			// 路由-view
			.router-box{
			}
		}
	}

	#activityDetails{
		margin-top: 20px;
		.el-breadcrumb {
		    font-size: 14px;
		    line-height: 1;
		}
		#list{
			margin: 0;
			.list{
				.list-item__box{
					margin-bottom: 0px;
					.list-item-img__box{
						img{
							height: 163px;
						}
					}
				}
			}
		}
		.list{
			.list-item__box{
				border-top: 1px solid #ddd !important;
			}
		}
	}
</style>

<style lang="scss">
	#activityDetails{
		.list{
			.list-item__box{
				border-top: 1px solid #ddd !important;
				margin-bottom: 0;
				&:hover{
					.list-title{
						color: #d00;
					}
				}
			}
		}
		.el-dialog{
			width: 476px;
		}
	}
</style>

