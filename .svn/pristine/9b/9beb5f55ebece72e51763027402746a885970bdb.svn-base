<template>
    <div class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 学校编码 -->
            <el-row>
                <el-form-item label="学校编码" prop="identityCode">
                    <el-col :span="8">
                        <el-input v-model="form.identityCode" placeholder="系统随机生成" disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 学校名称 -->
            <el-row>
                <el-form-item label="学校名称" prop="schoolName">
                    <el-col :span="8">
                        <el-input v-model="form.schoolName" placeholder="请输入学校名称"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 学段 -->
            <el-row>
                <el-form-item label="学段" prop="schoolType">
                    <el-col :span="8">
                        <el-checkbox-group v-model="form.schoolType">
                            <el-checkbox v-for="item in learningStages" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 所属区域 -->
            <el-row v-if="identity=='education' || identity=='admin'">
                <el-form-item label="所属区域" prop="region">
                    <el-col :span="8">
                        <v-region-select :defaultItems="region" class="select-region" @region="changeRegion" :isAdmin="true"></v-region-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 主管部门 -->
            <el-row v-if="identity=='education' || identity=='admin'">
                <el-form-item label="主管部门" prop="departmentId">
                    <el-col :span="8">
                        <el-select v-model="form.departmentId" placeholder="请选择主管部门">
                            <el-option v-for="item in departmentList" :label="item.eduName" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 联系人 -->
            <el-row>
                <el-form-item label="联系人" prop="linkName">
                    <el-col :span="8">
                        <el-input v-model="form.linkName" placeholder="请输入联系人" ></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 联系电话 -->
            <el-row>
                <el-form-item label="联系电话" prop="phone">
                    <el-col :span="8">
                        <el-input v-model="form.phone" placeholder="请输入联系电话" ></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 传真 -->
            <el-row>
                <el-form-item label="传真" prop="fax">
                    <el-col :span="8">
                        <el-input v-model="form.fax" placeholder="请输入传真" ></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 电子邮箱 -->
            <el-row>
                <el-form-item label="电子邮箱" prop="email">
                    <el-col :span="8">
                        <el-input v-model="form.email" placeholder="请输入电子邮箱" ></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 地址 -->
            <el-row>
                <el-form-item label="地址" prop="address">
                    <el-col :span="8">
                        <el-input v-model="form.address" placeholder="请输入地址" ></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 学校简介 -->
            <el-row>
                <el-form-item label="学校简介" prop="remark">
                    <el-col :span="10">
                        <el-input type="textarea" v-model="form.remark" placeholder="请输入学校简介"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-form-item>
                <button class="bs-form-button i-form-button" type="button" @click="onSubmit('form')">保存</button>
                <button class="bs-form-button i-form-button is-plain" type="button" @click="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'Vuex'
