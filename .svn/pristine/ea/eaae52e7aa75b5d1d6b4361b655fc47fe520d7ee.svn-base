<template>
    <section class="container register-box">
        <div class="identity-select-box clearfix">
            <label v-for="(item, key, index) in identities" class="identity-select-item" :class="{checked: key==identity}" @click="identity=key;resetForm(key)">
                <i :class="['icon-form-' + item.name]"></i>{{item.txt}}
            </label>
        </div>
        <el-form ref="studentForm" class="register-form-box" label-position="right" label-width="114px" :model="studentForm" :rules="rules" v-if="identity==0">
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
            <el-form-item label="所在学校" prop="schoolId">
                <v-region-school-select @checkedItem="changeSchool" :checkedItem="studentForm.schoolId"></v-region-school-select>
            </el-form-item>
            <el-form-item label="所在班级" prop="classId">
                <el-select v-model="checkClasz" placeholder="请选择所在班级" style="width:100%" @change="changeClasz">
                    <el-option v-for="(item, index) in claszList" :key="item.id" :label="item.className" :value="item"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form ref="teacherForm" class="register-form-box" label-position="right" label-width="114px" :model="teacherForm" :rules="rules" v-else-if="identity==1">
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
            <el-form-item label="身份证号" prop="idCode">
                <el-input v-model="teacherForm.idCode" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item label="所在学校" prop="schoolId">
                <v-region-school-select @checkedItem="changeSchool" :checkedItem="teacherForm.schoolId"></v-region-school-select>
            </el-form-item>
        </el-form>
        <el-form ref="enterpriseForm" class="register-form-box" label-position="right" label-width="114px" :model="enterpriseForm" :rules="rules" v-else-if="identity==4">
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
            <el-form-item label="工商注册号码" prop="idCode">
                <el-input v-model="enterpriseForm.idCode" placeholder="请输入工商注册号码"></el-input>
            </el-form-item>
            <el-form-item label="所在区域" prop="region">
                <v-region-select @region="changeRegion"></v-region-select>
            </el-form-item>
            <el-form-item label="营业执照" prop="face" class="clearfix">
                <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadImage">
                    <img v-if="enterpriseForm.face != '' && enterpriseForm.face != null" :src="getFileUrl(enterpriseForm.face)" class="cover">
                    <i v-else class="el-icon-plus cover-uploader-icon"></i>
                    <el-input v-model="enterpriseForm.face" type="hidden"></el-input>
                </el-upload>
                <p class="cover-upload-inst fl">仅支持JPG、GIF、PNG、JPEG格式<br>文件小于{{imgStandardFileSize}}M</p>
            </el-form-item>
        </el-form>
        <el-form ref="investorForm" class="register-form-box" label-position="right" label-width="114px" :model="investorForm" :rules="rules" v-else-if="identity==2">
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
                <v-region-select @region="changeRegion"></v-region-select>
            </el-form-item>
            <el-form-item label="证件照片" prop="" required>
                <el-form-item class="cover-upload-box" prop="positivePic">
                    <figure class="clearfix">
                        <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadPositivePic" @click.native="UploadFile( 2, 'pic', 'positivePic')">
                            <img v-if="investorForm.positivePic != '' && investorForm.positivePic != null" :src="getFileUrl(investorForm.positivePic)" class="cover">
                            <template v-else>
                                <i class="el-icon-plus cover-uploader-icon"></i>
                                <span class="el-upload__text">正面</span>
                            </template>
                            <el-input v-model="investorForm.positivePic" type="hidden"></el-input>
                        </el-upload>
                        <p class="cover-upload-inst fl">仅支持JPG、GIF、PNG、JPEG格式<br>文件小于{{imgStandardFileSize}}M</p>
                    </figure>
                </el-form-item>
                <el-form-item class="cover-upload-box" prop="reversePic">
                    <figure class="clearfix">
                        <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadReversePic" @click.native="UploadFile( 2, 'pic', 'reversePic')">
                            <img v-if="investorForm.reversePic != '' && investorForm.reversePic != null" :src="getFileUrl(investorForm.reversePic)" class="cover">
                            <template v-else>
                                <i class="el-icon-plus cover-uploader-icon"></i>
                                <span class="el-upload__text">反面</span>
                            </template>
                            <el-input v-model="investorForm.reversePic" type="hidden"></el-input>
                        </el-upload>
                        <p class="cover-upload-inst fl">仅支持JPG、GIF、PNG、JPEG格式<br>文件小于{{imgStandardFileSize}}M</p>
                    </figure>
                </el-form-item>
            </el-form-item>
        </el-form>
        <el-form ref="investOrgForm" class="register-form-box" label-position="right" label-width="114px" :model="investOrgForm" :rules="rules" v-else-if="identity==3">
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
            <el-form-item label="工商注册号码" prop="idCode">
                <el-input v-model="investOrgForm.idCode" placeholder="请输入工商注册号码"></el-input>
            </el-form-item>
            <el-form-item label="所在区域" prop="region">
                <v-region-select @region="changeRegion"></v-region-select>
            </el-form-item>
            <el-form-item label="营业执照" prop="face" class="clearfix">
                <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadInvestOrgFormFace">
                    <img v-if="investOrgForm.face != '' && investOrgForm.face != null" :src="getFileUrl(investOrgForm.face)" class="cover">
                    <i v-else class="el-icon-plus cover-uploader-icon"></i>
                    <el-input v-model="investOrgForm.face" type="hidden"></el-input>
                </el-upload>
                <p class="cover-upload-inst fl">仅支持JPG、GIF、PNG、JPEG格式<br>文件小于{{imgStandardFileSize}}M</p>
            </el-form-item>
        </el-form>
        <el-form ref="multForm" class="register-form-box" label-position="right" label-width="114px" :model="multForm" :rules="rules" v-else-if="identity==11">
            <el-form-item label="用户名" prop="account">
                <el-input v-model="multForm.account" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="multForm.pwd" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePwd">
                <el-input type="password" v-model="multForm.rePwd" placeholder="请再次确认密码"></el-input>
            </el-form-item>
            <el-form-item label="众创空间全称" prop="userName">
                <el-input v-model="multForm.userName" placeholder="请输入众创空间全称"></el-input>
            </el-form-item>
            <el-form-item label="工商注册号码" prop="idCode">
                <el-input v-model="multForm.idCode" placeholder="请输入工商注册号码"></el-input>
            </el-form-item>
            <el-form-item label="所在区域" prop="region">
                <v-region-select @region="changeRegion"></v-region-select>
            </el-form-item>
            <el-form-item label="营业执照" prop="face" class="clearfix">
                <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadMultFormFace">
                    <img v-if="multForm.face != '' && multForm.face != null" :src="getFileUrl(multForm.face)" class="cover">
                    <i v-else class="el-icon-plus cover-uploader-icon"></i>
                    <el-input v-model="multForm.face" type="hidden"></el-input>
                </el-upload>
                <p class="cover-upload-inst fl">仅支持JPG、GIF、PNG、JPEG格式<br>文件小于{{imgStandardFileSize}}M</p>
            </el-form-item>
        </el-form>
        <el-form ref="form" class="register-form-box" label-position="right" label-width="114px">
            <el-form-item label="" prop="isAgree">
                <el-checkbox v-model="isAgree" class="agree-box"></el-checkbox>
                <router-link target="_blank" to="/protocol">您已阅读并同意创客集结号平台服务条款</router-link>
            </el-form-item>
            <el-form-item>
                <el-button class="i-button__big" type="primary" @click="register()">立即创建</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    import { uploadFileSize } from '@/mixin/uploadFileSize.js'
    import region from '@/components/common/select/region_pub_select.vue'
    import regionSchool from '@/components/common/select/region-school_select.vue'
    import * as XHR from '@/service/common.js'
    import { mapState, mapMutations, mapActions } from 'Vuex'
    import Axios from 'Axios'
    export default {
        name: 'register',
        mixins: [uploadFileSize],
        components: {
            'v-region-select': region,
            'v-region-school-select': regionSchool
        },
        data() {
            var validateAccount = (rule, value, callback) => {
                let regular = /^[a-zA-Z0-9_]{4,12}$/;
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (!regular.test(value)) {
                    callback(new Error('用户名由 4 到 12 位的英文字母、数字、下划线组成'));
                } else {
                    callback();
                }
            };
            var validateRePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次确认密码'));
                } else if (value !== this[`${this.identities[this.identity].name}Form`].pwd) {
                    callback(new Error('两次输入密码不一致！'));
                } else {
                    callback();
                }
            };
            var validateUserName = (rule, value, callback) => {
                let regular = /(^[\u4E00-\u9FA5]+(\·[\u4E00-\u9FA5]+)*$)|(^[a-zA-Z]+((\.|\s|\·|\-|\=)[a-zA-Z]+)*$)/;
                let label = '真实姓名',
                    identity = this.identity;
                switch(identity) {
                    case '3':
                    case '4':
                    case '11':
                        label = this.identities[identity].txt + '全称';
                        break;
                    default:
                        label = '真实姓名';
                        break;
                }
                if (value === '') {
                    callback(new Error(`请输入${label}`));
                } else if (!regular.test(value)) {
                    callback(new Error(`请输入${label}`));
                } else {
                    callback();
                }
            };
            var validateIDCode = (rule, value, callback) => {
                let regular, label,
                    identity = this.identity;
                if (identity==3 || identity==4 || identity==11) {
                    regular = /(^\d{15}$)/;
                    label = '工商注册号码'
                } else {
                    regular = /(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)/;
                    label = '身份证号'
                }
                if (value === '') {
                    callback(new Error(`请输入${label}`));
                } else if (!regular.test(value)) {
                    callback(new Error(`您输入的${label}格式不正确`));
                } else {
                    callback();
                }
            };
            var validateRegion = (rule, value, callback) => {
                let form = this[`${this.identities[this.identity].name}Form`]
                value = [form.provinceId, form.cityId, form.areaId]
                value = value.filter(x => x);
                if (!value.length) {
                    callback(new Error('请选择所在地区'));
                } else {
                    callback();
                }
            };
            return {
                identity: 0,
                studentForm: {
                    account: '',
                    pwd: '',
                    rePwd: '',
                    userName: '',
                    idCode: '',
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
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    rePwd: [
                        { validator: validateRePwd, required: true, trigger: 'blur' }
                    ],
                    userName: [
                        { validator: validateUserName, required: true, trigger: 'blur' }
                    ],
                    idCode: [
                        { validator: validateIDCode, required: true, trigger: 'blur' }
                    ],
                    schoolId: [
                        { required: true, message: '请选择所在学校', trigger: 'change' }
                    ],
                    classId: [
                        { required: true, message: '请选择所在班级', trigger: 'change' }
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
                        { required: true, message: '请上传营业执照', trigger: 'change' }
                    ]
                },
                identities: {
                    0: { name: 'student', txt: '学生'},
                    1: { name: 'teacher', txt: '教师'},
                    4: { name: 'enterprise', txt: '企业'},
                    2: { name: 'investor', txt: '投资人'},
                    3: { name: 'investOrg', txt: '投资机构'},
                    11: { name: 'mult', txt: '众创空间'}
                },
                fileUpload: fileUpload,
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
        watch: {
            'studentForm.schoolId': {
                handler: function (val, oldVal) {
                    this.getClasz();
                },
                deep: true
            }
        },
        methods: {
            ...mapActions([
                'getPermission'
            ]),
            // 地区改变至区县级请求学校列表
            changeRegion: function (region) {
                console.log(region)
                if (region.length) {
                    let _region = {}
                    let [ _province, _city, _area ] = region;
                    _region.provinceId = _province;
                    _region.cityId = _city;
                    _region.areaId = _area;

                    switch(this.identity) {
                        case 0:
                        case 1:
                            this.$set(this.$data, 'schoolForm', _region);
                            this.searchSchool();
                            break;
                        default:
                            Object.assign(this[`${this.identities[this.identity].name}Form`], _region)
                            break;
                    }
                }
            },
            // 获取学校列表
            searchSchool: function () {
                XHR.requestSchoolList(this.schoolForm).then(response => {
                    this.schoolList = response.data.appendInfo.comboxList
                })
            },
            changeSchool: function (item) {
                this.$set(this.$data[`${this.identities[this.identity].name}Form`], 'schoolId', item.id);
            },
            changeClasz: function(item) {
                this.$set(this.$data.studentForm, 'classId', item.id);
                this.$set(this.$data.studentForm, 'gradeId', item.gradeId);
            },
            // 获取班级列表
            getClasz: function() {
                if (this.identity == 0) {
                    XHR.requestClaszList({'schoolId': this.studentForm.schoolId}).then(response => {
                        if (response.data.code == 200) {
                            this.claszList = response.data.entity;
                        }
                    })
                }
            },
            // 注册
            register: function() {
                let _identity = this.identities[this.identity].name
                this.$refs[`${_identity}Form`].validate((valid) => {
                    if (valid) {
                        if (this.isAgree) {
                            let _param = Object.assign({}, this[`${_identity}Form`], {identity: this.identity});
                            delete _param.rePwd;
                            XHR[`${_identity}Register`](_param).then(response => {
                                if (response.data.code == 200) {
                                    this.$message({
                                        message: response.data.msg,
                                        type: 'success'
                                    });
                                    setTimeout(() => {
                                        this.$router.push(this.$route.query.oauth_callback);
                                    }, 3000)
                                } else {
                                    this.$message.error({
                                        message: response.data.msg
                                    });
                                }
                            })
                        } else {
                            this.$message({
                                message: '请先同意服务条款',
                                type: 'warning'
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            UploadMultFormFace (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png)$/i.test(expandName) && fileSize < (this.imgStandardFileSize * 1024 * 1024) ) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this[`${_this.identities[_this.identity].name}Form`].face = res.appendInfo.resourceId
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this[`${_this.identities[_this.identity].name}Form`].face = null
                    if (!/(jpe?g|gif|png)$/i.test(expandName)) {
                        _this.$message({ message: '请上传支持格式的图片' })
                    } else {
                        _this.$message({ message: `图片大于${imgStandardFileSize}M` })
                    }
                    uploader.cancelFile(file)
                }
            },
            UploadInvestOrgFormFace (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png)$/i.test(expandName) && fileSize < (this.imgStandardFileSize * 1024 * 1024) ) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this[`${_this.identities[_this.identity].name}Form`].face = res.appendInfo.resourceId
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this[`${_this.identities[_this.identity].name}Form`].face = null
                    if (!/(jpe?g|gif|png)$/i.test(expandName)) {
                        _this.$message({ message: '请上传支持格式的图片' })
                    } else {
                        _this.$message({ message: `图片大于${imgStandardFileSize}M` })
                    }
                    uploader.cancelFile(file)
                }
            },
            UploadInvestOrgFormFace (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png)$/i.test(expandName) && fileSize < (this.imgStandardFileSize * 1024 * 1024) ) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this[`${_this.identities[_this.identity].name}Form`].face = res.appendInfo.resourceId
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this[`${_this.identities[_this.identity].name}Form`].face = null
                    if (!/(jpe?g|gif|png)$/i.test(expandName)) {
                        _this.$message({ message: '请上传支持格式的图片' })
                    } else {
                        _this.$message({ message: `图片大于${imgStandardFileSize}M` })
                    }
                    uploader.cancelFile(file)
                }
            },
            UploadReversePic (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png)$/i.test(expandName) && fileSize < (this.imgStandardFileSize * 1024 * 1024) ) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this[`${_this.identities[_this.identity].name}Form`].reversePic = res.appendInfo.resourceId
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this[`${_this.identities[_this.identity].name}Form`].reversePic = null
                    if (!/(jpe?g|gif|png)$/i.test(expandName)) {
                        _this.$message({ message: '请上传支持格式的图片' })
                    } else {
                        _this.$message({ message: `图片大于${imgStandardFileSize}M` })
                    }
                    uploader.cancelFile(file)
                }
            },
            UploadPositivePic (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png)$/i.test(expandName) && fileSize < (this.imgStandardFileSize * 1024 * 1024) ) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this[`${_this.identities[_this.identity].name}Form`].positivePic = res.appendInfo.resourceId
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this[`${_this.identities[_this.identity].name}Form`].positivePic = null
                    if (!/(jpe?g|gif|png)$/i.test(expandName)) {
                        _this.$message({ message: '请上传支持格式的图片' })
                    } else {
                        _this.$message({ message: `图片大于${imgStandardFileSize}M` })
                    }
                    uploader.cancelFile(file)
                }
            },
            UploadImage (file, fileList) {
                const fileSize = file.size,
                      fileName = file.name,
                      expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                      _this = this
                if(/(jpe?g|gif|png)$/i.test(expandName) && fileSize < (this.imgStandardFileSize * 1024 * 1024) ) {
                    uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                        if(res.code === 200) {
                            _this[`${_this.identities[_this.identity].name}Form`].face = res.appendInfo.resourceId
                        }
                    })
                    uploader.off('uploadError').on('uploadError', function (file, reason) {
                        _this.$message({ message: reason.msg })
                    })
                } else {
                    _this[`${_this.identities[_this.identity].name}Form`].face = null
                    if (!/(jpe?g|gif|png)$/i.test(expandName)) {
                        _this.$message({ message: '请上传支持格式的图片' })
                    } else {
                        _this.$message({ message: `图片大于${imgStandardFileSize}M` })
                    }
                    uploader.cancelFile(file)
                }
            },
            // 重置表单
            resetForm: function(identity) {
                let timer = setTimeout(() => {
                    this.$refs[`${this.identities[identity].name}Form`].resetFields()
                    clearTimeout(timer)
                }, 100)
            }
        }
    }
