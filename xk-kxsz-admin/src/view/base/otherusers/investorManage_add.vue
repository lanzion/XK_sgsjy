<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
            <!-- 用户名 -->
            <el-row>
                <el-form-item label="用户名" prop="account">
                    <el-col :span="8">
                        <el-input v-model="form.account" placeholder="请输入用户名" :disabled="isReadOnly || disabled"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 投资人名称 -->
            <el-row>
                <el-form-item label="投资人姓名" prop="name">
                    <el-col :span="8">
                        <el-input v-model="form.name" placeholder="请输入投资人姓名" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 工商注册号码 -->
            <el-row>
                <el-form-item label="工商注册号码" prop="certiNum">
                    <el-col :span="8">
                        <el-input v-model="form.certiNum" placeholder="请输入工商注册号码" :disabled="isReadOnly || disabled"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 证件照片 -->
            <el-row>
                <el-form-item label="证件照片正面" prop="certiPic1">
                    <el-col :span="14">
                        <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadCertiPic1">
                            <img v-if="form.certiPic1&&form.certiPic1!=''" :src="getFileUrl(form.certiPic1)" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="证件照片反面" prop="certiPic2">
                    <el-col :span="14">
                        <el-upload class="cover-uploader fl" :show-file-list="false" action :before-upload="UploadCertiPic2">
                            <img v-if="form.certiPic2&&form.certiPic2!=''" :src="getFileUrl(form.certiPic2)" class="cover">
                            <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                    <div class="tips" style="color:#8391a5;">仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }}M</div>
                </el-form-item>
            </el-row>
            <!-- 所属区域 -->
            <el-row>
                <el-form-item label="所属区域" prop="region">
                    <el-col :span="8">
                        <v-region-select :defaultItems="defaultRegion" @region="changeRegion" :disabled="isReadOnly"></v-region-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 手机 -->
            <el-row v-if="disabled">
                <el-form-item label="手机" prop="mobile">
                    <el-col :span="8">
                        <el-input v-model="form.mobile" placeholder="请输入手机" disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 电子邮箱 -->
            <el-row v-if="disabled">
                <el-form-item label="电子邮箱" prop="email">
                    <el-col :span="8">
                        <el-input v-model="form.email" placeholder="请输入电子邮箱" disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 联系地址 -->
            <el-row>
                <el-form-item label="联系地址" prop="address">
                    <el-col :span="8">
                        <el-input v-model="form.address" placeholder="请输入联系地址" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 简介 -->
            <el-row>
                <el-form-item label="简介" prop="introduction">
                    <el-col :span="10">
                        <el-input type="textarea" v-model="form.introduction" placeholder="请输入简介" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 兴趣 -->
            <el-row>
                <el-form-item label="兴趣" prop="interest">
                    <el-col :span="10">
                        <el-checkbox-group v-model="form.interest">
                            <el-checkbox v-for="item in interestDL" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
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
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import { mapState, mapMutations, mapActions } from 'Vuex'
import { fileUpload } from 'Asset/js/common-config.js'
import { addBaseInvestor, requestInvestorDetail, modifyBaseInvestor } from '@/service/admin_base.js'
import region from '@/components/common/select/region_pub_select.vue'
export default {
    name: 'investorManageAdd',
    mixins: [uploadFileSize],
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
        var validateUserName = (rule, value, callback) => {
            let regular = /(^[\u4E00-\u9FA5]+(\·[\u4E00-\u9FA5]+)*$)|(^[a-zA-Z]+((\.|\s|\·|\-|\=)[a-zA-Z]+)*$)/;
            if (value === '') {
                callback(new Error(`请输入投资人姓名`))
            } else if (!regular.test(value)) {
                callback(new Error(`您输入的投资人姓名格式不正确`))
            } else {
                callback()
            }
        }
        var validateMobile = (rule, value, callback) => {
            let regular = /^[1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|76|77|78)[0-9]{8}$/;
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else if (!regular.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        var validateEmail = (rule, value, callback) => {
            let regular = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (value === '') {
                callback(new Error('请输入电子邮箱'));
            } else if (!regular.test(value)) {
                callback(new Error('请输入正确格式的电子邮箱'));
            } else {
                callback();
            }
        };
        var validateRegion = (rule, value, callback) => {
            value = this.region
            if (!value.length) {
                callback(new Error('请选择所属区域'));
            } else {
                callback();
            }
        }
        var validateIDCode = (rule, value, callback) => {
            let regular = /(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)/
            if (value === '') {
                callback(new Error(`请输入身份证号`))
            } else if (!regular.test(value)) {
                callback(new Error(`您输入的身份证号格式不正确`))
            } else {
                callback()
            }
        }
        return {
            fileUpload: fileUpload,
            // 表单数据
            form: {
                account: '',        // 账号
                name: '',           // 姓名
                certiNum: '',       // 证件号码
                certiPic1: '',      // 证件照片正面
                certiPic2: '',      // 证件照片反面
                interest: [],       // 兴趣
                mobile: '',         // 联系电话
                email: '',          // 电子邮箱
                address: '',        // 地址
                introduction: ''    // 简介
            },
            defaultRegion: [],
            region: [],
            disabled: false,
            isReadOnly: false,
            // 表单校验提示
            rules: {
                account: [
                    { validator: validateAccount, required: true, trigger: 'blur' }
                ],
                name: [
                    { validator: validateUserName, required: true, trigger: 'change' }
                ],
                certiNum: [
                    // { validator: validateIDCode, required: true, trigger: 'blur' }
                    { required: true, message: '请输入证件号', trigger: 'blur' }
                ],
                certiPic1: [
                    { required: true, message: '请上传证件照正面', trigger: 'change' },
                ],
                certiPic2: [
                    { required: true, message: '请上传证件照反面', trigger: 'change' },
                ],
                region: [
                    { validator: validateRegion, required: true, trigger: 'change' }
                ],
                interest: [
                    { required: true, type: 'array', message: '请选择兴趣', trigger: 'blur' }
                ],
                mobile: [
                    { validator: validateMobile, required: true, trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, required: true, trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入联系地址', trigger: 'blur' }
                ],
                introduction: [
                    { required: true, message: '请输入简介', trigger: 'blur' },
                    { max: 500, message: '不超过500字符', trigger:'change' }
                ],
            }
        }
    },
    methods: {
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        UploadCertiPic1 (file, fileList) {
            const fileSize = file.size,
                  fileName = file.name,
                  expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                  _this = this
            if (/(jpe?g|gif|png)$/i.test(expandName) && (fileSize < (this.imgStandardFileSize * 1024 * 1024)) ) {
                uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                    if (res.code === 200) {
                        _this.form.certiPic1 = res.appendInfo.resourceId
                    }
                })
                uploader.off('uploadError').on('uploadError', function (file, reason) {
                    _this.$message({ message: reason.msg })
                })
            } else {
                if (!/(jpe?g|gif|png)$/i.test(expandName)) {
                     this.$message({ message: '请上传支持格式的图片' })
                } else {
                    _this.$message({
                        message: `文件大小不超过${_this.imgStandardFileSize}M`
                    })
                }
                _this.form.certiPic1 = null
                uploader.cancelFile(file)
            }
        },
        UploadCertiPic2 (file, fileList) {
            const fileSize = file.size,
                  fileName = file.name,
                  expandName = fileName.substr(fileName.lastIndexOf(".")+1),
                  _this = this
            if (/(jpe?g|gif|png)$/i.test(expandName) && fileSize < (this.imgStandardFileSize * 1024 * 1024) ) {
                uploader.off('uploadSuccess').on('uploadSuccess', function (file, res) {
                    if (res.code === 200) {
                        _this.form.certiPic2 = res.appendInfo.resourceId
                    }
                })
                uploader.off('uploadError').on('uploadError', function (file, reason) {
                    _this.$message({ message: reason.msg })
                })
            } else {
                if (!/(jpe?g|gif|png)$/i.test(expandName)) {
                     this.$message({ message: '请上传支持格式的图片' })
                } else {
                    _this.$message({
                        message: `文件大小不超过${_this.imgStandardFileSize}M`
                    })
                }
                _this.form.certiPic2 = null
                uploader.cancelFile(file)
            }
        },
        //获取投资人详情
        getDetail(){
            requestInvestorDetail({id:this.form.id}).then((res) => {
                if (res.data.code === 200) {
                    let datas = res.data.entity,
                        _region = [],
                        _form = {}
                    _form.account = datas.account || ''
                    _form.name = datas.name || ''
                    _form.certiNum = datas.certiNum || ''
                    _form.certiPic1 = datas.certiPic1 || ''
                    _form.certiPic2 = datas.certiPic2 || ''
                    _form.mobile = datas.mobile || ''
                    _form.email = datas.email || ''
                    _form.address = datas.address || ''
                    _form.introduction = datas.introduction || ''
                    _form.interest = datas.interest ? datas.interest.split(',') : []
                    _form.id = datas.id
                    _region = [datas.provinceId, datas.cityId, datas.areaId]
                    this.$set(this.$data, 'defaultRegion', _region)
                    this.$set(this.$data, 'region', _region)
                    this.$set(this.$data, 'form', _form)
                }
            })
        },
        // 所属地区改变
        changeRegion(item) {
            this.$set(this.$data, 'region', item);
        },
        // 提交表单
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let flag = this.$route.query.id ? true : false,
                        handle = flag ? modifyBaseInvestor : addBaseInvestor,
                        handleText = flag ? '修改' : '添加';

                    handle(this.params).then( response => {
                        if (response.data.code == 200) {
                            this.$router.go(-1)
                            this.$message({
                                message: `${handleText}成功`,
                                type: 'success'
                            })
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

        this.getDictComb('technicalClassification')
        if (this.$route.path.includes('detail')) {
            this.isReadOnly = true
        }

        if(this.$route.query.id != undefined){
            this.disabled = true
            this.$set(this.$data.form, 'id', this.$route.query.id)
            this.getDetail()
            this.$refs.form.resetFields()
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            interestDL (state) {
                let dicList = (state['technicalClassificationDicList'] || {}).dicList || []
                return dicList
            }
        }),
        params: function() {
            let _params = Object.assign({}, this.form)
            let flag = this.$route.query.id ? true : false
            if (flag) {
                delete _params.account
                delete _params.certiNum
            }
            _params.interest = this.form.interest.join(',')
            // 所属区域
            let [_province = '', _city = '', _area = ''] = this.region
            _params.provinceId = _province
            _params.cityId     = _city
            _params.areaId     = _area
            return _params
        }
    },
    components: {
        'v-region-select': region
    }
}
</script>

