<template>
	<div id="activityDetails">
	<!-- 活动描述 -->
		<div class="activity-img backend-content__middle clearfix" v-if="isAudited">
			<div class="img-box fl">
				<img :src="getFileUrl(detailsData.cover)" height="190" width="193">
			</div>
			<div class="activity-msg fl">
				<p class="activity-name">{{detailsData.title}}</p>
				<p class="activity-content">{{detailsData.details | textOverflow(100,'...')}}</p>
				<p class="activity-type mb10">分类：{{detailsData.activityTypeName}}</p>
				<p class="time-range">
					活动时间：<span>{{detailsData.startDate | dateFormat('yyyy-MM-dd HH:mm')}} 至 {{detailsData.endDate | dateFormat('yyyy-MM-dd HH:mm')}}</span>
				</p>
				<p class="end-time">
					报名时间：<span>{{detailsData.beginDate | dateFormat('yyyy-MM-dd HH:mm')}} 至 {{detailsData.stopDate | dateFormat('yyyy-MM-dd HH:mm')}}</span>
				</p>
			</div>
		</div>
		<!-- 活动具体 -->
		<div class="activity-details backend-content__middle">
			<activity-detail :detailsData="detailsData"></activity-detail>
			<div class="btn-box">
				<button class="bs-search-button i-form-button is-plain" @click.prevent="$router.go(-1)">返回</button>
				<button class="bs-search-button i-form-button" @click.prevent="popupAudit">审核记录</button>
			</div>
		</div>
		<el-dialog class="audit-record" :visible.sync="auditVisible" title="审核记录">
            <v-audit-record :auditData.sync="auditData" :close="close"></v-audit-record>
        </el-dialog>
	</div>
</template>

<script>
	import tabs from 'Common/classificationList/classification/tabs.vue';
	import activityDetail from 'components/admin/backstage/activity/activity_mng_detail.vue'
    import audit_record from 'Common/popupWindow/audit_record.vue' //审核记录弹窗
	import { requestActivityDetails } from '@/service/activity.js'
	import { requestActivityAuditDetail } from '@/service/admin_space.js'  // 列表数据接口
	export default {
		name: 'activityDetail',
			components: {
	      	'v-tabs': tabs,
	      	'activity-detail':activityDetail,
            'v-audit-record': audit_record
	    },
		data() {
			return {
				detailsData:{
					resourceList:[]
				},
				tabs: [
		      		{ name: '活动详情', type: 'activityDetail'},
		      		{ name: '活动成员', type: 'activityMember'},
		      		{ name: '活动成果', type: 'activityResult'},
		      		{ name: '讨论区', type: 'activityDiscuss'}
			  	],
			  	router: {
			  		path: '/space/activity/detail'
			  	},
			  	isAudited:true,
			  	auditVisible:false,         // 审核记录弹窗是否可见
			  	auditData: []               // 审核记录数据
			}
		},
		created(){
		},
		mounted(){
			this.getDetails()
		},
		methods:{
			getDetails() {
				requestActivityDetails({id:this.$route.query.id}).then((res) =>{
					// console.log(res)
					this.detailsData = res.data.entity;
				})
			},
			// 关闭弹框
            close() {
                this.auditVisible = false
            },
			//获取审核记录
            popupAudit(){
                requestActivityAuditDetail({activityId:this.$route.query.id}).then((res) => {
                    if(res.data.code === 200){
                        this.auditData = res.data.appendInfo.list
                    }
                });
                this.auditVisible = true;
            },
		}
	}
</script>

<style lang="scss" scoped>
	.img-box{
		width: 194px;
		height: 190px;
		margin-right: 20px;
		margin-bottom: 20px;
		background-color: #fff;
	}
	.activity-msg{
		width: 670px;
		overflow: hidden;
		padding-top: 10px;
		.activity-name{
			font-size: 22px;
			margin-bottom: 20px;
		}
		.activity-content{
			font-size: 14px;
			line-height: 20px;
			margin-bottom: 25px;
		}
		.activity-type,.time-range,.end-time{
			font-size: 14px;
			line-height: 20px;
			span{
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>

<style lang="scss">
	.activity-details{
		.tabs-bar-header{
	        margin-bottom: 20px;
	    }
	}
	#activityDetails{
		.el-dialog{
			width: 822px !important;
		}
	}
</style>