<template>
	<!-- 邀请弹框 -->
    <el-dialog title="邀请入驻" :visible.sync="inviteDialog.show" @close="close">
        <el-form :model="inviteForm" :rules="inviteRules" ref="inviteForm" label-width="100px">
            <el-col :span="24">
                <el-form-item label="邀请说明" prop="instruction">
                    <el-input type="textarea" v-model="inviteForm.instruction" placeholder="填写邀请说明(100字以内)" resize="none" :rows="3"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24" class="mb20">
                <button type="primary" class="fr sure btn" @click.prevent="addInvite">确定</button>
                <button class="cancel fr btn" @click.prevent="inviteDialog.show = false">取消</button>
            </el-col>
        </el-form>
    </el-dialog>
</template>

<script>
	import { requestAddInvite } from '@/service/space_multSpace.js';

	export default {
		name: 'invite_dialog',
		data() {
			return {
				inviteForm: {
					instruction: ''
				},
				inviteRules: {
                	instruction: { required: true, message: '填写邀请说明(100字以内)', trigger: 'change' }
            	}
			}
		},
		props: {
			inviteDialog: {
				type: Object,
				default() {
					return { show: false }
				}
			},
			userId: {
				type: String,
				default: ''
			}
		},
		methods: {
			// 添加邀请
	        addInvite () {
	            this.$refs['inviteForm'].validate((valid) => {
	                if (valid) {
	                    requestAddInvite({multId: this.$ls.get('baseInfo').baseInfo.id, userId: this.userId, createId: this.$ls.get('loginUId'), content: this.inviteForm.instruction }).then(res => {
	                        if(res.data.code == 200) {
	                            this.$message({type:'success', message: '邀请成功'})
	                            this.$refs['inviteForm'].resetFields()
	                        	this.inviteDialog.show = false
	                        	this.$emit('callback')
	                        }else {
	                            this.$message({message: res.data.msg})
	                        }
	                    })
	                }else {
	                    this.$message('请填写邀约说明')
	                    return false;
	                }
	            })
	        },
	        close() {
	        	this.$refs['inviteForm'].resetFields()
	        }
		}
	}
</script>

<style lang="scss" scoped>
	.mb20 {
    	margin-bottom: 20px;
	}
	.btn {
		display: inline-block;
	    width: 50px;
	    height: 28px;
	    border-radius: 3px;
	    border: none;
	}
	.sure {
	    background-color: #d00;
	    color: #fff;
	    margin-left: 10px;
	    &:hover {
	    	opacity: 0.75;
	    }
	}
	.cancel {
		border: 1px solid #d00;
		color: #d00;
		&:hover {
			background-color: #d00;
			color: #fff;
		}
	}
</style>