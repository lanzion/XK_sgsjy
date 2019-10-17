<template>
	<el-dialog id="invite_add" :visible.sync="visible.show" title="邀约信息" size="tiny" class="invite-add">
		<!-- <header class="add-head">邀约信息</header> -->
		<section class="add-input">
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
				<el-form-item label="邀约人" prop='linkMan'>
					<el-col :span="24">
						<el-input v-model="form.linkMan" placeholder="请输入邀约人名字"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="联系电话" prop='mobile'>
					<el-col :span="24">
						<el-input v-model="form.mobile" placeholder="请输入联系电话"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="邀约备注" prop='remark'>
					<el-col :span="24">
						<el-input type="textarea" :maxlength="100" v-model="form.remark" placeholder="请输入邀约备注，不超过100字符"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
		</section>
	  	<div class="btn-box">
	  		<button class="confirm-btn" @click="submitInvite">确定</button>
		    <button class="close-btn" @click="visible.show = false">取消</button>
	  	</div>
	</el-dialog>
</template>

<script>
	import { planInvite } from '@/service/businessPlan.js'
	export default {
		name:'invite_add',
		data(){
			var validatePhone = (rule, value, callback) => {
	            let regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/;
                if (value === '') {
                    callback(new Error('请输入联系电话'));
                } else if (!regular.test(value)) {
                    callback(new Error('请输入正确格式的联系电话'));
                } else {
                    callback();
                }
            };
			return {
				form:{
					linkMan: '',
					mobile: '',
					remark: ''
				},
				rules: {
					linkMan: [
						{ required: true, message: '请输入邀约人名字', trigger: 'change' },
						{ max: 50, message: '输入名字过长', trigger: 'change' }
					],
					mobile: [
						{ required: true, validator: validatePhone, trigger: 'blur' }
					],
					remark: [
						{ required: true, message: '请输入邀约备注', trigger: 'change' },
						{ max: 100, message: '不超过100字符', trigger: 'change' }
					]
				},
				userId: ''
			}
		},
		props:{
			visible:{
				type:Object,
				default(){
					return{
						show:false
					}
				}
			}
		},
		created(){
			if(this.$ls.get('loginInfo')){
				this.form.linkMan = this.$ls.get('loginInfo').userInfo.userName
				this.userId = this.$ls.get('loginInfo').userInfo.id
			}
		},
		methods:{
			submitInvite(){
				if(this.$ls.get('loginInfo')){
					this.$refs['form'].validate((valid) => {
						if(valid){
							let params = {
								businessPlanId:this.$route.query.id,
								linkMan:this.form.linkMan,
								mobile:this.form.mobile,
								remark:this.form.remark,
								seduceId:this.userId
							}
							planInvite(params).then((res) => {
								if(res.data.code == 200){
									this.showMessage('success','成功邀约')
									this.$emit('callback')
									this.$refs['form'].resetFields();
									this.visible.show = false;
								}else{
									this.showMessage('error',res.data.msg)
								}
							})
						}else{
							return false
						}
					})
				}else{
					this.shoeMessage('warning','请登录后再操作')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/asset/scss/vars.scss';
	.invite-add{
		.add-head{
			font-size: 16px;
			margin-bottom: 20px;
			min-width: 220px;
			text-align: left;
		}
		.btn-box{
			margin-top: 20px;
			text-align: right;
			.close-btn{
				padding: 5px 15px;
				font-size: 14px;
				border-radius: 3px;
			}
			.confirm-btn{
				border: none;
				padding: 6px 15px;
				font-size: 14px;
				color: #fff;
				border-radius: 3px;
				&:hover{
					opacity: 0.75;
				}
			}
		}
	}
	@each $color-key, $color-value in $color-data {
		.theme-#{$color-key} {
			.invite-add {
				.btn-box {
					.close-btn {
						border:1px solid $color-value;
						color: $color-value;
						&:hover {
							color: #fff;
							background-color: $color-value;
						}
					}
					.confirm-btn{
						background-color: $color-value;
					}
				}
			}
		}
	}
</style>

<style lang="scss">
	#invite_add{
		.el-dialog{
			min-width: 420px;
		}
	}
</style>