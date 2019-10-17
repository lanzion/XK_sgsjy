<template>
    <div class="admin-add__box backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 工作职位 -->
            <el-row>
                <el-form-item label="工作职位" prop="positionName">
                    <el-col :span="8">
                        <el-input placeholder="请输入工作职位" v-model="form.positionName" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 所属部门 -->
            <el-row>
                <el-form-item label="所属部门" prop="department">
                    <el-col :span="8">
                        <el-input placeholder="请输入所属部门" v-model="form.department" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 发布时间 -->
            <el-row>
                <el-form-item label="发布时间" prop="releaseDate">
                    <el-col :span="8">
                        <el-date-picker v-model="form.releaseDate" type="date" placeholder="请选择发布时间" :disabled="isReadOnly"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 薪资待遇 -->
            <el-row>
                <el-form-item label="薪资待遇" prop="money">
                    <el-col :span="8">
                        <el-input placeholder="请输入薪资待遇" v-model="form.money" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 工作年限 -->
            <el-row>
                <el-form-item label="工作年限" prop="workYear">
                    <el-col :span="8">
                        <el-input placeholder="请输入工作年限" v-model="form.workYear" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 学历 -->
            <el-row>
                <el-form-item label="学历" prop="education">
                    <el-col :span="8">
                        <el-input placeholder="请输入学历" v-model="form.education" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 状态 -->
            <el-row>
                <el-form-item label="状态" prop="status">
                    <el-col :span="8">
                        <el-switch v-model="form.status" :on-value="1" :off-value="0" on-text="" off-text="" :disabled="isReadOnly"></el-switch>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 招聘人数 -->
            <el-row>
                <el-form-item label="招聘人数" prop="recruitNum">
                    <el-col :span="8">
                        <el-input-number v-model="form.recruitNum" placeholder="请输入招聘人数" :disabled="isReadOnly"></el-input-number>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 工作地点 -->
            <el-row>
                <el-form-item label="工作地点" prop="workAddress">
                    <el-col :span="8">
                        <el-input placeholder="请输入工作地点" v-model="form.workAddress" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 岗位职责 -->
            <el-row>
                <el-form-item label="岗位职责" prop="duty">
                    <el-col :span="10">
                        <el-input type="textarea" v-model="form.duty" :rows="5" placeholder="请输入岗位职责" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 岗位要求 -->
            <el-row>
                <el-form-item label="岗位要求" prop="requirement">
                    <el-col :span="10">
                        <el-input type="textarea" v-model="form.requirement" :rows="5" placeholder="请输入岗位要求" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 按钮部分 -->
            <el-form-item v-if="isReadOnly">
                <button class="bs-form-button i-form-button" type="button" @click="$router.go(-1)">返回</button>
            </el-form-item>
            <el-form-item v-else>
                <button class="bs-search-button i-form-button" type="button" @click="onSubmit('form')">{{ form.id?'保存':'发布'}}</button>
                <button class="bs-search-button i-form-button is-plain" @click="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'Vuex'
    import { fileUpload } from 'Asset/js/common-config.js'
    import { addRecruit, requestRecruitDetail, modifyRecruit } from '@/service/admin_configure.js'
    // import dataTranslation from 'Asset/js/dataTranslation.js'

    export default {
        name:'addRecruit',
        data () {
            return {
                form: {
                    positionName: '',
                    department: '',
                    releaseDate: new Date(),
                    money: '',
                    workYear: '',
                    education: '',
                    recruitNum: 1,
                    status: 1,
                    workAddress: '广州市天河区信息港B栋301A习课科技',
                    duty: '',
                    requirement: '',
                    isSchool: 0
                },
                rules: {
                    positionName: [
                        { required: true, message: '请输入工作职位', trigger: 'change' },
                        { max: 20, message: '不超过20字符', trigger: 'change' }
                    ],
                    department: [
                        { required: true, message: '请输入所属部门', trigger: 'change' }
                    ],
                    money: [
                        { required: true, message: '请输入薪资待遇', trigger: 'change' }
                    ],
                    workYear: [
                        { required: true, message: '请输入工作年限', trigger: 'change' }
                    ],
                    education: [
                        { required: true, message: '请输入学历要求', trigger: 'change' }
                    ],
                    recruitNum: [
                        { required: true, type: 'number', message: '请输入招聘人数', trigger: 'change' }
                    ],
                    duty: [
                        { required: true, message: '请输入岗位职责', trigger: 'change' }
                    ],
                    requirement: [
                        { required: true, message: '请输入岗位要求', trigger: 'change' }
                    ]
                },
                isReadOnly: false,
            }
        },
        created () {
            if (this.$route.path.includes('detail')) {
                this.isReadOnly = true
                this.rules = {}
            }

            let _id = this.$route.query.id
            if(_id != undefined) {
                this.$set(this.form, 'id', _id)
                this.getDetail()
            }
        },
        methods: {
            // 获取资讯详情
            getDetail() {
                requestRecruitDetail({id: this.form.id}).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity || {}
                        let _form = {
                            id: _data.id,
                            positionName: _data.positionName,
                            department: _data.department,
                            releaseDate: _data.releaseDate,
                            money: _data.money,
                            workYear: _data.workYear,
                            education: _data.education,
                            recruitNum: _data.recruitNum,
                            status: _data.status,
                            workAddress: _data.workAddress,
                            duty: _data.duty.replace(/<br\/>/g, '\n'),
                            requirement: _data.requirement.replace(/\<br\/>/g, '\n'),
                            isSchool: _data.isSchool
                        }
                        this.form = _form
                    }
                })
            },
            // 添加/修改
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let handler = this.form.id ? modifyRecruit : addRecruit
                        let txt = this.form.id ? '修改' : '发布'
                        let form = this.form
                        form.duty = form.duty.replace(/\n|\r\n/g, '<br/>')
                            form.requirement = form.requirement.replace(/\n|\r\n/g, '<br/>')

                        handler(this.form).then(response => {
                            if (response.data.code === 200) {
                                this.$router.go(-1)
                                this.$message({
                                    showClose: true,
                                    message: `${txt}成功`,
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
/* .admin-add__box{
    min-height: 820px;
    font-size: 14px;
} */
</style>