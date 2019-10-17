<template>
    <div class="container register">
        <el-breadcrumb class="breadcrumbs" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>注册</el-breadcrumb-item>
        </el-breadcrumb>
        <section class="register-box">
            <div class="identity-select-box clearfix">
                <label v-for="(item, key, index) in identities" class="identity-select-item" :class="{checked: key==identity}"
                             @click="identity=key;resetForm(key)">
                    <i :class="['icon-form-' + item.name]"></i>{{item.txt}}
                </label>
            </div>
            <el-form ref="studentForm" class="register-form-box" label-position="right" label-width="130px" :model="studentForm"
                             :rules="rules" v-if="identity==0">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="studentForm.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="studentForm.pwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePwd">
                    <el-input type="password" v-model="studentForm.rePwd" placeholder="请再次确认密码"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="userName">
                    <el-input v-model="studentForm.userName" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idCode">
                    <el-input v-model="studentForm.idCode" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="学籍号" prop="studentCode">
                    <el-input v-model="studentForm.studentCode" placeholder="请输入学籍号"></el-input>
                </el-form-item>
                <el-form-item label="所在学校" prop="schoolId">
                    <xk-region-school-select @checkedItem="changeSchool" :checkedItem="studentForm.schoolId" ref="studentRegion"></xk-region-school-select>
                </el-form-item>
                <el-form-item label="所在班级" prop="classId">
                    <el-select v-model="checkClasz" filterable placeholder="请选择所在班级" style="width:100%" @change="changeClasz">
                        <el-option v-for="(item, index) in claszList" :key="item.id" :label="`${translateFun(item.gradeId, gradeList, {key: 'id'})} - ${item.className}`" :value="item"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form ref="teacherForm" class="register-form-box" label-position="right" label-width="130px" :model="teacherForm"
                             :rules="rules" v-else-if="identity==1">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="teacherForm.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="teacherForm.pwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePwd">
                    <el-input type="password" v-model="teacherForm.rePwd" placeholder="请再次确认密码"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="userName">
                    <el-input v-model="teacherForm.userName" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idCode" required>
                    <el-input v-model="teacherForm.idCode" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="所在学校" prop="schoolId">
                    <xk-region-school-select @checkedItem="changeSchool" :checkedItem="teacherForm.schoolId" ref="teacherRegion"></xk-region-school-select>
                </el-form-item>
            </el-form>
            <el-form ref="enterpriseForm" class="register-form-box" label-position="right" label-width="130px"
                             :model="enterpriseForm" :rules="rules" v-else-if="identity==4">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="enterpriseForm.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="enterpriseForm.pwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePwd">
                    <el-input type="password" v-model="enterpriseForm.rePwd" placeholder="请再次确认密码"></el-input>
                </el-form-item>
                <el-form-item label="企业全称" prop="userName">
                    <el-input v-model="enterpriseForm.userName" placeholder="请输入企业全称"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="idCode">
                    <el-input v-model="enterpriseForm.idCode" placeholder="请输入统一社会信用代码"></el-input>
                </el-form-item>
                <el-form-item label="所在区域" prop="region">
                    <xk-region-pub-select @region="changeRegion" ref="enterpriseRegion"></xk-region-pub-select>
                </el-form-item>
                <el-form-item label="三证合一证件" prop="face" class="clearfix">
                    <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadEnterpriseFace">
                        <img v-if="enterpriseForm.face != '' && enterpriseForm.face != null" :src="getFileUrl(enterpriseForm.face)" class="cover">
                        <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        <el-input v-model="enterpriseForm.face" type="hidden"></el-input>
                    </el-upload>
                    <p class="cover-upload-inst fl">仅支持JPG、GIF、PNG、JPEG格式<br>文件小于{{ imgStandardFileSize }}M</p>
                </el-form-item>
            </el-form>
            <el-form ref="investorForm" class="register-form-box" label-position="right" label-width="130px"
                             :model="investorForm" :rules="rules" v-else-if="identity==2">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="investorForm.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="investorForm.pwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePwd">
                    <el-input type="password" v-model="investorForm.rePwd" placeholder="请再次确认密码"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="investorForm.userName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="证件号码" prop="idCode">
                    <el-input v-model="investorForm.idCode" placeholder="请输入证件号码"></el-input>
                </el-form-item>
                <el-form-item label="所在区域" prop="region">
                    <xk-region-pub-select @region="changeRegion" ref="investorRegion"></xk-region-pub-select>
                </el-form-item>
                <el-form-item label="证件照片" prop="" required>
                    <el-form-item class="cover-upload-box" prop="positivePic">
                        <figure class="clearfix">
                            <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadInvestorPositive">
                                <img v-if="investorForm.positivePic != '' && investorForm.positivePic != null" :src="getFileUrl(investorForm.positivePic)" class="cover">
                                <template v-else>
                                    <i class="el-icon-plus cover-uploader-icon"></i>
                                    <span class="el-upload__text">正面</span>
                                </template>
                                <el-input v-model="investorForm.positivePic" type="hidden"></el-input>
                            </el-upload>
                            <p class="cover-upload-inst fl">仅支持JPG、GIF、PNG、JPEG格式<br>文件小于{{ imgStandardFileSize }}M</p>
                        </figure>
                    </el-form-item>
                    <el-form-item class="cover-upload-box" prop="reversePic">
                        <figure class="clearfix">
                            <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadInvestorReverse">
                                <img v-if="investorForm.reversePic != '' && investorForm.reversePic != null" :src="getFileUrl(investorForm.reversePic)" class="cover">
                                <template v-else>
                                    <i class="el-icon-plus cover-uploader-icon"></i>
                                    <span class="el-upload__text">反面</span>
                                </template>
                                <el-input v-model="investorForm.reversePic" type="hidden"></el-input>
                            </el-upload>
                            <p class="cover-upload-inst fl">仅支持JPG、GIF、PNG、JPEG格式<br>文件小于{{ imgStandardFileSize }}M</p>
                        </figure>
                    </el-form-item>
                </el-form-item>
            </el-form>
            <el-form ref="investOrgForm" class="register-form-box" label-position="right" label-width="130px" :model="investOrgForm" :rules="rules" v-else-if="identity==3">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="investOrgForm.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="investOrgForm.pwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePwd">
                    <el-input type="password" v-model="investOrgForm.rePwd" placeholder="请再次确认密码"></el-input>
                </el-form-item>
                <el-form-item label="机构全称" prop="userName">
                    <el-input v-model="investOrgForm.userName" placeholder="请输入机构全称"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="idCode">
                    <el-input v-model="investOrgForm.idCode" placeholder="请输入统一社会信用代码"></el-input>
                </el-form-item>
                <el-form-item label="所在区域" prop="region">
                    <xk-region-pub-select @region="changeRegion" ref="investOrgRegion"></xk-region-pub-select>
                </el-form-item>
                <el-form-item label="三证合一证件" prop="face" class="clearfix">
                    <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadInvestOrgFace">
                        <img v-if="investOrgForm.face != '' && investOrgForm.face != null" :src="getFileUrl(investOrgForm.face)" class="cover">
                        <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        <el-input v-model="investOrgForm.face" type="hidden"></el-input>
                    </el-upload>
                    <p class="cover-upload-inst fl">仅支持JPG、GIF、PNG、JPEG格式<br>文件小于{{ imgStandardFileSize }}M</p>
                </el-form-item>
            </el-form>
            <el-form ref="multForm" class="register-form-box" label-position="right" label-width="130px" :model="multForm" :rules="rules" v-else-if="identity==11">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="multForm.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="multForm.pwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePwd">
                    <el-input type="password" v-model="multForm.rePwd" placeholder="请再次确认密码"></el-input>
                </el-form-item>
                <el-form-item label="空间全称" prop="userName">
                    <el-input v-model="multForm.userName" placeholder="请输入空间全称"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="idCode">
                    <el-input v-model="multForm.idCode" placeholder="请输入统一社会信用代码"></el-input>
                </el-form-item>
                <el-form-item label="所在区域" prop="region">
                    <xk-region-pub-select @region="changeRegion" ref="multRegion"></xk-region-pub-select>
                </el-form-item>
                <el-form-item label="三证合一证件" prop="face" class="clearfix">
                    <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadMultFace">
                        <img v-if="multForm.face != '' && multForm.face != null" :src="getFileUrl(multForm.face)" class="cover">
                        <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        <el-input v-model="multForm.face" type="hidden"></el-input>
                    </el-upload>
                    <p class="cover-upload-inst fl">仅支持JPG、GIF、PNG、JPEG格式<br>文件小于{{ imgStandardFileSize }}M</p>
                </el-form-item>
            </el-form>
            <el-form ref="form" class="register-form-box" label-position="right" label-width="130px">
                <el-form-item label="" prop="isAgree">
                    <el-checkbox v-model="isAgree" class="agree-box"></el-checkbox>
                    <router-link target="_blank" to="/protocol">您已阅读并同意<span class="provision">师生科学素质展示平台服务条款</span></router-link>
                </el-form-item>
                <el-form-item>
                    <button class="i-button__big" type="button" @click.prevent="register">立即注册</button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    // import region from '@/components/common/select/region_pub_select.vue'
    // import regionSchool from '@/components/common/select/region-school_select.vue'
    import * as XHR from '@/service/common.js'
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { mapActions } from 'vuex'

    export default {
        name: 'register',
        mixins: [uploadFileSize],
        // components: {
        //     'v-region-select': region,
        //     'v-region-school-select': regionSchool
        // },
        data() {
            const validateAccount = (rule, value, callback) => {
                const regular = /^[a-zA-Z0-9_]{6,18}$/
                if (value === '') {
                    callback(new Error('请输入用户名'))
                } else if (!regular.test(value)) {
                    callback(new Error('用户名由 6 到 18 位的英文字母、数字、下划线组成'))
                } else {
                    callback()
                }
            }
            const validateRePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次确认密码'))
                } else if (value !== this[`${this.identities[this.identity].name}Form`].pwd) {
                    callback(new Error('两次输入密码不一致！'))
                } else {
                    callback()
                }
            }
            const validateUserName = (rule, value, callback) => {
                const regular = /(^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$)|(^[a-zA-Z]+((\.|\s|·|-|=)[a-zA-Z]+)*$)/
                let label
                const identity = Number(this.identity)
                switch (identity) {
                    case 3:
                        label = '投资机构全称'
                        break
                    case 4:
                        label = '企业全称'
                        break
                    case 11:
                        label = '众创空间全称'
                        break
                    default:
                        label = '真实姓名'
                        break
                }
                if (value === '') {
                    callback(new Error(`请输入${label}`))
                } else if (!regular.test(value)) {
                    callback(new Error(`您输入的${label}格式不正确`))
                } else {
                    callback()
                }
            }
            const validateIDCode = (rule, value, callback) => {
                const regular = /(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)/
                const label = '身份证号'
                const identity = Number(this.identity)
                const isOrg = (identity === 3 || identity === 4 || identity === 11)

                // if (isOrg) {
                //     regular = /^(([15][1-39])|9[1-3]|Y1)\d{6}[^_IOZSVa-z\W]{10}$/
                //     label = '统一社会信用代码'
                // } else {
                //     regular = /(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)/
                //     label = '身份证号'
                // }
                // if (value === '') {
                //     callback(new Error(`请输入${label}`))
                // } else if (!regular.test(value)) {
                if (value.length && !regular.test(value)) {
                    callback(new Error(`您输入的${label}格式不正确`))
                } else if (isOrg) {
                    if (value === '') {
                        callback(new Error(`请输入${label}`))
                        return
                    }
                    const base = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y']
                    const weight = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]
                    const codes = value.substr(0, 17).split('')
                    const lastCode = value.substr(17, 1)
                    let result = 0
                    codes.forEach((x, i) => {
                        result += base.findIndex(b => b === x) * weight[i]
                    })
                    const index = 31 - result % 31
                    if (base[index] === lastCode) {
                        callback()
                    } else {
                        callback(new Error(`您输入的${label}格式不正确`))
                    }
                } else {
                    callback()
                }
            }
            const validateRegion = (rule, value, callback) => {
                const form = this[`${this.identities[this.identity].name}Form`]
                const val = [form.provinceId, form.cityId, form.areaId].filter(x => x)
                if (!val.length) {
                    callback(new Error('请选择所在地区'))
                } else {
                    callback()
                }
            }
            const validatePwd = (rule, value, callback) => {
                const regular = /^(?=.*[a-z|A-Z])(?=.*\d)[^]{8,16}$/
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else if (!regular.test(value)) {
                    callback(new Error('密码必须由 8 到 16 位的字母、数字组成'))
                } else {
                    callback()
                }
            }
            const validateStudentCode = (rule, value, callback) => {
                const regular1 = /(^(G|J|L)[0-9]{15}$)|(^(G|J|L)[0-9]{18}$)|(^(G|J|L)[0-9]{17}([0-9]|X|x)$)/
                const regular2 = /^[A-Za-z0-9]{1}[0-9]{15}$/
                if (value === '') {
                    callback(new Error('请输入的学籍号'))
                } else if (!regular1.test(value) && !regular2.test(value)) {
                    callback(new Error('您输入的学籍号格式不正确'))
                } else {
                    callback()
                }
            }
            return {
                loginInfo: this.$ls.get('loginInfo'),
                gradeList: [],
                identity: 0,
                studentForm: {
                    account: '',
                    pwd: '',
                    rePwd: '',
                    userName: '',
                    idCode: '',
                    studentCode: '',
                    schoolId: '',
                    gradeId: '',
                    classId: ''
                },
                teacherForm: {
                    account: '',
                    pwd: '',
                    rePwd: '',
                    userName: '',
                    idCode: '',
                    schoolId: ''
                },
                enterpriseForm: {
                    account: '',
                    pwd: '',
                    rePwd: '',
                    userName: '',
                    idCode: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    face: null
                },
                investorForm: {
                    account: '',
                    pwd: '',
                    rePwd: '',
                    userName: '',
                    idCode: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    positivePic: null,
                    reversePic: null
                },
                investOrgForm: {
                    account: '',
                    pwd: '',
                    rePwd: '',
                    userName: '',
                    idCode: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    face: null
                },
                multForm: {
                    account: '',
                    pwd: '',
                    rePwd: '',
                    userName: '',
                    idCode: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    face: null
                },
                checkClasz: null,
                rules: {
                    account: [
                        { validator: validateAccount, required: true, trigger: 'blur' }
                    ],
                    pwd: [
                        { validator: validatePwd, required: true, trigger: 'blur' }
                    ],
                    rePwd: [
                        { validator: validateRePwd, required: true, trigger: 'blur' }
                    ],
                    userName: [
                        { validator: validateUserName, required: true, trigger: 'blur' }
                    ],
                    idCode: [
                        { validator: validateIDCode, trigger: 'blur' }
                    ],
                    studentCode: [
                        { required: true, message: '请输入学籍号' },
                        { validator: validateStudentCode, trigger: 'blur' }
                    ],
                    schoolId: [
                        { required: true, message: '请选择所在学校', trigger: 'submit' }
                    ],
                    classId: [
                        { message: '请选择所在班级', trigger: 'change' }
                    ],
                    region: [
                        { validator: validateRegion, required: true, trigger: 'change' }
                    ],
                    positivePic: [
                        { required: true, message: '请上传证件正面照', trigger: 'change' }
                    ],
                    reversePic: [
                        { required: true, message: '请上传证件反面照', trigger: 'change' }
                    ],
                    face: [
                        { required: true, message: '请上传三证合一证件', trigger: 'change' }
                    ]
                },
                identities: {
                    0: { name: 'student', txt: '学生' },
                    1: { name: 'teacher', txt: '教师' },
                    // 4: { name: 'enterprise', txt: '企业' },
                    // 2: { name: 'investor', txt: '投资人' },
                    // 3: { name: 'investOrg', txt: '投资机构' },
                    // 11: { name: 'mult', txt: '众创空间' }
                },
                schoolForm: {
                    provinceId: null,
                    cityId: null,
                    areaId: null,
                    schoolName: ''
                },
                schoolList: [],
                claszList: [],
                isAgree: false,
                spVisible: false
            }
        },
        mounted() {
            this.getDictComb('primarySchool, middleSchool, highSchool').then((res) => {
                this.gradeList = res.dicList
            })
        },
        watch: {
            loginInfo: {
                handler: function (val) {
                    if (val) {
                        this.$router.replace({ path: '/' })
                    }
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb',
                getPermission: 'getPermission'
            }),
            // 上传
            // 众创空间营业照
            UploadMultFace(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                    const _this = this
                    if (fileSize < (this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.addFiles(file)
                        uploader.off('uploadSuccess').on('uploadSuccess', function (fileMsg, res) {
                            if (res.code === 200) {
                                _this.multForm.face = res.appendInfo.resourceId
                            }
                        })
                    } else {
                        uploader.cancelFile(file)
                    }
                } else {
                    this.$message({
                        message: '请上传支持格式的图片',
                    })
                }
            },
            // 投资机构营业照
            UploadInvestOrgFace(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                    const _this = this
                    if (fileSize < (this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.addFiles(file)
                        uploader.off('uploadSuccess').on('uploadSuccess', function (fileMsg, res) {
                            if (res.code === 200) {
                                _this.investOrgForm.face = res.appendInfo.resourceId
                            }
                        })
                    } else {
                        uploader.cancelFile(file)
                    }
                } else {
                    this.$message({
                        message: '请上传支持格式的图片',
                    })
                }
            },
            // 企业三证合一证件
            UploadEnterpriseFace(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                    const _this = this
                    if (fileSize < (this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.addFiles(file)
                        uploader.off('uploadSuccess').on('uploadSuccess', function (fileMsg, res) {
                            if (res.code === 200) {
                                _this.enterpriseForm.face = res.appendInfo.resourceId
                            }
                        })
                    } else {
                        uploader.cancelFile(file)
                    }
                } else {
                    this.$message({
                        message: '请上传支持格式的图片',
                    })
                }
            },
            // 投资人证件照正面
            UploadInvestorPositive(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                    const _this = this
                    if (fileSize < (this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.addFiles(file)
                        uploader.off('uploadSuccess').on('uploadSuccess', function (fileMsg, res) {
                            if (res.code === 200) {
                                _this.investorForm.positivePic = res.appendInfo.resourceId
                            }
                        })
                    } else {
                        uploader.cancelFile(file)
                    }
                } else {
                    this.$message({
                        message: '请上传支持格式的图片',
                    })
                }
            },
            // 投资人证件照反面
            UploadInvestorReverse(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                    const _this = this
                    if (fileSize < (this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.addFiles(file)
                        uploader.off('uploadSuccess').on('uploadSuccess', function (fileMsg, res) {
                            if (res.code === 200) {
                                _this.investorForm.reversePic = res.appendInfo.resourceId
                            }
                        })
                    } else {
                        uploader.cancelFile(file)
                    }
                } else {
                    this.$message({
                        message: '请上传支持格式的图片',
                    })
                }
            },
            // 地区改变至区县级请求学校列表
            changeRegion: function (item) {
                if (item.length) {
                    const _region = {}
                    const [_province, _city, _area] = item
                    _region.provinceId = _province
                    _region.cityId = _city
                    _region.areaId = _area

                    switch (this.identity) {
                        case 0:
                        case 1:
                            this.$set(this.$data, 'schoolForm', _region)
                            this.searchSchool()
                            break
                        default:
                            Object.assign(this[`${this.identities[this.identity].name}Form`], _region)
                            break
                    }
                }
            },
            // 获取学校列表
            searchSchool: function () {
                XHR.requestSchoolList(this.schoolForm).then((response) => {
                    this.schoolList = response.data.appendInfo.comboxList
                })
            },
            changeSchool: function (item) {
                this.$set(this.$data[`${this.identities[this.identity].name}Form`], 'schoolId', item.id)
                if (this.identity === 0) {
                    this.checkClasz = {}
                    this.getClasz()
                }
            },
            changeClasz: function (item) {
                this.$set(this.$data.studentForm, 'classId', item.id)
                this.$set(this.$data.studentForm, 'gradeId', item.gradeId)
            },
            // 获取班级列表
            getClasz: function () {
                XHR.requestClaszList({ schoolId: this.studentForm.schoolId }).then((response) => {
                    if (response.data.code === 200) {
                        this.claszList = response.data.entity
                    }
                })
            },
            // 注册
            register: function () {
                const _identity = this.identities[this.identity].name
                this.$refs[`${_identity}Form`].validate((valid) => {
                    if (valid) {
                        if (this.isAgree) {
                            if (this.$route.query.unionid === undefined) {
                                const _param = Object.assign({}, this[`${_identity}Form`], { identity: this.identity })
                                delete _param.rePwd
                                XHR[`${_identity}Register`](_param).then((response) => {
                                    if (response.data.code === 200) {
                                        this.$message({
                                            message: response.data.msg,
                                            type: 'success'
                                        })
                                        setTimeout(() => {
                                            this.$router.push('/')
                                        }, 1500)
                                    } else {
                                        this.$message.error({
                                            message: response.data.msg
                                        })
                                    }
                                })
                            } else {
                                const _param = Object.assign({}, this[`${_identity}Form`], { identity: this.identity, unionid: this.$route.query.unionid, bindType: this.$route.query.bindType })
                                delete _param.rePwd
                                XHR[`${_identity}RegisterBind`](_param).then((response) => {
                                    if (response.data.code === 200) {
                                        this.$message({
                                            message: response.data.msg,
                                            type: 'success'
                                        })
                                        setTimeout(() => {
                                            this.$router.push('/')
                                        }, 1500)
                                    } else {
                                        this.$message.error({
                                            message: response.data.msg
                                        })
                                    }
                                })
                            }
                        } else {
                            this.$message({
                                message: '请先同意服务条款',
                                type: 'warning'
                            })
                        }
                    } else {
                        return false
                    }
                })
            },
            // 重置表单
            resetForm: function (identity) {
                const timer = setTimeout(() => {
                    const refRegion = this.$refs[`${this.identities[identity].name}Region`]
                    if (refRegion) {
                        refRegion.checkedItems = []
                        // if (refRegion.$refs.region) {
                        //     refRegion.itemList = []
                        //     refRegion.schoolForm.schoolName = ''
                        //     refRegion.$refs.region.checkedItems = []
                        // }
                    }
                    this.$refs[`${this.identities[identity].name}Form`].resetFields()
                    clearTimeout(timer)
                }, 100)
            }
        }
    }
