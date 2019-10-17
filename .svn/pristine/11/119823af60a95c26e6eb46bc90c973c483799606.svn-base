<template>
	<section class="invite-success">
		<el-popover
		  	ref="popover"
		  	placement="top"
		  	trigger="click"
		  	v-model="visible">
		  	<header class="money-head">融资金额</header>
			<section class="money-input">
				<el-form ref="form" :model="form" :rules="rules">
					<el-form-item label="" prop='realMoney'>
						<el-input v-model.number="form.realMoney" placeholder="请输入融资金额，最多两位小数"></el-input>
					</el-form-item>
				</el-form>
			</section>
		  	<div class="money-btn">
			    <button class="close-btn" @click="visible = false">取消</button>
			    <button class="confirm-btn" @click="submitRealMoney">确定</button>
		  	</div>
		</el-popover>
		<a v-popover:popover class="success-btn">邀约成功</a>
	</section>
</template>

<script>
	import { inviteRealMoney } from '@/service/businessPlan.js'
	export default {
		name: 'invite_success',
		data() {
			var validateNum = (rule, value, callback) => {
                let regular = /^[0-9]+(.[0-9]{2})?$/;
                if (value === '') {
                    callback(new Error('请输入金额'));
                } else if (!regular.test(value)) {
                    callback(new Error('金额为最多两位小数的数字'));
                } else {
                    callback();
                }
            };
			return {
				visible: false,
				form: {
					realMoney: '',
				},
				rules: {
					realMoney: [
						{ required: true, message:'请输入金额' },
						{ validator: validateNum, trigger: 'blur'}
					]
				},
			}
		},
		props: {
			invitId: {
				type: String,
				default: ''
			},
			index: {
				type: Number,
				default: 0
			}
		},
		methods: {
			submitRealMoney() {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						let params = {
							id:this.invitId,
							realMoney:this.form.realMoney
						}
						inviteRealMoney(params).then((res) => {
							if (res.data.code == 200) {
								this.visible = false
								this.$emit('callback', this.index)
								this.showMessage('success', '邀约成功')
							} else {
								this.showMessage('error', res.data.msg)
							}
						})
					}else{
						return false;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.el-popover{
		.money-head{
			font-size: 16px;
			margin-bottom: 20px;
			min-width: 220px;
		}
		.money-btn{
			margin-top: 20px;
			text-align: right;
			.close-btn{
				padding: 5px 15px;
				font-size: 14px;
				border:1px solid #d00;
				color: #d00;
				&:hover {
					color: #fff;
					background-color: #d00;
				}
			}
			.confirm-btn{
				border: none;
				padding: 6px 15px;
				font-size: 14px;
				background-color: #d00;
				color: #fff;
				&:hover{
					opacity: 0.75;
				}
			}
		}
	}
</style>

<style lang="scss" scoped>
	.invite-success{
		display: inline-block;
		.success-btn {
			border: 1px solid #ddd;
			padding: 1px 3px;
			border-radius: 3px;
			&:hover{
				border-color: #d00;
				color: #d00;
			}
		}
	}
</style>