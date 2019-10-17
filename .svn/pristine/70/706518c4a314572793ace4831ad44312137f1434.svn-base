<template>
	<section class="enroll-form">
		<el-form ref="form" :model="form" label-width="120px" :rules="rules">
			<el-form-item label="作品名称" prop="worksName">
				<el-col :span="8">
					<el-input v-model="form.worksName" placeholder="请输入作品名称，限16字以内" :maxlength="100"></el-input>
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
			<!-- <el-form-item label="辅导机构">
				<el-col :span="8">
					<el-input v-model="form.institution" placeholder="请输入辅导机构" :maxlength="100"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="机构地址">
				<el-col :span="8">
					<el-input v-model="form.address" placeholder="请输入机构地址" :maxlength="100"></el-input>
				</el-col>
			</el-form-item> -->
			<el-form-item label="项目成员" prop="declareMemberList">
				<el-row class="member-title">
					<el-col :span="2">身份</el-col>
					<el-col :span="2">姓名</el-col>
					<el-col :span="5">身份证号码</el-col>
					<el-col :span="3">学校</el-col>
					<el-col :span="3">电话</el-col>
					<el-col :span="2">家长姓名</el-col>
					<el-col :span="3">家长电话</el-col>
					<el-col :span="3">微信/QQ</el-col>
					<!-- <el-col :span="1">操作</el-col> -->
				</el-row>
				<el-row class="member-list" v-for="(item, index) in form.declareMemberList" :key="index">
					<el-col :span="2">
						<span v-if="index === 0">负责人</span>
						<span v-else>成员{{index}}</span>
					</el-col>
					<el-col class="pd5" :span="2">
						<!-- <el-input v-model="item.name" placeholder="姓名"></el-input> -->
                        <el-autocomplete
                            class="inline-input"
                            v-model="item.name"
                            :fetch-suggestions="querySearch"
                            placeholder="姓名"
                            :trigger-on-focus="false"
                            @select="handleSelect1(index, item.name)"
                        ></el-autocomplete>
					</el-col>
					<el-col class="pd5" :span="5">
						<el-input v-model="item.idCode" placeholder="身份证号码" :maxlength="20"></el-input>
					</el-col>
					<el-col class="pd5" :span="3">
						<el-input v-model="item.schoolName" placeholder="学校名称"></el-input>
					</el-col>
					<el-col class="pd5" :span="3">
						<el-input v-model="item.phone" placeholder="电话"></el-input>
					</el-col>
					<el-col class="pd5" :span="2">
						<el-input v-model="item.parentName" placeholder="家长姓名"></el-input>
					</el-col>
					<el-col class="pd5" :span="3">
						<el-input v-model="item.parentPhone" placeholder="家长电话"></el-input>
					</el-col>
					<el-col class="pd5" :span="3">
						<el-input v-model="item.qq" placeholder="微信/QQ" :maxlength="20"></el-input>
					</el-col>
					<!-- <el-col :span="1">
						<i v-if="index != 0" class="handler icon-btn-delete" @click="delTeacher(index)"></i>
					</el-col> -->
				</el-row>
				<!-- <el-row>
					<el-col :span="22" class="add-member">
						<button class="add-member-btn" type="button" @click="addTeacher"><i class="icon-btn-add"></i> 添加成员</button>
					</el-col>
				</el-row> -->
			</el-form-item>
			<el-form-item label="辅导老师" prop="teacher">
				<el-row class="member-title">
					<el-col :span="4">姓名</el-col>
					<el-col :span="5">身份证号码</el-col>
					<el-col :span="5">学校</el-col>
					<el-col :span="5">电话</el-col>
					<el-col :span="4">微信或QQ</el-col>
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
						<el-input v-model="item.idCode" placeholder="身份证号码" :maxlength="20"></el-input>
					</el-col>
					<el-col class="pd5" :span="5">
						<el-input v-model="item.schoolName" placeholder="学校名称" :maxlength="100"></el-input>
					</el-col>
					<el-col class="pd5" :span="5">
						<el-input v-model="item.phone" placeholder="电话"></el-input>
					</el-col>
					<el-col class="pd5" :span="4">
						<el-input v-model="item.qq" placeholder="微信或QQ" :maxlength="20"></el-input>
					</el-col>
                    <el-col :span="1">
                        <i v-if="index != 0" class="handler icon-btn-delete" @click="delTeacher(index)"></i>
                    </el-col>
				</el-row>
                <el-row>
                    <el-col :span="22" class="add-member">
                        <button class="add-member-btn" type="button" @click="addTeacher"><i class="icon-btn-add"></i> 添加老师</button>
                    </el-col>
                </el-row>
			</el-form-item>
			<el-form-item label="项目简介" prop="description">
				<el-input type="textarea" v-model="form.description" :autosize="{ minRows: 6, maxRows: 100 }" placeholder="描述要求：
                1、从摘要和创意与发明点两个方面介绍，字数限制在800字以内
                2、摘要要求：描述出运用什么原理、使用什么器材、针对哪类对象、做出什么功能的创意成果或发明作品
                3、创意与发明点要求：分别从科学原理、新颖独特、实用价值三个方面描述"></el-input>
			</el-form-item>
			<el-form-item label="创意与发明" prop="imgList">
				<el-row>
                    <el-checkbox-group v-model="form.imgList" v-show="false"></el-checkbox-group>
                    <el-upload action list-type="picture-card" :before-upload="UploadCover" :on-change="changeCover" :on-remove="changeCover" :on-error="doTips" :file-list="form.imgList" ref="upload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-row>
                <el-row style="color:#999;font-size: 12px;line-height: 1.5;">
                	上传要求：<br>
                	1、分别上传原理图、结构图、外观正面照各一张，共三张图片<br>
                    2、编程类作品请上传程序运行图片1-3张<br>
                    3、图片格式为jpg<br>
                    4、大小为100kb以内
                </el-row>
			</el-form-item>
			<el-form-item label="附件">
                <el-col :span="15">
                    <el-upload class="upload-demo" action :file-list="attachmentList" :on-change="changeFiles" :on-remove="changeFiles" :on-error="doTips" :before-upload="UploadFile">
                        <span class="upload-btn"><i class="icon-btn-add-circle"></i> 点击上传</span>
                        <p slot="tip" class="upload-tip">您可上传认为必要的相关文件（例如程序的截图），单个文件大小在50M以内。
