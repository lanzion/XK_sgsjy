<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 入学年份 -->
            <el-row>
                <el-form-item label="入学年份" prop="enrollmentYear">
                    <el-col :span="8">
                        <el-date-picker v-model="form.enrollmentYear" type="year" placeholder="请选择入学年份" :picker-options="enrollmentYearOptions"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 所属学校 -->
            <el-row v-if="identity=='education' || identity=='admin'">
                <el-form-item label="所属学校" prop="schoolId">
                    <el-col :span="8">
                        <v-region-school-select :defaultItems="form.region" :isAdmin="true" @checkedItem="changeSchool" :checkedItem="form.schoolId" :disabled="isReadOnly"></v-region-school-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 所属年级 -->
            <el-row>
                <el-form-item label="所属年级" prop="gradeId" required>
                    <el-col :span="8">
                        <el-select v-model="form.gradeId" placeholder="请选择年级" :disabled="isReadOnly">
                            <el-option v-for="item in gradeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 班号 -->
            <el-row>
                <el-form-item label="班号" prop="classNum" required>
                    <el-col :span="8">
                        <el-input-number v-model="form.classNum" :min="0"></el-input-number>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 班级名称 -->
            <el-row>
                <el-form-item label="班级名称" prop="className">
                    <el-col :span="8">
                        <el-input v-model="className" placeholder="请输入班级名称" disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 班级别名 -->
            <!-- <el-row>
                <el-form-item label="班级别名" prop="alias">
                    <el-col :span="8">
                        <el-input v-model="form.alias" placeholder="请输入班级别名" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row> -->
            <!-- 班主任 -->
            <el-row>
                <el-form-item label="班主任" prop="teacherId">
                    <el-col :span="8">
                        <el-select v-model="form.teacherId" placeholder="请选择班主任" :disabled="isReadOnly">
                            <el-option v-for="item in teacherList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 班级管理 -->
            <el-row v-if="form.id">
                <el-form-item label="班级管理" prop="studentId">
                    <el-col :span="8">
                        <el-select v-model="form.studentId" placeholder="请输入班级管理，本班学生" :disabled="isReadOnly">
                            <el-option v-for="item in studentList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 班级简介 -->
            <el-row>
                <el-form-item label="班级简介" prop="remark">
                    <el-col :span="10">
                        <el-input type="textarea" v-model="form.remark" placeholder="请输入班级简介" :disabled="isReadOnly"></el-input>
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
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'Vuex'
import { baseInfo, userIdentity } from 'Asset/js/getUserInfo.js'
import { requestBaseTeacherSelect, requestBaseStudentSelect, requestClaszDetail, addClasz, modifyClasz } from '@/service/admin_base.js'
import regionSchool from '@/components/common/select/region-school_select.vue'
export default {
    name: 'claszManageAdd',
    data() {
        return {
            identity: userIdentity,
            // 表单数据
            form: {
                enrollmentYear: '', // 入学年份
                schoolId: userIdentity == 'school'? baseInfo[userIdentity].id : '',       // 学校ID
                schoolName: userIdentity == 'school'? baseInfo[userIdentity].schoolName : '',     // 学校名称
                gradeId: '',        // 所属年级
                className: '',      // 班级名称
                classNum: '',
                // alias: '',          // 班级别名
                teacherId: '',      // 班主任
                studentId: '',      // 班级管理
                remark: ''          // 班级简介
            },
            // enrollmentYearList: [], // 入学年份列表
            gradeList: [],          // 所属年级列表
            teacherList: [],        // 班主任列表
            studentList: [],        // 学生列表
            // 表单校验提示
            rules: {
                enrollmentYear: [
                    { type: 'date', required: true, message: '请选择入学年份', trigger: 'change' }
                ],
                schoolId: [
                    { required: true, message: '请选择所属学校', trigger: 'blur' }
                ],
                gradeId: [
                    { required: true, message: '请选择所属年级', trigger: 'change' }
                ],
                classNum: [
                    { type: 'number', required: true, message: '请输入班号', trigger: 'change' }
                ],
                // className: [
                //     { required: true, message: '请输入班级名称', trigger: 'change' }
                // ],
                // alias: [
                //     { required: true, message: '请输入班级别名', trigger: 'change' }
                // ],
                remark: [
                    { required: true, message: '请输入班级简介', trigger: 'change' }
                ],
            },
            isReadOnly: false,
            enrollmentYearOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            learningStages (state) {
                let dicList = (state['learningStagesDicList'] || {}).dicList || []
                return dicList
            }
        }),
        className: function() {
            let result = ''
            let grade = Number(this.form.gradeId.split('grade')[1])
            if (grade >= 10) {
                result += '高中'
            } else if (grade >= 7) {
                result += '初中'
            } else {
                result += '小学'
            }
            this.form.enrollmentYear && (result += `${this.form.enrollmentYear.getFullYear()}级`)
            result += `${this.form.classNum}班`
            return result
        }
    },
    watch: {
    },
    methods: {
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        // 获取班级详情
        getClaszDetail() {
            requestClaszDetail({id: this.form.id}).then(response => {
                if (response.data.code == 200) {
                    let details = response.data.entity;
                    let _form = {};
                    _form.region = [details.provinceId, details.cityId, details.areaId]
                    _form.id = details.id;
                    _form.enrollmentYear = new Date(details.enrollmentYear);
                    _form.schoolId = details.schoolId;
                    _form.schoolName = details.schoolName;
                    _form.gradeId = details.gradeId;
                    _form.className = details.className;
                    let classNum = details.className.split(/\D/).filter(x => x && x!==details.enrollmentYear)
                    _form.classNum = classNum.length && classNum[classNum.length - 1] || 0;
                    // _form.alias = details.alias;
                    _form.teacherId = details.teacherId;
                    _form.studentId = details.studentId;
                    _form.remark = details.remark;
                    this.$set(this.$data, 'form', _form);
                    this.getDictComb(details.schoolType).then(res => {
                        this.gradeList = res.dicList;
                    })
                    this.getTeacherList();
                }

            })
        },
        // 设置入学年份列表
        // setEnrollmentYearList(schoolType) {
        //     schoolType = schoolType === undefined ? '' : schoolType;

        //     let thisYear = (new Date()).getFullYear();
        //     let thisYearObj = { name: thisYear + '年', val: thisYear };
        //     this.$set(this.$data, 'enrollmentYearList', []);

        //     let len = schoolType.split(',').includes('primarySchool') ? 6 : 3;
        //     let _enrollmentYearList = new Array(len + 1).fill(thisYearObj);
        //     _enrollmentYearList.forEach((x, index) => {
        //         x = Object.assign({}, x);
        //         x.name = thisYear - index + '年';
        //         x.val = thisYear - index;
        //         this.enrollmentYearList.push(x)
        //     })
        // },
        // 所属学校改变
        changeSchool(item) {
            this.$set(this.$data.form, 'schoolId', item.id);
            this.$set(this.$data.form, 'schoolName', item.schoolName);
            this.getDictComb(item.schoolType).then(res => {
                this.gradeList = res.dicList;
            })
            // this.setEnrollmentYearList(item.schoolType)
            this.getTeacherList();
        },
        // 获取该校老师列表
        getTeacherList() {
            requestBaseTeacherSelect({ schoolId: this.form.schoolId }).then(response => {
                if (response.data.code == 200) {
                    this.teacherList = response.data.entity;
                }
            })
        },
        // 获取该班学生列表
        getStudentList() {
            requestBaseStudentSelect({ classId: this.form.id }).then(response => {
                if (response.data.code == 200) {
                    this.studentList = response.data.entity;
                }
            })
        },
        // 提交表单
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let handler = modifyClasz
                    let txt = '保存'
                    this.form.className = this.className
                    this.form.enrollmentYear = this.form.enrollmentYear.getFullYear()
                    delete this.form.classNum

                    if (this.form.id == null) {
                        handler = addClasz
                        txt = '添加'
                    }
                    handler(this.form).then( response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: `${txt}成功`,
                                type: 'success'
                            })
                            this.$router.go(-1)
                        } else {
                            this.$message.error(response.data.msg)
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted() {
        this.getDictComb("learningStages")
        // this.setEnrollmentYearList();
        if (this.$route.path.includes('detail')) {
            this.isReadOnly = true
        }
        let _id = this.$route.query.id;
        if(_id != undefined) {
            this.$set(this.$data.form, 'id', _id);
            this.getStudentList();
            this.getClaszDetail();
        } else if (userIdentity == 'school') {
            this.form.schoolId = baseInfo[userIdentity].id
            this.getTeacherList()
            this.getDictComb(baseInfo[userIdentity].schoolType).then(res => {
                this.gradeList = res.dicList;
            })
        }
    },
    components: {
        'v-region-school-select': regionSchool
    }
}
</script>
