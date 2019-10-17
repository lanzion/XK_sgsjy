<template>
	<section id="story_detail" class="backend-content__middle">
		<dl class="detail-item clearfix">
			<dt style="line-height: 100px;">故事封面：</dt>
			<dd class="img-box">
				<img :src="getFileUrl(detail.cover) || listDefault">
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>故事标题：</dt>
			<dd>{{detail.name}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>故事简介：</dt>
			<dd>{{detail.introduction}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>故事分类：</dt>
			<dd>{{detail.category | translate(categoryList,{key:'id'})}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt>故事详情：</dt>
			<dd v-html="detail.content"></dd>
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
	import { requestStoryDetail } from '@/service/story.js';
	import { requestStoryAuditDetail, requestStoryAudit } from '@/service/admin_space.js'  // 列表数据接口
	import admin_audit from 'Common/popupWindow/admin_audit.vue' //审核记录弹窗
    import audit_record from 'Common/popupWindow/audit_record.vue' //审核记录弹窗
	export default {
		name:'story_detail',
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
                categoryList (state) {
                    let dicList = (state['storyCategoryDicList'] || {}).dicList || []
                    return dicList
                }
            }),
        },
		created() {
            this.getDictComb('storyCategory')
        },
		mounted(){
			requestStoryDetail({id:this.$route.query.id}).then((res) => {
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
                requestStoryAudit(this.AuditParams).then(res => {
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
                requestStoryAuditDetail({storyId:this.$route.query.id}).then((res) => {
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
	#story_detail{
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
	#story_detail{
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
				width: 100%;
			}
		}
	}
</style>