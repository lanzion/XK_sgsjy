<template>
    <div class="evaluate_setting_offline">
        <h4 class="head-tit">评比设定</h4>
        <el-form class="content-box" ref="form" :model="form" label-width="100px" :rules="rules">
            <el-row v-if="date.startDate">
                <el-form-item label="评比时间" prop="date">
                    <p>{{ date.startDate | dateFormat('yyyy年MM月dd日')}}——{{date.endDate | dateFormat('yyyy年MM月dd日') }}</p>
                </el-form-item>
            </el-row>
            <!-- 是否评奖 -->
            <el-row>
                <el-form-item label="是否评奖" prop="isRate">
                    <el-col :span="9">
                        <el-radio-group v-model="form.isRate" :disabled="disabled">
                            <el-radio :label="1" :key="1">是</el-radio>
                            <el-radio :label="2" :key="2">否</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 评价类型 -->
            <el-row v-if="form.isRate === 1">
                <el-form-item label="评奖类型" prop="awareType">
                    <el-col :span="9">
                        <el-radio-group v-model="form.awareType" :disabled="disabled">
                            <el-radio :label="1" :key="1">按比例</el-radio>
                            <el-radio :label="2" :key="2">按数量</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 竞赛奖项 -->
            <el-row v-if="form.isRate === 1">
                <!-- 按比例评奖 -->
                <el-form-item label="竞赛奖项" prop="awardsList" v-if="form.awareType === 1">
                    <el-col :span="12">
                        <el-row class="prize-title">
                            <el-col :span="12">奖项</el-col>
                            <el-col :span="8">排名占比%</el-col>
                            <el-col :span="4">操作</el-col>
                        </el-row>
                        <el-row class="prize-list" v-for="(item, index) in form.awardsList" :key="index">
                            <el-col class="prize-input-box" :span="12">
                                <el-input v-model.trim="item.name" placeholder="奖项名称" :disabled="disabled"></el-input>
                            </el-col>
                            <el-col class="" :span="3">
                                <!-- <el-input v-model.trim="item.startScale" placeholder="占比"></el-input> -->
                                <el-input-number :controls="false" placeholder="占比" v-model="item.startScale" :min="0" :max="100" :disabled="disabled"></el-input-number>
                            </el-col>
                            <el-col class="center" :span="2">
                                <span>—</span>
                            </el-col>
                            <el-col class="" :span="3">
                                <!-- <el-input v-model.trim="item.endScale" placeholder="占比"></el-input> -->
                                <el-input-number :controls="false" placeholder="占比" v-model="item.endScale" :min="0" :max="100" :disabled="disabled"></el-input-number>
                            </el-col>
                            <el-col :span="4">
                                <i class="handler icon-btn-delete" @click="disabled?null:deletePrizeItem(index)"></i>
                            </el-col>
                        </el-row>
                        <button type="button" class="prize-add i-form-button other-c" @click="appendPrizeItem" :disabled="disabled"><i class="icon-btn-add"></i> 添加</button>
                    </el-col>
                    <el-col :span="12">
                        <p class="hint vt">
                            <i class="table-cell icon-form-tip"></i>
                            <ul class="table-cell decimal">
                                <li>可以为本级评比设定奖项，也可不设定</li>
                                <li>每个奖项都必须设置排名占比，且所有占比不能重合</li>
                                <li>排名占比：先将所有入围最终比赛作品按总分按由高到低进行排名；再将占比与排名进行匹配，确定奖项</li>
                            </ul>
                        </p>
                    </el-col>
                </el-form-item>
                <!-- 按数量评奖 -->
                <el-form-item label="竞赛奖项" prop="awardsList" v-if="form.awareType === 2">
                    <el-col :span="12">
                        <el-row class="prize-title">
                            <el-col :span="12">奖项</el-col>
                            <el-col :span="8">名额</el-col>
                            <el-col :span="4">操作</el-col>
                        </el-row>
                        <el-row class="prize-list" v-for="(item, index) in form.awardsList" :key="index">
                            <el-col class="prize-input-box" :span="12">
                                <el-input v-model.trim="item.name" placeholder="奖项名称" :disabled="disabled"></el-input>
                            </el-col>
                            <el-col class="" :span="8">
                                <!-- <el-input v-model.trim="item.startScale" placeholder="占比"></el-input> -->
                                <el-input-number :controls="false" placeholder="数量" v-model="item.num" :min="0" :disabled="disabled"></el-input-number>
                            </el-col>
                            <el-col :span="4">
                                <i class="handler icon-btn-delete" @click="disabled?null:deletePrizeItem(index)"></i>
                            </el-col>
                        </el-row>
                        <button type="button" class="prize-add i-form-button other-c" @click="appendPrizeItem" :disabled="disabled"><i class="icon-btn-add"></i> 添加</button>
                    </el-col>
                    <el-col :span="12">
                        <p class="hint vt">
                            <i class="table-cell icon-form-tip"></i>
                            <ul class="table-cell decimal">
                                <li>奖项根据排序，由高到低；</li>
                                <li>对所有本评比阶段作品按得分高低进行排名；</li>
                                <li>将排名与名额进行匹配，评出作品奖项。</li>
                            </ul>
                        </p>
                    </el-col>
                </el-form-item>
                <!-- <el-form-item>
                    <el-row>
                        <el-col :span="3">
                            <el-checkbox v-model="form.isType" :disabled="disabled">分项评奖</el-checkbox>
                        </el-col>
                        <el-col :span="21">
                            <p class="hint">
                                <i class="table-cell icon-form-tip"></i>
                                <span class="table-cell">若选择，则按分项分开进行评奖；若不选择，则所有分项一起评奖</span>
                            </p>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <el-checkbox v-model="form.isGroup" :disabled="disabled">分组评奖</el-checkbox>
                        </el-col>
                        <el-col :span="21">
                            <p class="hint">
                                <i class="table-cell icon-form-tip"></i>
                                <span class="table-cell">若选择，则按分组分开进行评奖；若不选择，则所有分组一起评奖</span>
                            </p>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <el-checkbox v-model="form.isApply" :disabled="disabled">分形式评奖</el-checkbox>
                        </el-col>
                        <el-col :span="21">
                            <p class="hint">
                                <i class="table-cell icon-form-tip"></i>
                                <span class="table-cell">若选择，则按个人、团体分开进行评奖；若不选择，则个人团体一起评奖</span>
                            </p>
                        </el-col>
                    </el-row>
                </el-form-item> -->
            </el-row>
            <el-form-item v-if="!disabled">
                <button class="bs-form-button i-form-button" type="button" @click="onSubmit('form')">保存</button>
                <button class="bs-form-button i-form-button is-plain" type="button" @click="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import { loginInfo } from '@/assets/js/getUserInfo.js'
