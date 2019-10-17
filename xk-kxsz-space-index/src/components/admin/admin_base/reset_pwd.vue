<template>
    <section>
        <el-form label-width="100px" :model="form" :rules="rules" ref="form">
            <el-form-item label="新密码" prop="newPwd">
                <el-input ref="inputPwd" :type="isShowPwd ? 'text' : 'password'" v-model="form.newPwd" auto-complete="off" style="width: 80%"></el-input>
                <i class="icon-btn-eye" :class="{'on':isShowPwd, 'off':!isShowPwd}" @mousedown="isShowPwd=!isShowPwd" @mouseup="isShowPwd=!isShowPwd"></i>
            </el-form-item>
        </el-form>
        <section class="bs-d-btn-group">
            <button class="bs-search-button i-form-button" type="button" @click="submitForm('form')">确定</button>
            <button class="bs-search-button i-form-button is-plain" type="button" @click="close">取消</button>
        </section>
    </section>
</template>

<script>
    export default {
        data() {
        const validatePwd = (rule, value, callback) => {
            const regular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*? ,.\-\+\[\]\{\}\|\;\'\<\>\/\:\"\_\=\(\)])[^]{8,16}$/
            if (value === '') {
                callback(new Error('请输入新密码'))
            } else if (!regular.test(value)) {
                callback(new Error('密码必须由 8 到 16 位的大小写字母、数字、符号组成'))
            } else {
                callback()
            }
        }
            return {
                isShowPwd: false,
                form: {
                    newPwd: ''
                },
                rules: {
                    newPwd: [
                        { validator: validatePwd, required: true, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form)
                    } else {
                        return false
                    }
                })
            },
            resetForm() {
                this.$set(this.$data.form, 'newPwd', '')
                this.$refs.form.resetFields()
            }
        },
        props: {
            close: Function
        }
    }
</script>

<style lang="scss" scoped>
    .icon-btn-eye {
        $size: 32px;
        position: absolute;
        width: $size;
        height: $size;
        line-height: $size;
        transform: translateX(-100%);
        font-weight: bold;
        text-align: center;
    }
</style>