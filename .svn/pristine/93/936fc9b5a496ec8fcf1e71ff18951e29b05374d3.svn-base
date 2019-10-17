<template>
    <el-dialog :visible.sync="visible.show" lock-scroll class="edit-person">
        <header class="dialog-head">编辑资料</header>
        <el-form ref="studentForm" class="register-form-box" label-position="right" label-width="100px" :model="studentForm"
                             :rules="rules" v-if="identity==0">
            <el-form-item label="用户名" prop="account">
                <el-input v-model="studentForm.account" placeholder="请输入用户名" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="studentForm.pwd" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePwd">
                <el-input type="password" v-model="studentForm.rePwd" placeholder="请再次确认密码"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
                <el-input v-model="studentForm.name" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCode">
                <el-input v-model="studentForm.idCode" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item label="学籍号" prop="studentCode">
                <el-input v-model="studentForm.studentCode" disabled></el-input>
            </el-form-item>
            <el-form-item label="所在学校" prop="schoolId">
                <v-region-school-select @checkedItem="changeSchool" :defaultItems.sync="defaultItems" :checkedItem="studentForm.schoolId" ref="studentRegion"></v-region-school-select>
            </el-form-item>
            <el-form-item label="所在班级" prop="classId">
                <el-select v-model="checkClasz" filterable placeholder="请选择所在班级" style="width:100%" @change="changeClasz">
                    <el-option v-for="(item, index) in claszList" :key="item.id" :label="`${translateFun(item.gradeId, gradeList, {key: 'id'})} - ${item.className}`" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form ref="teacherForm" class="register-form-box" label-position="right" label-width="100px" :model="teacherForm"
                         :rules="rules" v-else-if="identity==1">
            <el-form-item label="用户名" prop="account">
                <el-input v-model="teacherForm.account" placeholder="请输入用户名" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="teacherForm.pwd" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePwd">
                <el-input type="password" v-model="teacherForm.rePwd" placeholder="请再次确认密码"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
                <el-input v-model="teacherForm.name" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCode">
                <el-input v-model="teacherForm.idCode" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item label="所在学校" prop="schoolId">
                <v-region-school-select @checkedItem="changeSchool" :defaultItems.sync="defaultItems" :checkedItem="teacherForm.schoolId" ref="teacherRegion"></v-region-school-select>
            </el-form-item>
        </el-form>
        <div class="btn-box">
            <button class="submit-btn" type="button" @click.prevent="register">提交审核</button>
        </div>
    </el-dialog>
</template>

