<template>
	<div id="modify_pwd" class="fr bgw">
		<div class="">
			<v-tabs :tabs="tabs"></v-tabs>
		</div>
		<section class="modify-pwd">
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
				<!-- 密码 -->
				<el-row>
					<el-form-item label="原密码" prop="pwd">
					    <el-col :span="9">
					    	<el-input type="password" placeholder="请输入原密码" v-model="form.pwd"></el-input>
					    </el-col>
				  	</el-form-item>
				</el-row>
				<!-- 新密码 -->
				<el-row>
					<el-form-item label="新密码" prop="newPwd">
					    <el-col :span="9">
					    	<el-input type="password" placeholder="请输入新密码" v-model="form.newPwd"></el-input>
					    </el-col>
				  	</el-form-item>
				</el-row>
				<!-- 确认密码 -->
				<el-row>
					<el-form-item label="确认密码" prop="confirmPwd">
					    <el-col :span="9">
					    	<el-input type="password" placeholder="请再次输入新密码" v-model="form.confirmPwd"></el-input>
					    </el-col>
				  	</el-form-item>
				</el-row>
				<el-form-item>
          			<button class="btn submit-btn" @click.prevent="modifyPwd('form')">保存</button>
         	 		<button class="btn" @click.prevent="$router.go(-1)">取消</button>
        		</el-form-item>
			</el-form>
		</section>
	</div>
</template>

<script>
	import tabs from 'Common/classificationList/classification/tabs.vue';
	import encrypt from 'jsencrypt';
	import { requestPublishKey, loginIn } from '@/service/common.js';
	import { modifyPassword } from '@/service/security.js';
	import { pages } from '@/js/common-config.js'
	import { mapState, mapMutations, mapActions } from 'Vuex'
 	let JSEncrypt = encrypt.JSEncrypt.prototype;
	export default {
		name: 'modify_pwd',
		components: {
			'v-tabs': tabs,
		},
		data() {
			const validateRePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次确认密码'));
                } else if (value !== this.form.newPwd) {
                    callback(new Error('两次输入密码不一致！'));
                } else {
                    callback();
                }
            };
            const validatePwd = async (rule, value, callback) => {
            	if (await this.judgePwd(value)) {
            		callback()
            	} else {
            		callback(new Error('原密码错误'))
            	}
            }
            const validateNewPwd = (rule, value, callback) => {
                const regular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*? ,.\-\+\[\]\{\}\|\;\'\<\>\/\:\"\_\=\(\)])[^]{8,16}$/
                if (value === '') {
                    callback(new Error('请输入新密码'))
                } else if(value === this.form.pwd) {
                	callback(new Error('不能是最近使用过的密码，请重新输入'))
                } else if (!regular.test(value)) {
                    callback(new Error('密码必须由 8 到 16 位的大小写字母、数字、符号组成'))
                } else {
                    callback()
                }
            }
			return {
				tabs: [
		          	{ name: '修改密码', type: ''}
		        ],
		        form:{
		        	pwd: '',
		        	newPwd: '',
		        	confirmPwd: ''
		        },

		        rules:{
		        	pwd: [
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                        { validator: validatePwd, trigger: 'blur' }
                    ],
                    newPwd: [
                        { required: true, validator: validateNewPwd, trigger: 'blur' }
                    ],
                    confirmPwd: [
                    	{ validator: validateRePwd, required: true, trigger: 'blur' }
                    ]
		        },
		        account: ''     //当前登录用户账号
			}
		},
		computed: {
	        ...mapState ({
	            isLogin: (state) => state.login.isLogin,
	        })
	    },
	    mounted() {
	    	this.getPublishKey()
	    	this.account = this.$ls.get('loginInfo').userInfo.account
	    },
		methods: {
			...mapActions([
	            'logout'
	        ]),
			async getPublishKey() {
				const res = await requestPublishKey()
				if (res.data.code === 200) {
					JSEncrypt.setPublicKey(res.data.entity);
				}
		    },
		    async judgePwd(val) {
		    	const params = {
		    		account: this.account,
		    		pwd: JSEncrypt.encrypt(val)
		    	}
		    	const res = await loginIn(params)
		    	if (res.data.code === 200) {
		    		return true
		    	} else {
		    		return false
		    	}
		    },
		    async modifyPwd(formName) {
		    	this.$refs[formName].validate((valid) => {
		    		if (valid) {
		    			// 密码加密处理
				        let params = {
				        	pwd: JSEncrypt.encrypt(this.form.pwd.trim()),
				        	newPwd: JSEncrypt.encrypt(this.form.newPwd.trim()),
				        }
				        modifyPassword(params).then((res) => {
				        	if(res.data.code === 200){
				        		this.showMessage('success', '修改成功,请重新登录');
				        		this.logout().then(x => {
					                this.isLogin = false;
					                window.location.href = pages.index
					            });
				        	}else{
				        		this.showMessage('warning', res.data.msg)
				        	}
				        })
		    		} else {
		    			return false;
		    		}
		    	})
		    }
		}
	}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
	*{
		box-sizing: border-box;
	}
	#modify_pwd{
		width: 100%;
		min-height: 741px;
	}
	.modify-pwd{
		margin-top: 15px;
		padding: 15px;
	}
.btn{
	width: 92px;
	height: 35px;
	line-height: 32px;
	border: 1px solid $default-color;
	color: $default-color;
	font-size: 14px;
}
.btn:hover{
	background-color: $default-color;
	color: #fff;
}
.submit-btn{
	width: 92px;
	height: 35px;
	line-height: 32px;
	margin-right: 10px;
	color: #fff;
	font-size: 14px;
	background-color: $default-color;
}
.submit-btn:hover{
	opacity: 0.75;
}
</style>

<style lang="scss">
	#modify_pwd{
		.el-input__inner{
			height: 38px;
		}
	}
</style>