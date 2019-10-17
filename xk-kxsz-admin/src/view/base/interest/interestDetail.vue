<template>
	<section id="interest_detail" class="backend-content__middle">
		<dl class="detail-item clearfix">
			<dt style="line-height: 100px;">兴趣组头像：</dt>
			<dd class="img-box">
				<img title="点击查看原图" @click="visible.show = true" :src="getFileUrl(detail.cover) || listDefault">
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>兴趣组属性：</dt>
			<dd>
				<el-radio-group v-model="interestAttr">
                	<p class="radio-box" style="margin-bottom: 10px;">
                		<el-radio disabled  :label="1" :key="1">公开<span class="radio-tips">平台所有用户都可看到</span></el-radio>
                	</p>
                	<p class="radio-box">
                		<el-radio disabled  :label="2" :key="2">私密<span class="radio-tips">只有班级成员可以看到</span></el-radio>
                	</p>
          		</el-radio-group>
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt></dt>
			<dd>
				<el-checkbox disabled  v-model="audit" style="padding-left: 3px;">加入审核</el-checkbox>
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>兴趣组名称：</dt>
			<dd>{{detail.name}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>兴趣组简介：</dt>
			<dd>{{detail.introduction}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt><span class="w72 text-justify">分类</span>：</dt>
			<dd>{{detail.interestTypeFormat}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt><span class="w72 text-justify">相关技术</span>：</dt>
			<dd>{{detail.techonolgyString | translate(technicalDL, {key: 'id'})}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt></dt>
			<dd>
				<button class="bs-search-button i-form-button is-plain" @click.prevent="$router.go(-1)">返回</button>
				<!-- <button class="bs-search-button i-form-button" @click.prevent="openAuditPopup" v-if="detail.auditStatus == 3">审核</button> -->
				<button class="bs-search-button i-form-button" @click.prevent="popupAudit">审核记录</button>
			</dd>
		</dl>
		<el-dialog title="审核" :visible.sync="auditPopup" size="tiny">
            <v-adminAudit :close="close" @auditSubmit="auditSubmit"></v-adminAudit>
        </el-dialog>
        <el-dialog class="audit-record" :visible.sync="auditVisible" title="审核记录">
            <v-audit-record :auditData.sync="auditData" :close="close"></v-audit-record>
        </el-dialog>
        <img-preview :visible.sync="visible" :imgUrl="detail.cover"></img-preview>
	</section>
</template>

<script>
	import { mapState, mapActions } from 'Vuex'
	import { requestInterestDetail } from '@/service/interest.js';
	import { auditInterest,requestInterestAuditRecord } from '@/service/admin_base.js'
	import admin_audit from '@/components/common/popup/audit.vue' //审核记录弹窗
    import audit_record from '@/components/common/popup/audit_record.vue' //审核记录弹窗
    import imgPreview from '@/components/common/img_preview/img_preview.vue'

	export default {
		name:'interest_detail',
		components: {
			'v-adminAudit': admin_audit,
            'v-audit-record': audit_record,
            'img-preview': imgPreview
		},
		data() {
			return {
				detail:{
					techonolgyString:''
				},
				interestAttr:'',
				audit:false,
				auditPopup: false,          // 审核弹窗是否可见
                AuditParams: [],			// 审核参数
                auditVisible:false,         // 审核记录弹窗是否可见
                auditData: [],               // 审核记录数据
                visible: { // 查看大图的控制
                    show: false
                }
			}
		},
		computed: {
            ...mapState('dictionaryCommon', {
                technicalDL (state) {
                    let dicList = (state['technicalClassificationDicList'] || {}).dicList || []
                    return dicList
                },
            }),
        },
		created() {
            this.getDictComb('technicalClassification')
        },
		mounted(){
			requestInterestDetail({id:this.$route.query.id}).then((res) => {
				if(res.data.code == 200 && res.data.entity != null) {
					this.detail = res.data.entity;
					this.interestAttr = res.data.entity.property === 'public' ? 1 : 2;
					this.audit = res.data.entity.audit == 1 ? true : false;
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
                auditInterest(this.AuditParams).then(res => {
                    if (res.data.code == 200) {
                        this.showMessage('success','审核成功')
                        this.auditPopup = false
                    }
                })
            },
            //获取审核记录
            popupAudit(){
                requestInterestAuditRecord({interestId:this.$route.query.id}).then((res) => {
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
	.w72 {
		display: inline-block;
		width: 72px;
	}
	#interest_detail{
		.detail-item{
			font-size: 14px;
			margin-bottom: 20px;
			line-height: 1.5em;
			dt{
				float: left;
				width: 90px;
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
	#interest_detail{
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
	}
</style>