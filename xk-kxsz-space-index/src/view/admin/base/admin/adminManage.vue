<template>
    <div class="backend-content__middle">
        <section class="option-box clearfix">
            <el-input class="fl bs-search-input" v-model="search.account" @keyup.native.enter="changePage(1)" placeholder="请输入账号"></el-input>
            <button type="button" class="fl bs-search-button i-form-button is-plain" @click="changePage(1)">搜索</button>
        </section>
        <v-admin-operate :items="headBtnGroup" btnType="head" v-bind="{
            del: doDel,
            pwd: popupPwd
        }"></v-admin-operate>
        <!-- 平台管理员列表 -->
        <el-table class="data-table back-stage-table" border :data="items" style="width: 100%" ref="multipleTable" @selection-change="changeSelection">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="account" label="账号" width="220" sortable show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <v-admin-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        del: doDel,
                        pwd: popupPwd
                    }"></v-admin-operate>
                </template>
            </el-table-column>
        </el-table>
        <v-pagination :param.sync="pageParam" :changePage="changePage" :changeSize="changeSize"></v-pagination>
        <el-dialog class="dialog-audit" :visible.sync="pwdVisible" size="tiny" title="修改密码">
            <v-reset-pwd ref="resetPwd" :close="closeResetPwdDialog" @submit="doResetPwd"></v-reset-pwd>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '@/components/common/admin_pagination.vue'
    import reset_pwd from '@/components/admin/admin_base/reset_pwd.vue'
    import { subPermission } from '@/mixin/getAdminMenu.js'
    import { setPage } from '@/mixin/adminPagination.js'
    import { requestBaseAdmin, delBaseAdmin, resetPwd } from '@/service/admin_base.js'
    import dataTranslation from '@/js/dataTranslation.js'
    import adminOperate from '@/components/common/admin_operate.vue'
    export default {
        name: 'adminManage',
        mixins: [subPermission, setPage],
        components: {
            'v-admin-operate': adminOperate,
            'v-pagination': pagination,
            'v-reset-pwd': reset_pwd
        },
        data() {
            return {
                search: {
                    account: '',
                },
                _search: {},
                items: [],
                checkedItems: [],            // 选中项
                pwdVisible: false,
                newPwd: null
            }
        },
        computed: {
            params: function() {
                return Object.assign( {}, this.search, this.pageParam )
            }
        },
        mounted() {
            this._search = Object.assign( {}, this.search )
            this.getData()
        },
        // watch:{
        //     params:{
        //         handler:function(val,oldVal){
        //             this.getData()
        //         },
        //         deep:true
        //     }
        // },
        methods: {
            /*
             * 获取平台管理员列表
             */
            getData() {
                requestBaseAdmin(this.params).then(response => {
                    if (response.data.code == 200) {
                        let _data = response.data.entity;
                        this.items = _data.resultData || [];
                        this.$set(this.pageParam, 'totalNum', _data.totalNum);
                    } else {
                        this.showMessage('error',response.data.msg);
                    }
                })
            },
            // 平台管理员删除
            doDel({data:item} = {data}){
                let params = []
                item = JSON.stringify(item) === '{}' ? this.checkedItems : [item]
                if (item.length) {
                    this.$confirm('此操作将删除该平台管理员，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: '__custom-msg-box'
                    }).then(() => {
                        item.forEach(x => {
                            params.push({id: x.id})
                        })
                        delBaseAdmin(params).then((res) => {
                            if (res.data.code === 200) {
                                this.$message({message: '删除成功', type: 'success'})
                                this.getData()
                            } else {
                                this.$message.error({message: res.data.msg})
                            };
                            this.$refs.multipleTable.clearSelection();
                        })
                    }).catch(() => {});
                } else {
                    this.$message({ message: '请选择要删除的平台管理员' })
                }
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
                this.checkedItems = checked;
            },
            /*
             * 修改密码
             * idList: []   // 账号数组
             * newPwd: ''   // 新密码
             */
            doResetPwd(form) {
                let items = this.checkedItems.length ? this.checkedItems : [this.curItem]
                let params = {
                    idList: [],
                    newPwd: form.newPwd
                };
                items.forEach(x => {
                    params.idList.push(x.account)
                });
                resetPwd(params).then(response => {
                    if(response.data.code == 200){
                        this.showMessage('success', '修改成功')
                        this.checkedItems = []
                    }else{
                        this.showMessage('error', response.data.msg)
                    }
                })
                this.$refs.resetPwd.resetForm()
                this.closeResetPwdDialog()
            },
            popupPwd({data = {}, index} = {data, index}) {
                this.curIndex = index
                if (JSON.stringify(data) === '{}') {
                    if (this.checkedItems.length > 0) {
                        this.pwdVisible = true
                    } else {
                        this.showMessage('info', '请勾选要修改密码的平台管理员')
                    }
                } else {
                    this.pwdVisible = true
                    this.curItem = data
                }
            },
            closeResetPwdDialog() {
                this.pwdVisible = false
                this.$refs.resetPwd.resetForm()
            }
        }
    }
</script>
