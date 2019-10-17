<template>
    <section class="container sso-box theme-red">
        <el-form ref="form" class="sso-form-box" label-position="right" label-width="114px" :model="form" :rules="rules" v-loading="loading" :element-loading-text="statusMsg">
            <el-form-item v-if="joinResult.length">
                <i class="icon-form-tip"></i>{{ joinResult }}
            </el-form-item>
            <!-- <el-form-item label="用户名">
                <el-input v-model="$route.query.account" placeholder="请输入用户名" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="$route.query.realName" placeholder="请输入姓名" disabled></el-input>
            </el-form-item> -->
            <el-form-item label="学校" prop="schoolId">
                <xk-region-school-select @checkedItem="changeSchool" :checkedItem="form.schoolId" :defaultItems="region" :defaultList="schoolList" :disabled="resType>1"></xk-region-school-select>
            </el-form-item>
            <el-form-item label="班级" prop="classId" v-if="identity==0">
                <el-select v-model="checkClasz" placeholder="请选择所在班级" style="width:100%" @change="changeClasz">
                    <el-option v-for="(item, index) in claszList" :key="item.id" :label="`${translateFun(item.gradeId, gradeList, {key: 'id'})} - ${item.className}`" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <button class="i-button__submit" type="button" @click="addRelation()">立即创建</button>
            </el-form-item>
            <p class="mismatching-tips"><i class="icon-form-tip"></i>如果未找到所属机构或相关信息，请联系上级管理员处理</p>
        </el-form>
    </section>
</template>

