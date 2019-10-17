<template>
    <div id="add_eduer" class="submit-form backend-content__middle">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 账号 -->
            <el-row>
                <el-form-item label="账号" prop="account">
                    <el-col :span="9">
                        <el-input v-model="form.account" placeholder="请输入账号" :disabled="disabled"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 用户名 -->
            <el-row>
                <el-form-item label="用户名" prop="userName">
                    <el-col :span="9">
                        <el-input v-model="form.userName" placeholder="请输入用户名" :disabled="disabled"></el-input>
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
            <!-- 备注 -->
            <el-row>
                <el-form-item label="备注" prop="remark">
                    <el-col :span="12">
                        <el-input type="textarea" v-model="form.remark" placeholder="请输入备注，最多100字"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row v-if="!isSelf">
                <el-form-item label="权限" prop="permissList">
                    <el-col :span="9" class="tree-box">
                        <h5 class="tree-head">权限列表</h5>
                        <el-tree
                          :data="datas"
                          show-checkbox
                          node-key="id"
                          ref="tree"
                          highlight-current
                          :props="defaultProps"
                          :check-strictly="isCheckStrictly"
                          :filter-node-method="filterNode"
                          @check-change="getPermiss">
                        </el-tree>
                    </el-col>
                    <div style="position:absolute;font-size:12px;bottom:-18%;color:#ff4949;" v-if="noPermiss">
                        请选择权限
                    </div>
                </el-form-item>
            </el-row>
            <el-form-item>
                <button class="bs-form-button i-form-button" type="button" @click.prevent="onSubmit('form')">保存</button>
                <button class="bs-form-button i-form-button is-plain" type="button" @click.prevent="$router.go(-1)">取消</button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { addBaseAdmin, requestAdminDetail, modifyBaseAdmin } from '@/service/admin_base.js'
export default {
    name: 'adminManageAdd',
    data() {
        const validateAccount = (rule, value, callback) => {
            const regular = /^[a-zA-Z0-9_]{6,40}$/
            if (value === '') {
                callback(new Error('请输入账号'))
            } else if (!regular.test(value)) {
                callback(new Error('账号由 6 到 40 位的英文字母、数字、下划线组成'))
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
            // 表单数据
            form: {
                account: '',          //账号
                userName: '',          //用户名
                pwd: '',            // 密码
                remark: '',            //备注
                permissList: []        //权限列表
            },
            datas:[],
            // 表单校验提示
            rules: {
                account: [
                    { validator: validateAccount, required: true, trigger: 'blur' }
                ],
                pwd: [
                    { validator: validatePwd, required: true, trigger: 'change blur' }
                ],
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                remark: [
                    { max: 100, message: '最多输入100字', trigger: 'change' }
                ]
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            noPermiss: false,
            disabled: false,
            isCheckStrictly: true,
            curAccount:'',
            isSelf:false,
        }
    },
    watch:{
        form:{
            handler:function(val,oldVal){
                if(val.permissList.length > 0){
                    this.noPermiss = false
                }
            },
            deep:true
        }
    },
    created(){
        if(this.$route.path.includes('add')){
            this.isCheckStrictly = false;
        };
        if(localStorage.getItem('loginInfo')){
            this.curAccount = JSON.parse(localStorage.getItem('loginInfo')).userInfo.account;
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true
            return !(data.account.indexOf(value) === 'cloud_admin')
        },
        // 获取平台管理员详情
        getDetail() {
            requestAdminDetail({id: this.form.id}).then(res => {
                if (res.data.code == 200) {
                    this.isCheckStrictly = true
                    let details = res.data.entity
                    let _form = {}
                    _form.account = details.account
                    _form.userName = details.userName
                    _form.remark = details.remark
                    _form.permissList = details.permissList
                    _form.id = details.id
                    if (details.account == this.curAccount) {
                        this.isSelf = true
                    }
                    this.$refs.tree.setCheckedKeys(details.permissList);
                    this.$set(this.$data, 'form', _form);
                    this.isCheckStrictly = !this.isCheckStrictly;
                } else {
                    this.showMessage('error',res.data.msg)
                }
            })
        },
        //权限勾选
        getPermiss(){
            this.form.permissList = [];
            let arr = [];
            let _data = this.$refs.tree.getCheckedNodes()
            for(let i = 0; i < _data.length; i++){
                arr.push(_data[i].pid);
                arr.push(_data[i].id);
            };
            this.form.permissList = [...new Set(arr)];
        },
        // 提交表单
        onSubmit(formName) {
            if(!this.form.permissList.length > 0){
                this.noPermiss = true;
            };
            this.$refs[formName].validate((valid) => {
                if (valid && !this.noPermiss) {
                    if (this.form.id == null) { // 添加
                        addBaseAdmin(this.form).then( response => {
                            if (response.data.code == 200) {
                                this.showMessage('success','添加成功')
                                this.$router.go(-1);
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        })
                    }else{
                        delete this.form.pwd
                        modifyBaseAdmin(this.form).then( response => {
                            if (response.data.code == 200) {
                                this.showMessage('success','修改成功')
                                this.$router.go(-1);
                            } else {
                                this.$message.error(response.data.msg);
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
        if(localStorage.getItem('bs-permission')){
            this.datas = JSON.parse(localStorage.getItem('bs-permission')).children
        }
        if(localStorage.getItem('baseInfo')){
            let baseInfo = JSON.parse(localStorage.getItem('baseInfo'))
        }
        let _id = this.$route.query.id
        if(_id != undefined) {
            this.$set(this.form, 'id', _id)
            this.disabled = true
            this.getDetail()
        };
    },
}
</script>

<style lang="scss" scoped>
    .tree-box{
        .tree-head{
            border: 1px solid #c9c9c9;
            border-bottom: none;
            background-color: #f6f6f6;
            padding-left: 10px;
        }
    }
</style>
