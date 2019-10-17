<template>
    <section class="submit-form">
        <v-tabs :tabs="[{name: '修改密码'}]" ></v-tabs>
		<el-form ref="form" :model="form" label-width="100px" :rules="rules">
			<!-- 密码 -->
			<el-row>
				<el-form-item label="原密码" prop="pwd">
				    <el-col :span="10">
				    	<el-input type="password" placeholder="请输入原密码" v-model="form.pwd"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<!-- 新密码 -->
			<el-row>
				<el-form-item label="新密码" prop="newPwd">
				    <el-col :span="10">
				    	<el-input type="password" placeholder="请输入新密码" v-model="form.newPwd"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<!-- 确认密码 -->
			<el-row>
				<el-form-item label="确认密码" prop="confirmPwd">
				    <el-col :span="10">
				    	<el-input type="password" placeholder="请再次输入新密码" v-model="form.confirmPwd"></el-input>
				    </el-col>
			  	</el-form-item>
			</el-row>
			<el-form-item>
      			<button type="button" class="bs-form-button i-form-button" @click.prevent="onSubmit('form')">保存</button>
     	 		<button type="button" class="bs-form-button i-form-button is-plain" @click.prevent="cancel">取消</button>
    		</el-form-item>
		</el-form>
	</section>
</template>

<script>
    import tabs from '@/components/common/tabs.vue'
	import encrypt from 'jsencrypt'
	import { requestPublishKey, loginIn } from '@/service/common.js'
	import { modifyPassword } from '@/service/security.js'
	import { pages } from 'Asset/js/common-config.js'
	import { mapState, mapActions } from 'Vuex'
 	let JSEncrypt = encrypt.JSEncrypt.prototype

	export default {
		name: 'modifyPwd',
        components: {
            'v-tabs': tabs
        },
		data() {
			var validateRePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次确认密码'));
                } else if (value !== this.form.newPwd) {
                    callback(new Error('两次输入密码不一致！'));
                } else {
                    callback();
                }
            };
            var validatePwd = async (rule, value, callback) => {
            	if (await this.judgePwd(value)) {
            		callback()
            	} else {
            		callback(new Error('原密码错误'))
            	}
            }
            var validateNewPwd = (rule, value, callback) => {
            	const regular = /^(?=.*[a-z|A-Z])(?=.*\d)[^]{8,16}$/
                if (value === '') {
                    callback(new Error('请输入新密码'))
                } else if (value === this.form.pwd) {
            		callback(new Error('不能是最近使用过的密码，请重新输入'))
            	} else if (!regular.test(value)) {
                    callback(new Error('密码必须由 8 到 16 位的字母、数字组成'))
                } else {
                    callback()
                }
            }
			return {
				tabs: [
		          	{ name: '修改密码', type: ''}
		        ],
		        form:{
		        	pwd:'',
		        	newPwd:'',
		        	confirmPwd:''
		        },

		        rules:{
		        	pwd: [
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                        // { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
                        { validator: validatePwd, trigger: 'blur' }
                    ],
                    newPwd: [
                        { required: true, validator: validateNewPwd, trigger: 'change blur' }
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
		mounted(){
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
		    async onSubmit(formName) {
		    	this.$refs[formName].validate((valid) => {
		    		if(valid){
		    			// 密码加密处理
				        let params = {
				        	pwd:JSEncrypt.encrypt(this.form.pwd.trim()),
				        	newPwd:JSEncrypt.encrypt(this.form.newPwd.trim()),
				        }
				        modifyPassword(params).then((res) => {
				        	if(res.data.code === 200){
				        		this.showMessage('success', '修改成功，请重新登录')
				        		const self = this
				        		window.setTimeout(function() {
				        			self.logout().then(x => {
						                self.isLogin = false;
						                window.location.href = pages.index
						            });
				        		}, 1000);
				        	}else{
				        		this.showMessage('warning',res.data.msg)
				        	}
				        })
		    		}else{
		    			return false;
		    		}
		    	})
		    },
		    cancel() {
		    	this.$refs['form'].resetFields()
		    }
		}
	}
</script>
