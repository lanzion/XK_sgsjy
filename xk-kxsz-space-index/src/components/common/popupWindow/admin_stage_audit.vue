<template>
    <section>
    	<div class="stage-detail">
    		<dl class="stage-content">
    			<dt class="tit">{{stageDetail.stageName}}</dt>
    			<dd class="content-detail">{{this.stageDetail.auditRemark || '暂无内容'}}</dd>
    		</dl>
    		<dl class="stage-file clearfix">
    			<dt class="file-tit fl">附件：</dt>
    			<dd class="file fl" v-if="stageDetail.resourceId">
    				<a :href="downloadUrl(stageDetail.resourceId)" :download="stageDetail.resourceName">{{stageDetail.resourceName || stageDetail.resourceId}}</a>
    			</dd>
                <dd class="file fl" v-else>暂无附件</dd>
    		</dl>
    	</div>
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
            	<button type="button" class="bs-search-button i-form-button is-plain" @click="close">取消</button>
                <button type="button" class="bs-search-button i-form-button" @click="submitForm('form')" >确定</button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    export default {
    	name: 'stage_audit',
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
                },
                stage: {
                    '0': '立项审核',
                    '1': '开题审核',
                    '2': '中期评估审核',
                    '3': '结题验收审核'
                }
            }
        },
        props: {
            close: Function,
            stageDetail: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        mounted() {
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
        }
    }
</script>

<style lang="scss" scoped>
	.stage-detail {
		padding: 0px 20px 18px;
		border-bottom: 1px solid #dfdfdf;
		margin-bottom: 20px;
		.tit {
			padding: 20px 0;
		}
		.content-detail,.file {
			font-size: 12px;
			line-height: 2em;
		}
		.stage-file {
			margin: 32px 0 0px;
			width: 80%;
			.file-tit {
				line-height: 24px;
			}
			.file {
				a {
					color: #00a0e9;
				}
			}
		}
	}
</style>