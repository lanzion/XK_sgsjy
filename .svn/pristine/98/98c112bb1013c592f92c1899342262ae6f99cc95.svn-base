<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 竞赛项目 -->
            <el-row>
                <el-form-item label="竞赛项目" prop="name">
                    <el-col :span="8">
                        <el-input v-model="form.name" placeholder="请输入竞赛项目"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 描述 -->
            <el-row>
                <el-form-item label="描述" prop="description">
                    <el-col :span="12">
                        <el-input type="textarea" v-model="form.description" placeholder="请输入项目描述"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 评审指标 -->
            <el-row>
                <el-form-item label="评审指标" prop="evaluationList">
                    <el-col :span="12">
                        <el-row class="evaluate-title">
                            <el-col :span="6">评审要素</el-col>
                            <el-col :span="12">评审标准</el-col>
                            <el-col :span="4">分值</el-col>
                            <el-col :span="2">操作</el-col>
                        </el-row>
                        <el-row class="evaluate-list" v-for="(item, index) in form.evaluationList" :key="index">
                            <el-col class="evaluate-input-box" :span="6">
                                <el-input v-model.trim="item.name"></el-input>
                            </el-col>
                            <el-col class="evaluate-input-box" :span="12">
                                <el-input v-model.trim="item.description"></el-input>
                            </el-col>
                            <el-col class="evaluate-input-box" :span="4">
                                <el-input-number :controls="false" v-model="item.score" :min="0" :max="100"></el-input-number>
                            </el-col>
                            <el-col :span="2">
                                <i class="handler icon-btn-delete" @click="deleteEvaluateItem(index)"></i>
                            </el-col>
                        </el-row>
                        <button type="button" class="evaluate-add i-form-button other-c" @click="appendEvaluateItem"><i class="icon-btn-add"></i> 添加</button>
                    </el-col>
                    <el-col :span="12">
                        <p class="hint">
                            <i class="table-cell icon-form-tip"></i>
                            <span class="table-cell">
                                <p>所有评审要素分值之和必须为100</p>
                                <p>目前评审要素分值总和为 <span class="total" :class="{correct: scoreSum==100}">{{scoreSum}}</span></p>
                            </span>
                        </p>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-form-item>
                <button class="bs-form-button i-form-button" type="button" @click.prevent="onSubmit('form')">保存</button>
                <button class="bs-form-button i-form-button is-plain" type="button" @click.prevent="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { addContestItem, requestContestItemDetail, modifyContestItem } from '@/service/admin_contest.js'
export default {
    name: 'contestEventAdd',
    data() {
        var validateEvaluationList = (rule, value, callback) => {
            value = value.filter(x => (x.name.length || x.description.length || x.score))
            if (value.length) {
                let completeItems = value.filter(x => (x.name.length && x.description.length && x.score))
                if (value.length === completeItems.length) {
                    if (this.scoreSum == 100) {
                        callback()
                    } else {
                        callback(new Error(`所有评审要素分值之和必须为100`))
                    }
                } else {
                    callback(new Error(`评审要素或评审标准不能为空，且分值不能为 0`))
                }
            } else {
                callback(new Error(`请至少输入 1 个完整的评审指标`))
            }
        }
        return {
            // 表单数据
            form: {
                name: '',           // 项目名称
                description: '',    // 项目描述
                evaluationList: [{  // 评审指标
                    name: '',
                    description: '',
                    score: ''
                }, {
                    name: '',
                    description: '',
                    score: ''
                }, {
                    name: '',
                    description: '',
                    score: ''
                }]
            },
            // 表单校验提示
            rules: {
                name: [
                    { required: true, message: '请输入竞赛项目', trigger: 'change' },
                    { max: 20, message: '最多输入20字', trigger: 'change' }
                ],
                description: [
                    { required: true, message: '请输入竞赛项目描述', trigger: 'change' }
                ],
                evaluationList: [
                    { type: 'array', required: true, message: '请至少输入 1 个完整的评审指标', trigger: 'blur' },
                    { validator: validateEvaluationList, trigger: 'blur' }
                ]
            },
            disabled: false,
        }
    },
    computed: {
        scoreSum: function() {
            let sum = 0
            this.form.evaluationList.forEach(x => {
                if (x.name.length || x.description.length || x.score) {
                    sum += x.score
                }
            })
            return sum
        }
    },
    mounted() {
        let _id = this.$route.query.id
        if(_id != undefined) {
            this.$set(this.form, 'id', _id)
            this.disabled = true
            this.getDetail()
        }
    },
    methods: {
        // 获取竞赛项目详情
        getDetail() {
            requestContestItemDetail({id: this.form.id}).then(res => {
                if (res.data.code == 200) {
                    let details = res.data.entity
                    let _form = {}
                    _form.id = details.id
                    _form.name = details.name
                    _form.description = details.description
                    _form.evaluationList = details.evaluationList.map(x => {
                        let item = {}
                        item.name = x.name
                        item.description = x.description
                        item.score = x.score
                        return item
                    })
                    this.$set(this.$data, 'form', _form)
                } else {
                    this.showMessage('error', res.data.msg)
                }
            })
        },
        // 提交表单
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let _evaluationList = this.form.evaluationList.filter(x => (x.name.length && x.description.length))
                    this.$set(this.form, 'evaluationList', _evaluationList)

                    if (this.form.id == null) { // 添加
                        addContestItem(this.form).then( response => {
                            if (response.data.code == 200) {
                                this.showMessage('success', '添加成功')
                                this.$router.go(-1)
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    } else {
                        modifyContestItem(this.form).then( response => {
                            if (response.data.code == 200) {
                                this.showMessage('success', '修改成功')
                                this.$router.go(-1)
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        appendEvaluateItem() {
            const item = { name: '', description: '', score: '' }
            this.form.evaluationList.push(item)
        },
        deleteEvaluateItem(index) {
            this.form.evaluationList.splice(index, 1)
        }
    },
}
</script>
 <style lang="scss" scoped>
    .hint {
        $lh: 24px;
        display: table;
        font-size: 12px;
        line-height: $lh;
        color: #999;

        .table-cell {
            vertical-align: top;
        }

        .icon-form-tip {
            padding-right: 4px;
            font-size: 14px;
            text-indent: 10px;
            line-height: $lh;
        }
    }
    .evaluate-title {
        background-color: #dfdfdf;
        text-align: center;
    }
    .evaluate-list {
        margin: 10px 0;
        text-align: center;

        .handler {
            font-size: 16px;
        }
    }
    .evaluate-add {
        display: block;
        width: 100%;
        height: 36px;
        line-height: 36px;
        border: 1px dashed #dfdfdf;
        background-color: #fff !important;
        color: #ccc;

        .icon-btn-add {
            vertical-align: text-top;
        }
    }
    .total {
        color: #d00;
        &.correct {
            color: #2797ed;
        }
    }
 </style>