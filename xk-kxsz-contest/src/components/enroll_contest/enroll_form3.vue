<template>
    <section class="enroll-form">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">

            <el-form-item label="教师姓名" prop="teacherName">
                <el-col :span="8">
                    <el-input v-model="form.teacherName" placeholder="请输入教师姓名，限10字以内" :maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="申报组别" prop="declareId">
                <el-col :span="8">
                    <el-radio-group v-model="form.declareId">
                        <el-radio v-for="(item, index) in declareList" :key="index" :label="item.declareId" :disabled="!item.actorType.includes(userType)">{{item.declareName}}</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="14">
                    <i class="icon-form-tip"></i>
                    请按小学组、中学组选择申报组别,请勿选择其他组别
                </el-col>
            </el-form-item>

            <el-form-item label="学校全称" prop="schoolName">
                <el-col :span="8">
                    <el-input v-model="form.schoolName" placeholder="请输入学校全称" :maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="学校地址" prop="address">
                <el-col :span="8">
                    <el-input v-model="form.address" placeholder="请输入学校地址" :maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="任教学科" prop="teach">
                <el-col :span="8">
                    <el-input v-model="form.teach" placeholder="请输入任教学科" :maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
                <el-col :span="8">
                    <el-input v-model="form.age" placeholder="请输入年龄" :maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="form.sex">
                    <el-radio v-for="(item, index) in sexGroup" :key="index" :label="item.val">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="联系电话" prop="phone">
                <el-col :span="8">
                    <el-input v-model="form.phone" placeholder="请输入联系电话" :maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="身份证号" prop="idCode">
                <el-col :span="8">
                    <el-input v-model="form.idCode" placeholder="请输入身份证号" :maxlength="20"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="微信或QQ" prop="qq">
                <el-col :span="8">
                    <el-input v-model="form.qq" placeholder="请输入微信或QQ" :maxlength="20"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="资源简介" prop="description">
                <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 6, maxRows: 100 }" placeholder="描述要求：
1、从类型和内容两个方面介绍
2、类型要求：有哪些类型的资源，包括论文、教学设计、教学课件（PPT、微视频）等教学资源
3、内容要求：内容简介"></el-input>
            </el-form-item>

            <el-form-item label="科教成果" prop="corporationResultList">
                <el-row class="member-title">
                    <el-col :span="2">序号</el-col>
                    <el-col :span="5">活动名称</el-col>
                    <el-col :span="5">获奖项目</el-col>
                    <el-col :span="5">获奖等级</el-col>
                    <el-col :span="5">参与学生数量</el-col>
                    <el-col :span="2">操作</el-col>
                </el-row>
                <el-row class="member-list" v-for="(item, index) in form.corporationResultList" :key="index">
                    <el-col :span="2">
                        <span>{{index + 1}}</span>
                    </el-col>
                    <el-col class="pd5" :span="5">
                        <el-input v-model="item.name" placeholder="活动名称" :maxlength="50"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="5">
                        <el-input v-model="item.projectName" placeholder="获奖项目" :maxlength="50"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="5">
                        <el-input v-model="item.grade" placeholder="获奖级别" :maxlength="20"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="5">
                        <el-input v-model="item.student" placeholder="参与学生数量"></el-input>
                    </el-col>
                    <el-col :span="2">
                        <i v-if="index != 0" class="handler icon-btn-delete" @click="delResult(index)"></i>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" class="add-member">
                        <button class="add-member-btn" @click.prevent="addResult"><i class="icon-btn-add"></i> 添加</button>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="附件">
                <el-col :span="15">
                    <el-upload class="upload-demo" action :file-list="attachmentList" :on-change="changeFiles" :on-remove="changeFiles" :before-upload="UploadFile">
                        <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                        <p slot="tip" class="upload-tip">您可上传认为必要的相关文件（例如程序的截图），单个文件大小在50M以内。
