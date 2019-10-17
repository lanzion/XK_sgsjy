<template>
    <section class="enroll-form">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">

            <el-form-item label="社团名称" prop="orgName">
                <el-col :span="8">
                    <el-input v-model="form.orgName" placeholder="请输入社团名称，限10字以内" :maxlength="100"></el-input>
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

            <el-form-item label="社团成员" prop="corporationMemberList">
                <el-row class="member-title">
                    <el-col :span="2">身份</el-col>
                    <el-col :span="3">姓名</el-col>
                    <el-col :span="3">班次</el-col>
                    <el-col :span="4">联系电话</el-col>
                    <el-col :span="6">身份证号码</el-col>
                    <el-col :span="4">微信/QQ</el-col>
                    <!-- <el-col :span="2">操作</el-col> -->
                </el-row>
                <el-row class="member-list" v-for="(item, index) in form.corporationMemberList" :key="index">
                    <el-col :span="2">
                        <span v-if="index === 0">负责人</span>
                        <span v-else>成员{{index}}</span>
                    </el-col>
                    <el-col class="pd5" :span="3">
                        <!-- <el-input v-model="item.name" placeholder="姓名" :maxlength="50"></el-input> -->
                        <el-autocomplete
                            class="inline-input"
                            v-model="item.name"
                            :fetch-suggestions="querySearch"
                            placeholder="姓名"
                            :trigger-on-focus="false"
                            @select="handleSelect1(index, item.name)"
                        ></el-autocomplete>
                    </el-col>
                    <el-col class="pd5" :span="3">
                        <el-input v-model="item.shift" placeholder="班次"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="4">
                        <el-input v-model="item.phone" placeholder="联系电话"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="6">
                        <el-input v-model="item.idCode" placeholder="身份证号码" :maxlength="20"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="4">
                        <el-input v-model="item.qq" placeholder="微信/QQ" :maxlength="20"></el-input>
                    </el-col>
                    <!-- <el-col :span="2">
                        <i v-if="index != 0" class="handler icon-btn-delete" @click="delTeacher(index)"></i>
                    </el-col> -->
                </el-row>
                <!-- <el-row>
                    <el-col :span="22" class="add-member">
                        <button class="add-member-btn" @click.prevent="addTeacher"><i class="icon-btn-add"></i> 添加</button>
                    </el-col>
                </el-row> -->
            </el-form-item>

            <el-form-item label="辅导老师" prop="teacher">
                <el-row class="member-title">
                    <el-col :span="4">姓名</el-col>
                    <el-col :span="5">班次</el-col>
                    <el-col :span="5">联系电话</el-col>
                    <el-col :span="5">身份证号码</el-col>
                    <el-col :span="4">微信/QQ</el-col>
                    <el-col :span="1">操作</el-col>
                </el-row>
                <el-row class="member-list" v-for="(item, index) in form.teacher" :key="index">
                    <el-col class="pd5" :span="4">
                        <!-- <el-input v-model="item.name" placeholder="姓名" :maxlength="50"></el-input> -->
                        <el-autocomplete
                            class="inline-input"
                            v-model="item.name"
                            :fetch-suggestions="querySearch2"
                            placeholder="姓名"
                            :trigger-on-focus="false"
                            @select="handleSelect2(index, item.name)"
                        ></el-autocomplete>
                    </el-col>
                    <el-col class="pd5" :span="5">
                        <el-input v-model="item.shift" placeholder="班次" :maxlength="50"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="5">
                        <el-input v-model="item.phone" placeholder="联系电话"></el-input>
                    </el-col>
                     <el-col class="pd5" :span="5">
                        <el-input v-model="item.idCode" placeholder="身份证号码" :maxlength="20"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="4">
                        <el-input v-model="item.qq" placeholder="微信/QQ" :maxlength="20"></el-input>
                    </el-col>
                    <el-col :span="1">
                        <i v-if="index != 0" class="handler icon-btn-delete" @click="delTeacher(index)"></i>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" class="add-member">
                        <button class="add-member-btn" type="button" @click.prevent="addTeacher"><i class="icon-btn-add"></i> 添加</button>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="社团简介" prop="description">
                <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 6, maxRows: 100 }" placeholder="描述要求：
