<template>
    <section class="backend-content__middle">
        <el-form ref="form" label-position="right" label-width="114px" :model="form" :rules="rules">
            <el-row>
                <el-form-item label="用户名" prop="account">
                    <el-col :span="10">
                        <el-input v-model="form.account" placeholder="请输入用户名" required disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item :label="name" prop="name">
                    <el-col :span="10">
                        <el-input v-model="form.name" placeholder="请输入真实姓名"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row v-if="userIdentity=='student' || userIdentity=='teacher'">
                <el-form-item label="性别" prop="sex">
                    <el-col :span="10">
                        <el-radio-group v-model="form.sex">
                            <el-radio v-for="item in sexList" :label="item.id" :key="item.id">{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row v-if="userIdentity=='student' || userIdentity=='teacher'">
                <el-form-item label="证件类型" prop="certiType">
                    <el-col :span="10">
                        <el-select v-model="form.certiType" required disabled placeholder="请选择证件类型" style="width:100%">
                            <el-option v-for="(item, index) in idTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="证件号码" prop="certiNum">
                    <el-col :span="10">
                        <el-input v-model="form.certiNum" placeholder="请输入证件号码" :disabled="ifInvestor || ifExcludeInvestor"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="学籍号" prop="studentCode" v-if="userIdentity=='student'">
                    <el-col :span="10">
                        <el-input v-model="form.studentCode" disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row v-if="ifInvestor || ifExcludeInvestor">
                <el-form-item label="区域" prop="region">
                    <el-col :span="10">
                        <xk-region-pub-select @region="changeRegion" ref="region" :isAdmin="false" :defaultItems="form.region"></xk-region-pub-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row v-if="ifExcludeInvestor">
                <el-form-item label="联系人" prop="linkMan">
                    <el-col :span="10">
                        <el-input v-model="form.linkMan" placeholder="请输入联系人"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 证件照片 -->
            <el-row v-if="ifExcludeInvestor">
                <el-form-item label="证件照片" prop="certiPic">
                    <el-col :span="14">
                        <el-input v-model="form.certiPic" v-show="false"></el-input>
                        <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadCertiPic">
                            <img v-if="form.certiPic && form.certiPic !='' " :src="getFileUrl(form.certiPic)" class="cover" @click="showPrevImage(form.certiPic)">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M</div>
                </el-form-item>
            </el-row>
            <el-row v-if="ifInvestor">
                <el-form-item label="证件照片正面" prop="certiPic1">
                    <el-col :span="14">
                        <el-input v-model="form.certiPic1" v-show="false"></el-input>
                        <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadCertiPic1">
                            <img v-if="form.certiPic1 && form.certiPic1 !='' " :src="getFileUrl(form.certiPic1)" class="cover" @click="showPrevImage(form.certiPic1)">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M</div>
                </el-form-item>
            </el-row>
            <el-row v-if="ifInvestor">
                <el-form-item label="证件照片反面" prop="certiPic2">
                    <el-col :span="14">
                        <el-input v-model="form.certiPic2" v-show="false"></el-input>
                        <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadCertiPic2">
                            <img v-if="form.certiPic2 && form.certiPic2 !='' " :src="getFileUrl(form.certiPic2)" class="cover" @click="showPrevImage(form.certiPic2)">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{imgStandardFileSize}}M</div>
                </el-form-item>
            </el-row>
            <el-row v-if="userIdentity=='student' || userIdentity=='teacher'">
                <el-form-item label="所属学校" prop="schoolId">
                    <el-col :span="10">
                        <el-input v-model="form.schoolName" required disabled></el-input>
                    </el-col>
                    <!-- <el-col :span="4" class="pdl15">
                        <a class="psn-cancel-btn" v-if="ifTransfer">已申请转校</a>
                        <a class="psn-cancel-btn" @click="transferVisible.show = true" v-else>转校</a>
                    </el-col> -->
                </el-form-item>
            </el-row>
            <el-row v-if="userIdentity=='student'">
                <el-form-item label="所在班级" prop="classId">
                    <el-col :span="10">
                        <el-input v-model="form.className" required disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- <el-row>
                <el-form-item label="手机" prop="phone" v-if="userIdentity=='student' || userIdentity=='teacher'">
                    <el-col :span="10">
                        <el-input :value="form.phone | encryptPhone" placeholder="请输入手机号" disabled></el-input>
                    </el-col>
                    <el-col :span="4" class="pdl15">
                        <router-link class="psn-cancel-btn" :to="{ path: '/admin/security/modifyMobile' }" v-if="form.phone">修改绑定</router-link>
                        <router-link class="psn-cancel-btn" :to="{ path: '/admin/security/bindMobile' }" v-else>绑定</router-link>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机" prop="mobile" v-else>
                    <el-col :span="10">
                        <el-input :value="form.mobile | encryptPhone" placeholder="请输入手机号" disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row> -->
            <!-- <el-row>
                <el-form-item label="电子邮箱" prop="email">
                    <el-col :span="10">
                        <el-input :value="form.email | encryptEmail" placeholder="请输入电子邮箱" disabled></el-input>
                    </el-col>
                    <el-col :span="4" class="pdl15">
                        <router-link class="psn-cancel-btn" :to="{ path: '/admin/security/modifyEmail' }" v-if="form.email">修改绑定</router-link>
                        <router-link class="psn-cancel-btn" :to="{ path: '/admin/security/bindEmail' }" v-else>绑定</router-link>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="联系地址" prop="address">
                    <el-col :span="10">
                        <el-input v-model="form.address" placeholder="请输入联系地址"></el-input>
                    </el-col>
                </el-form-item>
            </el-row> -->
            <el-row>
                <el-form-item label="个性签名" prop="sign" v-if="userIdentity=='student' || userIdentity=='teacher'">
                    <el-col :span="20">
                        <el-input type="textarea" v-model="form.sign" placeholder="请输入个性签名" :maxlength="500" resize="none" :rows="5"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="简介" prop="introduction" v-else>
                    <el-col :span="20">
                        <el-input type="textarea" v-model="form.introduction" placeholder="请输入简介" :maxlength="500" resize="none" :rows="5"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="任教" prop="teach" v-if="userIdentity=='teacher'">
                    <el-col :span="20">
                        <el-checkbox-group v-model="form.teach">
                            <el-checkbox v-for="item in technicalList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="兴趣" prop="interest" v-else>
                    <el-col :span="20">
                        <el-checkbox-group v-model="form.interest">
                            <el-checkbox v-for="item in technicalList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-form-item>
                <button class="psn-confirm-btn" @click.prevent="onSubmit('form')">保存</button>
            </el-form-item>
        </el-form>
        <img-preview :visible.sync="visible" :imgUrl.sync="prevImageUrl"></img-preview>
        <transfer-school :transferVisible.sync="transferVisible" @callback="transferCallback"></transfer-school>
    </section>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import { userIdentity, loginInfo, baseInfo } from 'Asset/js/getUserInfo.js'
    import { mapState, mapActions } from 'vuex'
    import * as requestParams from '@/service/my.js'
    import { judgeTransferStatus } from '@/service/common.js'
    // import region from '@/components/common/select/region_pub_select.vue'
    import imgPreview from '@/components/common/img_preview/img_preview.vue'
    import transferSchool from '@/components/profile/transfer_school.vue'

    export default {
        name: 'profile',
        mixins: [uploadFileSize],
        components: {
            // 'v-region-select': region,
            'img-preview': imgPreview,
            'transfer-school': transferSchool
        },
        data() {
            const validateUserName = (rule, value, callback) => {
                const regular = /(^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$)|(^[a-zA-Z]+((\.|\s|·|-|=)[a-zA-Z]+)*$)/
                if (value === '') {
                    callback(new Error('请输入姓名'))
                } else if (!regular.test(value)) {
                    callback(new Error('请输入真实姓名'))
                } else {
                    callback()
                }
            }
            // const validatePhone = (rule, value, callback) => {
            //     let regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/
            //     if (userIdentity === 'student' || userIdentity === 'teacher' || userIdentity === 'investor') {
            //         regular = /^[1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8}$/
            //     }
            //     // if (value === '') {
            //     //     callback(new Error('请输入手机号'))
            //     // }
            //     if (value === '' && !regular.test(value)) {
            //         callback(new Error('请输入正确格式的手机号'))
            //     } else {
            //         callback()
            //     }
            // }
            // const validateEmail = (rule, value, callback) => {
            //     const regular = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
            //     // if (value === '') {
            //     //     callback(new Error('请输入电子邮箱'))
            //     // }
            //     if (value === '' && !regular.test(value)) {
            //         callback(new Error('请输入正确格式的电子邮箱'))
            //     } else {
            //         callback()
            //     }
            // }
            const validateIDCode = (rule, value, callback) => {
                let regular
                let label
                const isOrg = this.ifInvestor || this.ifExcludeInvestor
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
            return {
                // 学生教师为姓名，其他是名称
                name: '',
                // 是否为投资机构
                ifInvestor: false,
                // 是否为投资机构外的三种机构
                ifExcludeInvestor: false,
                userIdentity: userIdentity,
                form: {
                    region: []
                },
                rules: {
                    name: [
                        { validator: validateUserName, required: true, trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ],
                    certiNum: [
                        { validator: validateIDCode, required: true, trigger: 'blur' }
                    ],
                    // phone: [
                    //     { validator: validatePhone, trigger: 'blur' }
                    // ],
                    // mobile: [
                    //     { validator: validatePhone, trigger: 'blur' }
                    // ],
                    // email: [
                    //     { validator: validateEmail, trigger: 'blur' }
                    // ],
                    linkMan: [
                        { required: true, validator: validateUserName, trigger: 'change' }
                    ],
                    sign: [
                        { max: 499, message: '个性签名不能大于 500 个字符', trigger: 'change' }
                    ],
                    introduction: [
                        { max: 499, message: '简介不能大于 500 个字符', trigger: 'change' }
                    ],
                    teach: [
                        { type: 'array', required: true, message: '请至少选择一个任教', trigger: 'change' }
                    ],
                    interest: [
                        { type: 'array', required: true, message: '请至少选择一个兴趣', trigger: 'change' }
                    ],
                    region: { type: 'array', required: true, message: '请选择区域', trigger: 'change' },
                    certiPic: { required: true, message: '请选择证件照', trigger: 'change' },
                    certiPic1: { required: true, message: '请选择证件照正面', trigger: 'change' },
                    certiPic2: { required: true, message: '请选择证件照反面', trigger: 'change' },
                },
                visible: { // 查看大图的控制
                    show: false
                },
                transferVisible: { // 转校弹窗
                    show: false
                },
                prevImageUrl: '',
                ifTransfer: false // 判断是否提出转校申请
            }
        },
        computed: {
            ...mapState('dictionaryCommon', {
                idTypeList(state) {
                    const dicList = (state.certiTypeDicList || {}).dicList || []
                    return dicList
                },
                sexList(state) {
                    const dicList = (state.sexDicList || {}).dicList || []
                    return dicList.filter(x => x.option)
                },
                technicalList(state) {
                    const dicList = (state.technicalClassificationDicList || {}).dicList || []
                    return dicList
                }
            })
        },
        mounted() {
            this.getDictComb('technicalClassification')
            const _data = {}
            switch (userIdentity) {
                case 'student':
                    _data.sex = baseInfo.baseInfo.sex
                    _data.certiType = baseInfo.baseInfo.certiType
                    _data.studentCode = baseInfo.baseInfo.studentCode
                    _data.phone = baseInfo.baseInfo.phone
                    _data.sign = baseInfo.baseInfo.sign
                    _data.schoolId = baseInfo.baseInfo.schoolId
                    _data.schoolName = baseInfo.baseInfo.schoolName
                    _data.className = baseInfo.baseInfo.className
                    _data.gradeId = baseInfo.baseInfo.gradeId
                    _data.classId = baseInfo.baseInfo.classId
                    _data.interest = baseInfo.baseInfo.interest ? baseInfo.baseInfo.interest.split(',') : []
                    this.name = '姓名'
                    break
                case 'teacher':
                    _data.sex = baseInfo.baseInfo.sex
                    _data.certiType = baseInfo.baseInfo.certiType
                    _data.phone = baseInfo.baseInfo.phone
                    _data.sign = baseInfo.baseInfo.sign
                    _data.schoolId = baseInfo.baseInfo.schoolId
                    _data.schoolName = baseInfo.school.schoolName
                    _data.teach = baseInfo.baseInfo.teach ? baseInfo.baseInfo.teach.split(',') : []
                    this.name = '姓名'
                    break
                case 'investor':
                    this.ifInvestor = true
                    _data.certiPic1 = baseInfo.baseInfo.certiPic1
                    _data.certiPic2 = baseInfo.baseInfo.certiPic2
                    _data.interest = baseInfo.baseInfo.interest ? baseInfo.baseInfo.interest.split(',') : []
                    _data.mobile = baseInfo.baseInfo.mobile
                    _data.introduction = baseInfo.baseInfo.introduction
                    _data.region = [baseInfo.baseInfo.provinceId, baseInfo.baseInfo.cityId, baseInfo.baseInfo.areaId]
                    this.name = '名称'
                    break
                case 'investOrg':
                case 'enterprise':
                case 'mult':
                    this.ifExcludeInvestor = true
                    _data.linkMan = baseInfo.baseInfo.linkMan
                    _data.certiPic = baseInfo.baseInfo.certiPic
                    _data.interest = baseInfo.baseInfo.interest ? baseInfo.baseInfo.interest.split(',') : []
                    _data.mobile = baseInfo.baseInfo.mobile
                    _data.introduction = baseInfo.baseInfo.introduction
                    _data.region = [baseInfo.baseInfo.provinceId, baseInfo.baseInfo.cityId, baseInfo.baseInfo.areaId]
                    this.name = '名称'
                    break
            }
            _data.id = baseInfo.baseInfo.id
            _data.account = baseInfo.baseInfo.account
            _data.name = baseInfo.baseInfo.name
            _data.certiNum = baseInfo.baseInfo.certiNum
            _data.email = this.$ls.get('loginInfo').userInfo.email
            _data.address = baseInfo.baseInfo.address
            setTimeout(() => {
                this.form = _data
            }, 0)
            judgeTransferStatus({}).then((res) => {
                if (res.data.code === 200) {
                    this.ifTransfer = res.data.entity
                }
            })
        },
        methods: {
            ...mapActions({
                getDictComb: 'dictionaryCommon/getDictComb'
            }),
            // 地区改变
            changeRegion(items) {
                const _region = this.form
                const [_province, _city, _area] = items

                _region.provinceId = _province
                _region.cityId = _city
                _region.areaId = _area
                // this.form.region = items
            },
            // 上传
            UploadCertiPic(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                            if (res.code === 200) {
                                _this.form.certiPic = res.appendInfo.resourceId
                            }
                        })
                        uploader.off('uploadError').on('uploadError', function (files, reason) {
                            _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
                        })
                } else {
                    if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                        _this.$message({
                            message: '请上传支持格式的图片',
                        })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.imgStandardFileSize}M`
                        })
                    }
                    _this.form.certiPic = null
                    uploader.cancelFile(file)
                }
            },
            UploadCertiPic1(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                            if (res.code === 200) {
                                _this.form.certiPic1 = res.appendInfo.resourceId
                            }
                        })
                        uploader.off('uploadError').on('uploadError', function (files, reason) {
                            _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
                        })
                } else {
                    if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                        _this.$message({
                            message: '请上传支持格式的图片',
                        })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.imgStandardFileSize}M`
                        })
                    }
                    _this.form.certiPic1 = null
                    uploader.cancelFile(file)
                }
            },
            UploadCertiPic2(file) {
                const fileSize = file.size
                const fileName = file.name
                const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)
                const _this = this
                if (/(jpe?g|gif|png|bmp)$/i.test(expandName) && fileSize < (_this.imgStandardFileSize * 1024 * 1024)) {
                        uploader.off('uploadSuccess').on('uploadSuccess', function (files, res) {
                            if (res.code === 200) {
                                _this.form.certiPic2 = res.appendInfo.resourceId
                            }
                        })
                        uploader.off('uploadError').on('uploadError', function (files, reason) {
                            _this.$message({ message: `${files.name}${reason.msg || '上传失败'}` })
                        })
                } else {
                    if (!/(jpe?g|gif|png|bmp)$/i.test(expandName)) {
                        _this.$message({
                            message: '请上传支持格式的图片',
                        })
                    } else {
                        _this.$message({
                            message: `文件大小不超过${_this.imgStandardFileSize}M`
                        })
                    }
                    _this.form.certiPic2 = null
                    uploader.cancelFile(file)
                }
            },
            showPrevImage(url) {
                this.visible.show = true
                this.prevImageUrl = url
            },
            // 提交表单
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = Object.assign({}, this.form)
                        delete params.schoolName
                        delete params.account
                        // delete params.certiNum
                        switch (userIdentity) {
                            case 'teacher':
                                params.teach = this.form.teach.join(',')
                                break
                            case 'student':
                            case 'investor':
                            case 'investOrg':
                            case 'enterprise':
                            case 'mult':
                                delete params.className
                                params.interest = this.form.interest.join(',')
                                break
                        }
                        requestParams[`${userIdentity}Modify`](params).then((response) => {
                            if (response.data.code === 200) {
                                // Object.assign(baseInfo[userIdentity], params)
                                Object.assign(baseInfo.baseInfo, params)
                                Object.assign(loginInfo.userInfo, params)
                                loginInfo.userInfo.userName = params.name
                                localStorage.setItem('baseInfo', JSON.stringify(baseInfo))
                                localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                })
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            transferCallback() {
                this.ifTransfer = true
            }
        },
        filters: {
            encryptPhone(str) {
                let result = str
                if (str) {
                    result = str.substr(0, 3) + '****' + str.substr(7)
                }
                return result
            },
            encryptEmail(str) {
                let result = str
                if (str) {
                    const sub = str.slice(1, str.indexOf('@'))
                    result = str.replace(sub, new Array(sub.length).fill('*').join(''))
                }
                return result
            }
        }
    }
</script>

<style lang="scss" scoped="">
    .cover-uploader {
        .cover {
            width: 100%;
        }
    }
    .pdl15 {
        padding-left: 15px;
    }
</style>
