<template>
	<div class="adminSubjectDetails">
		<section class="backend-content__middle subject-msg">
			<subject-msg :item="subjectDetails" :isDetails="true"></subject-msg>
		</section>
		<div class="content-box clearfix">
			<div class="content-left backend-content__middle">
				<v-tabs :tabs="tabs"></v-tabs>
      			<subject-detail :subjectDetails="subjectDetails"></subject-detail>
      			<div class="btn-box">
		            <button class="bs-search-button i-form-button is-plain" @click.prevent="$router.go(-1)">返回</button>
		            <button class="bs-search-button i-form-button" @click.prevent="popupAudit">审核记录</button>
		        </div>
			</div>
		</div>
		<el-dialog class="audit-record" :visible.sync="auditVisible" title="审核记录">
        	<v-audit-record :auditData.sync="auditData" :close="close"></v-audit-record>
    	</el-dialog>
	</div>
</template>

<script>
	import subjectMsg from 'Common/module/subject/subject_item_msg.vue'
	import tabs from 'Common/classificationList/classification/tabs.vue'
	import subjectMember from 'Common/module/subject/subject_member.vue'
	import audit_record from 'Common/popupWindow/audit_record.vue' //审核记录弹窗
	import subjectDetail from '../../../space/edu/subject/children/subject_details.vue'
	import { requesrSubjectGuidDetail } from '@/service/subject.js'
	import { requestSubjectAuditDetail } from '@/service/admin_space.js'  // 审核记录数据接口
	export default {
		name:'adminSubjectDetails',
		components:{
			'subject-msg':subjectMsg,
			'v-tabs':tabs,
			'subject-member':subjectMember,
			'subject-detail':subjectDetail,
			'v-audit-record': audit_record
		},
		data () {
			return {
				tabs: [
					{ name: '课题详情', type: 'info' },
				],
				listData:{
					auditedStatus:1
				},
				subjectDetails:{},
				auditVisible:false,         // 审核记录弹窗是否可见
            	auditData: []               // 审核记录数据
			}
		},
		created(){
		},
		mounted(){
			this.getSubjectDetails();
		},
		methods:{
			/*
			*获取课题详情
			*id:this.$route.query.id
			 */
			getSubjectDetails(){
				requesrSubjectGuidDetail({id:this.$route.query.id}).then((res)=>{
					this.subjectDetails = res.data.entity;
				})
			},
			// 关闭弹框
	        close() {
	            this.auditVisible = false
	        },
	        //获取审核记录
	        popupAudit(){
	            requestSubjectAuditDetail({busId:this.$route.query.id}).then((res) => {
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
	*{
		box-sizing: border-box;
	}
	.subject-msg{
		padding: 20px;
		margin-bottom: 20px;
	}
	.content-box{
		width: 100%;
		.content-left{
			min-height: 735px;
		}
		.tabs-bar-header .el-tabs__header{
			margin-bottom: 0;
		}
	}
</style>

<style lang="scss">
	.content-box{
		.tabs-bar-header .el-tabs__header{
			margin-bottom: 0;
		}
	}
</style>