</script>
<style lang='scss'>
@import '~@/assets/css/scss/form.scss';
    .register-form-box {
        .el-form-item__error {
            top: 0;
            left: 100%;
            white-space: nowrap;
            padding: 11px 12px;

            &:before {
                content: '\e911';
                margin-right: 4px;
                font-family: 'icomoon';
            }
        }

        .el-form-item__content {
            margin-right: 70px;

            .el-form-item__content {
                width: 100%;
            }
        }

        .agree-box .el-checkbox__label {
            font-size: 12px;
        }
    }
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
    .container {
        margin: 0 auto 100px;
    }

    .register-box {
        padding: 50px 0 120px;
        background-color: #fff;
    }

    .register-form-box {
        width: 514px;
        margin: 0 auto;

        .i-button__big {
            width: 100%;
            height: 44px;
            border: none;
            background-color: nth($default-color, 1);
            color: #fff;
            border-radius: $button-radiu;
            font-size: 18px;
            &:hover {
                opacity: 0.75;
            }
        }

        .cover-upload-box + .cover-upload-box {
            margin-top: 10px;
        }

        .cover-uploader {
            position: relative;
            width: 100px;
            height: 100px;
            border: 1px dashed #67b8f6;
            border-radius: 3px;
            background-color: #f5fafe;
            cursor: pointer;
            text-align: center;
            overflow: hidden;

            &:hover {
                border-color: nth($default-color, 1);
            }

            .cover-uploader-icon {
                font-size: 18px;
                color: #8c939d;
                line-height: 100px;
                text-align: center;
            }

            .el-upload__text {
                display: block;
                margin-top: -45px;
                color: #999;
            }

            .cover {
                width: 100%;
                height: 100%;
            }
        }

        .cover-upload-inst {
            margin: 50px 0 0 10px;
            font-size: 12px;
            line-height: 2;
            color: #999;
        }

        .provision {
            color: nth($default-color, 1);
        }
    }

    .identity-select-box {
        margin: 0 auto 64px;
        text-align: center;

        .identity-select-item {
            $h: 54px;
            position: relative;
            /* float: left; */
            display: inline-block;
            width: 250px;
            height: $h;
            line-height: $h;
            box-sizing: border-box;
            font-size: 18px;
            background-color: #dfdfdf;
            text-align: center;
            cursor: pointer;

            & + .identity-select-item {
                border-left: 1px solid #eee;
            }

            &:first-child {
                border-top-left-radius: $box-radiu;
                border-bottom-left-radius: $box-radiu;
            }

            &:last-child {
                border-top-right-radius: $box-radiu;
                border-bottom-right-radius: $box-radiu;
            }
        }
        label.checked {
            border-width: 0;
            background-color: nth($default-color, 1);
            color: #fff;

            [class^="icon-"], [class*=" icon-"] {
                color: #fff;
            }

            &::after {
                position: absolute;
                content: '';
                top: 100%;
                left: 50%;
                width: 0;
                height: 0;
                margin-left: -10px;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 12px solid nth($default-color, 1);
            }
        }
    }
</style>
