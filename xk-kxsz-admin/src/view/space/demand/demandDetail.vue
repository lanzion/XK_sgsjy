<template>
	<section id="demand_detail" class="backend-content__middle">
		<dl class="detail-item clearfix">
			<dt style="line-height: 100px;">需求封面：</dt>
			<dd class="img-box">
				<img :src="getFileUrl(detail.cover) || listDefault">
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>需求标题：</dt>
			<dd>{{detail.name}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>需求分类：</dt>
			<dd>{{detail.category | translate(categoryList,{key:'id'})}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>有效期：</dt>
			<dd>{{detail.validDate | dateFormat('yyyy-MM-dd')}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>需求详情：</dt>
			<dd v-html="detail.content"></dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>附件：</dt>
			<dd>
				<ul v-if="detail.demandResource.length">
					<li v-for="(item,index) in detail.demandResource">
						<a :href="downloadUrl(item.resourceId, item.name)" :download="item.name" style="color: #2797ed;">{{item.name}}</a>
					</li>
				</ul>
				<span v-else>暂无附件</span>
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt></dt>
			<dd>
				<button class="bs-search-button i-form-button is-plain" @click.prevent="$router.go(-1)">返回</button>
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
	import { demandDetail } from '@/service/demand.js'
	import { requestDemandAuditDetail, requestDemandAudit } from '@/service/admin_space.js'  // 列表数据接口
	import admin_audit from '@/components/common/popup/audit.vue' //审核记录弹窗
    import audit_record from '@/components/common/popup/audit_record.vue' //审核记录弹窗
	export default {
		name:'demand_detail',
		components: {
			'v-adminAudit': admin_audit,
            'v-audit-record': audit_record
		},
		data() {
			return {
				detail:{
					category:'',
					demandResource:[]
				},
				auditPopup: false,          // 审核弹窗是否可见
                AuditParams: [],			// 审核参数
                auditVisible:false,         // 审核记录弹窗是否可见
                auditData: []               // 审核记录数据
			}
		},
		computed: {
            ...mapState('dictionaryCommon', {
                categoryList (state) {
                    let dicList = (state['demandCategoryDicList'] || {}).dicList || []
                    return dicList
                }
            })
        },
		created() {
            this.getDictComb('demandCategory')
        },
		mounted(){
			demandDetail({id:this.$route.query.id}).then((res) => {
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
                requestDemandAudit(this.AuditParams).then(res => {
                    if (res.data.code == 200) {
                    	this.showMessage('success','审核成功')
                        this.auditPopup = false
                    }else{
                    	this.showMessage('error',res.data.msg)
                    }
                })
            },
            //获取审核记录
            popupAudit(){
                requestDemandAuditDetail({demandId:this.$route.query.id}).then((res) => {
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
	#demand_detail{
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
	#demand_detail{
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