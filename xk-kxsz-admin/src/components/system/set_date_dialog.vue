<template>
    <el-dialog :visible.sync="dialog.isVisible" title="起止日期" class="set-date__wrapper">
        <div class="set-date__content">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <!-- <el-form-item label="学期名称" prop="schoolYear">
                    <el-col :span="20">
                        <el-input v-model="form.schoolYear" :maxlength="15" placeholder="请输入学期名称"></el-input>
                    </el-col>
                </el-form-item> -->
                <el-form-item label="学年" prop="year">
                    <el-col :span="20">
                        <el-date-picker v-model="form.year" type="year" placeholder="请选择学年"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="学期" prop="term">
                    <el-col :span="20">
                        <el-radio-group v-model="form.term">
                            <el-radio label="上学期"></el-radio>
                            <el-radio label="下学期"></el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="开始时间" prop="startDate">
                    <el-col :span="20">
                        <el-date-picker
                            v-model="form.startDate"
                            :editable="false"
                            type="date"
                            placeholder="请选择开始时间">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="结束时间" prop="endDate">
                    <el-col :span="20">
                        <el-date-picker
                            v-model="form.endDate"
                            :editable="false"
                            type="date"
                            placeholder="请选择结束时间">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
            </el-form>

            <div class="btn-row">
                <a @click.prevent="submit" href="javascript:;" class="btn btn-ok">确定</a>
                <a @click.prevent="dialog.isVisible = false" href="javascript:;" class="btn btn-cancel">取消</a>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import {addTerm, editTerm} from '@/service/admin_system.js'

    export default {
        name: 'setDate', // 设置日期弹窗
        data () {
            return {
                form: { // 需要提交的数据
                    year: null,
                    term: null,
                    startDate: null,
                    endDate: null,
                    schoolYear: ''
                },
                // pickerOptions: {
                //     disabledDate (time) {
                //         return time.getTime() < Date.now() - 8.64e7;
                //     }
                // },
                rules: {
                    year: [
                        { required: true, type: 'date', message: '请选择学年', trigger: 'change' }
                    ],
                    term: [
                        { required: true, message: '请选择学期', trigger: 'change' }
                    ],
                    startDate: [
                        { required: true, type: 'object', message: '请选择开始时间', trigger: 'change' }
                    ],
                    endDate: [
                        { required: true, type: 'object', message: '请选择结束时间', trigger: 'change' }
                    ],
                    // schoolYear: [
                    //     {required: true, message: '请输入学期名称', trigger: 'change'}
                    // ]
                },
            }
        },
        props: {
            curEditingTerm: {
                type: Object,
                default () {
                    return {}
                }
            },
            dialog: {
                type: Object,
                default () {
                    return {}
                }
            },
            handleRequest: Function,
        },
        created () {
            this.initData()
        },
        methods: {
            initData () { // 初始添加学年学期弹窗数据
                if (this.curEditingTerm.action === 'edit') { // 编辑学年学期
                    let {startDate = null, endDate = null, schoolYear = ''} = this.curEditingTerm
                    let form = {
                        year: new Date(schoolYear.split(/\D/)[0]),
                        term: schoolYear.split(/\d{4}/)[1],
                        startDate: new Date(startDate),
                        endDate: new Date(endDate),
                        schoolYear: schoolYear
                    }
                    this.form = form
                }
            },
            submit () { // 添加/修改学年学期
                this.$refs.form.validate(valid => {
                    if (this.form.startDate > this.form.endDate) {
                        valid = false
                        this.$message.error(`开始时间要小于结束时间，请重新选择`)
                    }
                    if (valid) { // 验证通过
                        let handler = addTerm
                        let _label = '添加'
                        let id = undefined
                        this.form.schoolYear = this.form.year.getFullYear() + this.form.term
                        delete this.form.year
                        delete this.form.term

                        if (this.curEditingTerm.action === 'edit') {
                            handler = editTerm
                            _label = '修改'
                            id = this.curEditingTerm.id
                        }

                        handler({
                            ...this.form,
                            id
                        }).then(res => {
                            if (res.status === 200 && res.data.code === 200) {
                                this.$message(`成功${_label}学年学期`)
                                this.handleRequest()
                                this.dialog.isVisible = false
                                return
                            }
                            this.$message.error(res.data.msg || `${_label}学年学期失败，请稍后重试`)
                        }, () => {
                            this.$message.error(`${_label}学年学期失败，请稍后重试`)
                        })
                    }
                })
            }
        }
    }
</script>

<style lang='scss'>
    .set-date__wrapper .el-dialog {
        /* position: relative; */
        box-sizing: border-box;
        width: 476px;
        height: 360px;
        .el-dialog__body {
            padding: 0;
        }
        .el-input__inner, .el-date-editor.el-input {
            width: 340px;
        }
    }
</style>
<style lang='scss' scoped>
    @import '~@/assets/css/scss/vars.scss';

    @each $color-key, $color-value in $color-data {
        .theme-#{$color-key} {
            .set-date__wrapper .btn-row {
                .btn-ok {
                    background-color: $color-value;
                }
                .btn-cancel {
                    border: 1px solid $color-value;
                    color: $color-value;
                }
            }
        }
    }

    .set-date__wrapper {
        .set-date__content {
            padding-top: 30px;
        }
        .btn-row {
            position: absolute;
            right: 16px;
            bottom: 20px;
            margin-bottom: 0;
            text-align: right;
            font-size: 0;
            .btn {
                display: inline-block;
                box-sizing: border-box;
                width: 62px;
                height: 28px;
                line-height: 26px;
                vertical-align: top;
                text-align: center;
                font-size: 12px;
            }
            .btn-ok {
                margin-right: 10px;
                color: #fff;
            }
        }
    }
</style>

