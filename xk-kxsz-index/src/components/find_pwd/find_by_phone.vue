<template>
    <div class="find_by_email">
        <div class="tips-box">
            <i class="icon-form-tip"></i>
            <span> 如果您没有绑定的手机，可在线下联系云空间学校管理员为您重置密码</span>
        </div>
        <section class="form-box" v-loading="loading" element-loading-text="验证码发送中...">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="手机号" prop="phone">
                    <el-col :span="23">
                        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-col :span="11">
                        <el-input v-model="form.code" placeholder="请输入右边答案"></el-input>
                    </el-col>
                    <el-col :span="11" class="clearfix">
                        <div class="verify-box fl">
                            {{num1}} + {{num2}} = ?
                        </div>
                        <div class="refresh fl">
                            <i class="icon-btn-i-more" @click="setNum">换一换</i>
                        </div>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <button class="send-btn" @click.prevent="getCode">获取验证码</button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    import { requestSendMobileCode } from '@/service/common.js'
    import { mapActions } from 'vuex'

    export default {
        name: 'find_by_email',
        data() {
            const validMobile = (rule, value, callback) => {
                const regular = /^[1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8}$/
                if (value === '') {
                    callback(new Error('请输入手机号'))
                } else if (!regular.test(value)) {
                    callback(new Error('请输入正确格式的手机号'))
                } else {
                    callback()
                }
            }
            const validCode = (rule, value, callback) => {
                if (parseInt(value, 10) === (this.num1 + this.num2)) {
                    callback()
                } else {
                    callback(new Error('请输入正确的验证码'))
                }
            }
            return {
                form: {
                    phone: '',
                    code: ''
                },
                num1: 0,
                num2: 0,
                rules: {
                    phone: [
                        { validator: validMobile, required: true }
                    ],
                    code: [
                        { validator: validCode, trigger: 'blur', required: true }
                    ]
                },
                loading: false
            }
        },
        mounted() {
            this.setNum()
        },
        methods: {
            ...mapActions('getBackPwd', ['setEmail']),
            setNum() {
                this.num1 = Math.floor(Math.random() * 100)
                this.num2 = Math.floor(Math.random() * 100)
            },
            getCode() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.loading = true
                        requestSendMobileCode({ phone: this.form.phone }).then((res) => {
                            this.loading = false
                            if (res.data.code === 200) {
                                this.$message({
                                    message: '验证码发送成功',
                                    type: 'success'
                                })
                                this.setEmail(this.form.phone)
                                this.$emit('setStep', 2)
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                })
                            }
                        }, () => {
                            this.loading = false
                            this.$message({
                                message: '发送失败，请重新发送',
                                type: 'error'
                            })
                        })
                    } else {
                        this.$message({
                            message: '请按要求输入完整的表单信息',
                            type: 'info'
                        })
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .form-box {
        .el-input__inner {
            height: 38px;
            line-height: 38px;
        }
    }
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
    .find_by_email {
        width: 100%;
        height: 460px;
        margin: 0 auto;
        padding-top: 40px;
        box-sizing: border-box;
        .tips-box {
            width: 430px;
            text-align: center;
            margin: 20px auto;
            font-size: 12px;
            color: #818181;
            line-height: 14px;
            i {
                font-size: 18px;
                vertical-align: text-top;
            }
        }
        .form-box {
            width: 430px;
            margin: 0 auto;
            .verify-box,.refresh {
                margin-left: 15px;
            }
            .verify-box {
                height: 38px;
                line-height: 38px;
                padding: 0 5px;
                background-color: #ccc;
                color: #d00;
            }
            .refresh {
                i {
                    cursor: pointer;
                }
            }
        }
        .send-btn {
            padding: 12px 25px;
            border-radius: 5px;
            background-color: nth($default-color, 1);
            color: #fff;
            font-size: 14px;
            &:hover {
                background-color: nth($default-color,2);
            }
        }
    }
</style>