1、从规模和活动两个方面介绍；
2、规模要求：包括成立时间、现有人数、开展了多少次活动内容
3、活动要求：包括开展或参加了哪些活动"></el-input>
            </el-form-item>

            <el-form-item label="取得成果" prop="corporationResultList">
                <el-row class="member-title">
                    <el-col :span="2">序号</el-col>
                    <el-col :span="5">活动名称</el-col>
                    <el-col :span="5">获奖项目</el-col>
                    <el-col :span="5">获奖等级</el-col>
                    <el-col :span="5">参与学生</el-col>
                    <el-col :span="2">操作</el-col>
                </el-row>
                <el-row class="member-list" v-for="(item, index) in form.corporationResultList" :key="index">
                    <el-col :span="2">
                        <span>{{index + 1}}</span>
                    </el-col>
                    <el-col class="pd5" :span="5">
                        <el-input v-model="item.name" placeholder="活动名称"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="5">
                        <el-input v-model="item.projectName" placeholder="获奖项目"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="5">
                        <el-input v-model="item.grade" placeholder="获奖级别"></el-input>
                    </el-col>
                    <el-col class="pd5" :span="5">
                        <el-input v-model="item.student" placeholder="参与学生"></el-input>
                    </el-col>
                    <el-col :span="2">
                        <i v-if="index != 0" class="handler icon-btn-delete" @click="delResult(index)"></i>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" class="add-member">
                        <button class="add-member-btn" type="button" @click.prevent="addResult"><i class="icon-btn-add"></i> 添加</button>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="成果照片" prop="imgList">
                <el-row>
                    <el-checkbox-group v-model="form.imgList" v-show="false"></el-checkbox-group>
                    <el-upload action list-type="picture-card" :before-upload="UploadCover" :on-change="changeCover" :on-remove="changeCover" :on-error="doTips" :file-list="form.imgList" ref="upload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-row>
                <el-row style="color:#999;font-size: 12px;line-height: 2;">
                    上传要求：<br>
                    1、上传三张成果照片<br>
                    2、格式为jpg<br>
                    3、大小为100kb以内
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
                <button class="confirm-btn" type="button" @click.prevent="submit">确定</button>
                <button class="cancel-btn" type="button" @click.prevent="$router.push({ path: '/contest/detail', query: { id: $route.query.id, type: 2 } })">取消</button>
            </div>

        </el-form>
    </section>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { matchOfflineActorAdd, actorAddModify } from '@/service/matchEntrance.js'
    import { requestBaseStudentList, requestBaseTeacherList } from '@/service/common.js'
    import { baseInfo } from '@/assets/js/getUserInfo.js'

    export default {
        name: 'enrollForm2',
        mixins: [uploadFileSize],
        data() {
            const validateMember = (rule, value, callback) => {
                const regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/
                let correctPhone = true
                let flag = true
                for (let i = 0; i < value.length; i++) {
                    if (value[0].name.trim() === '' || value[0].idCode.trim() === '' || value[0].shift.trim() === '' || value[0].phone.trim() === '' || value[0].qq.trim() === '') {
                        flag = false
                        break
                    } else if (value[i].phone !== '' && !regular.test(value[i].phone)) {
                        correctPhone = false
                        break
                    }
                }
                if (!flag) {
                    callback(new Error('请输入完整的社团负责人信息'))
                } else if (!correctPhone) {
                    callback(new Error('请输入正确格式的电话号码'))
                } else {
                    callback()
                }
            }
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
            const validateTeacher = (rule, value, callback) => {
                const regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/
                let flag = true
                let correctPhone = true
                for (let i = 0; i < value.length; i++) {
                    if (value[i].name.trim() === '' || value[i].idCode.trim() === '' || value[i].shift.trim() === '' || value[i].phone.trim() === '' || value[i].qq.trim() === '') {
                        flag = false
                        break
                    } else if (!regular.test(value[i].phone)) {
                        correctPhone = false
                        break
                    }
                }
                if (!flag) {
                    callback(new Error('请输入完整的辅导老师信息'))
                } else if (!correctPhone) {
                    callback(new Error('请输入正确格式的电话号码'))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    orgName: '',
                    declareId: '',
                    schoolName: '',
                    schoolId: '',
                    address: '',
                    corporationMemberList: [
                        { name: baseInfo.baseInfo.name, idCode: baseInfo.baseInfo.certiNum, shift: baseInfo.baseInfo.className, phone: baseInfo.baseInfo.phone, qq: '', isAdmin: '1' },
                        { name: '', idCode: '', shift: '', phone: '', qq: '', isAdmin: '0' },
                        { name: '', idCode: '', shift: '', phone: '', qq: '', isAdmin: '0' }
                    ],
                    corporationResultList: [
                        { name: '', projectName: '', grade: '', student: '' },
                        { name: '', projectName: '', grade: '', student: '' }
                    ],
                    teacher: [
                        { name: '', idCode: '', shift: '', phone: '', qq: '' }
                    ],
                    description: '',
                    imgList: []
                },
                attachmentList: [],
                rules: {
                    orgName: [
                        { required: true, message: '请输入社团名称' }
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
                    description: [
                        { required: true, message: '请输入社团简介' }
                    ],
                    imgList: [
                        { required: true, message: '请上传图片', trigger: 'change', type: 'array' }
                    ],
                    corporationMemberList: [
                        { required: true, type: 'array', message: '请输入社团成员信息' },
                        { validator: validateMember, trigger: 'blur' }
                    ],
                    corporationResultList: [
                        { required: true, type: 'array', message: '请输入成果信息' },
                        { validator: validateResult, trigger: 'blur' }
                    ],
                    teacher: [
                        { required: true, type: 'array', message: '请输入辅导老师信息' },
                        { validator: validateTeacher, trigger: 'blur' }
                    ]
                },
                userType: this.$ls.get('userIdentity') === 'teacher' ? '1' : '0',
                ifModify: false,
                test: '',
                studentList: [], // 本校学生数据
                teacherList: [],  // 本校教师数据
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
            const base = this.$ls.get('baseInfo').baseInfo
            this.form.schoolName = base.schoolName
            this.form.schoolId = base.schoolId
            this.form.address = this.$ls.get('baseInfo').school.address
            this.setForm(this.detail)
            this.getStudentList()
            this.getTeacherList()
        },
        watch: {
            detail: {
                handler: function (val) {
                    this.setForm(val)
                },
                deep: true
            },
            'form.imgList': {
                handler: function (val) {
                    const DOMs = this.$refs.upload.$children
                    if (val.length >= 3) {
                        DOMs[DOMs.length - 1].$el.style.display = 'none'
                    } else {
                        DOMs[DOMs.length - 1].$el.style.display = ''
                    }
                },
                deep: true
            }
        },
        methods: {
            querySearch(queryString, cb) {
                const studentList = this.studentList
                const results = queryString ? studentList.filter(this.createFilter(queryString)) : studentList
                // 调用 callback 返回建议列表的数据
                cb(results)
            },
            querySearch2(queryString, cb) {
                const teacherList = this.teacherList
                const results = queryString ? teacherList.filter(this.createFilter(queryString)) : teacherList
                // 调用 callback 返回建议列表的数据
                cb(results)
            },
            createFilter(queryString) {
                return (student) => {
                    return (student.value.includes(queryString))
                }
            },
            handleSelect1(index, name) {
                const selectData = this.studentList.filter((x) => {
                    return x.value === name
                })[0]
                this.form.corporationMemberList[index].name = selectData.value
                this.form.corporationMemberList[index].shift = selectData.className
                this.form.corporationMemberList[index].phone = selectData.phone
            },
            handleSelect2(index, name) {
                const selectData = this.teacherList.filter((x) => {
                    return x.value === name
                })[0]
                this.form.teacher[index].name = selectData.value
                this.form.teacher[index].shift = selectData.className
                this.form.teacher[index].phone = selectData.phone
            },
            // 获取本校学生数据
            async getStudentList() {
                const params = {
                    auditStatus: 1,
                    lockStatus: '',
                    schoolId: this.$ls.get('baseInfo').baseInfo.schoolId
                }
                const res = await requestBaseStudentList(params, { pageSize: 99999, pageNum: 1 })
                if (res.data.code === 200) {
                    const _data = res.data.entity.resultData
                    const _dataArr = []
                    for (let i = 0; i < _data.length; i++) {
                        _dataArr.push({ value: _data[i].name, className: _data[i].className, phone: _data[i].phone })
                    }
                    this.studentList = _dataArr
                }
            },
            // 获取本校教师数据
            async getTeacherList() {
                const params = {
                    auditStatus: 1,
                    lockStatus: '',
                    schoolId: this.$ls.get('baseInfo').baseInfo.schoolId
                }
                const res = await requestBaseTeacherList(params, { pageSize: 99999, pageNum: 1 })
                if (res.data.code === 200) {
                    const _data = res.data.entity.resultData
                    const _dataArr = []
                    for (let i = 0; i < _data.length; i++) {
                        _dataArr.push({ value: _data[i].name, className: _data[i].className, phone: _data[i].phone })
                    }
                    this.teacherList = _dataArr
                }
            },
            // 修改时设置详情信息
            setForm(val) {
                if (Object.keys(val).length && this.formType === '113') {
                    const memberArr = []
                    const resultArr = []
                    const teacherArr = []
                    const memberList = val.corporationMemberList
                    const teacherList = val.corporationTeacherList
                    const resultList = val.corporationResultList
                    const imgList = val.pictureList
                    const attachmentList = val.attachmentList
                    this.ifModify = true
                    this.form.orgName = val.opus.name
                    this.form.declareId = val.declareId
                    this.form.schoolId = val.corporationTemplate.schoolId
                    this.form.address = val.corporationTemplate.address
                    for (let i = 0; i < memberList.length; i++) {
                        memberArr.push({ name: memberList[i].name, idCode: memberList[i].idCode, shift: memberList[i].shift, phone: memberList[i].phone, qq: memberList[i].qq, isAdmin: memberList[i].isAdmin, id: memberList[i].id })
                    }
                    this.form.corporationMemberList = memberArr
                    for (let i = 0; i < resultList.length; i++) {
                        resultArr.push({ name: resultList[i].name, projectName: resultList[i].projectName, grade: resultList[i].grade, student: resultList[i].student, id: resultList[i].id })
                    }
                    this.form.corporationResultList = resultArr
                    for (let i = 0; i < teacherList.length; i++) {
                        teacherArr.push({ name: teacherList[i].name, idCode: teacherList[i].idCode, shift: teacherList[i].shift, phone: teacherList[i].phone, qq: teacherList[i].qq, id: teacherList[i].id })
                    }
                    this.form.teacher = teacherArr
                    this.form.description = val.opus.description
                    this.form.imgList = imgList.map(x => ({
                        id: x.id,
                        name: x.name,
                        resourceId: x.resourceId,
                        url: x.resourceId
                    }))
                    this.attachmentList = attachmentList.map(x => ({
                        id: x.id,
                        name: x.name,
                        resourceId: x.resourceId,
                        url: x.resourceId
                    }))
                } else {
                    this.form.orgName = ''
                    this.form.declareId = ''
                    this.form.schoolName = ''
                    this.form.schoolId = ''
                    this.form.address = ''
                    this.form.corporationMemberList = [
                        { name: baseInfo.baseInfo.name, idCode: baseInfo.baseInfo.certiNum, shift: baseInfo.baseInfo.className, phone: baseInfo.baseInfo.phone, qq: '', isAdmin: '1' },
                        { name: '', idCode: '', shift: '', phone: '', qq: '', isAdmin: '0' },
                        { name: '', idCode: '', shift: '', phone: '', qq: '', isAdmin: '0' }
                    ]
                    this.form.corporationResultList = [
                        { name: '', projectName: '', grade: '', student: '' },
                        { name: '', projectName: '', grade: '', student: '' }
                    ]
                    this.form.teacher = [
                        { name: '', idCode: '', shift: '', phone: '', qq: '' }
                    ]
                    this.form.description = ''
                    this.form.imgList = []
                    this.attachmentList = []
                }
            },
            // 上传作品图片
            UploadCover(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.split('.').pop()
                const _this = this
                if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                    this.$message({
                        message: '请上传支持格式的图片'
                    })
                    return false
                } else if (fileSize >= this.imgStandardFileSize * 1024 * 1024) {
                    this.$message({
                        message: `文件大小不超过${this.imgStandardFileSize}M`
                    })
                    return false
                }
            },
            changeCover(file, fileList) {
                this.form.imgList = fileList
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
            // 添加/删除成员
            addTeacher() {
                this.form.teacher.push({ name: '', idCode: '', shift: '', phone: '', qq: '' })
            },
            delTeacher(index) {
                this.form.teacher.splice(index, 1)
            },
            // 添加、删除成果
            addResult() {
                this.form.corporationResultList.push({ name: '', projectName: '', grade: '', student: '' })
            },
            delResult(index) {
                this.form.corporationResultList.splice(index, 1)
            },
            doTips(err, file) {
                let message = '请求失败，请稍后再试'
                if (!err === 'http') {
                    message = err.error
                }
                this.$message({
                    message,
                    type: 'error'
                })
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
                                const imgList = this.form.imgList
                                const attachmentList = this.attachmentList
                                const params = {
                                    matchId: this.$route.query.id,
                                    projectId: this.projectId,
                                    declareId: this.form.declareId,
                                    opus: {
                                        name: this.form.orgName,
                                        cover: this.form.imgList[0].resourceId,
                                        description: this.form.description
                                    },
                                    pictureList: [],
                                    attachmentList: [],
                                    templateType: this.formType,
                                    corporationTemplate: {
                                        schoolId: this.form.schoolId,
                                        address: this.form.address
                                    },
                                    corporationMemberList: this.form.corporationMemberList,
                                    corporationTeacherList: this.form.teacher,
                                    corporationResultList: this.form.corporationResultList
                                }
                                if (this.ifModify) {
                                    handle = actorAddModify
                                    msg = '修改成功'
                                    this.$set(params, 'id', this.detail.id)
                                    this.$set(params.opus, 'id', this.detail.opus.id)
                                    this.$set(params.corporationTemplate, 'id', this.detail.corporationTemplate.id)
                                } else {
                                    handle = matchOfflineActorAdd
                                    msg = '提交成功'
                                }
                                params.pictureList = imgList.map((x, i) => ({
                                    ...x,
                                    url: x.resourceId,
                                    resourceId: x.resourceId,
                                    sort: i
                                }))
                                params.attachmentList = attachmentList.map((x, i) => ({
                                    ...x,
                                    url: x.resourceId,
                                    resourceId: x.resourceId,
                                    sort: i
                                }))
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
