<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 账号 -->
            <el-row>
                <el-form-item label="账号" prop="account">
                    <el-col :span="8">
                        <el-input v-model="form.account" placeholder="请输入账号" :disabled="isReadOnly || disabled"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 密码 -->
            <el-row v-if="form.id == undefined">
                <el-form-item label="密码" prop="pwd">
                    <el-col :span="8">
                        <el-input type="password" v-model="form.pwd" placeholder="请输入密码"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 姓名 -->
            <el-row>
                <el-form-item label="姓名" prop="name">
                    <el-col :span="8">
                        <el-input v-model="form.name" placeholder="请输入姓名" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 性别 -->
            <el-row>
                <el-form-item label="性别" prop="sex">
                    <el-col :span="8">
                        <el-radio-group v-model="form.sex" :disabled="isReadOnly">
                            <el-radio v-for="item in sexList" :label="item.id" :key="item.id">{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 证件类型 -->
            <el-row>
                <el-form-item label="证件类型" prop="certiType">
                    <el-col :span="8">
                        <el-select v-model="form.certiType" placeholder="请选择证件类型" :disabled="true">
                            <el-option v-for="item in idTypeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 证件号码 -->
            <el-row>
                <el-form-item label="证件号码" prop="certiNum">
                    <el-col :span="8">
                        <el-input v-model="form.certiNum" placeholder="请输入证件号码" :disabled="isReadOnly || disabled"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 所属学校 -->
            <el-row v-if="identity=='education' || identity=='admin'">
                <el-form-item label="所属学校" prop="schoolId">
                    <el-col :span="8">
                        <v-region-school-select :defaultItems.sync="form.region" :isAdmin="true" @checkedItem="changeSchool" :checkedItem="form.schoolId" :disabled="isReadOnly"></v-region-school-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 所在班级 -->
            <el-row>
                <el-form-item label="所在班级" prop="classId">
                    <el-col :span="8">
                        <el-select v-model="form.classId" filterable placeholder="请选择所在班级" @change="changeClasz" :disabled="isReadOnly">
                            <el-option v-for="item in claszList":label="`${translateFun(item.gradeId, gradeList, {key: 'id'})} - ${item.className}`" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 兴趣 -->
            <el-row>
                <el-form-item label="兴趣" prop="interest">
                    <el-col :span="23">
                        <el-checkbox-group v-model="form.interest">
                            <el-checkbox v-for="item in interestList" :label="item.id" :key="item.id" :disabled="isReadOnly">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 手机 -->
            <el-row>
                <el-form-item label="手机" prop="phone">
                    <el-col :span="8">
                        <el-input v-model="form.phone" placeholder="请输入手机" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 电子邮箱 -->
            <el-row>
                <el-form-item label="电子邮箱" prop="email">
                    <el-col :span="8">
                        <el-input v-model="form.email" placeholder="请输入电子邮箱" :disabled="isReadOnly"></el-input>
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
            <!-- 个性签名 -->
            <el-row>
                <el-form-item label="个性签名" prop="sign">
                    <el-col :span="10">
                        <el-input type="textarea" v-model="form.sign" placeholder="请输入个性签名" :disabled="isReadOnly"></el-input>
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
import { baseInfo, userIdentity } from '@/js/getUserInfo.js'
import { requestBaseClaszSelect, addStudent, requestStudentDetail, modifyStudent } from '@/service/admin_base.js'
import regionSchoolSelect from '@/components/common/select/region-school_select.vue'
export default {
    name: 'studentManageAdd',
    data() {
        const validateUserName = (rule, value, callback) => {
            const regular = /(^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$)|(^[a-zA-Z]+((\.|\s|·|-|=)[a-zA-Z]+)*$)/
            if (value === '') {
                callback(new Error(`请输入真实姓名`))
            } else if (!regular.test(value)) {
                callback(new Error(`您输入的真实姓名格式不正确`))
            } else {
                callback()
            }
        }
        var validatePhone = (rule, value, callback) => {
            let regular = /^[1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8}$/;
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else if (!regular.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        }
        var validateEmail = (rule, value, callback) => {
            let regular = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (value === '') {
                callback(new Error('请输入电子邮箱'));
            } else if (!regular.test(value)) {
                callback(new Error('请输入正确格式的电子邮箱'));
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
            identity: userIdentity,
            // 表单数据
            form: {
                account: '',        // 账号
                pwd: '',            // 密码
                name: '',           // 姓名
                sex: '',            // 性别
                certiType: '26',      // 证件类型
                certiNum: '',       // 证件号码
                schoolId: userIdentity == 'school'? baseInfo[userIdentity].id : '',       // 学校ID
                gradeId: '',        // 年级
                classId: '',        // 所在班级
                interest: [],       // 兴趣
                phone: '',          // 联系电话
                email: '',          // 电子邮箱
                address: '',        // 地址
                sign: ''            // 个性签名
            },
            schoolList: [],         // 所属学校列表
            gradeList: [],
            claszList: [],          // 所在班级
            // 表单校验提示
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 4, max: 16, message: '请输入 4 到 16 位字符的账号', trigger: 'change' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change' }
                ],
                name: [
                    { validator: validateUserName, required: true, trigger: 'change' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                certiType: [
                    { required: true, message: '请选择证件类型', trigger: 'change' }
                ],
                certiNum: [
                    { validator: validateIDCode, required: true, trigger: 'change' }
                ],
                schoolId: [
                    { required: true, message: '请选择所属学校', trigger: 'blur' }
                ],
                classId: [
                    { required: true, message: '请选择所在班级', trigger: 'change' }
                ],
                interest: [
                    { type: 'array', message: '请选择兴趣', trigger: 'change' }
                ],
                phone: [
                    { validator: validatePhone, required: true, trigger: 'change' }
                ],
                email: [
                    { validator: validateEmail, required: true, trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入联系地址', trigger: 'change' }
                ],
                sign: [
                    { message: '请输入个性签名', trigger: 'blur' },
                    { max: 100, message: '不超过100字符', trigger:'change' }
                ]
            },
            disabled: false,      //是否禁用不能修改的选项
            isReadOnly: false
        }
    },
    computed: {
        ...mapState('dictionaryCommon', {
            idTypeList (state) {
                let dicList = (state['certiTypeDicList'] || {}).dicList || []
                return dicList
            },
            sexList (state) {
                let dicList = (state['sexDicList'] || {}).dicList || []
                return dicList.filter(x => x.option);
            },
            interestList (state) {
                let dicList = (state['technicalClassificationDicList'] || {}).dicList || []
                return dicList
            }
        })
    },
    methods: {
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        //获取学生详情
        getStudentDetail(){
            requestStudentDetail({id: this.form.id}).then((res) => {
                if (res.data.code === 200) {
                    let datas = res.data.entity;
                    let _form = {};
                    _form.region = [datas.provinceId, datas.cityId, datas.areaId]
                    _form.account = datas.account;
                    _form.name = datas.name;
                    _form.sex = datas.sex;
                    _form.certiType = datas.certiType;
                    _form.certiNum = datas.certiNum;
                    _form.schoolId = datas.schoolId;
                    _form.gradeId = datas.gradeId;
                    _form.classId = datas.classId;
                    _form.interest = datas.interest ? datas.interest.split(',') : [];
                    _form.phone = datas.phone;
                    _form.email = datas.email;
                    _form.address = datas.address;
                    _form.sign = datas.sign;
                    _form.id = datas.id;
                    this.$set(this.$data, 'form', _form);
                    this.getClaszList()
                }
            })
        },
        // 所属学校改变
        changeSchool(item) {
            this.$set(this.$data.form, 'schoolId', item.id);
            this.getClaszList();
        },
        // 所属班级改变，设置年级
        changeClasz(val) {
            if(this.claszList.length > 0){
                let item = this.claszList.filter(x => x.id === val)[0];
                this.$set(this.$data.form, 'gradeId', item.gradeId);
            }
        },
        // 获取班级列表
        getClaszList() {
            requestBaseClaszSelect({ schoolId: this.form.schoolId }).then(response => {
                if (response.data.code == 200) {
                    let _data = response.data.entity;
                    this.claszList = _data;
                    // 判断所选主管部门是否在列表, 没有则清空该选项
                    if(!_data.some(x => x.id === this.form.classId)) {
                        this.$set(this.$data.form, 'classId', '');
                    }
                }
            })
        },
        // 提交表单
        onSubmit(formName) {
            console.log(this.form)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = Object.assign({}, this.form);
                    params.interest = this.form.interest.length > 0 ? this.form.interest.join(',') : '';
                    if(this.$route.query.id == undefined){
                        addStudent(params).then( response => {
                            if (response.data.code == 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                })
                                this.$router.go(-1)
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        })
                    }else{
                        delete params.pwd
                        modifyStudent(params).then((res) => {
                            if(res.data.code === 200) {
                                this.showMessage('success','修改成功'),
                                this.$router.go(-1)
                            }else{
                                this.showMessage('error',res.data.msg)
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted() {
        this.getDictComb("technicalClassification")
        this.getDictComb('primarySchool, middleSchool, highSchool').then((res) => {
            this.gradeList = res.dicList
        })
        if (this.$route.path.includes('detail')) {
            this.isReadOnly = true
        }

        if (this.$route.query.id != undefined) {
            this.disabled = true;
            this.$set(this.$data.form,'id',this.$route.query.id);
            this.getStudentDetail()
        }
        if (userIdentity == 'school') {
            this.changeSchool({id: baseInfo[userIdentity].id})
        }
    },
    components: {
        'v-region-school-select': regionSchoolSelect
    }
}
</script>