</script>
<style lang='scss'>
.register-form-box {
    .el-form-item__error {
        top: 0;
        left: 100%;
        white-space: nowrap;
        padding: 11px 12px;

        &:before {
            content: '\e911';
            margin-right: 4px;
            font-family: 'icons';
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
.container {
    margin-top: 20px;
    padding: 20px 0;
    background-color: #fff;
}
.register-box {
    padding-bottom: 120px;
}
.register-form-box {
    width: 514px;
    margin: 0 auto;

    .i-button__big {
        width: 160px;
        height: 46px;
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
            border-color: #2797ed;
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
}
.identity-select-box {
    margin: 64px 20px;

    .identity-select-item {
        position: relative;
        float: left;
        display: inline-block;
        width: 16.66%;
        height: 72px;
        border: 1px solid #d7d7d7;
        box-sizing: border-box;
        line-height: 72px;
        font-size: 16px;
        color: #2797ed;
        text-align: center;
        cursor: pointer;

        & + .identity-select-item {
            border-left: 0;
        }

        [class^="icon-form-"], [class*=" icon-form-"] {
            font-size: 34px;
            color: #2797ed;
            margin-right: 4px;
        }
    }
    label.checked {
        border-width: 0;
        background-color: #2797ed;
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
            border-top: 12px solid #2797ed;
        }
    }
}
</style>