编程类作品请上传程序和资源，程序文件为sb后缀的文件，其他类型程序文件请压缩为rar格式再上传</p>
                    </el-upload>
                </el-col>
            </el-form-item>

            <div class="btn-group">
                <button class="confirm-btn" @click.prevent="submit">确定</button>
                <button class="cancel-btn" @click.prevent="$router.push({ path: '/contest/detail', query: { id: $route.query.id, type: 2 } })">取消</button>
            </div>

        </el-form>
    </section>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { matchOfflineActorAdd, actorAddModify } from '@/service/matchEntrance.js'

    export default {
        name: 'enrollForm3',
        mixins: [uploadFileSize],
        data() {
            const validateResult = (rule, value, callback) => {
                let flag = true
                for (let i = 0; i < value.length; i++) {
                    if (value[i].name.trim() === '' || value[i].projectName.trim() === '' || value[i].grade.trim() === '' || value[i].student.trim() === '') {
                        flag = false
                        break
                    }
                }
                if (flag) {
                    callback()
                } else {
                    callback(new Error('请输入完整的成果信息'))
                }
            }
            const validatePhone = (rule, value, callback) => {
                const regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/
                if (!regular.test(value)) {
                    callback(new Error('请输入正确格式的电话号码'))
                } else {
                    callback()
                }
            }
            const validteAge = (rule, value, callback) => {
                const regular = /^[0-9]*$/
                if (!regular.test(value)) {
                    callback(new Error('年龄必须是数字'))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    teacherName: '',
                    declareId: '',
                    schoolId: '',
                    schoolName: '',
                    address: '',
                    teach: '',
                    age: '',
                    sex: '',
                    phone: '',
                    idCode: '',
                    qq: '',
                    corporationResultList: [
                        { name: '', projectName: '', grade: '', student: '' },
                        { name: '', projectName: '', grade: '', student: '' }
                    ],
                    description: '',
                },
                attachmentList: [],
                sexGroup: [
                    { name: '男', val: '7' },
                    { name: '女', val: '8' }
                ],
                rules: {
                    teacherName: [
                        { required: true, message: '请输入教师姓名' }
                    ],
                    declareId: [
                        { required: true, message: '请选择申报组别' }
                    ],
                    schoolName: [
                        { required: true, message: '请输入学校名称' }
                    ],
                    address: [
                        { required: true, message: '请输入学校地址' }
                    ],
                    teach: [
                        { required: true, message: '请输入任教学科' }
                    ],
                    age: [
                        { required: true, message: '请输入年龄' },
                        { validator: validteAge, trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别' }
                    ],
                    phone: [
                        { required: true, message: '请选择输入电话' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    idCode: [
                        { required: true, message: '请选择输入身份证号' }
                    ],
                    qq: [
                        { required: true, message: '请输入qq或微信' }
                    ],
                    description: [
                        { required: true, message: '请输入社团简介' }
                    ],
                    corporationResultList: [
                        { required: true, type: 'array', message: '请输入成果信息' },
                        { validator: validateResult, trigger: 'blur' }
                    ]
                },
                userType: this.$ls.get('userIdentity') === 'teacher' ? '1' : '0'
            }
        },
        props: {
            formType: {
                type: String,
                default: ''
            },
            projectId: {
                type: String,
                default: ''
            },
            declareList: {
                type: Array,
                default() {
                    return []
                }
            },
            detail: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        created() {
            const baseInfo = this.$ls.get('baseInfo').baseInfo
            this.form.teacherName = baseInfo.name
            this.form.schoolName = baseInfo.schoolName
            this.form.address = this.$ls.get('baseInfo').school.address
            this.form.schoolId = baseInfo.schoolId
            this.form.idCode = baseInfo.certiNum
            this.form.phone = baseInfo.phone
            this.setForm(this.detail)
        },
        watch: {
            detail: {
                handler: function (val) {
                    this.setForm(val)
                },
                deep: true
            }
        },
        methods: {
            // 修改时设置详情信息
            setForm(val) {
                if (Object.keys(val).length && this.formType === '112') {
                    const resultArr = []
                    const resultList = val.steamResultList
                    const attachmentList = val.attachmentList
                    this.ifModify = true
                    this.form.teacherName = val.opus.name
                    this.form.declareId = val.declareId
                    this.form.schoolId = val.steamTemplate.schoolId
                    this.form.address = val.steamTemplate.address
                    this.form.teach = val.steamTemplate.teach
                    this.form.age = val.steamTemplate.age
                    this.form.sex = val.steamTemplate.sex
                    this.form.phone = val.steamTemplate.phone
                    this.form.idCode = val.steamTemplate.idCode
                    this.form.qq = val.steamTemplate.qq
                    for (let i = 0; i < resultList.length; i++) {
                        resultArr.push({ name: resultList[i].name, projectName: resultList[i].projectName, grade: resultList[i].grade, student: resultList[i].student, id: resultList[i].id })
                    }
                    this.form.corporationResultList = resultArr
                    this.form.description = val.opus.description
                    this.attachmentList = []
                    if (attachmentList !== null && attachmentList.length) {
                        for (let k = 0; k < attachmentList.length; k++) {
                            this.attachmentList.push({ name: attachmentList[k].name, resourceId: attachmentList[k].resourceId, id: attachmentList[k].id })
                        }
                    }
                } else {
                    this.form.teacherName = ''
                    this.form.declareId = ''
                    this.form.schoolId = ''
                    this.form.schoolName = ''
                    this.form.address = ''
                    this.form.teach = ''
                    this.form.age = ''
                    this.form.sex = ''
                    this.form.phone = ''
                    this.form.idCode = ''
                    this.form.qq = ''
                    this.form.corporationResultList = [
                        { name: '', projectName: '', grade: '', student: '' },
                        { name: '', projectName: '', grade: '', student: '' }
                    ]
                    this.form.description = ''
                    this.attachmentList = []
                }
            },
            // 上传附件
            UploadFile(file) {
                const fileSize = file.size
                if (fileSize >= (this.standardFileSize * 1024 * 1024)) {
                    this.$message({ message: `文件大小不超过${this.standardFileSize}M` })
                    return false
                }
            },
            // 附件改变
            changeFiles(file, fileList) {
                this.attachmentList = fileList
            },
            // 添加、删除成果
            addResult() {
                this.form.corporationResultList.push({ name: '', projectName: '', grade: '', student: '' })
            },
            delResult(index) {
                this.form.corporationResultList.splice(index, 1)
            },

            submit() {
                if (this.formType === '0') {
                    this.$message('请选择项目类型')
                } else {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            this.$confirm('此操作将提交报名表单, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                customClass: '__custom-msg-box',
                                type: 'warning'
                            }).then(() => {
                                let handle = null
                                let msg = ''
                                const attachmentList = this.attachmentList
                                const form = this.form
                                const params = {
                                    matchId: this.$route.query.id,
                                    projectId: this.projectId,
                                    declareId: form.declareId,
                                    opus: {
                                        name: form.teacherName,
                                        cover: '',
                                        description: form.description
                                    },
                                    attachmentList: [],
                                    templateType: this.formType,
                                    steamTemplate: {
                                        schoolId: form.schoolId,
                                        address: form.address,
                                        teach: form.teach,
                                        age: form.age,
                                        sex: form.sex,
                                        phone: form.phone,
                                        idCode: form.idCode,
                                        qq: form.qq
                                    },
                                    steamResultList: form.corporationResultList
                                }
                                if (this.ifModify) {
                                    handle = actorAddModify
                                    msg = '修改成功'
                                    this.$set(params, 'id', this.detail.id)
                                    this.$set(params.opus, 'id', this.detail.opus.id)
                                    this.$set(params.steamTemplate, 'id', this.detail.steamTemplate.id)
                                } else {
                                    handle = matchOfflineActorAdd
                                    msg = '提交成功'
                                }
                                for (let j = 0; j < attachmentList.length; j++) {
                                    params.attachmentList.push(Object.assign(attachmentList[j], { sort: j.toString() }))
                                }
                                handle(params).then((res) => {
                                    if (res.data.code === 200) {
                                        this.$message({
                                            type: 'success',
                                            message: msg
                                        })
                                        this.$router.push({ path: '/contest/detail', query: { id: this.$route.query.id, type: 2 } })
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: res.data.msg
                                        })
                                    }
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消提交'
                                })
                            })
                        } else {
                            this.$message({
                                type: 'info',
                                message: '请填写完整的表单信息'
                            })
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/css/scss/enroll_form.scss';
    @import '~@/assets/css/scss/form.scss';
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/enroll_form.scss';
.upload-tip {
    line-height: 1.5;
}
</style>
