<template>
    <el-dialog title="审核" :visible.sync="visible.show" @close="resetForm">
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
            <el-form-item class="btn-box">
                <button type="button" class="cancel-btn" @click="resetForm">取消</button>
                <button type="button" class="comfire-btn" @click="submitForm('form')" >确定</button>
            </el-form-item>
        </el-form>
    </el-dialog>
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
                    result: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
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
                this.visible.show = false
                const _form = {
                    result: '',
                    explain: ''
                }
                this.$set(this.$data, 'form', _form)
                this.$refs.form.resetFields()
            }
        },
        props: {
            visible: {
                type: Object,
                default() {
                    return { show: false }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/scss/vars.scss';
    .btn-box {
        text-align: right;
        button {
            width: 63px;
            height: 30px;
            box-sizing: border-box;
            border: none;
            border-radius: 3px;
            margin-left: 10px;
        }
    }
    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .btn-box {
                .comfire-btn {
                    background-color: $color-value;
                    color: #fff;
                    &:hover {
                        opacity: 0.75;
                    }
                }
                .cancel-btn {
                    border: 1px solid $color-value;
                    color: $color-value;
                    &:hover {
                        color: #fff;
                        background-color: $color-value;
                    }
                }
            }
        }
    }
</style>