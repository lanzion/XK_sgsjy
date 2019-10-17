<template>
    <el-row class="datadict" style="padding:20px;">
        <!-- 左侧管理 -->
        <el-col :span="5" class="content_l" style="padding-left:0;padding-right:0;">
            <h2 class="content_l_title">字典类别</h2>
            <div class="content_l_func">
                <v-admin-operate :items="typeHeadBtnGroup" btnType="head" v-bind="{
                    add: { callback: addDict },
                    edit: { callback: editDict },
                    del: { callback: delDict }
                }"></v-admin-operate>
            </div>
            <div >
                <ul v-if="leftList.length" class="content_l_list">
                    <li v-for="(i, k) in leftList" class="content_l_li" @click="recordClick(i, k)" :class='{isActive: k === recordDictIndex }'>
                        {{ i.name }}
                    </li>
                </ul>
            </div>
            <!-- 字典新增、修改弹框 -->
            <el-dialog title="字典" :visible.sync="dictPopup" size="tiny" :before-close="clearDictForm">
                <el-form :model="dictForm" :rules="dictFormRules" ref="dictForm" label-width="100px">
                    <el-form-item label="代码:" prop="code">
                        <el-col :span="20" style="padding: 0;">
                            <el-input v-model="dictForm.code"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="名称:" prop="name">
                        <el-col :span="20" style="padding: 0;">
                            <el-input v-model="dictForm.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-col :span="20" style="padding: 0;">
                            <el-input v-model="dictForm.remark" type="textarea" :rows="3" resize="none"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="20" style="text-align:right;padding: 0;">
                            <el-button class="i-form-button is-plain" @click="clearDictForm">取消</el-button>
                            <el-button type="primary" class="i-form-button" @click="sendAddDict">确定</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-col>
        <el-col :span="18" class="content_r">
            <h2 class="content_r_title">字典值明细</h2>
            <div class="content_r_box">
                <div class="content_r_func">
                    <v-admin-operate :items="typeHeadBtnGroup" btnType="head" style="text-align:right;" v-bind="{
                        add: { callback: addDictDetail },
                        edit: { callback: editDictDetail },
                        del: { callback: delDictDetail }
                    }"></v-admin-operate>
                </div>
                <el-table class="data-table back-stage-table" border :data="dictDetail" highlight-current-row style="width: 100%" ref="table" @current-change="handleCurrentChange">
                    <el-table-column label="代码" show-overflow-tooltip prop='code'></el-table-column>
                    <el-table-column label="排序" show-overflow-tooltip prop='orders'></el-table-column>
                    <el-table-column label="名称" show-overflow-tooltip prop='name'></el-table-column>
                    <el-table-column label="备注" show-overflow-tooltip prop='remark'></el-table-column>
                </el-table>
                <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
            </div>
            <!-- 字典详情新增、修改弹框 -->
            <el-dialog title="字典值" :visible.sync="dictDetailPopup" size="tiny" :before-close="clearDictDetailForm">
                <el-form :model="dictDetailForm" :rules="dictDetailFormRules" ref="dictDetailForm" label-width="100px">
                    <el-form-item label="代码:" prop="code">
                        <el-col :span="20" style="padding: 0;">
                            <el-input v-model="dictDetailForm.code"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="名称:" prop="name">
                        <el-col :span="20" style="padding: 0;">
                            <el-input v-model="dictDetailForm.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="字典:" prop="dictName" required>
                        <el-col :span="20" style="padding: 0;">
                            <el-input v-model="dictDetailForm.dictName" disabled></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="排序:" prop="orders" required>
                        <el-col :span="20" style="padding: 0;">
                            <el-input v-model.number="dictDetailForm.orders"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-col :span="20" style="padding: 0;">
                            <el-input v-model="dictDetailForm.remark" type="textarea" :rows="3" resize="none"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="20" style="text-align:right;padding: 0;">
                            <el-button class="i-form-button is-plain" @click='clearDictDetailForm'>取消</el-button>
                            <el-button type="primary" class="i-form-button" @click="sendAddDictDetail()">确定</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script>