编程类作品请上传程序和资源，程序文件为sb后缀的文件，其他类型程序文件请压缩为rar格式再上传</p>
                    </el-upload>
                </el-col>
            </el-form-item>
            <div class="btn-group">
            	<button class="confirm-btn" type="button" @click="submit">确定</button>
            	<button class="cancel-btn" type="button" @click="$router.push({ path: '/contest/detail', query: { id: $route.query.id, type: 2 } })">取消</button>
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
        name: 'enrollForm1',
        mixins: [uploadFileSize],
        data() {
            const validateMember = (rule, value, callback) => {
                const regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/
                let flag = true
                let correctPhone = true
                for (let i = 0; i < value.length; i++) {
                    if (value[0].name.trim() === '' || value[0].idCode.trim() === '' || value[0].schoolName.trim() === '' || value[0].phone.trim() === '' || value[0].parentName.trim() === '' || value[0].parentPhone.trim() === '' || value[0].qq.trim() === '') {
                        flag = false
                        break
                    } else if ((value[i].phone !== '' && !regular.test(value[i].phone)) || (value[i].parentPhone !== '' && !regular.test(value[i].parentPhone))) {
                        correctPhone = false
                        break
                    }
                }
                if (!flag) {
                    callback(new Error('请输入完整的负责人信息'))
                } else if (!correctPhone) {
                    callback(new Error('请输入正确格式的电话号码'))
                } else {
                    callback()
                }
            }
            const validateTeacher = (rule, value, callback) => {
                const regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/
                let flag = true
                let correctPhone = true
                for (let i = 0; i < value.length; i++) {
                    if (value[i].name.trim() === '' || value[i].idCode.trim() === '' || value[i].schoolName.trim() === '' || value[i].phone.trim() === '' || value[i].qq.trim() === '') {
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
                    worksName: '',
                    institution: '',
                    address: '',
                    declareId: '',
                    declareMemberList: [
                        { name: baseInfo.baseInfo.name, idCode: baseInfo.baseInfo.certiNum, schoolName: baseInfo.baseInfo.schoolName, phone: baseInfo.baseInfo.phone, parentName: '', parentPhone: '', qq: '', isAdmin: '1' },
                        { name: '', idCode: '', schoolName: '', phone: '', parentName: '', parentPhone: '', qq: '', isAdmin: '0' },
                        { name: '', idCode: '', schoolName: '', phone: '', parentName: '', parentPhone: '', qq: '', isAdmin: '0' }
                    ],
                    teacher: [
                        { name: '', idCode: '', schoolName: baseInfo.baseInfo.schoolName, phone: '', qq: '' }
                    ],
                    description: '',
                    imgList: []
                },
                attachmentList: [],
                rules: {
                    worksName: [
                        { required: true, message: '请输入作品名称' }
                    ],
                    declareId: [
                        { required: true, message: '请选择申报组别' }
                    ],
                    // institution: [
                    //     { required: true, message: '请输入辅导机构' }
                    // ],
                    // address: [
                    //     { required: true, message: '请输入机构地址' }
                    // ],
                    description: [
                        { required: true, message: '请输入项目简介' }
                    ],
                    imgList: [
                        { required: true, message: '请上传图片', trigger: 'change', type: 'array' }
                    ],
                    declareMemberList: [
                        { required: true, type: 'array', message: '请输入成员信息' },
                        { validator: validateMember, trigger: 'blur' }
                    ],
                    teacher: [
                        { required: true, type: 'array', message: '请输入辅导老师信息' },
                        { validator: validateTeacher, trigger: 'blur' }
                    ]
                },
                userType: this.$ls.get('userIdentity') === 'teacher' ? '1' : '0',
                ifModify: false
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
                this.form.declareMemberList[index].name = selectData.value
                this.form.declareMemberList[index].phone = selectData.phone
                this.form.declareMemberList[index].schoolName = baseInfo.baseInfo.schoolName
            },
            handleSelect2(index, name) {
                const selectData = this.teacherList.filter((x) => {
                    return x.value === name
                })[0]
                this.form.teacher[index].name = selectData.value
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
                        _dataArr.push({ value: _data[i].name, phone: _data[i].phone })
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
                        _dataArr.push({ value: _data[i].name, phone: _data[i].phone })
                    }
                    this.teacherList = _dataArr
                }
            },
            setForm(val) {
                if (Object.keys(val).length && this.formType === '111') {
                    const memberArr = []
                    const teacherArr = []
                    const memberList = val.declareMemberList
                    const teacherList = val.declareTeacherList
                    const imgList = val.pictureList
                    const attachmentList = val.attachmentList
                    this.ifModify = true
                    this.form.worksName = val.opus.name
                    this.form.institution = val.declareTemplate.institution
                    this.form.address = val.declareTemplate.address
                    this.form.declareId = val.declareId
                    for (let i = 0; i < memberList.length; i++) {
                        memberArr.push({ name: memberList[i].name, idCode: memberList[i].idCode, schoolName: memberList[i].schoolName, phone: memberList[i].phone, parentName: memberList[i].parentName, parentPhone: memberList[i].parentPhone, qq: memberList[i].qq, isAdmin: memberList[i].isAdmin, id: memberList[i].id })
                    }
                    this.form.declareMemberList = memberArr
                    for (let l = 0; l < teacherList.length; l++) {
                        teacherArr.push({ name: teacherList[l].name, idCode: teacherList[l].idCode, schoolName: teacherList[l].schoolName, phone: teacherList[l].phone, qq: memberList[l].qq, id: memberList[l].id })
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
                    this.form.worksName = ''
                    this.form.institution = ''
                    this.form.address = ''
                    this.form.declareId = ''
                    this.form.declareMemberList = [
                        { name: baseInfo.baseInfo.name, idCode: baseInfo.baseInfo.certiNum, schoolName: baseInfo.baseInfo.schoolName, phone: baseInfo.baseInfo.phone, parentName: '', parentPhone: '', qq: '', isAdmin: '1' },
                        { name: '', idCode: '', schoolName: '', phone: '', parentName: '', parentPhone: '', qq: '', isAdmin: '0' },
                        { name: '', idCode: '', schoolName: '', phone: '', parentName: '', parentPhone: '', qq: '', isAdmin: '0' }
                    ]
                    this.form.teacher = [
                        { name: '', idCode: '', schoolName: baseInfo.baseInfo.schoolName, phone: '', qq: '' }
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
            // 添加成员
            addTeacher() {
                this.form.teacher.push({ name: '', idCode: '', schoolName: baseInfo.baseInfo.schoolName, phone: '', qq: '' })
            },
            delTeacher(index) {
                this.form.teacher.splice(index, 1)
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
                                type: 'warning',
                                customClass: '__custom-msg-box'
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
                                        name: this.form.worksName,
                                        cover: this.form.imgList[0].resourceId,
                                        description: this.form.description
                                    },
                                    pictureList: [],
                                    attachmentList: [],
                                    templateType: this.formType,
                                    declareTemplate: {
                                        institution: this.form.institution,
                                        address: this.form.address
                                    },
                                    declareMemberList: this.form.declareMemberList,
                                    declareTeacherList: this.form.teacher
                                }
                                if (this.ifModify) {
                                    handle = actorAddModify
                                    msg = '修改成功'
                                    this.$set(params, 'id', this.detail.id)
                                    this.$set(params.opus, 'id', this.detail.opus.id)
                                    this.$set(params.declareTemplate, 'id', this.detail.declareTemplate.id)
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