import { requestPhaseDetail, saveCompareConfig } from '@/service/manage.js'
import { mapState } from 'vuex'

export default {
    name: 'evaluateSetting',
    data() {
        const validateAwardsList = (rule, value, callback) => {
            const completeItems = value.filter(x => x.name.length)
            if (completeItems.length) {
                if (completeItems.every(x => x.startScale <= x.endScale)) {
                    const completeSortItems = completeItems.sort((a, b) => a.startScale - b.startScale)
                    let flag = true
                    for (let i = 1; i < completeSortItems.length; i++) {
                        if (completeSortItems[i - 1].endScale > completeSortItems[i].startScale) {
                            flag = false
                            break
                        }
                    }
                    if (flag) {
                        callback()
                    } else {
                        callback(new Error('排名占比存在重合'))
                    }
                } else {
                    callback(new Error('排名占比后一位要大于等于前一位'))
                }
            } else {
                callback(new Error('请至少输入 1 个完整的评审指标'))
            }
        }
        return {
            disabled: false,
            date: {},       // 评比时间
            // 表单数据
            form: {
                isRate: 0,              // 是否评奖
                isType: false,          // 按项目评奖
                isGroup: false,         // 按分组评奖
                isApply: false,         // 按参与方式评奖
                awareType: 0,           // 评奖类型(1.按比例,2.按数量)
                awardsList: [{  // 评审指标
                    name: '',
                    startScale: null,
                    endScale: null,
                    num: 0
                }, {
                    name: '',
                    startScale: null,
                    endScale: null,
                    num: 0
                }, {
                    name: '',
                    startScale: null,
                    endScale: null,
                    num: 0
                }]
            },
            // 表单校验提示
            rules: {
                isRate: [
                    { required: true, type: 'number', message: '请选择是否评奖', trigger: 'change' }
                ],
                awardsList: [
                    { type: 'array', required: true, message: '请至少输入 1 个完整的奖项', trigger: 'blur' },
                    { validator: validateAwardsList, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 获取详情及上级评比时间
        getDetail() {
            requestPhaseDetail({ matchId: this.form.matchId }).then((res) => {
                if (res.data.code === 200) {
                    const datas = res.data.entity || {}
                    const _form = {}
                    const _date = {}

                    _form.isRate = Number(datas.isRate) || 2
                    _form.awareType = Number(datas.awareType) || 1
                    _form.isType = Number(datas.isType) === 1
                    _form.isGroup = Number(datas.isGroup) === 1
                    _form.isApply = Number(datas.isApply) === 1
                    if (datas.awardsList && datas.awardsList.length) {
                        _form.awardsList = datas.awardsList
                    }
                    _date.startDate = datas.startDate
                    _date.endDate = datas.endDate

                    this.$set(this.$data, 'form', Object.assign(this.form, _form))
                    this.$set(this.$data, 'date', _date)
                    this.$set(this.$data, 'disabled', !datas.isModify || false)
                }
            })
        },
        // 提交表单
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    saveCompareConfig(this.params).then((response) => {
                        if (response.data.code === 200) {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            })
                        } else {
                            this.$message.error(response.data.msg)
                        }
                    })
                } else {
                    // console.log('error submit!!')
                    return false
                }
            })
        },
        appendPrizeItem() {
            const item = { name: '', description: '', score: '', num: 0 }
            this.form.awardsList.push(item)
        },
        deletePrizeItem(index) {
            this.form.awardsList.splice(index, 1)
        }
    },
    created() {
        this.$set(this.form, 'matchId', this.$route.query.id)
        this.getDetail()
    },
    mounted() {
        console.log(this.detail)
    },
    computed: {
        ...mapState('matchDetail', {
            detail(state) {
                const details = state.detail || {}
                return details
            }
        }),
        params: function () {
            const _params = Object.assign({}, this.form)

            if (_params.isRate === 1) {
                _params.isType = _params.isType ? 1 : 2
                _params.isGroup = _params.isGroup ? 1 : 2
                _params.isApply = _params.isApply ? 1 : 2
                _params.awardsList = _params.awardsList.filter(x => x.name.length).map((x) => {
                    const item = {}
                    // if (x.id) {
                    //     item.id = x.id
                    // }
                    item.name = x.name
                    item.startScale = _params.awareType === 1 ? x.startScale : 0
                    item.endScale = _params.awareType === 1 ? x.endScale : 0
                    item.num = _params.awareType === 2 ? x.num : 0
                    return item
                })
            } else {
                delete _params.isType
                delete _params.isGroup
                delete _params.isApply
                delete _params.awardsList
            }

            return _params
        }
    }
}
</script>

<style lang="scss">
    .evaluate_setting_offline {
        .el-input-number {
            width: 100%;
        }
    }
</style>

<style lang='scss' scoped>
    .content-box {
        padding: 20px 15px 20px;
    }
    .hint {
        display: table;
        height: 36px;
        font-size: 12px;
        line-height: 1.5;
        color: #999;

        .icon-form-tip {
            padding-right: 4px;
            font-size: 14px;
            text-indent: 10px;
        }

        &.vt {
            $lh: 24px;
            height: auto;
            line-height: $lh;

            .table-cell {
                vertical-align: top;
            }

            .icon-form-tip {
                padding-right: 4px;
                font-size: 14px;
                text-indent: 10px;
                line-height: $lh;
            }
            ul.decimal {
                padding-left: 1em;
                list-style-type: decimal;
            }
        }
    }
    .icon-btn-add {
        margin-right: 4px;
    }
    .center {
        text-align: center;
    }
    .prize-title {
        background-color: #dfdfdf;
        text-align: center;
    }
    .prize-list {
        margin: 10px 0;
        text-align: center;

        .prize-input-box {
            padding-right: 10px;
        }

        .handler {
            font-size: 16px;
        }
    }
    .prize-add {
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
</style>