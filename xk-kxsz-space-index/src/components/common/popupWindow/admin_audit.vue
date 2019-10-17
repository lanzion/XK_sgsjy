<template>
    <section>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="审核结果:" prop="result">
                <el-radio-group v-model="form.result">
                    <el-radio label="1">通过</el-radio>
                    <el-radio label="2">不通过</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="审核说明:" prop="explain">
                <el-input type="textarea" placeholder="请输入审核说明" v-model="form.explain" resize="none" :rows="5"></el-input>
            </el-form-item>
            <el-form-item class="bs-d-btn-group">
                <button type="button" class="bs-search-button i-form-button" @click="submitForm('form')" >确定</button>
                <button type="button" class="bs-search-button i-form-button is-plain" @click="close">取消</button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    result: '',
                    explain: ''
                },
                rules: {
                    result:  [{ required: true, message: '请选择审核结果', trigger: 'change' }],
                    explain: [
                        { message: '请输入审核说明', trigger: 'blur' },
                        { max: 300, message: '不能超过300字', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('auditSubmit', this.form)
                    } else {
                        return false
                    }
                })
            },
            resetForm() {
                let _form = {
                    result: '',
                    explain: ''
                }
                this.$set(this.$data, 'form', _form)
                this.$refs.form.resetFields()
            }
        },
        props: {
            close: Function
        }
    }
</script>