import { subPermission } from '@/mixin/getAdminMenu.js'
import { setPage } from '@/mixin/adminPagination.js'
import adminOperate from '@/components/common/admin_operate.vue'
import { datadictList, datadictAdd, datadictModify, datadictDel, datadictDetailList, datadictDetailAdd, datadictDetailModify, datadictDetailDel } from '@/service/admin_configure.js'
import pagination from '@/components/common/admin_pagination.vue'
    export default {
        name: 'configureDatadict',
        mixins: [subPermission, setPage],
        data() {
            return {
                // 左侧列表
                leftList: [],
                // 数据字典新增、修改弹框
                dictPopup: false,
                // 数据新增表单
                dictForm: {
                    code: '',
                    name: '',
                    remark: ''
                },
                // 数据新增表单检验
                dictFormRules: {
                    code: [
                        { required: true, message: '请输入字典代码', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入字典名称', trigger: 'change' }
                    ]
                },
                // 左侧功能焦点
                recordDictIndex: 0,
                recordDictItem: null,
                recordDictId: null,
                // 数据详情
                dictDetail: [],
                // 数据字典详情新增、修改弹框
                dictDetailPopup: false,
                // 数据字典详情表单
                dictDetailForm: {
                    code: '',
                    name: '',
                    dictName: '',
                    dicTypeId: '',
                    remark: '',
                    orders: ''
                },
                // 数据字典详情检验
                dictDetailFormRules: {
                    code: [
                        { required: true, message: '请输入字典值代码', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入字典值名称', trigger: 'change' }
                    ],
                    orders: [
                        { required: true, message: '请输入排序', trigger: 'change', type: 'number' }
                    ]
                },
                // 列表获取焦点保存对象
                currentRow: null
            }
        },
        mounted() {
            this.dictList()
            let _this = this
        },
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination
        },
        methods: {
            // 添加数据字典
            addDict () {
                this.dictPopup = true
            },
            // 修改数据字典
            editDict () {
                if(this.recordDictIndex > -1) {
                    this.dictPopup = true
                    this.dictForm.code = this.leftList[this.recordDictIndex].code
                    this.dictForm.name = this.leftList[this.recordDictIndex].name
                    this.dictForm.remark = this.leftList[this.recordDictIndex].remark
                    this.dictForm.id = this.leftList[this.recordDictIndex].id
                }else {
                    this.$message({ message: '没有选中数据字典'})
                }
            },
            // 删除数据字典
            delDict () {
                if(this.recordDictIndex > -1) {
                    this.recordDictId = this.leftList[this.recordDictIndex].id
                    this.$confirm('是否将此数据字典永久删除?', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        datadictDel( [{ id: this.recordDictId }] ).then(res => {
                            if(res.data.code == 200) {
                                this.dictList()
                                this.clearDictForm()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                            }
                        })
                    }).catch(() => {
                        this.clearDictForm()
                    })
                }else {
                    this.$message({ message: '没有选中数据字典'})
                }
            },
            // 左侧列表
            dictList () {
                datadictList ({}).then(res => {
                    if(res.data.code == 200 && res.data.appendInfo) {
                        this.leftList = res.data.appendInfo.list
                        if(this.leftList.length) {
                            this.recordClick(this.leftList[0], 0)
                        }
                    }
                })
            },
            // 数据字典确认添加、修改
            sendAddDict () {
                this.$refs['dictForm'].validate((valid) => {
                    if (valid) {
                        this.dictForm.pid = 0
                        if(!this.dictForm.id) {
                            datadictAdd ( this.dictForm ).then(res => {
                                if(res.data.code === 200) {
                                    this.dictList()
                                    this.$message({
                                        type: 'success',
                                        message: '添加成功'
                                    })
                                    this.clearDictForm()
                                }else{
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        }else {
                            datadictModify ( this.dictForm ).then(res => {
                                if(res.data.code === 200) {
                                    this.dictList()
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功'
                                    })
                                    this.clearDictForm()
                                }else{
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                })
            },
            // 数据字典弹框清理
            clearDictForm () {
                this.dictPopup = false
                this.dictForm.code = ''
                this.dictForm.name = ''
                this.dictForm.remark = ''
                this.dictForm.id = undefined
                // this.recordDictIndex = -1
            },
            // 记录左侧点击
            recordClick (i, k) {
                this.recordDictIndex = k
                this.recordDictItem = i
                this.getDetial()
            },
            // 右侧详情
            getDetial () {
                datadictDetailList({dicTypeId: this.recordDictItem.id}, this.pageParam).then(res => {
                    let data = res.data
                    if(data.code === 200 && data.entity) {
                        this.dictDetail = data.entity.resultData
                        this.$set(this.pageParam, 'totalNum', data.entity.totalNum)
                    }
                })
            },
            // 改变分页
            changePage(val) {
                this.setPageNum(val)
                this.getDetial()
            },
            changeSize(val) {
                this.setPageSize(val)
                this.getDetial()
            },
            // 新增详情
            addDictDetail () {
                this.dictDetailPopup = true
                this.dictDetailForm.dictName = this.recordDictItem.name
                this.dictDetailForm.dicTypeId = this.recordDictItem.id
            },
            // 修改详情
            editDictDetail () {
                if(this.currentRow) {
                    this.dictDetailForm.code = this.currentRow.code
                    this.dictDetailForm.name = this.currentRow.name
                    this.dictDetailForm.remark = this.currentRow.remark
                    this.dictDetailForm.orders = this.currentRow.orders
                    this.dictDetailForm.id = this.currentRow.id
                    this.addDictDetail()
                }else{
                    this.$message({ message: '没有选中数据字典'})
                }
            },
            // 删除详情
            delDictDetail () {
                if(this.currentRow) {
                    this.$confirm('是否将此数据字典值永久删除?', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        datadictDetailDel( { ids: this.currentRow.id } ).then(res => {
                            if(res.data.code == 200) {
                                this.getDetial()
                                this.clearDictDetailForm()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                            }
                        })
                    }).catch(() => {
                        this.clearDictForm()
                    })
                }else {
                    this.$message({ message: '没有选中数据字典'})
                }
            },
            // 详情弹窗关闭清理
            clearDictDetailForm () {
                this.dictDetailPopup = false
                let _dictDetailForm = {
                    code: '',
                    name: '',
                    dictName: '',
                    dicTypeId: '',
                    remark: '',
                    id: ''
                }
                this.dictDetailForm = _dictDetailForm
                this.$refs['dictDetailForm'].resetFields();
            },
            // 详情添加、修改
            sendAddDictDetail () {
                this.$refs['dictDetailForm'].validate((valid) => {
                    if (valid) {
                        if(!this.dictDetailForm.id){
                            datadictDetailAdd(this.dictDetailForm).then(res => {
                                if(res.data.code == 200) {
                                    this.getDetial()
                                    this.clearDictDetailForm()
                                }else{
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        }else {
                            datadictDetailModify(this.dictDetailForm).then(res => {
                                if(res.data.code === 200) {
                                    this.getDetial()
                                    this.clearDictDetailForm()
                                }else{
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                })
            },
            // 右侧表格获取焦点保存
            handleCurrentChange(val) {
                this.currentRow = val;
            }
        }
    }
</script>

<style lang='scss'>
$blue: #0694e8;
.datadict {
    .content_l_func {
        div.bs-btn-group {
            text-align: center;
            button.i-form-button {
                border: 1px solid $blue;
                background-color: transparent;
                color: $blue;
                &:hover {
                    background-color: $blue;
                    color: #fff;
                }
            }
        }
    }
    .content_r_func {
        div.bs-btn-group {
            text-align: right;
        }
    }
}
.el-message-box__title {
    line-height: 3;
}
</style>

<style lang='scss' scoped>
$blue: #0694e8;

.content_l, .content_r {
    height: 86vh;
    font-size: 14px;
    background-color: #fff;
    border-radius: 1em;
    .content_l_title, .content_r_title {
        font-size: 1.14em;
        line-height: 3;
        text-indent: 1em;
        border-bottom: 1px solid #eaf2f4;
    }
}
.content_l {
    .content_l_func {
        background-color: #fbfbfb;
    }
    .content_l_list {
        height: 71vh;
        overflow: auto;
        .content_l_li {
            padding: 14px 60px;
            cursor: pointer;
            &:hover, &.isActive {
                color: #fff;
                background-color: $blue;
            }
        }
    }
    .i-form-button {
        width: 90px;
        border: 1px solid #2797ed;
    }
}
.content_r {
    margin-left: 2%;
    .content_r_box {
        padding: 14px;
    }
}
</style>