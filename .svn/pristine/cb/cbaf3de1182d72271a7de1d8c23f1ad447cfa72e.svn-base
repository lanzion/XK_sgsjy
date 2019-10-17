<template>
	<section id="plan_detail" class="backend-content__middle">
		<dl class="detail-item clearfix">
			<dt style="line-height: 100px;">策划封面：</dt>
			<dd class="img-box">
				<img :src="getFileUrl(detail.cover) || listDefault">
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>策划名称：</dt>
			<dd>{{detail.name}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>分类：</dt>
			<dd>{{detail.category | translate(businessPlanCategoryDL, {key: 'id'})}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>融资金额(起)：</dt>
			<dd>{{detail.startMoney != null ? detail.startMoney.toFixed(2) : '0.00'}} 元</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>融资金额(止)：</dt>
			<dd>{{detail.endMoney != null ? detail.endMoney.toFixed(2) : '0.00'}} 元</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>地区：</dt>
			<dd>{{detail.category}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>详细地址：</dt>
			<dd>{{detail.address}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>相关作品：</dt>
			<dd>{{detail.introduction}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>策划描述：</dt>
			<dd v-html="detail.description"></dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>备注：</dt>
			<dd>{{detail.remark}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt></dt>
			<dd>
				<button class="bs-search-button i-form-button is-plain" @click.prevent="$router.go(-1)">返回</button>
				<!-- <button class="bs-search-button i-form-button" @click.prevent="openAuditPopup" v-if="detail.auditStatus === 3">审核</button> -->
				<button class="bs-search-button i-form-button" @click.prevent="popupAudit">审核记录</button>
			</dd>
		</dl>
		<el-dialog title="审核" :visible.sync="auditPopup" size="tiny">
            <v-adminAudit :close="close" @auditSubmit="auditSubmit"></v-adminAudit>
        </el-dialog>
        <el-dialog class="audit-record" :visible.sync="auditVisible" title="审核记录">
            <v-audit-record :auditData.sync="auditData" :close="close"></v-audit-record>
        </el-dialog>
	</section>
</template>

<script>
	import { mapState, mapActions } from 'Vuex'
	import dataTranslation from '@/js/dataTranslation.js'
	import { requestPlanDetail } from '@/service/businessPlan.js'
	import { requestPlanAudit,requestPlanAuditDetail } from '@/service/admin_space.js'
	import admin_audit from 'Common/popupWindow/admin_audit.vue' //审核记录弹窗
    import audit_record from 'Common/popupWindow/audit_record.vue' //审核记录弹窗
	export default {
		name:'plan_detail',
		components: {
			'v-adminAudit': admin_audit,
            'v-audit-record': audit_record
		},
		data() {
			return {
				detail:{
					category:''
				},
				auditPopup: false,          // 审核弹窗是否可见
                AuditParams: [],			// 审核参数
                auditVisible:false,         // 审核记录弹窗是否可见
                auditData: []               // 审核记录数据
			}
		},
		computed: {
			...mapState('dictionaryCommon', {
                businessPlanCategoryDL (state) {
                    let dicList = (state['businessPlanCategoryDicList'] || {}).dicList || []
                    return dicList
                },
                auditStatusDL (state) {
                    let dicList = (state['auditStatusDicList'] || {}).dicList || []
                    return dicList
                },
            })
        },
		created() {
        },
		mounted(){
			this.getDictComb("businessPlanCategory")
			requestPlanDetail({id:this.$route.query.id}).then((res) => {
				if(res.data.code == 200 && res.data.entity != null) {
					this.detail = res.data.entity;
				}
			})
		},
		methods:{
			...mapActions({
                'getDictComb': 'dictionaryCommon/getDictComb'
            }),
             // 关闭弹框
            close() {
                this.auditVisible = false;
                this.auditPopup = false
            },
            /*
             * 审核
             */
            openAuditPopup() {
                this.AuditParams.push({id: this.$route.query.id})
                this.auditPopup = true
            },
            auditSubmit (item) {
                this.AuditParams.forEach(i => {
                    i.auditStatus = (item.result - 0)
                    i.remarks = item.explain
                })
                requestPlanAudit(this.AuditParams).then(res => {
                    if (res.data.code == 200) {
                    	this.showMessage('success','审核成功')
                        this.auditPopup = false;
                    }
                })
            },
            //获取审核记录
            popupAudit(){
                requestPlanAuditDetail({businessPlanId:this.$route.query.id}).then((res) => {
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
	#plan_detail{
		.detail-item{
			font-size: 14px;
			margin-bottom: 20px;
			line-height: 1.5em;
			dt{
				float: left;
				width: 95px;
				min-height: 20px;
				text-align: right;
			}
			.img-box{
				img{
					width: 100px;
					height: 100px;
				}
			}
			dd{
				margin-left: 100px;
			}
		}
	}
</style>

<style lang="scss">
	#plan_detail{
		.el-dialog{
			width: 822px !important;
		}
		.radio-box{
			.el-radio{
				.el-radio__label{
					.radio-tips{
						font-size: 12px;
						color: #999;
						margin-left: 20px;
					}
				}
			}
		}
		.detail-item{
			.bs-search-button{
				margin-left: 0px;
				margin-right: 10px;
			}
			.is-plain{
				margin-left: 0px;
			}
		}
		p{
			text-align: left;
			font-size: 14px;
			line-height: 2em;
			img{
				max-width: 850px;
				margin: 20px 0;
				transform: translate(50%,0);
			    -ms-transform: translate(50%,0);       /* IE 9 */
			    -webkit-transform: translate(50%,0);   /* Safari and Chrome */
			    -o-transform: translate(50%,0);        /* Opera */
			    -moz-transform: translate(50%,0);      /* Firefox */
			}
		}
	}
</style>