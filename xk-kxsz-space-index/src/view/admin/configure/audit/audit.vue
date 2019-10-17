<template>
    <div class="backend-content__middle" id="configureAudit">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.name" @keyup.native.enter="changePage(1)" placeholder="请输入流程名称"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <button class="bs-screening-button bs-handle-button" :class="{'isDropdowm': screeningDropdown }" @click="screeningDropdown=!screeningDropdown"></button>
            <div v-show="screeningDropdown" class="bs-screening_wrap">
                <el-form :inline="true" :model="search" class="bs-screening_box">
                    <el-form-item label="流程类型">
                        <el-select v-model="search.auditType" placeholder="请选择流程类型" filterable clearable>
                            <el-option v-for="item in form.auditType.options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发起人">
                        <el-select v-model="search.sponsorIdentity" placeholder="请选择发起人" filterable clearable>
                            <el-option v-for="item in form.roles.options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="bs-screening-btn">
                    <button type="button" @click='changePage(1)'>确定</button> | <button type="button" @click='resetSearchForm'>取消</button>
                </div>
            </div>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            add: { callback: add },
            del: { callback: del }
        }"></v-admin-operate>
        <!-- 评论列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width:100%" ref="multipleTable" @selection-change="changeChecked">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="流程类型" show-overflow-tooltip width="150">
                <template scope="scope">
                    {{scope.row.auditType | translate(auditTypeDL)}}
                </template>
            </el-table-column>
            <el-table-column label="流程名称" show-overflow-tooltip prop="name"></el-table-column>
            <el-table-column label="发起角色" show-overflow-tooltip width="120">
                <template scope="scope">
                    {{scope.row.sponsorIdentity | translate(identityDL)}}
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="流程节点" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.auditPersonTp | translate(identityDL)}}
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { callback: edit },
                        del: { callback: del }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog :visible.sync="addPopup" size="tiny" title="审核流程" @close="clearForm" lock-scroll>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="流程类型" prop="type">
                    <el-col :span="20">
                        <el-select v-model="form.auditType.value" placeholder="请选择流程类型" style="width:100%;">
                            <el-option v-for="item in form.auditType.options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="流程名称" prop="name">
                    <el-col :span="20">
                        <el-input v-model="form.name" placeholder="请输入流程名称"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="发起角色" prop="role">
                    <el-col :span="20">
                        <el-select v-model="form.roles.value" placeholder="请选择发起角色" style="width:100%;">
                            <el-option v-for="item in form.roles.options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="是否审核" prop="isAudit">
                    <el-col :span="20">
                        <el-radio-group v-model="form.isAudit" :disabled="isMaxLevel">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="流程节点" prop="node" v-if="form.nodes.options.length && ifNotAudit">
                    <el-col :span="20">
                        <el-checkbox-group v-model="form.nodes.value">
                            <el-checkbox v-for="(item, index) in form.nodes.options" :key="item.id" :label="item.name" :value="item.id" @change="handleCheckedChange(index, item.name)" style="margin-left:0;margin-right:10px;" :disabled="form.nodes.options[index].disabled"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-col :span="20">
                        <el-input type="textarea" placeholder="请输入内容" v-model="form.remark" resize='none'></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="i-form-button" @click="submit('form')">{{form.id?'保存':'添加'}}</el-button>
                    <el-button class="i-form-button is-plain" @click='addPopup = !addPopup'>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import delPopover from '@/components/common/del_popover.vue'
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { auditList, auditAdd, auditDel, auditDetail, auditmodify } from '@/service/admin_configure.js'
    import dataTranslation from '@/js/dataTranslation.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    import { mapState } from 'Vuex'
    export default {
        name: 'configureAudit',
        components: {
            'v-pagination': pagination,
            'del-popover': delPopover,
            'v-admin-operate': adminOperate
        },
        mixins: [subPermission, setPage], // 混入
        data() {
            // 新增 - 类型规则
            var typeRule = (rule, value, callback) => {
                if (!this.form.auditType.value) {
                    return callback(new Error('请选择流程类型'));
                }else {
                    callback()
                }
            }
            // 新增 - 流程节点规则
            var nodeRule = (rule, value, callback) => {
                if (!(this.form.nodes.value.length != 0) ) {
                    return callback(new Error('请选择流程节点'));
                }else {
                    callback()
                }
            }
            // 新增 - 发起角色规则
            var roleRule = (rule, value, callback) => {
                if (!this.form.roles.value) {
                    return callback(new Error('请选择发起角色'));
                }else {
                    callback()
                }
            }
            return {
                flag: true,
                search: {
                    name: '',
                    sponsorIdentity: '',
                    auditType: ''
                },
                // 高级筛选开关
                screeningDropdown: false,
                items: [], // 列表数据
                // 选中
                checkedItems: [], // 新增弹框选中
                nodeList: [], // 新增流程节点选中
                // 添加弹框
                addPopup: false,
                // 表单数据
                form: {
                    id: null,
                    auditType : {
                        value: '',
                        options: [
                            { id: '1', code: '1', name: '项目' },
                            { id: '2', code: '2', name: '课程' },
                            { id: '3', code: '3', name: '活动' },
                            { id: '4', code: '4', name: '作品' },
                            { id: '5', code: '5', name: '资源' },
                            { id: '6', code: '6', name: '兴趣组' },
                            { id: '7', code: '7', name: '导师工作室' },
                            { id: '8', code: '8', name: '案例' },
                            { id: '9', code: '9', name: '校级课题' },
                            { id: '10', code: '10', name: '县级课题' },
                            { id: '11', code: '11', name: '市级课题' },
                            { id: '12', code: '12', name: '省级课题' },
                            { id: '13', code: '13', name: '国家级课题' },
                            { id: '14', code: '14', name: '服务' },
                            { id: '15', code: '15', name: '需求' },
                            { id: '16', code: '16', name: '故事' },
                            { id: '17', code: '17', name: '商业策划' }
                        ]
                    },
                    name: '',
                    remark: '',
                    roles: {
                        value: '',
                        options: [
                            { id: '1', code: '1', name: '教师' },
                            { id: '0', code: '0', name: '学生' },
                            { id: '9', code: '9', name: '学校管理员' },
                            { id: '7', code: '7', name: '区县管理员' },
                            { id: '6', code: '6', name: '市级管理员' },
                            { id: '10', code: '10', name: '省厅管理员' },
                            { id: '2', code: '2', name: '投资人' },
                            { id: '3', code: '3',name: '投资机构' },
                            { id: '4', code: '4', name: '企业' },
                            { id: '5', code: '5', name: '云后台管理员' },
                            { id: '11', code: '11', name: '众创空间' }
                        ]
                    },
                    nodes: {
                        value: [],
                        options: [
                            { id: '9', name: '学校' },
                            { id: '7', name: '区县教育局' },
                            { id: '6', name: '市级教育局' },
                            { id: '10', name: '省级教育局' },
                            { id: '5', name: '云后台管理员' }
                        ]
                    },
                    // 是否审核
                    isAudit: null
                },
                // 表单验证规则
                rules: {
                    type: [
                        { validator: typeRule, trigger: 'change', required: true }
                    ],
                    name: [
                        { trigger: 'blur', required: true, message: '请输入流程名称' }
                    ],
                    role: [
                        { validator: roleRule, trigger: 'change', required: true }
                    ],
                    node: [
                        { validator: nodeRule, trigger: 'change', required: true }
                    ],
                    isAudit: [
                        { trigger: 'change blur', required: true, type:'number', message: '请选择是否审核' }
                    ]
                },
                // 表格选中列
                checkList: [],
                isMaxLevel: false
            }
        },
        mounted() {
            this.getData()
        },
        computed: {// 翻译
            ...mapState('dictionaryCommon', {
                auditTypeDL (state) {
                    let dicList = (state['auditTypeDicList'] || {}).dicList || []
                    return dicList
                },
                identityDL (state) {
                    let dicList = (state['identityDicList'] || {}).dicList || []
                    return dicList
                },
                auditProcessNodeDL (state) {
                    let dicList = (state['auditProcessNodeDicList'] || {}).dicList || []
                    return dicList
                }
            }),
            ifNotAudit () {
                if(this.form.isAudit) {
                    return true
                }else {
                    return false
                }
            }
        },
        methods: {
            // 改变选中项
            handleCheckedChange(index, name) {
                this.clear()
                if(name !== '云后台管理员') {
                    for( let i = 0; i <= index; i++ ) {
                        this.form.nodes.value.push(this.form.nodes.options[i].name)
                        this.nodeList.push({ auditIdentity : this.form.nodes.options[i].id, sort : i + 1 })
                    }
                }else {
                    if(!this.flag) {
                        console.log(1)
                        this.flag = true
                        if(this.form.nodes.options.length !== 1) {
                            for( let i = 0; i <= index - 1; i++ ) {
                                this.form.nodes.options[i].disabled = true
                                this.form.nodes.value.push(this.form.nodes.options[index].name)
                            }
                            this.nodeList.push({ auditIdentity : this.form.nodes.options[index].id, sort : 1 })
                        }else {
                            this.form.nodes.value.push(this.form.nodes.options[index].name)
                            this.nodeList.push({ auditIdentity : this.form.nodes.options[index].id, sort : 1 })
                        }
                    }else {
                        console.log(2)
                        this.flag = false
                        for( let i = 0; i <= index - 1; i++ ) {
                            this.form.nodes.options[i].disabled = false
                        }
                        this.clear()
                    }
                }
            },
            resetSearchForm() {
                this.search = Object.assign({}, this._search, { name: this.search.name })
                this.screeningDropdown = false
            },
            clearForm () {
                let form = this.form
                form.id = null
                form.auditType.value = ''
                form.name = ''
                form.remark = ''
                form.roles.value = ''
                form.nodes.value = [],
                form.isAudit = null
                this.ifNotAudit = true
                this.$refs['form'].resetFields()
            },
            // 新增、修改提交
            submit (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let form = this.form,
                            handle = this.form.id ? auditmodify : auditAdd,
                            handleText = this.form.id ? '修改' : '添加'
                        let param = {
                            auditType: form.auditType.value,
                            name: form.name,
                            remark: form.remark,
                            sponsorIdentity: form.roles.value,
                            list: this.nodeList,
                            isAudit: form.isAudit
                        }
                        if(form.id) {
                            param.id = form.id
                        }
                        handle(param).then(res => {
                            if(res.data.code === 200) {
                                this.$message({
                                    message: `${handleText}成功`,
                                    type: 'success'
                                })
                                this.getData()
                            } else {
                                this.$message.error({ message: res.data.msg })
                            }
                        })
                        this.addPopup = false
                    } else {
                        return false;
                    }
                });
            },
            // 添加弹框
            add () {
                this.addPopup = true
                this.flag = false
            },
            // 修改
            edit (item) {
                if(item.data){
                    auditDetail( { id: item.data.id } ).then(res => {
                        res = res.data.entity
                        let form = this.form,
                            arr,
                            _this = this
                        form.name = res.name
                        form.roles.value = res.sponsorIdentity
                        form.remark = res.remark
                        form.id = res.id
                        form.isAudit = Number(res.isAudit)
                        form.auditType.value = res.auditType
                        if(res.auditPersonTp != null){
                            arr = res.auditPersonTp.split(',')
                            setTimeout(() => {
                                for( let i = 0; i <= arr.length - 1; i++ ) {
                                    form.nodes.value.push(form.nodes.options[i].name)
                                    _this.nodeList.push({ auditIdentity : form.nodes.options[i].id, sort : i + 1 })
                                }
                                if(arr[0].includes('5')) {
                                    form.nodes.value = ['云后台管理员']
                                }
                            }, 0)
                        }
                        this.flag = true
                    })
                }
                this.addPopup = true
            },
            // 删除
            del (item) {
                if(item.data.id || this.checkList.length) {
                    this.$confirm('此操作将永久删除该流程，是否继续？', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                        let paramDate = []
                        if(item.index != undefined) {
                            paramDate.push({ id: item.data.id })
                        }else {
                            this.checkList.forEach(i => paramDate.push({id: i.id}))
                        }
                        auditDel(paramDate).then(res => {
                            if(res.data.code == 200) {
                                this.getData()
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                })
                            }
                        })
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });
                    });
                }else {
                    this.$message({message: '请选择要删除的流程'})
                }
            },
            /*
             * 获取列表
             */
            getData() {
                auditList( this.search, this.pageParam ).then(response => {
                    if (response.data.entity) {
                        this.items = response.data.entity.resultData;
                        this.$set(this.pageParam, 'totalNum', response.data.entity.totalNum);
                    }
                })
            },
            // 改变分页
            changePage(val) {
                this.setPageNum(val)
                this.getData()
            },
            changeSize(val) {
                this.setPageSize(val)
                this.getData()
            },
            // 表格选中改变
            changeChecked (item) {
                this.checkList = item
            },
            // 新增清除之前选的
            clear() {
                this.form.nodes.value.splice(0, this.form.nodes.value.length)
                this.nodeList.splice(0, this.nodeList.length)
            }
        },
        watch: {
            'form.roles.value' (val, oldVal) {
                this.isMaxLevel = false
                if (this.form.isAudit==null) {
                    this.form.isAudit = 0
                }
                switch (val) {
                    case '1':
                    case '0':
                        this.form.nodes.options = [
                            { id: '9', name: '学校' },
                            { id: '7', name: '区县教育局' },
                            { id: '6', name: '市级教育局' },
                            { id: '10', name: '省级教育局' },
                            { id: '5', name: '云后台管理员' }
                        ]
                        this.clear()
                        break;
                    case '9':
                        this.form.nodes.options = [
                            { id: '7', name: '区县教育局' },
                            { id: '6', name: '市级教育局' },
                            { id: '10', name: '省级教育局' },
                            { id: '5', name: '云后台管理员' }
                        ]
                        this.clear()
                        break;
                    case '7':
                        this.form.nodes.options = [
                            { id: '6', name: '市级教育局' },
                            { id: '10', name: '省级教育局' },
                            { id: '5', name: '云后台管理员' }
                        ]
                        this.clear()
                        break;
                    case '6':
                        this.form.nodes.options = [
                            { id: '10', name: '省级教育局' },
                            { id: '5', name: '云后台管理员' }
                        ]
                        this.clear()
                        break;
                    case '2':
                    case '3':
                    case '4':
                    case '11':
                        this.form.nodes.options = [
                            { id: '5', name: '云后台管理员' }
                        ]
                        this.clear()
                        break;
                    case '5':
                    case '10':
                        this.form.nodes.options = []
                        this.form.isAudit = 0
                        this.isMaxLevel = true
                        this.clear()
                        break;
                }
            },
            addPopup: {
                handler: function(val, oldVal) {
                    if (val) {

                    }
                },
                deep:true
            }
        }
    }
</script>
