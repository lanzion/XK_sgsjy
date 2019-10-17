<template>
	<div id="enroll_detail" class="detail bgw">
		<h4 class="detail_head">开通申请</h4>
		<section id="enroll_detail" class="">
			<dl class="detail-item clearfix">
				<dt><span class="w56 text-justify">申请编号</span>：</dt>
				<dd>{{detail.applyNo}}</dd>
			</dl>
			<dl class="detail-item clearfix">
				<dt><span class="w56 text-justify">单位类型</span>：</dt>
				<dd>{{type[detail.type]}}</dd>
			</dl>
			<dl class="detail-item clearfix">
				<dt><span class="w56 text-justify">所在区域</span>：</dt>
				<dd>{{detail.provinceName}}{{detail.cityName}}{{detail.areaName}}</dd>
			</dl>
			<dl class="detail-item clearfix">
				<dt><span class="w56 text-justify">单位名称</span>：</dt>
				<dd>{{detail.name}}</dd>
			</dl>
			<dl class="detail-item clearfix">
				<dt><span class="w56 text-justify">联系人</span>：</dt>
				<dd>{{detail.linkName}}</dd>
			</dl>
			<dl class="detail-item clearfix">
				<dt><span class="w56 text-justify">联系电话</span>：</dt>
				<dd>{{detail.phone}}</dd>
			</dl>
			<dl class="detail-item clearfix">
				<dt><span class="w56 text-justify">电子邮箱</span>：</dt>
				<dd>{{detail.email}}</dd>
			</dl>
			<dl class="detail-item clearfix">
				<dt style="line-height: 200px;">组织机构代码证：</dt>
				<dd class="img-box">
					<img :src="getFileUrl(detail.certPhoto) || listDefault">
				</dd>
			</dl>
			<dl class="detail-item clearfix" v-if="detail.status == '1'">
				<dt></dt>
				<dd>
					<button class="btn open_btn" @click.prevent="openOrg">开通</button>
					<button class="btn refuse_btn" @click.prevent="dialogVisible = true">拒绝</button>
				</dd>
			</dl>
			<dl class="detail-item clearfix" v-else-if="detail.status == '2'">
				<dt></dt>
				<dd>
					<button class="btn open_btn">已开通</button>
				</dd>
			</dl>
			<dl class="detail-item clearfix" v-else-if="detail.status == '3'">
				<dt></dt>
				<dd>
					<button class="btn refuse_btn">已拒绝</button>
				</dd>
			</dl>
		</section>
		<el-dialog title="拒绝理由" :visible.sync="dialogVisible" @close="close">
		  	<el-form ref="form" :model="form" label-width="80px" :rules="rules">
		  		<el-form-item label="拒绝理由" prop="opinion">
    				<el-input type="textarea" :maxlength="1000" v-model="form.opinion" placeholder="请输入拒绝理由" :autosize="{ minRows: 3}"></el-input>
  				</el-form-item>
		  	</el-form>
		  	<div class="btn-group">
		  		<button class="btn cancel_btn" @click.prevent="close">取消</button>
				<button class="btn open_btn" @click.prevent="refuseApply">确定</button>
		  	</div>
		</el-dialog>
	</div>
</template>

<script>
	import { orgApplyDetail, auditOrgApply } from '@/service/admin_base.js'
	export default {
		name:'enroll_detail',
		components: {
		},
		data() {
			return {
				detail:{},
				type: {
                    1: '学校',
                    2: '教育局'
                },
                dialogVisible: false,
                form: {
                	opinion: ''
                },
                rules: {
                    opinion: [
                        { required: true, message: '请填写拒绝的理由', trigger: 'blur' }
                    ]
                }
			}
		},
		created() {
        },
		mounted(){
			orgApplyDetail({ id: this.$route.query.id }).then((res) => {
				if(res.data.code == 200) {
					this.detail = res.data.entity
				}
			})
		},
		methods:{
            openOrg() {
                this.$confirm(`此操作将该${this.type[this.detail.type]}, 是否继续?`, '提示', {
          			confirmButtonText: '确定',
          			cancelButtonText: '取消',
          			type: 'warning'
        		}).then(() => {
                    auditOrgApply({ id: this.$route.query.id, status: 2 }).then((res) => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: `已成功开通该${this.type[this.detail.type]}`,
                                type: 'success'
                            })
                            this.$router.push({ path: '/base/enroll' })
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            })
                        }
                    })
        		}).catch(() => {
          			this.$message({
            			type: 'info',
            			message: '已取消开通'
          			})
        		})
            },
            refuseApply() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        auditOrgApply({ id: this.$route.query.id, status: 3, opinion: this.form.opinion }).then((res) => {
                            if (res.data.code === 200) {
                                if (res.data.code === 200) {
		                            this.$message({
		                                message: `已拒绝开通该${this.type[this.detail.type]}`,
		                                type: 'success'
		                            })
		                            this.dialogVisible = false
		                            this.$router.push({ path: '/base/enroll' })
		                        } else {
		                            this.$message({
		                                message: res.data.msg,
		                                type: 'error'
		                            })
		                        }
                            }
                        })
                    } else {
                        this.$message({
                            message: '请填写拒绝的理由',
                            type: 'info'
                        })
                        return false
                    }
                })
            },
            close() {
                this.dialogVisible = false
                this.form.opinion = ''
            }
		}
	}
</script>

<style lang="scss" scoped>
.w56 {
	display: inline-block;
	width: 56px;
}
	.detail {
		border-radius: 5px;
		.btn {
			width: 68px;
			height: 32px;
			box-sizing: border-box;
			font-size: 14px;
			color: #fff;
		}
		.open_btn {
			background-color: #2797ed;
			margin-right: 10px;
			&:hover {
				opacity: 0.75;
			}
		}
		.refuse_btn {
			background-color: #ccc;
			&:hover {
				opacity: 0.75;
			}
		}
		.cancel_btn {
			border: 1px solid #2797ed;
			color: #2797ed;
			height: 30px;
			margin-right: 10px;
			&:hover {
				background-color: #2797ed;
				color: #fff;
			}
		}
		.btn-group {
			text-align: right;
		}
	}
	#enroll_detail{
		padding: 15px;
		.detail-item{
			font-size: 14px;
			margin-bottom: 20px;
			line-height: 1.5em;
			dt{
				float: left;
				width: 120px;
				min-height: 20px;
				text-align: right;
				margin-right: 5px;
			}
			.img-box{
				img{
					width: 280px;
					height: 200px;
				}
			}
			dd{
				margin-left: 100px;
			}
		}
	}
	.detail_head {
		padding: 15px;
		font-size: 16px;
		border-bottom: 1px solid #ccc;
		margin-bottom: 20px;
	}
</style>

<style lang="scss">
	#enroll_detail {
		.el-dialog {
			width: 580px;
		}
	}
</style>