<script>
    import Axios from 'xk-kxsz-common/src/assets/js/http.js'
    // import regionSchool from '@/components/common/select/region-school_select.vue'
    import * as XHR from '@/service/common.js'
    import { requestJoin, requestSingleStatus, addSingleRelation } from '@/service/sso.js'
    import { mapActions } from 'vuex'

    // 用户身份
    const IDENTITY = {
        0: 'student',         // 学生
        1: 'teacher',         // 教师
        2: 'investor',        // 投资人
        3: 'investOrg',        // 投资机构
        4: 'enterprise',    // 企业
        5: 'admin',             // 云后台管理员
        6: 'education',     // 市教育局管理员
        7: 'education',     // 县教育局管理员
        9: 'school',            // 学校管理员
        10: 'education',    // 省厅管理员
        11: 'mult',                // 众创空间
    }

    export default {
        name: 'SSO_ProvincialPlatform',
        // components: {
        //     'v-region-school-select': regionSchool
        // },
        data() {
            return {
                gradeList: [],
                identity: 0,
                joinDate: null,
                form: {
                    schoolId: '',
                    gradeId: '',
                    classId: ''
                },
                checkClasz: null,
                rules: {
                    schoolId: [
                        { required: true, message: '请选择所在学校', trigger: 'change' }
                    ],
                    classId: [
                        { required: true, message: '请选择所在班级', trigger: 'change' }
                    ]
                },
                schoolForm: {
                    provinceId: null,
                    cityId: null,
                    areaId: null,
                    schoolName: ''
                },
                schoolList: [],
                region: [],
                claszList: [],
                resType: 0,
                loading: true,
                timer: null,
                joinResult: '',
                statusMsg: ''
            }
        },
        created() {
            const joinDate = (new Date()).getTime()
            this.joinDate = joinDate
            this.identity = Number(this.$route.query.userType)
            this.requestSSOJoin(Object.assign({}, this.$route.query, { joinDate: joinDate }))
            // this.requestStatus()
        },
        methods: {
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb',
                getUserBaseInfo: 'getUserBaseInfo',
                getPermission: 'getPermission',
                getAdminPermission: 'getAdminPermission'
            }),
            // 地区改变至区县级请求学校列表
            changeRegion: function (item) {
                if (item.length) {
                    const _region = {}
                    const [_province, _city, _area] = item
                    _region.provinceId = _province
                    _region.cityId = _city
                    _region.areaId = _area

                    this.$set(this.$data, 'schoolForm', _region)
                    this.searchSchool()
                }
            },
            // 获取学校列表
            searchSchool: function () {
                XHR.requestSchoolList(this.schoolForm).then((response) => {
                    this.schoolList = response.data.appendInfo.comboxList
                })
            },
            changeSchool: function (item) {
                this.$set(this.form, 'schoolId', item.id || item.schoolId)
                if (this.identity === 0) {
                    this.checkClasz = {}
                    this.getClasz()
                }
            },
            changeClasz: function (item) {
                this.$set(this.form, 'classId', item.id)
                this.$set(this.form, 'gradeId', item.gradeId)
            },
            getGrade: function () {
                this.getDictComb('primarySchool, middleSchool, highSchool').then((res) => {
                    this.gradeList = res.dicList
                })
            },
            // 获取班级列表
            getClasz: function () {
                XHR.requestClaszList({ schoolId: this.form.schoolId }).then((response) => {
                    if (response.data.code === 200) {
                        this.claszList = response.data.entity
                    }
                })
            },
            requestSSOJoin: function (params) {
                requestJoin(params).then((response) => {
                    this.cancelRequestStatus()
                    if (response.data.code === 200) {
                        if (response.data.entity) {
                            this.doLogin(response.data.appendInfo)
                        } else {
                            this.resType = response.data.appendInfo.resType
                            this.joinResult = response.data.msg
                            this.statusMsg = ''
                            this.loading = false
                            this.getGrade()
                            const _params = this.$route.query
                            switch (response.data.appendInfo.resType) {
                                case 1:
                                    this.region = [Number(_params.proCode), Number(_params.cityCode), Number(_params.areaCode)]
                                    break
                                case 2:
                                case 3:
                                    this.schoolList = [response.data.appendInfo.school]
                                    this.changeSchool(response.data.appendInfo.school)
                                    break
                            }
                        }
                    } else if (response.data.code === 209) {
                        this.loading = false
                    } else {
                        this.$message.error({
                            message: response.data.msg
                        })
                    }
                }, () => {
                    this.cancelRequestStatus()
                })
            },
            requestStatus: function () {
                this.timer = setInterval(() => {
                    requestSingleStatus({ nowTime: this.joinDate }).then((response) => {
                        if (response.data.code === 200) {
                            this.statusMsg = response.data.msg
                        }
                    })
                }, 500)
            },
            cancelRequestStatus: function () {
                clearInterval(this.timer)
            },
            // 单点用户手动匹配关系
            addRelation: function () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const _form = this.form
                        delete _form.gradeId
                        delete _form.classId
                        addSingleRelation(Object.assign({}, _form, { joinDate: this.joinDate })).then((response) => {
                            if (response.data.code === 200) {
                                this.$message({
                                    message: '关联成功',
                                    type: 'success'
                                })
                                this.doLogin(response.data.appendInfo)
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
            doLogin: function (loginInfo) {
                this.statusMsg = '登录跳转中...'

                localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
                localStorage.setItem('userIdentity', IDENTITY[loginInfo.userInfo.identity])
                localStorage.setItem('loginUId', loginInfo.userInfo.id)

                Axios.defaults.headers.token = loginInfo.token

                this.getUserBaseInfo().then((baseInfo) => {
                    if (baseInfo) {
                        return Promise.resolve(IDENTITY[loginInfo.userInfo.identity])
                    }
                }).then((identity) => {
                    // 获取用户权限
                    switch (identity) {
                        case 'school':
                        case 'education':
                        case 'admin':
                            this.getAdminPermission().then((res) => {
                                if (res) {
                                    window.location.href = `${this.pages.admin}`
                                }
                            })
                            break
                        default:
                            this.getPermission().then((res) => {
                                if (res === true) {
                                    window.location.href = `${this.pages.my}`
                                }
                            })
                            break
                    }
                }).finally(() => {
                    this.isLoading = false
                })
            }
        }
    }
</script>
<style lang='scss'>
@import '~@/assets/css/scss/form.scss';
    .sso-form-box {
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
    }
</style>
<style lang='scss' scoped>
    .container {
        background-color: #fff;
    }

    .sso-box {
        display: table;
        margin: 97px auto 60px;
        padding-bottom: 67px;
        box-sizing: border-box;
    }

    .sso-form-box {
        width: 514px;
        height: 100%;
        margin: 0 auto;

        .icon-form-tip {
            margin-right: .5em;
            font-size: 18px;
            vertical-align: text-bottom;
        }

        .i-button__submit {
            width: 100px;
            border: 0;
            height: 36px;
            background-color: #d00;
            color: #fff;
        }

        .mismatching-tips {
            margin: 50px 0 0 114px;
            font-size: 14px;
        }
    }
</style>
