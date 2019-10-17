
<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="dataParams.name" placeholder="请输入类型名称" @keyup.native.enter="changePage(1)"></el-input>
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
        <el-dialog title="报名类型" :visible="visible"  size="small" :before-close="closeClear">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="类型名称:" prop="name">
                    <el-col :span="12">
                        <el-input v-model="ruleForm.name" placeholder="请输入分类名称" :maxlength="30"></el-input>
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
    	addTrainClassify,
	    modifyTrainClassify,
	    trainClassifyDetail,
	    delTrainClassifyByIds,
	    requestTrainClassifyList,
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
                },
                rules: {
                    name: [
                        { required: true, message: '请输入类型名称', trigger: 'change' },
                        { max: 29, message: '不超过30个字', trigger: 'change' }
                    ],
                },
                dataParams: {
                    name: '',
                },
                // 列表数据
                items: [],
                // 选中
                checkedItems: [],
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            del({ data: item } = { data }) {
                let params = []
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm('确定要删除该分类吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({ id: x.id })
                        })
                        delTrainClassifyByIds(params).then((res) => {
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
                    this.$message({message: '请选择要删除的分类'})
                }
            },
            edit(val) {
                trainClassifyDetail({ id: val.data.id }).then(res => {
                    res = res.data.entity
                    this.ruleForm.id = res.id
                    this.ruleForm.name = res.name
                    this.visible = true
                })
            },
            closeClear() {
                this.visible = false
                this.ruleForm = { name: '' }
                this.$refs.ruleForm.resetFields()
            },
            onSubmit() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let data = Object.assign({}, this.ruleForm)
                        if(this.ruleForm.id) {
                            modifyTrainClassify(data).then (res => {
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
                            addTrainClassify(data).then(res => {
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
                        return false;
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
                requestTrainClassifyList(dataParams, this.pageParam).then(response => {
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