<script>
    import regionSchool from './../region-school-select/main.vue'
    import * as XHR from './../../service/common.js'
    import { mapActions } from 'vuex'

    export default {
        name: 'xk-edit-person-data',
        components: {
            'v-region-school-select': regionSchool
        },
        data() {
            const validateAccount = (rule, value, callback) => {
                const regular = /^[a-zA-Z0-9_]{6,16}$/
                if (value === '') {
                    callback(new Error('请输入用户名'))
                } else if (!regular.test(value)) {
                    callback(new Error('用户名由 6 到 16 位的英文字母、数字、下划线组成'))
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
                let regular
                let label
                const identity = Number(this.identity)
                const isOrg = (identity === 3 || identity === 4 || identity === 11)
                if (isOrg) {
                    // regular = /(^\d{15}$)/
                    regular = /^(([15][1-39])|9[1-3]|Y1)\d{6}[^_IOZSVa-z\W]{10}$/
                    label = '统一社会信用代码'
                } else {
                    regular = /(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)/
                    label = '身份证号'
                }
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
            return {
                gradeList: [],
                studentForm: {
                    account: '',
                    pwd: '',
                    rePwd: '',
                    name: '',
                    idCode: '',
                    studentCode: '',
                    schoolId: '',
                    gradeId: '',
                    classId: '',
                    id: '',
                    auditStatus: '0'
                },
                checkClasz: null,
                teacherForm: {
                    account: '',
                    pwd: '',
                    rePwd: '',
                    name: '',
                    idCode: '',
                    schoolId: '',
                    id: '',
                    auditStatus: '0'
                },
                identity: 0, // 用户身份
                claszList: [],
                identities: {
                    0: { name: 'student', txt: '学生' },
                    1: { name: 'teacher', txt: '教师' },
                },
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
                    name: [
                        { validator: validateUserName, required: true, trigger: 'blur' }
                    ],
                    idCode: [
                        { validator: validateIDCode, trigger: 'blur' }
                    ],
                    schoolId: [
                        { required: true, message: '请选择所在学校', trigger: 'change' }
                    ],
                    classId: [
                        { message: '请选择所在班级', trigger: 'change' }
                    ],
                },
                defaultItems: []
            }
        },
        props: {
            visible: {
                type: Object,
                default() {
                    return {
                        show: false
                    }
                }
            },
            userMsg: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        mounted() {
            this.getDictComb('primarySchool, middleSchool, highSchool').then((res) => {
                this.gradeList = res.dicList
            })
        },
        watch: {
            visible: {
                handler: function (val) {
                    if (val.show) {
                        this.initData()
                    }
                },
                deep: true
            }
        },
        methods: {
            initData() {
                const _userInfo = this.userMsg.userInfo
                this.identity = _userInfo.identity
                const userId = _userInfo.id
                this.defaultItems = [null, null, null]
                this.$set(this.$data[`${this.identities[this.identity].name}Form`], 'account', _userInfo.account)
                this.$set(this.$data[`${this.identities[this.identity].name}Form`], 'name', _userInfo.userName)
                XHR.requestUserBaseInfo({ userId: userId }).then((res) => {
                    if (res.data.code === 200) {
                        const _baseInfo = res.data.appendInfo.baseInfo
                        this.$set(this.$data[`${this.identities[this.identity].name}Form`], 'schoolId', _baseInfo.schoolId)
                        this.$set(this.$data[`${this.identities[this.identity].name}Form`], 'id', _baseInfo.id)
                        if (this.identity === '0') {
                            this.$set(this.$data[`${this.identities[this.identity].name}Form`], 'classId', _baseInfo.classId)
                            this.$set(this.$data[`${this.identities[this.identity].name}Form`], 'gradeId', _baseInfo.gradeId)
                            this.$set(this.$data[`${this.identities[this.identity].name}Form`], 'studentCode', _baseInfo.studentCode)
                            this.checkClasz = _baseInfo.classId
                            this.getClasz()
                        }
                    }
                })
            },
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb',
            }),
            changeSchool: function (item) {
                this.$set(this.$data[`${this.identities[this.identity].name}Form`], 'schoolId', item.id)
                if (this.identity === '0') {
                    this.checkClasz = ''
                    this.getClasz()
                }
            },
            changeClasz: function (id) {
                if (this.claszList.length) {
                    const _item = this.claszList.find((x) => { return x.id === id })
                    this.$set(this.$data.studentForm, 'classId', _item.id)
                    this.$set(this.$data.studentForm, 'gradeId', _item.gradeId)
                }
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
                        const _param = Object.assign({}, this[`${_identity}Form`], { identity: this.identity })
                        delete _param.rePwd
                        XHR[`${_identity}Modify`](_param).then((response) => {
                            if (response.data.code === 200) {
                                this.$message({
                                    message: '编辑成功',
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
                        return false
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    .edit-person {
        .el-dialog {
            width: 572px;
            border-radius: 10px;
            overflow: hidden;
            .el-dialog__header {
                background-color: #fff;
                border-bottom: none;
                height: 44px;
            }
            .el-dialog__body {
                padding: 0 85px 40px;
            }
        }
        .el-input__inner {
            height: 34px;
            border-radius: 10px;
        }
    }
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
.dialog-head {
    text-align: center;
    font-size: 30px;
    color: $theme-color;
    margin-bottom: 44px;
}
.btn-box {
    margin-top: 34px;
    .submit-btn {
        width: 100%;
        height: 46px;
        line-height: 46px;
        font-size: 22px;
        color: #fff;
        border: none;
        border-radius: 15px;
        background-color: $theme-color;
        &:hover {
            opacity: 0.75;
        }
    }
}
</style>