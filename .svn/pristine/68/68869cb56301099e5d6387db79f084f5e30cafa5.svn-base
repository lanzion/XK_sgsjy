<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 申报组别 -->
            <el-row>
                <el-form-item label="组别" prop="name">
                    <el-col :span="8">
                        <el-input v-model="form.name" placeholder="请输入申报组别" :disabled="isReadOnly"></el-input>
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
                        <el-input type="textarea" v-model="form.description" placeholder="请输入申报组别描述" :disabled="isReadOnly"></el-input>
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
import { addContestGroup, requestContestGroupDetail, modifyContestGroup } from '@/service/admin_contest-offline.js'

export default {
    name: 'contestEventAddOffline',
    data() {
        return {
            // 表单数据
            form: {
                name: '',           // 项目名称
                actorType: [],
                description: '',    // 项目描述
            },
            // 表单校验提示
            rules: {
                name: [
                    { required: true, message: '请输入申报组别', trigger: 'change' },
                    { max: 20, message: '最多输入20字', trigger: 'change' }
                ],
                actorType: [
                    { required: true, type: 'array', message: '请选择参赛人群', trigger: 'blur' }
                ],
            },
            isReadOnly: false,
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            actorTypeDL (state) {
                let dicList = (state['actorTypeOffLineDicList'] || {}).dicList || []
                return dicList
            }
        })
    },
    mounted() {
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
        // 获取申报组别详情
        getDetail() {
            requestContestGroupDetail({id: this.form.id}).then(res => {
                if (res.data.code == 200) {
                    let details = res.data.entity
                    let _form = {}
                    _form.id = details.id
                    _form.name = details.name
                    _form.actorType = details.actorType.split(',')
                    _form.description = details.description
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
                        addContestGroup(this.form).then( response => {
                            if (response.data.code == 200) {
                                this.showMessage('success', '添加成功')
                                this.$router.go(-1)
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    } else {
                        modifyContestGroup(this.form).then( response => {
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
        }
    },
}
</script>