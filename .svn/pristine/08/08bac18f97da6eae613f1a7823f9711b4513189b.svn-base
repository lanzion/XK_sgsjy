
<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.name" placeholder="请输入项目名称" @keyup.native.enter="changePage(1)"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            add: doAdd,
            del: del
        }"></v-admin-operate>
        <!-- 列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="名称" show-overflow-tooltip prop="name"></el-table-column>
            <el-table-column label="操作" fixed="right" :width="operateWidth" v-if="listBtnGroup.length">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: edit,
                        del: del
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <!-- 新增、修改 -->
        <el-dialog title="报名项目" :visible="visible"  size="small" :before-close="closeClear">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="报名类型:" prop="studySectionId">
                    <el-col :span="12">
                        <el-select v-model="ruleForm.studySectionId" placeholder="请选择报名类型" style="width:100%;" filterable clearable>
                            <el-option
                                v-for="(item,index) in periodList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="项目名称:" prop="name">
                    <el-col :span="12">
                        <el-input v-model="ruleForm.name" placeholder="请输入项目名称" :maxlength="30"></el-input>
                    </el-col>
                </el-form-item>
                <!-- <el-form-item label="简介:" prop="introduction">
                    <el-col :span="18">
                        <el-input v-model="ruleForm.introduction" placeholder="请输入简介" type="textarea" :rows="3" :maxlength="500" resize="none"></el-input>
                    </el-col>
                </el-form-item> -->
                <el-form-item>
                    <button class="bs-form-button i-form-button" type="button" @click="onSubmit">确定</button>
                    <button class="bs-form-button i-form-button is-plain" type="button" @click="closeClear">取消</button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import { subPermission } from '@/mixin/getAdminMenu.js'  // 配置信息混入
    import { setPage } from '@/mixin/adminPagination.js'
    import pagination from '@/components/common/admin_pagination.vue'  // 分页组件
    import {
    	addTrainSubject,
	    modifyTrainSubject,
	    trainSubjectDetail,
	    delTrainSubjectByIds,
	    requestTrainSubjectList,
        requestTrainPeriodList
    } from '@/service/admin_configure.js'  // 列表数据接口
    import adminOperate from '@/components/common/operate.vue'  // 配置按钮组件

    export default {
        components: {
            'v-pagination': pagination,
            'v-admin-operate': adminOperate,
        },
        mixins: [subPermission, setPage],
        data() {
            return {
                // 弹窗开关
                visible: false,
                // 表单参数
                ruleForm: {
                    name: '',
                    studySectionId: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入项目', trigger: 'blur' },
                        { max: 29, message: '不超过30个字', trigger: 'change' }
                    ],
                    studySectionId: [
                        { required: true, message: '请选择报名类型', trigger: 'change' }
                    ]
                },
                dataParams: {
                    name: '',
                },
                // 列表数据
                items: [],
                // 选中
                checkedItems: [],
                periodList: []
            }
        },
        mounted() {
            this.getData()
        },
        watch: {
            visible: {
                handler: function (val) {
                    if (val && !this.periodList.length) {
                        this.getPeriodData()
                    }
                },
                deep: true
            }
        },
        methods: {
            del({ data: item } = { data }) {
                let params = []
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm('确定要删除该学科吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({ id: x.id })
                        })
                        delTrainSubjectByIds(params).then((res) => {
                            if (res.data.code === 200) {
                                this.showMessage('success', '删除成功')
                                this.getData()
                            } else {
                                this.showMessage('error', res.data.msg)
                            }
                            this.$refs.multipleTable.clearSelection()
                        })
                    }).catch(() => {})
                } else {
                    this.$message({message: '请选择要删除的学科'})
                }
            },
            // 获取学段数据
            getPeriodData() {
                requestTrainPeriodList({}, { pageSize: 999, pageNum: 1 }).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity.resultData
                        this.periodList = _data
                    }
                })
            },
            edit(val) {
                trainSubjectDetail({ id: val.data.id }).then(res => {
                    res = res.data.entity
                    this.ruleForm.id = res.id
                    this.ruleForm.name = res.name
                    this.ruleForm.studySectionId = res.studySectionId
                    this.visible = true
                })
            },
            closeClear() {
                this.visible = false
                this.ruleForm = { name: '', studySectionId: '' }
            },
            onSubmit() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let data = Object.assign({}, this.ruleForm)
                        if(this.ruleForm.id) {
                            modifyTrainSubject(data).then (res => {
                                if(res.data.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功'
                                    })
                                    this.getData()
                                }else {
                                    this.$message({ message: res.data.message })
                                }
                            })
                        }else {
                            addTrainSubject(data).then(res => {
                                if(res.data.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '添加成功'
                                    })
                                    this.getData()
                                }else {
                                    this.$message({ message: res.data.message })
                                }
                            })
                        }
                        this.closeClear()
                    } else {
                        return false
                    }
                });
            },
            doAdd() {
                this.visible = true
            },
            /*
             * 列表数据
             */
            getData() {
                let dataParams = Object.assign({}, this.dataParams)
                requestTrainSubjectList(dataParams, this.pageParam).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity.resultData;
                        this.items = _data;
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
            changeSelection(checked) {
                this.checkedItems = checked
            },
        },
        computed: {
        }
    }
</script>
