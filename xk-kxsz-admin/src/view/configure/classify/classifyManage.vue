<template>
    <div class="backend-content__middle" id="configureClassify">
        <section class="option-box clearfix">
            <el-select v-model="searchModel" placeholder="请选择类型" style="width:210px;">
                <el-option v-for="item in searchList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <!-- 搜索 -->
           <!--  <el-input class="fl bs-search-input" v-model="search" placeholder="请输入分类名称"></el-input> -->
            <button type="button" class="bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
            <!-- 状态 -->
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            add: { callback: add },
            del: { callback: del }
        }"></v-admin-operate>
        <!-- 评论列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeChecked">
            <!-- <el-table-column type="selection" width="50"></el-table-column> -->
            <el-table-column label="分类名称" show-overflow-tooltip prop="name"></el-table-column>
            <el-table-column label="类型" show-overflow-tooltip width="120">
                <template scope="scope">
                    {{modelList[scope.row.model]}}
                </template>
            </el-table-column>
            <el-table-column label="状态" show-overflow-tooltip width="120">
                <template scope="scope">
                    {{statusName[scope.row.status]}}
                </template>
            </el-table-column>
            <el-table-column prop="level" label="层级" show-overflow-tooltip></el-table-column>
            <el-table-column prop="parentName" label="父级" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { callback: edit },
                        del: { callback: del }
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog :visible.sync="addPopup" class="add-classify" title="分类" @close="clearForm">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="分类名称" prop="name">
                    <el-col :span="20">
                        <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
                    </el-col>
                </el-form-item>
                <el-row>
                    <el-form-item label="排序" prop="sorts">
                        <el-col :span="20">
                            <el-input placeholder="请输入排序" v-model.number="form.sorts"></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-form-item label="类型" prop="model">
                    <el-col :span="20">
                        <el-select v-model="form.model" placeholder="请选择分类类型" style="width:100%;">
                            <el-option v-for="item in classifyOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="层级" prop="level">
                    <el-col :span="20">
                        <el-select v-model="form.level" @change="levelChange" placeholder="请选择层级" style="width:100%;">
                            <el-option v-for="item in levelOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="父领域" prop="parentSelect" v-if="isSub">
                    <el-col :span="20">
                        <el-cascader
                            :options="parentList"
                            placeholder="选择父领域"
                            v-model="parentSelect"
                            @change="selectedParent"
                            style="width:100%;"
                            :clearable="true"
                            :change-on-select="true"
                            :show-all-levels="false"
                            :props="{value:'id', label: 'name', children: 'children'}">
                        </el-cascader>
                    </el-col>
                </el-form-item>
                <el-form-item label="状态">
                    <el-col :span="20">
                        <el-radio-group v-model="form.status">
                            <el-radio :label="1" :key="1">启用</el-radio>
                            <el-radio :label="2" :key="2">停用</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="i-form-button" @click="submit('form')">确定</el-button>
                    <el-button class="i-form-button is-plain" @click='addPopup = !addPopup'>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '@/components/common/admin_pagination.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestClassifyList, addClassify,delClassify,requestClassifyDetail,modifyClassify,requestPubSearchCombox } from '@/service/admin_configure.js'
    import { requestDictComb } from '@/service/common.js'
    import dataTranslation from 'Asset/js/dataTranslation.js'
    import adminOperate from '@/components/common/operate.vue'
    import { mapState } from 'Vuex'
    export default {
        name: 'configureClassify',
        components: {
            'v-pagination': pagination,
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
                search: '', // 搜索
                items: [], // 列表数据
                // 选中
                checkedItems: [], // 新增弹框选中
                nodeList: [], // 新增流程节点选中
                // 添加弹框
                addPopup: false,
                // 表单数据
                form: {
                    id: null,
                    name: '',
                    status: '',
                    model:'',
                    level:  '',
                    sorts:'',
                    parentId:'',
                },
                classifyOptions: [],
                levelOptions: [],
                // 表单验证规则
                rules: {
                    name: [
                        { trigger: 'blur', required: true, message: '请输入分类名称' },
                        { max: 30, message: '不超过30个字符', trigger: 'change'  }
                    ],
                    model: [
                        { message:'请选择类型', trigger: 'change', required: true }
                    ],
                    level: [
                        { message:'请选择层级', trigger: 'change', required: true }
                    ],
                    // status: [
                    //     { required: true, message:'请选择状态' }
                    // ],
                    sorts: [
                        { required: true, message: '请输入排序' },
                        { type: 'number', message: '排序必须为数字值', trigger: 'change' }
                    ]
                },
                // 表格选中列
                checkList: [],
                //类型
                modelList:{
                    'project':'项目',
                    'course':'课程',
                    'activity':'活动',
                    'resource':'资源',
                    'subject':'课题',
                    'interest':'兴趣组',
                    'works':'作品'
                },
                //状态
                statusName:{
                    1:'启用',
                    2:'禁用'
                },
                isSub:false,   //判断是否是子领域
                parentList:[],
                parentSelect:[],
                searchModel:null,
                searchList:[
                    { id:'',name:'全部类型' },
                    { id:'project',name:'项目' },
                    { id:'course',name:'课程' },
                    { id:'activity',name:'活动' },
                    { id:'resource',name:'资源' },
                    { id:'subject',name:'课题' },
                    { id:'interest',name:'兴趣组' },
                    { id:'works',name:'作品' },
                ]
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
            })
        },
        methods: {
            /*获取领域分类数据*/
            getClassify(){
                requestDictComb({groupCode:'pubtype'}).then((res) => {
                    if(res.data.code == 200){
                        this.classifyOptions = res.data.entity.dicList
                    }
                })
            },
            /*获取层级数据*/
            getLevel(){
                requestDictComb({groupCode:'publevel'}).then((res)  => {
                    if(res.data.code == 200){
                        this.levelOptions = res.data.entity.dicList
                    }
                })
            },
            deleteChild(data) {
                for(let i in data){
                    if(data[i].children.length == 0) {
                        delete data[i].children
                    } else if (data[i].children !== undefined) {
                        this.deleteChild(data[i].children)
                    }
                }
            },
            // 层级改变
            levelChange(val){
                if(val == '子领域' && this.form.model != ''){
                    this.isSub = true;
                    requestPubSearchCombox({model:this.form.model}).then((res) => {
                        if(res.data.code == 200){
                            this.deleteChild(res.data.appendInfo.list)
                            this.parentList = Object.assign([], res.data.appendInfo.list);
                        }
                    })
                }else{
                    this.isSub = false;
                    this.parentSelect = [];
                }
            },
            // 选择父领域
            selectedParent(val){
            },
            clearForm () {
                let form = this.form
                form.id = null
                form.model = ''
                form.name = ''
                form.remark = ''
                form.level = ''
                form.sorts = ''
                form.status = ''
                this.parentSelect = []
            },
            // 新增、修改提交
            submit (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let form = this.form
                        let param = {
                            model: form.model,
                            name: form.name,
                            status: form.status,
                            level: this.parentSelect.length == 0 ? '领域' : this.form.level,
                            sort:this.form.sorts,
                            parentId:this.parentSelect.length == 0 ? -1 : this.parentSelect[this.parentSelect.length -1]
                        }
                        if(form.id == null) {
                            addClassify(param).then(res => {
                                if(res.data.code == 200) {
                                    this.$message({
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    this.getData()
                                    this.addPopup = false
                                }else{
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        }else {
                            param.id = form.id
                            modifyClassify(param).then(res => {
                                if(res.data.code === 200) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.getData();
                                    this.addPopup = false;
                                }else{
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                });
            },
            // 添加弹框
            add () {
                this.getClassify();
                this.getLevel();
                this.addPopup = true;
            },
            // 修改
            edit (item) {
                if(item.data){
                    requestClassifyDetail( { id: item.data.id } ).then(res => {
                        if(res.data.code == 200){
                            res = res.data.entity
                            let _form = this.form;
                            _form.name = res.name;
                            _form.model = res.model;
                            _form.level = res.level;
                            _form.status = res.status;
                            _form.id = res.id;
                            _form.sorts = res.sort;
                            _form.parentId = res.parentId;
                        }
                    })
                }
                this.addPopup = true
            },
            // 删除
            del (item) {
                let paramDate = {id:item.data.id};
                this.$confirm('确定要删除该分类吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: '__custom-msg-box'
                }).then(() => {
                    delClassify(paramDate).then(res => {
                        if(res.data.code == 200) {
                            this.getData()
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({message: '取消删除'})
                });
            },
            /*
             * 获取列表
             */
            getData() {
                requestClassifyList( {model:this.searchModel}, this.pageParam ).then(response => {
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
            // 改变选中项
            handleCheckedChange(index) {
                this.clear()
                for( let i = 0; i <= index; i++ ) {
                    this.form.nodes.value.push(this.form.nodes.options[i].name)
                    this.nodeList.push({ auditIdentity : this.form.nodes.options[i].id, sort : i + 1 })
                }
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
                switch (val) {
                    case '1':
                    case '0':
                    this.form.nodes.options = [
                        { id: '9', name: '学校' },
                        { id: '7', name: '区县教育局' },
                        { id: '6', name: '市级教育局' },
                        { id: '10', name: '省级教育局' }
                    ]
                    this.clear()
                    break;
                    case '9':
                    this.form.nodes.options = [
                        { id: '7', name: '区县教育局' },
                        { id: '6', name: '市级教育局' },
                        { id: '10', name: '省级教育局' }
                    ]
                    this.clear()
                    break;
                    case '7':
                    this.form.nodes.options = [
                        { id: '6', name: '市级教育局' },
                        { id: '10', name: '省级教育局' }
                    ]
                    this.clear()
                    break;
                    case '6':
                    this.form.nodes.options = [
                        { id: '10', name: '省级教育局' }
                    ]
                    this.clear()
                    break;
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
.i-form-button {
    width: 90px;
    border: 1px solid #2797ed;
}
</style>

<style lang="scss">
    .add-classify{
        .el-dialog{
            min-width: 480px;
        }
    }
</style>