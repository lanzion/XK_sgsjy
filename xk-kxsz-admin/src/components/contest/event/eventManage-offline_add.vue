<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 竞赛项目 -->
            <el-row>
                <el-form-item label="竞赛项目" prop="name">
                    <el-col :span="8">
                        <el-input v-model="form.name" placeholder="请输入竞赛项目" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 参赛人群 -->
            <el-row>
                <el-form-item label="参赛人群" prop="actorType">
                    <el-col :span="8">
                        <el-checkbox-group v-model="form.actorType">
                            <el-checkbox v-for="item in actorTypeDL" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 描述 -->
            <el-row>
                <el-form-item label="描述" prop="description">
                    <el-col :span="12">
                        <el-input type="textarea" v-model="form.description" placeholder="请输入项目描述" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 申报表单 -->
            <el-row>
                <el-form-item label="申报表单" prop="formType">
                    <el-col :span="8">
                        <el-select v-model="form.formType" placeholder="请选择申报表单">
                            <el-option v-for="item in formTypeDL" :label="item.name" :value="item.id" :key="item.id" :disabled="isReadOnly"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 表单预览 -->
            <el-row>
                <el-form-item label="表单预览">
                    <el-col :span="18">
                        <img :src="prev[`img${form.formType}`]" class="prev">
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
import { mapState, mapActions } from 'Vuex'
import { addContestItem, requestContestItemDetail, modifyContestItem } from '@/service/admin_contest-offline.js'
import prev111 from '@/assets/img/contest/form_111.png'
import prev112 from '@/assets/img/contest/form_112.png'
import prev113 from '@/assets/img/contest/form_113.png'
import prev114 from '@/assets/img/contest/form_114.png'
import defaultImg from '@/assets/img/common/info.png'

export default {
    name: 'contestEventAddOffline',
    data() {
        return {
            // 表单数据
            form: {
                name: '',           // 项目名称
                actorType: [],
                description: '',    // 项目描述
                formType: ''        // 表单类型
            },
            // 表单校验提示
            rules: {
                name: [
                    { required: true, message: '请输入竞赛项目', trigger: 'change' },
                    { max: 20, message: '最多输入20字', trigger: 'change' }
                ],
                actorType: [
                    { required: true, type: 'array', message: '请选择参赛人群', trigger: 'blur' }
                ],
                formType: [
                    { required: true, message: '请选择申报表单', trigger: 'change' }
                ],
            },
            prev: {
                img: defaultImg,
                img111: prev111,
                img112: prev112,
                img113: prev113,
                img114: prev114
            },
            isReadOnly: false,
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            actorTypeDL (state) {
                let dicList = (state['actorTypeOffLineDicList'] || {}).dicList || []
                return dicList
            },
            formTypeDL (state) {
                let dicList = (state['contestEnterFormDicList'] || {}).dicList || []
                return dicList
            },
        })
    },
    mounted() {
        this.getDictComb("contestEnterForm")

        if (this.$route.path.includes('detail')) {
            this.isReadOnly = true
        }
        let _id = this.$route.query.id
        if(_id != undefined) {
            this.$set(this.form, 'id', _id)
            // this.disabled = true
            this.getDetail()
        }
    },
    methods: {
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        // 获取竞赛项目详情
        getDetail() {
            requestContestItemDetail({id: this.form.id}).then(res => {
                if (res.data.code == 200) {
                    let details = res.data.entity
                    let _form = {}
                    _form.id = details.id
                    _form.name = details.name
                    _form.actorType = details.actorType.split(',')
                    _form.description = details.description
                    _form.formType = details.formType
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
                    let _actorType = this.form.actorType.join(',')
                    this.$set(this.form, 'actorType', _actorType)

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
    .prev {
        border: 1px solid #dfdfdf;
    }
</style>