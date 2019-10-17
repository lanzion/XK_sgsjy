<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 姓名 -->
            <el-row>
                <el-form-item label="姓名" prop="name">
                    <el-col :span="8">
                        <el-input v-model="form.name" placeholder="请输入姓名" :disabled="true"></el-input>
                    </el-col>
                    <el-col :span="16" v-if="!disabled">
                        <button class="select bs-form-button i-form-button is-plain" type="button" @click="selTeachVisible=true">选择</button>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 区域 -->
            <el-row>
                <el-form-item label="区域" prop="region">
                    <el-col :span="8">
                        <v-region-select :defaultItems.sync="region" class="select-region" :isAdmin="true" :disabled="true"></v-region-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="所在单位" prop="unit">
                    <el-col :span="8">
                        <el-input v-model="form.unit" placeholder="请输入所在单位" :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 手机 -->
            <el-row>
                <el-form-item label="手机" prop="mobile">
                    <el-col :span="8">
                        <el-input v-model="form.mobile" placeholder="请输入手机" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 电子邮箱 -->
            <el-row>
                <el-form-item label="电子邮箱" prop="email">
                    <el-col :span="8">
                        <el-input v-model="form.email" placeholder="请输入电子邮箱" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 联系地址 -->
            <el-row>
                <el-form-item label="联系地址" prop="address">
                    <el-col :span="8">
                        <el-input v-model="form.address" placeholder="请输入联系地址" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-form-item v-if="isReadOnly">
                <button class="bs-form-button i-form-button" type="button" @click="$router.go(-1)">返回</button>
            </el-form-item>
            <el-form-item v-else>
                <button class="bs-form-button i-form-button" type="button" @click="onSubmit('form')">保存</button>
                <button class="bs-form-button i-form-button is-plain" type="button" @click="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
        <el-dialog class="dialog-select" :visible.sync="selTeachVisible" size="small" title="选择">
            <v-expert-teacher @checkedItem="selectedTeacher" :isAdmin="true"></v-expert-teacher>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'Vuex'
import { baseInfo, userIdentity } from '@/js/getUserInfo.js'
import { addContestExpert, requestContestExpertDetail, modifyContestExpert } from '@/service/admin_contest.js'
import region from '@/components/common/select/region_select.vue'
import expertTeacher from '@/components/admin/admin_contest/select_expert_teacher.vue'

export default {
    name: 'expertManageAdd',
    data() {
        var validatePhone = (rule, value, callback) => {
            let regular = /^[1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8}$/
            if (value === '') {
                callback(new Error('请输入手机号'))
            } else if (!regular.test(value)) {
                callback(new Error('请输入正确格式的手机号'))
            } else {
                callback();
            }
        }
        var validateEmail = (rule, value, callback) => {
            let regular = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
            if (value === '') {
                callback(new Error('请输入电子邮箱'))
            } else if (!regular.test(value)) {
                callback(new Error('请输入正确格式的电子邮箱'))
            } else {
                callback();
            }
        }
        return {
            identity: userIdentity,
            // 表单数据
            form: {
                userId: null,
                name: '',           // 姓名
                provinceId: '',
                cityId: '',
                areaId: '',
                unit: '',           // 所在单位
                mobile: '',         // 联系电话
                email: '',          // 电子邮箱
                address: '',        // 地址
            },
            region: [],
            schoolList: [],         // 所属学校列表
            disabled: false,
            isReadOnly: false,
            // 表单校验提示
            rules: {
                mobile: [
                    { validator: validatePhone, required: true, trigger: 'change' }
                ],
                email: [
                    { validator: validateEmail, required: true, trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入联系地址', trigger: 'change' }
                ]
            },
            selTeachVisible: false
        }
    },
    methods: {
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        //获取专家详情
        getDetail(){
            requestContestExpertDetail({ id: this.form.id }).then((res) => {
                if (res.data.code === 200) {
                    let datas = res.data.entity
                    let _form = {}
                    _form.id = datas.id
                    _form.userId = datas.userId
                    _form.provinceId = datas.provinceId
                    _form.cityId = datas.cityId
                    _form.areaId = datas.areaId
                    _form.name = datas.userName
                    _form.unit = datas.unit
                    _form.mobile = datas.mobile
                    _form.email = datas.email
                    _form.address = datas.address
                    this.region = [datas.provinceId, datas.cityId, datas.areaId]
                    this.$set(this.$data, 'form', _form)
                }
            })
        },
        // 所属学校改变
        changeSchool(item) {
            this.$set(this.form, 'schoolId', item.id)
        },
        selectedTeacher(item) {
            let _form = {
                provinceId: item.provinceId,
                cityId: item.cityId,
                areaId: item.areaId,
                name: item.name,
                mobile: item.phone,
                email: item.email,
                address: item.address,
                unit: item.schoolName,
                userId: item.userId
            }
            this.$set(this.$data, 'form', _form)
            this.region = [item.provinceId, item.cityId, item.areaId]
            this.selTeachVisible = false
        },
        // 提交表单
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = Object.assign({}, this.form)
                    if (this.$route.query.id == undefined) {
                        addContestExpert(params).then( response => {
                            if (response.data.code == 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                })
                                this.$router.go(-1)
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    } else {
                        modifyContestExpert(params).then( response => {
                            if (response.data.code == 200) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                })
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
            });
        }
    },
    mounted() {
        this.getDictComb("technicalClassification").then(res => {
            this.teachList = res.dicList
        })
        if (this.$route.path.includes('detail')) {
            this.isReadOnly = true
        }

        if(this.$route.query.id != undefined){
            this.disabled = true
            this.$set(this.form, 'id', this.$route.query.id)
            this.getDetail()
        }
    },
    components: {
        'v-region-select': region,
        'v-expert-teacher': expertTeacher
    }
}
</script>

<style lang="scss">
    .dialog-select {
        .el-dialog {
            width: 600px;
        }
    }
</style>

<style lang="scss" scoped>
    .select {
        margin-left: 10px;
    }
</style>