import { baseInfo, userIdentity } from '@/js/getUserInfo.js'
import { requestBaseEduSelect, addSchool, requestSchoolDetail, modifySchool } from '@/service/admin_base.js'
import regionSelect from '@/components/common/select/region_select.vue'
export default {
    name: 'schoolManageAdd',
    data() {
        var validatePhone = (rule, value, callback) => {
            let regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/;
            if (value === '') {
                callback(new Error('请输入联系电话'));
            } else if (!regular.test(value)) {
                callback(new Error('请输入正确格式的联系电话'));
            } else {
                callback();
            }
        };
        var validateFax = (rule, value, callback) => {
            let regular = /^(\d{3,4}-)?\d{7,8}$/;
            if (value === '') {
                callback(new Error('请输入传真号'));
            } else if (!regular.test(value)) {
                callback(new Error('请输入正确格式的传真号'));
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
        return {
            identity: userIdentity,
            // 表单数据
            form: {
                id: null,
                identityCode: '',
                schoolName: '',         // 学校名称
                schoolType: [],         // 学段
                primarySchoolSystem: 6, // 学制 - 小学
                juniorSchoolSystem: 3,  // 学制 - 初中
                seniorSchoolSystem: 3,  // 学制 - 高中
                region: [],             // 所属区域
                departmentId: '',       // 主管部门
                linkName: '',       // 联系人
                phone: '',          // 联系电话
                fax: '',            // 传真
                email: '',          // 电子邮箱
                address: '',        // 地址
                remark: ''          // 学校简介
            },
            region: [],
            learningStages: [], // 学段列表
            departmentList: [], // 主管部门列表
            // 表单校验提示
            rules: {
                schoolName: [
                    { required: true, message: '请输入学校名称', trigger: 'blur' },
                    { max: 20, message: '不超过20字符', trigger: 'change' }
                ],
                schoolType: [
                    { type: 'array', required: true, message: '请至少选择1个学段', trigger: 'change' }
                ],
                region: [
                    { type: 'array', required: true, message: '请选择所属区域', trigger: 'blur' }
                ],
                departmentId: [
                    { required: true, message: '请选择主管部门', trigger: 'change' }
                ],
                linkName: [
                    { required: true, message: '请输入联系人', trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, required: true, trigger: 'blur' }
                ],
                fax: [
                    { validator: validateFax, required: true, trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, required: true, trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入联系地址', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '请输入学校简介', trigger: 'blur' }
                ],
            }
        }
    },
    computed: {
        submitForm: function() {
            let _submitForm = Object.assign({}, this.form);
            delete _submitForm.identityCode;
            delete _submitForm.region;
            if (this.form.id == null) {
                delete _submitForm.id;
            }
            _submitForm.schoolType = this.form.schoolType.sort().reverse().join(',');    // 学段
            _submitForm.primarySchoolSystem = this.form.schoolType.includes('primarySchool') ? 6 : '';      // 学制 - 小学
            _submitForm.juniorSchoolSystem  = this.form.schoolType.includes('middleSchool') ? 3 : '';       // 学制 - 初中
            _submitForm.seniorSchoolSystem  = this.form.schoolType.includes('highSchool') ? 3 : '';         // 学制 - 高中
            // 所属区域
            let [_province = '', _city = '', _area = ''] = this.form.region;
            _submitForm.provinceId = _province;
            _submitForm.cityId     = _city;
            _submitForm.areaId     = _area;
            // 主管部门 (对应所属区域有值则填无值则空)
            // _submitForm.eduProvinceId = _province === '' ? '' : this.form.departmentId;
            // _submitForm.eduCityId     = _city     === '' ? '' : this.form.departmentId;
            _submitForm.eduAreaId     = _area     === '' ? '' : this.form.departmentId;
            return _submitForm;
        }
    },
    methods: {
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        // 获取学校详情
        getSchoolDetail() {
            requestSchoolDetail({id: this.form.id}).then(response => {
                if (response.data.code == 200) {
                    let details = response.data.entity;
                    let _form = {};
                    _form.region = [details.provinceId, details.cityId, details.areaId]
                    this.$set(this.$data,'region',_form.region)
                    _form.id = details.id;
                    _form.identityCode = details.identityCode;
                    _form.schoolName = details.schoolName;
                    _form.schoolType = details.schoolType.split(',');
                    _form.departmentId = details.eduAreaId || details.eduCityId || details.eduProvinceId;
                    _form.linkName = details.linkName;
                    _form.phone = details.phone;
                    _form.fax = details.fax;
                    _form.email = details.email;
                    _form.address = details.address;
                    _form.remark = details.remark;
                    this.$set(this.$data, 'form', _form);
                }

            })
        },
        // 获取主管部门列表
        getDepartmentList() {
            let params = {}
            params.provinceId = this.submitForm.provinceId
            params.cityId     = this.submitForm.cityId
            params.areaId     = this.submitForm.areaId
            requestBaseEduSelect(params).then(response => {
                if (response.data.code == 200) {
                    let _data = response.data.appendInfo.comboxList;
                    this.departmentList = _data;
                    if (_data.length === 1) {
                        // 列表只有一个则默认选中
                        this.$set(this.$data.form, 'departmentId', _data[0].id);
                    } else if (!_data.some(x => x.id === this.form.departmentId)) {
                        // 判断所选主管部门是否在列表, 没有则清空该选项
                        this.$set(this.$data.form, 'departmentId', '');
                    }
                }
            })
        },
        // 所属地区改变
        changeRegion(val) {
            this.$set(this.$data.form, 'region', val)
            this.getDepartmentList()
        },
        // 提交表单
        onSubmit(formName) {
            // return
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.form.id == null) { // 添加
                        addSchool(this.submitForm).then( response => {
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
                    } else {                    // 修改
                        modifySchool(this.submitForm).then( response => {
                            if (response.data.code == 200) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                })
                                this.$router.go(-1)
                            } else {
                                this.$message.error(response.data.msg)
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
        this.getDictComb("periodKey").then(res => {
            this.learningStages = res.dicList;
        })

        let _id = this.$route.query.id;
        if(_id != undefined){
            this.$set(this.$data.form, 'id', _id);
            this.getSchoolDetail();
        }
    },
    components: {
        'v-region-select': regionSelect
    }
}
</script>