<template>
    <div id="report">
        <el-dialog :visible.sync="dialogVisible" title="举报" class="report">
            <div class="discuss_report">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="report_content">
                    您为什么要举报此信息？
                    <el-form-item prop="radio" class="radio_box">
                        <!-- <el-col :span="18"> -->
                            <el-radio-group v-model="ruleForm.radio" style="text-indent:0;width: 100%;">
                                <el-radio v-for="(item, index) in report_type" class="radio" :label="index" :key='index'>{{item}}</el-radio>
                            </el-radio-group>
                        <!-- </el-col> -->
                    </el-form-item>
                    <div class="instructions" v-if="ruleForm.radio === report_type.length-1">
                        <h4 class="instructions_h">举报说明:</h4>
                        <input type="text" class="instructions_txt" v-model="ruleForm.report_content" placeholder="请输入举报说明">
                    </div>
                    <div class="report_btn clearfix">
                        <button class="psn-cancel-btn" @click="close">取消</button>
                        <button class="psn-confirm-btn" @click="submit">提交</button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
        <button class="i-button fr report-txt hoverIfshow" @click.prevent="openDialog">
            <i class="icon-btn-i-report"></i>
            <span class="">举报</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'report',
    data() {
        return {
            dialogVisible: false,
            report_type: ['色情淫秽', '骚扰谩骂', '广告欺骗', '反动', '其他'],
            ruleForm: {
                radio: null,
                report_content: '',
            },
            rules: {
                radio: { required: true, message: '请选择举报原因', trigger: 'change', type: 'number' }
            }
        }
    },
    props: {
        reportData: Object,
        item: Object,
        callback: Function
    },
    mounted() {
    },
    methods: {
        close: function () {
            this.dialogVisible = false
        },
        openDialog() {
            if (this.$ls.get('loginInfo')) {
                this.dialogVisible = true
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        submit: function () {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    if (this.ruleForm.radio < this.report_type.length - 1) {
                        this.ruleForm.report_content = this.report_type[this.ruleForm.radio]
                    }
                    this.reportData.params.content = this.ruleForm.report_content
                    this.$http.post(this.reportData.url, this.reportData.params).then((res) => {
                        if (res.data.code === 200) {
                            this.close()
                            this.open()
                            if (this.callback !== undefined) {
                                this.callback(this.item)
                            }
                            return
                        } else {
                            this.$message.error(res.data.msg || '举报失败,请重试')
                        }
                    })
                } else {
                    return false
                }
            })
        },
        open() {
            this.$message({
                message: '举报成功',
                type: 'success'
            })
        }
    }
}
</script>
<style lang='scss'>
@import '~@/assets/css/scss/form.scss';
.report {
    .el-dialog {
        width: 480px;
        .instructions_h {
            text-indent: 0;
        }
    }
    .el-dialog__body {
      padding: 0;
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .report-txt {
            color: #999;
            padding: 0;
            font-size: 12px;
            border:none;
            &:hover {
                color: $color-value;
            }
        }
        .i-button:hover .icon-btn-report,
        .i-button:hover .icon-btn-i-report {
            color: $color-value !important;
        }
    }
}
.radio_box {
    white-space: initial;
    .el-radio {
        width: 30%;
        line-height: 40px;
        margin: 0;
        text-indent: 0;
    }
}
.discuss_report {
    .report_content {
        padding: 14px 20px;
        font-size: 14px;
        .radio_box {
            margin-top: 20px;
            padding: 0 5%;
        }
        .instructions {
            .instructions_h {
                height: 40px;
                line-height: 40px;
            }
            .instructions_txt {
                border: 1px solid #D9D9D9;
                height: 30px;
                width: 100%;
                text-indent: 10px;
                color: #999;
            }
        }
        .report_btn {
            margin-top: 50px;
            text-align: right;
            .i-form-button {
                width: 62px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                margin-left: 10px;
                box-sizing: border-box;
            }
        }
    }
}
</style>
